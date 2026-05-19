/* ============================
   ReadSphere - Home Page Logic
   ============================ */

const booksGrid = document.getElementById("books-grid");
const searchInput = document.getElementById("search-input");
const genreFilter = document.getElementById("genre-filter");
const emptyState = document.getElementById("empty-state");

let allBooks = [];
let currentGenre = "all";

// Load and display books
async function loadBooks() {
  showLoading();
  allBooks = await getAllBooks();
  populateGenreFilter();
  renderBooks(allBooks);
}

// Show loading spinner
function showLoading() {
  booksGrid.innerHTML = '<div class="spinner"></div>';
  emptyState.classList.add("hidden");
}

// Render books grid
function renderBooks(books) {
  if (books.length === 0) {
    booksGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  booksGrid.innerHTML = books
    .map(
      (book) => `
    <div class="book-card" onclick="openBookModal(${book.id})">
      ${book.aLire ? '<span class="badge">📖 À lire</span>' : ""}
      <img class="book-card-image" src="${book.couverture}" alt="${book.titre}" loading="lazy">
      <div class="book-card-body">
        <h3 class="book-card-title">${book.titre}</h3>
        <p class="book-card-author">by ${book.auteur}</p>
        <span class="book-card-genre">${book.genre}</span>
      </div>
    </div>
  `,
    )
    .join("");
}

// Populate genre filter dropdown
function populateGenreFilter() {
  const genres = [...new Set(allBooks.map((b) => b.genre))].sort();
  const currentValue = genreFilter.value;

  genreFilter.innerHTML = '<option value="all">All Genres</option>';
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });

  genreFilter.value = currentValue;
}

// Filter and search combined
function filterBooks() {
  const query = searchInput.value.toLowerCase().trim();
  const genre = genreFilter.value;

  let filtered = allBooks;

  // Genre filter
  if (genre !== "all") {
    filtered = filtered.filter((b) => b.genre === genre);
  }

  // Search filter
  if (query) {
    filtered = filtered.filter(
      (b) =>
        b.titre.toLowerCase().includes(query) ||
        b.auteur.toLowerCase().includes(query),
    );
  }

  renderBooks(filtered);
}

// Refresh books (called after modal actions)
async function refreshBooks() {
  allBooks = await getAllBooks();
  filterBooks();
}

// Event Listeners
searchInput.addEventListener("input", filterBooks);
genreFilter.addEventListener("change", filterBooks);

// Init
loadBooks();
