/* ======================== HTML elements ========================= */
let contact_form = document.getElementById("contact_form");
let name_input = document.querySelector("#name");
let phone_input = document.querySelector("#phone");
let address_input = document.querySelector("#address");
let email_input = document.querySelector("#email");
let alert_box = document.querySelector(".alert_box");
let contact_list = document.querySelector("#contact_list")
let modal_alert = document.querySelector(".modal_alert")
let close_alert = document.querySelector(".close_alert")
let submit_alert = document.querySelector(".submit_alert")
let modal_body_custom = document.querySelector(".modal_body_custom")
let modal_data = document.querySelector(".modal_data")
let modal_body_show = document.querySelector(".modal_body_show")
let close_data = document.querySelector(".close_data")


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
    remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6XY1TEOFV42mGOrBmRP0G2aD4HDTapNc",
    authDomain: "library-book-store-125e4.firebaseapp.com",
    databaseURL: "https://library-book-store-125e4-default-rtdb.firebaseio.com",
    projectId: "library-book-store-125e4",
    storageBucket: "library-book-store-125e4.appspot.com",
    messagingSenderId: "925545310186",
    appId: "1:925545310186:web:8d3daf513aa050ad5ab493"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getDatabase()

function writePushContactData(collection, data) {
    try {
        if (!collection) {
            alert('Required collection')
            return
        }
        const contactRef = ref(db, collection)
        push(contactRef, data)
    } catch (err) {
        console.log(err, 'err')
    }
}

contact_form?.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let phone = e.target.phone.value;
    let address = e.target.address.value;
    let note = e.target.note.value;

    if (!name) {
        name_input.classList.add("is-invalid")
    } else {
        name_input.classList.remove("is-invalid")
    }
    if (!email) {
        email_input.classList.add("is-invalid")
    } else {
        email_input.classList.remove("is-invalid")
    }
    if (!phone) {
        phone_input.classList.add("is-invalid")
    } else {
        phone_input.classList.remove("is-invalid")
    }
    if (!address) {
        address_input.classList.add("is-invalid")
    } else {
        address_input.classList.remove("is-invalid")
    }

    if (!name || !email || !phone || !address) {
        return
    }
    let form = {
        name,
        email,
        phone,
        address,
        note
    }
    writePushContactData('contacts', form)
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.phone.value = "";
    e.target.address.value = "";
    e.target.note.value = "";

    if (form) {
        alert_box.innerHTML = `
        <div class="alert mt-3 alert-success" role="alert">
          Form added!
        </div>
        `
    }
    setTimeout(() => {
        alert_box.innerHTML = ""
    }, 2000)
})

// onValue(ref(db, "contacts"), renderContacts);

// function convertData(d) {
//     const newData = Object.entries(d);
//
//     const myNewData = newData.map((arr) => {
//         const newObj = {
//             id: arr[0],
//             ...arr[1],
//         };
//
//         return newObj;
//     });
//
//     return myNewData;
// }
// function renderContacts(snaphot) {
//     const data = convertData(snaphot.val());
//     let data_list = data.map((item, index) => {
//         return `
//             <tr data-id="${item.id}">
//                 <th>${index + 1}</th>
//                 <td>${item.name}</td>
//                 <td>${item.address.substr(0, 10)}${item.address.length > 10 ? '...' : ''}</td>
//                 <td>${item.email}</td>
//                 <td>${item.phone}</td>
//                 <td>${item.note.substr(0, 10)}${item.note.length > 10 ? '...' : ''} </td>
//                 <td>
//                 <div class="d-flex align-items-center gap-1 justify-content-end">
//                     <button onclick="handlerRmv(item.id)" class="text-danger btn"><i class="fas fa-trash"></i> </button>
//                     <button onclick='showData(${item.id})' class="text-success btn"><i class="fas fa-eye"></i> </button>
//                 </div>
//                 </td>
//             </tr>
//         `
//     }).join("")
//     contact_list.innerHTML = data_list;
//     return data
// }



function getDatas() {
    const db_ref = ref(db)
    get(child(db_ref, 'contacts')).then((snapshot) => {
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
            <tr data-id="${item.id}">
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.address.substr(0, 10)}${item.address.length > 10 ? '...' : ''}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.note.substr(0, 10)}${item.note.length > 10 ? '...' : ''} </td>
                <td>
                <div class="d-flex align-items-center gap-1 justify-content-end">
                    <button type="button" class="text-danger btn removeDoc" data-id="${item.id}"><i class="fas fa-trash"></i> </button> 
                    <button  class="text-success btn showDoc" data-id="${item.id}"><i class="fas fa-eye"></i> </button>
                </div>
                </td>
            </tr>
        `
            }).join("")
            contact_list.innerHTML = data_list_mapping;

            let btns = document.getElementsByClassName('removeDoc');
            for (let i = 0; i < btns.length; i++) {
                btns[i].addEventListener('click', function () {
                    let id = btns[i].getAttribute('data-id')
                    handlerRmv(id)
                })
            }
            let showDocs = document.getElementsByClassName('showDoc');
            for (let i = 0; i < showDocs.length; i++) {
                showDocs[i].addEventListener('click', function () {
                    let item = showDocs[i].getAttribute('data-id')
                    showData(item)
                })
            }

            return data_list
        }
    }).catch((err) => {
        console.log(err, 'err')
    })
}

async function showData(id) {
    modal_data.classList.add("show");
    let dataRef = ref(db, 'contacts' + "/" + id);
    get(dataRef).then(function (snapshot) {
        let data = snapshot.val();
        modal_body_show.innerHTML = `
        <ul class="list-group">
          <li class="list-group-item">Name: ${data.name}</li>
          <li class="list-group-item">Address: ${data.address}</li>
          <li class="list-group-item">Phone: ${data.phone}</li>
          <li class="list-group-item">Email: ${data.email}</li>
          <li class="list-group-item">Note: ${data.note}</li>
        </ul>
`
    }).catch(function (error) {
        console.error("Error getting data:", error);
    });
}

getDatas()

function rmvData(id, col) {
    const dataRef = ref(db, col + "/" + id);
    remove(dataRef);
}

close_alert?.addEventListener('click',function (){
    modal_alert.classList.remove("show")
})
close_data?.addEventListener('click',function (){
    modal_data.classList.remove("show")
})

function handlerRmv(id) {
    modal_alert.classList.add("show");
    modal_body_custom.innerHTML=`
    <div class="alert alert-danger" role="alert">
        Are you sure delete contact??
    </div>
    `
    submit_alert.addEventListener("click",function (){
        rmvData(id,'contacts')
        modal_alert.classList.remove("show")
        location.reload()
    })
    return id
}



