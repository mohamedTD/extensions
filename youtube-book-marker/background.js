// Send a message to the content script when an update accures and the current page is youtube.com/watch (a youtube video is playing)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(tab.url && tab.url.includes("youtube.com/watch")) {
    const urlParams = tab.url.split('?')[1];
    const urlSearchParams = new URLSearchParams(urlParams);
    const videoId = urlSearchParams.get("v");

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: videoId
    });
  }
});