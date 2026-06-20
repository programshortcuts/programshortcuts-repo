// keyboard-nav.js
import { letterNav } from "./letter-nav.js";
import { mainLandingPage } from "../core/inject-content.js";
import { sideBarBtn } from "../ui/toggle-sidebar.js";
export const sideBarTopicsAs = document.querySelectorAll('ul.topics > li a')
let letterFocusInitialized = false;
const sideBar = document.querySelector('.side-bar')
const navState = {
    zone: null
}
function setNavZone({e}){
    // if(e.target.closest)
}
export function initKeyboardNav() {
    const allAs = document.querySelectorAll('a')
    let homeAside = document.getElementById('homeAside')
    let lastFocusedSideEl = null
    let focusedSideBarLinks = false
    let newIndex = 0;
    let keys = {
        shift: {
            pressed: false
        },
        meta: {
            pressed: false,
        },
        s: {
            pressed: false
        }
    }
    allAs.forEach(a => {
        if(a.hasAttribute('target')){
            a.addEventListener('click', e => {
                console.log(a)
                console.log(e.target)
                console.log(a.href)
                window.open(a.href,'_blank')    
            })
        }        
    })
    sideBarTopicsAs.forEach(el => {
        if(el.hasAttribute('autofocus')){
            lastFocusedSideEl = el
        }
        
        el.addEventListener('focus',e => {
            focusedSideBarLinks = true
            lastFocusedSideEl = e.target
        })
        el.addEventListener('focusout',()=>{
            focusedSideBarLinks = false
        })

    })
    if (letterFocusInitialized) return; // ✅ prevent double-binding
    letterFocusInitialized = true;
    
    sideBarTopicsAs.forEach(el => {
        el.addEventListener('focus', e => {
            scrollTo(0,0)
        })
        el.addEventListener('click', e => {
            const aLinks = mainLandingPage.querySelectorAll('.page-container a')
            aLinks.forEach(el => {            
                if(el.hasAttribute('autofocus')){
                    el.removeAttribute('autofocus')
                }
            })
        })
    })
    document.addEventListener('keydown', e => {
        
        // rebuild letteredEls fresh on every keypress
        letterNav({e})
    });

}
