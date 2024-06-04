function checkCriterion1(){
    return checkCriterion1Result()
}

async function checkCriterion1Result(){
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var hasRule1 = false;
    var hasRule2 = false;

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
            if (style.width === '550px' && style.borderWidth === '5px' && style.borderStyle === 'solid')
                hasRule1 = true;
            else if (style.borderWidth === '5px' && style.borderTopStyle === 'dotted' && style.borderLeftStyle === 'dotted'
                && style.borderBottomStyle === '' && style.borderRightStyle === '')
                hasRule2 = true;
        }
        styleElement.remove();
    }
    if (!hasRule1 || !hasRule2)
        return 'задание 1: не выполнено. Не установлено оформление границ согласно варианту.';
    else 
        return 'задание 1: выполнено.';
}

function checkCriterion2(){
    return checkCriterion2Result()
}

async function checkCriterion2Result(){
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
        return 'задание 2: не выполнено. Не установлены отступы и поля для каждого из блоков.';
    else 
        return 'задание 2: выполнено.';
}

function checkCriterion3(){
    return checkCriterion3Result()
}

async function checkCriterion3Result(){
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
        return 'задание 3: не выполнено. Не установлены скругленные рамки.';
    else 
        return 'задание 3: выполнено.';
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
checkCriteria(checkCriterion1, checkCriterion2, checkCriterion3)