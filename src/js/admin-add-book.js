const bookSearchInput = document.querySelector('#bookSearchInput')
const bookSearchList = document.querySelector('#bookSearchList')
const searchResult = document.querySelector('#searchResult')
const bookName = document.querySelector('#book_name')
const authorName = document.querySelector('#author_name')
const bookImgURL = document.querySelector('#book_image_url')
const description = document.querySelector('#description')
const bookPublicationYear = document.querySelector('#book_publication_year')

async function getBook(bookName){
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`)
        const data = await response.json()
        // const authors = data.items[0].volumeInfo.authors?.toString()
        // const title = data.items[0].volumeInfo.title
        // console.log(authors, title);
        // console.log(data.items);
        return data.items
    } catch (err) {
        console.log('err',err);
    }
}

async function showSearchBookList(input){
    const data = await getBook(input)
    bookSearchList.innerHTML = data.map((book) =>`
    <button value=${book.id} class="book-btn"><i class="far fa-clock"></i>${book.volumeInfo.authors?.toString().substr(0,16)}${book.volumeInfo.authors?.toString().length > 10? '...' : ''}&emsp;&ensp;${book.volumeInfo.title?.substr(0,19)}${book.volumeInfo.title?.length > 10? '...' : ''}</button>`).join('')
}

// showSearchBookList('apple')

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function saveInput(){
    searchResult.style.display = 'block'
    if(bookSearchInput.value === ''){
        searchResult.style.display = 'none'
        return
    }
    showSearchBookList(bookSearchInput.value)
}

const processChange = debounce(() => saveInput());

async function getBookByID(BookID){
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${BookID}`)
        const data = await response.json()
        // const authors = data.items[0].volumeInfo.authors?.toString()
        // const title = data.items[0].volumeInfo.title
        // console.log(authors, title);
        console.log(data);
        return data
    } catch (err) {
        console.log('err', err);
    }
}

bookSearchList.addEventListener('click', async(e)=>{
    const bookID = e.target.value;
    const bookForm = await getBookByID(bookID)
    bookName.value = bookForm.volumeInfo.title
    authorName.value = bookForm.volumeInfo.authors.toString()
    bookImgURL.value = bookForm.volumeInfo.imageLinks.thumbnail
    bookPublicationYear.value = bookForm.volumeInfo.publishedDate
    description.value = bookForm.volumeInfo.description
    searchResult.style.display = 'none'
    bookSearchInput.value = ''
})


function clearInput(){
    bookSearchInput.value = ''
    searchResult.style.display = 'none'
}