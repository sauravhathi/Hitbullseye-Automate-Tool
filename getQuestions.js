const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy to clipboard', err);
        throw err;
    }
};

const waitForPageLoad = () => {
    return new Promise((resolve, reject) => {
        const checkReadyState = () => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                setTimeout(checkReadyState, 1000);
            }
        };

        checkReadyState();
    });
};

waitForPageLoad().then(() => {
    if (window.location.href.includes("online_review/mock_clerk.php")) {
        const questions = document.querySelectorAll('table.quest');
        toast('Questions is loaded');

        const processQuestions = async () => {
            let output = '';
            for (let index = 0; index < questions.length; index++) {
                const question = questions[index];
                const questionTextElement = question.querySelector('div.singlequesimg');
                let questionText = questionTextElement ? questionTextElement.innerText.replace(/\s\s+/g, '\n').trim() : '';

                const questionImg = questionTextElement.querySelector('img');
                if (questionImg) {
                    const questionImgSrc = questionImg.getAttribute('src');
                    questionText += `\n<img src="${questionImgSrc}" alt="sauravhathi" />`;
                }

                const shortQuestionTextElement = question.querySelector('tr td.text_1 div div span');
                if (shortQuestionTextElement) {
                    questionText += `\n\n${shortQuestionTextElement.innerText}`;
                }

                const optionsElements = question.querySelectorAll('table');
                const options = [...optionsElements].map(optionElement => {
                    const optionTextElement = optionElement.querySelector('label');
                    return optionTextElement ? optionTextElement.textContent.trim() : '';
                });

                const explanationElement = question.querySelector('.explanation_div');
                let explanationContent = '';

                if (explanationElement) {
                    explanationContent = explanationElement.innerText.replace(/\s\s+/g, '\n').replace('Explanation', '<b>Explanation:</b>').trim();

                    const imgElement = explanationElement.querySelector('img');
                    if (imgElement) {
                        const imgSrc = imgElement.getAttribute('src');
                        explanationContent += `\n<img src="${imgSrc}" alt="sauravhathi" />`;
                    }
                }

                const correctAnswerElement = question.querySelector('.corect_ans p span');
                const correctAnswer = correctAnswerElement ? correctAnswerElement.textContent.trim() : '';

                output += `<b>Question ${index + 1}:</b>\n${questionText}\n\n<b>Options:</b>\n${options.map((option, optionIndex) => `${String.fromCharCode(65 + optionIndex)}. ${option}`).join('\n')}\n\n${explanationContent}\n\n<b>Correct Answer:</b> ${correctAnswer}\n\n`;
            }
            console.log(output);
            await copyToClipboard(output);
            toast('Copied all questions to clipboard');
        };
        processQuestions();
    }
});