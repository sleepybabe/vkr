function checkCriterion1(){
    return checkCriterion1Result()
}

async function checkCriterion1Result(){
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
        return 'задание 1: не выполнено. Не установлена ширина таблицы, зависящей от ширины родительского контейнера.';
    else 
        return 'задание 1: выполнено.';
}

function checkCriterion2(){
    return checkCriterion2Result()
}

async function checkCriterion2Result(){
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
        return 'задание 2: не выполнено. Не оформлены заголовки таблицы.';
    else 
        return 'задание 2: выполнено.';
}

function checkCriterion3(){
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
        return 'задание 3: не выполнено. Четные и нечетные строки тела таблицы не оформлены разными фоновыми цветами.';
    else 
        return 'задание 3: выполнено.';
}


function checkCriterion4(){
    return checkCriterion4Result()
}

async function checkCriterion4Result(){
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
        return 'задание 4: не выполнено. Не изменяется фоновый цвет строки при наведении курсора на строку таблицы.';
    else 
        return 'задание 4: выполнено.';
}

function checkCriterion5(){
    return checkCriterion5Result()
}

async function checkCriterion5Result(){
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
        return 'задание 5: не выполнено. Не изменяется фоновый цвет (отличный от фонового цвета выделенной строки) ячейки таблицы при наведении курсора на нее.';
    else 
        return 'задание 5: выполнено.';
}

function checkCriterion6(){
    return checkCriterion6Result()
}
    
async function checkCriterion6Result(){
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
        return 'задание 6: не выполнено. Не сделаны отступы внутри ячеек таблицы.';
    else 
        return 'задание 6: выполнено.';
}

function checkCriterion7(){
    return checkCriterion7Result()
}
    
async function checkCriterion7Result(){
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
        return 'задание 7: не выполнено. Ширина границы не задана.';
    else 
        return 'задание 7: выполнено.';
}

function checkCriterion8(){
    return checkCriterion8Result()
}
    
async function checkCriterion8Result(){
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
        return 'задание 8: не выполнено. Не сделано выравнивание внутри ячеек таблицы.';
    else 
        return 'задание 8: выполнено.';
}

function checkCriterion9(){
    return checkCriterion9Result()
}

async function checkCriterion9Result(){
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
        return 'задание 9: не выполнено. Версия для печати не черно-белая.';
    else 
        return 'задание 9: выполнено.';
}

function checkCriterion10(){
    return checkCriterion10Result()
}

async function checkCriterion10Result(){
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
        return 'задание 10: не выполнено. Не использована сплошная рамка для границ таблицы в печатной версии.';
    else 
        return 'задание 10: выполнено.';
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
checkCriteria(checkCriterion1, checkCriterion2, checkCriterion3, checkCriterion4, checkCriterion5, checkCriterion6, checkCriterion7, checkCriterion8, checkCriterion9, checkCriterion10)