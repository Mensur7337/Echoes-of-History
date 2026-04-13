import Component from '../core/Component.js';
import { t }     from '../i18n/index.js';

export default class PersonaPreview extends Component {
    constructor(parentElement, personaData) {
        super(parentElement);
        this.data = personaData;
    }

    render() {
        const yearEnd = this.data.years.split('–')[1]?.trim() || this.data.cutoff;
        this.parentElement.innerHTML = `
            <div class="modal-overlay" id="modalOverlay">
                <div class="persona-modal-card">
                    <button class="close-modal" id="closeModal">&times;</button>
                    <div class="modal-profile-header">
                        <div class="modal-avatar-frame">
                            <img src="${this.data.image}" alt="${this.data.name}">
                        </div>
                        <h2>${this.data.name}</h2>
                        <p class="modal-subtitle">${this.data.years} • ${this.data.role}</p>
                    </div>
                    <div class="modal-info-list">
                        <div class="info-row">
                            <span class="info-label">${t('modal.knowledgeLimit')}</span>
                            <span class="info-value">${t('modal.knowledgeLimitValue', { year: yearEnd })}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">${t('modal.about')}</span>
                            <span class="info-value italic">"${this.data.bio}"</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">${t('modal.wikipediaLabel')}</span>
                            <a href="${this.data.wikipedia}" target="_blank" class="info-value">${t('modal.wikipedia')}</a>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary-large" id="startBtn">${t('modal.startBtn')}</button>
                    </div>
                </div>
            </div>`;
        document.getElementById('closeModal').onclick = () => this.parentElement.innerHTML = '';
        document.getElementById('modalOverlay').onclick = (e) => {
            if (e.target.id === 'modalOverlay') this.parentElement.innerHTML = '';
        };
        document.getElementById('startBtn').onclick = () => {
            this.parentElement.innerHTML = '';
            window.appRouter.navigateTo('/chat', { personaId: this.data.id });
        };
    }
}
