var spelling_on = false;

// Locks the page
function lock_page() {
	// Here, we need to abort if the document is already locked-down.
	// Otherwise, the candidate can overwrite our lockdown password with theirs and then unlock it.
	passcodeExists(function(pcExists) {
		if(pcExists) {
			$('#lockdownfail').show();
		} else {
			$('#lockdownfail').hide();
			storePasscode(document.getElementById('passcode').value);
			document.getElementById('passcode').value = "";
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action",
														"spelling_on": spelling_on,
														"passcode": passcode});
			});
		}
	});
  
}


// Returns true if a passcode exists in the chrome.storage
function passcodeExists(callbackFunction) {
  chrome.storage.local.get(['passcode'], function(result) {
    	callbackFunction(result.passcode !== undefined);
  });
}

// Stores a passcode in chrome storage.
function storePasscode(pc) {
  chrome.storage.local.set({'passcode': pc}, function() {
    console.log('stored passcode');
  });
}

// Verifies whether the given passcode matches the one in Chrome storage.
function verifyPasscode(pc, callbackFunction) {
  chrome.storage.local.get(['passcode'], function(result) {
    callbackFunction(pc === result.passcode);
  });
}

/************************************
 * Document Code.
 ************************************/
document.querySelector('#checkPage').addEventListener('click', function() {
	$('.fail').hide();
	$('.success').hide();
	lock_page();
});

document.querySelector('#unlock').addEventListener('click', function() {
	$('.fail').hide();
	$('.success').hide();
  console.log("Unlock Attempt");
  var pc = document.getElementById('passcode').value;

  verifyPasscode(pc, function(result) {
  	if(result) {
	  	console.log("passcode verified - clearing storage")
		chrome.storage.local.clear();
		$("#unlockfail").hide();
		$("#unlocksuccess").show();
  	} else {
  		console.log("Passcode not verified.")
  		$("#unlockfail").show();
  		$("#unlocksuccess").hide();
  	}
  });
});

var tmp;
$('#testpasscode').on('click', function() {
	chrome.storage.local.clear();
});

$('#spelling').on('click', function() {
	spelling_on = !spelling_on;
});
