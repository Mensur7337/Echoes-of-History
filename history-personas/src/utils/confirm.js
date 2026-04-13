import { t } from '../i18n/index.js';

export function showConfirm(title, message = '') {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        overlay.innerHTML = `
            <div class="confirm-modal">
                <h3 class="confirm-title">${title}</h3>
                ${message ? `<p class="confirm-message">${message}</p>` : ''}
                <div class="confirm-buttons">
                    <button class="btn-confirm-no">${t('confirm.no')}</button>
                    <button class="btn-confirm-yes">${t('confirm.yes')}</button>
                </div>
            </div>`;
        document.body.appendChild(overlay);
        overlay.querySelector('.btn-confirm-yes').onclick = () => { overlay.remove(); resolve(true);  };
        overlay.querySelector('.btn-confirm-no').onclick  = () => { overlay.remove(); resolve(false); };
        overlay.onclick = (e) => { if (e.target === overlay) { overlay.remove(); resolve(false); } };
    });
}

export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}
