/* ======================== HTML elements ========================= */
let contact_form = document.getElementById("contact_form");
let name_input = document.querySelector("#name");
let phone_input = document.querySelector("#phone");
let address_input = document.querySelector("#address");
let email_input = document.querySelector("#email");

import CustomToast from "./custom_toast.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
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
        CustomToast().fire({
            icon: 'error',
            title: 'Fill in the information correctly!'
        })
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
    CustomToast().fire({
        icon: 'success',
        title: 'Your request has been registered.'
    })
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.phone.value = "";
    e.target.address.value = "";
    e.target.note.value = "";
})