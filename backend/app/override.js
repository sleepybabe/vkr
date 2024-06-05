// расширение имеет свою отдельную среду выполнения, поэтому не имеет доступ
// к глобальным функциям веб-страницы и не может их перехватывать.
// Этот файл переопределяет функции как для страниц, так и для расширения.

if (!originaAlert)
    var originaAlert = window.alert;
if (!originalClearInterval)
    var originalClearInterval = window.clearInterval;

window.alert = function(message) {
    window.postMessage({ action: "alertMessage", message: message });
    return;
};

// нужно для того, чтобы остановить интервалы, вызванные вне контент-скриптов,
// без доступа к ID интервала.
window.clearInterval = function(intervalId, dop = false) {
    originalClearInterval(intervalId);
    if (dop) {
        for (var i = intervalId; i > 0 ; i--) {
            originalClearInterval(i);
        }
    }
};