import { sideBar, setSidebarHidden } from './toggle-sidebar.js';

let dragInitialized = false;

export function dragHideSideBar() {
    if (!sideBar || dragInitialized) return;
    dragInitialized = true;
    let start;
    sideBar.addEventListener('touchstart', event => {
        const touch = event.touches.length === 1 ? event.touches[0] : null;
        start = touch ? { x: touch.clientX, y: touch.clientY } : null;
    }, { passive: true });
    sideBar.addEventListener('touchend', event => {
        if (!start) return;
        const touch = event.changedTouches[0];
        const distanceX = touch.clientX - start.x;
        const distanceY = touch.clientY - start.y;
        start = null;
        if (distanceX < -50 && Math.abs(distanceX) > Math.abs(distanceY)) {
            setSidebarHidden(sideBar, true);
        }
    }, { passive: true });
    sideBar.addEventListener('touchcancel', () => { start = null; }, { passive: true });
}
