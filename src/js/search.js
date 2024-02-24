const swiper_search = new Swiper('.swiper.swiper_search', {
    // Optional parameters
    slidesPerView:1,
    direction: 'horizontal',
    spaceBetween: 20,
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

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

const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')
const swiperWrapper = document.querySelector('.swiper-wrapper')
const defaultSlide1 = document.querySelector('.defaultSlide1')
const defaultSlide2 = document.querySelector('.defaultSlide2')
let books

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

onValue(ref(db, 'books'), rederBooks)
function rederBooks(snapshot) {
    books = convertData(snapshot.val())
    let searchedBooks = books.filter((item) =>{
        if(item.book.includes('')){
            return item
        }
    })
    swiperWrapper.innerHTML = searchedBooks.map((item) =>{
        return `
        <div class="swiper-slide">
                                        <div class="search_item">
                                            <div class="search_item_left">
                                                <img src="${item.image_url}" alt="">
                                            </div>
                                            <div class="search_item_text">
                                                <h4 class="book_name">${item.book}</h4>
                                                <h6 class="author_name">${item.author}</h6>
                                                <p class="book_desc">${item.description_book.substr(0,350)}${item.description_book.length >= 350? '...' : ''}</p>
                                            </div>
                                        </div>
                                    </div>
        `
    }).join('')
    swiper_search.update()
    
}

searchBtn.addEventListener('click', ()=>{
    let searchedBooks = books.filter((item) =>{
        if(item.book.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())){
            return item
        }
    })
    console.log(searchedBooks);
    swiperWrapper.innerHTML = searchedBooks.map((item) =>{
        return `
        <div class="swiper-slide">
                                        <div class="search_item">
                                            <div class="search_item_left">
                                                <img src="${item.image_url}" alt="">
                                            </div>
                                            <div class="search_item_text">
                                                <h4 class="book_name">${item.book}</h4>
                                                <h6 class="author_name">${item.author}</h6>
                                                <p class="book_desc">${item.description_book.substr(0,350)}${item.description_book.length >= 350? '...' : ''}</p>
                                            </div>
                                        </div>
                                    </div>
        `
    }).join('')
    swiper_search.update()
})