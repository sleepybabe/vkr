function checkCriterion1() {
	const answer = getXPathResult(`//*[@id = 'answer']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[@onclick='holiday();']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    if (answer && button) {
        answer.innerText = '';
        button.click();
        const answerTextAfter = answer.innerText;
        const currentDate = new Date();
        const isWeekend = (currentDate.getDay() === 0 || currentDate.getDay() === 6);
        const rightAnswer = isWeekend ? 'ДА!' : 'НЕТ!';
        isCorrect = answerTextAfter === rightAnswer;
    }
    if (!isCorrect)
		return "1 задание: не выполнено. Неправильно вставлено слово 'ДА!' или 'НЕТ!' в зависимости от текущего дня."
	else 
        return "1 задание: выполнено."
}

function checkCriterion2() {
    const body = getXPathResult(`//body`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[@onclick='holiday();']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    
    if (body && button) {
        body.className = '';
        button.click();
        const bodyClass = body.className;
        const currentDate = new Date();
        const isWeekend = (currentDate.getDay() === 0 || currentDate.getDay() === 6);
        const rightAnswer = isWeekend ? 'yes' : 'no';
        isCorrect = bodyClass === rightAnswer;
    }
    if (!isCorrect)
		return "2 задание: не выполнено. Неправильно установлен атрибут class для элемента body в зависимости от текущего дня."
	else 
        return "2 задание: выполнено."
}

function checkCriterion3() {
	const now = getXPathResult(`//*[@id = 'now']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[@onclick='holiday();']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;
    var count = 0;

    function getDayOfWeek(date) {
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return daysOfWeek[date.getDay()];
    }

    function getMonth(date) {
        const months = ['Январ', 'Феврал', 'Март', 'Апрел', 'Ма', 'Июн', 'Июл', 'Август', 'Сентябр', 'Октябр', 'Ноябр', 'Декабр'];
        return months[date.getMonth()];
    }

    if (now && button) {
        now.innerText = '';
        const currentDate = new Date();
        button.click();
        const nowText = now.innerText;
        const expectedDayOfWeek = getDayOfWeek(currentDate);
        const expectedDate = currentDate.getDate();
        const expectedMonth = getMonth(currentDate);
        const expectedYear = currentDate.getFullYear();
        const expectedTime = `${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
        var textCopy = nowText;
        const expected = [
            expectedDayOfWeek,
            expectedDate.toString(),
            expectedMonth,
            expectedYear.toString(),
            expectedTime
        ];
        for (const date of expected) {
            var copy = textCopy;
            textCopy = textCopy.replace(date, '');
            if (copy !== textCopy)
                count++;
        }
        isCorrect = count === 5;
    }
    if (!isCorrect)
		return "3 задание: не выполнено. Текущая дата не вставлена."
	else 
        return "3 задание: выполнено."
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
checkCriteria(checkCriterion1, checkCriterion2, checkCriterion3)