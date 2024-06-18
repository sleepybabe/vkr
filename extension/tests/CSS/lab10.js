async function checkCriterion1() {
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
            if (rule.selectorText === 'input[type="text"]') {
                if (rule.styleMap.size !== 0) {
                    isCorrect = true;
                    break;
                }
            }
        }
        styleElement.remove();
    }
    if (!isCorrect)
		return ['1 задание (стиль для текстовых полей ввода): не выполнено.', 'Не разработан стиль для текстовых полей ввода. (-16%)']
	else
		return ['1 задание (стиль для текстовых полей ввода): выполнено.', '16', '%',]
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
            if (rule.selectorText === 'input[type="radio"]') {
                if (rule.styleMap.size !== 0) {
                    isCorrect = true;
                    break;
                }
            }
        }
        styleElement.remove();
    }
    if (!isCorrect)
		return ['2 задание (стиль для радио-кнопок): не выполнено.', 'Не разработан стиль для радио-кнопок. (-16%)']
	else
		return ['2 задание (стиль для радио-кнопок): выполнено.', '16', '%',]
}

async function checkCriterion3() {
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
            if (rule.selectorText === 'input[type="checkbox"]') {
                if (rule.styleMap.size !== 0) {
                    isCorrect = true;
                    break;
                }
            }
        }
        styleElement.remove();
    }
    if (!isCorrect)
		return ['3 задание (стиль для флажков): не выполнено.', 'Не разработан стиль для флажков. (-16%)']
	else
		return ['3 задание (стиль для флажков): выполнено.', '16', '%',]
}

async function checkCriterion4() {
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
            if (rule.selectorText === 'select') {
                if (rule.styleMap.size !== 0) {
                    isCorrect = true;
                    break;
                }
            }
        }
        styleElement.remove();
    }
    if (!isCorrect)
		return ['4 задание (стиль для списков): не выполнено.', 'Не разработан стиль для списков. (-16%)']
	else
		return ['4 задание (стиль для списков): выполнено.', '16', '%',]
}

async function checkCriterion5() {
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
            if (rule.selectorText.includes('button') || rule.selectorText.includes('input[type="button"]')
                ||  rule.selectorText.includes('input[type="reset"]') ||  rule.selectorText.includes('input[type="submit"]')) {
                if (rule.styleMap.size !== 0) {
                    isCorrect = true;
                    break;
                }
            }
        }
        styleElement.remove();
    }
    if (!isCorrect)
		return ['5 задание (стиль для кнопок): не выполнено.', 'Не разработан стиль для кнопок. (-16%)']
	else
		return ['5 задание (стиль для кнопок): выполнено.', '16', '%',]
}

async function checkCriterion6() {
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
            if (rule.selectorText === 'input[required]' || rule.selectorText === 'input:required') {
                if (rule.styleMap.size !== 0) {
                    isCorrect = true;
                    break;
                }
            }
        }
        styleElement.remove();
    }
    if (!isCorrect)
		return ['6 задание (стиль для полей обязательных к заполнению): не выполнено.', 'Не разработан стиль для полей обязательных к заполнению. (-20%)']
	else
		return ['6 задание (стиль для полей обязательных к заполнению): выполнено.', '20', '%',]
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
	checkCriterion3,
	checkCriterion4,
	checkCriterion5,
	checkCriterion6
);