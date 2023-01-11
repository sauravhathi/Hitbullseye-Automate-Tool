const ans = "AADACADCBDCBAACDABDCACBACACBAA";
const len = ans.length;

let i = 0;

const inter = setInterval(
  () => {
     document.querySelector(`#${ans[i]}_${i+1}`).click();
    document.querySelector("#main_div > div.tableWidthPercent > div.onlineTestLeftDiv > div.qnav > span.saveNextButton > a").click(); // move to next question
    i++;
    
    if(i == len){ // stop the interval when all questions are answered
      clearInterval(inter)
      document.querySelector('#activator').click();
      document.querySelector('input[name="rd"][value="Y"]').click();
      if(confirm("Are you sure you want to submit?")){
        document.querySelector('#close_confirmed').click();
      }
    }
  }
  // 2 seconds(2000 milliseconds) for each question
,2000);
