const account = document.querySelector('.account')
const aside = document.querySelector('#aside')
const container = document.querySelector('.container')
const openMenu = document.querySelector('.open-menu')
const closeMenu = document.querySelector('.close-menu')
const logoContainer = document.querySelector('.logo-container')
const mobileLogoContainer = document.querySelector('.mobile-logo-container')
const line = document.querySelector('.line')
const nav = document.querySelector('#nav')
function openMenuBTN(){
    aside.style.display = 'flex'
    // container.style.display = 'none'
    aside.style.position = 'fixed'
    aside.style.height = '100vh'
    aside.style.width = '310px'
    openMenu.style.display = 'none'
    logoContainer.style.top = '20px'
    nav.style.top = '150px'
    line.style.width = '140px'
    closeMenu.style.display = 'block'
    mobileLogoContainer.style.zIndex = '-1'
    aside.style.zIndex = '1'
}

function closeMenuBTN(){
    aside.style.display = 'none'
    // container.style.display = 'none'
    aside.style.position = 'sticky'
    aside.style.height = '100vh'
    aside.style.width = '400px'
    openMenu.style.display = 'block'
    logoContainer.style.top = '92px'
    line.style.width = '202px'
    closeMenu.style.display = 'none'
    mobileLogoContainer.style.zIndex = '0'
}