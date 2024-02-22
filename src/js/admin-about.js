

const aboutTitle = document.querySelector("#aboutTitle")
const aboutImgURL = document.querySelector("#aboutImgURL")
const aboutDescription = document.querySelector("#aboutDescription")
const aboutInfoAddBtn = document.querySelector('#aboutInfoAddBtn')
import CustomToast from "./custom_toast.js";

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase,ref,push,child,set,get,onValue,update,remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
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

function setAboutStoreData(data){
    try {
        set(ref(db, 'about-store'), data)
        CustomToast().fire({
            icon: 'success',
            title: 'Shared successfully.'
        })
    } catch (err) {
        console.log(err);
    }
}

aboutInfoAddBtn.addEventListener('click', ()=>{
    if(!aboutTitle.value || !aboutImgURL || !aboutDescription){
        aboutDescription.style.border = '1px solid red'
        aboutTitle.style.border = '1px solid red'
        aboutImgURL.style.border = '1px solid red'
        setTimeout(() => {
            aboutDescription.style.border = '1px solid rgb(206, 206, 206)'
            aboutTitle.style.border = '1px solid rgb(206, 206, 206)'
            aboutImgURL.style.border = '1px solid rgb(206, 206, 206)'
        }, 2000);
        return
    }
    let form = {
        title: aboutTitle.value,
        bookImageUrl: aboutImgURL.value,
        description: aboutDescription.value
    }
    setAboutStoreData(form)
})

function renderAboutStore(snapshot){
    const data = snapshot.val()
    console.log(data);
    aboutTitle.value = data.title
    aboutImgURL.value = data.bookImageUrl
    aboutDescription.value = data.description
}

onValue(ref(db, 'about-store'), renderAboutStore)