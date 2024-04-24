
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    var activeTab = null;
    if (request.action == "getLabId"){
         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: () => {
                    const inputHidden = document.querySelector("input[type='hidden']");
                    console.log(inputHidden);
                    chrome.runtime.sendMessage({ action: "showLabId", 
                            id: inputHidden ? inputHidden.id : null, 
                            labModule: inputHidden ? inputHidden.className : null});
                },
            });
        });
    }

    if (request.action == "getCriteriaFromServer"){
        fetch(`http://localhost:3000/api/getCriteriaNotForLab/${request.param}`)
            .then(response => response.json())
            .then(data => {
                chrome.runtime.sendMessage({ action: "showCriteriaFromServer", result: data});
            })
            .catch(error => {
                console.error(error);
            });
    }

    if (request.action == "getCriterionById"){
        fetch(`http://localhost:3000/api/getCriterion/${request.id}`)
            .then(response => response.json())
            .then(data => {
                chrome.runtime.sendMessage({ action: "useCriterionByIdFromServer", result: data});    
            })
            .catch(error => {
                console.error(error);
            });
    }

    if (request.action == "executeScript") {
        const id = request.id;
        const labModule = request.labModule;
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                files: [`tests/${labModule}/lab${id}.js`]
            });
        });
    }

    if (request.action == "sendResult") {
        chrome.runtime.sendMessage({ action: "showResult", result: request.result });
    }
});