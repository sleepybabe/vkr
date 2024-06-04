function checkCriterion1(){
    const result = document.querySelectorAll('div.dogs p');
    if (result.length < 1)
        return 'задание 1: не выполнено. Не найден div.dogs p на странице';
    else 
        return 'задание 1: выполнено.';
}

function checkCriterion2(){
    const result = document.querySelectorAll('div.cats h1.tail strong');
    if (result.length < 1)
        return 'задание 2: не выполнено. Не найден div.cats h1.tail strong на странице';
    else 
        return 'задание 2: выполнено.';
}

function checkCriterion3(){
    const result = document.querySelectorAll('div#content p.main');
    if (result.length < 1)
        return 'задание 3: не выполнено. Не найден div#content p.main на странице';
    else 
        return 'задание 3: выполнено.';
}

function checkCriterion4(){
    const result = document.querySelectorAll('ul.navigation li.selected a span');
    if (result.length < 1)
        return 'задание 4: не выполнено. Не найден ul.navigation li.selected a span на странице';
    else 
        return 'задание 4: выполнено.';
}

function checkCriterion5(){
    const result = document.querySelectorAll('div.header ul li.logo');
    if (result.length < 1)
        return 'задание 5: не выполнено. Не найден div.header ul li.logo на странице';
    else 
        return 'задание 5: выполнено.';
}

function checkCriterion6(){
    const result = document.querySelectorAll('div div div span.divspan');
    if (result.length < 1)
        return 'задание 6: не выполнено. Не найден div div div span.divspan на странице';
    else 
        return 'задание 6: выполнено.';
}

function checkCriterion7(){
    const result = document.querySelectorAll('table.graph tr td');
    if (result.length < 1)
        return 'задание 7: не выполнено. Не найден table.graph tr td на странице';
    else 
        return 'задание 7: выполнено.';
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
checkCriteria(checkCriterion1, checkCriterion2, checkCriterion3, checkCriterion4, checkCriterion5, checkCriterion6, checkCriterion7)