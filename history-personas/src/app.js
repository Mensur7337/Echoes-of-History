import Router      from './core/Router.js';
import Landing     from './pages/Landing.js';
import Navbar      from './components/Navbar.js';
import Chat        from './pages/Chat.js';
import Settings    from './pages/Settings.js';
import Auth        from './pages/Auth.js';
import ChatHistory from './pages/ChatHistory.js';
import AuthService from './services/AuthService.js';
import { t }       from './i18n/index.js';

class App {
    constructor() { this.init(); }

    init() {
        const theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);

        const navContainer = document.getElementById('navbar-container');
        this.navbar = new Navbar(navContainer);
        this.navbar.render();

        const routes = {
            '/':         { component: Landing },
            '/chat':     { component: Chat },
            '/settings': { component: Settings },
            '/auth':     { component: Auth },
            '/history':  { component: ChatHistory },
            '/404':      { component: this._notFound() }
        };

        this.router = new Router(routes);

        window.appRouter  = this.router;
        window.appNavbar  = this.navbar;
        window.applyTheme = (t) => {
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem('theme', t);
        };

        const rawPath = window.location.pathname
            .replace(/\/index\.html$/, '')  
            .replace(/\/$/, '') || '/';     

        if (rawPath !== '' && rawPath !== '/') {
            this.router.init('/404');
            return;
        }

        const user = AuthService.getCurrentUser();
        this.router.init(user ? '/' : '/auth');
    }

    _notFound() {
        return class {
            constructor(p) { this.p = p; }
            render() {
                const nav = document.getElementById('navbar-container');
                if (nav) nav.style.display = '';
                document.body.style.removeProperty('--persona-bg');

                this.p.innerHTML = `
                    <div style="
                        display:flex;flex-direction:column;align-items:center;
                        justify-content:center;min-height:70vh;text-align:center;padding:40px 20px">
                        <div style="font-size:clamp(5rem,15vw,9rem);font-weight:800;
                                    color:var(--primary-gold);letter-spacing:-4px;line-height:1">404</div>
                        <p style="color:var(--text-muted);font-size:1.2rem;margin:20px 0 36px">
                            Bu zaman dilimi henüz keşfedilmedi.
                        </p>
                        <button onclick="window.appRouter.navigateTo('/')"
                            style="background:var(--primary-gold);border:none;border-radius:10px;
                                   padding:14px 36px;font-weight:800;color:#1a1a14;cursor:pointer;font-size:1rem;">
                            Ana Sayfaya Dön
                        </button>
                    </div>`;
            }
        };
    }
}

new App();
