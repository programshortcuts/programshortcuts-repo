import { handleSidebar, setSidebarHidden, sideBar, sideBarBtn } from "../ui/toggle-sidebar.js";
import { initKeyboardNav } from "../nav/keyboard-nav.js";
import { injectContent, isInternalPageLink } from "./inject-content.js";
import { darkMode } from "../dark-mode.js";
import { dragHideSideBar } from "../ui/drag-hide-sidebar.js";

export { sideBarBtn };

function initMain() {
    darkMode();
    initKeyboardNav();
    dragHideSideBar();
    initGlobalListener();

    const initialLink = sideBar?.querySelector('a[autofocus][href]');
    if (initialLink && isInternalPageLink(initialLink)) {
        injectContent(initialLink.href);
    }
}

function setSubmenuOpen(anchor, submenu, open) {
    submenu.classList.toggle('hide', !open);
    submenu.classList.toggle('show', open);
    anchor.setAttribute('aria-expanded', String(open));
}

function initGlobalListener() {
    sideBar?.querySelectorAll('ul.topics > li').forEach(item => {
        const anchor = item.querySelector(':scope > a');
        const submenu = item.querySelector(':scope > ul.sub-topic');
        if (!anchor || !submenu) return;
        setSubmenuOpen(anchor, submenu, submenu.classList.contains('show'));
    });

    sideBar?.addEventListener('click', event => {
        const anchor = event.target.closest('a');
        if (!anchor || !sideBar.contains(anchor) || event.defaultPrevented ||
            event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;

        const submenu = anchor.parentElement.querySelector(':scope > ul.sub-topic');
        if (submenu) {
            setSubmenuOpen(anchor, submenu, submenu.classList.contains('hide'));
        }

        if (isInternalPageLink(anchor)) {
            event.preventDefault();
            injectContent(anchor.href);
        }
    });

    if (!sideBar || !sideBarBtn) return;
    setSidebarHidden(sideBar, sideBar.classList.contains('hide') || sideBar.classList.contains('hidden'));
    sideBarBtn.addEventListener('click', () => handleSidebar(sideBar));
    // The existing control is an SVG, so supply the activation keys a button gets natively.
    sideBarBtn.addEventListener('keydown', event => {
        if (sideBarBtn.tagName.toLowerCase() === 'button') return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleSidebar(sideBar);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain, { once: true });
} else {
    initMain();
}
