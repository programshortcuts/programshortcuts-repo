// import { initKeyboardNav } from "../nav/keyboard-nav.js";
import { initDropDowns } from "../ui/drop-downs.js";
import { effectsLoops } from "../../pages/home-page/js-home/effects.js";

export const mainLandingPage = document.querySelector('.main-landing-page');
export async function injectContent(href) {
    if(href){
        fetch(href)
            .then(response => response.text())
            .then(html => {
                mainLandingPage.innerHTML = ``
                mainLandingPage.innerHTML = html
                const aLinks = mainLandingPage.querySelectorAll('.page-container a')
                openPageLinks(aLinks)
                // initKeyboardNav()
                initDropDowns()
                effectsLoops()
            })
    }
}
function openPageLinks(aLinks){
    aLinks.forEach(link => {
        if(link.hasAttribute('autofocus') && !clickedLink){
            const href = link.getAttribute('href');
            // Optional: check that it's a local/internal link
            if (!href.startsWith('http')) {
                injectContent(href);
            } 
            
        }
        if(link.id === 'loadLink'){
            injectContent(link.href)
        }
        link.addEventListener('focus', (e) => {
        })
        link.addEventListener('click', e => {
            e.preventDefault();
            const anchor = e.target.closest('a');
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (!href) return;
            if (!href.startsWith('http')) {
                injectContent(href);
            } else {
                window.open(href,'')
            }
        });
        link.addEventListener('keydown', e => {
            const key = e.key.toLowerCase()
            if(key === 'enter'){
                e.preventDefault()
                const anchor = e.target.closest('a');
                if (!anchor) return;
                const href = anchor.getAttribute('href');
                if (!href) return;
                // Optional: check that it's a local/internal link
                if (!href.startsWith('http')) {
                    injectContent(href);
                } else {
                    window.open(href,'')
                }
            }
        });
    })
    
}


