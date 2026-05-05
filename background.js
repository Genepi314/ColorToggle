const ICON_PATHS = {
    active: { "32": "icons/unicorn-32.png" },
    inactive: { "32": "icons/horse-32.png" }
};

async function toggleColors() {
    const settings = await browser.browserSettings.overrideDocumentColors.get({});
    const nextValue = (settings.value === "always") ? "never" : "always";
    
    await browser.browserSettings.overrideDocumentColors.set({ value: nextValue });
    updateIcon(nextValue)
}

function updateIcon(colorSettingsValue) {
    const path = (colorSettingsValue === "always") 
        ? ICON_PATHS.active 
        : ICON_PATHS.inactive;
    
    browser.browserAction.setIcon({ path });
}


// Init

browser.browserSettings.overrideDocumentColors.get({}).then((settings) => {
    updateIcon(settings.value);
});

// Listen to changes

browser.browserAction.onClicked.addListener(toggleColors);

browser.tabs.onActivated.addListener(async () => {
    const settings = await browser.browserSettings.overrideDocumentColors.get({});
    updateIcon(settings.value);
});

browser.windows.onFocusChanged.addListener(async () => {
    const settings = await browser.browserSettings.overrideDocumentColors.get({});
    updateIcon(settings.value);
});


