function checkCriterion1() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[contains(text(), 'Очистить')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    if (textarea && button) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        button.click();
        if (textarea.value === "") 
            isCorrect = true;
    }
    if (!isCorrect)
		return "1 задание: не выполнено. Кнопка 'Очистить' не удаляет весь текст."
	else 
        return "1 задание: выполнено."
}

function checkCriterion2() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[contains(text(), 'Верхний регистр')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    if (textarea && button) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        button.click();
        if (textarea.value.trim() === text.toUpperCase())
            isCorrect = true;
    }
    if (!isCorrect)
		return "2 задание: не выполнено. Кнопка 'Верхний регистр' не преобразует весь текст в верхний регистр."
	else 
        return "2 задание: выполнено."
}

function checkCriterion3() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[contains(text(), 'Сортировать')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    if (textarea && button) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        button.click();
        const sortedText = textarea.value.split('\n').sort().join('\n');
        if (textarea.value === sortedText)
            isCorrect = true;
    }
    if (!isCorrect)
		return "3 задание: не выполнено. Кнопка 'Сортировать' не сортирует строки в алфавитном порядке."
	else
        return "3 задание: выполнено."
}

function checkCriterion4() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[contains(text(), 'Перевернуть')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    if (textarea && button) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        button.click();
        const reversedText = text.split('\n').reverse().join('\n');
        if (textarea.value.trim() === reversedText)
            isCorrect = true;
    }
    if (!isCorrect)
		return "4 задание: не выполнено. Кнопка 'Перевернуть' не меняет порядок строк на обратный."
	else
        return "4 задание: выполнено."
}

function checkCriterion5() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[contains(text(), 'Добавить номера строк')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    if (textarea && button) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        button.click();
        const numberedLines = textarea.value.trim().split('\n');

        // Проверяем, что к каждой строке добавился номер
        for (var i = 0; i < numberedLines.length; i++) {
            if (numberedLines[i].startsWith(i+1) || numberedLines[i].startsWith(i))
                isCorrect = true;
            else {
                isCorrect = false;
                break;
            }
        }
    }
    if (!isCorrect)
		return "5 задание: не выполнено. Кнопка 'Добавить номера строк' не добавляет номера строк вначале каждой строки."
	else
        return "5 задание: выполнено."
}

function checkCriterion6() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[contains(text(), 'Удалить пустые строки')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    if (textarea && button) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        button.click();
        if (textarea.value.trim() === text.trim().replace(/^\s*\n/gm, ''))
            isCorrect = true;
    }
    if (!isCorrect)
		return "6 задание: не выполнено. Кнопка 'Удалить пустые строки' не удаляет все пустые строки из поля."
	else
        return "6 задание: выполнено."
}

function checkCriterion7() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[contains(text(), 'Перемешать')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    function checkIfUnchanged(originalText, shuffledText) {
        const originalLines = originalText.split('\n');
        const shuffledLines = shuffledText.split('\n');
        if (originalLines.length !== shuffledLines.length && shuffledLines[shuffledLines.length-1] !== '')
            return false;
        for (var i = 0; i < originalLines.length; i++) {
            if (!shuffledLines.includes(originalLines[i])){
                return false;
            }
        }
        return true;
    }

    if (textarea && button) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        button.click();
        const firstShuffledText = textarea.value;
        const isUnchanged = checkIfUnchanged(text, firstShuffledText);
        if (!isUnchanged)
            isCorrect = false;
        else {
            for (var i = 0; i < 9; i++) {
                button.click();
                const currentShuffledText = textarea.value;
                const isUnchangedLater = checkIfUnchanged(text, currentShuffledText);
                if (currentShuffledText !== firstShuffledText && isUnchangedLater) {
                    isCorrect = true;
                    break;
                }
            }
        }
    }
    if (!isCorrect)
		return "7 задание: не выполнено. Кнопка 'Перемешать' не записывает строки в случайном порядке."
	else
        return "7 задание: выполнено."
}

function checkCriterion8() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const xpathbutton = `//button[not (contains(text(), 'Очистить')) and not (contains(text(), 'Верхний регистр'))
        and not (contains(text(), 'Сортировать')) and not (contains(text(), 'Перевернуть')) 
        and not (contains(text(), 'Добавить номера строк')) and not (contains(text(), 'Удалить пустые строки'))
         and not (contains(text(), 'Перемешать'))]`;
    const button = getXPathResult(xpathbutton, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const radio = getXPathResult(`//*[@type = 'radio']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const evenRadio  = radio.snapshotItem(0);
    const oddRadio = radio.snapshotItem(1);
    var isCorrect = false;
    
    if (textarea && evenRadio  && oddRadio) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        evenRadio.checked = true;
        if (button)
            button.click();
        evenRadio.click();
        if (textarea.value === "пункт 1\nпункт 3\n   \nпункт 8\n   \n")
            isCorrect = true;
        else isCorrect = false;
        textarea.value = text;
        oddRadio.checked = true;
        if (button)
            button.click();
        oddRadio.click();
        const res = "пункт 2\nпункт 4\nпункт 5\n    \nпункт 7"
        if (textarea.value.trim() === res)
            isCorrect = true;
        else isCorrect = false;
    }
    if (!isCorrect)
		return "8 задание: не выполнено. Радио-кнопки не удаляют четные или нечетные строки в зависимости от выбора."
	else
        return "8 задание: выполнено."
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
checkCriteria(checkCriterion1, checkCriterion2, checkCriterion3, checkCriterion4, checkCriterion5, checkCriterion6, checkCriterion7, checkCriterion8)