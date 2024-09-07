chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "makeRequest") {
    const baseUrl = "https://puranikitabay.vercel.app/api/search";
    const fullUrl = `${baseUrl}?q=${request.query.title.trim()}`;
    fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ success: true, data: data });
      })
      .catch((error) => {
        sendResponse({ success: false, error: "Failed to fetch data" });
      });

    return true;
  }
});
