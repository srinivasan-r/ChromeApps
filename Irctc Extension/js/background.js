function sendCommand(command) {
    var passengerNo = 0;
    if (command == "passenger1")
        passengerNo = 0;
    else if (command == "passenger2")
        passengerNo = 1;
    else if (command == "passenger3")
        passengerNo = 2;
    else if (command == "passenger4")
        passengerNo = 3;
    chrome.storage.sync.get({
        passengers: []
    }, function (items) {
        console.info(passengerNo + "," + items.passengers[passengerNo]);
        if (items.passengers.length <= passengerNo)
            return;
        var passenger = items.passengers[passengerNo];
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            tabId = tabs[0].id;
            console.info(tabs[0].url);
            if (tabs[0].url != "https://www.irctc.co.in/eticketing/trainbetweenstns.jsf" && tabs[0].url != "https://www.irctc.co.in/eticketing/trainbetweenstns.jsf?cid=1")
                return;
            var port = chrome.tabs.connect(tabId);
            port.postMessage({
                fillType: 'passenger',
                passenger: passenger
            });
        });
    });
}

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function () {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'g' ...
                conditions: [
          new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            hostEquals: 'www.irctc.co.in',
                            schemes: ['https']
                        },
                    })
        ],
                // And shows the extension's page action.
                actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
    });
});

chrome.commands.onCommand.addListener(function (command) {
    sendCommand(command);
    console.log('sending Command:', command);
});