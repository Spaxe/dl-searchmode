var toggle = {};

chrome.pageAction.onClicked.addListener(function(tab) {
  toggle[tab.id] = !toggle[tab.id];

  chrome.tabs.sendMessage(tab.id, {status: "Toggle", toggle: toggle[tab.id]});
  console.log('Toggle: ', tab.url, toggle[tab.id]);

  if (toggle[tab.id]) {
    chrome.pageAction.setIcon({tabId: tab.id,
                                path: {
                                  '19': 'button19px.png',
                                  '38': 'button38px.png'
                                }
                              });
    chrome.pageAction.setTitle({tabId: tab.id, title: "Search Mode is ON"});
  } else {
    chrome.pageAction.setIcon({tabId: tab.id,
                                path: {
                                  '19': 'button_off19px.png',
                                  '38': 'button_off38px.png'
                                }
                              });
    chrome.pageAction.setTitle({tabId: tab.id, title: "Search Mode is OFF"});
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.status == "Page Supported") {
    console.log('Loaded ' + sender.tab.url);
    toggle[sender.tab.id] = true;
    chrome.pageAction.show(sender.tab.id);
  }
});