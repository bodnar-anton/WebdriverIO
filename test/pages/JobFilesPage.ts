import page from './Page';

const files = browser.isAndroid ? '//android.widget.Image[contains(@text, "document outline")]/../..' : '//XCUIElementTypeImage';

class JobFilesPage {
    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementsDisplayed(files);
    }

    public async areFilesDisplayed(): Promise<boolean> {
        return page.areElementsDisplayed(files);
    }
}

export default new JobFilesPage();