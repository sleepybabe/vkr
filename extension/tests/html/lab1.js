function checkCriterion1() {
	const xpath = `//em[text()][not(preceding::em)]|//strong[text()][not(preceding::strong)]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return "1 задание: не выполнено. Ошибка: не выделены отдельные словосочетания с помощью em и strong"
	else 
		return "1 задание: выполнено;"
}

function checkCriterion2() {
	const xpath = `//head/meta[@name="description"]|//head/meta[@name="keywords"]`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return "2 задание: не выполнено. Ошибка: в метаданных веб-страницы нет описания страницы, списка ключевых слов"
	else return "2 задание: выполнено;"
}

function checkCriterion3() {
	const xpath = `//br`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "3 задание: не выполнено. Ошибка: нет перевода строки"
	else return "3 задание: выполнено;"
}

function checkCriterion4() {
	const xpath = `//section|//article|//footer`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 3)
		return "4 задание: не выполнено. Ошибка: нет section, article, footer"
	else return "4 задание: выполнено;"
}

function checkCriterion5() {
	const xpath = `//abbr`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "5 задание: не выполнено. Ошибка: нет abbr элемента"
	else return "5 задание: выполнено;"
}

function checkCriterion6() {
	const xpath = `//comment()`;
	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "6 задание: не выполнено. Ошибка: нет комментария на странице"
	else
		return "6 задание: выполнено;"
}

function checkCriterion7() {
	const xpath = `//blockquote`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "7 задание: не выполнено. Ошибка: нет blockquote"
	else return "7 задание: выполнено;"
}

function checkCriterion8() {
	const xpath = `//title`;
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength != 1)
		return "8 задание: не выполнено. Ошибка: нет заголовка страницы (нет title)"
	else return "8 задание: выполнено;"
}

function checkCriterion9() {
	const xpath = `//a[@href]`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "9 задание: не выполнено. Ошибка: нет ссылки на любой сайт"
	else return "9 задание: выполнено;"
}

function checkCriterion10() {
	var xpath = "";
    for(let i=1; i<=6; i++) {
        xpath += `//h${i}[not(preceding::h${i})]/following-sibling::p[1]${(i<6 ? `|` : ``)}`; 
    }
    if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 4)
		return "10 задание: не выполнено. Ошибка: нет 4-ех заголовков разных уровней с последующим абзацем текста"
	else return "10 задание: выполнено;"
}

function checkCriterion11() {
	const xpath = `//pre[contains(., '<') and contains(., '>')]`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return "11 задание: не выполнено. Ошибка: нет примера html-кода с pre"
	else return "11 задание: выполнено;"
}

function checkCriterion12() {
	const symbols = [' ', '—', '<', '>', '“','»'];
  let xpath = "";
  for (let i=0; i < symbols.length; i++) {
    xpath += `(//text()[contains(., '${symbols[i]}')])[1]${i<symbols.length - 1 ? '|' : ''}`;
  }
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 4)
		return "12 задание: не выполнено. Ошибка: на странице не добавлены специальные символы: тире, неразрывный пробел, кавычки, кавычки-елочки, знаки 'меньше' и 'больше'"
	else return "12 задание: выполнено;"
}

function checkCriterion13() {
	const xpath = `(//sup)[1]|(//sub)[1]`; 
  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return "13 задание: не выполнено. Ошибка: не добавлена формула, содержащая верхние и нижние индексы с помощью элементов sub и sup"
	else return "13 задание: выполнено;"
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
checkCriteria(checkCriterion1,checkCriterion2,checkCriterion3,checkCriterion4,checkCriterion5,checkCriterion6,checkCriterion7,checkCriterion7,checkCriterion8,checkCriterion9,checkCriterion10,checkCriterion11,checkCriterion12,checkCriterion13)