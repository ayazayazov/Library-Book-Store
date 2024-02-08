let category_list = document.getElementById("category_list")
let swiper_all = document.getElementById("swiper_all")
let swiper_bestSeller = document.getElementById("swiper_bestSeller")
let swiper_new = document.getElementById("swiper_new")









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
/* ======================== Show Categories Collection ========================= */
onValue(ref(db, "categories"), renderCategory);

function renderCategory(snaphot) {
    const data = convertData(snaphot.val());
    let data_list = data.map((item, index) => {
        return `
           <li><button type="button" class="catewgory_name" data-id="${item.id}">${item.category_name}</button></li>
        `
    }).join("")
    category_list.innerHTML = data_list;
    let btns = document.getElementsByClassName('catewgory_name');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
            let id = btns[i].getAttribute('data-id')
            handleCategory(id)
        })
    }
    return data
}
onValue(ref(db, "books"), renderNewBooks);
onValue(ref(db, "books"), renderBestSellerBooks);

function renderNewBooks(snaphot) {
    const data = convertData(snaphot.val());
    let filtered_books = data.filter((book)=>{
        if(book.isNewCheck === true){
            return book
        }
    })
    let data_list = filtered_books.map((item, index) => {
        return `
            <div class="swiper-slide">
                <div class="catalog_box_item">
                    <img src="${item.image_url}" alt="">
                   <span>New</span>
                    <h5>${item.book}</h5>
                    <a href="#">Read more</a>
                </div>
            </div>
        `
    }).join("")
    swiper_new.innerHTML = data_list;
    return data
}
function renderBestSellerBooks(snaphot) {
    const data = convertData(snaphot.val());
    let filtered_books = data.filter((book)=>{
        if(book.isBestSellerCheck === true){
            return book
        }
    })
    let data_list = filtered_books.map((item, index) => {
        return `
            <div class="swiper-slide">
                <div class="catalog_box_item">
                    <img src="${item.image_url}" alt="">
                   <span>${item.isNewCheck === true?'New' : ''}</span>
                    <h5>${item.book}</h5>
                    <a href="#">Read more</a>
                </div>
            </div>
        `
    }).join("")
    swiper_bestSeller.innerHTML = data_list;
    return data
}
function getBooksDatas(category_list) {
    const db_ref = ref(db)
    get(child(db_ref, 'books')).then((snapshot) => {
        if (snapshot.exists()) {
            let dataArr = Object.entries(snapshot.val())
            let data_list = dataArr.map((item) => {
                const newObj = {
                    id: item[0],
                    ...item[1],
                };
                return newObj
                // console.log(item,'item')

            })
            let data_list_mapping = data_list.map((item, index) => {
                return `
                <div class="swiper-slide">
                    <div class="catalog_box_item">
                        <img src="${item.image_url}" alt="">
                       <span> ${item.isNewCheck ? 'New': ''}</span>
                        <h5>${item.book}</h5>
                        <a href="#">Read more</a>
                    </div>
                </div>
        `
            }).join("")
            swiper_all.innerHTML = data_list_mapping;
            return data_list
        }
    }).catch((err) => {
        console.log(err, 'err')
    })
}

getBooksDatas()

function handleCategory(id){
    console.log(id,'id')
}
