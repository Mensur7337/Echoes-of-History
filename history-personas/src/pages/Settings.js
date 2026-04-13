import Component   from '../core/Component.js';
import AuthService from '../services/AuthService.js';
import GeminiService from '../services/Gemini.js';
import { showConfirm, showToast } from '../utils/confirm.js';
import { t, getLang, setLang }   from '../i18n/index.js';

export default class Settings extends Component {
    constructor(parentElement) {
        super(parentElement);
        this.user = AuthService.getCurrentUser();
        this.newPic = null;
    }

    render() {
        if (!this.user) { window.appRouter.navigateTo('/auth'); return; }
        const theme = localStorage.getItem('theme') || 'dark';
        const lang  = getLang();

        this.parentElement.innerHTML = `
            <div class="settings-container">
                <h1>${t('settings.title')}</h1>

                <section class="settings-section">
                    <h3>${t('settings.appearance')}</h3>
                    <div class="theme-buttons">
                        <button class="btn-toggle ${theme==='dark'?'active':''}"  data-theme="dark">${t('settings.dark')}</button>
                        <button class="btn-toggle ${theme==='light'?'active':''}" data-theme="light">${t('settings.light')}</button>
                        <button class="btn-toggle ${theme==='auto'?'active':''}"  data-theme="auto">${t('settings.auto')}</button>
                    </div>
                </section>

                <section class="settings-section">
                    <h3>${t('settings.language')}</h3>
                    <div class="theme-buttons">
                        <button class="btn-toggle ${lang==='tr'?'active':''}" data-lang="tr">🇹🇷 Türkçe</button>
                        <button class="btn-toggle ${lang==='en'?'active':''}" data-lang="en">🇬🇧 English</button>
                    </div>
                </section>

                <section class="settings-section">
                    <h3>${t('settings.profile')}</h3>
                    <div class="settings-form">
                        <div class="profile-preview-edit">
                            <img src="${this.user.profilePic}" alt="" id="currentAvatar">
                            <div>
                                <input type="file" id="editPic" accept="image/*" style="display:none">
                                <button type="button" class="btn-outline" id="changePhotoBtn">
                                    ${t('settings.changePhoto')}
                                </button>
                            </div>
                        </div>
                        <div class="input-row">
                            <input type="text"  id="editFirst" value="${this.user.firstName}" placeholder="${t('settings.firstName')}">
                            <input type="text"  id="editLast"  value="${this.user.lastName}"  placeholder="${t('settings.lastName')}">
                        </div>
                        <input type="email" id="editEmail" value="${this.user.email}" placeholder="${t('settings.email')}">
                        <button type="button" class="btn-primary-sm" id="saveProfileBtn">${t('settings.saveProfile')}</button>
                    </div>
                </section>

                <section class="settings-section">
                    <h3>${t('settings.ai')}</h3>
                    <div class="settings-form">
                        <label>${t('settings.apiKeyLabel')}</label>
                        <input type="password" id="apiKeyInput"
                               placeholder="${t('settings.apiKeyPlaceholder')}"
                               value="${localStorage.getItem('gemini_api_key') || ''}">
                        <p class="helper-text">${t('settings.apiKeyHelper')}</p>
                        <div style="display:flex;gap:10px;flex-wrap:wrap">
                            <button type="button" class="btn-primary-sm" id="saveApiBtn">${t('settings.apiKeySave')}</button>
                            <button type="button" class="btn-outline"    id="testApiBtn">${t('settings.apiKeyTest')}</button>
                        </div>
                        <p id="apiTestResult" style="margin-top:10px;font-size:0.88rem"></p>
                    </div>
                </section>

                <section class="settings-section">
                    <h3>${t('settings.session')}</h3>
                    <p style="color:var(--text-muted);margin-bottom:16px">${t('settings.logoutDesc')}</p>
                    <button class="btn-logout" id="logoutBtn">${t('settings.logout')}</button>
                </section>

                
                <section class="settings-section danger-zone">
                    <h3>${t('settings.danger')}</h3>
                    <p style="color:var(--text-muted);margin-bottom:16px">${t('settings.dangerDesc')}</p>
                    <button class="btn-danger" id="deleteBtn">${t('settings.deleteAccount')}</button>
                </section>
            </div>

           
            <div id="deleteModal" class="modal-overlay" style="display:none">
                <div class="persona-modal-card" style="max-width:420px;text-align:left">
                    <h2>${t('settings.deleteTitle')}</h2>
                    <p style="color:var(--text-muted);margin:12px 0 20px">${t('settings.deleteDesc')}</p>
                    <input type="email"    id="delEmail" placeholder="${t('settings.email')}"
                           style="width:100%;padding:12px;margin-bottom:10px;background:var(--input-bg);
                                  border:1px solid var(--border-color);border-radius:8px;color:var(--text-main);box-sizing:border-box">
                    <input type="password" id="delPass"  placeholder="${t('settings.password', {})}"
                           style="width:100%;padding:12px;margin-bottom:20px;background:var(--input-bg);
                                  border:1px solid var(--border-color);border-radius:8px;color:var(--text-main);box-sizing:border-box">
                    <div style="display:flex;gap:10px;justify-content:flex-end">
                        <button class="btn-text" id="cancelDel">${t('settings.deleteCancel')}</button>
                        <button class="btn-danger" id="finalDelBtn">${t('settings.deleteConfirmBtn')}</button>
                    </div>
                </div>
            </div>`;
        this._bind();
    }

    _bind() {
        this.parentElement.querySelectorAll('.btn-toggle[data-theme]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.parentElement.querySelectorAll('.btn-toggle[data-theme]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                window.applyTheme(btn.dataset.theme);
            });
        });

        this.parentElement.querySelectorAll('.btn-toggle[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => setLang(btn.dataset.lang));
        });

        document.getElementById('changePhotoBtn').onclick = () => document.getElementById('editPic').click();
        document.getElementById('editPic').onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const b64 = await AuthService.fileToBase64(file);
            this.newPic = b64;
            document.getElementById('currentAvatar').src = b64;
        };

        document.getElementById('saveProfileBtn').onclick = () => {
            const updated = {
                ...this.user,
                firstName:  document.getElementById('editFirst').value.trim(),
                lastName:   document.getElementById('editLast').value.trim(),
                email:      document.getElementById('editEmail').value.trim(),
                profilePic: this.newPic || this.user.profilePic
            };
            AuthService.updateUser(updated);
            this.user = updated;
            this.newPic = null;
            window.appNavbar.render();
            showToast(t('settings.profileSaved'));
        };


        document.getElementById('saveApiBtn').onclick = () => {
            localStorage.setItem('gemini_api_key', document.getElementById('apiKeyInput').value.trim());
            showToast(t('settings.apiKeySaved'));
        };

        document.getElementById('testApiBtn').onclick = async () => {
            const key = document.getElementById('apiKeyInput').value.trim();
            const resultEl = document.getElementById('apiTestResult');
            resultEl.textContent = '⏳ Test ediliyor...';
            resultEl.style.color = 'var(--text-muted)';
            const { ok, message } = await GeminiService.testApiKey(key);
            if (ok) {
                resultEl.textContent = t('settings.apiKeyTestOk');
                resultEl.style.color = '#4caf50';
            } else {
                resultEl.textContent = t('settings.apiKeyTestFail', { msg: message });
                resultEl.style.color = '#ff5555';
            }
        };

        document.getElementById('logoutBtn').addEventListener('click', async () => {
            const ok = await showConfirm(t('settings.logout'), t('settings.logoutConfirm'));
            if (ok) {
                AuthService.logout();
                window.appNavbar.render();
                window.appRouter.navigateTo('/auth');
            }
        });

        const modal = document.getElementById('deleteModal');
        document.getElementById('deleteBtn').onclick    = () => modal.style.display = 'flex';
        document.getElementById('cancelDel').onclick    = () => modal.style.display = 'none';
        document.getElementById('finalDelBtn').onclick  = () => {
            const email = document.getElementById('delEmail').value;
            const pass  = document.getElementById('delPass').value;
            if (email === this.user.email && pass === this.user.password) {
                AuthService.deleteAccount(email);
                window.appNavbar.render();
                window.appRouter.navigateTo('/auth');
            } else {
                showToast(t('settings.deleteError'), 'error');
            }
        };
    }
}
