document.querySelector('#go-to-options').addEventListener("click", function () {
    if (chrome.runtime.openOptionsPage) {
        // New way to open options pages, if supported (Chrome 42+).
        chrome.runtime.openOptionsPage();
    } else {
        // Reasonable fallback.
        window.open(chrome.runtime.getURL('options.html'));
    }
});


document.querySelector('#show-notifications').addEventListener('click', function () {
    chrome.notifications.create("not-1", {
        iconUrl: "images/48.png",
        type: "basic",
        title: "Title of Msg",
        message: "Message",
        buttons: [
            { title: "open", iconUrl: "images/48.png" },
            { title: "cancel", iconUrl: "images/48.png" }
        ]
    }, function () {
        //console.log("Click on notifications");
    })
})