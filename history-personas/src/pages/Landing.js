import { personas }   from '../data/personas.js';
import PersonaPreview from '../components/PersonaPreview.js';
import AuthService    from '../services/AuthService.js';
import { t }          from '../i18n/index.js';
import { showToast }  from '../utils/confirm.js';

export default class Landing {
    constructor(parentElement) { this.parentElement = parentElement; }

    render() {
        const isLoggedIn = !!AuthService.getCurrentUser();
        this.parentElement.innerHTML = `
            <section class="landing-container">
                <header class="landing-header">
                    <h1>${t('landing.title')}</h1>
                    <p>${t('landing.subtitle')}</p>
                </header>
                <div class="search-area">
                    <div class="search-input-wrapper">
                        <input type="text" id="personaSearch" placeholder="${t('landing.searchPlaceholder')}">
                    </div>
                </div>
                <div class="persona-grid" id="personaGrid">${this._cards(personas)}</div>
            </section>`;
        this._bind(isLoggedIn);
    }

    _cards(data) {
        return data.map(p => `
            <div class="persona-card" data-id="${p.id}">
                <div class="avatar-wrapper">
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                </div>
                <h3>${p.name}</h3>
                <span>${p.role}</span>
                <small class="persona-years">${p.years}</small>
            </div>`).join('');
    }

    _bind(isLoggedIn) {
        document.getElementById('personaSearch').addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase();
            const filtered = q ? personas.filter(p =>
                p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)
            ) : personas;
            document.getElementById('personaGrid').innerHTML = this._cards(filtered);
            this._attachCards(isLoggedIn);
        });
        this._attachCards(isLoggedIn);
    }

    _attachCards(isLoggedIn) {
        this.parentElement.querySelectorAll('.persona-card').forEach(card => {
            card.addEventListener('click', () => {
                const persona = personas.find(p => p.id === card.dataset.id);
                if (!persona) return;
                if (!isLoggedIn) { showToast(t('landing.loginRequired'), 'error'); return; }
                let root = document.getElementById('modal-root');
                if (!root) {
                    root = document.createElement('div');
                    root.id = 'modal-root';
                    document.body.appendChild(root);
                }
                new PersonaPreview(root, persona).render();
            });
        });
    }
}
