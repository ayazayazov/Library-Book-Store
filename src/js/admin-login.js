import CustomToast from "./custom_toast.js";


import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyC6XY1TEOFV42mGOrBmRP0G2aD4HDTapNc",
    authDomain: "library-book-store-125e4.firebaseapp.com",
    databaseURL: "https://library-book-store-125e4-default-rtdb.firebaseio.com",
    projectId: "library-book-store-125e4",
    storageBucket: "library-book-store-125e4.appspot.com",
    messagingSenderId: "925545310186",
    appId: "1:925545310186:web:8d3daf513aa050ad5ab493"
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)


const userName = document.querySelector('#userName')
const password = document.querySelector('#password')
const adminLoginBtn = document.querySelector('#admin_login_btn')
const adminSignOut = document.querySelector('#adminSignOut')
const adminLogin = document.querySelector('.admin-login')
const adminPanel = document.querySelector('.admin-panel')
const joinUsAlertBox = document.querySelector('.joinUsAlertBox')
const aside = document.querySelector('#aside')
const openMenu = document.querySelector('.open-menu')
logoContainer.style.top = '92px'
const line = document.querySelector('.line')
const closeMenu = document.querySelector('.close-menu')
const mobileLogoContainer = document.querySelector('.mobile-logo-container')

adminLoginBtn.addEventListener('click', async()=>{
    const userEmail = userName.value.trim()
    const userPass = password.value.trim()

    if(!userEmail || !userPass){
        userName.style.border = '1px solid red'
        password.style.border = '1px solid red'
        joinUsAlertBox.innerHTML = `
        <div class="alert mt-3 alert-danger" role="alert">
        Enter a username and password
        </div>`
        CustomToast().fire({
            icon: 'error',
            title: 'Enter a username and password!'
        })
        setTimeout(() => {
            joinUsAlertBox.innerHTML = ''
            userName.style.border = '1px solid rgb(206, 206, 206)'
            password.style.border = '1px solid rgb(206, 206, 206)'
        }, 2000);
        return
    }

    await signInWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
        console.log(userCredential);
        CustomToast().fire({
            icon: 'success',
            title: 'You logged in successfully!'
        })
        adminLogin.style.display = 'none'
        adminPanel.style.display = 'flex'
    })
    .catch((err) => {
        console.log(err);
        userName.style.border = '1px solid red'
        password.style.border = '1px solid red'
        joinUsAlertBox.innerHTML = `
        <div class="alert mt-3 alert-danger" role="alert">
        Enter a correct username and password
        </div>`
        CustomToast().fire({
            icon: 'error',
            title: 'Enter a correct username and password!'
        })
        setTimeout(() => {
            joinUsAlertBox.innerHTML = ''
            userName.style.border = '1px solid rgb(206, 206, 206)'
            password.style.border = '1px solid rgb(206, 206, 206)'
        }, 2000);
    })
})

window.addEventListener('load', checkAuthState)

async function checkAuthState(){
    await onAuthStateChanged(auth, user => {
        console.log(user);
        if(user){
            adminLogin.style.display = 'none'
            adminPanel.style.display = 'flex'
        }else{
            adminPanel.style.display = 'none'
            adminLogin.style.display = 'flex'
        }
    })
    adminLogin.style.display = 'none'
}

adminSignOut.addEventListener('click', async()=>{
    await signOut(auth)
})