async function checkCriterion1() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasRule = false;

    function checkRule(rules) {
        for (const rule of rules) {
            if (rule.selectorText === 'table')
                if (rule.style.width === '100%')
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
                    hasRule = checkRule(rule.cssRules);
                    break;
                }
            }
            if (rule.selectorText === 'table') {
                hasRule = checkRule([rule]);
                break;
            }
        }
        styleElement.remove();
        if (hasRule)
            break;
    }
    if (!hasRule)
		return ['1 задание (ширина таблицы): не выполнено.', 'Не установлена ширина таблицы, зависящей от ширины родительского контейнера. (-10%)']
	else
		return ['1 задание (ширина таблицы): выполнено.', '10', '%',]
}

async function checkCriterion2() {
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
		return ['2 задание (черно-белая версия для печати): не выполнено.', 'Версия для печати не черно-белая. (-10%)']
	else
		return ['2 задание (черно-белая версия для печати): выполнено.', '10', '%',]
}

async function checkCriterion3() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasRule = false;

    function checkRule(rules) {
        for (const rule of rules) {
            if (rule.selectorText === 'td' || rule.selectorText.includes('th, td') || rule.selectorText.includes('td, th'))
                if (rule.style.textAlign || rule.style.verticalAlign)
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
                    hasRule = checkRule(rule.cssRules);
                    if (hasRule)
                        break;
                }
            }
            if (rule.selectorText === 'td' || rule.selectorText.includes('th, td') || rule.selectorText.includes('td, th')) {
                hasRule = checkRule([rule]);
                break;
            }
        }
        styleElement.remove();
        if (hasRule)
            break;
    }
    if (!hasRule)
		return ['3 задание ( выравнивание внутри ячеек таблицы): не выполнено.', 'Не сделано выравнивание внутри ячеек таблицы. (-10%)']
	else
		return ['3 задание ( выравнивание внутри ячеек таблицы): выполнено.', '10', '%',]
}

async function checkCriterion4() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasRule = false;

    function checkRule(rules) {
        for (const rule of rules) {
            if (rule.style.borderWidth || rule.style.border)
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
                    hasRule = checkRule(rule.cssRules);
                    if (hasRule)
                        break;
                }
            }
            if (rule.style.borderWidth || rule.style.border) {
                hasRule = true;
                break;
            }
        }
        styleElement.remove();
        if (hasRule)
            break;
    }
    if (!hasRule)
		return ['4 задание (ширина границы): не выполнено.', 'Ширина границы не задана. (-10%)']
	else
		return ['4 задание (ширина границы): выполнено.', '10', '%',]
}

async function checkCriterion5() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasRule = false;

    function checkRule(rules) {
        for (const rule of rules) {
            if (rule.selectorText === 'td' || rule.selectorText.includes('th, td') || rule.selectorText.includes('td, th'))
                if (rule.style.padding || rule.style.paddingLeft || rule.style.paddingRight
                    || rule.style.paddingBottom || rule.style.paddingTop)
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
                    hasRule = checkRule(rule.cssRules);
                    if (hasRule)
                        break;
                }
            }
            if (rule.selectorText === 'td' || rule.selectorText.includes('th, td') || rule.selectorText.includes('td, th')) {
                hasRule = checkRule([rule]);
                break;
            }
        }
        styleElement.remove();
        if (hasRule)
            break;
    }
    if (!hasRule)
		return ['5 задание (отступы внутри ячеек): не выполнено.', 'Не сделаны отступы внутри ячеек таблицы. (-10%)']
	else
		return ['5 задание (отступы внутри ячеек): выполнено.', '10', '%',]
}

async function checkCriterion6() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var colorBgTr = false;
    var colorBgTd = false;

    function checkRule(rules) {
        for (const rule of rules) {
            if (rule.selectorText.includes('td:hover')) {
                if (rule.style.backgroundColor)
                    return rule.style.backgroundColor;
                else if (colorBgTd)
                    return colorBgTd;
            }
            else if (rule.selectorText.includes('tr:hover')) 
                if (rule.style.backgroundColor)
                    return rule.style.backgroundColor;
                else if (colorBgTr)
                    return colorBgTr;
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
                else if (mediaText === 'screen')
                    colorBgTd = checkRule(rule.cssRules);
            }
            if (rule.selectorText.includes('td:hover')) {
                colorBgTd = checkRule([rule]);
            }
            else if (rule.selectorText.includes('tr:hover')){
                colorBgTr = checkRule([rule]);
            }
        }
        styleElement.remove();
        if (colorBgTd || colorBgTr)
            break;
    }
    if (!colorBgTd || !colorBgTr || colorBgTd === colorBgTr)
		return ['6 задание (курсор изменяет фоновый цвет ячейки): не выполнено.', 'Не изменяется фоновый цвет (отличный от фонового цвета выделенной строки) ячейки таблицы при наведении курсора на нее. (-10%)']
	else
		return ['6 задание (курсор изменяет фоновый цвет ячейки): выполнено.', '10', '%',]
}

async function checkCriterion7() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasRule = false;

    function checkRule(rules) {
        for (const rule of rules) {
            if (rule.selectorText.includes('tr:hover'))
                if (rule.style.backgroundColor)
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
                    hasRule = checkRule(rule.cssRules);
                    if (hasRule)
                        break;
                }
            }
            if (rule.selectorText.includes('tr:hover')) {
                hasRule = checkRule([rule]);
                break;
            }
        }
        styleElement.remove();
        if (hasRule)
            break;
    }
    if (!hasRule)
		return ['7 задание (курсор изменяет фоновый цвет): не выполнено.', 'Не изменяется фоновый цвет строки при наведении курсора на строку таблицы. (-10%)']
	else
		return ['7 задание (курсор изменяет фоновый цвет): выполнено.', '10', '%',]
}

async function checkCriterion8() {
   const even = getXPathResult(`//tbody/tr[position() mod 2 = 0]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const odd = getXPathResult(`//tbody/tr[position() mod 2 = 1]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const evenHead = getXPathResult(`//thead/tr[position() mod 2 = 0]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const oddHead = getXPathResult(`//thead/tr[position() mod 2 = 1]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var styleTmp = null;
    var colorBg = false;
    var colorBg2 = false;
    var colorBgHead = false;
    var colorBgHead2 = false;

    if (evenHead) {
        const styleEvenHead = window.getComputedStyle(evenHead);
        colorBgHead = styleEvenHead.backgroundColor;
    }
    if (oddHead) {
        const styleOddHead = window.getComputedStyle(oddHead);
        colorBgHead2 = styleOddHead.backgroundColor;
    }

    if (even.snapshotLength > 0) {
        styleTmp = window.getComputedStyle(even.snapshotItem(0));
        colorBg = styleTmp.backgroundColor;
        for (var i = 1; i < even.snapshotLength; i++){
            const styleEven = window.getComputedStyle(even.snapshotItem(i));
            const bgColorEven = styleEven.backgroundColor;
            if (bgColorEven !== colorBg || colorBgHead === bgColorEven) {
                colorBg = false;
                break;
            }
        }
    }

    if (odd.snapshotLength > 0) {
        styleTmp = window.getComputedStyle(odd.snapshotItem(0));
        colorBg2 = styleTmp.backgroundColor;
        for (var i = 1; i < odd.snapshotLength; i++){
            const styleOdd = window.getComputedStyle(odd.snapshotItem(i));
            const bgColorOdd = styleOdd.backgroundColor;
            if (bgColorOdd !== colorBg2 || colorBgHead2 === bgColorOdd) {
                colorBg2 = false;
                break;
            }
        }
    }
    if (!colorBg || !colorBg2 || colorBg === colorBg2)
		return ['8 задание (четные и нечетные строки тела таблицы): не выполнено.', 'Четные и нечетные строки тела таблицы не оформлены разными фоновыми цветами. (-10%)']
	else
		return ['8 задание (четные и нечетные строки тела таблицы): выполнено.', '10', '%',]
}

async function checkCriterion9() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasRule = false;

    function checkRule(rules) {
        for (const rule of rules) {
            if (rule.selectorText.includes('th'))
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
                    hasRule = checkRule(rule.cssRules);
                    if (hasRule)
                        break;
                }
            }
            if (rule.selectorText.includes('th')) {
                hasRule = checkRule([rule]);
                break;
            }
        }
        styleElement.remove();
        if (hasRule)
            break;
    }
    if (!hasRule)
		return ['9 задание (оформление заголовков таблицы): не выполнено.', 'Не оформлены заголовки таблицы. (-10%)']
	else
		return ['9 задание (оформление заголовков таблицы): выполнено.', '10', '%',]
}

async function checkCriterion10() {
    const linkResult = getXPathResult(`//link[@rel = 'stylesheet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var hasRule = false;
    
    function checkSelector(rule) {
        if (rule.selectorText === 'table') 
            if (rule.style.borderStyle) 
                return true;
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
                hasRule = checkSelector(rule);
                if(hasRule)
                    break;
            }
            else if (rule instanceof CSSMediaRule) {
                const mediaText = rule.media.mediaText;
                if (mediaText === 'print') {
                    const dopCssRules = rule.cssRules;
                    for (const dopRule of dopCssRules) {
                        hasRule = checkSelector(rule);
                        if(hasRule)
                            break;
                    }
                }
            }
            else break;
        }
        styleElement.remove();
        if (hasRule)
            break;
    }
    if (!hasRule)
		return ['10 задание (сплошная рамка для границ таблицы для печати): не выполнено.', 'Не использована сплошная рамка для границ таблицы в печатной версии. (-10%)']
	else
		return ['10 задание (сплошная рамка для границ таблицы для печати): выполнено.', '10', '%',]
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
	checkCriterion7,
	checkCriterion8,
	checkCriterion9,
	checkCriterion10
);