// Function to extract product details
function extractProductDetails() {
  const product_details_element = document.querySelectorAll(
    "#detailBullets_feature_div .a-list-item"
  );

  if (product_details_element) {
    let product_details = {};
    for (const product_detail of product_details_element) {
      const spans = product_detail.querySelectorAll("span");
      if (spans.length >= 2) {
        const title = spans[0].textContent
          .trim()
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();
        const value = spans[1].textContent.trim();
        if (title && value) {
          product_details[title] = value;
        }
      }
    }

    // Check if the product is a book
    const isBook =
      product_details["genericname"] === "Book" ||
      "publisher" in product_details ||
      "isbn10" in product_details ||
      "isbn13" in product_details;

    if (isBook) {
      const isbn10 = product_details["isbn10"] || "";
      const isbn13 = (product_details["isbn13"] || "").replace(/-/g, "");
      const bookTitle = document.querySelector("#productTitle").innerHTML;
      const queryParams = `${isbn10} ${isbn13} ${bookTitle}`;
      chrome.runtime.sendMessage(
        { action: "makeRequest", query: queryParams },
        (response) => {
          console.log(response.data);
          const matchingBook = response.data.books.find(
            (book) =>
              book.isbn === isbn10 || book.isbn === isbn13.replace(/-/g, "")
          );
          if (matchingBook) {
            // Show popup with matching book and other results
            chrome.runtime.sendMessage({
              action: "updatePopup",
              matchingBook: matchingBook,
              otherResults: response.data.books.filter(
                (book) => book !== matchingBook
              ),
            });
          } else {
            chrome.runtime.sendMessage({
              action: "updatePopup",
              matchingBook: null,
              otherResults: response.data.books,
            });
          }
        }
      );
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", extractProductDetails);
} else {
  extractProductDetails();
}
