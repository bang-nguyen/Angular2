var registerToSender = function (senderId, registerCallback) {
    chrome.storage.local.get("registrationId", function (result) {
        if (result["registrationId"])
            return;

        var senderIds = [senderId];
        chrome.gcm.register(senderIds, registerCallback);
    });
}

document.querySelector("#submit-account").addEventListener("click", function () {
    registerToSender("865956912880", function (registrationId) {
        if (registrationId) {
            chrome.storage.local.set({ registrationId: registrationId });
        }
    })
})