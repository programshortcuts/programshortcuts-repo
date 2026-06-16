
import { sideBarTopicsAs } from "./nav/keyboard-nav.js";
import { injectContent } from "./inject-content.js";
import { keyboardNav } from "./nav/keyboard-nav.js";
import { darkMode } from "./dark-mode.js";
import { dragHideSideBar } from "./ui/drag-hide-sidebar.js";
let clickedLink = false
let lastPageClicked
darkMode()
keyboardNav()
dragHideSideBar()

sideBarTopicsAs.forEach(link => {    
    if(link.hasAttribute('autofocus')){
        injectContent(link.href) 
    }
    link.addEventListener('click',(e) => {
        e.preventDefault();
        e.stopPropagation();
        const topicUl = e.target.parentElement.parentElement
        if(e.target.hasAttribute('target')){
            return
        }
        clickedLink = true
        const anchor = e.target.closest('a');
        console.log(anchor)
        if (!anchor) return;
        injectContent(anchor.getAttribute('href'));
        
        keyboardNav()
    });
    link.addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        if(e.target.hasAttribute('target')){
            return
        }
        if(key === 'enter' && e.target == lastPageClicked && clickedLink){
            injectContent(e.target.href)
            // mainLandingPage.focus()
        } else if(key == 'enter'){
            clickedLink = true
        
            injectContent(e.target.href)
        
        }
        lastPageClicked = e.target
    });
    
});