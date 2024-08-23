chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("h");
  if (request.action === "updatePopup") {
    console.log("h");
    const matchingBook = request.matchingBook;
    const otherResults = request.otherResults;

    if (matchingBook) {
      const bookDetailsHtml = `
              <img src="${matchingBook.bookCover}" alt="${matchingBook.title}" class="book-cover">
              <h3>${matchingBook.title}</h3>
              <p>Author: ${matchingBook.author}</p>
              <p>Price: ₹${matchingBook.price}</p>
              <p>Source: ${matchingBook.source}</p>
              <a href="${matchingBook.productUrl}" target="_blank">Buy Now</a>
          `;
      document.getElementById("bookDetails").innerHTML = bookDetailsHtml;
    }

    let otherResultsHtml = "";
    otherResults.forEach((book) => {
      otherResultsHtml += `
                      <div class="book-details clearfix">
                          <img src="${book.bookCover}" alt="${book.title}" class="book-cover">
                          <h4>${book.title}</h4>
                          <p>Author: ${book.author}</p>
                          <p>Price: ₹${book.price}</p>
                          <p>Source: ${book.source}</p>
                          <a href="${book.productUrl}" target="_blank">Buy Now</a>
                      </div>
                  `;
    });
    document.getElementById("otherResults").innerHTML = otherResultsHtml;
  }
});
