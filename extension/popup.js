window.addEventListener('DOMContentLoaded', function() {
    const port = chrome.runtime.connect({ name: 'popup-open' });
    createSelect();
    document.getElementById('selectScript').addEventListener('change', function() {
        const selectedValues = this.value.split('_');
        const labModule = selectedValues[1];
        const labId = selectedValues[0];
        createSelectVariant(labModule, labId);
    });
    
    getValueToExecute();
});

// динамическое создание селекта с лабораторными
function createSelect() {
    const selectElement = document.getElementById('selectScript');
    const directories = ['HTML', 'CSS', 'JS'];

    // FileSystem API для доступа к директориям расширения
    chrome.runtime.getPackageDirectoryEntry((root) => {
        directories.forEach((dirPath) => {
            root.getDirectory(`tests/${dirPath}`, {}, (dir) => {
                const optgroup = document.createElement('optgroup');
                optgroup.label = dirPath;
                const options = [];
                const reader = dir.createReader();
                reader.readEntries((files) => {
                    files.forEach((file) => {
                        if (file.isFile) {
                            const fileName = file.name;
                            const labNumberMatch = fileName.match(/\d+/);
                            if (labNumberMatch) {
                                const labNumber = parseInt(labNumberMatch[0]);
                                const option = document.createElement('option');
                                option.value = `${labNumber}_${dirPath}`;
                                option.textContent = `Лаб ${labNumber}`;
                                option.className = 'custom-select-option';
                                options.push(option);
                            }
                        }
                    });
                    options.sort((a, b) => {
                        const numA = parseInt(a.textContent.replace('Лаб ', ''));
                        const numB = parseInt(b.textContent.replace('Лаб ', ''));
                        return numA - numB;
                    });
                    options.forEach((option) => {
                        optgroup.appendChild(option);
                    });
                    selectElement.appendChild(optgroup);
                });
            });
        });

        chrome.runtime.sendMessage({ action: "getLabId" });
    });

    // проверка после создания селекта, если есть выбранная работа
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    if (selectedOption) {
        const selectedValues = selectedOption.value.split('_');
        if (selectedValues.length === 2) {
            const labModule = selectedValues[1];
            const labId = selectedValues[0];
            createSelectVariant(labModule, labId);
        }
    }
}

// динамическое создание селекта с вариантами лабораторной работы
function createSelectVariant(module, lab) {
    const selectElement = document.getElementById('selectVariant');
    selectElement.innerHTML = '';
    chrome.runtime.getPackageDirectoryEntry((root) => {
        root.getDirectory(`tests/${module}/variants/lab${lab}`, {}, (dir) => {
            const options = [];
            const reader = dir.createReader();
            reader.readEntries((files) => {
                files.forEach((file) => {
                    if (file.isFile) {
                        const fileName = file.name;
                        const numberMatch = fileName.match(/\d+/);
                        if (numberMatch) {
                            const variantNumber = parseInt(numberMatch[0]);
                            const option = document.createElement('option');
                            option.value = `variant${variantNumber}`;
                            option.textContent = `Вариант ${variantNumber}`;
                            options.push(option);
                        }
                    }
                });
                if (options.length === 0) {
                    const noOption = document.createElement('option');
                    noOption.value = '';
                    noOption.textContent = 'Нет вариантов';
                    selectElement.appendChild(noOption);
                } else {
                    options.sort((a, b) => {
                        const numA = parseInt(a.textContent.replace('Вариант ', ''));
                        const numB = parseInt(b.textContent.replace('Вариант ', ''));
                        return numA - numB;
                    });
                    options.forEach((option) => {
                        selectElement.appendChild(option);
                    });
                }
            });
        }, () => {
            const noOption = document.createElement('option');
            noOption.value = '';
            noOption.textContent = 'Нет вариантов';
            selectElement.appendChild(noOption);
        });
    });
}

// выбор значения селекта для отправки на бэкграунд для дальнейшего подключения скрипта
function getValueToExecute() {
    document.getElementById("check").addEventListener("click", function() {
        document.getElementById("check").disabled = true;
        const select = document.getElementById("selectScript");
        const selectedValues = select.options[select.selectedIndex].value.split('_');
        const id = selectedValues[0];
        const labModule = selectedValues[1];
        const selectVariant = document.getElementById("selectVariant");
        var selectedValueVariant = null;
        if ((selectVariant.options).length !== 0)
            selectedValueVariant = selectVariant.options[selectVariant.selectedIndex].value;

        chrome.runtime.sendMessage({ action: "executeScript", id: id, labModule: labModule, variant: selectedValueVariant});
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "showLabId") {
        const errorElement = document.getElementById("error");
        const select = document.getElementById("selectScript");
        if (request.id != null && request.labModule != null ) {
            errorElement.innerHTML = "";
            select.value = `${request.id}_${request.labModule}`;
        } else {
            errorElement.textContent = `Нет идентификатора лабораторной работы`;
        }
        createSelectVariant(request.labModule, request.id);
    }

    if (request.action === "showResult") {
        const resultElement = document.getElementById("result");
        var sumProcent = 0;
        var listToDomic = '<ul>\n';
        if (resultElement) {
            resultElement.innerHTML = "";
            request.arrayOfResults.forEach(result => {
                const li = document.createElement("li");
                if (result.length === 3) {
                    li.textContent = `${result[0]} ${result[1]} ${result[2]}`;
                    sumProcent += result[2];
                }
                else {
                    li.textContent = `${result[0]} ${result[1]}`;
                    listToDomic += `<li>${result[1]}</li>\n`
                }
                resultElement.appendChild(li);
                document.getElementById("check").disabled = false;
            });
            const liLast = document.createElement("li");
            liLast.textContent = `\nОбщий процент: ${sumProcent}`;
            resultElement.appendChild(liLast);
            if (listToDomic !== '<ul>\n') {
                listToDomic += '</ul>'
                chrome.runtime.sendMessage({ action: "showListToDomic", listToDomic: listToDomic});
            }
        }
    }
});