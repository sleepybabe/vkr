async function checkVariantCriterion6() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const rectangleArea = getXPathResult(`//div[@id = 'rectanglearea']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && rectangleArea) {
        const rect = rectangles[0];
        rect.dispatchEvent(new Event('mouseover'));
        if (rect.style.backgroundColor !== 'red')
            isCorrect = false;
        rect.dispatchEvent(new Event('mouseout'));
        if (rect.style.backgroundColor !== 'white')
            isCorrect = false;
    }
    else isCorrect = false;

    if (!isCorrect)
		return ['6 задание (курсор меняет прямоугольник): не выполнено.', 'Прямоугольник не стал красным при наведении курсора мыши или белым при "уходе". (-25%)']
	else
		return ['6 задание (курсор меняет прямоугольник): выполнено.', '25', '%',]
}
