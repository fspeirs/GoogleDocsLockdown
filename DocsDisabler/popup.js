var spelling_on = false;

function lock_page() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	var activeTab = tabs[0];
    	chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action",
    											"spelling_on": spelling_on});
  	});
}

document.querySelector('#checkPage').addEventListener('click', function() { lock_page(); });

$('#spelling').on('click', function() {
	spelling_on = !spelling_on;
});