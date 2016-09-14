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

  window.addEventListener('keydown', function (e) {
    if (e.altKey && (e.keyCode === 83 /* s */)) {
      chrome.runtime.sendMessage({status: "Toggle"});
    }
  }, true);

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

