// ============================================
// ADMIN.JS - Admin dashboard functionality
// ============================================

// DOM elements - const is fine (we don't reassign these variables)
const bookForm = document.getElementById("bookForm");
const formTitle = document.getElementById("formTitle");
const bookIdInput = document.getElementById("bookId");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const genreInput = document.getElementById("genre");
const coverInput = document.getElementById("cover");
const descriptionInput = document.getElementById("description");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const tableBody = document.getElementById("tableBody");

// MUST be let - toggles between true and false
let isEditing = false;

// Run when page loads
document.addEventListener("DOMContentLoaded", function () {
  loadBooksTable();
});

// Form submit handler
bookForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Stop page from reloading

  // Get values from form
  let bookData = {
    title: titleInput.value,
    author: authorInput.value,
    genre: genreInput.value,
    cover: coverInput.value,
    description: descriptionInput.value,
    toRead: false,
  };

  if (isEditing) {
    // Update existing book
    let id = parseInt(bookIdInput.value);
    let updated = await updateBook(id, bookData);
    if (updated) {
      resetForm();
      loadBooksTable();
      alert("Book updated successfully!");
    }
  } else {
    // Add new book
    let newBook = await addBook(bookData);
    if (newBook) {
      resetForm();
      loadBooksTable();
      alert("Book added successfully!");
    }
  }
});

// Cancel button handler
cancelBtn.onclick = function () {
  resetForm();
};

// Function to load books into table
async function loadBooksTable() {
  let books = await getAllBooks();
  tableBody.innerHTML = "";

  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${book.id}</td>
            <td><img src="${book.cover}" alt="${book.title}"></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td class="table-actions">
                <button class="btn-warning" onclick="editBook(${book.id})">Edit</button>
                <button class="btn-danger" onclick="deleteBookById(${book.id})">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  }
}

// Function to fill form for editing
async function editBook(id) {
  let book = await getBookById(id);
  if (!book) return;

  // Fill form with book data
  bookIdInput.value = book.id;
  titleInput.value = book.title;
  authorInput.value = book.author;
  genreInput.value = book.genre;
  coverInput.value = book.cover;
  descriptionInput.value = book.description;

  // Change form to edit mode
  isEditing = true;
  formTitle.textContent = "Edit Book";
  submitBtn.textContent = "Update Book";
  cancelBtn.style.display = "inline-block";

  // Scroll to form
  bookForm.scrollIntoView({ behavior: "smooth" });
}

// Function to delete a book
async function deleteBookById(id) {
  let confirmDelete = confirm("Are you sure you want to delete this book?");
  if (!confirmDelete) return;

  let success = await deleteBook(id);
  if (success) {
    loadBooksTable();
    alert("Book deleted successfully!");
  }
}

// Function to reset form
function resetForm() {
  bookForm.reset();
  bookIdInput.value = "";
  isEditing = false;
  formTitle.textContent = "Add New Book";
  submitBtn.textContent = "Add Book";
  cancelBtn.style.display = "none";
}
