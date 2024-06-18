async function checkCriterion1() {
    const answer = getXPathResult(`//*[@id = 'answer']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const button = getXPathResult(`//button[contains(@onclick,'convert()')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const selectArray = getXPathResult(`//select`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const input = getXPathResult(`//input`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);

    const selectFrom = selectArray.snapshotItem(0);
    const selectTo = selectArray.snapshotItem(1);

    var isCorrect = false;

    const convert = {
        'километр': 1,
        'морская миля': 1.852,
        'ярд': 0.0009144,
        'верста': 1.067
    };
    
    if (button && answer && selectFrom && selectTo && input) {
        for (var i = 0; i < selectFrom.options.length; i++) {
            selectFrom.selectedIndex = i;
            const selectedOptionFrom = selectFrom.options[i];
            const selectTextFrom = selectedOptionFrom.text;
            for (var j = 0; j < selectTo.options.length; j++) {
                selectTo.selectedIndex = j;
                const selectedOptionTo = selectTo.options[j];
                const selectTextTo = selectedOptionTo.text;
                input.value = 2;

                button.click();

                const from = convert[selectTextFrom];
                const to = convert[selectTextTo];
                const result = (input.value * from / to).toFixed(4);
                const rightAnswer = parseFloat(answer.innerText).toFixed(4);
                isCorrect = result === rightAnswer;
            }
        }
    }
    if (!isCorrect)
		return ['1 задание (функция convert()): не выполнено.', 'Неправильно выведенное число при конвертации единиц измерения. (-100%)']
	else
		return ['1 задание (функция convert()): выполнено.', '100', '%',]
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
	checkCriterion1
);