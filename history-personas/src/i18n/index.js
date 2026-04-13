import tr from './tr.js';
import en from './en.js';

const DICTIONARIES = { tr, en };
let _lang = localStorage.getItem('lang') || 'tr';

function get(dict, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), dict);
}

export function t(key, vars = {}) {
    const dict = DICTIONARIES[_lang] || DICTIONARIES['tr'];
    let text = get(dict, key) ?? get(DICTIONARIES['tr'], key) ?? key;
    return String(text).replace(/\{\{(\w+)\}\}/g, (_, k) =>
        vars[k] !== undefined ? vars[k] : `{{${k}}}`
    );
}

export function getLang() { return _lang; }

export function setLang(lang) {
    if (!DICTIONARIES[lang]) return;
    _lang = lang;
    localStorage.setItem('lang', lang);
    if (window.appNavbar) window.appNavbar.render();
    const path = window._currentRoute || '/';
    if (window.appRouter) window.appRouter.navigateTo(path);
}
