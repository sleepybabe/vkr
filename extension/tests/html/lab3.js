//классификация животных
function checkCriterion1() {
    const xpath = `//ul/li[contains(text(), '') and ul/li[contains(text(), '') and ul/li[contains(text(), '') and  ul/li[contains(text(), '') and ul/li[contains(text(), '')]] 
                            and ul/li[contains(text(), '') and ul/li[contains(text(), '')] and ul/li[contains(text(), '')]]]] 
                        and ul/li[contains(text(), '') and ul/li[contains(text(), '') and ul/li[contains(text(), '') and ul/li[contains(text(), '')] and ul/li[contains(text(), '')]]]]]`;
    
    //ul/li[contains(text(), 'Хордовые') and ul/li[contains(text(), 'Млекопитающие') and ul/li[contains(text(), 'Хищные') and  ul/li[contains(text(), 'Волчьи') and ul/li[contains(text(), 'Волк')]] 
            // and ul/li[contains(text(), 'Кошачьи') and ul/li[contains(text(), 'Рысь')] and ul/li[contains(text(), 'Кошка')]]]] 
        // and ul/li[contains(text(), 'Птицы') and ul/li[contains(text(), 'Воробьиные') and ul/li[contains(text(), 'Врановые') and ul/li[contains(text(), 'Ворона')] and ul/li[contains(text(), 'Сорока')]]]]]
    if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)
        return "1 задание: не выполнено. Ошибка: структура списка не соответствует заданию"
    else return "1 задание: выполнено;"
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
checkCriteria(checkCriterion1)