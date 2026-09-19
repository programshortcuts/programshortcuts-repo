export const sideBarBtn = document.querySelector('#sideBarBtn')
export const sideBar = document.querySelector('.side-bar')
const sideBarUlContainer = document.querySelector('.side-bar-ul-container')
const subTopicsUls = document.querySelectorAll('ul.topics > li > ul.sub-topic')
export const sideBarTopicsAs = document.querySelectorAll('ul.topics > li a')

let iItemIndex = 0
export function toggleSideBar() {
    if (!sideBar.classList.contains('hide') && sideBar.classList.contains('active')) {
        sideBar.classList.remove('active')
        sideBar.classList.remove('hide')
        return
    } else {

        sideBar.classList.toggle('hide')
        hideSubTopicsUls()
    }
    console.log(sideBar)
}
export function toggleActive() {
    if (sideBar.classList.contains('hide')) {
        sideBar.classList.remove('hide')
        sideBar.classList.add('active')
    } else {
        sideBar.classList.toggle('active')
    }
}
if (sideBarBtn && sideBar) {
    [sideBar].forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            if (e.currentTarget.classList.contains('side-bar')) {
                toggleActive()

                return
            }
            toggleSideBar()
        })
    })
    sideBarBtn.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        hideSubTopicsUls()
        toggleSideBar()
    })
    sideBarBtn.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'enter') {
            hideSubTopicsUls()
            toggleSideBar()

        }
    })
}
export function hideSubTopicsUls() {
    subTopicsUls.forEach(el => {
        // console.log(el)
        el.classList.add('hide')
    })
}
export function toggleSubTopicUl(parent) {
    const subTopicUl = parent.querySelector('li ul ')
    subTopicUl.classList.toggle('hide')

}
export function showSubTopicUls() {
    subTopicsUls.forEach(el => {
        if (el.classList.contains('hide')) { el.classList.remove('hide') }
    })
}
export function toggleSubTopicUls() {
    subTopicsUls.forEach(el => {
        el.classList.toggle('hide')
    })
}
hideSubTopicsUls()