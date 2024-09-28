async function init() {
    const toggleBtnOn = document.querySelector('#btn_on');
    const toggleBtnOff = document.querySelector('#btn_off');
    toggleBtnOff.classList.add('on');

    toggleBtnOn.addEventListener('click', async (e) => {
        e.preventDefault();
        const [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
        });
        if (!tab || !tab.url) {
            console.log('No tab or URL found');
            return;
        }
        const host = new URL(tab.url).host;
        const message = {
            type: 'setExtensionStatus',
            host,
            status: true,
        };
        await chrome.tabs.sendMessage(tab.id, message);
        await chrome.runtime.sendMessage(message);
        toggleBtnOn.classList.add('on');
        toggleBtnOff.classList.remove('on');
    });

    toggleBtnOff.addEventListener('click', async (e) => {
        e.preventDefault();
        const [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
        });
        if (!tab.url) {
            return;
        }
        const host = new URL(tab.url).host;
        const message = {
            type: 'setExtensionStatus',
            host,
            status: false,
        };
        await chrome.tabs.sendMessage(tab.id, message);
        await chrome.runtime.sendMessage(message);
        toggleBtnOn.classList.remove('on');
        toggleBtnOff.classList.add('on');
    });

    toggleBtnOn.addEventListener('mousedown', (e) => {
        toggleBtnOn.classList.add('active');
    });

    toggleBtnOn.addEventListener('mouseup', (e) => {
        toggleBtnOn.classList.remove('active');
    });

    toggleBtnOff.addEventListener('mousedown', (e) => {
        toggleBtnOff.classList.add('active');
    });

    toggleBtnOff.addEventListener('mouseup', (e) => {
        toggleBtnOff.classList.remove('active');
    });

    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });

    if (!tab.url) {
        return;
    }

    const host = new URL(tab.url).host;
    let message = {
        type: 'getExtensionStatus',
        host,
    };

    const response = await chrome.runtime.sendMessage(message);
    message = {
        type: 'setExtensionStatus',
        host,
        status: response.status,
    };
    if (response.status) {
        toggleBtnOn.classList.add('on');
        toggleBtnOff.classList.remove('on');
    } else {
        toggleBtnOn.classList.remove('on');
        toggleBtnOff.classList.add('on');
    }
    await chrome.tabs.sendMessage(tab.id, message);
    await chrome.runtime.sendMessage(message);
}

document.addEventListener('DOMContentLoaded', init);
