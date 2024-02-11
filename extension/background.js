
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request.action == "executeScript") {
        const id = request.id;
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                files: [`tests/html/lab${id}.js`]
            });
        });
    }

    if (request.action == "sendResult") {
        chrome.runtime.sendMessage({ action: "showResult", result: request.result });
    }
});