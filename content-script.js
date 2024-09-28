console.log('Content script loaded');
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Received message', request);
    if (
        request.type === 'setExtensionStatus' &&
        request.host === window.location.host
    ) {
        if (request.status === true) {
            activate();
        } else if (request.status === false) {
            deactivate();
        }
    }
});

/**
 * Activate the extension's event handlers.
 * @returns {void}
 */
function activate() {
    console.log('Activating extension');
    document.body.addEventListener('mousemove', logMouseMove);
}

/**
 * Deactivate the extension's event handlers.
 * @returns {void}
 */
function deactivate() {
    console.log('Deactivating extension');
    document.body.removeEventListener('mousemove', logMouseMove);
}

/**
 * Log the mousemove event.
 * @param {MouseEvent} e The mousemove event.
 * @returns {void}
 */
function logMouseMove(e) {
    (async () => {
        const response = await chrome.runtime.sendMessage({
            type: 'log',
            name: 'mousemove',
            options: { x: e.clientX, y: e.clientY },
        });
        // do something with response here, not outside the function
        console.log(response);
    })();
}
