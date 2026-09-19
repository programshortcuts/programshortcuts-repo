export const sideBarBtn = document.querySelector('#sideBarBtn');
export const sideBar = document.querySelector('.side-bar');
export const sideBarTopicsAs = document.querySelectorAll('ul.topics > li a');

export function setSidebarHidden(sidebar, hidden) {
    if (!sidebar) return;
    // Older swipe handling used .hidden to move the whole sidebar offscreen.
    sidebar.classList.remove('hidden');
    sidebar.classList.toggle('hide', hidden);
    sideBarBtn?.setAttribute('aria-expanded', String(!hidden));
    sideBarBtn?.setAttribute('aria-label', hidden ? 'Expand sidebar' : 'Collapse sidebar');
}

export function handleSidebar(sidebar) {
    if (!sidebar) return;
    setSidebarHidden(sidebar, !(sidebar.classList.contains('hide') || sidebar.classList.contains('hidden')));
}

export function hideSubTopicsUls() {
    sideBar?.querySelectorAll('ul.topics > li > ul.sub-topic').forEach(submenu => {
        submenu.classList.add('hide');
        submenu.classList.remove('show');
        submenu.parentElement.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
    });
}
