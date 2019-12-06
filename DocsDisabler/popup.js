chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data
    if (changeInfo.status == 'complete' && tab.active) {
      // url has changed; do something here
      // like send message to content script
      chrome.tabs.sendMessage( tabId, {
        message: 'checkForPriorLockdown',
        url: changeInfo.url
      })
    }
  }
);

chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.webNavigation.onDOMContentLoaded.addListener(function() {
  console.log("popup webcontent loaded");
});