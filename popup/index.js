(function(global) {
  let applyBtn = document.querySelector("#apply");
  let resetBtn = document.querySelector("#reset");
  applyBtn.addEventListener("click", applyClick);
  resetBtn.addEventListener("click", resetClick);
  let stepSeconds = document.querySelector("#stepSeconds");
  let stepVolume = document.querySelector("#stepVolume");

  function applyClick(e) {
    sendMessageToCurrentContentScript("addKeyupListener", {
      stepSeconds: parseInt(stepSeconds.value),
      stepVolume: parseInt(stepVolume.value)
    });
  }

  function resetClick(e) {
    sendMessageToCurrentContentScript("removeKeyupListener");
  }

  function sendMessageToCurrentContentScript(type, message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type, message });
    });
  }
})(window);
