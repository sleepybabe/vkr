async function checkCriterion1() {
    var tableRows = document.querySelectorAll('tr');
    var isCorrect = false;

    if (tableRows.length !== 0) {
        function hexToRgb(hex) {
            hex = hex.replace(/^#/, '');
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            return `rgb(${r}, ${g}, ${b})`;
        }
        
        for (var i = 0; i < tableRows.length; i++) {
            var cells = tableRows[i].querySelectorAll('td');
            if (cells.length === 0)
                continue;
            var rgbText = cells[0].textContent.trim();
            if (rgbText === 'RGB')
                continue;
            var hexText = cells[1].textContent.trim();
            var yiqText = cells[2].textContent.trim();
            var color = window.getComputedStyle(cells[3]).backgroundColor;

            yiqText = yiqText.replace('(', '');
            yiqText = yiqText.replace(')', '');
            var values = yiqText.split(',').map(function(item) {
                return parseFloat(item.trim());
            });
            
            var y = values[0];
            var inotindex = values[1];
            var q = values[2];
            var r = Math.round(y + 0.956 * inotindex + 0.621 * q);
            var g = Math.round(y - 0.272 * inotindex - 0.647 * q);
            var b = Math.round(y - 1.106 * inotindex + 1.703 * q);
            var rgbFromHex = hexToRgb(hexText);

            if ('rgb'+rgbText == rgbFromHex && rgbFromHex == `rgb(${r}, ${g}, ${b})` && `rgb(${r}, ${g}, ${b})` == color)
                isCorrect = true;
            else {
                isCorrect = false;
                break;
            }
        }
    }
    if (!isCorrect)
        return ['задание 1 (объект "Color"): не выполнено.', 'Выведенные цвета не одинаковые.'];
    else
        return ['задание 1 (объект "Color"): выполнено.', 'Процент:', 15];
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
checkCriteria(
    checkCriterion1
);