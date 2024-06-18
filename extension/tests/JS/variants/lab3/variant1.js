async function checkVariantCriterion8() {
    const textarea = getXPathResult(`//textarea`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const xpathbutton = `//button[not (contains(text(), 'Очистить')) and not (contains(text(), 'Верхний регистр'))
        and not (contains(text(), 'Сортировать')) and not (contains(text(), 'Перевернуть')) 
        and not (contains(text(), 'Добавить номера строк')) and not (contains(text(), 'Удалить пустые строки'))
         and not (contains(text(), 'Перемешать'))]`;
    const button = getXPathResult(xpathbutton, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
    const radio = getXPathResult(`//*[@type = 'radio']`, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const evenRadio  = radio.snapshotItem(0);
    const oddRadio = radio.snapshotItem(1);
    var isCorrect = false;
    
    if (textarea && evenRadio  && oddRadio) {
        const text = "пункт 1\nпункт 2\nпункт 3\nпункт 4\n   \nпункт 5\nпункт 8\n    \n   \nпункт 7";
        textarea.value = text;
        evenRadio.checked = true;
        if (button)
            button.click();
        evenRadio.click();
        if (textarea.value === "пункт 1\nпункт 3\n   \nпункт 8\n   \n")
            isCorrect = true;
        else isCorrect = false;
        textarea.value = text;
        oddRadio.checked = true;
        if (button)
            button.click();
        oddRadio.click();
        const res = "пункт 2\nпункт 4\nпункт 5\n    \nпункт 7"
        if (textarea.value.trim() === res)
            isCorrect = true;
        else isCorrect = false;
    }
    if (!isCorrect)
		return ['8 задание (Дополнительные 2 зависимые радио-кнопки (четные/нечетные)): не выполнено.', 'Радио-кнопки не удаляют четные или нечетные строки в зависимости от выбора. (-16%)']
	else
		return ['8 задание (Дополнительные 2 зависимые радио-кнопки (четные/нечетные)): выполнено.', '16', '%',]
}
