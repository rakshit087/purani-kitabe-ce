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
      chrome.runtime.sendMessage(
        {
          action: "makeRequest",
          query: {
            isbn10: isbn10,
            isbn13: isbn13,
            title: bookTitle,
          },
        },
        (response) => {
          chrome.storage.local.set({ books: response.data.books }, () => {
            chrome.action.setBadgeText({
              text: "!",
            });
            chrome.action.setBadgeBackgroundColor({ color: "#9688F1" });
          });
        }
      );
    } else {
      chrome.storage.local.remove("books", () => {
        chrome.action.setBadgeText({
          text: "",
        });
      });
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", extractProductDetails);
} else {
  extractProductDetails();
}
