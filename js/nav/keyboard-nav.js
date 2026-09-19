import { letterNav } from "./letter-nav.js";

export const sideBarTopicsAs = document.querySelectorAll('ul.topics > li a');
let letterFocusInitialized = false;

export function initKeyboardNav() {
    if (letterFocusInitialized) return;
    letterFocusInitialized = true;
    sideBarTopicsAs.forEach(anchor => {
        anchor.addEventListener('focus', () => scrollTo(0, 0));
    });
    document.addEventListener('keydown', event => letterNav({ e: event }));
}
