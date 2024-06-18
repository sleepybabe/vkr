async function checkCriterion1() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const rectangleArea = getXPathResult(`//div[@id = 'rectanglearea']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && rectangleArea) {
        rectangles.forEach((rect, index) => {
            const rectBounding = rect.getBoundingClientRect();
            const areaBounding = rectangleArea.getBoundingClientRect();
            if (rectBounding.left < areaBounding.left || rectBounding.top < areaBounding.top ||
                    rectBounding.right > areaBounding.right || rectBounding.bottom > areaBounding.bottom) {
                isCorrect = false;
            }
        });
    }
    else isCorrect = false;

    if (!isCorrect)
		return ['1 задание (прямоугольники в контейнер): не выполнено.', 'Прямоугольники не были добавлены на страницу в контейнер. (-15%)']
	else
		return ['1 задание (прямоугольники в контейнер): выполнено.', '15', '%',]
}

async function checkCriterion2() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const startButton = getXPathResult(`//button[@id = 'start']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && startButton) {
        var colorsAfterStart = [];
        var colorsAfterOneSeconds = [];
        var colorsAfterTwoSeconds = [];
        var count = 0;
        startButton.click();
        await new Promise((resolve) => setTimeout((resolve), 1000));
        rectangles.forEach((rect, index) => {
            colorsAfterStart.push(rect.style.backgroundColor);
        });

        await new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (count === 0) {
                    rectangles.forEach((rect, index) => {
                        colorsAfterOneSeconds.push(rect.style.backgroundColor);
                    });
                } 
                else {
                    rectangles.forEach((rect, index) => {
                        colorsAfterTwoSeconds.push(rect.style.backgroundColor);
                    });
                }
                count++;
            }, 1000);
            const timeout = setTimeout(() => {
                clearInterval(intervalId, true);
                startButton.disabled = false;
                rectangles.forEach((rect, index) => {
                    if (colorsAfterStart[index] === colorsAfterTwoSeconds[index] || colorsAfterStart[index] === colorsAfterOneSeconds[index]
                        || colorsAfterTwoSeconds[index] === colorsAfterOneSeconds[index]) 
                        isCorrect = false;
                });
                resolve();
            }, 3000);
            setTimeout(() => {
                if (colorsAfterStart[0] !== rectangles[0].style.backgroundColor){
                    clearInterval(intervalId, true);
                    clearTimeout(timeout);
                    isCorrect = false;
                    startButton.disabled = false;
                    resolve();
                }
            }, 900);
            
        });
    }
    else isCorrect = false;
    if (!isCorrect)
		return ['2 задание (кнопка "Пуск!" с запуском изменения цвета прямоугольников 1 раз в секунду): не выполнено.', 'При нажатии кнопки "Пуск!" каждый прямоугольник не изменяет свой цвет случайным образом 1 раз каждую секунду. (-15%)']
	else
		return ['2 задание (кнопка "Пуск!" с запуском изменения цвета прямоугольников 1 раз в секунду): выполнено.', '15', '%',]
}

async function checkCriterion3() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const startButton = getXPathResult(`//button[@id = 'start']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && startButton) {
        startButton.click();
        const intervalId = setInterval(() => {});
        if (!startButton.disabled)
            isCorrect = false;
        clearInterval(intervalId, true);
        startButton.disabled = false;
    }
    else isCorrect = false;
    if (!isCorrect)
		return ['3 задание (кнопка без повторного нажатия): не выполнено.', 'Кнопка "Пуск!" реагирует на повторные нажатия. (-15%)']
	else
		return ['3 задание (кнопка без повторного нажатия): выполнено.', '15', '%',]
}

async function checkCriterion4() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const startButton = getXPathResult(`//button[@id = 'start']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const stopButton = getXPathResult(`//button[@id = 'stop']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && startButton && stopButton) {
        startButton.click();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const colorBeforeStop = rectangles[0].style.backgroundColor;
        stopButton.click();
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const colorAfterStop = rectangles[0].style.backgroundColor;
        if (colorBeforeStop !== colorAfterStop) {
            isCorrect = false;
            const intervalId = setInterval(() => {});
            clearInterval(intervalId, true);
            startButton.disabled = false;
        } 
    }
    else isCorrect = false;
    if (!isCorrect)
		return ['4 задание (кнопка "Стоп" с остановкой изменения цветов): не выполнено.', 'При нажатии кнопки "Стоп" смена цветов не прекратилась. (-15%)']
	else
		return ['4 задание (кнопка "Стоп" с остановкой изменения цветов): выполнено.', '15', '%',]
}

async function checkCriterion5() {
    const rectangles = document.querySelectorAll('div.rectangle');
    var isCorrect = true;

    if (rectangles.length !== 0) {
        const lengthBefore = rectangles.length;
        const clickedRectangle = rectangles[0];
        clickedRectangle.click();
        const lengthAfter = document.querySelectorAll('div.rectangle').length;
        if ((lengthAfter !== lengthBefore - 1) || document.body.contains(clickedRectangle))
            isCorrect = false;
    }
    else isCorrect = false;
    if (!isCorrect)
		return ['5 задание (удаление прямоугольника по клику): не выполнено.', 'Прямоугольник не удаляется при клике по нему. (-15%)']
	else
		return ['5 задание (удаление прямоугольника по клику): выполнено.', '15', '%',]
}

async function checkCriterion6() {
	return checkVariantCriterion6();
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
	checkCriterion4,
	checkCriterion5,
	checkCriterion6
);