async function checkVariantCriterion8() {
    const rectangles = document.querySelectorAll('.rectangle');
    const rectangleArea = getXPathResult(`//div[@id = 'rectanglearea']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const addbutton = getXPathResult(`//button[not (@id = "color")]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const numberInput = getXPathResult(`//input[not (@id = "colortouse") and not(@type = 'hidden')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && rectangleArea && addbutton && numberInput) {
        const lengthBefore = rectangles.length;
        numberInput.value = 2;
        addbutton.click();
        const afterRects = document.querySelectorAll('.rectangle');
        const lengthAfter = afterRects.length;
        if (lengthBefore !== lengthAfter - numberInput.value)
            isCorrect = false;
        else { 
            afterRects.forEach(rect => {
                if (!rectangleArea.contains(rect))
                    isCorrect = false;
            });
        }
    } 
    else isCorrect = false;
    if (!isCorrect)
		return ['8 задание (добавление прямоугольников): не выполнено.', 'Добавление прямоугольников по нажатию кнопки не работает правильно. (-15%)']
	else
		return ['8 задание (добавление прямоугольников): выполнено.', '15', '%',]
}
