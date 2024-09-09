export function ClearButton() {
  return (
    <button
      className="bg-black text-white text-xs w-16 py-1 rounded-md"
      onClick={() => {
        chrome.storage.local.set({
          state: {
            applicationState: "idle",
            searchQuery: "",
            books: [],
          },
        });
      }}
    >
      Clear
    </button>
  );
}
