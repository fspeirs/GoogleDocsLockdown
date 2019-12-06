chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'checkForPriorLockdown') {
      chrome.storage.local.get(['priorLockdown'], function(result) {
        console.log("Prior lockdown: " + result.priorLockdown);
        if(result.priorlockdown === 'undefined') {
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

function lockdown() {
  var elements = ["docs-tools-menu", "docs-insert-menu", "docs-help-menu", "docs-extensions-menu", "spellGrammarCheckButton", "insertImageButton", "insertCommentButton", "insertLinkButton"];
      for(var i=0; i < elements.length; i++) {
        removeElement(elements[i]);
  
      }

      var buttons = document.querySelector("div.docs-titlebar-buttons");
      buttons.style.display = 'none';

      var explore = document.querySelector(".docs-explore-widget");
      explore.style.display = 'none';

      var exploreSidebar = document.querySelector("div.docs-explore-sidebar");
      exploreSidebar.style.display = 'none';

      chrome.storage.local.set({'priorLockdown': "1"}, function() {
        console.log("Saved lockdown status")
      });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      console.log("Starting deletion of elements.")
      lockdown();
    }
  }
);