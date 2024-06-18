async function checkCriterion1() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const count = {
        link: 0,
        visited: 0,
        active: 0,
        hover: 0
    };

    if (linkResult) {
        const url = linkResult.href;
        const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
        const styleElement = document.createElement('style');
        styleElement.textContent = response.html;
        document.head.appendChild(styleElement);
        const cssRules = styleElement.sheet.cssRules;

        for (const rule of cssRules) {
            if (rule instanceof CSSMediaRule)
                continue;
            if (rule.selectorText === 'a:link') {
                if (rule.styleMap.size !== 0)
                    count.link += 1;
            }
            else if (rule.selectorText === 'a:visited') {
                if (rule.styleMap.size !== 0)
                    count.visited += 1;
            }
            else if (rule.selectorText === 'a:active') {
                if (rule.styleMap.size !== 0)
                    count.active += 1;
            }
            else if (rule.selectorText === 'a:hover') {
                if (rule.styleMap.size !== 0)
                    count.hover += 1;
            }
        }
        styleElement.remove();
    }
    if (count.link < 1 || count.visited < 1 || count.active < 1 || count.hover < 1)
		return ['1 задание (стили для гиперссылок): не выполнено.', 'Не заданы стили для гипперсылок (непосещенных, посещенных, активных и тех, на которые наведен курсор мыши). (-50%)']
	else
		return ['1 задание (стили для гиперссылок): выполнено.', '50', '%',]
}

async function checkCriterion2() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (linkResult) {
        const url = linkResult.href;
        const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
        const styleElement = document.createElement('style');
        styleElement.textContent = response.html;
        document.head.appendChild(styleElement);
        const cssRules = styleElement.sheet.cssRules;

        for (const rule of cssRules) {
            if (rule instanceof CSSMediaRule)
                continue;
            if (rule.selectorText === 'a:nth-child(3n)') {
                if (rule.style.textDecoration === 'none')
                    isCorrect = true;
            }
        }
        styleElement.remove();
    }
    if (!isCorrect)
		return ['2 задание (каждая третья ссылка): не выполнено.', 'Не задано оформление без подчеркивания для каждой третьей ссылки. (-50%)']
	else
		return ['2 задание (каждая третья ссылка): выполнено.', '50', '%',]
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

async function checkCriteria(...functions) {
    var arrayOfResults = [];
    for (var i = 0; i < functions.length; i++) {
        const tmp = await functions[i]();
        arrayOfResults.push(tmp);
    }
    chrome.runtime.sendMessage({ action: "showResult", arrayOfResults: arrayOfResults });
}


checkCriteria(
	checkCriterion1,
	checkCriterion2
);