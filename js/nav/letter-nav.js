export function letterNav({e}){
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
    // force #sideBarBtn in for key "s"
    if (key === 's' && sideBarBtn && !letteredEls.includes(sideBarBtn)) {
        letteredEls.unshift(sideBarBtn);
    }
    if (letteredEls.length === 0) return;
    // now cycle/focus
    const active = document.activeElement;
    const currentIndex = letteredEls.indexOf(active);
    const nextIndex = e.shiftKey
        ? (currentIndex - 1 + letteredEls.length) % letteredEls.length
        : (currentIndex + 1) % letteredEls.length;
    const nextEl = letteredEls[nextIndex];
    if (nextEl) {
        if (!nextEl.hasAttribute('tabindex')) nextEl.setAttribute('tabindex', '0');
        nextEl.focus();
    }
}