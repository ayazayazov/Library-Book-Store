let catalog_list = document.getElementById("catalog_list")

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    child,
    set,
    get,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
/* ======================== Firebase Methods ========================= */

function convertData(d) {
    const newData = Object.entries(d);
    const myNewData = newData.map((arr) => {
        const newObj = {
            id: arr[0],
            ...arr[1],
        };
        return newObj;
    });
    return myNewData;
}

onValue(ref(db, "categories"), renderCategory);

function renderCategory(snaphot) {
    const data = convertData(snaphot.val());
    let data_list = data.map((item, index) => {
        return `
           <div class="col-lg-4">
                <button class="catalog_box" value="${item.id}">
                    ${item.category_name}
                </button>
            </div>
        `
    }).join("")
    catalog_list.innerHTML = data_list;

    return data
}
window.addEventListener('click',function (e){
   let id_data =  e.target.value
    if (id_data) {
        window.location.pathname ='/Library-Book-Store/src/pages/catalog.html'
        localStorage.setItem("category_id",id_data)
    }
    if(!id_data){return}
})