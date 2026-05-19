/* ============================
   ReadSphere - Reading List Page
   ============================ */

const aLireGrid = document.getElementById("alire-grid");
const aLireEmpty = document.getElementById("alire-empty");

// Load reading list books
async function loadALireBooks() {
  showLoading();
  const books = await getAllBooks();
  const aLireBooks = books.filter((b) => b.aLire);

  if (aLireBooks.length === 0) {
    aLireGrid.innerHTML = "";
    aLireEmpty.classList.remove("hidden");
    return;
  }

  aLireEmpty.classList.add("hidden");
  aLireGrid.innerHTML = aLireBooks
    .map(
      (book) => `
    <div class="book-card" onclick="openBookModal(${book.id})">
      <span class="badge">📖 À lire</span>
      <img class="book-card-image" src="${book.couverture}" alt="${book.titre}" loading="lazy">
      <div class="book-card-body">
        <h3 class="book-card-title">${book.titre}</h3>
        <p class="book-card-author">by ${book.auteur}</p>
        <span class="book-card-genre">${book.genre}</span>
        <div class="mt-2">
          <button class="btn btn-danger btn-small" onclick="event.stopPropagation(); removeFromALire(${book.id})">
            ❌ Remove
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Show loading
function showLoading() {
  aLireGrid.innerHTML = '<div class="spinner"></div>';
  aLireEmpty.classList.add("hidden");
}

// Remove from reading list
async function removeFromALire(id) {
  await toggleALire(id, true); // true = currently in list, so toggle removes it
  loadALireBooks();
}

// Init
loadALireBooks();
