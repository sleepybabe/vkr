async function checkCriterion1() {
    const turtlesBefore = document.querySelectorAll('.turtle');
    var isCorrect = false;
    var numberScrolls = 5;
    for (var i = 0; i < numberScrolls; i++) {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    const turtlesAfter = document.querySelectorAll('.turtle');
    if (turtlesAfter && turtlesBefore && turtlesAfter.length === (turtlesBefore.length + numberScrolls)) {
        isCorrect = true;
    }
    if (!isCorrect)
		return ['1 задание (бесконечно-прокручивающиеся черепахи): не выполнено.', 'Не добавляется черепаха при прокрутке страницы вниз. (-100%)']
	else
		return ['1 задание (бесконечно-прокручивающиеся черепахи): выполнено.', '100', '%',]
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