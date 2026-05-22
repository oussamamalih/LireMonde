// ============================================
// ALIRE.JS - To Read list page
// ============================================

// DOM elements - const is fine
const toReadList = document.getElementById("toReadList");
const emptyMessage = document.getElementById("emptyMessage");
const toReadCount = document.getElementById("toReadCount");

// Run when page loads
document.addEventListener("DOMContentLoaded", function () {
  loadToReadBooks();
});

// Function to load To Read books
async function loadToReadBooks() {
  let books = await getAllBooks();
  let toReadBooks = [];

  // Find only books with toRead = true
  for (let i = 0; i < books.length; i++) {
    if (books[i].toRead) {
      toReadBooks.push(books[i]);
    }
  }

  // Update counter
  let count = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].toRead) count++;
  }
  toReadCount.textContent = count;

  // Show empty message or books
  if (toReadBooks.length === 0) {
    toReadList.style.display = "none";
    emptyMessage.style.display = "block";
  } else {
    toReadList.style.display = "grid";
    emptyMessage.style.display = "none";
    displayToReadBooks(toReadBooks);
  }
}

// Function to display To Read books
function displayToReadBooks(books) {
  toReadList.innerHTML = "";

  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <span class="book-genre">${book.genre}</span>
                <br><br>
                <button class="btn btn-danger" onclick="removeFromToRead(${book.id})">
                    Remove from List
                </button>
            </div>
        `;
    toReadList.appendChild(card);
  }
}

// Function to remove book from To Read
async function removeFromToRead(id) {
  let updated = await toggleToRead(id, true); // true because it's currently in list
  if (updated) {
    loadToReadBooks(); // Refresh the list
  }
}
