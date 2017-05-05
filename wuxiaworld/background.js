// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    // No tabs or host permissions needed!
    console.log('Running content script');
    chrome.tabs.executeScript(null, {
        file: "content.js"
    });
});