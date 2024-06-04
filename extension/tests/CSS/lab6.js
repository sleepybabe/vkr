function checkCriterion1() {
    const aHttp = getXPathResult(`//a[starts-with(@href,'http://')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isCorrect = false;
    for (var i = 0; i < aHttp.snapshotLength; i++) {
        const element = aHttp.snapshotItem(i);
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.fontWeight !== '700' || !computedStyle.textDecoration.includes('none')){
            isCorrect = false;
            break;
        }
        else isCorrect = true;
    }
    if (!isCorrect)
        return 'задание 1: не выполнено. Абсолютные ссылки не выводятся жирным шрифтом без подчеркивания';
    else 
        return 'задание 1: выполнено.';
}

function checkCriterion2() {
    const aMathIsu = getXPathResult(`//a[starts-with(@href, 'http://math.isu.ru')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isCorrect = false;
    for (var i = 0; i < aMathIsu.snapshotLength; i++) {
        const element = aMathIsu.snapshotItem(i);
        const computedStyle = window.getComputedStyle(element);

        if (computedStyle.color !== 'rgb(0, 0, 255)'){
            isCorrect = false;
            break;
        }
        else isCorrect = true;
    }

    const aIsu = getXPathResult(`//a[starts-with(@href, 'http://isu.ru')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    for (var i = 0; i < aIsu.snapshotLength; i++) {
        const element = aIsu.snapshotItem(i);
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.color !== 'rgb(255, 0, 0)'){
            isCorrect = false;
            break;
        }
        else isCorrect = true;
    }

    const aOther = getXPathResult(`//a[not (starts-with(@href, 'http://math.isu.ru')) and not (starts-with(@href, 'http://isu.ru'))]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    for (var i = 0; i < aOther.snapshotLength; i++) {
        const element = aOther.snapshotItem(i);
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.color !== 'rgb(0, 128, 0)'){
            isCorrect = false;
            break;
        }
        else isCorrect = true;
    }

    if (!isCorrect)
        return 'задание 2: не выполнено. Ссылки неправильного цвета';
    else 
        return 'задание 2: выполнено.';
}

function checkCriterion3(){
    return checkCriterion3Result()
}

async function checkCriterion3Result(){
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var hasSymbol = false;

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
            if (rule.selectorText === '*') {
                if (rule.style.fontFamily === 'Arial')
                    hasSymbol = true;
                break;
            }
        }
        styleElement.remove();
    }
    if (!hasSymbol)
        return 'задание 3: не выполнено. Не установлен с помощью универсального селектора шрифт Arial.';
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