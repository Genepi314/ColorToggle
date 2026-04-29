async function toggleColors() { 
    console.log("Entered toggleColors ! ");
    
    let settings = await browser.browserSettings.overrideDocumentColors.get({});
    let currentColorState = settings.value; 
    
    console.log(`Got current color state: ${currentColorState}`);

    if (currentColorState !== "always") {
        await browser.browserSettings.overrideDocumentColors.set({ value: "always" });
    } else {
        await browser.browserSettings.overrideDocumentColors.set({ value: "never" });
    }
}

async function adaptIcon() {
    let settings = await browser.browserSettings.overrideDocumentColors.get({});
    let currentColorState = settings.value; 
    let path;

    console.log("in adaptIcon")

    if (currentColorState !== "always") {
        path = {"32": "icons/smiley-32.png"}
    }
    else {
        path = {"32": "icons/color-smiley-32.png"}
    }

    browser.browserAction.setIcon({ path });
}

adaptIcon()
browser.browserAction.onClicked.addListener(toggleColors);
browser.browserSettings.overrideDocumentColors.onChange.addListener(adaptIcon)