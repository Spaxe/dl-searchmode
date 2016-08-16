/**
 * search-mode.js
 * Find with Sam to make screen readers cleaner, easier, not cluttered.
 */
(function injectSearchMode () {
  var patterns = [
    {
      name: "jstor",
      pattern: /https?:\/\/.*\.jstor\.org\//
    },
    {
      name: "acm",
      pattern: /https?:\/\/dl\.acm\.org\//
    }
  ];
  activate();

  patterns.forEach(function (p) {
    if (p.pattern.test(window.location.href)) {
      chrome.runtime.sendMessage({status: "Page Supported"});
    }
  });

  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.status == "Toggle" && msg.toggle) {
      activate();
    } else if (msg.status == "Toggle" && !msg.toggle) {
      deactivate();
    }
  });

  function activate () {
    patterns.forEach(function (p) {
      if (p.pattern.test(window.location.href)) {
        document.documentElement.classList.add(p.name + '-findwithsam');
      }
    });
  }

  function deactivate () {
    patterns.forEach(function (p) {
      if (p.pattern.test(window.location.href)) {
        document.documentElement.classList.remove(p.name + '-findwithsam');
      }
    });
  }
})();

