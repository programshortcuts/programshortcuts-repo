
import { sideBarTopicsAs } from "../nav/keyboard-nav.js";
import { injectContent } from "./inject-content.js";
import { initKeyboardNav } from "../nav/keyboard-nav.js";
import { darkMode } from "../dark-mode.js";
import { dragHideSideBar } from "../ui/drag-hide-sidebar.js";
let clickedLink = false
let lastPageClicked
function initMain(){
    document.addEventListener("DOMContentLoaded", () => {
        darkMode()
        initKeyboardNav()
        dragHideSideBar()
    })
}
initMain()
sideBarTopicsAs.forEach(link => {
    if (link.hasAttribute('autofocus')) {
        injectContent(link.href)
    }
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const topicUl = e.target.parentElement.parentElement
        if (e.target.hasAttribute('target')) {
            return
        }
        clickedLink = true
        const anchor = e.target.closest('a');
        if (!anchor) return;
        injectContent(anchor.getAttribute('href'));

        requestAnimationFrame(() => {
            initKeyboardNav()
        })
    });
    link.addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        if (e.target.hasAttribute('target')) {
            return
        }
        if (key === 'enter' && e.target == lastPageClicked && clickedLink) {
            injectContent(e.target.href)
            // mainLandingPage.focus()
        } else if (key == 'enter') {
            clickedLink = true

            injectContent(e.target.href)

        }
        lastPageClicked = e.target
    });
});