function checkCriterion1() {
    const xpath = `//meta[contains(@name, 'viewport') and contains(@content, 'width=device-width, initial-scale=1, maximum-scale=1.3')]`;
    const meta = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    if (!meta)
        return 'задание 1: не выполнено. Не установлен метатег viewport с правильными значениями.';
    else 
        return 'задание 1: выполнено.';
}

function checkCriterion2(){
    const divs = getXPathResult(`//div`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const bootstrap = getXPathResult(`//link[contains(@href, 'bootstrap.min.css')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isCorrect = false;
    var count = 0;

    if (divs.snapshotLength > 0 && bootstrap.snapshotLength < 1) {
        for (var i = 0; i < divs.snapshotLength; i++) {
            const div = divs.snapshotItem(0);
            const style = window.getComputedStyle(div);
            if (style.float !== 'none' || style.clear !== 'none') {
                isCorrect = false;
                break;
            }
            else isCorrect = true;
            if (style.display === 'flex' || style.display === 'inline-flex')
                count++;
        }
    }
    if (!isCorrect || count === 0)
        return 'задание 2: не выполнено. Используется не FlexBox.';
    else 
        return 'задание 2: выполнено.';
}

function checkCriterion3(){
    return checkCriterion3Result()
}

async function checkCriterion3Result(){
    const linkResult = document.styleSheets;
    var count = 0;

    for (var i = 0; i < linkResult.length; i++){
        const media = linkResult[i].ownerNode.getAttribute('media');
        if (media)
            count++;
        const url = linkResult[i].href;
        const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
        const styleElement = document.createElement('style');
        styleElement.textContent = response.html;
        document.head.appendChild(styleElement);
        const cssRules = styleElement.sheet.cssRules;

        for (const rule of cssRules) {
            console.log(rule)
            if (rule instanceof CSSMediaRule)
                count++;
        }
        styleElement.remove();
    }

    if (count < 2)
        return 'задание 3: не выполнено. Нет медиа-запросов.';
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