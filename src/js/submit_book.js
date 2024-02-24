let type_name = document.querySelector("#type_name")
let book_category_submit = document.querySelector(".book_category_submit")

let book_type = document.querySelector("#book_type")
let modal_category = document.querySelector(".modal_category")
let close_category = document.querySelector(".close_category")
let btn_book_type = document.querySelector(".btn_book_type")
let book_name = document.querySelector("#book_name")
let author_name = document.querySelector("#author_name")
let book_image_url = document.querySelector("#book_image_url")
let book_publication_year = document.querySelector("#book_publication_year")
let isNew = document.querySelector("#isNew")
let isBestSeller = document.querySelector("#isBestSeller")
let description = document.querySelector("#description")

let book_type_update = document.querySelector("#book_type_update")
let book_name_update = document.querySelector("#book_name_update")
let author_name_update = document.querySelector("#author_name_update")
let book_image_url_update = document.querySelector("#book_image_url_update")
let book_publication_year_update = document.querySelector("#book_publication_year_update")
let isNew_update = document.querySelector("#isNew_update")
let isBestSeller_update = document.querySelector("#isBestSeller_update")
let book_description_update = document.querySelector("#book_description_update")
let book_id = document.querySelector("#book_id")

let add_book = document.querySelector("#add_book")
let book_data = document.querySelector("#book_data")
let modal_alert = document.querySelector(".modal_alert")
let submit_alert = document.querySelector(".submit_alert")
let update_modal_box = document.querySelector(".update_modal_box")
let update_book_btn = document.querySelector("#update_book_btn")
let close_update = document.querySelector(".close_update")
let modal_body_custom = document.querySelector(".modal_body_custom")
import CustomToast from "./custom_toast.js";





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
function writePushData(collection, data) {
    try {
        if (!collection) {
            alert('Required collection')
            return
        }
        const contactRef = ref(db, collection)
        push(contactRef, data)
        // location.reload()
    } catch (err) {
        console.log(err, 'err')
    }
}

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

/* ======================== Submit Forms ========================= */
book_category_submit?.addEventListener("click", function (e) {
    e.preventDefault()
    let category_name = type_name.value;
    if (!category_name) {
        type_name.classList.add("is-invalid")
    } else {
        type_name.classList.remove("is-invalid")
    }
    if (!category_name) {
        return
    }
    let form = {
        category_name,
    }
    writePushData('categories', form)
    CustomToast().fire({
        icon: 'success',
        title: 'Category created!'
    })
    setTimeout(() => {
        modal_category.classList.remove("show")
    }, 500)
    type_name.value = "";

})

btn_book_type.addEventListener("click", function (e) {
    e.preventDefault();
    modal_category.classList.add("show")
})
close_category.addEventListener("click", function (e) {
    e.preventDefault();
    modal_category.classList.remove("show")
})

add_book.addEventListener("click", function (e) {
    e.preventDefault();
    let book = book_name.value;
    let author = author_name.value;
    let image_url = book_image_url.value;
    let publication_year = book_publication_year.value;
    let isNewCheck = isNew.checked
    let isBestSellerCheck = isBestSeller.checked;
    let description_book = description.value;
    let book_category = book_type.value;
    let date_book_added = Date()
    let form = {
        book,
        author,
        image_url,
        publication_year,
        isNewCheck,
        isBestSellerCheck,
        description_book,
        book_category,
        date_book_added
    }
    if (!book) {
        book_name.classList.add("is-invalid")
    } else {
        book_name.classList.remove("is-invalid")
    }
    if (!author) {
        author_name.classList.add("is-invalid")
    } else {
        author_name.classList.remove("is-invalid")
    }
    if (!image_url) {
        book_image_url.classList.add("is-invalid")
    } else {
        book_image_url.classList.remove("is-invalid")
    }
    if (!description_book) {
        description.classList.add("is-invalid")
    } else {
        description.classList.remove("is-invalid")
    }
    if (!book_name || !author || !image_url || !description_book || !book_category ) {
        CustomToast().fire({
            icon: 'error',
            title: 'Fill in the necessary sections!'
        })
        setTimeout(()=>{
            book_name.classList.remove("is-invalid")
            author_name.classList.remove("is-invalid")
            book_image_url.classList.remove("is-invalid")
            description.classList.remove("is-invalid")
        },2000)
        return
    }
    writePushData('books', form)
    CustomToast().fire({
        icon: 'success',
        title: 'The operation was completed successfully!'
    })


    book_name.value="";
    author_name.value="";
    book_image_url.value="";
    book_publication_year.value="";
    isNew.checked=false
    isBestSeller.checked=false;
    description.value="";
})

/* ======================== Show Categories Collection ========================= */
onValue(ref(db, "categories"), renderCategory);

function renderCategory(snaphot) {
    const data = convertData(snaphot.val());
    let data_list = data.map((item, index) => {
        return `
            <option value="${item.id}">${item.category_name}</option>
        `
    }).join("")
    book_type.innerHTML = data_list;
    getBooksDatas(data)
    return data
}
/* ======================== Show Categories Collection ========================= */
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
            })
            let data_list_mapping = data_list.map((item, index) => {
                let single_category = category_list?.filter((category)=>{
                    if(category.id === item.book_category){
                        return category
                    }
                })
                return `
            <tr>
                <th>${index+1}</th>
                <td class="book-icon">
                    <img src="${item.image_url}" alt="">
                    <p>${item.book}</p>
                </td>
                <td>${item.description_book.substr(0, 15)}${item.description_book.length > 15 ? '...' : ''}</td>
                <td>${single_category[0].category_name}</td>
                <td>${item.author}</td>
                <td>
                <div class="d-flex align-items-center gap-1 justify-content-start">
                    <button type="button" class="text-danger btn removeBook" data-id="${item.id}"><i class="fas fa-trash"></i> </button> 
                    <button  class="text-success btn editDoc" data-id="${item.id}"><i class="fas fa-edit"></i> </button>
                </div>
                </td>
            </tr>
        `
            }).join("")
            book_data.innerHTML = data_list_mapping;

            let btns = document.getElementsByClassName('removeBook');
            for (let i = 0; i < btns.length; i++) {
                btns[i].addEventListener('click', function () {
                    let id = btns[i].getAttribute('data-id')
                    handlerRmv(id)
                })
            }
            let showDocs = document.getElementsByClassName('editDoc');
            for (let i = 0; i < showDocs.length; i++) {
                showDocs[i].addEventListener('click', function () {
                    let item = showDocs[i].getAttribute('data-id')
                    showData(item,category_list)
                })
            }

            return data_list
        }
    }).catch((err) => {
        console.log(err, 'err')
    })
}

onValue(ref(db, "books"),getBooksDatas)


function rmvData(id, col) {
    const dataRef = ref(db, col + "/" + id);
    remove(dataRef);
}

function handlerRmv(id) {
    modal_alert.classList.add("show");
    modal_body_custom.innerHTML=`
    <div class="alert alert-danger" role="alert">
        Are you sure delete book??
    </div>
    `
    submit_alert.addEventListener("click",function (){
        rmvData(id,'books')
        modal_alert.classList.remove("show")
        location.reload()
    })
    return id
}

async function showData(id,category_list) {
    let categories = category_list.map((category)=>{
        return `
            <option value="${category.id}">${category.category_name}</option>
        `
    })
    let dataRef = ref(db, 'books' + "/" + id);
    update_modal_box.classList.add("show")
    get(dataRef).then(function (snapshot) {
        let data = snapshot.val();
        book_name_update.value= data.book
        book_id.value= id
        author_name_update.value= data.author
        book_image_url_update.value= data.image_url
        book_publication_year_update.value= data.publication_year
        book_description_update.value= data.description_book
        book_type_update.innerHTML = categories;
        book_type_update.value = data.book_category
        if(data.isNewCheck === true){
            isNew_update.setAttribute('checked','checked')
        }else{
            isNew_update.removeAttribute('checked')
        }
        if(data.isBestSellerCheck === true) {
            isBestSeller_update.setAttribute('checked', 'checked')
        }else{
            isBestSeller_update.removeAttribute('checked')
        }
    }).catch(function (error) {
        console.error("Error getting data:", error);
    });
}
close_update?.addEventListener("click",function (){
    update_modal_box.classList.remove("show")
})

function uptData(id, col, data) {
    const dataRef = ref(db, col + "/" + id);
    update(dataRef, data);
}
update_book_btn.addEventListener("click",function (e){
    // e.preventDefault()
    let id = book_id.value;
    let book = book_name_update.value;
    let author = author_name_update.value;
    let image_url = book_image_url_update.value;
    let publication_year = book_publication_year_update.value;
    let isNewCheck = isNew_update.checked
    let isBestSellerCheck = isBestSeller_update.checked;
    let description_book = book_description_update.value;
    let book_category = book_type_update.value;

    let form_update = {
        book,
        author,
        image_url,
        publication_year,
        isNewCheck,
        isBestSellerCheck,
        description_book,
        book_category,
    }
    uptData(id,'books',form_update)
    update_modal_box.classList.remove("show")
})

