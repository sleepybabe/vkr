function checkCriterion1(){
    return checkCriterion1Result()
}

async function checkCriterion1Result(){
    const minInput = getXPathResult(`//input[@id = 'min']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const secInput = getXPathResult(`//input[@id = 'sec']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const startButton = getXPathResult(`//button[@id = 'go']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;
    var previousMinValue = null;
    var previousSecValue = null;

    if (startButton && secInput && minInput) {
        secInput.value = 1;
        minInput.value = 1;
        startButton.click();
        await new Promise((resolve) => {
            const intervalId = setInterval(() => {
                const currentMinValue = parseInt(minInput.value);
                const currentSecValue = parseInt(secInput.value);
                if (previousSecValue !== null && previousMinValue !== null) {
                    if (previousSecValue === 0 && previousMinValue > 0) {
                        if (currentMinValue !== previousMinValue - 1 || currentSecValue !== 59) {
                            isCorrect = false;
                        }
                    } else if (previousSecValue > 0) {
                        if (currentSecValue !== previousSecValue - 1 || currentMinValue !== previousMinValue) {
                            isCorrect = false;
                        }
                    }
                }
                previousMinValue = currentMinValue;
                previousSecValue = currentSecValue;
            }, 1000);        
            setTimeout(() => {
                clearInterval(intervalId, true);
                startButton.disabled = false;
                minInput.value = 0;
                secInput.value = 0;
                resolve();
            }, 2200);
        });
    }
    else isCorrect = false;
    if (!isCorrect)
        return '1 задание: не выполнено. Неправильно отображаются минуты и секунды обратного отсчета на странице.';
    else 
        return '1 задание: выполнено.';
}

function checkCriterion2(){
    return checkCriterion2Result()
}

async function checkCriterion2Result(){
    const minInput = getXPathResult(`//input[@id = 'min']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const secInput = getXPathResult(`//input[@id = 'sec']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const startButton = getXPathResult(`//button[@id = 'go']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    var previousMinValue = null;
    var previousSecValue = null;
    var zeroSec = false;

    if (startButton && secInput && minInput) {
        secInput.value = 2;
        minInput.value = 0;
        startButton.click();
        await new Promise((resolve) => {
            const intervalId = setInterval(() => {
                const currentMinValue = parseInt(minInput.value);
                const currentSecValue = parseInt(secInput.value);
                if (previousSecValue !== null && previousMinValue !== null) {
                    if (previousSecValue === 0 && previousMinValue > 0) {
                        if (currentMinValue !== previousMinValue - 1 || currentSecValue !== 59) {
                            isCorrect = false;
                        }
                    } else if (previousSecValue > 0) {
                        if (currentSecValue !== previousSecValue - 1 || currentMinValue !== previousMinValue){
                            isCorrect = false;
                        }
                    }
                }
                previousMinValue = currentMinValue;
                previousSecValue = currentSecValue;
                if ((currentMinValue === 0 && currentSecValue === 0) || (currentMinValue < 0 && currentSecValue < 0))
                    zeroSec = true;
                if(zeroSec && currentMinValue === 0 && currentSecValue === 0)
                    isCorrect = true;
                if(zeroSec && (currentMinValue !== 0 || currentSecValue !== 0)) {
                    isCorrect = false;
                }
            }, 1000);
            setTimeout(() => {
                clearInterval(intervalId, true);
                startButton.disabled = false;
                minInput.value = 0;
                secInput.value = 0;
                resolve();
            }, 3200);
        });
    }

    
    if (!isCorrect)
        return '2 задание: не выполнено. Обратный отсчет не останавливается при достижении 0 минут и 0 секунд.';
    else 
        return '2 задание: выполнено.';
}

function checkCriterion3(){
    return checkCriterion3Result()
}

async function checkCriterion3Result(){
    const minInput = getXPathResult(`//input[@id = 'min']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const secInput = getXPathResult(`//input[@id = 'sec']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const startButton = getXPathResult(`//button[@id = 'go']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const textInput = getXPathResult(`//input[@id='message']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    var isRightTime = true;

    if (startButton && textInput && minInput && secInput) {
        textInput.value = 'hello world!';
        minInput.value = 0;
        secInput.value = 3;
        startButton.click();

        window.addEventListener("message", function(event) {
            if (event.source !== window) return;
            const message = event.data;
            if (message && message.action === "alertMessage") {
                if ((message.message).includes(textInput.value))
                    isCorrect = true;
            }
        });
        await new Promise((resolve) => {
            const intervalId = setInterval(() => {
                const currentMinValue = parseInt(minInput.value);
                const currentSecValue = parseInt(secInput.value);
                if ((currentMinValue === 0 && currentSecValue !== 0) && (isCorrect ||
                    getXPathResult(`//*[contains(., '${textInput.value}') and @id!='message']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0))) {
                    isCorrect = false;
                    isRightTime = false;
                    clearInterval(intervalId, true);
                    startButton.disabled = false;
                    minInput.value = 0;
                    secInput.value = 0;
                    resolve();
                }
            }, 1000);
            setTimeout(() => {
                clearInterval(intervalId, true);
                const result = getXPathResult(`//*[contains(., '${textInput.value}') and @id!='message']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
                if (result && isRightTime)
                    isCorrect = true;
                startButton.disabled = false;
                minInput.value = 0;
                secInput.value = 0;
                resolve();
            }, 4500);
        });
    }
    if (!isCorrect)
        return '3 задание: не выполнено. Текст напоминания не выведен при остановке счетчика.';
    else 
        return '3 задание: выполнено.';
}

function checkCriterion4(){
    return checkCriterion4Result()
}

async function checkCriterion4Result(){
    const minInput = getXPathResult(`//input[@id = 'min']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const secInput = getXPathResult(`//input[@id = 'sec']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const startButton = getXPathResult(`//button[@id = 'go']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const body = getXPathResult(`//body`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const colorInput = getXPathResult(`//input[@id = 'color']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (startButton && colorInput && body && minInput && secInput) {
        minInput.value = 0;
        secInput.value = 3;
        colorInput.value = '#FFCCC1';
        startButton.click();
        await new Promise((resolve) => {
            const intervalId = setInterval(() => {
                const currentMinValue = parseInt(minInput.value);
                const currentSecValue = parseInt(secInput.value);
                if ((currentMinValue === 0 && currentSecValue !== 0) && 
                    window.getComputedStyle(body).backgroundColor === 'rgb(255, 204, 193)') {
                    isCorrect = false;
                    clearInterval(intervalId, true);
                    startButton.disabled = false;
                    minInput.value = 0;
                    secInput.value = 0;
                    resolve();
                }
            }, 1000);
            setTimeout(() => {
                const computedStyle = window.getComputedStyle(body);
                const color = computedStyle.backgroundColor === 'rgb(255, 204, 193)';          
                if (color)
                    isCorrect = true;
                clearInterval(intervalId, true);
                startButton.disabled = false;
                minInput.value = 0;
                secInput.value = 0;
                resolve();
            }, 4200);
        });
    }
    if (!isCorrect)
        return '4 задание: не выполнено. Цвет фона не изменился при остановке счетчика.';
    else 
        return '4 задание: выполнено.';
}

function checkCriterion5(){
    return checkCriterion5Result()
}

async function checkCriterion5Result(){
    const minInput = getXPathResult(`//input[@id = 'min']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const secInput = getXPathResult(`//input[@id = 'sec']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const startButton = getXPathResult(`//button[@id = 'go']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const body = getXPathResult(`//body`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const colorInput = getXPathResult(`//input[@id = 'color']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (startButton && colorInput && body && minInput && secInput) {
        minInput.value = 0;
        secInput.value = 0
        body.style.backgroundColor = '';
        const computedStyleBefore = window.getComputedStyle(body);
        const colorBefore = computedStyleBefore.backgroundColor;    
        colorInput.value = '#94F8FF';
        startButton.click();
        await new Promise((resolve) => {
            setTimeout(() => {
                minInput.value = 0;
                secInput.value = 1;
                startButton.click();
                const computedStyle = window.getComputedStyle(body);
                const color = computedStyle.backgroundColor === colorBefore 
                            || computedStyle.backgroundColor === 'rgb(255, 255, 255)';
                if (color)
                    isCorrect = true;
            }, 2000);
            setTimeout(() => {
                resolve();
            }, 5000);
        });
    }
    if (!isCorrect)
        return '5 задание: не выполнено. Повторный запуск со сбросом фонового цвета не реализован.';
    else 
        return '5 задание: выполнено.';
}

function checkCriterion6(){
    return checkCriterion6Result()
}

async function checkCriterion6Result(){
    const minInput = getXPathResult(`//input[@id = 'min']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const secInput = getXPathResult(`//input[@id = 'sec']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const startButton = getXPathResult(`//button[@id = 'go']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (startButton && minInput && secInput) {
        await new Promise((resolve) => {
            minInput.value = 0;
            secInput.value = 4;
            startButton.click();
            minInput.value = 0;
            secInput.value = 8;
            startButton.click();
            const intervalId = setInterval(() => {});
            setTimeout(() => {
                clearInterval(intervalId, true);
                if (parseInt(secInput.value) < 4)
                    isCorrect = true;
                startButton.disabled = false;
                minInput.value = 0;
                secInput.value = 0;
                resolve();
            }, 3000);
        });
    }
    if (!isCorrect)
        return '6 задание: не выполнено. Кнопка "Пуск" реагирует на повторное нажатие при активном отсчете.';
    else 
        return '6 задание: выполнено.';
}

function checkCriterion7() {
    return checkCriterion7Result()
}

async function checkCriterion7Result(){
    const minInput = getXPathResult(`//input[@id = 'min']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const secInput = getXPathResult(`//input[@id = 'sec']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const startButton = getXPathResult(`//button[@id = 'go']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const pausetButton = getXPathResult(`//button[@id = 'pause']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (startButton && minInput && secInput && pausetButton) {
        await new Promise((resolve) => {
            minInput.value = 0;
            secInput.value = 2;
            startButton.click();
            pausetButton.click();
            const intervalId = setInterval(() => {});
            setTimeout(() => {
                clearInterval(intervalId, true);
                if (secInput.value == 2)
                    isCorrect = true;
                resolve();
                startButton.disabled = false;
                minInput.value = 0;
                secInput.value = 0;
            }, 2000);
        });
    }
    if (!isCorrect)
        return '7 задание: не выполнено. Кнопка "Пауза" не останавливает отсчет.';
    else 
        return '7 задание: выполнено.';
}

function checkCriterion8() {
    return checkCriterion8Result()
}

async function checkCriterion8Result(){
    const minInput = getXPathResult(`//input[@id = 'min']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const secInput = getXPathResult(`//input[@id = 'sec']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const startButton = getXPathResult(`//button[@id = 'go']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const stopButton = getXPathResult(`//button[@id = 'stop']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (startButton && minInput && secInput && stopButton) {
        await new Promise((resolve) => {
            minInput.value = 0;
            secInput.value = 6;
            startButton.click();
            stopButton.click();
            const intervalId = setInterval(() => {});
            setTimeout(() => {
                clearInterval(intervalId, true);
                if (minInput.value == 0 && secInput.value == 0){
                    isCorrect = true;
                }
                resolve();
                startButton.disabled = false;
                minInput.value = 0;
                secInput.value = 0;
            }, 2000);
        });
    }
    if (!isCorrect)
        return '8 задание: не выполнено. Кнопка "Стоп" не прекращает отсчет и значения полей не сбрасываются в 0.';
    else 
        return '8 задание: выполнено.';
}

function checkCriterion9() {
    return checkCriterion9Result()
}

async function checkCriterion9Result(){
    const xpathInput = `//input[@id != 'message' and @id != 'color' and @id != 'min' and @id != 'sec' and @type != 'hidden']`;
    const buttons = getXPathResult(`//button[@id != 'go' and @id != 'pause' and @id != 'stop']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const inputNumber = getXPathResult(xpathInput, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const img = getXPathResult(`//img`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (buttons.snapshotLength > 1 && textarea && inputNumber && img) {
        inputNumber.value = 1000;
        const delay = parseInt(inputNumber.value);
        textarea.value = `https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ23nBrmcH_iH7gCRwDkqEnWJRPYMm6OOaOew&s
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4sxR0oXi8nWl-zyom3jqI10E4ap6QLvF41Q&s
https://martinvorel.com/wp-content/uploads/2022/01/photography-print-3614-500x333.jpg`;
        const urls = textarea.value.split('\n');
        
        for (var i = 0; i < buttons.snapshotLength; i++) {
            var currentIndex = 0;
            buttons.snapshotItem(i).click();
            const isThisButton = new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    if (currentIndex >= urls.length)
                        currentIndex = 0;
                    if (img.src !== urls[currentIndex]) {
                        isCorrect = false;
                        clearInterval(intervalId, true);
                        resolve(false);
                    }
                    currentIndex++;
                }, delay);
                setTimeout(() => {
                    if (img.src !== urls[0]){
                        isCorrect = false;
                    }
                    else isCorrect = true;
                    clearInterval(intervalId, true);
                    resolve(true);
                }, delay * 5);
            });
            const resultIsThisButton = await isThisButton;
            
            if (resultIsThisButton) {
                currentIndex = 0;
                buttons.snapshotItem(i).click();
                const correctButtons = new Promise((resolve) => {
                    const intervalId = setInterval(() => {});
                    var imgsrc = null;
                    setTimeout(() => {
                        if (i === 0)
                            buttons.snapshotItem(i + 1).click();
                        else buttons.snapshotItem(i - 1).click();
                        imgsrc = img.src;
                    }, delay * 2);
                    setTimeout(() => {
                        if (imgsrc && img.src !== imgsrc){
                            isCorrect = false;
                            clearInterval(intervalId, true);
                            resolve(false);
                        }
                        else {
                            isCorrect = true;
                            clearInterval(intervalId, true);
                            resolve(true);
                        }
                    }, delay * 4);
                });
                const correctButtonsResult = await correctButtons;
                if (correctButtonsResult)
                    break;
            }
        }
    }
    if (!isCorrect)
        return '9 задание: не выполнено. Изменение изображений неправильно сделано.';
    else 
        return '9 задание: выполнено.';
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
checkCriteria(checkCriterion1, checkCriterion2, checkCriterion3, checkCriterion4, checkCriterion5, checkCriterion6, checkCriterion7, checkCriterion8, checkCriterion9)