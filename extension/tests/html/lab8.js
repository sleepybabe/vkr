function checkCriterion1() {
    const xpath = `//table/tbody/tr[td[1]/img and td[2]/iframe]`;
    
    if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "1 задание: не выполнено. Отсутствуют изображение с картой и iframe."
	else return "1 задание: выполнено."
}

function checkCriterion2() {
    var isConnection = false;
    var isSameSize = false;
    const xpathImg = `//img`;
    const xpathMap = `//map`;
    const xpathIframe = `//iframe`;
    const xpathArea = `//map/area[contains("@href", /data)]`;
    const resultImg = getXPathResult(xpathImg, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const resultMap = getXPathResult(xpathMap, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const resultIframe = getXPathResult(xpathIframe, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const resultArea = getXPathResult(xpathArea, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    if (resultImg.snapshotLength >0 && resultMap.snapshotLength && resultIframe.snapshotLength){
        const usemapImg = resultImg.snapshotItem(0).getAttribute('usemap');
        const nameMap = resultMap.snapshotItem(0).name || resultMap.snapshotItem(0).getAttribute('id');
        const nameIframe = resultIframe.snapshotItem(0).name;
        if((usemapImg == `#` + nameMap) && (usemapImg == `#` + nameIframe))
            isConnection = true;
    }
    const set = new Set();
    for (var i =0; i < resultArea.snapshotLength; i++){
        const href = resultArea.snapshotItem(i).getAttribute('href');
        set.add(href);
    }
    if (set.size === resultArea.snapshotLength && set.size >=3)
        isSameSize = true;
    if (!isConnection || !isSameSize)
		return "2 задание: не выполнено. Не выделено на карте области для разных ссылок (не менее 3-х), каждый из документов по ссылке не открывается во встроенном фрейме iframe."
	else return "2 задание: выполнено."
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
checkCriteria(checkCriterion1,checkCriterion2)