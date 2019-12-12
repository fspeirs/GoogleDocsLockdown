var spelling_on = false;
var passcode = "";

function lock_page() {
  storePasscode(document.getElementById('passcode'));
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	var activeTab = tabs[0];
    	chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action",
    						"spelling_on": spelling_on,
						"passcode": passcode});
  	});
}

document.querySelector('#checkPage').addEventListener('click', function() {
	// Update passcode variable
	passcode = document.getElementById('passcode').value;
	chrome.storage.local.set({'passcode': passcode});
	lock_page();
});

function passcodeExists() {
  var pass;
  chrome.storage.local.get(['passcode'], function(result) {
    pass = result.passcode;
  });
  
  return pass !== undefined;
}

function storePasscode(pc) {
  chrome.storage.local.set({'passcode': pc}, function() {
    console.log('stored passcode');
  });
}

function verifyPasscode(pc) {
  var pass;
  chrome.storage.local.get(['passcode'], function(result) {
    pass = result.passcode;
  });
  
  return pc === pass;
}

document.querySelector('#unlock').addEventListener('click', function() {
  console.log("Unlock Attempt");
  var pc = document.getElementById('passcode').value;
  if(passcodeExists()) {
    console.log("Passcode exists")
  }
  
  if(verifyPasscode(pc)) {
    console.log("passcode verified - clearing storage")
    chrome.storage.local.clear();
  }
});

$('#spelling').on('click', function() {
	spelling_on = !spelling_on;
});
