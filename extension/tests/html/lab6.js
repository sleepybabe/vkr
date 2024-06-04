function checkCriterion1() {
    const xpath = `//table[@border]/tbody[tr[1][td[1][contains(@style, 'background-color')] and td[2] and td[3][contains(@style, 'background-color')] and td[4] and count(td)=4]
            and tr[2][td[1] and td[2][contains(@style, 'background-color')] and td[3] and td[4][contains(@style, 'background-color')] and count(td)=4]
            and tr[3][td[@colspan = 4] and count(td)=1] and tr[4][td[@colspan = 4 and contains(@style, 'background-color')] and count(td)=1] and tr[5][td[@colspan = 4] and count(td)=1] 
            and tr[6][td[1][contains(@style, 'background-color')] and td[2] and td[3][contains(@style, 'background-color')] and td[4] and count(td)=4] 
            and tr[7][td[1] and td[2][contains(@style, 'background-color')] and td[3] and td[4][contains(@style, 'background-color')] and count(td)=4]]`;
    
    if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "1 задание: не выполнено. Ошибка: структура таблицы не совпадает."
	else return "1 задание: выполнено."
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