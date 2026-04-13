import Component    from '../core/Component.js';
import AuthService  from '../services/AuthService.js';
import { showToast } from '../utils/confirm.js';
import { t }        from '../i18n/index.js';

export default class Auth extends Component {
    constructor(parentElement) {
        super(parentElement);
        const users = AuthService.getAllUsers();
        const state = window.appRouter?.getState() || {};
        this.isLoginView = state.view === 'register' || users.length === 0 ? false : true;
    }

    render() {
        this.parentElement.innerHTML = `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-tabs">
                        <button class="auth-tab ${this.isLoginView ? 'active':''}"  id="tabLogin">${t('auth.loginTab')}</button>
                        <button class="auth-tab ${!this.isLoginView ? 'active':''}" id="tabRegister">${t('auth.registerTab')}</button>
                    </div>
                    <form id="authForm" autocomplete="off">
                        ${!this.isLoginView ? `
                            <div class="input-group">
                                <input type="text" id="firstName" placeholder="${t('auth.firstName')}" required>
                                <input type="text" id="lastName"  placeholder="${t('auth.lastName')}"  required>
                            </div>` : ''}
                        <input type="email"    id="email"    placeholder="${t('auth.email')}"    required>
                        <input type="password" id="password" placeholder="${t('auth.password')}" required>
                        ${!this.isLoginView ? `
                            <div class="file-input-wrapper">
                                <label class="file-label">${t('auth.profilePic')}</label>
                                <input type="file" id="profilePic" accept="image/*">
                            </div>` : ''}
                        <button type="submit" class="btn-primary-large">
                            ${this.isLoginView ? t('auth.loginBtn') : t('auth.registerBtn')}
                        </button>
                    </form>
                </div>
            </div>`;
        this._bind();
    }

    _bind() {
        document.getElementById('tabLogin').onclick    = () => { this.isLoginView = true;  this.render(); };
        document.getElementById('tabRegister').onclick = () => { this.isLoginView = false; this.render(); };

        document.getElementById('authForm').onsubmit = async (e) => {
            e.preventDefault();
            const email    = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            if (!AuthService.isValidEmail(email)) { showToast(t('auth.invalidEmail'), 'error'); return; }

            if (this.isLoginView) {
                const user = AuthService.login(email, password);
                if (user) { window.appNavbar.render(); window.appRouter.navigateTo('/'); }
                else showToast(t('auth.loginError'), 'error');
            } else {
                let pic = null;
                const fi = document.getElementById('profilePic');
                if (fi?.files[0]) pic = await AuthService.fileToBase64(fi.files[0]);
                try {
                    AuthService.register({
                        firstName: document.getElementById('firstName').value.trim(),
                        lastName:  document.getElementById('lastName').value.trim(),
                        email, password, profilePic: pic
                    });
                    showToast(t('auth.registerSuccess'));
                    this.isLoginView = true; this.render();
                } catch (err) { showToast(err.message, 'error'); }
            }
        };
    }
}
