async function checkVariantCriterion2() {
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
		return ['2 задание (оформление по варианту): не выполнено.', 'Не установлено оформление заголовка первого уровня и основного текста согласно варианту. (-16%)']
	else
		return ['2 задание (оформление по варианту): выполнено.', '16', '%',]
}
