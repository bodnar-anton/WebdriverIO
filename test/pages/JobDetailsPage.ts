import page from './Page';
import helper from '../helper/Helper';
import Job from '../model/Job';

const jobStatusSelectField = browser.isAndroid ? '//android.view.View[contains(@text, "Job status")]' : '//XCUIElementTypeOther[contains(@name, "Job status")]';
const returnVisitRequiredCheckbox = browser.isAndroid ? '//android.widget.ToggleButton/android.widget.ToggleButton[@text="Return visit required?"]' : '//*[contains(@name, "Return visit required?")]';
const textFields = browser.isAndroid ? '//android.widget.EditText' : '//XCUIElementTypeStaticText/parent::XCUIElementTypeTextView';
const jobStatusOptions = browser.isAndroid ? '//android.widget.RadioButton/android.widget.RadioButton[contains(@resource-id, "ion-rb") and @checked="false" and not(contains(@text, "Complete"))]' : '//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[not(contains(@name, "Complete")) and @value=0]';
const saveButton = browser.isAndroid ? '//android.widget.Button[@text="Save"]' : '//XCUIElementTypeButton[@name="Save"]';
const savedSuccessfullyModal = browser.isAndroid ? '//android.widget.TextView[@text="Saved successfully"]' : '//XCUIElementTypeStaticText[@name="Saved successfully"]';
const okButton = browser.isAndroid ? '//android.widget.Button[@text="OK"]' : '//XCUIElementTypeButton[@name="OK"]';
const jobCannotBeMarkedAsCompleteModal = browser.isAndroid ? '//android.widget.TextView[@text="Job cannot be marked as complete"]' : '//XCUIElementTypeStaticText[@name="Job cannot be marked as complete"]';
const addSignatureButton = browser.isAndroid ? '//android.widget.Button[@text="ADD SIGNATURE"]' : '//XCUIElementTypeButton[@name="Add signature"]';

class JobDetailsPage {
    public async waitUntilPageIsOpened(): Promise<void> {
        await page.scrollUpUntilElementDisplayed(jobStatusSelectField);
        await page.waitUntilElementDisplayed(jobStatusSelectField);
        await page.waitUntilElementDisplayed(returnVisitRequiredCheckbox);
    }

    public async isJobStatusSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(jobStatusSelectField);
    }

    public async isReturnVisitRequiredCheckboxDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(returnVisitRequiredCheckbox);
    }

    public async isActualWorkDoneTextfieldDisplayed(): Promise<boolean> {
        const actualWorkDoneTextfield = await page.getElementByIndex(textFields, 0);
        return page.isElementDisplayed(actualWorkDoneTextfield);
    }

    public async isRecommendationsTextfieldDisplayed(): Promise<boolean> {
        const recommendationTextfield = await page.getElementByIndex(textFields, 1);
        return page.isElementDisplayed(recommendationTextfield);
    }

    public async selectJobStatus(job: Job, status: string): Promise<void> {
        await page.click(jobStatusSelectField);
        await page.waitUntilElementDisplayed(jobStatusOptions);
        const statusOption = browser.isAndroid ? `//android.widget.RadioButton/android.widget.RadioButton[@text="${status}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[contains(@name, "${status}")]`;
        await page.click(statusOption);

        job.status = status;
    }

    public async selectRandomJobStatus(job: Job): Promise<void> {
        await page.click(jobStatusSelectField);
        await page.waitUntilElementsDisplayed(jobStatusOptions);
        const jobStatusOptionsElements = await page.getAllElements(jobStatusOptions);
        const randomNumber = helper.getRandomNumber(0, jobStatusOptionsElements.length - 1);
        await page.clickElementByIndex(jobStatusOptions, randomNumber);

        job.status = (await page.getText(jobStatusSelectField)).split(',')[0];
    }

    public async isJobStatusSelected(jobStatus: string): Promise<boolean> {
        return (await page.getText(jobStatusSelectField)).includes(jobStatus);
    }

    public async getReturnVisitRequiredValue(): Promise<boolean> {
        if (browser.isAndroid) {
            return (await page.getElementAttribute(returnVisitRequiredCheckbox, 'checked')) === 'true';
        } else {
            return (await page.getElementAttribute(returnVisitRequiredCheckbox, 'value')) === '1';
        }
    }

    public async changeReturnVisitRequiredValue(job: Job): Promise<void> {
        await page.click(returnVisitRequiredCheckbox);
        job.returnVisitRequired = await this.getReturnVisitRequiredValue();
    }

    public async enterRandomActualWorkDone(job: Job): Promise<void> {
        const randomString = helper.generateRandomString(15);
        await page.setValue(await page.getElementByIndex(textFields, 0), randomString);
        job.actualWorkDone = randomString;
    }

    public async isActualWorkDoneEntered(actualWorkDone: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(textFields, 0))) === actualWorkDone;
    }

    public async enterRandomRecommendations(job: Job): Promise<void> {
        const randomString = helper.generateRandomString(15);
        await page.setValue(await page.getElementByIndex(textFields, 1), randomString);
        job.recommendations = randomString;
    }

    public async isRecommendationsEntered(recommendation: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(textFields, 1))) === recommendation;
    }

    public async clickSaveButton(): Promise<void> {
        await page.click(saveButton);
    }

    public async waitUntilSuccessfullyModalIsDisplayed(): Promise<void> {
        await page.waitUntilElementDisplayed(savedSuccessfullyModal);
    }

    public async waitUntilSuccessfullyModalIsNotDisplayed(): Promise<void> {
        await page.waitUntilElementNotDisplayed(savedSuccessfullyModal);
    }

    public async isSavedSuccessfullyModalDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(savedSuccessfullyModal);
    }

    public async clickOkButton(): Promise<void> {
        await page.click(okButton);
    }

    public async waitUntilJobCannotBeMarkedAsCompleteModalIsDisplayed(): Promise<void> {
        await page.waitUntilElementDisplayed(jobCannotBeMarkedAsCompleteModal);
    }

    public async isJobCannotBeMarkedAsCompleteModalDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(jobCannotBeMarkedAsCompleteModal);
    }

    public async clickAddSignatureButton(): Promise<void> {
        await page.click(addSignatureButton);
    }
}

export default new JobDetailsPage();
