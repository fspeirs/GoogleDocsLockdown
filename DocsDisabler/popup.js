chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data
    if (changeInfo.status == 'complete' && tab.active) {
		chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
			chrome.tabs.executeScript(null, { file: "content.js" });
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

chrome.browserAction.onClicked.addListener(function(tab) {
  //lock_page();
});

chrome.webNavigation.onDOMContentLoaded.addListener(function() {
  console.log("popup webcontent loaded");
});

function lock_page() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	var activeTab = tabs[0];
    	chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  	});
}

//document.getElementById('save').addEventListener('click', save_options);