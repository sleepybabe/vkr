async function checkCriterion1() {
    const result = document.querySelectorAll('div.dogs p');
    if (result.length < 1)
		return ['1 задание (div.dogs p): не выполнено.', 'Не найден div.dogs p на странице (-14%)']
	else
		return ['1 задание (div.dogs p): выполнено.', '14', '%',]
}

async function checkCriterion2() {
    const result = document.querySelectorAll('div.cats h1.tail strong');
    if (result.length < 1)
		return ['2 задание (div.cats h1.tail strong): не выполнено.', 'Не найден div.cats h1.tail strong на странице. (-14%)']
	else
		return ['2 задание (div.cats h1.tail strong): выполнено.', '14', '%',]
}

async function checkCriterion3() {
    const result = document.querySelectorAll('div#content p.main');
    if (result.length < 1)
		return ['3 задание (div#content p.main): не выполнено.', 'Не найден div#content p.main на странице. (-14%)']
	else
		return ['3 задание (div#content p.main): выполнено.', '14', '%',]
}

async function checkCriterion4() {
    const result = document.querySelectorAll('ul.navigation li.selected a span');
    if (result.length < 1)
		return ['4 задание (ul.navigation li.selected a span): не выполнено.', 'Не найден ul.navigation li.selected a span на странице. (-14%)']
	else
		return ['4 задание (ul.navigation li.selected a span): выполнено.', '14', '%',]
}

async function checkCriterion5() {
    const result = document.querySelectorAll('div.header ul li.logo');
    if (result.length < 1)
		return ['5 задание (div.header ul li.logo): не выполнено.', 'Не найден div.header ul li.logo на странице. (-14%)']
	else
		return ['5 задание (div.header ul li.logo): выполнено.', '14', '%',]
}

async function checkCriterion6() {
    const result = document.querySelectorAll('div div div span.divspan');
    if (result.length < 1)
		return ['6 задание (div div div span.divspan): не выполнено.', 'Не найден div div div span.divspan на странице. (-14%)']
	else
		return ['6 задание (div div div span.divspan): выполнено.', '14', '%',]
}

async function checkCriterion7() {
    const result = document.querySelectorAll('table.graph tr td');
    if (result.length < 1)
		return ['7 задание (table.graph tr td): не выполнено.', 'Не найден table.graph tr td на странице. (-16%)']
	else
		return ['7 задание (table.graph tr td): выполнено.', '16', '%',]
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
	checkCriterion7
);