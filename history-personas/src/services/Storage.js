import AuthService from './AuthService.js';

export default class Storage {

    static _key() {
        const user = AuthService.getCurrentUser();
        return user
            ? `echoes_chat_history_${user.email}`
            : 'echoes_chat_history_guest';
    }

    static getAllHistory() {
        try {
            return JSON.parse(localStorage.getItem(this._key()) || '{}');
        } catch { return {}; }
    }

    static getSessionsForPersona(personaId) {
        return this.getAllHistory()[personaId]?.sessions || [];
    }

    static getActiveSession(personaId) {
        const sessions = this.getSessionsForPersona(personaId);
        return sessions.length > 0 ? sessions[sessions.length - 1] : null;
    }

    static createNewSession(personaId) {
        const h = this.getAllHistory();
        if (!h[personaId]) h[personaId] = { sessions: [] };
        const session = {
            id: `sess_${Date.now()}`,
            startedAt: new Date().toISOString(),
            messages: []
        };
        h[personaId].sessions.push(session);
        localStorage.setItem(this._key(), JSON.stringify(h));
        return session;
    }

    static saveChatMessage(personaId, messageObj) {
        const h = this.getAllHistory();
        if (!h[personaId]) h[personaId] = { sessions: [] };
        const sessions = h[personaId].sessions;
        if (sessions.length === 0) {
            sessions.push({
                id: `sess_${Date.now()}`,
                startedAt: new Date().toISOString(),
                messages: []
            });
        }
        sessions[sessions.length - 1].messages.push(messageObj);
        localStorage.setItem(this._key(), JSON.stringify(h));
    }

    static clearPersonaHistory(personaId) {
        const h = this.getAllHistory();
        delete h[personaId];
        localStorage.setItem(this._key(), JSON.stringify(h));
    }
}
