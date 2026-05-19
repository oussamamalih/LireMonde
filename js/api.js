const API_URL = "http://localhost:3000/books";

async function getBooks() {
  try {
    const response = await fetch(API_URL);

    const books = await response.json();

    return books;
  } catch (error) {
    console.log("Error :", error);
  }
}

async function getBook(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    const book = await response.json();

    return book;
  } catch (error) {
    console.log("Error :", error);
  }
}

async function addBook(bookData) {
  try {
    await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bookData),
    });
  } catch (error) {
    console.log("Error :", error);
  }
}

async function deleteBook(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("Error :", error);
  }
}

async function updateBook(id, updatedData) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updatedData),
    });
  } catch (error) {
    console.log("Error :", error);
  }
}

async function toggleRead(id, currentValue) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        aLire: !currentValue,
      }),
    });
  } catch (error) {
    console.log("Error :", error);
  }
}

async function searchBooks(keyword) {
  try {
    const response = await fetch(`${API_URL}?q=${keyword}`);

    const books = await response.json();

    return books;
  } catch (error) {
    console.log("Error :", error);
  }
}

async function filterBooks(genre) {
  try {
    const response = await fetch(`${API_URL}?genre=${genre}`);

    const books = await response.json();

    return books;
  } catch (error) {
    console.log("Error :", error);
  }
}
