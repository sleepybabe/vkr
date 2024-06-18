async function checkCriterion1() {
    const body = getXPathResult(`//body`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const computedStyleBody = window.getComputedStyle(body);
    const backgroundColor = computedStyleBody.backgroundColor;
    const backgroundImage = computedStyleBody.backgroundImage;
    const hasBackgroundColor = backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)';
    const hasBackgroundImage = backgroundImage && backgroundImage !== 'none';
    if (!hasBackgroundColor || !hasBackgroundImage) 
		return ['1 задание (фоновый цвет и фоновое изображение): не выполнено.', 'Не установлены фоновый цвет и фоновое изображение. (-14%)']
	else
		return ['1 задание (фоновый цвет и фоновое изображение): выполнено.', '14', '%',]
}

async function checkCriterion2() {
	return checkVariantCriterion2();
}
async function checkCriterion3() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasNavRule = false;

    function checkNavRule(rules) {
        for (const rule of rules) {
            if (rule.selectorText === 'nav')
                if (rule.styleMap.size !== 0)
                    return true;
        }
        return false;
    }

    for (var i = 0; i < linkResult.snapshotLength; i++){
        const media = linkResult.snapshotItem(i).getAttribute('media');
        if (media === 'print')
            continue;

        const url = linkResult.snapshotItem(i).href;
        const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
        const styleElement = document.createElement('style');
        styleElement.textContent = response.html;
        document.head.appendChild(styleElement);
        const cssRules = styleElement.sheet.cssRules;

        for (const rule of cssRules) {
            if (rule instanceof CSSMediaRule) {
                const mediaText = rule.media.mediaText;
                if (mediaText === 'print')
                    break;
                else if (mediaText === 'screen') {
                    hasNavRule = checkNavRule(rule.cssRules);
                    if (hasNavRule)
                        break;
                }
            }
            if (rule.selectorText === 'nav') {
                hasNavRule = checkNavRule([rule]);
                break;
            }
        }
        styleElement.remove();
        if (hasNavRule)
            break;
    }
    if (!hasNavRule)
		return ['3 задание (оформление навигации): не выполнено.', 'Не установлено оформление навигации (элемент nav). (-14%)']
	else
		return ['3 задание (оформление навигации): выполнено.', '14', '%',]
}

async function checkCriterion4() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasHeaderRule = false;

    function checkHeaderRule(rules) {
        for (const rule of rules) {
            if (rule.selectorText === 'header')
                if (rule.styleMap.size !== 0)
                    return true;
        }
        return false;
    }

    for (var i = 0; i < linkResult.snapshotLength; i++){
        const media = linkResult.snapshotItem(i).getAttribute('media');
        if (media === 'print')
            continue;

        const url = linkResult.snapshotItem(i).href;
        const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
        const styleElement = document.createElement('style');
        styleElement.textContent = response.html;
        document.head.appendChild(styleElement);
        const cssRules = styleElement.sheet.cssRules;

        for (const rule of cssRules) {
            if (rule instanceof CSSMediaRule) {
                const mediaText = rule.media.mediaText;
                if (mediaText === 'print')
                    break;
                else if (mediaText === 'screen') {
                    hasHeaderRule = checkHeaderRule(rule.cssRules);
                    if (hasHeaderRule)
                        break;
                }
            }
            if (rule.selectorText === 'header') {
                hasHeaderRule = checkHeaderRule([rule]);
                break;
            }
        }
        styleElement.remove();
        if (hasHeaderRule)
            break;
    }
    if (!hasHeaderRule)
		return ['4 задание (оформление шапки): не выполнено.', 'Не установлено оформление шапки (элемент header). (-14%)']
	else
		return ['4 задание (оформление шапки): выполнено.', '14', '%',]
}

async function checkCriterion5() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasFooterRule = false;

    function checkFooterRule(rules) {
        for (const rule of rules) {
            if (rule.selectorText === 'footer')
                if (rule.styleMap.size !== 0)
                    return true;
        }
        return false;
    }
    
    for (var i = 0; i < linkResult.snapshotLength; i++){
        const media = linkResult.snapshotItem(i).getAttribute('media');
        if (media === 'print')
            continue;

        const url = linkResult.snapshotItem(i).href;
        const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
        const styleElement = document.createElement('style');
        styleElement.textContent = response.html;
        document.head.appendChild(styleElement);
        const cssRules = styleElement.sheet.cssRules;

        for (const rule of cssRules) {
            if (rule instanceof CSSMediaRule) {
                const mediaText = rule.media.mediaText;
                if (mediaText === 'print')
                    break;
                else if (mediaText === 'screen') {
                    hasFooterRule = checkFooterRule(rule.cssRules);
                    if (hasFooterRule)
                        break;
                }
            }
            if (rule.selectorText === 'footer') {
                hasFooterRule = checkFooterRule([rule]);
                break;
            }
        }
        styleElement.remove();
        if (hasFooterRule)
            break;
    }
    if (!hasFooterRule)
		return ['5 задание (оформление подвала): не выполнено.', 'Не установлено оформление подвала (элемент footer). (-14%)']
	else
		return ['5 задание (оформление подвала): выполнено.', '14', '%',]
}

async function checkCriterion6() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const selectorsToCheck = {
        nav: false,
        header: false,
        footer: false
    };
    var allSelectorsHidden;
    
    function containsSelector(rule, selectorName) {
        const selectors = rule.selectorText.split(',').map(s => s.trim());
        return selectors.includes(selectorName);
    }

    function checkSelector(rule, selectorName) {
        if (rule.selectorText === selectorName || containsSelector(rule, selectorName)) {
            const styleDeclarations = rule.style;
            const isHidden = styleDeclarations.getPropertyValue('display') === 'none' ||
                             styleDeclarations.getPropertyValue('visibility') === 'hidden';
            if (isHidden) {
                selectorsToCheck[selectorName] = true;
            }
        }
    }

    for (var i = 0; i < linkResult.snapshotLength; i++){
        const media = linkResult.snapshotItem(i).getAttribute('media');
        const url = linkResult.snapshotItem(i).href;
        const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
        const styleElement = document.createElement('style');
        styleElement.textContent = response.html;
        document.head.appendChild(styleElement);
        const cssRules = styleElement.sheet.cssRules;

        for (const rule of cssRules) {
            if (media === 'print' && !(rule instanceof CSSMediaRule)) {
                checkSelector(rule, 'nav');
                checkSelector(rule, 'header');
                checkSelector(rule, 'footer');
            }
            else if (rule instanceof CSSMediaRule) {
                const mediaText = rule.media.mediaText;
                if (mediaText === 'print') {
                    const dopCssRules = rule.cssRules;
                    for (const dopRule of dopCssRules) {
                        checkSelector(dopRule, 'nav');
                        checkSelector(dopRule, 'header');
                        checkSelector(dopRule, 'footer');
                    }
                }
            }
            else break;
        }
        styleElement.remove();
        allSelectorsHidden = selectorsToCheck.nav && selectorsToCheck.header && selectorsToCheck.footer;
        if (allSelectorsHidden)
            break;
    }
    if (!allSelectorsHidden)
		return ['6 задание (элемент nav, header, footer в печати): не выполнено.', 'В печатной версии не должны отображаться навигация (элемент nav), шапка (элемент header) и подвал документа (элемент footer). (-14%)']
	else
		return ['6 задание (элемент nav, header, footer в печати): выполнено.', '14', '%',]
}

async function checkCriterion7() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isBnW = false;
    const whiteColors = [
        'rgb(255, 255, 255)',
        '#FFFFFF',
        '#FFF',
        'hsl(0, 0%, 100%)',
        'white',
        'rgba(255, 255, 255, 1)',
        'hsla(0, 0%, 100%, 1)'
    ];
    const blackColors = [
        'black',
        'rgb(0, 0, 0)',
        '#000000', 
        '#000', 
        'hsl(0, 0%, 0%)', 
        'rgba(0, 0, 0, 1)', 
        'hsla(0, 0%, 0%, 1)'
    ];

    function checkBnWStyle(rule) {
        if (rule.selectorText.includes('html') || rule.selectorText.includes('body') || rule.selectorText === '*') {
            const styleDeclarations = rule.style;
            const filterValue = styleDeclarations.getPropertyValue('filter');
            const backgroundColor = styleDeclarations.getPropertyValue('background-color').trim();
            const textColor = styleDeclarations.getPropertyValue('color').trim();
            const isBnW = (filterValue === 'grayscale(100%)' || filterValue === 'grayscale(1%)' ||
                (whiteColors.includes(backgroundColor) && blackColors.includes(textColor)));
            return isBnW;
        }
        return false;
    }

    for (var i = 0; i < linkResult.snapshotLength; i++){
        const media = linkResult.snapshotItem(i).getAttribute('media');
        const url = linkResult.snapshotItem(i).href;
        const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
        const styleElement = document.createElement('style');
        styleElement.textContent = response.html;
        document.head.appendChild(styleElement);
        const cssRules = styleElement.sheet.cssRules;

        for (const rule of cssRules) {
            if (media === 'print' && !(rule instanceof CSSMediaRule)) {
                if (checkBnWStyle(rule)) {
                    isBnW = true;
                    break;
                }
            }
            else if (rule instanceof CSSMediaRule) {
                const mediaText = rule.media.mediaText;
                if (mediaText === 'print') {
                    const dopCssRules = rule.cssRules;
                    for (const dopRule of dopCssRules) {
                        if (checkBnWStyle(dopRule)) {
                            isBnW = true;
                            break;
                        }
                    }
                }
            }
            else break;
        }
        styleElement.remove();
        if (isBnW)
            break;
    }
    if (!isBnW)
		return ['7 задание (черно-белая гамма в печати): не выполнено.', 'Оформление печатной версии должно быть выполнено в черно-белой гамме. (-14%)']
	else
		return ['7 задание (черно-белая гамма в печати): выполнено.', '14', '%',]
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
	checkCriterion6,
	checkCriterion7
);