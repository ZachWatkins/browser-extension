chrome.runtime.onMessage.addListener(function (message) {
    if (message.type !== 'setExtensionStatus') {
        return;
    }
    switch (message.status) {
        case true:
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
