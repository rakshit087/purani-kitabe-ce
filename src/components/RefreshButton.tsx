const RefreshButton = () => {
  const handleRefresh = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "refreshProductDetails",
        });
      }
    });
  };

  return (
    <button
      onClick={handleRefresh}
      className="text-xs bg-black text-white w-16 py-1 rounded-md"
    >
      Refresh
    </button>
  );
};

export default RefreshButton;
