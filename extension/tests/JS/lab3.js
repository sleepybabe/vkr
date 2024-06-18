async function checkCriterion1() {
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
		return ['1 задание (кнопка "Очистить"): не выполнено.', 'Кнопка "Очистить" не удаляет весь текст. (-12%)']
	else
		return ['1 задание (кнопка "Очистить"): выполнено.', '12', '%',]
}

async function checkCriterion2() {
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
		return ['2 задание (кнопка "Верхний регистр"): не выполнено.', ' Кнопка "Верхний регистр" не преобразует весь текст в верхний регистр. (-12%)']
	else
		return ['2 задание (кнопка "Верхний регистр"): выполнено.', '12', '%',]
}

async function checkCriterion3() {
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
		return ['3 задание (кнопка "Сортировать"): не выполнено.', 'Кнопка "Сортировать" не сортирует строки в алфавитном порядке. (-12%)']
	else
		return ['3 задание (кнопка "Сортировать"): выполнено.', '12', '%',]
}

async function checkCriterion4() {
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
		return ['4 задание (кнопка "Перевернуть"): не выполнено.', 'Кнопка "Перевернуть" не меняет порядок строк на обратный. (-12%)']
	else
		return ['4 задание (кнопка "Перевернуть"): выполнено.', '12', '%',]
}

async function checkCriterion5() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[contains(text(), 'Добавить номера строк')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    if (textarea && button) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        button.click();
        const numberedLines = textarea.value.trim().split('\n');
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
		return ['5 задание (кнопка "Добавить номера строк"): не выполнено.', 'Кнопка "Добавить номера строк" не добавляет номера строк вначале каждой строки. (-12%)']
	else
		return ['5 задание (кнопка "Добавить номера строк"): выполнено.', '12', '%',]
}

async function checkCriterion6() {
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
		return ['6 задание (кнопка "Удалить пустые строки"): не выполнено.', 'Кнопка "Удалить пустые строки" не удаляет все пустые строки из поля. (-12%)']
	else
		return ['6 задание (кнопка "Удалить пустые строки"): выполнено.', '12', '%',]
}

async function checkCriterion7() {
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
		return ['7 задание (кнопка "Перемешать"): не выполнено.', 'Кнопка "Перемешать" не записывает строки в случайном порядке. (-12%)']
	else
		return ['7 задание (кнопка "Перемешать"): выполнено.', '12', '%',]
}

async function checkCriterion8() {
	return checkVariantCriterion8();
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
	checkCriterion6,
	checkCriterion7,
	checkCriterion8
);