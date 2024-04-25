window.addEventListener('DOMContentLoaded', function() {

    chrome.runtime.sendMessage({ action: "getLabId"});

    document.getElementById("check").addEventListener("click", function() {
        const select = document.getElementById("selectScript");
        const selectedValues = select.options[select.selectedIndex].value.split('_');
        const id = selectedValues[0];
        const labModule = selectedValues[1];
        const selectVariant = document.getElementById("selectVariant");
        
        //для варианта (пока не сделано)
        if (selectVariant.style.display == "block"){
            const selectedVariant = selectVariant.options[selectVariant.selectedIndex].value
            chrome.runtime.sendMessage({ action: "getCriterionById", id: selectedVariant });
        }

        chrome.runtime.sendMessage({ action: "executeScript", id: id, labModule: labModule});
    });

    //пока не сделано
    document.getElementById("addVariant").addEventListener("click", function() {
        const select = document.getElementById("selectScript");
        const selectedValues = select.options[select.selectedIndex].value;
        chrome.runtime.sendMessage({ action: "getCriteriaFromServer", param: selectedValues });
    });
});

//динамическое создание вариантов для селекта
window.addEventListener('DOMContentLoaded', function() {

    const selectElement = document.getElementById('selectScript');
    const directories = ['HTML', 'CSS', 'JS'];

    // FileSystem API для доступа к директориям расширения
    chrome.runtime.getPackageDirectoryEntry((root) => {
        directories.forEach((dirPath) => {
            root.getDirectory(`tests/${dirPath}`, {}, (dir) => {
                const optgroup = document.createElement('optgroup');
                optgroup.label = dirPath;
                const reader = dir.createReader();
                reader.readEntries((files) => {
                    files.forEach((file) => {
                        if (file.isFile) {
                            const fileName = file.name;
                            const labNumberMatch = fileName.match(/\d+/);
                            if (labNumberMatch) {
                                const labNumber = labNumberMatch[0];
                                const option = document.createElement('option');
                                option.value = `${labNumber}_${dirPath}`;
                                option.textContent = `lab${labNumber}`;
                                optgroup.appendChild(option);
                            }
                        }
                    });
                    selectElement.appendChild(optgroup);
                });
            });
        });
    });
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.action == "showLabId"){
        const errorElement = document.getElementById("error");
        const select = document.getElementById("selectScript");
        if (request.id != null & request.labModule != null ) {
            errorElement.innerHTML = "";
            select.value = `${request.id}_${request.labModule}`;
            console.log(select.value);
        } else {
            errorElement.textContent = `Нет идентификатора лабораторной работы`;
        }
    }

    if (request.action == "showResult") {
        const resultElement = document.getElementById("result");
        if (resultElement) {
            resultElement.innerHTML = "";
            request.arrayOfResults.forEach(result => {
                const paragraph = document.createElement("p");
                paragraph.textContent = `${result}`;
                resultElement.appendChild(paragraph);
            });
        }
    }

    if (request.action == "showCriteriaFromServer"){
        const criteria = request.result;
        const selectVariant = document.getElementById("selectVariant");
        selectVariant.innerHTML = "";

        criteria.forEach(criterion => {
            const option = document.createElement('option');
            option.textContent = criterion.description;
            option.value = criterion.id;
            selectVariant.appendChild(option);
        });
        
        selectVariant.style.display = "block";
    }
});
