/* ============================
   ReadSphere - Admin Dashboard
   ============================ */

const adminTableBody = document.getElementById("admin-table-body");
const bookForm = document.getElementById("book-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const bookIdField = document.getElementById("book-id");

let isEditing = false;

// Load all books in table
async function loadAdminBooks() {
  const books = await getAllBooks();
  renderTable(books);
}

// Render admin table
function renderTable(books) {
  adminTableBody.innerHTML = books
    .map(
      (book) => `
    <tr>
      <td><img src="${book.couverture}" alt="${book.titre}"></td>
      <td><strong>${book.titre}</strong></td>
      <td>${book.auteur}</td>
      <td><span class="book-card-genre">${book.genre}</span></td>
      <td>${book.aLire ? "✅ Yes" : "❌ No"}</td>
      <td>
        <button class="btn btn-primary btn-small" onclick="editBook(${book.id})">✏️ Edit</button>
        <button class="btn btn-danger btn-small" onclick="deleteBookAdmin(${book.id})">🗑️ Delete</button>
      </td>
    </tr>
  `,
    )
    .join("");
}

// Handle form submit (Add or Update)
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bookData = {
    titre: document.getElementById("titre").value.trim(),
    auteur: document.getElementById("auteur").value.trim(),
    genre: document.getElementById("genre").value.trim(),
    description: document.getElementById("description").value.trim(),
    couverture: document.getElementById("couverture").value.trim(),
    aLire: document.getElementById("aLire").checked,
  };

  if (isEditing) {
    const id = bookIdField.value;
    await updateBook(id, bookData);
  } else {
    await addBook(bookData);
  }

  resetForm();
  loadAdminBooks();
});

// Edit book - fill form
async function editBook(id) {
  const book = await getBookById(id);
  if (!book) return;

  document.getElementById("titre").value = book.titre;
  document.getElementById("auteur").value = book.auteur;
  document.getElementById("genre").value = book.genre;
  document.getElementById("description").value = book.description;
  document.getElementById("couverture").value = book.couverture;
  document.getElementById("aLire").checked = book.aLire;
  bookIdField.value = book.id;

  isEditing = true;
  formTitle.textContent = "✏️ Edit Book";
  submitBtn.textContent = "Update Book";
  cancelBtn.classList.remove("hidden");

  // Scroll to form
  bookForm.scrollIntoView({ behavior: "smooth" });
}

// Delete book
async function deleteBookAdmin(id) {
  if (!confirm("Are you sure you want to delete this book?")) return;
  const success = await deleteBook(id);
  if (success) loadAdminBooks();
}

// Reset form
function resetForm() {
  bookForm.reset();
  bookIdField.value = "";
  isEditing = false;
  formTitle.textContent = "➕ Add New Book";
  submitBtn.textContent = "Add Book";
  cancelBtn.classList.add("hidden");
}

// Cancel edit
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetForm();
});

// Init
loadAdminBooks();
