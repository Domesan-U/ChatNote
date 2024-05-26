chrome.runtime.onMessage.addListener(data => {
    const { trigger } = data;
    console.log("Inside bacgkround.js ");
  });