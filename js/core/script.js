export const sideBarBtn = document.querySelector('#sideBarBtn')
import { handleSidebar } from "../ui/toggle-sidebar.js";
import { sideBarTopicsAs } from "../nav/keyboard-nav.js";
import { injectContent } from "./inject-content.js";
import { initKeyboardNav } from "../nav/keyboard-nav.js";
import { darkMode } from "../dark-mode.js";
import { dragHideSideBar } from "../ui/drag-hide-sidebar.js";

let clickedLink = false
let lastPageClicked
function initMain() {

    document.addEventListener("DOMContentLoaded", () => {
        darkMode()
        initKeyboardNav()
        dragHideSideBar()
        initGlobalListener()
    })
}

function initGlobalListener() {
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
    sideBarBtn.addEventListener('click', e => {
        const sidebar = e.target.closest('.side-bar')
        if (!sidebar) return
        e.stopPropagation()
        handleSidebar(sidebar)
    })
    sideBarBtn.addEventListener('keydown', e => {
        const key = e.key.toLowerCase()
        const sidebar = e.target.closest('.side-bar')
        if (!sidebar) return
        if (key === 'enter') {

            e.stopPropagation()
            handleSidebar(sidebar)
        }
    })
    document.addEventListener('click', e => {
        console.log(document.activeElement)
    })
}
initMain()