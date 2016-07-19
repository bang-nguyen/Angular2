
var path = {
    imageRoot: "../images",
    htmlRoot: "../html",
    jsRoot: "../js",
    cssRoot: "../css"
}

document.querySelector('#go-to-options').addEventListener("click", function () {
    if (chrome.runtime.openOptionsPage) {
        // New way to open options pages, if supported (Chrome 42+).
        chrome.runtime.openOptionsPage();
    } else {
        // Reasonable fallback.
        window.open(chrome.runtime.getURL(`${path.htmlRoot}/options.html`));
    }
});


document.querySelector('#show-notifications').addEventListener('click', function () {
    chrome.notifications.create("not-1", {
        iconUrl: "../images/48.png",
        type: "basic",
        title: "Title of Msg",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor, mi ac sodales tempor, leo ante tincidunt quam, sit amet ultricies nibh purus a ipsum. Donec hendrerit justo ex, id mattis dui sollicitudin ac. Nullam elementum dui et urna placerat pellentesque. Pellentesque justo lectus, malesuada eget bibendum nec, iaculis vitae felis. Proin tempor aliquam metus, a iaculis ante feugiat ut. Nam elementum, metus sit amet feugiat cursus, est sem imperdiet lectus, et congue leo elit vel quam. Sed id venenatis ante. Nullam mauris justo, fringilla in sapien a, imperdiet euismod velit. Praesent ultrices rhoncus lorem in tincidunt. Nunc commodo ipsum vulputate, interdum purus eget, placerat justo.",
        buttons: [
            { title: "Open", iconUrl: `${path.imageRoot}/48.png` },
            { title: "Cancel", iconUrl: `${path.imageRoot}/48.png` }
        ]
    }, function () {
        //console.log("Click on notifications");
    })
})