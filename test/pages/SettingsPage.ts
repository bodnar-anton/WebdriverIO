import page from './Page';
import Settings from '../model/Settings';

const darkModeSwitch = browser.isAndroid ? '//android.widget.ToggleButton/android.widget.ToggleButton[contains(@text, "Dark mode")]' : '//XCUIElementTypeSwitch[@name="Dark mode"]';
const dyslexicModeSwitch = browser.isAndroid ? '//android.widget.ToggleButton/android.widget.ToggleButton[contains(@text, "Dyslexic mode")]' : '//XCUIElementTypeSwitch[@name="Dyslexic mode"]';
const enableSignatureRotationSwitch = browser.isAndroid ? '//android.widget.ToggleButton/android.widget.ToggleButton[contains(@text, "Enable signature rotation")]' : '//XCUIElementTypeSwitch[@name="Enable signature rotation"]';

class SettingsPage {
    public async isPageOpened(): Promise<boolean> {
        return page.isElementDisplayed(darkModeSwitch);
    }

    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(darkModeSwitch);
        await page.waitUntilElementDisplayed(dyslexicModeSwitch);
    }

    public async disableSignatureRotation(): Promise<void> {
        const attr = browser.isAndroid ? 'checked' : 'value';
        const enabledValue = browser.isAndroid ? 'true' : '1';
        const disabledValue = browser.isAndroid ? 'false' : '0';

        if ((await page.getElementAttribute(enableSignatureRotationSwitch, attr)) === enabledValue) {
            await page.click(enableSignatureRotationSwitch);
        }

        await browser.waitUntil(async () => {
            return (await page.getElementAttribute(enableSignatureRotationSwitch, attr)) === disabledValue;
        });
    }

    public async switchDarkMode(settings: Settings): Promise<void> {
        const attr = browser.isAndroid ? 'checked' : 'value';
        const enabledValue = browser.isAndroid ? 'true' : '1';
        const currentValue = (await page.getElementAttribute(darkModeSwitch, attr)) === enabledValue;
        await page.click(darkModeSwitch);

        await browser.waitUntil(async () => {
            return ((await page.getElementAttribute(darkModeSwitch, attr)) === enabledValue) === (!currentValue);
        });

        settings.darkMode = !currentValue;
    }

    public async isDarkModeSwitched(darkModeValue: boolean): Promise<boolean> {
        const attr = browser.isAndroid ? 'checked' : 'value';
        const enabledValue = browser.isAndroid ? 'true' : '1';

        return ((await page.getElementAttribute(darkModeSwitch, attr)) === enabledValue) === darkModeValue;
    }

    public async switchDyslexicMode(settings: Settings): Promise<void> {
        const attr = browser.isAndroid ? 'checked' : 'value';
        const enabledValue = browser.isAndroid ? 'true' : '1';
        const currentValue = (await page.getElementAttribute(dyslexicModeSwitch, attr)) === enabledValue;
        await page.click(dyslexicModeSwitch);

        await browser.waitUntil(async () => {
            return ((await page.getElementAttribute(dyslexicModeSwitch, attr)) === enabledValue) === (!currentValue);
        });

        settings.dyslexicMode = !currentValue;
    }

    public async isDyslexicModeSwitched(dyslexicModeValue: boolean): Promise<boolean> {
        const attr = browser.isAndroid ? 'checked' : 'value';
        const enabledValue = browser.isAndroid ? 'true' : '1';

        return ((await page.getElementAttribute(dyslexicModeSwitch, attr)) === enabledValue) === dyslexicModeValue;
    }
}

export default new SettingsPage();
