// ============================================
// MAIN.JS - Homepage functionality
// ============================================

// Variables to store data
let allBooks = [];
let currentFilter = "all";

// Get elements from HTML
let booksGrid = document.getElementById("booksGrid");
let genreFilters = document.getElementById("genreFilters");
let searchInput = document.getElementById("searchInput");
let toReadCount = document.getElementById("toReadCount");

// Run when page loads
document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
});

// Function to load and display books
async function loadBooks() {
  allBooks = await getAllBooks();
  createGenreButtons(allBooks);
  displayBooks(allBooks);
  updateToReadCount(allBooks);
}

// Function to create genre filter buttons
function createGenreButtons(books) {
  // Get unique genres
  let genres = [];
  for (let i = 0; i < books.length; i++) {
    if (!genres.includes(books[i].genre)) {
      genres.push(books[i].genre);
    }
  }

  // Create button for each genre
  for (let i = 0; i < genres.length; i++) {
    let btn = document.createElement("button");
    btn.className = "genre-btn";
    btn.textContent = genres[i];
    btn.setAttribute("data-genre", genres[i]);
    btn.onclick = function () {
      filterByGenre(genres[i], btn);
    };
    genreFilters.appendChild(btn);
  }
}

// Function to filter books by genre
function filterByGenre(genre, clickedBtn) {
  currentFilter = genre;

  // Update active button style
  let buttons = genreFilters.querySelectorAll(".genre-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  clickedBtn.classList.add("active");

  // Filter and display
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
            </div>
        `;
    card.onclick = function () {
      openModal(book.id);
    };
    booksGrid.appendChild(card);
  }
}

// Search functionality
searchInput.addEventListener("input", function () {
  let filtered = filterBooks(allBooks, searchInput.value);
  displayBooks(filtered);
});

// Function to filter books by search and genre
function filterBooks(books, searchText) {
  let result = [];
  let text = searchText.toLowerCase();

  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let matchesSearch =
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text);
    let matchesGenre = currentFilter === "all" || book.genre === currentFilter;

    if (matchesSearch && matchesGenre) {
      result.push(book);
    }
  }

  return result;
}

// Function to update "To Read" counter
function updateToReadCount(books) {
  let count = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].toRead) {
      count++;
    }
  }
  toReadCount.textContent = count;
}
