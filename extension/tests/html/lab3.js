async function checkCriterion1() {
	return checkVariantCriterion1();
}
async function checkCriterion2() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
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
            const style= rule.style;
            if ((style.paddingLeft !== '' || style.paddingTop !== '' || style.paddingRight !== ''
                || style.paddingBottom !== '') && (style.marginLeft !== '' || style.marginTop !== ''
                || style.marginRight !== '' || style.marginBottom !== ''))
                count++;
        }
        styleElement.remove();
    }
    if (count < 2)
		return ['2 задание (отступы и поля для каждого из блоков): не выполнено.', 'Не установлены отступы и поля для каждого из блоков. (-30%)']
	else
		return ['2 задание (отступы и поля для каждого из блоков): выполнено.', '30', '%',]
}

async function checkCriterion3() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
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
            const style= rule.style;
            if (style.borderTopLeftRadius !== '' && style.borderTopRightRadius !== ''
                && style.borderBottomLeftRadius !== '' && style.borderBottomRightRadius !== '')
                count++;
        }
        styleElement.remove();
    }
    if (count < 2)
		return ['3 задание (скругленные углы рамки): не выполнено.', 'Не установлены скругленные рамки. (-30%)']
	else
		return ['3 задание (скругленные углы рамки): выполнено.', '30', '%',]
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
	checkCriterion2,
	checkCriterion3
);