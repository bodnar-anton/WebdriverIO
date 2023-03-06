import page from './Page';
import helper from '../helper/Helper';
import Job from '../model/Job';
import dateSelectionModal from '../helper/DateSelectionModal';

const customerSelectField = browser.isAndroid ? '//android.widget.TextView[@text="Customer"]/following-sibling::android.view.View[1]/*[1]/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="Customer"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeButton[1]';
const siteSelectField = browser.isAndroid ? '//android.widget.TextView[@text="Site"]/following-sibling::android.view.View[1]/*[1]/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="Site"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeButton[1]';
const customerSelectFieldSelected = '//XCUIElementTypeStaticText[@name="Customer"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const siteSelectFieldSelected = '//XCUIElementTypeStaticText[@name="Site"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const textFields = browser.isAndroid ? '//android.widget.EditText' : '//*[self::XCUIElementTypeTextView or self::XCUIElementTypeTextField]';
const jobTypeSelectField = browser.isAndroid ? '//android.view.View[contains(@text, "Job type")]' : '//XCUIElementTypeOther[contains(@name, "Job type")]';
const selectStartDateButton = browser.isAndroid ? '//android.widget.TextView[@text="Start date"]/following-sibling::android.view.View/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="Start date"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]//XCUIElementTypeStaticText';
const selectEndDateButton = browser.isAndroid ? '//android.widget.TextView[@text="End date"]/following-sibling::android.view.View/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="End date"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]//XCUIElementTypeStaticText';
const allDaySwitch = browser.isAndroid ? '//android.widget.ToggleButton//android.widget.ToggleButton[@text="All day"]' : '//*[@name="All day"]';
const selectStartTimeButton = browser.isAndroid ? '//android.widget.TextView[@text="Start time"]/following-sibling::android.view.View/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="Start time"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]//XCUIElementTypeStaticText';
const selectEndTimeButton = browser.isAndroid ? '//android.widget.TextView[@text="End time"]/following-sibling::android.view.View/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="End time"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]//XCUIElementTypeStaticText';
const customersList = browser.isAndroid ? '//android.widget.Button[contains(@text, "radio button off") or contains(@text, "checkmark circle")]' : '//XCUIElementTypeButton[contains(@name, "radio button") or contains(@name, "checkmark circle")]';
const sitesList = browser.isAndroid ? '//android.widget.Button[contains(@text, "radio button off") or contains(@text, "checkmark circle")]' : '//XCUIElementTypeButton[contains(@name, "radio button") or contains(@name, "checkmark circle")]';
const jobTypesList = browser.isAndroid ? '//android.widget.RadioButton/android.widget.RadioButton[@checked="false"]' : '//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[@value="0"]';
const saveButton = browser.isAndroid ? '//android.widget.Button[@text="Save"]' : '//XCUIElementTypeButton[@name="Save"]';
const savedSuccessfullyModal = browser.isAndroid ? '//android.widget.TextView[@text="Saved successfully"]' : '//XCUIElementTypeStaticText[@name="Saved successfully"]';
const okButton = browser.isAndroid ? '//android.widget.Button[@text="OK"]' : '//XCUIElementTypeButton[@name="OK"]';

class AddJobPage {
    public async scrollPageToTop(): Promise<void> {
        await page.scrollUp();
    }

    public async scrollPageToBottom(): Promise<void> {
        await page.scrollDown();
    }

    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(jobTypeSelectField);
    }

    public async isCustomerSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(customerSelectField);
    }

    public async isSiteSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(siteSelectField);
    }

    public async isJobNameInputFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(await page.getElementByIndex(textFields, 0));
    }

    public async isJobTypeSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(jobTypeSelectField);
    }

    public async isWorkToBeDoneInputFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(await page.getElementByIndex(textFields, 1));
    }

    public async isSelectStartDateButtonDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(selectStartDateButton);
    }

    public async isSelectEndDateButtonDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(selectEndDateButton);
    }

    public async isAllDaySwitchDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(allDaySwitch);
    }

    public async isSelectStartTimeButtonDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(selectStartTimeButton);
    }

    public async isSelectEndTimeButtonDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(selectEndTimeButton);
    }

    public async selectRandomCustomer(job: Job): Promise<void> {
        await page.click(customerSelectField);
        await page.waitUntilElementDisplayed(customersList);
        const customers = await page.getAllElements(customersList);
        const randomNumber = helper.getRandomNumber(0, customers.length - 1);
        await page.clickElementByIndex(customersList, randomNumber);
        await this.waitUntilPageIsOpened();
        job.customer = browser.isAndroid ? await page.getText(customerSelectField) : await (await page.getElement(customerSelectFieldSelected)).getText();
    }

    public async isCustomerSelected(customer: string): Promise<boolean> {
        return (browser.isAndroid ? await page.getText(customerSelectField) : await (await page.getElement(customerSelectFieldSelected)).getText()) === customer;
    }

    public async selectRandomSite(job: Job): Promise<void> {
        await page.click(siteSelectField);
        await page.waitUntilElementDisplayed(sitesList);
        const sites = await page.getAllElements(sitesList);
        const randomNumber = helper.getRandomNumber(0, sites.length - 1);
        await page.clickElementByIndex(sitesList, randomNumber);
        await this.waitUntilPageIsOpened();
        job.site = browser.isAndroid ? await page.getText(siteSelectField) : await (await page.getElement(siteSelectFieldSelected)).getText();
    }

    public async isSiteSelected(site: string): Promise<boolean> {
        return (browser.isAndroid ? await page.getText(siteSelectField) : await (await page.getElement(siteSelectFieldSelected)).getText()) === site;
    }

    public async enterRandomJobName(job: Job): Promise<void> {
        const randomString = helper.generateRandomString();
        await page.setValue(await page.getElementByIndex(textFields, 0), randomString);
        job.name = randomString;
    }

    public async isJobNameEntered(jobName: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(textFields, 0))) === jobName;
    }

    public async selectRandomJobType(job: Job): Promise<void> {
        await page.click(jobTypeSelectField);
        await page.waitUntilElementDisplayed(jobTypesList)
        const jobTypes = await page.getAllElements(jobTypesList);
        const randomNumber = helper.getRandomNumber(0, jobTypes.length - 1);
        await page.clickElementByIndex(jobTypesList, randomNumber);
        await this.waitUntilPageIsOpened();
        job.type = (await page.getText(jobTypeSelectField)).split(',')[0].trim();
    }

    public async isJobTypeSelected(jobType: string): Promise<boolean> {
        return (await page.getText(jobTypeSelectField)).includes(jobType);
    }

    public async enterRandomWorkToBeDone(job: Job): Promise<void> {
        const randomString = helper.generateRandomString();
        await page.setValue(await page.getElementByIndex(textFields, 1), randomString);
        job.workToBeDone = randomString;
    }

    public async isWorkToBeDoneEntered(workToBeDone: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(textFields, 1))) === workToBeDone;
    }

    public async getStartDate(): Promise<string> {
        return page.getText(selectStartDateButton);
    }

    public async getEndDate(): Promise<string> {
        return page.getText(selectEndDateButton);
    }

    public async isStartDateSelected(date: string): Promise<boolean> {
        return (await this.getStartDate()) === date;
    }

    public async isEndDateSelected(date: string): Promise<boolean> {
        return (await this.getEndDate()) === date;
    }

    public async selectStartDateInPast(job: Job, currentDate: string): Promise<void> {
        await page.click(selectStartDateButton);
        await dateSelectionModal.waitUntilModalIsDisplayed();
        job.startDate = await dateSelectionModal.selectDate2DaysBeforeToday(currentDate);
        await dateSelectionModal.clickDoneButton();
        await dateSelectionModal.waitUntilModalIsNotDisplayed()
    }

    public async selectStartDateInFuture(job: Job, currentDate: string): Promise<void> {
        await page.click(selectStartDateButton);
        await dateSelectionModal.waitUntilModalIsDisplayed();
        job.startDate = await dateSelectionModal.selectTomorrowDate(currentDate);
        await dateSelectionModal.clickDoneButton();
        await dateSelectionModal.waitUntilModalIsNotDisplayed();
    }

    public async selectEndDateInFuture(job: Job, currentDate: string): Promise<void> {
        await page.click(selectEndDateButton);
        await dateSelectionModal.waitUntilModalIsDisplayed();
        job.endDate = await dateSelectionModal.selectDate2DaysAfterToday(currentDate);
        await dateSelectionModal.clickDoneButton();
        await dateSelectionModal.waitUntilModalIsNotDisplayed();
    }

    public async selectEndDateInPast(job: Job, currentDate: string): Promise<void> {
        await page.click(selectEndDateButton);
        await dateSelectionModal.waitUntilModalIsDisplayed();
        job.endDate = await dateSelectionModal.selectYesterdayDate(currentDate);
        await dateSelectionModal.clickDoneButton();
        await dateSelectionModal.waitUntilModalIsNotDisplayed();
    }

    public async enableAllDaySwitch(): Promise<void> {
        await page.click(allDaySwitch);
    }

    public async isAllDaySwitched(): Promise<boolean> {
        const attr = browser.isAndroid ? 'checked' : 'value';
        const enabledValue = browser.isAndroid ? 'true' : '1';

        return (await page.getElementAttribute(allDaySwitch, attr)) === enabledValue;
    }

    public async clickSaveButton(): Promise<void> {
        await page.click(saveButton);
    }

    public async waitUntilSavedSuccessfullyModalIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(savedSuccessfullyModal);
    }

    public async isSavedSuccessfullyModalDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(savedSuccessfullyModal);
    }

    public async clickOkButton(): Promise<void> {
        await page.click(okButton);
    }
}

export default new AddJobPage();
