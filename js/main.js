let allBooks = [];
let currentFilter = "all";

const booksGrid = document.getElementById("booksGrid");
const genreFilters = document.getElementById("genreFilters");
const searchInput = document.getElementById("searchInput");
const toReadCount = document.getElementById("toReadCount");

document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
});

async function loadBooks() {
  allBooks = await getAllBooks();
  createGenreButtons(allBooks);
  displayBooks(allBooks);
  updateToReadCount(allBooks);
}

// Function to create genre filter buttons
function createGenreButtons(books) {
  let genres = [];
  books.forEach(function (book) {
    if (!genres.includes(book.genre)) {
      genres.push(book.genre);
    }
  });

  genres.forEach(function (genre) {
    let btn = document.createElement("button");
    btn.className = "genre-btn";
    btn.textContent = genre;
    btn.setAttribute("data-genre", genre);
    btn.onclick = function () {
      filterByGenre(genre, btn);
    };
    genreFilters.appendChild(btn);
  });
}

// Function to filter books by genre
function filterByGenre(genre, clickedBtn) {
  currentFilter = genre;

  let buttons = genreFilters.querySelectorAll(".genre-btn");
  buttons.forEach(function (button) {
    button.classList.remove("active");
  });
  clickedBtn.classList.add("active");

  let filtered = filterBooks(allBooks, searchInput.value);
  displayBooks(filtered);
}

// Function to display books in grid
function displayBooks(books) {
  booksGrid.innerHTML = "";

  if (books.length === 0) {
    booksGrid.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; color: #7f8c8d;">No books found.</p>';
    return;
  }

  books.forEach(function (book) {
    let card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <span class="book-genre">${book.genre}</span>
            </div>
        `;
    card.onclick = function () {
      openModal(book.id);
    };
    booksGrid.appendChild(card);
  });
}

searchInput.addEventListener("input", function () {
  let filtered = filterBooks(allBooks, searchInput.value);
  displayBooks(filtered);
});

// Function to filter books by search and genre
function filterBooks(books, searchText) {
  let result = [];
  let text = searchText.toLowerCase();

  books.forEach(function (book) {
    let matchesSearch =
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text);
    let matchesGenre = currentFilter === "all" || book.genre === currentFilter;

    if (matchesSearch && matchesGenre) {
      result.push(book);
    }
  });

  return result;
}

// Function to update "To Read" counter
function updateToReadCount(books) {
  let count = 0;
  books.forEach(function (book) {
    if (book.toRead) count++;
  });
  toReadCount.textContent = count;
}
