export default class Router {
    constructor(routes) {
        this.routes       = routes;
        this.rootElem     = document.getElementById('app');
        this._state       = {};
        this._currentPath = '/';
    }

    navigateTo(path, state = {}) {
        this._state       = state;
        this._currentPath = path;
        window._currentRoute = path;
        this._beforeRender(path);
        this._render(path);
    }

    _beforeRender(path) {
        if (path !== '/chat') {
            const nav = document.getElementById('navbar-container');
            if (nav) nav.style.display = '';
            document.body.style.removeProperty('--persona-bg');
        }
    }

    _render(path) {
        const route = this.routes[path] || this.routes['/404'];
        this.rootElem.innerHTML = '';
        new route.component(this.rootElem).render();
    }

    getState()       { return this._state; }
    getCurrentPath() { return this._currentPath; }

    init(startPath) {
        this._currentPath    = startPath;
        window._currentRoute = startPath;
        this._beforeRender(startPath);
        this._render(startPath);
    }
}
