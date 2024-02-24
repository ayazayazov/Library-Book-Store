import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase,ref,push,child,set,get,onValue,update,remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import CustomToast from "./custom_toast.js";
const firebaseConfig = {
    apiKey: "AIzaSyC6XY1TEOFV42mGOrBmRP0G2aD4HDTapNc",
    authDomain: "library-book-store-125e4.firebaseapp.com",
    databaseURL: "https://library-book-store-125e4-default-rtdb.firebaseio.com",
    projectId: "library-book-store-125e4",
    storageBucket: "library-book-store-125e4.appspot.com",
    messagingSenderId: "925545310186",
    appId: "1:925545310186:web:8d3daf513aa050ad5ab493"
};
initializeApp(firebaseConfig)
const db = getDatabase()

const overlayBack = document.querySelector('#overlay-back')
const joinUsModal = document.querySelector('.join-us-modal')
const joinUsBtn = document.querySelector('#joinUsBtn')
const joinUsFullnameInput = document.querySelector('#joinUsFullnameInput')
const joinUsEmailInput = document.querySelector('#joinUsEmailInput')
const joinBtn = document.querySelector('#joinBtn')
const joinUsAlertBox = document.querySelector('.joinUsAlertBox')

joinUsBtn.onclick = function(){
    overlayBack.style.display = 'block'
    joinUsModal.style.display = 'flex'
}

window.onclick = function(event){
    if(event.target == overlayBack){
        overlayBack.style.display = 'none'
        joinUsModal.style.display = 'none'
    }
}

function pushJoinUsData(data){
    try {
        push(ref(db, 'join-us'), data)
        joinUsAlertBox.innerHTML = `
        <div class="alert mt-3 alert-success" role="alert">
        Your request has been sent successfully!
        </div>`
        CustomToast().fire({
            icon: 'success',
            title: 'The information was recorded!'
        })
    } catch (err) {
        console.log(err);
    }
}

joinBtn.onclick = function(){
    if(!joinUsFullnameInput.value || !joinUsEmailInput.value){
        joinUsEmailInput.style.border = '1px solid red'
        joinUsFullnameInput.style.border = '1px solid red'
        joinUsAlertBox.innerHTML = `
        <div class="alert mt-3 alert-danger" role="alert">
        Enter a full name or email
        </div>`
        setTimeout(() => {
            joinUsAlertBox.innerHTML = ''
            joinUsEmailInput.style.border = '1px solid rgb(206, 206, 206)'
            joinUsFullnameInput.style.border = '1px solid rgb(206, 206, 206)'
        }, 2000);
        return
    }
    let form = {
        fullname: joinUsFullnameInput.value,
        email: joinUsEmailInput.value
    }
    pushJoinUsData(form)
    setTimeout(() => {
        joinUsAlertBox.innerHTML = ''
        overlayBack.style.display = 'none'
        joinUsModal.style.display = 'none'
    }, 2000);
    joinUsFullnameInput.value = ''
    joinUsEmailInput.value = ''
}