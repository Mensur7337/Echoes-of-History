export default class AuthService {
    static USERS_KEY       = 'echoes_users';
    static CURRENT_USER_KEY = 'echoes_current_user';

    static getAllUsers()    
     { return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]'); }
    static getCurrentUser() { const u = localStorage.getItem(this.CURRENT_USER_KEY); 
        return u ? JSON.parse(u) : null; }
    static isValidEmail(e) 
     { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

    static register(userData) {
        const users = this.getAllUsers();
        if (users.find(u => u.email === userData.email)) throw new Error('Bu e-posta zaten kayıtlı.');
        if (!userData.profilePic) {
const firstInitial = userData.firstName.charAt(0).toUpperCase();
const lastInitial = userData.lastName.charAt(0).toUpperCase();

userData.profilePic = `https://ui-avatars.com/api/?name=${firstInitial}+${lastInitial}&background=e5b323&color=1a1a14&size=200`;        }
        users.push(userData);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    static login(email, password) {
        const user = this.getAllUsers().find(u => u.email === email && u.password === password);
        if (user) localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
        return user || null;
    }

    static logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
        sessionStorage.removeItem('route');
        sessionStorage.removeItem('routeState');
    }

    static updateUser(updatedUser) {
        let users = this.getAllUsers();
        const idx = users.findIndex(u => u.email === updatedUser.email);
        if (idx !== -1) users[idx] = updatedUser;
        else users.push(updatedUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }

    static deleteAccount(email) {
        let users = this.getAllUsers().filter(u => u.email !== email);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        this.logout();
    }

    static async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const r = new FileReader();
            r.readAsDataURL(file);
            r.onload = () => resolve(r.result);
            r.onerror = e => reject(e);
        });
    }
}