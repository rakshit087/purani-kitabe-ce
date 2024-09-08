export function ClearButton() {
  return (
    <button
      onClick={() => {
        chrome.storage.local.remove("state", () => {
          chrome.action.setBadgeText({
            text: "",
          });
        });
      }}
    >
      Clear
    </button>
  );
}
