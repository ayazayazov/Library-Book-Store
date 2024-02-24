let category_list = document.getElementById("category_list")
let swiper_all = document.getElementById("swiper_all")
let swiper_bestSeller = document.getElementById("swiper_bestSeller")
let swiper_new = document.getElementById("swiper_new")

let catalog_container = document.querySelector(".catalog_container")
let book_detail_container = document.querySelector(".book_detail_container")
const book_data = document.querySelector(".book_data")
const back_btn = document.querySelector(".back_btn")
const all_books = document.querySelector(".all_books")


const swiper_all_x = new Swiper('.swiper.swiper_all', {
    // Optional parameters
    slidesPerView: 5,
    direction: 'horizontal',
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 640px
        767: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 20
        }
    }
});
const swiper_bestseller = new Swiper('.swiper.swiper_bestseller', {
    // Optional parameters
    slidesPerView: 5,
    direction: 'horizontal',
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 640px
        767: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 20
        }
    }
});
const swiper_New = new Swiper('.swiper.swiper_New', {
    // Optional parameters
    slidesPerView: 5,
    direction: 'horizontal',
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 640px
        767: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 20
        }
    }
});


import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getDatabase,
    ref,
    child,
    get,
    equalTo,
    query,
    orderByChild,
    onValue,
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


onValue(ref(db, "books"), renderNewBooks);
onValue(ref(db, "books"), renderBestSellerBooks);

function renderNewBooks() {
    let mainQuery = query(ref(db, 'books'), orderByChild('isNewCheck'), equalTo(true))
    get(mainQuery).then((snapshot) => {
        if (snapshot.exists()) {
            const data = convertData(snapshot.val());
            let data_list = data.map((item, index) => {
                return `
            <div class="swiper-slide">
                <div class="catalog_box_item">
                    <img src="${item.image_url}" alt="">
                    <span class="show">New</span>
                    <h5>${item.book}</h5>
                    <button class="read_more" value="${item.id}" >Read more</button>
                </div>
            </div>
        `
            }).join("")
            swiper_new.innerHTML = data_list;
            swiper_New.update()
            return data
        }
    })
}

function renderBestSellerBooks() {
    let mainQuery = query(ref(db, 'books'), orderByChild('isBestSellerCheck'), equalTo(true))
    get(mainQuery).then((snapshot) => {
        if (snapshot.exists()) {
            const data = convertData(snapshot.val());
            let data_list = data.map((item, index) => {
                return `
            <div class="swiper-slide">
                <div class="catalog_box_item">
                    <img src="${item.image_url}" alt="">
                    <span class="${item.isNewCheck ? 'show' : ''}">${item.isNewCheck ? 'New': ""}</span>
                    <h5>${item.book}</h5>
                    <button class="read_more" value="${item.id}" >Read more</button>
                </div>
            </div>
        `
            }).join("")
            swiper_bestSeller.innerHTML = data_list;
            swiper_bestseller.update()
            return data
        }
    })
}

function renderCategory(snaphot) {
    const data = convertData(snaphot.val());
    let data_list = data.map((item, index) => {
        return `
           <li data-id="${item.id}"><button type="button" class="category_name" data-id="${item.id}">${item.category_name}</button></li>
        `
    }).join("")
    category_list.innerHTML = data_list;
    let btns = document.querySelectorAll('.category_name');
    for (let i = 0; i < btns.length; i++) {
        btns[i].parentElement.classList.remove("active")
        btns[i].addEventListener('click', function () {
            btns.forEach(btn => {
                btn.parentElement.classList.remove("active")
            })
            btns[i].parentElement.classList.add("active")
            let id = btns[i].getAttribute('data-id')
            localStorage.setItem("category_id", id)
            getBooksDatas(id)

        })
        let id = btns[i].getAttribute('data-id')
        let local_id = localStorage.getItem("category_id")
        if (id === local_id) {
            btns[i].parentElement.classList.add("active")
        }
    }

    return data
}

function getBooksDatas(category_id) {
    let local_category_id = localStorage.getItem("category_id")

    if (local_category_id) {
        category_id = local_category_id
    }
    let mainQuery = query(ref(db, 'books'))
    if (category_id) {
        mainQuery = query(ref(db, 'books'), orderByChild('book_category'), equalTo(category_id))
    }
    get(mainQuery).then((snapshot) => {
        if (snapshot.exists()) {
            let dataArr = Object.entries(snapshot.val())
            let data_list = dataArr.map((item) => {
                const newObj = {
                    id: item[0],
                    ...item[1],
                };
                return newObj
            })
            let data_list_map = data_list.map((item, index) => {
                return `
                <div class="swiper-slide">
                    <div class="catalog_box_item">
                        <img src="${item.image_url}" alt="">
                        <span class="${item.isNewCheck ? 'show' : ''}">${item.isNewCheck ? 'New': ""}</span>
                        <h5>${item.book}</h5>
                        <button class="read_more" value="${item.id}" >Read more</button>
                    </div>
                </div>
        `
            }).join("")
            swiper_all.innerHTML = data_list_map;
            swiper_all_x.update()
            return data_list
        } else {
            swiper_all.innerHTML = `<h1 class="no_data">There is no book in this category!</h1>`
            swiper_all_x.update()
        }
    }).catch((err) => {
        console.log(err, 'err')
    })
}

getBooksDatas()


window.addEventListener('click', function (e) {
    e.preventDefault()
    let id = e.target.value;
    if (id) {
        catalog_container.style.display = "none"
        book_detail_container.style.display = "block"
        back_btn.style.display = "block"

    }
    if (!id) {
        return
    }
    commentId = e.target.value;
    let dataRef = ref(db, 'books' + "/" + id);
    get(dataRef).then(async function (snapshot) {
        let data = snapshot.val();
        window.scrollTo(0, 0);
        book_data.innerHTML = `
        <div class="row">
            <div class="col-lg-7">
                <div class="book_text_box">
                    <div class="book_detail">
                        <span class="publish_year">${data.publication_year}</span>
                        <h2 class="book_name">${data.book}</h2>
                        <h5 class="added_time">${convertTime(new Date(data.date_book_added))}</h5>
                        <h6 class="book_author">${data.author}</h6>
                        <p class="book_desc">${data.description_book} </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="img_box">
                    <img src="${data.image_url}" alt="">
                    <span class="new_book ${data.isNewCheck ? 'show' : ''}">${data.isNewCheck ? 'New': ""}</span>
                </div>
            </div>
        </div>
        `
        let comments = await getPosts()
        commentList.innerHTML = comments.map((comment) => {
        if(comment.commentID === commentId){
            return `
            <li>
                <div class="comment_box">
                    <div class="comment_top">
                        <h4>${comment.title}</h4>
                        <span>${comment.date.slice(5, 16)} ${comment.date.slice(17 ,22)}</span>
                    </div>
                    <div class="comment_text">
                        <p>${comment.body}</p>
                    </div>
                </div>
            </li>
            `
        }
    }).join('')
    }).catch(function (error) {
        console.error("Error getting data:", error);
    });
})

function convertTime(time) {
    let new_date = new Date()
    let show_date
    let difference = new_date.getTime() - time.getTime()
    let get_day = Math.floor(difference / 1000 / 60 / 60 / 24)
    let get_hours = Math.floor((difference / 1000 / 60 / 60) - get_day * 24)
    if (get_day >= 1) {
        show_date = `${get_day} day, ${get_hours} hours ago`
    } else if (get_day < 1 && get_hours >= 1) {
        show_date = `${get_hours} hours ago`
    } else {
        show_date = `A few minutes ago`
    }
    return show_date
}


back_btn.addEventListener("click", function () {
    book_detail_container.style.display = 'none'
    catalog_container.style.display = 'block'
    back_btn.style.display = 'none'
})
document.getElementById("home_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/index.html`
    window.location = path_name
})
document.getElementById("catalog_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/src/pages/catalog.html`
    window.location = path_name
})
document.getElementById("about_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/src/pages/about.html`
    window.location = path_name
})
document.getElementById("contact_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/src/pages/contact.html`
    window.location = path_name
})
document.getElementById("search_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/src/pages/search.html`
    window.location = path_name
})

document.querySelector(".home_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/index.html`
    window.location = path_name
})
document.querySelector(".catalog_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/src/pages/catalog.html`
    window.location = path_name
})
document.querySelector(".about_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/src/pages/about.html`
    window.location = path_name
})
document.querySelector(".contact_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/src/pages/contact.html`
    window.location = path_name
})
document.querySelector(".search_btn").addEventListener("click", function () {
    let path_name = `/Library-Book-Store/src/pages/search.html`
    window.location = path_name
})

all_books.addEventListener("click", function () {
    localStorage.removeItem("category_id")
    let  btn_list= category_list.children
    for(let i=0;i<btn_list.length;i++){
        btn_list[i].classList.remove("active")
    }
    getBooksDatas()
})

// book comment

const commentInput = document.querySelector('#commentInput')
const commentSendBtn = document.querySelector('#commentSendBtn')
const commentList = document.querySelector('.comment_list')
let commentId

async function getPosts(){
    try {
        const response = await fetch('https://blog-api-t6u0.onrender.com/posts', {
            method: 'GET',
            headers:{
                'Content-Type': "application/json",
            }
        })
        const data = await response.json()
        // console.log(data);
        return data;
    } catch (err) {
        console.log('err',err);
    }
}

async function createPost(){
    const dateNow = new Date()
    let form = {
        title: 'anonim',
        body: commentInput.value,
        commentID: commentId,
        date: dateNow
    }
    try {
        const response = await fetch(`https://blog-api-t6u0.onrender.com/posts`, {
            method: 'POST',
            headers:{
                'Content-Type': "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('err',err);
    }
}

commentSendBtn.addEventListener('click', async()=>{
    if(!commentInput.value){
        alert('input is empty')
        return
    }
    await createPost()
    commentInput.value = ''
    let comments = await getPosts()
    commentList.innerHTML = comments.map((comment) => {
        if(comment.commentID === commentId){
            return `
            <li>
                <div class="comment_box">
                    <div class="comment_top">
                        <h4>${comment.title}</h4>
                        <span>${comment.date.slice(5, 16)} ${comment.date.slice(17 ,22)}</span>
                    </div>
                    <div class="comment_text">
                        <p>${comment.body}</p>
                    </div>
                </div>
            </li>
            `
        }
    }).join('')
})

// book comment
