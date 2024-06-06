function checkVariantCriterion() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const rectangleArea = getXPathResult(`//div[@id = 'rectanglearea']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (!isCorrect)
        return ['6 задание: не выполнено.', 'Тут что-то будет.'];
    else 
        return ['6 задание: выполнено.', 'Процент:', 60];
}