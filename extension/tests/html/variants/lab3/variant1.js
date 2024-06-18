async function checkVariantCriterion1() {
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
		return ['1 задание (оформление границ согласно варианту): не выполнено.', 'Не установлено оформление границ согласно варианту. (-40%)']
	else
		return ['1 задание (оформление границ согласно варианту): выполнено.', '40', '%',]
}
