var spelling_on = false;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'checkForPriorLockdown') {
      chrome.storage.local.get(['priorLockdown'], function(result) {
        console.log("Prior lockdown: " + result.priorLockdown);
        if(result.priorLockdown === undefined) {
          console.log("Lockdown status not defined.")
        } else {
          lockdown();
        }
      });
    }
});



function removeElement(e) {
  var element = document.getElementById(e);
  element.style.display = 'none';
  console.log("Deleted: " + e);
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removeBySelector(s) {
	console.log("Hiding by selector: " + s);
	var element = document.querySelector(s);
	element.style.display = 'none';
	console.log("Hid by selector:" + s);
}

function saveLockdownStatus() {
	chrome.storage.local.set({'priorLockdown': '1'}, function() {
		console.log("Saved lockdown status")
	});
}

function interceptContextMenu() {
	$(".kix-canvas-tile-content").contextmenu(function() {
		return false;
	});
}

function lockdown() {
	// These elements should always be hidden
	var general_elements = ["docs-tools-menu", 
						  "docs-help-menu",
						  "docs-extensions-menu",
						  "insertImageButton",
						  "insertCommentButton",
						  "insertLinkButton"];
				  
	// These elements should only be hidden if spelling is off.
	var spelling_elements = ["spellGrammarCheckButton"];
	if(spelling_on) {
		// If spelling should be turned on, we should NOT remove spellGrammarCheckButton
		spelling_elements = [];
	}

	var insert_elements = ["docs-insert-menu"];

	var elements_to_remove = general_elements.concat(spelling_elements).concat(insert_elements);

	for(var i=0; i < elements_to_remove.length; i++) {
		removeElement(elements_to_remove[i]);
	}

	// Remove elements by querySelector
	var query_selector_elements = ["div.docs-titlebar-buttons",
							   ".docs-explore-widget",
							   "div.docs-explore-sidebar"];

	for (var i=0; i < query_selector_elements.length; i++) {
		removeBySelector(query_selector_elements[i]);
	}
	
	// Remove elements by class
	var elements_by_class = ["companion-app-switcher-container", // Maps, Calendar switcher

							];
							
	// Here, possibly also add classes "docs-explore-sidebar" (Explore panel) and "docs-dictionary-sidebar" (Dictionary Panel)
	// but these elements only exist in the document once activated.
							
	for(var i=0; i < elements_by_class.length; i++) {
		removeElementsByClass(elements_by_class[i]);
	}
	interceptContextMenu();
	
	saveLockdownStatus();
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		spelling_on = request.spelling_on;
		console.log("Starting deletion of elements.")
		lockdown();
    }
  }
);
