function checkCriterion1(){
    return checkCriterion1Result()
}

async function checkCriterion1Result(){
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
        return 'задание 1: не выполнено. Не разработан стиль для текстовых полей ввода.';
    else 
        return 'задание 1: выполнено.';
}

function checkCriterion2(){
    return checkCriterion2Result()
}

async function checkCriterion2Result(){
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
        return 'задание 2: не выполнено. Не разработан стиль для радио-кнопок.';
    else 
        return 'задание 2: выполнено.';
}

function checkCriterion3(){
    return checkCriterion3Result()
}

async function checkCriterion3Result(){
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
        return 'задание 3: не выполнено. Не разработан стиль для флажков.';
    else 
        return 'задание 3: выполнено.';
}

function checkCriterion4(){
    return checkCriterion4Result()
}

async function checkCriterion4Result(){
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
        return 'задание 4: не выполнено. Не разработан стиль для списков.';
    else 
        return 'задание 4: выполнено.';
}

function checkCriterion5(){
    return checkCriterion5Result()
}

async function checkCriterion5Result(){
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
        return 'задание 5: не выполнено. Не разработан стиль для кнопок.';
    else 
        return 'задание 5: выполнено.';
}

function checkCriterion6(){
    return checkCriterion6Result()
}

async function checkCriterion6Result(){
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
        return 'задание 6: не выполнено. Не разработан стиль для полей обязательных к заполнению.';
    else 
        return 'задание 6: выполнено.';
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
checkCriteria(checkCriterion1, checkCriterion2, checkCriterion3,checkCriterion4,checkCriterion5,checkCriterion6)