async function checkVariantCriterion6() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const rectangleArea = getXPathResult(`//div[@id = 'rectanglearea']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && rectangleArea) {
        const rect = rectangles[0];
        rect.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await new Promise((resolve) => { 
            setTimeout(() => {
                const firstBorderColor = window.getComputedStyle(rect).borderColor;
                const firstOutlineColor = window.getComputedStyle(rect).outlineColor;
                if (firstBorderColor === 'black' && firstOutlineColor === 'black') {
                    isCorrect = false;
                    resolve();
                }
                else {
                    setTimeout(() => {
                        const secondBorderColor = window.getComputedStyle(rect).borderColor;
                        const secondOutlineColor = window.getComputedStyle(rect).outlineColor;
                        if (secondBorderColor === firstBorderColor && secondOutlineColor === firstOutlineColor) {
                            isCorrect = false;
                            resolve();
                        }
                        else {
                            rect.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
                            setTimeout(() => {
                                if (rect.style.borderColor !== 'black' && rect.style.outlineColor !== 'black')
                                    isCorrect = false;
                                resolve();
                            }, 100);
                        }
                    }, 1000);
                }
            }, 1500);
        });
    }
    else isCorrect = false;

    if (!isCorrect)
		return ['6 задание (курсор меняет прямоугольник): не выполнено.', 'Прямоугольник не меняет цвет контуров должным образом при наведении курсора. (-25%)']
	else
		return ['6 задание (курсор меняет прямоугольник): выполнено.', '25', '%',]
}
