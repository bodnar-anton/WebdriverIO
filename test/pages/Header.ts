import page from './Page';

const menuButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "menu outline")]' : '//XCUIElementTypeButton[@name="menu outline"]';
const backButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "back")]' : '//XCUIElementTypeButton[@name="Back"]';
const closeButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Close")]' : '//XCUIElementTypeButton[@name="Close"]';

class Header {
    public async clickMenuButton(): Promise<void> {
        await page.click(menuButton);
    }

    public async clickBackButton(): Promise<void> {
        await page.click(backButton);
    }

    public async clickCloseButton(): Promise<void> {
        await page.click(closeButton);
    }
}

export default new Header();
