async function checkCriterion1() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const selectors = [
        'h2',
        '#intro',
        '#intro h2',
        'h2:not(#intro h2)',
        '#content p',
        '#content > p',
        '.bordered',
        'h2.bordered'
    ];
    var count = 0;

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
            if (selectors.includes(rule.selectorText))
                if (rule.styleMap.size !== 0)
                    count++;
        }
        styleElement.remove();
    }
    if (count !== selectors.length)
		return ['1 задание (правила для селекторов): не выполнено.', 'Селекторы не найдены. (-100%)']
	else
		return ['1 задание (правила для селекторов): выполнено.', '100', '%',]
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
	checkCriterion1
);