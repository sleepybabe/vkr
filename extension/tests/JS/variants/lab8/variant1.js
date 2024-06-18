async function checkVariantCriterion4() {
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
		return ['4 задание (перемещение по списку пород): не выполнено.', 'Кнопка "Дальше" не работает правильно. (-25%)']
	else
		return ['4 задание (перемещение по списку пород): выполнено.', '25', '%',]
}
