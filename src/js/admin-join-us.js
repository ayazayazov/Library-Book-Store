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

const joinUsTableBody = document.querySelector('#joinUsTableBody')

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

function renderJoinList(snaphot) {
    const data = convertData(snaphot.val());
    let data_list = data.map((item,index)=>{
        return `
            <tr data-id="${item.id}">
                <th>${index+1}</th>
                <td>${item.fullname}</td>
                <td>${item.email}</td>
            </tr>
        `
    }).join("")
    joinUsTableBody.innerHTML = data_list
    return data
}

onValue(ref(db, 'join-us'), renderJoinList);