function checkCriterion1() {
    const xpath = `//li[contains(text(), "")]`;
    const result = getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const xpathData = `//a[contains(@href, "data/")]`;
    const dataResult = getXPathResult(xpathData, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var resultCheck = false;

    if (result.snapshotLength >= 3 && dataResult.snapshotLength >= 3){
        const dataSet = new Set();

        for (var i = 0; i < dataResult.snapshotLength; i++) {
            const node = dataResult.snapshotItem(i);
            dataSet.add(node.href);
        }
        resultCheck = dataSet.size === dataResult.snapshotLength;
    }
    if (!resultCheck)
        return 'задание 1: не выполнено.  В index.html отсутствует список поэтов и ссылки на веб-страницы со списком стихов, находящиеся в папке data.';
    else return 'задание 1: выполнено.';
}

async function checkCriterion2(){
    const xpath = `//a[contains(@href, "data/")]`;
    const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var isNotFound = false;
    if (result.snapshotLength > 0) {
        for (var i = 0; i < result.snapshotLength; i++) {
            const firstNode = result.snapshotItem(i);
            const url = firstNode.href;
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });

            if (response.success) {
                const html = response.html;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const filesXpath = `//a[contains(@href, "../files/")]`;
                const filesResult = document.evaluate(filesXpath, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                const indexXpath = `//a[@href = "../index.html"]`;
                const indexResult = document.evaluate(indexXpath, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (filesResult.snapshotLength === 0 || indexResult.snapshotLength === 0) {
                    isNotFound = true;
                    break;
                }
            }
        }
    }
    else isNotFound = true;
    if (isNotFound) 
        return 'задание 2: не выполнено. Ссылки на стихи и возврат на главную страницу не найдены.';
    else 
        return 'задание 2: выполнено.';
}

async function checkCriterion3(){
    const xpath = `//a[contains(@href, "data/")]`;
    const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var isNotFound = false;
    if (result.snapshotLength > 0) {
        for (var i = 0; i < result.snapshotLength; i++) {
            const firstNode = result.snapshotItem(i);
            const url = firstNode.href;
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
            if (response.success) {
                const html = response.html;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const xpathWiki = `//a[starts-with(@href, 'https://ru.wikipedia.org/')]`;
                const wikiResult = document.evaluate(xpathWiki, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (wikiResult.snapshotLength === 0) {
                    isNotFound = true;
                    break;
                }
            }
        }
    } else isNotFound = true;
    if (isNotFound) 
        return 'задание 3: не выполнено. Ссылки на википедию не найдены.';
    else 
        return 'задание 3: выполнено.';
}

async function checkCriterion4(){
    const xpath = `//a[contains(@href, "data/")]`;
    const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var isNotFound = false;
    if (result.snapshotLength > 0) {
        for (var i = 0; i < result.snapshotLength; i++) {
            const firstNode = result.snapshotItem(i);
            const url = firstNode.href;
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
            if (response.success) {
                const html = response.html;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const xpathFiles = `//a[contains(@href, 'files/')]`;
                const filesResult = document.evaluate(xpathFiles, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                
                if (filesResult.snapshotLength > 0) {
                    for (var j = 0; j < filesResult.snapshotLength; j++) {
                        const firstNodeFiles = filesResult.snapshotItem(j);
                        var urlFiles = firstNodeFiles.href;
                        const pathParts = urlFiles.split('/');
                        const filesIndex = pathParts.indexOf('files');
                        if (filesIndex > 0)
                            pathParts.splice(filesIndex, 0, 'public_html');
                        const newPath = pathParts.join('/');
                        urlFiles = newPath;
                        const response2 = await chrome.runtime.sendMessage({ action: 'fetchPage', url: urlFiles });
                        if (response2.success) {
                            const fileHtml = response2.html;
                            const tempDivFile = document.createElement('div');
                            tempDivFile.innerHTML = fileHtml;
                            const indexXpath = `//a[@href = "../index.html"]`;
                            const indexResult = document.evaluate(indexXpath, tempDivFile, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                            const dataXpath = `//a[contains(@href, "data/")]`;
                            const dataResult = document.evaluate(dataXpath, tempDivFile, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                            const poemXpath = `//a[not (@href = "../index.html") and not(contains(@href, "data/"))]`;
                            const poemResult = document.evaluate(poemXpath, tempDivFile, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                            if (indexResult.snapshotLength === 0 || dataResult.snapshotLength === 0 || poemResult.snapshotLength === 0) {
                                isNotFound = true;
                                break;
                            }
                        }
                    }
                } else isNotFound = true; 
            }
        }
    } else isNotFound = true;
            
    if (isNotFound) 
        return 'задание 4: не выполнено. ссылки на список стихов, возврат на главную страницу и ссылки на другие стихи не найдены на странице со стихом.';
    else 
        return 'задание 4: выполнено.';
}

async function checkCriterion5(){
    const xpath = `//a[not(contains(@href, "data/"))]`;
    const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var isNotFound = false;

    if (result.snapshotLength > 0) {
        for (var i = 0; i < result.snapshotLength; i++) {
            const firstNode = result.snapshotItem(i);
            const url = firstNode.href;
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
            if (response.success) {
                const html = response.html;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                var sum = 0;
                const xpathDef = `//@id`;
                const defResult = document.evaluate(xpathDef, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if(defResult.snapshotLength >= 3){
                    for (var j = 0; j < defResult.snapshotLength; j++) {
                        const id = defResult.snapshotItem(j).textContent;
                        const xpathLink = `//a[(@href = "#${id}")]`;
                        const linkResult = document.evaluate(xpathLink, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                        if (linkResult.snapshotLength > 0)
                            sum+=1;
                    }
                    if (sum < 3)
                        isNotFound = true;
                    else {
                        isNotFound = false;
                        break;
                    }
                } else isNotFound = true; 
            }
        }
    } else isNotFound = true; 
    if (isNotFound) 
        return 'задание 5: не выполнено. 3-ех или больше ссылок-якорей нет на дополнительной странице.';
    else 
        return 'задание 5: выполнено.';
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
checkCriteria(checkCriterion1, checkCriterion2, checkCriterion3, checkCriterion4, checkCriterion5)