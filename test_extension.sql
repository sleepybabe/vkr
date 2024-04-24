-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 24 2024 г., 17:18
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test_extension`
--

-- --------------------------------------------------------

--
-- Структура таблицы `criterion`
--

CREATE TABLE `criterion` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `code` varchar(500) NOT NULL,
  `comment` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `criterion`
--

INSERT INTO `criterion` (`id`, `name`, `description`, `code`, `comment`) VALUES
(4, 'h1-6 elements', 'Создайте веб-страницу, содержащую 4 заголовка разных уровней,\r\nпосле каждого заголовка добавьте абзац текста.', 'var xpath = \"\";\n    for(let i=1; i<=6; i++) {\n        xpath += `//h${i}[not(preceding::h${i})]/following-sibling::p[1]${(i<6 ? `|` : ``)}`; \n    }\n    if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 4)', 'нет 4-ех заголовков разных уровней с последующим абзацем текста'),
(5, 'title', 'Задайте заголовок страницы с помощью элемента title.', 'const xpath = `//title`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength != 1)', 'нет заголовка страницы (нет title)'),
(6, 'comment', 'Добавьте комментарий на страницу.', 'const xpath = `//comment()`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет комментария на странице'),
(7, 'abbr', 'С помощью элемента abbr добавьте аббревиатуру на страницу.', 'const xpath = `//abbr`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет abbr элемента'),
(8, 'br', 'В одном абзаце добавьте перевод строки.', 'const xpath = `//br`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет перевода строки'),
(9, 'em and strong', 'С помощью элементов логической разметки em и strong выделите\r\nотдельные словосочетания.', 'const xpath = `//em[text()][not(preceding::em)]|//strong[text()][not(preceding::strong)]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)', 'не выделены отдельные словосочетания с помощью em и strong'),
(10, 'sub and sup', 'С помощью элементов sub и sup добавьте на страницу формулу,\r\nсодержащую верхние и нижние индексы.', 'const xpath = `(//sup)[1]|(//sub)[1]`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)', 'не добавлена формула, содержащая верхние и нижние индексы с помощью элементов sub и sup'),
(11, 'special symbols', 'Добавьте на страницу специальные символы: тире, неразрывный\r\nпробел, кавычки, кавычки-елочки, знаки «меньше» и «больше» ', 'const symbols = [\' \', \'—\', \'<\', \'>\', \'“\',\'»\'];\r\n  let xpath = \"\";\r\n  for (let i=0; i < symbols.length; i++) {\r\n    xpath += `(//text()[contains(., \'${symbols[i]}\')])[1]${i<symbols.length - 1 ? \'|\' : \'\'}`;\r\n  }\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 4)', 'на странице не добавлены специальные символы: тире, неразрывный пробел, кавычки, кавычки-елочки, знаки \'меньше\' и \'больше\''),
(12, 'pre', 'Добавьте пример HTML-кода на страницу с помощью элемента pre\r\n(пример должен содержать HTML-теги).', 'const xpath = `//pre[contains(., \'<\') and contains(., \'>\')]`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет примера html-кода с pre'),
(13, 'url', 'Вставьте на страницу ссылку на любой сайт.', 'const xpath = `//a[@href]`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет ссылки на любой сайт'),
(14, 'blockquote', 'С помощью элемента blockquote добавьте цитату.', 'const xpath = `//blockquote`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет blockquote'),
(15, 'section, article, footer', 'Выполните семантическую разметку документа с помощью элементов section, article, footer. Обратите внимание, что данные элементы никак не повлияют на внешний вид страницы, они предназначены только для разбиения содержания страницы на отдельные\r\nсмысло', 'const xpath = `//section|//article|//footer`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 3)', 'нет section, article, footer'),
(16, 'meta', 'В метаданных веб-страницы установите описание страницы, список ключевых слов.', 'const xpath = `//head/meta[@name=\"description\"]|//head/meta[@name=\"keywords\"]`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)', 'в метаданных веб-страницы нет описания страницы, списка ключевых слов'),
(17, 'input text', 'Форма должна содержать следующие элементы:\r\nтекстовые поля для ввода', 'const xpath = `//form//input[@type=\"text\"]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет текстовых полей для ввода'),
(18, 'input password', 'Форма должна содержать следующие элементы:\r\nполе для ввода пароля', 'const xpath = `//form//input[@type=\"password\"]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет поля для ввода пароля'),
(19, 'textarea', 'Форма должна содержать следующие элементы:\r\nполе для ввода нескольких строк', '  const xpath = `//form//textarea`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет поля для ввода нескольких строк'),
(20, 'input number', 'Форма должна содержать следующие элементы:\r\nполе для ввода числа', '  const xpath = `//form//input[@type=\"number\"]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет поля для ввода числа'),
(21, 'input radio 2 group', 'Форма должна содержать следующие элементы:\r\nдве группы радио кнопок', '  const xpath = `//input[@type=\"radio\" and not (@name=preceding::input[@type=\"radio\"]/@name)]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)', 'нет двух групп радио кнопок'),
(22, 'input checkbox', 'Форма должна содержать следующие элементы:\r\nфлажки-переключатели', '  const xpath = `//form//input[@type=\"checkbox\"]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет флажков-переключателей'),
(23, 'select', 'Форма должна содержать следующие элементы:\r\nвыпадающий список', '  const xpath = `//form//select`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет выпадающего списка'),
(24, 'input file', 'Форма должна содержать следующие элементы:\r\nполе для загрузки файла', '  const xpath = `//form//input[@type=\"file\"]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет поля для загрузки файла'),
(25, 'submit', 'Форма должна содержать следующие элементы:\r\nкнопку для отправки данных формы на сервер', '  const xpath = `//form//input[@type=\"submit\"]|//form//button[@type=\"submit\"]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет кнопки для отправки данных формы на сервер'),
(26, 'reset', 'Форма должна содержать следующие элементы:\r\nкнопку сброса данных', '  const xpath = `//form//input[@type=\"reset\"]|//form//button[@type=\"reset\"]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет кнопки сброса данных'),
(27, 'default value', 'В нескольких элементах задайте значение по умолчанию.', '  const xpath = `//input[@value]`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'не задано значение по умолчанию'),
(28, 'label for radio buttons and checkboxes', 'Для всех элементов переключатели (радио-кнопки) и флажки создайте метки с помощью элемента label.', '  const xpath = `//input[(@type=\'radio\' or @type=\'checkbox\') and not(parent::label)]`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength > 0)', 'не для всех радио-кнопок и флажков созданы метки с помощью элемента label'),
(29, 'fieldset and legend', 'Сгруппируйте элементы переключатели (радио-кнопки) и флажки с помощью элементов fieldset и legend.', '  const xpath = `//input[(@type=\'radio\' or @type=\'checkbox\') and ancestor::fieldset and preceding::legend]`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 0)', 'переключатели и флажки не сгруппированы с помощью элементов fieldset и legend'),
(30, 'select optgroup', 'В выпадающем списке создайте не менее двух групп элементов.', '  const xpath = `//select/optgroup`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 2)', 'не создано две и больше группы элементов в выпадающем списке'),
(31, 'required', 'Для нескольких элементов установите, что они являются обязательными для заполнения.', '  const xpath = `//*[@required]`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'не было установлено для некоторых элементов, что они являются обязательными для заполнения'),
(32, 'input new', 'Поэкспериментируйте с новыми элементами HTML5, добавьте элементы input c типами color, date, datetime, email, number, range, search, url', '  const xpath = `//input[@type=\'color\'] | //input[@type=\'date\'] | \r\n    //input[@type=\'datetime\'] | //input[@type=\'email\']| //input[@type=\'number\'] | //input[@type=\'range\']\r\n    | //input[@type=\'search\']| //input[@type=\'url\']`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 8)', 'не были созданы элементы input c типами color, date, datetime, email, number, range, search, url'),
(33, 'placeholder', 'К текстовым полям примените атрибуты placeholder.', '  const xpath = `//input[@type=\'text\' and not(@placeholder)]`;\r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength != 0)', 'не был применен атрибут placeholder к текстовым полям'),
(34, 'datalist', 'Добавьте на форму элемент datalist.', '  const xpath = `//form//datalist`; \r\n  if (getXPathResult(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotLength < 1)', 'нет на форме datalist');

-- --------------------------------------------------------

--
-- Структура таблицы `lab`
--

CREATE TABLE `lab` (
  `id` int(10) NOT NULL,
  `domic_lab_id` int(10) NOT NULL,
  `module` varchar(50) NOT NULL,
  `name` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `lab`
--

INSERT INTO `lab` (`id`, `domic_lab_id`, `module`, `name`) VALUES
(1, 2, 'HTML', 'Формы'),
(2, 1, 'HTML', 'Основы HTML'),
(4, 3, 'CSS', 'dsaad'),
(13, 1, 'JS', 'sad'),
(20, 2, 'CSS', 'hgfd');

-- --------------------------------------------------------

--
-- Структура таблицы `lab_criterion`
--

CREATE TABLE `lab_criterion` (
  `id` int(10) NOT NULL,
  `lab_id` int(10) NOT NULL,
  `criterion_id` int(10) NOT NULL,
  `index_number` int(10) NOT NULL,
  `procent` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `lab_criterion`
--

INSERT INTO `lab_criterion` (`id`, `lab_id`, `criterion_id`, `index_number`, `procent`) VALUES
(40, 2, 4, 1, 2),
(41, 2, 5, 1, 1),
(42, 2, 6, 1, 1),
(43, 2, 7, 1, 1),
(44, 2, 8, 1, 1),
(45, 2, 9, 1, 1),
(46, 2, 10, 1, 1),
(47, 2, 11, 1, 1),
(48, 2, 12, 1, 1),
(49, 2, 13, 1, 1),
(50, 2, 14, 1, 1),
(51, 2, 15, 1, 1),
(52, 2, 16, 1, 1),
(121, 13, 4, 1, 50),
(123, 1, 34, 0, 0),
(124, 1, 33, 0, 0),
(125, 1, 32, 0, 0),
(126, 1, 31, 0, 0),
(127, 1, 30, 0, 0),
(128, 1, 29, 0, 0),
(129, 1, 28, 0, 0),
(130, 1, 27, 0, 0),
(131, 1, 26, 0, 0),
(132, 1, 25, 0, 0),
(133, 1, 24, 0, 0),
(134, 1, 23, 0, 0),
(135, 1, 22, 0, 0),
(136, 1, 21, 0, 0),
(137, 1, 20, 0, 0),
(138, 1, 19, 0, 0),
(139, 1, 18, 0, 0),
(140, 1, 17, 0, 0),
(159, 4, 4, 1, 50),
(161, 20, 4, 0, 100),
(192, 13, 6, 0, 50);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `criterion`
--
ALTER TABLE `criterion`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lab_criterion`
--
ALTER TABLE `lab_criterion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lab_id` (`lab_id`),
  ADD KEY `criterion_id` (`criterion_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `criterion`
--
ALTER TABLE `criterion`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT для таблицы `lab`
--
ALTER TABLE `lab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `lab_criterion`
--
ALTER TABLE `lab_criterion`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `lab_criterion`
--
ALTER TABLE `lab_criterion`
  ADD CONSTRAINT `lab_criterion_ibfk_1` FOREIGN KEY (`lab_id`) REFERENCES `lab` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lab_criterion_ibfk_2` FOREIGN KEY (`criterion_id`) REFERENCES `criterion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
