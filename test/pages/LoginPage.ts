import page from './Page';

const emailInput = browser.isAndroid ? '//*[contains(@resource-id, "__smartlook_0")]' : '//XCUIElementTypeTextField';
const passwordInput = browser.isAndroid ? '//*[contains(@resource-id, "__smartlook_1")]' : '//XCUIElementTypeSecureTextField';
const signInButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Sign In")]' : '//XCUIElementTypeButton[contains(@name, "Sign In")]';

const signInFailedError = browser.isAndroid ? '//*[contains(@text, "Sign in failed")]' : '//XCUIElementTypeStaticText[@name="Sign in failed"]';
const errorModalOkButton = browser.isAndroid ? '//*[contains(@text, "OK")]' : '//XCUIElementTypeButton[@name="OK"]';

class LoginPage {
    public async isPageOpened(): Promise<boolean> {
        return page.isElementDisplayed(signInButton);
    }

    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(signInButton);
    }

    public async clickSingInButton(): Promise<void> {
        await page.click(signInButton);
    }

    public async waitUntilSignInFailedErrorIsDisplayed(): Promise<void> {
        await page.waitUntilElementDisplayed(signInFailedError);
    }

    public async waitUntilSignInFailedErrorIsNotDisplayed(): Promise<void> {
        await page.waitUntilElementNotDisplayed(signInFailedError);
    }

    public async isSignInFailedErrorDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(signInFailedError);
    }

    public async clickErrorModalOkButton(): Promise<void> {
        await page.click(errorModalOkButton);
    }

    public async enterEmail(email: string): Promise<void> {
        await page.setValue(emailInput, email);
    }

    public async isEmailEntered(email: string): Promise<boolean> {
        return page.isValueEntered(emailInput, email);
    }

    public async enterPassword(password: string): Promise<void> {
        await page.setValue(passwordInput, password);
    }

    public async isPasswordEntered(): Promise<boolean> {
        return page.isEnteredValueNotEmpty(passwordInput);
    }
}

export default new LoginPage();
