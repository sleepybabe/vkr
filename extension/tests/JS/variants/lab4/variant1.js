async function checkVariantCriterion9() {
    const xpathInput = `//input[@id != 'message' and @id != 'color' and @id != 'min' and @id != 'sec' and @type != 'hidden']`;
    const buttons = getXPathResult(`//button[@id != 'go' and @id != 'pause' and @id != 'stop']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const inputNumber = getXPathResult(xpathInput, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const img = getXPathResult(`//img`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = false;

    if (buttons.snapshotLength > 1 && textarea && inputNumber && img) {
        inputNumber.value = 1000;
        const delay = parseInt(inputNumber.value);
        textarea.value = `https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ23nBrmcH_iH7gCRwDkqEnWJRPYMm6OOaOew&s
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4sxR0oXi8nWl-zyom3jqI10E4ap6QLvF41Q&s
https://martinvorel.com/wp-content/uploads/2022/01/photography-print-3614-500x333.jpg`;
        const urls = textarea.value.split('\n');
        
        for (var i = 0; i < buttons.snapshotLength; i++) {
            var currentIndex = 0;
            buttons.snapshotItem(i).click();
            const isThisButton = new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    if (currentIndex >= urls.length)
                        currentIndex = 0;
                    if (img.src !== urls[currentIndex]) {
                        isCorrect = false;
                        clearInterval(intervalId, true);
                        resolve(false);
                    }
                    currentIndex++;
                }, delay);
                setTimeout(() => {
                    if (img.src !== urls[0]){
                        isCorrect = false;
                    }
                    else isCorrect = true;
                    clearInterval(intervalId, true);
                    resolve(true);
                }, delay * 5);
            });
            const resultIsThisButton = await isThisButton;
            
            if (resultIsThisButton) {
                currentIndex = 0;
                buttons.snapshotItem(i).click();
                const correctButtons = new Promise((resolve) => {
                    const intervalId = setInterval(() => {});
                    var imgsrc = null;
                    setTimeout(() => {
                        if (i === 0)
                            buttons.snapshotItem(i + 1).click();
                        else buttons.snapshotItem(i - 1).click();
                        imgsrc = img.src;
                    }, delay * 2);
                    setTimeout(() => {
                        if (imgsrc && img.src !== imgsrc){
                            isCorrect = false;
                            clearInterval(intervalId, true);
                            resolve(false);
                        }
                        else {
                            isCorrect = true;
                            clearInterval(intervalId, true);
                            resolve(true);
                        }
                    }, delay * 4);
                });
                const correctButtonsResult = await correctButtons;
                if (correctButtonsResult)
                    break;
            }
        }
    }
    if (!isCorrect)
		return ['9 задание (изменение изображений): не выполнено.', 'Изменение изображений неправильно сделано. (-12%)']
	else
		return ['9 задание (изменение изображений): выполнено.', '12', '%',]
}
