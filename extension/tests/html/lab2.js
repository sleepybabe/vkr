function checkCriterion1() {
	  const xpath = `//input[@value]`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "1 задание: не выполнено. Ошибка: не задано значение по умолчанию"
	else return "1 задание: выполнено;"
}

function checkCriterion2() {
	  const xpath = `//form//textarea`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "2 задание: не выполнено. Ошибка: нет поля для ввода нескольких строк"
	else return "2 задание: выполнено;"
}

function checkCriterion3() {
	  const xpath = `//input[(@type='radio' or @type='checkbox') and not(parent::label)]`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength > 0)
		return "3 задание: не выполнено. Ошибка: не для всех радио-кнопок и флажков созданы метки с помощью элемента label"
	else return "3 задание: выполнено;"
}

function checkCriterion4() {
	  const xpath = `//form//input[@type="number"]`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "4 задание: не выполнено. Ошибка: нет поля для ввода числа"
	else return "4 задание: выполнено;"
}

function checkCriterion5() {
	  const xpath = `//input[(@type='radio' or @type='checkbox') and ancestor::fieldset and preceding::legend]`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 0)
		return "5 задание: не выполнено. Ошибка: переключатели и флажки не сгруппированы с помощью элементов fieldset и legend"
	else return "5 задание: выполнено;"
}

function checkCriterion6() {
	  const xpath = `//input[@type="radio" and not (@name=preceding::input[@type="radio"]/@name)]`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return "6 задание: не выполнено. Ошибка: нет двух групп радио кнопок"
	else return "6 задание: выполнено;"
}

function checkCriterion7() {
	  const xpath = `//select/optgroup`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return "7 задание: не выполнено. Ошибка: не создано две и больше группы элементов в выпадающем списке"
	else return "7 задание: выполнено;"
}

function checkCriterion8() {
	  const xpath = `//form//input[@type="checkbox"]`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "8 задание: не выполнено. Ошибка: нет флажков-переключателей"
	else return "8 задание: выполнено;"
}

function checkCriterion9() {
	  const xpath = `//*[@required]`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "9 задание: не выполнено. Ошибка: не было установлено для некоторых элементов, что они являются обязательными для заполнения"
	else return "9 задание: выполнено;"
}

function checkCriterion10() {
	  const xpath = `//form//select`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "10 задание: не выполнено. Ошибка: нет выпадающего списка"
	else return "10 задание: выполнено;"
}

function checkCriterion11() {
	  const xpath = `//input[@type='color'] | //input[@type='date'] | 
    //input[@type='datetime'] | //input[@type='email']| //input[@type='number'] | //input[@type='range']
    | //input[@type='search']| //input[@type='url']`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 8)
		return "11 задание: не выполнено. Ошибка: не были созданы элементы input c типами color, date, datetime, email, number, range, search, url"
	else return "11 задание: выполнено;"
}

function checkCriterion12() {
	  const xpath = `//form//input[@type="file"]`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "12 задание: не выполнено. Ошибка: нет поля для загрузки файла"
	else return "12 задание: выполнено;"
}

function checkCriterion13() {
	  const xpath = `//input[@type='text' and not(@placeholder)]`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength != 0)
		return "13 задание: не выполнено. Ошибка: не был применен атрибут placeholder к текстовым полям"
	else return "13 задание: выполнено;"
}

function checkCriterion14() {
	  const xpath = `//form//input[@type="submit"]|//form//button[@type="submit"]`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "14 задание: не выполнено. Ошибка: нет кнопки для отправки данных формы на сервер"
	else return "14 задание: выполнено;"
}

function checkCriterion15() {
	const xpath = `//form//input[@type="text"]`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "15 задание: не выполнено. Ошибка: нет текстовых полей для ввода"
	else return "15 задание: выполнено;"
}

function checkCriterion16() {
	  const xpath = `//form//datalist`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "16 задание: не выполнено. Ошибка: нет на форме datalist"
	else return "16 задание: выполнено;"
}

function checkCriterion17() {
	  const xpath = `//form//input[@type="reset"]|//form//button[@type="reset"]`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "17 задание: не выполнено. Ошибка: нет кнопки сброса данных"
	else return "17 задание: выполнено;"
}

function checkCriterion18() {
	const xpath = `//form//input[@type="password"]`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "18 задание: не выполнено. Ошибка: нет поля для ввода пароля"
	else return "18 задание: выполнено;"
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
checkCriteria(checkCriterion1,checkCriterion2,checkCriterion3,checkCriterion4,checkCriterion5,checkCriterion6,checkCriterion7,checkCriterion8,checkCriterion9,checkCriterion10,checkCriterion11,checkCriterion12,checkCriterion13,checkCriterion14,checkCriterion15,checkCriterion16,checkCriterion17,checkCriterion18)