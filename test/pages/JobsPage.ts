import page from './Page';
import helper from '../helper/Helper';

const jobsTitle = browser.isAndroid ? '//*[contains(@text, "Jobs")]' : '//XCUIElementTypeStaticText[@name="Jobs"]';
const filterButton = browser.isAndroid ? '//android.view.View[contains(@text, "Show jobs for")]' : '//XCUIElementTypeOther[contains(@name, "Show jobs for")]';
const locationGrantDialog = browser.isAndroid ? '//*[contains(@resource-id, "com.android.permissioncontroller:id/grant_dialog")]' : '//XCUIElementTypeStaticText[contains(@name, "to use your location?")]';
const grantLocationAccessButton = browser.isAndroid ? '//*[contains(@resource-id, "com.android.permissioncontroller:id/permission_allow_foreground_only_button")]' : '//XCUIElementTypeButton[@name="Allow While Using App"]';
const jobCards = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Ref:")]/../..' : '//XCUIElementTypeStaticText[@name="Ref:"]/..';
const synchingBar = browser.isAndroid ? '//*[contains(@text, "Synching jobs")]' : '//*[contains(@name, "Synching jobs")]';
const addNewJobButton = browser.isAndroid ? '//android.widget.Button[@text="add"]' : '//XCUIElementTypeButton[@name="add"]';
const filterOptionsPopup = browser.isAndroid ? '//android.app.Dialog' : '//XCUIElementTypeOther[@name="web dialog"]';
const allowNotificationsModal = '//XCUIElementTypeStaticText[contains(@name, "Would Like to Send You Notifications")]';
const allowNotificationsButton = '//XCUIElementTypeButton[@name="Allow"]';

class JobsPage {
    public async isPageOpened(): Promise<boolean> {
        return page.isElementDisplayed(filterButton);
    }

    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(jobCards);
    }

    public async waitUntilLocationGrantDialogIsDisplayed(): Promise<void> {
        await page.waitUntilElementDisplayed(locationGrantDialog);
    }

    public async waitUntilLocationGrantDialogIsNotDisplayed(): Promise<void> {
        await page.waitUntilElementNotDisplayed(locationGrantDialog);
    }

    public async grantLocationAccess(): Promise<void> {
        await page.click(grantLocationAccessButton);
    }

    public async clickJobsTitle(): Promise<void> {
        await page.click(jobsTitle);
    }

    public async scrollDownUntilJobIsDisplayed(jobName: string): Promise<boolean> {
        try {
            const jobCard = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${jobName}")]/..` : `//XCUIElementTypeStaticText[@name="${jobName}"]/..`;
            await page.scrollDownUntilElementDisplayed(jobCard);
        } catch (e) {
            return false;
        }
        return true;
    }

    public async scrollDownUntilOverdueJobIsDisplayed(jobName: string): Promise<boolean> {
        try {
            const overdueJobCard = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${jobName}")]/preceding-sibling::android.widget.TextView[1][@text="Overdue job"]` : `//XCUIElementTypeStaticText[@name="${jobName}"]/parent::XCUIElementTypeOther/preceding-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText[@name="Overdue job"]`;
            await page.scrollDownUntilElementDisplayed(overdueJobCard);
        } catch (e) {
            return false;
        }
        return true;
    }

    public async openTheJob(jobName: string): Promise<void> {
        const jobCard = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${jobName}")]/..` : `//XCUIElementTypeStaticText[@name="${jobName}"]/..`;
        await this.scrollDownUntilJobIsDisplayed(jobName);
        await page.click(jobCard);
    }

    public async openRandomJob(): Promise<void> {
        const jobCardsElements = await page.getAllElements(jobCards);
        const randomNumber = helper.getRandomNumber(0, jobCardsElements.length - 1);
        await page.scrollDownUntilElementDisplayed(jobCardsElements[randomNumber]);
        await page.clickElementByIndex(jobCards, randomNumber);
    }

    public async waitUntilLoadingIsFinished(): Promise<void> {
        await page.waitUntilElementNotDisplayed(synchingBar);
    }

    public async clickAddNewJobButton(): Promise<void> {
        await page.click(addNewJobButton);
    }

    public async selectTheFilter(filter: string): Promise<void> {
        await page.click(filterButton);
        await page.waitUntilElementDisplayed(filterOptionsPopup);
        const filterElement = browser.isAndroid ? `//android.app.Dialog//android.widget.Button[@text="${filter}"]` : `//XCUIElementTypeButton[@name="${filter}"]`;
        await page.click(filterElement);
        await page.waitUntilElementNotDisplayed(filterOptionsPopup);
    }

    public async isFilterSelected(filter: string): Promise<boolean> {
        return (await page.getText(filterButton)).includes(filter);
    }

    public async waitUntilAllowNotificationsModalIsDisplayed(): Promise<void> {
        await page.waitUntilElementDisplayed(allowNotificationsModal);
    }

    public async waitUntilAllowNotificationsModalIsNotDisplayed(): Promise<void> {
        await page.waitUntilElementNotDisplayed(allowNotificationsModal);
    }

    public async allowNotifications(): Promise<void> {
        await page.click(allowNotificationsButton);
    }
}

export default new JobsPage();
