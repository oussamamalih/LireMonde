// ============================================
// MODAL.JS - Book details modal
// ============================================

// DOM elements - const is fine
const modal = document.getElementById("bookModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close-btn");

// Close modal when clicking X
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Function to open modal with book details
async function openModal(bookId) {
  let book = await getBookById(bookId);
  if (!book) return;

  let buttonText = book.toRead ? "Remove from To Read" : "Add to To Read";
  let buttonClass = book.toRead ? "btn-remove" : "btn-add";

  modalBody.innerHTML = `
        <div class="modal-book">
            <img src="${book.cover}" alt="${book.title}">
            <div class="modal-details">
                <h2>${book.title}</h2>
                <p class="author">by ${book.author}</p>
                <span class="genre-tag">${book.genre}</span>
                <p class="description">${book.description}</p>
                <button class="btn-to-read ${buttonClass}" onclick="handleToRead(${book.id}, ${book.toRead})">
                    ${buttonText}
                </button>
            </div>
        </div>
    `;

  modal.style.display = "block";
}

// Function to handle Add/Remove from To Read
async function handleToRead(id, currentStatus) {
  let updated = await toggleToRead(id, currentStatus);
  if (updated) {
    modal.style.display = "none";
    // Refresh the page data
    allBooks = await getAllBooks();
    displayBooks(filterBooks(allBooks, searchInput.value));
    updateToReadCount(allBooks);
  }
}
