

function lock_page() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	var activeTab = tabs[0];
    	chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  	});
}

document.querySelector('#checkPage').addEventListener('click', function() { lock_page(); });