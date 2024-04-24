function getXPathResult(xpath, XPathResult){
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult,
    );
    return result;
}

function checkCriteria(...functions){
    var arrayOfResults = [];
    for (i = 0; i < functions.length; i++) {
        const tmp = functions[i]();
        arrayOfResults.push(tmp);
    }
    chrome.runtime.sendMessage({ action: "showResult", arrayOfResults: arrayOfResults});
}
