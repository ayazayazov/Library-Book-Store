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
           <li><button type="button" class="category_name" data-id="${item.id}">${item.category_name}</button></li>
        `
    }).join("")
    category_list.innerHTML = data_list;
    let btns = document.getElementsByClassName('category_name');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {
            // btns[i].classList.add("active")
            let id = btns[i].getAttribute('data-id')
            getBooksDatas(id)
        })

    }

    return data
}

onValue(ref(db, "books"), renderNewBooks);
onValue(ref(db, "books"), renderBestSellerBooks);

function renderNewBooks(snaphot) {
    const data = convertData(snaphot.val());
    let filtered_books = data.filter((book) => {
        if (book.isNewCheck === true) {
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
                    <button class="read_more" value="${item.id}" >Read more</button>
                </div>
            </div>
        `
    }).join("")
    swiper_new.innerHTML = data_list;
    swiper_New.update()
    return data
}

function renderBestSellerBooks(snaphot) {
    const data = convertData(snaphot.val());
    let filtered_books = data.filter((book) => {
        if (book.isBestSellerCheck === true) {
            return book
        }
    })
    let data_list = filtered_books.map((item, index) => {
        return `
            <div class="swiper-slide">
                <div class="catalog_box_item">
                    <img src="${item.image_url}" alt="">
                   <span>${item.isNewCheck === true ? 'New' : ''}</span>
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

const local_data_list = JSON.parse(localStorage.getItem("book_list")) ?? [];

function getBooksDatas(category_id) {
    const db_ref = ref(db)
    get(child(db_ref, 'books')).then((snapshot) => {
        let book_data
        if (snapshot.exists()) {
            let dataArr = Object.entries(snapshot.val())
            let data_list = dataArr.map((item) => {
                const newObj = {
                    id: item[0],
                    ...item[1],
                };
                return newObj
            })
            let filtered_data = data_list.filter((book) => {
                return book.book_category === category_id
            })
            if (category_id) {
                book_data = filtered_data
            } else {
                book_data = data_list
            }
            // let data_list_with_local = local_data_list.splice(0,local_data_list.length,book_data)
            // localStorage.setItem("book_list", JSON.stringify(data_list_with_local.flat()));

            // if(data_list_with_local.length===0){
            //     data_list_with_local = book_data
            // }else{
            //     data_list_with_local = data_list_with_local.flat()
            // }
            let data_list_map = book_data.map((item, index) => {
                return `
                <div class="swiper-slide">
                    <div class="catalog_box_item">
                        <img src="${item.image_url}" alt="">
                       <span> ${item.isNewCheck ? 'New' : ''}</span>
                        <h5>${item.book}</h5>
                        <button class="read_more" value="${item.id}" >Read more</button>
                    </div>
                </div>
        `
            }).join("")
            swiper_all.innerHTML = data_list_map;
            swiper_all_x.update()
            return data_list
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
                        <p class="book_desc">${data.description} </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="img_box">
                    <img src="${data.image_url}" alt="">
                    <span class="new_book">${data.isNewCheck ? 'New' : ""}</span>
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
    // let get_minutes= Math.floor((difference / 1000 / 60 ) - (get_hours * 60) - get_day *24 )
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
        console.log(data);
        return data;
    } catch (err) {
        console.log('err',err);
    }
}

async function createPost(){
    const dateNow = new Date().toUTCString()
    let form = {
        title: 'anonim',
        body: commentInput.value,
        commentID: commentId,
        date: dateNow.toLocaleString()
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