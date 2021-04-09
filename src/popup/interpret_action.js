let startBtn = document.getElementById("startInterpretation");
let saveBtn = document.getElementById("saveURL");
let message = document.getElementById("message");
let urlInput = document.getElementById("urlInput");
let intBox = document.getElementById("interpreterSelectBox");
let intCheck = document.getElementById("interpreterCheck")
let iDesc = document.getElementById("urlInputDesc");
let iInterpTxt = document.getElementById("iAmAnInterpreter");

// i18 Translations -- Start
iDesc.innerText = chrome.i18n.getMessage("urlInputDesc");
startBtn.innerText = chrome.i18n.getMessage("startInterpretingButton");
iInterpTxt.innerText = chrome.i18n.getMessage("iAmAnInterpreter");
urlInput.setAttribute('aria-label', chrome.i18n.getMessage("inputURLAria"))
startBtn.setAttribute('aria-label', chrome.i18n.getMessage("startBtnAria"))
intBox.setAttribute('aria-label', chrome.i18n.getMessage("iAmAnInterpreterAria"))
// i18 Translations -- End

chrome.storage.sync.get("interpreterURL", ({interpreterURL}) => {
  if (!isValid(interpreterURL)){
    console.log('Invalid Google Meet URL Loaded?');
  } else {
    urlInput.value = interpreterURL;
  }
});

chrome.storage.sync.get("isInterpreter", ({isInterpreter}) => {
  if (isInterpreter == true) {
    intCheck.checked = true;
  }
});

function fixUrl(url){
  if (url.match(/^meet.google.com\/.*/i)){
    return "https://" + url;
  } 
  return url;
}

function isValid(url) {
  return url.match(/https:\/\/meet.google.com\/.*/i);
}

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  console.log('Domain: ' + new URL(tab[0].url).hostname);
});

startBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    var domainCheck = new URL(tab.url).hostname;

    if (domainCheck == "meet.google.com"){

      let url = fixUrl(document.getElementById("urlInput").value);

      if (!isValid(url)){
        message.innerText = chrome.i18n.getMessage("errorValidLink");
        message.style.color = "red";
      } else {
        chrome.storage.sync.set({"interpreterURL": url}, function() {
          
          chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['injection/injected_styles.css'],
          })

          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['injection/injected_script.js'],
          }, () => {
            window.close();
          });
        });
      }
    } else {
      message.innerText = chrome.i18n.getMessage("errorNotGoogleMeet");
      message.style.color = "red";
    }
    
    

    
});

intCheck.addEventListener('change', () => {
  console.log("Checked: " + intCheck.checked);
  if (intCheck.checked){
    chrome.storage.sync.set({"isInterpreter": true});
  } else {
    chrome.storage.sync.set({"isInterpreter": false});
  }
}); 

intBox.addEventListener('click', () => {
  intCheck.click();
});