async function checkCriterion1() {
	var xpath = "";
    for(let i=1; i<=6; i++) {
        xpath += `//h${i}[not(preceding::h${i})]/following-sibling::p[1]${(i<6 ? `|` : ``)}`; 
    }
    if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 4)
		return ['1 задание (4 заголовков разных уровней): не выполнено.', 'Нет 4-ех заголовков разных уровней с последующим абзацем текста. (-8%)']
	else
		return ['1 задание (4 заголовков разных уровней): выполнено.', '8', '%',]
}

async function checkCriterion2() {
	const xpath = `//section|//article|//footer`; 
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 3)
		return ['2 задание (элементы section, article, footer): не выполнено.', 'Нет section и/или article, и/или footer. (-8%)']
	else
		return ['2 задание (элементы section, article, footer): выполнено.', '8', '%',]
}

async function checkCriterion3() {
	const xpath = `//blockquote`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['3 задание (элемент blockquote ): не выполнено.', 'Нет blockquote (-8%)']
	else
		return ['3 задание (элемент blockquote ): выполнено.', '8', '%',]
}

async function checkCriterion4() {
	const xpath = `//a[@href]`; 
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['4 задание (элемент a): не выполнено.', 'Нет ссылки на любой сайт. (-8%)']
	else
		return ['4 задание (элемент a): выполнено.', '8', '%',]
}

async function checkCriterion5() {
	const xpath = `//pre[contains(., '<') and contains(., '>')]`; 
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['5 задание (элемент pre ): не выполнено.', 'Нет примера html-кода с pre. (-8%)']
	else
		return ['5 задание (элемент pre ): выполнено.', '8', '%',]
}

async function checkCriterion6() {
	const symbols = [' ', '—', '<', '>', '“','»'];
	let xpath = "";
	for (let i=0; i < symbols.length; i++) {
		xpath += `(//text()[contains(., '${symbols[i]}')])[1]${i<symbols.length - 1 ? '|' : ''}`;
	}
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 4)
		return ['6 задание (специальные символы): не выполнено.', 'На странице не добавлены специальные символы: тире, неразрывный пробел, кавычки, кавычки-елочки, знаки "меньше" и "больше". (-8%)']
	else
		return ['6 задание (специальные символы): выполнено.', '8', '%',]
}

async function checkCriterion7() {
	const xpath = `(//sup)[1]|(//sub)[1]`; 
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return ['7 задание (элементы sub и sup): не выполнено.', 'Не добавлена формула, содержащая верхние и нижние индексы с помощью элементов sub и sup. (-8%)']
	else
		return ['7 задание (элементы sub и sup): выполнено.', '8', '%',]
}

async function checkCriterion8() {
	const xpath = `//em[text()][not(preceding::em)]|//strong[text()][not(preceding::strong)]`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return ['8 задание (элементы em и strong): не выполнено.', 'Не выделены отдельные словосочетания с помощью em и strong. (-8%)']
	else
		return ['8 задание (элементы em и strong): выполнено.', '8', '%',]
}

async function checkCriterion9() {
	const xpath = `//br`;
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['9 задание (элемент br): не выполнено.', 'нет перевода строки (-8%)']
	else
		return ['9 задание (элемент br): выполнено.', '8', '%',]
}

async function checkCriterion10() {
	const xpath = `//abbr`; 
	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['10 задание (элемент abbr): не выполнено.', 'Нет abbr элемента. (-8%)']
	else
		return ['10 задание (элемент abbr): выполнено.', '8', '%',]
}

async function checkCriterion11() {
	const xpath = `//comment()`;
	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
		return ['11 задание (комментарий): не выполнено.', 'Нет комментария на странице. (-8%)']
	else
		return ['11 задание (комментарий): выполнено.', '8', '%',]
}

async function checkCriterion12() {
	const xpath = `//title`;
	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength != 1)
		return ['12 задание (элемент title): не выполнено.', 'Нет заголовка страницы (нет title). (-8%)']
	else
		return ['12 задание (элемент title): выполнено.', '8', '%',]
}

async function checkCriterion13() {
	const xpath = `//head/meta[@name="description"]|//head/meta[@name="keywords"]`; 
  	if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)
		return ['13 задание (метаданные страницы): не выполнено.', 'В метаданных веб-страницы нет описания страницы и/или списка ключевых слов. (-4%)']
	else
		return ['13 задание (метаданные страницы): выполнено.', '4', '%',]
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
	checkCriterion13
);