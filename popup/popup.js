document.addEventListener('DOMContentLoaded', function () {
    const start = document.getElementById("start");
    const stop = document.getElementById("stop");
    const time = document.getElementById("time");
    const time_value = document.getElementById("time_value");
    time_value.innerText = time.value + "s";

    time.addEventListener("input", function () {
        time_value.innerText = time.value + "s";
    });

    start.addEventListener("click", function () {
        const ans_key = document.getElementById("test_answer_key").value.replace(/\s/g, "");

        if (ans_key == "") {
            alert("Please enter the answer key");
            return;
        }

        chTab("start", ans_key, time.value);
        start.disabled = true;
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