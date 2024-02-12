window.addEventListener('DOMContentLoaded', function() {
    document.getElementById("button").addEventListener("click", function() {
        const select = document.getElementById("selectScript");
        const id = select.options[select.selectedIndex].value;
        chrome.runtime.sendMessage({ action: "executeScript", id: id});
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "showResult") {
        const resultElement = document.getElementById("result");
        if (resultElement) {
            resultElement.textContent = `Результат:\n ${request.result}`;
        }
    }
});
