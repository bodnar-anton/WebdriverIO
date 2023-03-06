import page from './Page';

const workToBeDoneLabel = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Work to be done")]' : '//XCUIElementTypeStaticText[@name="Work to be done"]';
const notesToEngineerLabel = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Notes to engineer")]' : '//XCUIElementTypeStaticText[@name="Notes to engineer"]';
const descriptionValue = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Description:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Description:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const customerValue = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Customer:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Customer:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const jobTypeValue = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Job type:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Job type:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const startDateValue = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Start:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Start:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const endDateValue = browser.isAndroid ? '//android.widget.TextView[contains(@text, "End:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="End:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const jobStatusValue = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Job status:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Job status:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const workToBeDoneValue = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Work to be done")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Work to be done"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const openMapButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Open map")]' : '//XCUIElementTypeButton[contains(@name, "Open map")]';
const directionsButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Get directions")]' : '//XCUIElementTypeButton[contains(@name, "Get directions")]';
const map = browser.isAndroid ? '//*[@resource-id="map"]' : '//XCUIElementTypeStaticText[contains(@name, "Map for job")]';

class JobSummaryPage {
    public async isPageOpened(): Promise<boolean> {
        return page.isElementDisplayed(workToBeDoneLabel);
    }

    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(workToBeDoneLabel);
        await page.waitUntilElementDisplayed(notesToEngineerLabel);
    }

    public async waitUntilPageIsNotOpened(): Promise<void> {
        await page.waitUntilElementNotDisplayed(workToBeDoneValue);
    }

    public async isJobDescriptionDisplayed(jobDescription: string): Promise<boolean> {
        return (await page.getText(descriptionValue)) === jobDescription;
    }

    public async isCustomerDisplayed(customer: string): Promise<boolean> {
        return (await page.getText(customerValue)) === customer;
    }

    public async isJobTypeDisplayed(jobType: string): Promise<boolean> {
        return (await page.getText(jobTypeValue)) === jobType;
    }

    public async isStartDateDisplayed(startDate: string): Promise<boolean> {
        return (await page.getText(startDateValue)).includes(startDate);
    }

    public async isEndDateDisplayed(endDate: string): Promise<boolean> {
        return (await page.getText(endDateValue)).includes(endDate);
    }

    public async isJobStatusDisplayed(jobStatus: string): Promise<boolean> {
        return (await page.getText(jobStatusValue)) === jobStatus;
    }

    public async isWorkToBeDoneDisplayed(workToBeDone: string): Promise<boolean> {
        return (await page.getText(workToBeDoneValue)) === workToBeDone;
    }

    public async clickOpenMapButton(): Promise<void> {
        await page.click(openMapButton);
    }

    public async clickGetDirectionsButton(): Promise<void> {
        await page.click(directionsButton);
    }

    public async waitUntilMapIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(map);
    }

    public async isMapOpened(): Promise<boolean> {
        return page.isElementDisplayed(map);
    }
}

export default new JobSummaryPage();
