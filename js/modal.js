/* ============================
   ReadSphere - Modal Logic
   ============================ */

const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");

// Open modal with book details
async function openBookModal(bookId) {
  const book = await getBookById(bookId);
  if (!book) return;

  const isInList = book.aLire;

  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeModal()">&times;</button>
    <img class="modal-image" src="${book.couverture}" alt="${book.titre}">
    <div class="modal-body">
      <h2 class="modal-title">${book.titre}</h2>
      <div class="modal-meta">
        <span><i class="icon">✍️</i> ${book.auteur}</span>
        <span><i class="icon">🏷️</i> ${book.genre}</span>
        ${book.aLire ? '<span><i class="icon">📖</i> In Reading List</span>' : ""}
      </div>
      <p class="modal-description">${book.description}</p>
      <div class="modal-actions">
        <button class="btn ${isInList ? "btn-danger" : "btn-primary"}" onclick="handleModalToggle(${book.id}, ${isInList})">
          ${isInList ? "❌ Remove from À lire" : "✅ Add to À lire"}
        </button>
        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      </div>
    </div>
  `;

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Handle toggle from modal
async function handleModalToggle(id, currentStatus) {
  await toggleALire(id, currentStatus);
  closeModal();
  // Refresh the page's book list if function exists
  if (typeof refreshBooks === "function") refreshBooks();
  if (typeof loadALireBooks === "function") loadALireBooks();
}

// Close on overlay click
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});
