function checkCriterion1() {
    const xpath = `//table[@border]/tbody[tr[1][td[1][@rowspan = 4] and td[2][@rowspan] and td[3][@colspan=4] 
    and td[4][@rowspan=3 and @colspan=3] and count(td)=4] and tr[2][td[1][@colspan=4] and count(td)=1] 
    and tr[3][count(td)=4] and tr[4][count(td)=7] and tr[5][td[@colspan=9] and count(td)=1] and tr[6][td[1][@rowspan=2] 
    and count(td)=9] and tr[7][count(td)=8] and tr[8][td[1][@rowspan=2] and count(td)=9] and tr[9][count(td)=8]]`;
    
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