document.addEventListener('DOMContentLoaded', function () {
    const start = document.getElementById("start");
    const stop = document.getElementById("stop");
    const time = document.getElementById("time");
    let ans_key = document.getElementById("test_answer_key");
    const time_value = document.getElementById("time_value");
    time_value.innerText = time.value + "s";

    time.addEventListener("input", function () {
        time_value.innerText = time.value + "s";
    });

    start.addEventListener("click", function () {
        let ans_key = document.getElementById("test_answer_key").value;

        chTab("start", ans_key, time.value);
        start.disabled = true;
    });

    ans_key.addEventListener("input", function () {
        ans_key.value = ans_key.value.toUpperCase().replace(/\s/g, "");
        start.disabled = false;
    });

    stop.addEventListener("click", function () {
        chTab("stop", "", 0);
        start.disabled = true;
    });
});

function chTab(msg, ans_key, time) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: msg, answer_key: ans_key, time: time });
    });
}