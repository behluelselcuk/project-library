'use strict';

// Eingabe
const addBtn = document.querySelector('#add-btn');
const divAddBook = document.querySelector('#add-book');
const divBgOverlay = document.querySelector('#bg-overlay');
const form = document.querySelector('#form-add-book');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#num-pages');
const checkboxReadIt = document.querySelector('#read-it');
const divAddedBooks = document.querySelector('#show-added-books');


// Verarbeitung
const myLibrary = [];

function Book(title, author, pages, read) {

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

function addBookToLibrary(title, author, pages, read) {

    const book = new Book(title, author, pages, read);

    myLibrary.push(book);
    
    addBookToDOM()
}

function addBookToDOM() {

    divAddedBooks.innerHTML = '';

    myLibrary.forEach(book => {
        const id = book.id;
        const title = book.title;
        const author = book.author;
        const pages = book.pages;
        const readIt = book.read;

        divAddedBooks.innerHTML += `
        <div class="book" data-id='${id}'>
            <h1>"${title}"</h1>
            <div class="info">
                <p><span class='author'>Written by</span> ${author}</p>
                <p>${pages} pages</p>
            </div>
            <div class="buttons">
                <button class='read-btn read-${readIt}'></button>
                <button class='remove-btn'>Remove</button>
            </div>
        </div>
        `;

    });

    const readBtns = document.querySelectorAll('.read-btn');

    function toggleReadState(event) {
        const clickedBtn = event.target;

        if (clickedBtn.classList.contains('read-true')) {
            clickedBtn.innerHTML = 'Not read';
            clickedBtn.classList.remove('read-true');
            clickedBtn.classList.add('read-false');
        }
        else if (clickedBtn.classList.contains('read-false')) {
            clickedBtn.innerHTML = 'Read';
            clickedBtn.classList.remove('read-false');
            clickedBtn.classList.add('read-true');
        }
    };

    readBtns.forEach(btn => {

        if (btn.classList.contains('read-true')) {
            btn.innerHTML = 'Read';
        }
        else if (btn.classList.contains('read-false')) {
            btn.innerHTML = 'Not read';
        }

        btn.addEventListener('click', toggleReadState);
    });

    const removeBtns = document.querySelectorAll('.remove-btn');

    function removeBook(event) {


        const clickedBtn = event.target;
        const clickedBook = clickedBtn.closest('.book');
        const idOfClickedBook = clickedBook.dataset.id;

        const bookIndex = myLibrary.findIndex(book => book.id === idOfClickedBook);
        if (bookIndex > -1) {
            myLibrary.splice(bookIndex, 1);
        }

        clickedBook.remove();
    }
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', removeBook);
    });

}

function openDivAddBook() {
    if (!divAddBook.classList.contains('open') && !divBgOverlay.classList.contains('open')) {
        divAddBook.classList.add('open');
        divBgOverlay.classList.add('open');
    }
}

function addBook(event) {

    event.preventDefault();

    console.log(myLibrary);
    console.log('----------------------');

    addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, checkboxReadIt.checked);

    form.reset();

    if(divAddBook.classList.contains('open') && divBgOverlay.classList.contains('open')) {
        divAddBook.classList.remove('open');
        divBgOverlay.classList.remove('open');
    }

    console.log(myLibrary)
}

form.addEventListener('submit', addBook);

addBtn.addEventListener('click', openDivAddBook);
console.log(myLibrary)