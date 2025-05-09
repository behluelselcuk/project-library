'use strict';

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

}

addBookToLibrary('Sherlock Holmes', 'Sir Arthur Conan Doyle', 203, true);
addBookToLibrary('Quran', 'Allah', 603, false);
addBookToLibrary('Eine kurze Geschichte der Zeit', 'Stephen Hawking', 271, false);
addBookToLibrary('Denken wie Sherlock', 'Daniel Smith', 181, false);

console.log(myLibrary);