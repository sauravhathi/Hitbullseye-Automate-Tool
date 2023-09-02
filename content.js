console.log('👨‍💻 Author: Saurav Hathi \n🌟 GitHub: https://github.com/sauravhathi \n🚀Linkedin: https://www.linkedin.com/in/sauravhathi');

let inter = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "start") {
        if (Object.keys(request.answer_key).length === 0) {
            toast("Please enter the answer key", "error");
            return;
        }

        attempt(request.answer_key, request.time);
    } else if (request.message === "stop") {
        stopAttempt();
    }
});

const attempt = (ans_key, time) => {
    const ans = ans_key;
    const len = ans.length;
    let i = 0;

    toast("Started attempting the test");
    function attemptQuestion() {
        document.querySelector(`#${ans[i]}_${i + 1}`).click();
        document.querySelector("#main_div > div.tableWidthPercent > div.onlineTestLeftDiv > div.qnav > span.saveNextButton > a").click();
        i++;

        if (i === len) {
            toast("Finished attempting the test");
            clearInterval(inter);
            document.querySelector('#activator').click();
            document.querySelector('input[name="rd"][value="Y"]').click();
        }
    }

    inter = setInterval(attemptQuestion, time * 1000 || 1500);
}

function stopAttempt() {
    if (inter) {
        clearInterval(inter);
        toast("Stopped attempting the test");
    }
}

function toast(message, type = "success") {
    const div = document.createElement("div");
    div.id = "toast";
    const text = document.createTextNode(message);
    div.appendChild(text);
    const styleList = [
        'background-color: ' + (type === 'success' ? '#350054' : '#ff0000'),
        'color: ' + (type === 'success' ? '#fff' : '#fff'),
    ];
    div.style.cssText = styleList.join(";");
    document.body.appendChild(div);
    setTimeout(() => {
        div.style.opacity = "1";
        div.style.transform = "translateY(0)";
    }, 1);
    setTimeout(() => {
        div.style.opacity = "0";
        div.style.transform = "translateY(-100%)";
        setTimeout(() => {
            document.body.removeChild(div);
        }, 500);
    }, 2000);
}