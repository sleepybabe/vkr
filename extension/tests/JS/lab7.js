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
        return ['1 задание (прямоугольники в контейнер): не выполнено.', 'Прямоугольники не были добавлены на страницу в контейнер.'];
    else 
        return ['1 задание (прямоугольники в контейнер): выполнено.', 'Процент:', 15];
}

async function checkCriterion2() {
    const colorInput = getXPathResult(`//input[@id = 'colortouse']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (colorInput) {
        const validChars = '1234567890abcdefABCDEF'.split('');
        const invalidChars = 'ghijklmnopqrstuvwxyzGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-='.split('');
        async function simulateInput(char) {
            const event = new KeyboardEvent('keydown', {
                key: char,
                keyCode: char.charCodeAt(0),
                which: char.charCodeAt(0),
                bubbles: true,
                cancelable: true
            });
            colorInput.dispatchEvent(event);
            if (!event.defaultPrevented) {
                colorInput.value += char;
                const inputEvent = new InputEvent('input', {
                    bubbles: true,
                    cancelable: true
                });
                colorInput.dispatchEvent(inputEvent);
            }
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        for (var char of validChars) {
            colorInput.value = '';
            await simulateInput(char);
            if (!colorInput.value.includes(char))
                isCorrect = false;
        }

        if (isCorrect) {
            for (var char of invalidChars) {
                colorInput.value = '';
                await simulateInput(char);
                if (colorInput.value.includes(char))
                    isCorrect = false;
            }
        }
    }
    else isCorrect = false;
    if (!isCorrect)
        return ['2 задание (поле "colortouse" с проверкой ввода): не выполнено.', 'Поле "colortouse" принимает не только шестнадцатеричные символы.'];
    else 
        return ['2 задание (поле "colortouse" с проверкой ввода): выполнено.', 'Процент:', 15];
}

async function checkCriterion3() {
    const colorInput = getXPathResult(`//input[@id = 'colortouse']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (colorInput) {
        async function simulateKeydown(key, keyCode) {
            const event = new KeyboardEvent('keydown', {
                key: key,
                keyCode: keyCode,
                which: keyCode,
                bubbles: true,
                cancelable: true
            });
            colorInput.dispatchEvent(event);
            if (!event.defaultPrevented) {
                if (key === 'Backspace') {
                    const selectionStart = colorInput.selectionStart;
                    if (selectionStart > 0) {
                        colorInput.value = colorInput.value.slice(0, selectionStart - 1) + colorInput.value.slice(selectionStart);
                        colorInput.setSelectionRange(selectionStart - 1, selectionStart - 1);
                    }
                } 
                else if (key === 'Delete') {
                    const selectionStart = colorInput.selectionStart;
                    if (selectionStart < colorInput.value.length) {
                        colorInput.value = colorInput.value.slice(0, selectionStart) + colorInput.value.slice(selectionStart + 1);
                        colorInput.setSelectionRange(selectionStart, selectionStart);
                    }
                }
            }
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        colorInput.value = 'abc123';
        colorInput.setSelectionRange(colorInput.value.length, colorInput.value.length);
        await simulateKeydown('Backspace', 8);
        if (colorInput.value !== 'abc12')
            isCorrect = false;
        else {
            colorInput.value = 'abc123';
            colorInput.setSelectionRange(3, 3);
            await simulateKeydown('Delete', 46);
            if (colorInput.value !== 'abc23')
                isCorrect = false;
        }
    } 
    else isCorrect = false;
    if (!isCorrect)
        return ['3 задание (проверка клавиш Backspace и Delete): не выполнено.', 'Поле "colortouse" неверно обрабатывает клавиши Backspace/Delete.'];
    else
        return ['3 задание (проверка клавиш Backspace и Delete): выполнено.', 'Процент:', 15];
}


async function checkCriterion4() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const colorInput = getXPathResult(`//input[@id = 'colortouse']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const colorButton = getXPathResult(`//button[@id = 'color']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && colorInput && colorButton) {
        colorInput.value = 'abcdef';
        colorButton.click();
        rectangles.forEach((rect) => {
            if (window.getComputedStyle(rect).backgroundColor !== 'rgb(171, 205, 239)')
                isCorrect = false;
        });
    }
    else isCorrect = false;
    if (!isCorrect)
        return ['4 задание (закрашивание прямоугольников введенным цветом): не выполнено.', 'При нажатии по кнопке "Цвет" прямоугольники не окрасились в цвет, введенный в поле "colortouse".'];
    else 
        return ['4 задание (закрашивание прямоугольников введенным цветом): выполнено.', 'Процент:', 15];
}

async function checkCriterion5() {
    const rectangles = document.querySelectorAll('div.rectangle');
    const rectangleArea = getXPathResult(`//div[@id = 'rectanglearea']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && rectangleArea) {
        const rect = rectangles[0];
        const initialColor = window.getComputedStyle(rect).backgroundColor;
        const mouseOverEvent = new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        rect.dispatchEvent(mouseOverEvent);
        rect.dispatchEvent(mouseOverEvent);
        await new Promise(resolve => setTimeout(resolve, 100));
        const firstMouseOverColor = window.getComputedStyle(rect).backgroundColor;
        if (firstMouseOverColor === initialColor)
            isCorrect = false;
        else {
            const mouseOutEvent = new MouseEvent('mouseout', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            rect.dispatchEvent(mouseOutEvent);
            await new Promise(resolve => setTimeout(resolve, 100));
            rect.dispatchEvent(mouseOverEvent);
            await new Promise(resolve => setTimeout(resolve, 100));
            const secondMouseOverColor = window.getComputedStyle(rect).backgroundColor;
            if (secondMouseOverColor === firstMouseOverColor)
                isCorrect = false;
        }
    }
    else isCorrect = false;
    if (!isCorrect)
        return ['5 задание (курсор меняет цвета прямоугольников на случайный): не выполнено.', 'Прямоугольник не изменил свой цвет фона на случайный при наведении курсора мыши.'];
    else 
        return ['5 задание (курсор меняет цвета прямоугольников на случайный): выполнено.','Процент:', 25];
}

async function checkCriterion6() {
    const rectangles = document.querySelectorAll('div.rectangle');
    var isCorrect = true;

    if (rectangles.length !== 0) {
        const initialColors = Array.from(rectangles).map(rect => window.getComputedStyle(rect).backgroundColor);
        async function simulateKeydown() {
            const ctrlKeyDown = new KeyboardEvent('keydown', {
                key: 'Control',
                keyCode: 17,
                which: 17,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(ctrlKeyDown);

            const arrowKeyDown = new KeyboardEvent('keydown', {
                key: 'ArrowUp',
                keyCode: 38,
                which: 38,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(arrowKeyDown);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        await simulateKeydown();
        rectangles.forEach((rect, index) => {
            const currentColor = window.getComputedStyle(rect).backgroundColor;
            if (currentColor === initialColors[index])
                isCorrect = false;
        });
    }     
    else isCorrect = false;
    if (!isCorrect)
        return ['6 задание (закрасить прямоугольники): не выполнено.', 'Не все прямоугольники изменили цвет после нажатия Ctrl + Вверх.'];
    else 
        return ['6 задание (закрасить прямоугольники): выполнено.', 'Процент:', 15];
}

async function checkCriterion7() {
    const rectangles = document.querySelectorAll('.rectangle');
    const parent = getXPathResult(`//div[@id = 'rectanglearea']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (rectangles.length !== 0 && parent) {
        for (const rect of rectangles) {
            const rectRect = rect.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();
            const startX = rectRect.left + rectRect.width / 2;
            const startY = rectRect.top + rectRect.height / 2;
            const initialLeft = rectRect.left;
            const initialTop = rectRect.top;

            rect.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: startX, clientY: startY }));

            const endX = parentRect.left - 10;
            const endY = parentRect.top - 10;

            rect.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: endX, clientY: endY }));
            rect.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: endX, clientY: endY }));
            await new Promise(resolve => setTimeout(resolve, 500));

            const newRectRect = rect.getBoundingClientRect();
            if (!(newRectRect.left >= parentRect.left && newRectRect.right <= parentRect.right &&
                newRectRect.top >= parentRect.top && newRectRect.bottom <= parentRect.bottom)) {
                isCorrect = false;
                break;
            }
            if (newRectRect.left === initialLeft && newRectRect.top === initialTop) {
                isCorrect = false;
                break;
            }
        }
    } 
    else isCorrect = false;

    if (!isCorrect)
        return ['7 задание (свойство Draggable): не выполнено.', 'Не сделано перетаскивание прямоугольников внутри родительской области.'];
    else 
        return ['7 задание (свойство Draggable): выполнено.', 'Процент:', 15];
}

async function checkCriterion8() {
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
        return ['8 задание (добавление прямоугольников): не выполнено.', 'Добавление прямоугольников по нажатию кнопки не работает правильно.'];
    else 
        return ['8 задание (добавление прямоугольников): выполнено.', 'Процент:', 15];
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

async function checkCriteria(...functions){
    var arrayOfResults = [];
    for (i = 0; i < functions.length; i++) {
        const tmp = await functions[i]();
        arrayOfResults.push(tmp);
    }
    chrome.runtime.sendMessage({ action: "showResult", arrayOfResults: arrayOfResults});
}
checkCriteria(
    checkCriterion1,
    checkCriterion2,
    checkCriterion3,
    checkCriterion4,
    checkCriterion5,
    checkCriterion6,
    checkCriterion7,
    checkCriterion8
);