function checkVariantCriterion() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const rectangleArea = getXPathResult(`//div[@id = 'rectanglearea']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (rectangles.length !== 0)
        isCorrect = true;
    if (isCorrect && rectangleArea) {
        const rect = rectangles[0];
        rect.dispatchEvent(new Event('mouseover'));
        if (rect.style.backgroundColor !== 'red')
            isCorrect = false;
        rect.dispatchEvent(new Event('mouseout'));
        if (rect.style.backgroundColor !== 'white')
            isCorrect = false;
    }
    if (!isCorrect)
        return ['6 задание: не выполнено.', 'Прямоугольник не стал красным при наведении курсора мыши или белым при "уходе".'];
    else 
        return ['6 задание: выполнено.','Процент:', 60];
}