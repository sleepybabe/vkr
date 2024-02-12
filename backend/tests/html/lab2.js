

function checkAllCriteria() {
    var message = "";
    message += checkCriterion1();
    message += checkCriterion8();
    message += checkCriterion9();
    
    chrome.runtime.sendMessage({ action: "sendResult", result: message});
}

checkAllCriteria();

function getXPathResult(xpath){
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    return result.snapshotLength;
}

function checkCriterion1(){
    var arrayOfResults = [];
    const func = [checkSub1Criterion1, checkSub2Criterion1, checkSub3Criterion1, checkSub4Criterion1, checkSub5Criterion1,
        checkSub6Criterion1, checkSub7Criterion1, checkSub8Criterion1, checkSub9Criterion1, checkSub10Criterion1];
    for(i=0; i<10; i++) {
        const tmp = func[i]();
        if (tmp)
            arrayOfResults.push(tmp);
    }
    if (arrayOfResults.length == 0)
        return `Первое задание выполнено! `
    else {
        var message = "";
        for(i=0; i<arrayOfResults.length; i++){
            message += `${arrayOfResults[i]}${(i!=arrayOfResults.length - 1 ? `, ` : ` `)}`;
        }
        return `Первое задание: не выполнено! (${message})`
    }
}

function checkSub1Criterion1(){
    const xpath = `//form//input[@type="text"]`;
    if (getXPathResult(xpath) < 1)
        return "Нет текстовых полей"
}

function checkSub2Criterion1(){
    const xpath = `//form//input[@type="password"]`;
    if (getXPathResult(xpath) < 1)
        return "Нет поля для ввода пароля"
}

function checkSub3Criterion1(){
    const xpath = `//form//textarea`;
    if (getXPathResult(xpath) < 1)
        return "Нет поля для ввода нескольких строк"
}

function checkSub4Criterion1(){
    const xpath = `//form//input[@type="number"]`;
    if (getXPathResult(xpath) < 1)
        return "Нет поля для ввода числа"
}

function checkSub5Criterion1(){
    const xpath = `//form//input[@type="radio" and not (@name=preceding::input[@type="radio"]/@name)]`;
    if (getXPathResult(xpath) < 2)
        return "Нет двух групп радио кнопок"
}

function checkSub6Criterion1(){
    const xpath = `//form//input[@type="checkbox"]`;
    if (getXPathResult(xpath) < 1)
        return "Нет флажков-переключателей"
}

function checkSub7Criterion1(){
    const xpath = `//form//select`;
    if (getXPathResult(xpath) < 1)
        return "Нет выпадающего списка"
}

function checkSub8Criterion1(){
    const xpath = `//form//input[@type="file"]`;
    if (getXPathResult(xpath) < 1)
        return "Нет поля для загрузки файла"
}

function checkSub9Criterion1(){
    const xpath = `//form//input[@type="submit"]|//form//button[@type="submit"]`;
    if (getXPathResult(xpath) < 1)
        return "Нет кнопки для отправки данных формы на сервер"
}

function checkSub10Criterion1(){
    const xpath = `//form//input[@type="reset"]|//form//button[@type="reset"]`;
    if (getXPathResult(xpath) < 1)
        return "Нет кнопки сброса данных"
}


function checkCriterion8(){
    const xpath = `//input[@type='text' and not(@placeholder)]`; 
    if (getXPathResult(xpath) == 0)
        return `Восьмое задание: выполнено!\n`;
    else return `Восьмое задание: не выполнено! (Отсутствует атрибут placeholder к текстовым полям)\n`;
}

function checkCriterion9(){
    const xpath = `//form//datalist`; 
    if (getXPathResult(xpath) > 0)
        return `Девятое задание: выполнено!\n`;
    else return `Девятое задание: не выполнено! (Отсутствует элемент datalist на форме)\n`;
}





