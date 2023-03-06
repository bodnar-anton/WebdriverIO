import page from './Page';

const logoImage = '//XCUIElementTypeImage';
const settingsButton = '//XCUIElementTypeStaticText[@name="Settings"]';
const signOutButton = '//XCUIElementTypeStaticText[@name="Sign Out"]';

class SideMenu {
    public async waitUntilMenuIsOpened(): Promise<void> {
        browser.isAndroid ? await page.pause(3000) : await page.waitUntilElementDisplayed(logoImage);
    }

    public async clickSettingsButton(): Promise<void> {
        const androidSettingsButtonPosition = {x: 400, y: 780};
        browser.isAndroid ? await browser.touchAction([{ action: 'press', x: androidSettingsButtonPosition.x, y: androidSettingsButtonPosition.y }, 'release']) : await page.click(settingsButton);
    }

    public async clickSignOutButton(): Promise<void> {
        const androidSignOutButtonPosition = {x: 400, y: 950};
        browser.isAndroid ? await browser.touchAction([{ action: 'press', x: androidSignOutButtonPosition.x, y: androidSignOutButtonPosition.y }, 'release']) : await page.click(signOutButton);
    }
}

export default new SideMenu();
