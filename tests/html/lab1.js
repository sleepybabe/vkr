
function checkCriterion1(){
    var xpath = "";
    for(i=1; i<=6; i++) {
        xpath += `//h${i}[not(preceding::h${i})]/following-sibling::p[1]${(i<6 ? `|` : ``)}`; 
    }
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength == 4)
        return `Первое задание: выполнено!\n`;
    else return `Первое задание: не выполнено! (Количество заголовков разных уровней с последующим абзацем текста: ${result.snapshotLength})\n`;
}

function checkCriterion2(){
    const xpath = `//title`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength == 1)
        return `Второе задание: выполнено!\n`;
    else return `Второе задание: не выполнено! (Отсутствует элемент title)\n`;
}

function checkCriterion3(){
    const xpath = `//comment()`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength > 0)
        return `Третье задание: выполнено!\n`;
    else return `Третье задание: не выполнено! (Отсутствует комментарий)\n`;
}

function checkCriterion4(){
    const xpath = `//abbr`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength > 0)
        return `Четвертое задание: выполнено!\n`;
    else return `Четвертое задание: не выполнено! (Отсутствует элемент abbr)\n`;
}

function checkCriterion5(){
    const xpath = `//br`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength > 0)
        return `Пятое задание: выполнено!\n`;
    else return `Пятое задание: не выполнено! (Отсутствует элемент br)\n`;
}

function checkCriterion6(){
    const xpath = `//em[text()][not(preceding::em)]|//strong[text()][not(preceding::strong)]`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength == 2)
        return `Шестое задание: выполнено!\n`;
    else return `Шестое задание: не выполнено! (Отсутствуют элементы em и strong)\n`;
}

function checkCriterion7(){
    const xpath = `(//sup)[1]|(//sub)[1]`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength == 2)
        return `Седьмое задание: выполнено!\n`;
    else return `Седьмое задание: не выполнено! (Отсутствуют элементы sub и sup)\n`;
}

function checkCriterion8(){
    const symbols = [' ', '—'];
    let xpath = "count(";
    
    for (i=0; i < symbols.length; i++) {
      xpath += `(//text()[contains(., '${symbols[i]}')])[1]${i<symbols.length - 1 ? '|' : ')'}`;
    }
    console.log(xpath);
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.NUMBER_TYPE,
    );
    // console.log(result.numberValue)
    if (result.numberValue == 2)
        return `Восьмое задание: выполнено!\n`;
    else return `Восьмое задание не сделано в тестах\n`
    // else return `Восьмое задание: не выполнено! (Отсутствуют специальные символы: тире, неразрывный
    //     пробел, кавычки, кавычки-елочки, знаки 'меньше' и 'больше')\n`;
}

function checkCriterion9(){
    const xpath = `//pre[contains(., '<') and contains(., '>')]`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength >= 1)
        return `Девятое задание: выполнено!\n`;
    else return `Девятое задание: не выполнено! (Неправильный пример HTML-кода с помощью элемента pre или его отсутствие)\n`;
}

function checkCriterion10(){
    const xpath = `//a[@href]`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength >= 1)
        return `Десятое задание: выполнено!\n`;
    else return `Десятое задание: не выполнено! (Отсутствует ссылка)\n`;
}

function checkCriterion11(){
    const xpath = `//blockquote`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength >= 1)
        return `Одиннадцатое задание: выполнено!\n`;
    else return `Одиннадцатое задание: не выполнено! (Отсутствует blockquote)\n`;
}

function checkCriterion12(){
    const xpath = `//section|//article|//footer`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength == 3)
        return `Двенадцатое задание: выполнено!\n`;
    else return `Двенадцатое задание: не выполнено! (Отсутствует section, article или footer)\n`;
}

function checkCriterion13(){
    const xpath = `//head/meta[@name="description"]|//head/meta[@name="keywords"]`; 
    const evaluator = new XPathEvaluator();
    const expression = evaluator.createExpression(xpath);
    const result = expression.evaluate(
        document,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    );
    if (result.snapshotLength == 2)
        return `Тринадцатое задание: выполнено!\n`;
    else return `Тринадцатое задание: не выполнено! (Отсутствует описание страницы, список ключевых слов)\n`;
}

function checkAllCriteria() {
    var message = "";
    message += checkCriterion1();
    message += checkCriterion2();
    message += checkCriterion3();
    message += checkCriterion4();
    message += checkCriterion5();
    message += checkCriterion6();
    message += checkCriterion7();
    message += checkCriterion8();
    message += checkCriterion9();
    message += checkCriterion10();
    message += checkCriterion11();
    message += checkCriterion12();
    message += checkCriterion13();
    
    chrome.runtime.sendMessage({ action: "showResult", argument: message});
}




window.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById("button");
    const resultElement = document.getElementById("result");

    button.addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                func: checkAllCriteria,
                // args: [resultElement]
            });
        });
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "showResult") {            
            const result = request.argument;
            console.log(result)
            if (resultElement) {
                resultElement.textContent = `Результат:\n ${result}`;
            }
        }
    });
});




