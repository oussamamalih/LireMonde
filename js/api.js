// ============================================
// API.JS - All API calls in one file
// ============================================

// API URL never changes - use const
const API_URL = "http://localhost:3000/books";

// Function to get all books
async function getAllBooks() {
  try {
    let response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network error: " + response.status);
    }
    let books = await response.json();
    return books;
  } catch (error) {
    console.log("Error getting books:", error);
    alert("Could not load books. Please check if JSON Server is running.");
    return [];
  }
}

// Function to get one book by ID
async function getBookById(id) {
  try {
    let response = await fetch(API_URL + "/" + id);
    if (!response.ok) {
      throw new Error("Network error: " + response.status);
    }
    let book = await response.json();
    return book;
  } catch (error) {
    console.log("Error getting book:", error);
    alert("Could not load book details.");
    return null;
  }
}

// Function to add a new book
async function addBook(bookData) {
  try {
    let response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error("Network error: " + response.status);
    }
    let newBook = await response.json();
    return newBook;
  } catch (error) {
    console.log("Error adding book:", error);
    alert("Could not add book.");
    return null;
  }
}

// Function to update a book
async function updateBook(id, bookData) {
  try {
    let response = await fetch(API_URL + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error("Network error: " + response.status);
    }
    let updatedBook = await response.json();
    return updatedBook;
  } catch (error) {
    console.log("Error updating book:", error);
    alert("Could not update book.");
    return null;
  }
}

// Function to delete a book
async function deleteBook(id) {
  try {
    let response = await fetch(API_URL + "/" + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network error: " + response.status);
    }
    return true;
  } catch (error) {
    console.log("Error deleting book:", error);
    alert("Could not delete book.");
    return false;
  }
}

// Function to toggle "To Read" status
async function toggleToRead(id, currentStatus) {
  try {
    let response = await fetch(API_URL + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toRead: !currentStatus,
      }),
    });
    if (!response.ok) {
      throw new Error("Network error: " + response.status);
    }
    let updatedBook = await response.json();
    return updatedBook;
  } catch (error) {
    console.log("Error updating toRead:", error);
    alert("Could not update reading list.");
    return null;
  }
}
