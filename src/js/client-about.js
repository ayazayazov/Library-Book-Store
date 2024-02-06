const aboutTitle = document.querySelector("#aboutTitle")
const aboutDesc = document.querySelector("#aboutDesc")
const aboutImg = document.querySelector("#aboutImg")
const aboutSection = document.querySelector('#aboutSection')

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

// function convertData(d) {
//     const newData = Object.entries(d);

//     const myNewData = newData.map((arr) => {
//         const newObj = {
//             id: arr[0],
//             ...arr[1],
//         };

//         return newObj;
//     });

//     return myNewData;
// }

function renderAboutStore(snaphot) {
    const data = snaphot.val();
    console.log(data);
    aboutSection.innerHTML = `
    <div class="about-paragraph">
                <h1 id="aboutTitle" class="about-title">${data.title}</h1>
                <p id="aboutDesc" class="about-text">${data.description}</p>
            </div>
            <div id="aboutImg" class="about-img">
                <img src="${data.bookImageUrl}" alt="">
            </div>
    `
    
}

onValue(ref(db, 'about-store'), renderAboutStore);