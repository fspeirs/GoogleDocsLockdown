// Background.js

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data
    if (changeInfo.status == 'complete' && tab.active) {
		chrome.tabs.executeScript(null, { file: "jquery-3.4.1.js" }, function() {
			chrome.tabs.executeScript(null, { file: "lockdown.js" });
		});
      // url has changed; do something here
      // like send message to content script
      chrome.tabs.sendMessage( tabId, {
        message: 'checkForPriorLockdown',
        url: changeInfo.url
      })
    }
  }
);