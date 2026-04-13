import Component    from '../core/Component.js';
import { personas } from '../data/personas.js';
import GeminiService from '../services/Gemini.js';
import AuthService  from '../services/AuthService.js';
import Storage      from '../services/Storage.js';
import { ttsService }    from '../services/TTS.js';
import { speechService } from '../services/SpeechRecognition.js';
import { showConfirm }   from '../utils/confirm.js';
import { t, getLang }    from '../i18n/index.js';

export default class Chat extends Component {
    constructor(parentElement) {
        super(parentElement);
        if (!AuthService.getCurrentUser()) {
            window.appRouter.navigateTo('/auth');
            return;
        }
        const state    = window.appRouter.getState();
        this.personaId = state.personaId;
        this.persona   = personas.find(p => p.id === this.personaId);
        this.isTts     = localStorage.getItem('tts_enabled') === 'true';
        this.sessionId = state.sessionId || null;
        this.apiHistory = [];
    }

    render() {
        if (!this.persona) { window.appRouter.navigateTo('/404'); return; }

        const nav = document.getElementById('navbar-container');
        if (nav) nav.style.display = 'none';

        document.body.style.setProperty('--persona-bg', `url("${this.persona.image}")`);

        const yearEnd      = this.persona.years.split('–')[1]?.trim() || this.persona.cutoff;
        const micSupported = speechService.supported;

        this.parentElement.innerHTML = `
            <div class="chat-layout">

               
                <aside class="chat-sidebar">
                    <div class="sidebar-profile">
                        <img src="${this.persona.image}" alt="${this.persona.name}" class="sidebar-avatar">
                        <h2>${this.persona.name}</h2>
                        <span class="sidebar-years">${this.persona.years}</span>
                        <div class="cutoff-badge">${t('chat.knowledgeCapLabel',{year:yearEnd})}</div>
                    </div>
                    <nav class="sidebar-menu">
                        <button id="newChatBtn">${t('chat.newChat')}</button>
                        <button onclick="window.appRouter.navigateTo('/')">${t('chat.changePersona')}</button>
                        <button onclick="window.appRouter.navigateTo('/settings')">${t('chat.settings')}</button>
                    </nav>
                </aside>

               
                <section class="chat-main">
                    <header class="chat-header">
                        <div class="header-info">
                            <button class="back-btn" onclick="window.appRouter.navigateTo('/')">←</button>
                            <img src="${this.persona.image}" alt="">
                            <div>
                                <strong>${this.persona.name}</strong>
                                <span>${this.persona.role}</span>
                            </div>
                        </div>
                    </header>

                    <div class="messages-container" id="messagesContainer">
                        ${this._loadSession()}
                    </div>

                    <div class="chat-footer">
                        <div class="input-wrapper">
                            <input type="text" id="userInput"
                                   placeholder="${t('chat.inputPlaceholder',{name:this.persona.name})}">
                            ${micSupported ? `
                                <button id="micBtn" class="mic-btn" title="${t('chat.micOff')}">🎤</button>
                            ` : ''}
                            <button id="ttsBtn" class="tts-btn ${this.isTts?'tts-active':''}"
                                    title="${this.isTts?t('chat.ttsOn'):t('chat.ttsOff')}">🔊</button>
                            <button id="sendBtn" class="send-btn">${t('chat.send')}</button>
                        </div>
                        <p id="micStatus" class="mic-status"></p>
                    </div>
                </section>
            </div>`;

        this._bind();
    }

    _loadSession() {
        const sessions = Storage.getSessionsForPersona(this.personaId);
        let session = null;
        if (this.sessionId) session = sessions.find(s => s.id === this.sessionId) || null;
        if (!session && sessions.length > 0) {
            session = sessions[sessions.length - 1];
            this.sessionId = session.id;
        }
        if (session?.messages?.length > 0) {
            this.apiHistory = session.messages.map(m => ({
                role:  m.sender === 'ai' ? 'model' : 'user',
                parts: [{ text: m.text }]
            }));
            return session.messages.map(m => this._msgHTML(m.sender, m.text)).join('');
        }
        return this._msgHTML('ai', t('chat.greeting',{name:this.persona.name}));
    }

    _bind() {
        const input     = document.getElementById('userInput');
        const sendBtn   = document.getElementById('sendBtn');
        const ttsBtn    = document.getElementById('ttsBtn');
        const micBtn    = document.getElementById('micBtn');
        const micStatus = document.getElementById('micStatus');

        ttsBtn.addEventListener('click', () => {
            this.isTts = !this.isTts;
            localStorage.setItem('tts_enabled', this.isTts);
            ttsBtn.classList.toggle('tts-active', this.isTts);
            ttsBtn.title = this.isTts ? t('chat.ttsOn') : t('chat.ttsOff');
        });

        this.parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.speak-btn');
            if (btn) ttsService.speak(btn.getAttribute('data-text'), 'en-US');
        });

        if (micBtn && speechService.supported) {
            micBtn.addEventListener('click', () => {
                if (speechService.isListening) { speechService.stop(); return; }
                const speechLang = getLang() === 'tr' ? 'tr-TR' : 'en-US';
                micBtn.classList.add('mic-active');
                micBtn.title = t('chat.micOn');
                if (micStatus) micStatus.textContent = t('chat.micOn');
                speechService.start(
                    speechLang,
                    (interim) => { input.value = interim; },
                    (final)   => { input.value = (input.value + ' ' + final).trim(); },
                    () => {
                        micBtn.classList.remove('mic-active');
                        micBtn.title = t('chat.micOff');
                        if (micStatus) micStatus.textContent = '';
                        if (input.value.trim()) sendMessage();
                    }
                );
            });
        }

        const sendMessage = async () => {
            const text = input.value.trim();
            if (!text) return;
            this._addMessage('user', text);
            input.value = '';
            sendBtn.disabled = true;
            this._showTyping(true);
            const reply = await GeminiService.ask(this.persona, text, this.apiHistory);
            this._showTyping(false);
            this._addMessage('ai', reply);
            sendBtn.disabled = false;
            input.focus();
        };

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) sendMessage(); });

        document.getElementById('newChatBtn').addEventListener('click', async () => {
            const ok = await showConfirm(t('chat.newChatTitle'), t('chat.newChatMessage'));
            if (ok) {
                const s = Storage.createNewSession(this.personaId);
                this.sessionId  = s.id;
                this.apiHistory = [];
                document.getElementById('messagesContainer').innerHTML =
                    this._msgHTML('ai', t('chat.greeting',{name:this.persona.name}));
                input.focus();
            }
        });
    }

    _addMessage(sender, text) {
        const c = document.getElementById('messagesContainer');
        c.insertAdjacentHTML('beforeend', this._msgHTML(sender, text));
        if (!this.sessionId) {
            const s = Storage.createNewSession(this.personaId);
            this.sessionId = s.id;
        }
        Storage.saveChatMessage(this.personaId, { sender, text, timestamp: new Date().toISOString() });
        this.apiHistory.push({ role: sender === 'ai' ? 'model' : 'user', parts: [{ text }] });
        if (sender === 'ai' && this.isTts) ttsService.speak(text, 'en-US');
        c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' });
    }

    _msgHTML(sender, text) {
        const user   = AuthService.getCurrentUser();
        const avatar = sender === 'ai' ? this.persona.image : (user?.profilePic || '');
        const fmt    = text
            .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
            .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
            .replace(/\n/g,'<br>');
        const speakBtn = sender === 'ai'
            ? `<button class="speak-btn" data-text="${text.replace(/"/g,"'")}">🔊</button>` : '';
        return `
            <div class="message ${sender}-message">
                ${avatar ? `<img src="${avatar}" alt="">` : ''}
                <div class="bubble">${fmt}${speakBtn}</div>
            </div>`;
    }

    _showTyping(show) {
        const c = document.getElementById('messagesContainer');
        if (show) {
            const d = document.createElement('div');
            d.id = 'typingIndicator';
            d.className = 'message ai-message';
            d.innerHTML = `<img src="${this.persona.image}" alt=""><div class="bubble typing-dots"><span></span><span></span><span></span></div>`;
            c.appendChild(d);
            c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' });
        } else {
            document.getElementById('typingIndicator')?.remove();
        }
    }
}
