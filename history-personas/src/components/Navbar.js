import AuthService from '../services/AuthService.js';
import { t, getLang, setLang } from '../i18n/index.js';

export default class Navbar {
    constructor(parentElement) { this.parentElement = parentElement; }

    render() {
        const user = AuthService.getCurrentUser();
        const lang = getLang();
        this.parentElement.innerHTML = `
            <nav class="main-nav">
                <div class="nav-logo" onclick="window.appRouter.navigateTo('/')">
                    ⌛ Echoes of History
                </div>
                <div class="nav-links">
                    <a href="javascript:void(0)" onclick="window.appRouter.navigateTo('/')">${t('nav.explore')}</a>
                    ${user ? `<a href="javascript:void(0)" onclick="window.appRouter.navigateTo('/history')">${t('nav.history')}</a>` : ''}
                </div>
                <div class="nav-auth">
                    <div class="lang-switcher">
                        <button class="lang-btn ${lang==='tr'?'active':''}" data-lang="tr">TR</button>
                        <span class="lang-sep">|</span>
                        <button class="lang-btn ${lang==='en'?'active':''}" data-lang="en">EN</button>
                    </div>
                    ${user ? `
                        <div class="user-profile-nav" onclick="window.appRouter.navigateTo('/settings')">
                            <img src="${user.profilePic}" class="nav-avatar" alt="">
                        </div>
                    ` : `
                        <button class="btn-text"      onclick="window.appRouter.navigateTo('/auth',{view:'login'})">${t('nav.login')}</button>
                        <button class="btn-primary-sm" onclick="window.appRouter.navigateTo('/auth',{view:'register'})">${t('nav.register')}</button>
                    `}
                </div>
            </nav>
        `;
        
        this.parentElement.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => setLang(btn.dataset.lang));
        });
    }
}
