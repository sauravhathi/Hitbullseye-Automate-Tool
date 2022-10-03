

// chanage keys value
const keys = "CABDAAAAACDAADBABAABCAABDBABBCDABCCBCDAD";
const len = keys.length;

let i = 0;

const inter = setInterval(
  () => {
    document.querySelector(`#${keys[i]}_${i+1}`).click(); // select the correct option
    document.querySelector("#main_div > div.tableWidthPercent > div.onlineTestLeftDiv > div.qnav > span.saveNextButton > a").click(); // move to next question
    i++;
    
    if(i == len){ // stop the interval when all questions are answered
      clearInterval(inter)
      document.querySelector("#activator").click(); // submit the test
      document.querySelector(`#box > div > div > div > div > input[type=radio]:nth-child(1)`).click(); // select the reason for submit
      document.querySelector("#close_confirmed").click(); // submit the test
    }
  }
  // 2 seconds(2000 milliseconds) for each question
,2000);


## How to use

Change the keys value to your test keys and run the script in the browser console.

Note: Install Absolute Enable Right Click extension in your browser to use the script.

  1. Open the test in your browser
  2. Open the console in your browser
  3. Copy the script and paste it in the console
  4. Press enter
  5. Wait for the test to be submitted
