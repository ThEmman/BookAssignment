let myLibrary = [];

// Constructor Function called Book
const Book = function (title = "", author = "", pages = 0, readYet = false) {
  this.id = Math.random().toString();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = readYet;
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "Has been read" : "Not read yet"
  }.`;
};

//? Random comment
Book.prototype.isRead = function () {
  this.read = this.read ? false : true;
  return this.read;
};

// Adds books to library
function addBooktoLibrary(...bookObjects) {
  for (let book of bookObjects) {
    if (Object.getPrototypeOf(book) !== Book.prototype) {
      console.log("Not a book");
      return;
    }

    if (myLibrary.includes(book)) {
      console.log("One book already in library");
      return;
    }

    myLibrary.push(book);
  }

  displayLibrary();
}

// Display Library

function displayLibrary() {
  const cards = document.querySelector(".cards");
  let allCards = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const id = myLibrary[i].id;
    const title = myLibrary[i].title;
    const info = myLibrary[i].info();

    allCards +=
      "\n" +
      `
  <div class="card" data-id=${id}>
        <img
          src="george-kedenburg-iii-UltFSouabKM-unsplash.jpg"
          alt="Avatar"
          style="width: 100%; height: 100%"
        />
        <div class="container">
          <h4><b>${title}</b></h4>
          <p>${info}</p>
        </div>
        <button class="simple-button del-book" data-id=${id} onclick=onClickDeleteBook(event)>DELETE BOOK</button>
  </div>`;
  }

  cards.innerHTML = ""; // Clears old data
  cards.innerHTML = allCards;
}

function onClickDeleteBook(event) {
  const bookId = event.target.dataset.id;
  myLibrary = myLibrary.filter((book) => {
    return book.id != bookId;
  });

  console.log(myLibrary);
  displayLibrary();
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295);
const theMan = new Book("The Man", "J.R.R. Tolkien", 295);
const theBaby = new Book("The Baby", "J.R.R. Tolkien", 295);
addBooktoLibrary(theHobbit, theMan, theBaby);

console.log(myLibrary);
