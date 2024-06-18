async function checkCriterion1() {
    const breedsList = getXPathResult(`//*[@id = 'breeds']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (breedsList) {
        const currentURL = window.location.href;
        const baseURL = currentURL.substring(0, currentURL.lastIndexOf('/') + 1);
        const dogsURL = baseURL + 'dogs.xml';
        const catsURL = baseURL + 'cats.xml';

        async function fetchBreeds(url) {
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: url });
            if (response.success) {
                const text = response.html;
                const parser = new DOMParser();
                const xml = parser.parseFromString(text, 'application/xml');
                return Array.from(xml.getElementsByTagName('breed'));
            }
        }

        function selectAnimal(type) {
            const radioElement = getXPathResult(`//input[@name="animal" and @value="${type}"]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
            if (radioElement)
                radioElement.click();
        }

        function compareBreeds(breeds, expectedBreeds) {
            if (breeds.length !== expectedBreeds.length) {
                return false;
            }
            return breeds.every((breed, index) => 
                breed.textContent.trim() === expectedBreeds[index].getAttribute('rus') || breed.textContent.trim() === expectedBreeds[index].textContent);
        }

        selectAnimal('cats');
        await new Promise(resolve => setTimeout(resolve, 100));
        const breedsCats = Array.from(breedsList.getElementsByTagName('li'));
        const expectedBreedsCats = await fetchBreeds(catsURL);
        if (!compareBreeds(breedsCats, expectedBreedsCats))
            isCorrect = false;
        else {
            selectAnimal('dogs');
            await new Promise(resolve => setTimeout(resolve, 100));
            const breedsDogs = Array.from(breedsList.getElementsByTagName('li'));
            const expectedBreedsDogs = await fetchBreeds(dogsURL);
            if (!compareBreeds(breedsDogs, expectedBreedsDogs))
                isCorrect = false;
        }
    } 
    else isCorrect = false;
    if (!isCorrect)
        return ['задание 1 (отображение пород): не выполнено.', 'Список пород не отображается корректно.'];
    else
        return ['задание 1 (отображение пород): выполнено.', 'Процент:', 15];
}

async function checkCriterion2() {
    const breedsList = getXPathResult(`//*[@id = 'breeds']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const showElement = getXPathResult(`//*[@id = 'show']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (breedsList && showElement) {
        const currentURL = window.location.href;
        const baseURL = currentURL.substring(0, currentURL.lastIndexOf('/') + 1);

        async function fetchXML(type) {
            const xmlURL = `${baseURL}${type}.xml`;
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: xmlURL });
            if (response.success) {
                const text = response.html;
                const parser = new DOMParser();
                return parser.parseFromString(text, 'application/xml');
            }
            return null;
        }

        async function fetchBreedInfo(breedName) {
            const breedNameFormatted = breedName.toLowerCase().replace(' ', '_');
            const htmlURL = `${baseURL}breeds/${breedNameFormatted}.html`;
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: htmlURL });
            if (response.success)
                return response.html;
            return null;
        }

        function selectAnimal(type) {
            const radioElement = getXPathResult(`//input[@name="animal" and @value="${type}"]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
            if (radioElement)
                radioElement.click();
        }

        async function checkAnimal(type) {
            selectAnimal(type);
            await new Promise(resolve => setTimeout(resolve, 100));
            const firstBreedElement = breedsList.querySelector('li');
            const firstBreedNameRus = firstBreedElement ? firstBreedElement.textContent.trim() : null;

            if (!firstBreedNameRus)
                return false;
            const xmlDoc = await fetchXML(type);
            if (!xmlDoc)
                return false;

            const breeds = Array.from(xmlDoc.getElementsByTagName('breed'));
            const breed = breeds.find(b => b.getAttribute('rus') === firstBreedNameRus);
            if (!breed)
                return false;

            const breedNameEng = breed.textContent.trim();
            const breedInfoHTML = await fetchBreedInfo(breedNameEng);
            if (!breedInfoHTML)
                return false;

            const loadedHTML = showElement.innerHTML.trim();
            const parser = new DOMParser();
            const expectedHTMLDoc = parser.parseFromString(breedInfoHTML, 'text/html');
            const expectedHTML = expectedHTMLDoc.body.innerHTML.trim();
            return loadedHTML === expectedHTML;
        }
        isCorrect = await checkAnimal('cats') && await checkAnimal('dogs');
    }
    else isCorrect = false;
    if (!isCorrect)
        return ['Задание 2 (отображение информации о породе): не выполнено.', 'Информация о первой породе не отображается корректно.'];
    else
        return ['Задание 2 (отображение информации о породе): выполнено.', 'Процент:', 15];
}

async function checkCriterion3() {
    const breedsList = getXPathResult(`//*[@id = 'breeds']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const petElement = getXPathResult(`//*[@id = 'pet']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    var isCorrect = true;

    if (breedsList && petElement) {
        const currentURL = window.location.href;
        const baseURL = currentURL.substring(0, currentURL.lastIndexOf('/') + 1);

        async function fetchXML(type) {
            const xmlURL = `${baseURL}${type}.xml`;
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: xmlURL });
            if (response.success) {
                const text = response.html;
                const parser = new DOMParser();
                return parser.parseFromString(text, 'application/xml');
            }
            return null;
        }

        async function fetchBreedImage(breedName) {
            const breedNameFormatted = breedName.toLowerCase().replace(' ', '_');
            const jpgURL = `${baseURL}breeds/${breedNameFormatted}.jpg`;
            const responseJPG = await chrome.runtime.sendMessage({ action: 'fetchPage', url: jpgURL });
            if (responseJPG.success) {
                const relativeURL = new URL(jpgURL, baseURL).pathname;
                return relativeURL;
            }
            return null;
        }

        function selectAnimal(type) {
            const radioElement = getXPathResult(`//input[@name="animal" and @value="${type}"]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
            if (radioElement)
                radioElement.click();
        }

        async function checkAnimal(type) {
            selectAnimal(type);
            await new Promise(resolve => setTimeout(resolve, 100));

            const firstBreedElement = breedsList.querySelector('li');
            const firstBreedNameRus = firstBreedElement ? firstBreedElement.textContent.trim() : null;
            if (!firstBreedNameRus)
                return false;
            const xmlDoc = await fetchXML(type);
            if (!xmlDoc)
                return false;
            const breeds = Array.from(xmlDoc.getElementsByTagName('breed'));
            const breed = breeds.find(b => b.getAttribute('rus') === firstBreedNameRus);
            if (!breed)
                return false;
            const breedNameEng = breed.textContent.trim();
            const breedImageURL = await fetchBreedImage(breedNameEng);
            if (!breedImageURL)
                return false;

            var loadedImageSrc = petElement.getAttribute('src');
            if (loadedImageSrc.charAt(0) !== '/')
                loadedImageSrc = '/' + loadedImageSrc;
            return loadedImageSrc === breedImageURL;
        }
        isCorrect = await checkAnimal('cats') && await checkAnimal('dogs');
    } else {
        isCorrect = false;
    }

    if (!isCorrect)
        return ['задание 3 (отображение изображения породы): не выполнено.', 'Изображение первой породы не отображается корректно.'];
    else
        return ['задание 3 (отображение изображения породы): выполнено.', 'Процент:', 15];
}

async function checkCriterion4() {
    const breedsList = document.getElementById('breeds');
    const nextButton = document.getElementById('nextblob');
    const petElement = document.getElementById('pet');
    const showElement = document.getElementById('show');
    var isCorrect = true;

    if (breedsList && nextButton && petElement && showElement) {

        const currentURL = window.location.href;
        const baseURL = currentURL.substring(0, currentURL.lastIndexOf('/') + 1)

        async function fetchXML(type) {
            const xmlURL = `${baseURL}${type}.xml`;
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: xmlURL });
            if (response.success) {
                const text = response.html;
                const parser = new DOMParser();
                return parser.parseFromString(text, 'application/xml');
            }
            return null;
        }

        async function fetchBreedInfo(breedName) {
            const breedNameFormatted = breedName.toLowerCase().replace(' ', '_');
            const htmlURL = `${baseURL}breeds/${breedNameFormatted}.html`;
            const response = await chrome.runtime.sendMessage({ action: 'fetchPage', url: htmlURL });
            if (response.success)
                return response.html;
            return null;
        }

        async function fetchBreedImage(breedName) {
            const breedNameFormatted = breedName.toLowerCase().replace(' ', '_');
            const jpgURL = `${baseURL}breeds/${breedNameFormatted}.jpg`;
            const responseJPG = await chrome.runtime.sendMessage({ action: 'fetchPage', url: jpgURL });
            if (responseJPG.success) {
                const relativeURL = new URL(jpgURL, baseURL).pathname;
                return relativeURL;
            }
            return null;
        }

        function selectAnimal(type) {
            const radioElement = getXPathResult(`//input[@name="animal" and @value="${type}"]`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
            if (radioElement)
                radioElement.click();
        }

        async function checkAnimal(type, index) {
            await new Promise(resolve => setTimeout(resolve, 100));
            const firstBreedElement = document.getElementById('breeds').children[index];
            const firstBreedNameRus = firstBreedElement ? firstBreedElement.textContent.trim() : null;

            if (!firstBreedNameRus)
                return false;
            const xmlDoc = await fetchXML(type);
            if (!xmlDoc)
                return false;

            const breeds = Array.from(xmlDoc.getElementsByTagName('breed'));
            const breed = breeds.find(b => b.getAttribute('rus') === firstBreedNameRus);
            if (!breed)
                return false;

            const breedNameEng = breed.textContent.trim();
            const breedInfoHTML = await fetchBreedInfo(breedNameEng);
            const breedImageURL = await fetchBreedImage(breedNameEng);
            if (!breedImageURL)
                return false;
            if (!breedInfoHTML)
                return false;

            const loadedHTML = showElement.innerHTML.trim();
            const parser = new DOMParser();
            const expectedHTMLDoc = parser.parseFromString(breedInfoHTML, 'text/html');
            const expectedHTML = expectedHTMLDoc.body.innerHTML.trim();

            var loadedImageSrc = petElement.getAttribute('src');
            if (loadedImageSrc.charAt(0) !== '/')
                loadedImageSrc = '/' + loadedImageSrc;
            return loadedHTML === expectedHTML && loadedImageSrc === breedImageURL;
        }

        selectAnimal('cats');
        await new Promise(resolve => setTimeout(resolve, 100));
        for (var i = 1; i <= document.getElementById('breeds').children.length; i++) {
            nextButton.click();
            if (i === document.getElementById('breeds').children.length) {
                if (!document.getElementById('breeds').children[0].classList.contains('selected')) {
                    isCorrect = false;
                    break;
                }
                isCorrect = await checkAnimal('cats', 0);
            }
            else {
                if (!document.getElementById('breeds').children[i].classList.contains('selected')) {
                    isCorrect = false;
                    break;
                }
                isCorrect = await checkAnimal('cats', i);   
            }
            if (!isCorrect) 
                break;
        }

        if (isCorrect) {
            selectAnimal('dogs');
            await new Promise(resolve => setTimeout(resolve, 100));
            for (var i = 1; i <= document.getElementById('breeds').children.length; i++) {
                nextButton.click();
                if (i === document.getElementById('breeds').children.length) {
                    if (!document.getElementById('breeds').children[0].classList.contains('selected')) {
                        isCorrect = false;
                        break;
                    }
                    isCorrect = await checkAnimal('dogs', 0);
                }
                else {
                    if (!document.getElementById('breeds').children[i].classList.contains('selected')) {
                        isCorrect = false;
                        break;
                    }
                    isCorrect = await checkAnimal('dogs', i);   
                }
                if (!isCorrect) 
                    break;
            }
        }        
    }
    else isCorrect = false;
    if (!isCorrect)
        return ['Задание 4 (перемещение по списку пород): не выполнено.', 'Кнопка "Дальше" не работает правильно.'];
    else
        return ['Задание 4 (перемещение по списку пород): выполнено.', 'Процент:', 20];
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
    checkCriterion1,
    checkCriterion2,
    checkCriterion3,
    checkCriterion4
);