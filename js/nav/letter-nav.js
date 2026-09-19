import { sideBarBtn } from "../ui/toggle-sidebar.js";

export function letterNav({e}){
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1 ||
        e.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
    const key = e.key.toLowerCase();
    const letteredEls = [...document.querySelectorAll('a, [id], i[id]')].filter(el => {
        const rect = el.getBoundingClientRect();
        return (
            getComputedStyle(el).visibility !== 'hidden' &&
            getComputedStyle(el).display !== 'none' &&
            rect.width > 0 &&
            rect.height > 0 &&
            el.id[0]?.toLowerCase() === key
        );
    });
    // Keep the sidebar control reachable with S even while collapsed.
    if (key === 's' && sideBarBtn && sideBarBtn.getClientRects().length && !letteredEls.includes(sideBarBtn)) {
        letteredEls.unshift(sideBarBtn);
    }
    if (letteredEls.length === 0) return;
    // now cycle/focus
    const active = document.activeElement;
    const currentIndex = letteredEls.indexOf(active);
    const nextIndex = e.shiftKey
        ? (currentIndex < 0 ? letteredEls.length - 1 : (currentIndex - 1 + letteredEls.length) % letteredEls.length)
        : (currentIndex + 1) % letteredEls.length;
    const nextEl = letteredEls[nextIndex];
    if (nextEl) {
        if (!nextEl.hasAttribute('tabindex')) nextEl.setAttribute('tabindex', '0');
        nextEl.focus();
    }
}
