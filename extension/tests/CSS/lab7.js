async function checkCriterion1() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const pResult = getXPathResult(`//p`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const count = {
        firstletter: 0,
        firstline: 0
    };
    var pStyle = null;
    var fontSizeP = null;
    var colorP = null;
    if (pResult) {
        pStyle = window.getComputedStyle(pResult);
        fontSizeP = pStyle.fontSize;
        colorP = pStyle.color;
    }

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
            if (rule.selectorText === 'p::first-letter') {
                var fontSizeFirstLet = rule.style.fontSize;
                var colorFirstLet = rule.style.color;
                const tmp = document.createElement('div');
                tmp.style.visibility = 'hidden';
                tmp.style.fontSize = fontSizeFirstLet;
                tmp.style.color = colorFirstLet;
                pResult.appendChild(tmp);
                fontSizeFirstLet = window.getComputedStyle(tmp).fontSize;
                colorFirstLet = window.getComputedStyle(tmp).color;
                pResult.removeChild(tmp);
                if (parseFloat(fontSizeP) * 3 === parseFloat(fontSizeFirstLet) && colorFirstLet !== colorP)
                    count.firstletter += 1;
            }
            else if (rule.selectorText === 'p::first-line') {
                const fontStyleFirstLine = rule.style.fontStyle;
                if (fontStyleFirstLine === 'italic')
                    count.firstline += 1;
            }

        }
        styleElement.remove();
    }
    if (count.firstletter < 1 || count.firstline < 1)
		return ['1 задание (первая строка и первая буква): не выполнено.', 'Первая буква абзаца не больше в 3 раза размера остальных символов абзаца, цветом не выделяется / первая строка абзаца без курсива. (-50%)']
	else
		return ['1 задание (первая строка и первая буква): выполнено.', '50', '%',]
}

async function checkCriterion2() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const count = {
        before: 0,
        after: 0
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
            if (rule.selectorText === 'blockquote::after') {
                const content = rule.style.content;
                if (content)
                    count.after += 1;
            }
            else if (rule.selectorText === 'blockquote::before') {
                const content = rule.style.content;
                if (content)
                    count.before += 1;
            }

        }
        styleElement.remove();
    }
    if (count.after < 1 || count.before < 1)
		return ['2 задание (автоматические кавычки): не выполнено.', 'Не установлено перед цитатой и после автоматические кавычки. (-50%)']
	else
		return ['2 задание (автоматические кавычки): выполнено.', '50', '%',]
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