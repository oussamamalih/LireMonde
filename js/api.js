/* ============================
   ReadSphere - API Functions
   Base URL: http://localhost:3000/books
   ============================ */

const API_URL = "http://localhost:3000/books";

// GET all books
async function getAllBooks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch books");
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    showToast("Failed to load books", "error");
    return [];
  }
}

// GET book by ID
async function getBookById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch book");
    return await response.json();
  } catch (error) {
    console.error("Error fetching book:", error);
    showToast("Failed to load book details", "error");
    return null;
  }
}

// POST new book
async function addBook(book) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Failed to add book");
    showToast("Book added successfully!", "success");
    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error);
    showToast("Failed to add book", "error");
    return null;
  }
}

// DELETE book
async function deleteBook(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete book");
    showToast("Book deleted successfully!", "success");
    return true;
  } catch (error) {
    console.error("Error deleting book:", error);
    showToast("Failed to delete book", "error");
    return false;
  }
}

// PATCH toggle aLire status
async function toggleALire(id, currentStatus) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aLire: !currentStatus }),
    });
    if (!response.ok) throw new Error("Failed to update reading list");
    const updated = await response.json();
    const message = updated.aLire
      ? "Added to reading list!"
      : "Removed from reading list!";
    showToast(message, "success");
    return updated;
  } catch (error) {
    console.error("Error toggling aLire:", error);
    showToast("Failed to update reading list", "error");
    return null;
  }
}

// PUT update full book (for admin edit)
async function updateBook(id, bookData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error("Failed to update book");
    showToast("Book updated successfully!", "success");
    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error);
    showToast("Failed to update book", "error");
    return null;
  }
}

// Toast notification helper
function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
