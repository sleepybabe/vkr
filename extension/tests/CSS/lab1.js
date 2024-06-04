function checkCriterion1() {
    const body = getXPathResult(`//body`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const computedStyleBody = window.getComputedStyle(body);
    const backgroundColor = computedStyleBody.backgroundColor;
    const backgroundImage = computedStyleBody.backgroundImage;
    const hasBackgroundColor = backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)';
    const hasBackgroundImage = backgroundImage && backgroundImage !== 'none';
    if (!hasBackgroundColor || !hasBackgroundImage) 
        return 'задание 1: не выполнено. Не установлены фоновый цвет и фоновое изображение.';
    else 
        return 'задание 1: выполнено.';
}

function checkCriterion2(){
    const xpathResult = getXPathResult('//h1 | //section', XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasEverything = false;
    for (var i = 0; i < xpathResult.snapshotLength; i++) {
        const element = xpathResult.snapshotItem(i);
        const computedStyle = window.getComputedStyle(element);
        const fontFamily = computedStyle.fontFamily.toLowerCase().includes('garamond');
        const fontStyle = computedStyle.fontStyle === 'oblique' || computedStyle.fontStyle === 'italic';
        const fontWeight = computedStyle.fontWeight === '600';
        const fontSize = computedStyle.fontSize === '23px';
        const textAlign = computedStyle.textAlign === 'center';
        const color = computedStyle.color && computedStyle.color !== 'rgba(0, 0, 0, 0)'
        if (fontFamily && fontStyle && fontWeight && fontSize && textAlign && color)
            hasEverything = true;
        else {
            hasEverything = false;
            break;
        }
    }
    if (!hasEverything) 
        return 'задание 2: не выполнено. Не установлено оформление заголовка первого уровня и основного текста согласно варианту';
    else 
        return 'задание 2: выполнено.';
}


function checkCriterion3(){
    return checkCriterion3Result()
}

async function checkCriterion3Result(){
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
        return 'задание 3: не выполнено. Не установлено оформление навигации (элемент nav).';
    else 
        return 'задание 3: выполнено.';
}

function checkCriterion4(){
    return checkCriterion4Result()
}

async function checkCriterion4Result(){
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
        return 'задание 4: не выполнено. Не установлено оформление шапки (элемент header).';
    else 
        return 'задание 4: выполнено.';
}

function checkCriterion5(){
    return checkCriterion5Result()
}

async function checkCriterion5Result(){
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
        return 'задание 5: не выполнено. Не установлено оформление подвала (элемент footer).';
    else 
        return 'задание 5: выполнено.';
}

function checkCriterion6(){
    return checkCriterion6Result()
}

async function checkCriterion6Result(){
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
        return 'задание 6: не выполнено. В печатной версии не должны отображаться навигация (элемент nav), шапка (элемент header) и подвал документа (элемент footer).';
    else 
        return 'задание 6: выполнено.';
}

function checkCriterion7(){
    return checkCriterion7Result()
}

async function checkCriterion7Result(){
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
        return 'задание 7: не выполнено. Оформление печатной версии должно быть выполнено в черно-белой гамме.';
    else 
        return 'задание 7: выполнено.';
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
checkCriteria(checkCriterion1, checkCriterion2, checkCriterion3, checkCriterion4, checkCriterion5, checkCriterion6, checkCriterion7)