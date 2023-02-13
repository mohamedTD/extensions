(() => {
  let currentVideo = "";
  
  const addBookmarkBtn = () => {
    const ytbRightControls = document.querySelector(".ytp-right-controls");
    const btn = document.createElement("button");
    btn.className = "bookmark-btn ytp-button";
    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("assets/bookmark.png");
    img.style = "width: 100%;";

    btn.appendChild(img);
    ytbRightControls.insertAdjacentElement("beforebegin", btn);
  };

  const addingNewBookmarkToStorage = () => {
    console.log("yes i am working");
    // getting the current youtube video time
    const video = document.querySelector("#player video");
    const currentTimeStamp = secToTime(video.currentTime);

    // set previous timestamp to the storage
    const currentVideoBookmarks = fetchBookmarks();
    chrome.storage.local.set({
      currentVideo: [...currentVideoBookmarks, currentTimeStamp],
    });
  };

  const fetchBookmarks = () => {
    return chrome.storage.local.get(currentVideo)
      ? JSON.parse(chrome.storage.local.get(currentVideo))
      : [];
  };

  const secToTime = (sec) => {
    const h = 60 * 60;
    const m = 60;
    const s = 1;

    return `${Math.floor(sec / h)}:${Math.floor((sec % h) / m)}:${Math.floor(
      (sec % h) % m
    )}`;
  };
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, videoId } = message;
    currentVideo = videoId;
  
    // The message from the background script (an update happenned to the tabs system)
    if (type === "NEW") {
      const bookmark = document.querySelector(".bookmark-btn");
      // do noting when the bookmark button is already exists
      if (!bookmark) {
        // Add the bookmark button
        addBookmarkBtn();
  
        // adding a new bookmark handler
        bookmark.addEventListener("click", addingNewBookmarkToStorage);
      };
    }

  });
})();
