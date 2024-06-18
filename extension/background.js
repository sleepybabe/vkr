function showDomic(listToDomic, procent) {
    const commentArea = document.getElementById('comments');
    const procentInput = document.getElementById('learning-level');
    if (commentArea && procentInput) {
        commentArea.value = listToDomic;
        procentInput.value = procent;
    }
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    var activeTab = null;
    if (request.action === "getLabId"){
         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: () => {
                    const inputHidden = document.querySelector("input[type='hidden']");
                    chrome.runtime.sendMessage({ action: "showLabId", 
                            id: inputHidden ? inputHidden.id : null, 
                            labModule: inputHidden ? inputHidden.className : null});
                },
            });
        });
    }
    
    if (request.action === "executeScript") {
        const id = request.id;
        const labModule = request.labModule;
        const variant = request.variant;
        
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            activeTab = tabs[0];
            if (request.variant) {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    files: [`tests/${labModule}/variants/lab${id}/${variant}.js`, `tests/${labModule}/lab${id}.js`]
                });
            }
            else {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    files: [`tests/${labModule}/lab${id}.js`]
                });
            }
        });
    }

    if (request.action === "showListToDomic") {
        const listToDomic = request.listToDomic;
        const procent = request.procent;
        // chrome.tabs.query({ url: 'https://domic.isu.ru/2//alex/file-checker.html' }, function(tabs) {
        chrome.tabs.query({ title: 'domic-2: Проверка файлов' }, function(tabs) {
            if (tabs.length > 0) {
                const tabId = tabs[0].id;
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: showDomic,
                    args: [listToDomic, procent]
                });
            }
        });
    }

    if (request.action === 'fetchPage') {
        fetch(request.url)
            .then(response => response.text())
            .then(html => {
                sendResponse({ success: true, html: html });
            })
            .catch(error => {
                console.error('Ошибка при загрузке страницы:', error);
                sendResponse({ success: false, error: error.message });
            });
        return true;
    }

});

function executePageScript(file) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: [file],
            world: "MAIN"
        });
    });
}

// обработчик для отслеживания открытия окна расширения
chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'popup-open') {
        executePageScript('override.js');
    }
});