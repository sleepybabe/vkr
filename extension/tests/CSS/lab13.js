async function checkCriterion1() {
    const xpath = `//link[contains(@href, 'bootstrap.min.css')]`;
    const linkResult = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    if (linkResult.snapshotLength < 1)
		return ['1 задание (подключение Bootstrap): не выполнено.', 'Bootstrap не подключен. (-16%)']
	else
		return ['1 задание (подключение Bootstrap): выполнено.', '16', '%',]
}

async function checkCriterion2() {
    const xpath = `//meta[@name = 'viewport' and contains(@content, 'width=device-width') and contains(@content, 'initial-scale=1')]`;
    const linkResult = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    if (linkResult.snapshotLength < 1)
		return ['2 задание (параметры метатега viewport): не выполнено.', 'Не установлены значения параметров метатега viewport согласно требованиям Bootstrap. (-16%)']
	else
		return ['2 задание (параметры метатега viewport): выполнено.', '16', '%',]
}

async function checkCriterion3() {
    const xpath = `//link[contains(@href, 'bootstrap.min.css')]`;
    const linkResult = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const count = {
        table: 0,
        form: 0
    }
    if (linkResult.snapshotLength > 0) {
        const xpathNav = `//nav[contains(@class, 'navbar') and contains(@class, 'navbar-expand')]`;
        const navResult = getXPathResult(xpathNav, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
        if (navResult.snapshotLength > 0) {
            const xpathA = `//nav//a[contains(@href, '#') and not (starts-with(@href, 'http'))]`;
            const aResult = getXPathResult(xpathA, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
            for (var i = 0; i < aResult.snapshotLength; i++){
                const aElement = aResult.snapshotItem(i);
                const href = aElement.getAttribute('href');
                const anchor = href.split('#')[1];
                const target = document.getElementById(anchor);
                const table = target.closest('table');
                const form = target.closest('form');
                if (target.nodeName.toLowerCase() === 'table' || table)
                    count.table += 1;
                else if (target.nodeName.toLowerCase() === 'form' || form)
                    count.form += 1;
            }
        }
    } 
		return ['3 задание (меню навигации): не выполнено.', 'Не добавлено меню навигации (navbar). Ссылки-якоря не установлены. (-16%)']
	else
		return ['3 задание (меню навигации): выполнено.', '16', '%',]
}

async function checkCriterion4() {
    const xpath = `//link[contains(@href, 'bootstrap.min.css')]`;
    const linkResult = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isCorrect = false;
    if (linkResult.snapshotLength > 0) {
        const xpathAlert = `//*[contains(@class, 'alert')]`;
        const alertResult = getXPathResult(xpathAlert, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
        if (alertResult.snapshotLength > 0)
            isCorrect = true;
    }
    if (!isCorrect)
		return ['4 задание (предупреждение Bootstrap): не выполнено.', 'Не размещено предупреждение Bootstrap.Разместите хотя бы одно предупреждение Bootstrap на своей странице.  (-16%)']
	else
		return ['4 задание (предупреждение Bootstrap): выполнено.', '16', '%',]
}

async function checkCriterion5() {
    const xpath = `//link[contains(@href, 'bootstrap.min.css')]`;
    const linkResult = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isCorrect = false;
    if (linkResult.snapshotLength > 0) {
        const btn = document.querySelector(`.btn`);
        const inputText = document.querySelector(`input[type='text'].form-control`);
        const textarea = document.querySelector(`textarea.form-control`);
        const select = document.querySelector(`select[class]`);
        const checkbox = getXPathResult(`//input[@type = 'checkbox' and contains(@class, 'form-check')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
        const radio = getXPathResult(`//input[@type = 'radio' and contains(@class, 'form-check')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
        if (btn && inputText && textarea && select && checkbox && radio)
            isCorrect = true;
    }
    if (!isCorrect)
		return ['5 задание (стили для всех элементов формы): не выполнено.', 'Стили для всех элементов не заданы в форме. (-16%)']
	else
		return ['5 задание (стили для всех элементов формы): выполнено.', '16', '%',]
}

async function checkCriterion6() {
    const xpath = `//link[contains(@href, 'bootstrap.min.css')]`;
    const linkResult = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isCorrect = false;
    if (linkResult.snapshotLength > 0) {
        const inputgroup = document.querySelector(`form *.input-group`);
        const wrap = document.querySelector(`form *.flex-nowrap`) || document.querySelector(`form *.flex-wrap`);
        const checkbox = getXPathResult(`//input[@type = 'checkbox' and contains(@class, 'form-check')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
        const radio = getXPathResult(`//input[@type = 'radio' and contains(@class, 'form-check')]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
        const multiple = getXPathResult(`//form//*[@class='input-group'][count(.//input) > 1]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
        const select = document.querySelector(`select[class]`);
        if (inputgroup && wrap && multiple && select && checkbox && radio)
            isCorrect = true;
    }
    if (!isCorrect)
		return ['6 задание (стиль формы с группами ввода): не выполнено.', 'Не заданы группы ввода, обертки, дополнения флажков и радиокнопок, множественный ввод или custom select. (-16%)']
	else
		return ['6 задание (стиль формы с группами ввода): выполнено.', '16', '%',]
}

async function checkCriterion7() {
    const xpath = `//link[contains(@href, 'bootstrap.min.css')]`;
    const linkResult = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var isCorrect = false;
    if (linkResult.snapshotLength > 0) {
        const table = document.querySelector(`table.table`);
        const thead = getXPathResult(`//table/thead[@class]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
        const striped = document.querySelector(`table.table-striped`) || document.querySelector(`tbody.table-striped`);
        const hover = document.querySelector(`table.table-hover`) || document.querySelector(`tbody.table-hover`);
        if (table && thead && striped && hover)
            isCorrect = true;
    }
    if (!isCorrect)
		return ['7 задание (стиль для таблицы): не выполнено.', 'Не задан стиль для таблицы, заголовок таблицы, разные цвета для четных и нечетных строк или подсветка строк. (-4%)']
	else
		return ['7 задание (стиль для таблицы): выполнено.', '4', '%',]
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