// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));

  sendData("http://localhost:3000/api/test", { name: "trung" });
}

var serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

var sendData = function (url, data) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    // do something to response
    console.log(this.responseText);
  };
  xhr.send(serialize(data));
}

// Create one test item for each context type.
var context = "selection";
var id = chrome.contextMenus.create({
  "title": "Add to Bubble",
  "contexts": [context],
  "onclick": genericOnClick
});

function registerCallback(registrationId) {
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    return;
  }

  // Send the registration token to your application server.
  sendRegistrationId(function (succeed) {
    // Once the registration token is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.
    if (succeed)
      chrome.storage.local.set({ registered: true });
  });
}

function sendRegistrationId(callback) {
  // Send the registration token to your application server
  // in a secure way.
}

chrome.runtime.onStartup.addListener(function () {
  chrome.storage.local.get("registered", function (result) {
    // If already registered, bail out.
    if (result["registered"])
      return;

    // Up to 100 senders are allowed.
    var senderIds = ["865956912880"];
    chrome.gcm.register(senderIds, registerCallback);
  });
});

chrome.gcm.onMessage.addListener(function (message) {
  chrome.notifications.create({
    iconUrl: "16.png",
    type: "basic",
    title: "Title of Msg",
    message: "Message",
    buttons: [
      { title: "open", iconUrl: "16.png" },
      { title: "cancel", iconUrl: "16.png" }
    ]
  }, function () {
    console.log("Click on notifications");
  })
});
