async function checkCriterion1() {
    const xpathAbsolute = '//img[starts-with(@src, "http://") or starts-with(@src, "https://")]';
    const xpathRel = '//img[not(starts-with(@src, "http://")) and not(starts-with(@src, "https://")) and (contains(@src, "/"))]';
    const absoluteResult = getXPathResult(xpathAbsolute, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const relResult = getXPathResult(xpathRel, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isAltNotFoundRel = true;
    var isAltNotFoundAbs = true;
    for (var i = 0; i < relResult.snapshotLength; i++) {
        const img = relResult.snapshotItem(i);
        const altText = img.getAttribute('alt');
        if (altText){
            isAltNotFoundRel = false;
            break;
        }
    }
    for (var i = 0; i < absoluteResult.snapshotLength; i++) {
        const img = absoluteResult.snapshotItem(i);
        const altText = img.getAttribute('alt');
        if (altText){
            isAltNotFoundAbs = false;
            break;
        }
    }
    if (absoluteResult.snapshotLength === 0 || relResult.snapshotLength === 0 || isAltNotFoundRel || isAltNotFoundAbs)
		return ['1 задание (изображения с альтернативным текстом и с разными видами url): не выполнено.', 'Отсутствуют изображения с альтернативным текстом и с абсолютной и относительной url. (-25%)']
	else
		return ['1 задание (изображения с альтернативным текстом и с разными видами url): выполнено.', '25', '%',]
}

async function checkCriterion2() {
    const xpath = '//img';
    const result = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const map = new Map();
    var images;
    const set = new Set();
    var ratio = null;
    isNotRatio = true;
    isNotSameSize = true;

    for (var i = 0; i < result.snapshotLength; i++) {
        const img = result.snapshotItem(i);
        const src = img.getAttribute('src');
        if (!map.has(src))
            map.set(src, []);
        map.get(src).push(img);
    }
    for (const [src, img] of map) {
        if (img.length >= 3)
            images = img;
    }
    if (images){
        for (var i = 0; i < images.length; i++) {
            const img = images[i];
            const width = img.width;
            const height = img.height;
            const currentRatio = width/height;
            set.add(`${width}+${height}`);
            if (ratio === null)
                ratio = currentRatio;
            else if (ratio === currentRatio)
                isNotRatio = false;
                else {
                    isNotRatio = true;
                    break;
                }
        }
        if (set.size === images.length)
            isNotSameSize = false;
    }
    if (!images || isNotRatio || isNotSameSize)
		return ['2 задание (изображения с одинаковым url, сохраняющие пропорции): не выполнено.', 'Отсутствуют три разных по размеру изображения с одинаковым url, сохраняющие пропорции. (-25%)']
	else
		return ['2 задание (изображения с одинаковым url, сохраняющие пропорции): выполнено.', '25', '%',]
}

async function checkCriterion3() {
    const xpath = '//a[starts-with(@href, "http")]//img';
    const result = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    if (result.snapshotLength === 0)
		return ['3 задание (ссылка с изображения): не выполнено.', 'Отсутствуют ссылка с одного из изображений. (-25%)']
	else
		return ['3 задание (ссылка с изображения): выполнено.', '25', '%',]
}

async function checkCriterion4() {
    const mapXpath = '//map';
    const imgXpath = '//img[@usemap]';
    const mapResult = getXPathResult(mapXpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const imgResult = getXPathResult(imgXpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isConnected;
    const areaXpath = '//map/area';
    const areaResult = getXPathResult(areaXpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isNotHrefInArea = true;

    for (var i = 0; i < areaResult.snapshotLength; i++) {
        const href = areaResult.snapshotItem(i).getAttribute('href');
        if (!href) {
            isNotHrefInArea = true;
            break;
        }
        else isNotHrefInArea = false;
    }
    if (imgResult.snapshotLength > 0 && mapResult.snapshotLength > 0)
        isConnected = imgResult.snapshotItem(0).getAttribute('usemap') === ("#"+mapResult.snapshotItem(0).name || "#"+mapResult.snapshotItem(0).getAttribute('id'));
    if (!isConnected || isNotHrefInArea)
		return ['4 задание (карта изображений): не выполнено.', ' При щелчке кнопкой мышки по каждой из областей карты, не открывается отдельная веб-страница. (-25%)']
	else
		return ['4 задание (карта изображений): выполнено.', '25', '%',]
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
	checkCriterion4
);