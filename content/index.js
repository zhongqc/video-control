(function(global) {
  let videos = document.querySelectorAll("video");
  if (videos.length === 0) {
    return;
  }

  let keysMapping = {
    Space: 32,
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40
  };

  let step = {
    stepSeconds: 0,
    stepVolume: 0
  };

  chrome.extension.onMessage.addListener(function(message) {
    switch (message.type) {
      case "addKeyupListener":
        step.stepSeconds = message.message.stepSeconds;
        step.stepVolume = message.message.stepVolume;
        addKeyupListener();
        break;
      case "removeKeyupListener":
        removeKeyupListener();
        break;
      default:
        break;
    }
  });

  function addKeyupListener() {
    document.addEventListener("keyup", keyupListener);
  }

  function removeKeyupListener() {
    document.removeEventListener("keyup", keyupListener);
  }

  function keyupListener(e) {
    let currentVideo = videos[0];
    switch (e.keyCode) {
      case keysMapping.Space:
        if (currentVideo.paused) {
          currentVideo.play();
        } else {
          currentVideo.pause();
        }
        break;
      case keysMapping.ArrowLeft:
        currentVideo.currentTime -= step.stepSeconds;
        break;
      case keysMapping.ArrowRight:
        currentVideo.currentTime += step.stepSeconds;
        break;
      case keysMapping.ArrowUp:
        currentVideo.volume =
          Math.round(currentVideo.volume * 100 + stepVolume) / 100;
        break;
      case keysMapping.ArrowDown:
        currentVideo.volume =
          Math.round(currentVideo.volume * 100 - stepVolume) / 100;
        break;
      default:
        break;
    }
  }
})(window);
