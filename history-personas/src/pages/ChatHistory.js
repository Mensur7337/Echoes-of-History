import Component   from '../core/Component.js';
import Storage     from '../services/Storage.js';
import { personas } from '../data/personas.js';
import AuthService  from '../services/AuthService.js';
import { t }        from '../i18n/index.js';

export default class ChatHistory extends Component {
    render() {
        if (!AuthService.getCurrentUser()) { window.appRouter.navigateTo('/auth'); return; }

        const allHistory = Storage.getAllHistory();
        
        const rows = [];
        for (const [personaId, data] of Object.entries(allHistory)) {
            const persona = personas.find(p => p.id === personaId);
            if (!persona || !data.sessions) continue;
            data.sessions.forEach((session, idx) => {
                const lastMsg = session.messages.at(-1);
                rows.push({ persona, session, idx: idx + 1, lastMsg });
            });
        }
        
        rows.sort((a, b) => new Date(b.session.startedAt) - new Date(a.session.startedAt));

        this.parentElement.innerHTML = `
            <div class="history-container">
                <header class="history-header">
                    <h1>${t('history.title')}</h1>
                    <p>${t('history.subtitle')}</p>
                </header>
                <div class="history-list">
                    ${rows.length > 0 ? rows.map(({ persona, session, idx, lastMsg }) => {
                        const date = new Date(session.startedAt).toLocaleDateString('tr-TR');
                        const preview = lastMsg?.text
                            ? lastMsg.text.substring(0, 80) + (lastMsg.text.length > 80 ? '…' : '')
                            : '—';
                        return `
                            <div class="history-item"
                                 onclick="window.appRouter.navigateTo('/chat', {personaId:'${persona.id}', sessionId:'${session.id}'})">
                                <div class="history-info">
                                    <img src="${persona.image}" alt="">
                                    <div class="history-text">
                                        <h3>${persona.name}
                                            <small class="session-badge">${t('history.session', { n: idx })}</small>
                                        </h3>
                                        <p class="last-message">${preview}</p>
                                    </div>
                                </div>
                                <div class="history-meta">
                                    <span>${date}</span>
                                    <span style="color:var(--primary-gold)">›</span>
                                </div>
                            </div>`;
                    }).join('') : `<p class="no-history">${t('history.empty')}</p>`}
                </div>
            </div>`;
    }
}


