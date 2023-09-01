console.log('👨‍💻 Author: Saurav Hathi \n🌟 GitHub: https://github.com/sauravhathi \n🚀Linkedin: https://www.linkedin.com/in/sauravhathi');

let inter = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "start") {
        attempt(request.answer_key, request.time);
    } else if (request.message === "stop") {
        stopAttempt();
    }
});

const attempt = (ans_key, time) => {
    const ans = ans_key;
    const len = ans.length;
    let i = 0;

    function attemptQuestion() {
        document.querySelector(`#${ans[i]}_${i + 1}`).click();
        document.querySelector("#main_div > div.tableWidthPercent > div.onlineTestLeftDiv > div.qnav > span.saveNextButton > a").click();
        i++;

        if (i === len) {
            clearInterval(inter);
            document.querySelector('#activator').click();
            document.querySelector('input[name="rd"][value="Y"]').click();
            if (confirm("Are you sure you want to submit?")) {
                document.querySelector('#close_confirmed').click();
            }
        }
    }

    inter = setInterval(attemptQuestion, time * 1000 || 1500);
}

function stopAttempt() {
    if (inter) {
        clearInterval(inter);
        console.log("Stopped the attempt");
    }
}