function checkCriterion1() {
    const divs = getXPathResult(`//div`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const bootstrap = getXPathResult(`//link[contains(@href, 'bootstrap.min.css')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isCorrect = false;

    if (divs.snapshotLength > 0 && bootstrap.snapshotLength < 1) {
        for (var i = 0; i < divs.snapshotLength; i++) {
            const div = divs.snapshotItem(0);
            const style = window.getComputedStyle(div);
            if (style.display === 'flex' || style.display === 'inline-flex') {
                isCorrect = false;
                break;
            }
            else isCorrect = true;
        }
    }
    if (!isCorrect)
        return 'задание 1: не выполнено. Используется не резиновая блочная верстка.';
    else 
        return 'задание 1: выполнено.';
}

function getXPathResult(xpath, XPathResult){
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult,
    );
    return result;
}

async function checkCriteria(...functions){
    var arrayOfResults = [];
    for (i = 0; i < functions.length; i++) {
        const tmp = await functions[i]();
        arrayOfResults.push(tmp);
    }
    chrome.runtime.sendMessage({ action: "showResult", arrayOfResults: arrayOfResults});
}
checkCriteria(checkCriterion1)