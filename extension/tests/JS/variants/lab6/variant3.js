async function checkVariantCriterion() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const rectangleArea = getXPathResult(`//div[@id = 'rectanglearea']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && rectangleArea) {
        const rect = rectangles[0];
        var initialWidth = parseInt(window.getComputedStyle(rect).width);
        var initialHeight = parseInt(window.getComputedStyle(rect).height);
        rect.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        await new Promise((resolve) => { 
            setTimeout(() => {
                var firstWidth = parseInt(window.getComputedStyle(rect).width);
                var firstHeight = parseInt(window.getComputedStyle(rect).height);
                console.log('first', initialHeight, initialWidth)
                console.log('sec', firstHeight, firstWidth)
                if (firstWidth !== initialWidth + 10 || firstHeight !== initialHeight + 10) {
                    isCorrect = false;
                    rect.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
                    resolve();
                } 
                else {
                    setTimeout(() => {
                        const secondWidth = parseInt(window.getComputedStyle(rect).width);
                        const secondHeight = parseInt(window.getComputedStyle(rect).height);
                        if (secondWidth !== firstWidth + 10 || secondHeight !== firstHeight + 10) {
                            isCorrect = false;
                            rect.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
                            resolve();
                        }
                        else {
                            rect.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
                            setTimeout(() => {
                                var finalWidth = parseInt(window.getComputedStyle(rect).width);
                                var finalHeight = parseInt(window.getComputedStyle(rect).height)
                                if (finalWidth !== initialWidth || finalHeight !== initialHeight)
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
        return ['6 задание (курсор меняет прямоугольник): не выполнено.', 'Прямоугольник не меняет размер должным образом при наведении курсора (-25%).'];
    else 
        return ['6 задание (курсор меняет прямоугольник): выполнено.', 25, '%'];
}