// import { sideBarTopicsAs,sideBarBtn } from "./toggle-sidebar.js";
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
    let homeAside = document.getElementById('homeAside')
    let lastFocusedSideEl = null
    let focusedSideBarLinks = false
    const allAs = document.querySelectorAll('a')
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
    let newIndex = 0;
    let keys = {
        shift:{
            pressed: false
        },
        meta: {
            pressed:false,
        },
        s:{
            pressed: false
        }
    }
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
        const key = e.key.toLowerCase();
    // rebuild letteredEls fresh on every keypress
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
  if(key === 's' && sideBarBtn && !letteredEls.includes(sideBarBtn)){
    letteredEls.unshift(sideBarBtn);
  }
  if(letteredEls.length === 0) return;
  // now cycle/focus
  const active = document.activeElement;
  const currentIndex = letteredEls.indexOf(active);
  const nextIndex = e.shiftKey
    ? (currentIndex - 1 + letteredEls.length) % letteredEls.length
    : (currentIndex + 1) % letteredEls.length;
  const nextEl = letteredEls[nextIndex];
  if(nextEl){
    if(!nextEl.hasAttribute('tabindex')) nextEl.setAttribute('tabindex','0');
    nextEl.focus();
  }
});

}
