async function checkVariantCriterion1() {
    const listOutside = getXPathResult(`//li[not(ancestor::li)]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const listInside = getXPathResult(`//ul[(ancestor::li)] | //ol[(ancestor::li)]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const body = getXPathResult(`//body`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);

    var isCorrect = false;
    var isLength = true;

    if (listOutside.snapshotLength !== listInside.snapshotLength)
        isLength = false;
    if (isLength) {
        for (var i = 0; i < listInside.snapshotLength; i++) {
            
            const elementOutside = listOutside.snapshotItem(i);
            const computedStyleOutside = window.getComputedStyle(elementOutside);
            const listImageOutside = computedStyleOutside.listStyleImage.includes('url');

            const elementInside = listInside.snapshotItem(i);
            const computedStyleInside = window.getComputedStyle(elementInside);
            const listMarginInside = computedStyleInside.marginLeft && computedStyleInside.marginLeft !== '0px'

            const listBorderStyleInside = computedStyleInside.borderStyle && computedStyleInside.borderStyle === 'dotted'
            const listBorderColorInside = computedStyleInside.borderColor && computedStyleInside.borderColor === 'rgb(255, 0, 0)'
            const listBgColorInside = computedStyleInside.backgroundColor && computedStyleInside.backgroundColor === 'rgb(255, 165, 0)'
            if (listImageOutside && listMarginInside && listBorderStyleInside && listBorderColorInside && listBgColorInside)
                isCorrect = true;
            else {
                isCorrect = false;
                break;
            }
        }
        const computedStyleBody = window.getComputedStyle(body);
        const listBorderStyleBody = computedStyleBody.borderStyle && computedStyleBody.borderStyle === 'ridge'
        const listBorderColorBody = computedStyleBody.borderColor && computedStyleBody.borderColor === 'rgb(255, 255, 0)'
        if (!listBorderStyleBody || !listBorderColorBody || !isCorrect)
            isCorrect = false;
    }
    if (!isCorrect)
		return ['1 задание (оформление списка по варианту): не выполнено.', 'Оформление списка не выполнено по варианту. (-100%)']
	else
		return ['1 задание (оформление списка по варианту): выполнено.', '100', '%',]
}
