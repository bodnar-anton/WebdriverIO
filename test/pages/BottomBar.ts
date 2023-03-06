import page from './Page';

const summaryButton = browser.isAndroid ? '//*[@resource-id="tab-button-job-summary"]' : '//XCUIElementTypeButton[contains(@name, "Summary")]';
const detailsButton = browser.isAndroid ? '//*[@resource-id="tab-button-job-details"]' : '//XCUIElementTypeButton[contains(@name, "Details")]';
const itemsButton = browser.isAndroid ? '//*[@resource-id="tab-button-job-items"]' : '//XCUIElementTypeButton[contains(@name, "Items")]';
const signaturesButton = browser.isAndroid ? '//*[@resource-id="tab-button-job-signatures"]' : '//XCUIElementTypeButton[contains(@name, "Signatures")]';
const moreButton = browser.isAndroid ? '//*[@resource-id="tab-button-job-signatures"]/following-sibling::*[1]' : '//XCUIElementTypeButton[contains(@name, "More")]';
const moreButtonsDialog = browser.isAndroid ? '//android.app.Dialog' : '//XCUIElementTypeOther[@name="web dialog"]';
const timeEntriesButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Time entries")]' : '//XCUIElementTypeButton[contains(@name, "Time entries")]';
const checklistsButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Checklists")]' : '//XCUIElementTypeButton[contains(@name, "Checklists")]';
const filesButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Files")]' : '//XCUIElementTypeButton[contains(@name, "Files")]';

class BottomBar {
    public async clickSummaryButton(): Promise<void> {
        await page.click(summaryButton);
    }

    public async clickDetailsButton(): Promise<void> {
        await page.click(detailsButton);
    }

    public async clickItemsButton(): Promise<void> {
        await page.click(itemsButton);
    }

    public async clickSignaturesButton(): Promise<void> {
        await page.click(signaturesButton);
    }

    public async clickTimeEntriesButton(): Promise<void> {
        await page.click(moreButton);
        await page.waitUntilElementDisplayed(moreButtonsDialog);
        await page.click(timeEntriesButton);
    }

    public async clickChecklistsButton(): Promise<void> {
        await page.click(moreButton);
        await page.waitUntilElementDisplayed(moreButtonsDialog);
        await page.click(checklistsButton);
    }

    public async clickFilesButton(): Promise<void> {
        await page.click(moreButton);
        await page.waitUntilElementDisplayed(moreButtonsDialog);
        await page.click(filesButton);
    }
}

export default new BottomBar();
