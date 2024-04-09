chrome.runtime.onMessage.addListener(function (message) {
    switch (message) {
        case 'on':
            activate();
            break;
        default:
            deactivate();
            break;
    }
});

/**
 * Activate the extension's event handlers.
 * @returns {void}
 */
function activate() {
    document.body.addEventListener('mousemove', logMouseMove);
}

/**
 * Deactivate the extension's event handlers.
 * @returns {void}
 */
function deactivate() {
    document.body.removeEventListener('mousemove', logMouseMove);
}

/**
 * Log the mousemove event.
 * @param {MouseEvent} e The mousemove event.
 * @returns {void}
 */
function logMouseMove(e) {
    chrome.runtime.sendMessage({
        type: 'log',
        name: 'mousemove',
        options: { x: e.clientX, y: e.clientY },
    });
}
