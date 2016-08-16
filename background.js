var toggle = {};

function handleToggle(tab) {
  toggle[tab.id] = !toggle[tab.id];

  chrome.tabs.sendMessage(tab.id, {status: "Toggle", toggle: toggle[tab.id]});

  if (toggle[tab.id]) {
    chrome.pageAction.setIcon({tabId: tab.id,
                                path: {
                                  '19': 'images/button19px.png',
                                  '38': 'images/button38px.png'
                                }
                              });
    chrome.pageAction.setTitle({tabId: tab.id, title: "Find with Sam is ON. Click this button or use Alt+S to disable."});
  } else {
    chrome.pageAction.setIcon({tabId: tab.id,
                                path: {
                                  '19': 'images/button_off19px.png',
                                  '38': 'images/button_off38px.png'
                                }
                              });
    chrome.pageAction.setTitle({tabId: tab.id, title: "Search Mode is OFF. Click this button or use Alt+S to enable."});
  }
}

chrome.pageAction.onClicked.addListener(handleToggle);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.status === "Page Supported") {
    console.log('Loaded ' + sender.tab.url);
    toggle[sender.tab.id] = true;
    chrome.pageAction.show(sender.tab.id);
  }
  if (request.status === "Toggle") {
    handleToggle(sender.tab);
  }
});

// function doInCurrentTab(tabCallback) {
//   chrome.tabs.query({ currentWindow: true, active: true },
//     function (tabArray) { tabCallback(tabArray[0]); }
//   );
// }

// chrome.commands.onCommand.addListener(function (command) {
//   if (command === 'toggle-findwithsam') {
//     doInCurrentTab(function (tab) {
//       toggle[tab.id] = !toggle[tab.id];
//       chrome.tabs.sendMessage(tab.id, {status: "Toggle", toggle: toggle[tab.id]});
//     });
//   }
// });