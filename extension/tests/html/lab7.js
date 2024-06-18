async function checkCriterion1() {
	const xpath = `//input[@value]`; 
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['1 задание (элементы со значением по умолчанию): не выполнено.', 'Не задано значение по умолчанию. (-5%)']
	else
		return ['1 задание (элементы со значением по умолчанию): выполнено.', '5', '%',]
}

async function checkCriterion2() {
	const xpath = `//form//input[@type="reset"]|//form//button[@type="reset"]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['2 задание (кнопка сброса данных): не выполнено.', 'Нет кнопки сброса данных. (-5%)']
	else
		return ['2 задание (кнопка сброса данных): выполнено.', '5', '%',]
}

async function checkCriterion3() {
	const xpath = `//form//datalist`; 
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['3 задание (элемент datalist): не выполнено.', 'Нет на форме datalist. (-5%)']
	else
		return ['3 задание (элемент datalist): выполнено.', '5', '%',]
}

async function checkCriterion4() {
	const xpath = `//form//input[@type="text"]`;
	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['4 задание (текстовые поля для ввода): не выполнено.', 'Нет текстовых полей для ввода. (-5%)']
	else
		return ['4 задание (текстовые поля для ввода): выполнено.', '5', '%',]
}

async function checkCriterion5() {
	const xpath = `//form//input[@type="submit"]|//form//button[@type="submit"]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['5 задание (кнопка для отправки данных формы на сервер): не выполнено.', 'Нет кнопки для отправки данных формы на сервер. (-5%)']
	else
		return ['5 задание (кнопка для отправки данных формы на сервер): выполнено.', '5', '%',]
}

async function checkCriterion6() {
	const xpath = `//input[@type='text' and not(@placeholder)]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength != 0)
		return ['6 задание (атрибут placeholder): не выполнено.', 'Не был применен атрибут placeholder к текстовым полям. (-5%)']
	else
		return ['6 задание (атрибут placeholder): выполнено.', '5', '%',]
}

async function checkCriterion7() {
	const xpath = `//form//input[@type="file"]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['7 задание (поле для загрузки файла): не выполнено.', 'Нет поля для загрузки файла. (-5%)']
	else
		return ['7 задание (поле для загрузки файла): выполнено.', '5', '%',]
}

async function checkCriterion8() {
	const xpath = `//input[@type='color'] | //input[@type='date'] | 
    //input[@type='datetime'] | //input[@type='email']| //input[@type='number'] | //input[@type='range']
    | //input[@type='search']| //input[@type='url']`; 
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 8)
		return ['8 задание (новые элементы HTML5): не выполнено.', 'Не были созданы элементы input c типами color / date / datetime / email / number / range / search / url (-15%)']
	else
		return ['8 задание (новые элементы HTML5): выполнено.', '15', '%',]
}

async function checkCriterion9() {
	const xpath = `//form//select`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['9 задание (выпадающий список): не выполнено.', 'Нет выпадающего списка. (-5%)']
	else
		return ['9 задание (выпадающий список): выполнено.', '5', '%',]
}

async function checkCriterion10() {
	const xpath = `//*[@required]`; 
	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['10 задание (обязательные для заполнения элементы): не выполнено.', 'Не было установлено для некоторых элементов, что они являются обязательными для заполнения. (-5%)']
	else
		return ['10 задание (обязательные для заполнения элементы): выполнено.', '5', '%',]
}

async function checkCriterion11() {
	const xpath = `//form//input[@type="checkbox"]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['11 задание (флажки-переключатели): не выполнено.', 'Нет флажков-переключателей. (-5%)']
	else
		return ['11 задание (флажки-переключатели): выполнено.', '5', '%',]
}

async function checkCriterion12() {
	const xpath = `//select/optgroup`; 
	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return ['12 задание (две группы элементов в выпадающем списке): не выполнено.', 'Не создано две и больше группы элементов в выпадающем списке. (-5%)']
	else
		return ['12 задание (две группы элементов в выпадающем списке): выполнено.', '5', '%',]
}

async function checkCriterion13() {
	const xpath = `//input[@type="radio" and not (@name=preceding::input[@type="radio"]/@name)]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return ['13 задание (две группы радио кнопок): не выполнено.', 'Нет двух групп радио кнопок. (-5%)']
	else
		return ['13 задание (две группы радио кнопок): выполнено.', '5', '%',]
}

async function checkCriterion14() {
	const xpath = `//input[(@type='radio' or @type='checkbox') and ancestor::fieldset and preceding::legend]`; 
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 0)
		return ['14 задание (элементы fieldset и legend): не выполнено.', 'Переключатели и флажки не сгруппированы с помощью элементов fieldset и legend. (-5%)']
	else
		return ['14 задание (элементы fieldset и legend): выполнено.', '5', '%',]
}

async function checkCriterion15() {
	const xpath = `//form//input[@type="number"]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['15 задание (поле для ввода числа): не выполнено.', 'Нет поля для ввода числа. (-5%)']
	else
		return ['15 задание (поле для ввода числа): выполнено.', '5', '%',]
}

async function checkCriterion16() {
	const xpath = `//input[(@type='radio' or @type='checkbox') and not(parent::label)]`; 
	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength > 0)
		return ['16 задание (метки label): не выполнено.', 'Не для всех радио-кнопок и флажков созданы метки с помощью элемента label. (-5%)']
	else
		return ['16 задание (метки label): выполнено.', '5', '%',]
}

async function checkCriterion17() {
	const xpath = `//form//textarea`;
	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['17 задание (поле для ввода нескольких строк): не выполнено.', 'Нет поля для ввода нескольких строк. (-5%)']
	else
		return ['17 задание (поле для ввода нескольких строк): выполнено.', '5', '%',]
}

async function checkCriterion18() {
	const xpath = `//form//input[@type="password"]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['18 задание (поле для ввода пароля): не выполнено.', 'Нет поля для ввода пароля. (-5%)']
	else
		return ['18 задание (поле для ввода пароля): выполнено.', '5', '%',]
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
	checkCriterion8,
	checkCriterion9,
	checkCriterion10,
	checkCriterion11,
	checkCriterion12,
	checkCriterion13,
	checkCriterion14,
	checkCriterion15,
	checkCriterion16,
	checkCriterion17,
	checkCriterion18
);