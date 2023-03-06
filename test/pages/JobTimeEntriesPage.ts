import page from './Page';
import helper from '../helper/Helper';
import dateSelectionModal from '../helper/DateSelectionModal';
import TimeEntry from '../model/TimeEntry';

const addTimeEntryButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Add time entry")]' : '//XCUIElementTypeButton[contains(@name, "Add time entry")]';
const engineerSelectField = browser.isAndroid ? '//android.view.View[contains(@text, "Engineer")]' : '//XCUIElementTypeOther[contains(@name, "Engineer")]';
const typeSelectField = browser.isAndroid ? '//android.view.View[contains(@text, "Type")]' : '//XCUIElementTypeOther[contains(@name, "Type")]';
const startDateSelectField = browser.isAndroid ? '//android.view.View[contains(@text, "Start date")]/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="Start date"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]//XCUIElementTypeStaticText';
const startTimeSelectField = browser.isAndroid ? '//android.view.View[contains(@text, "Start time")]/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="Start time"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]//XCUIElementTypeStaticText';
const endDateSelectField = browser.isAndroid ? '//android.view.View[contains(@text, "End date")]/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="End date"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]//XCUIElementTypeStaticText';
const endTimeSelectField = browser.isAndroid ? '//android.view.View[contains(@text, "End time")]/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="End time"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]//XCUIElementTypeStaticText';
const selectTypeModal = browser.isAndroid ? '//android.view.View[contains(@resource-id, "overlay")]' : '//XCUIElementTypeApplication/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther';
const typeOptions = browser.isAndroid ? '//android.widget.RadioButton/android.widget.RadioButton[@checked="false"]' : '//XCUIElementTypeApplication/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[@value="0"]';
const addButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Add") or contains(@text, "Done")]' : '//XCUIElementTypeButton[@name="Add" or @name="Done"]';
const engineerValue = browser.isAndroid ? '//*[contains(@text, "Engineer:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Engineer:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const typeValue = browser.isAndroid ? '//*[contains(@text, "Type:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Type:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const startDateValue = browser.isAndroid ? '//*[contains(@text, "Start:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Start:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const endDateValue = browser.isAndroid ? '//*[contains(@text, "End:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="End:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const timeEntryCardEditButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "EDIT")]' : '//XCUIElementTypeButton[contains(@name, "Edit")]';
const timeEntryCardDeleteButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "DELETE")]' : '//XCUIElementTypeButton[contains(@name, "Delete")]';
const confirmationModal = browser.isAndroid ? '//*[contains(@text, "Delete time entry")]' : '//XCUIElementTypeStaticText[@name="Delete time entry"]';
const yesDeleteItButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "YES, DELETE IT")]' : '//XCUIElementTypeButton[@name="Yes, delete it"]';
const engineersModal = browser.isAndroid ? '//android.widget.TextView[@text="Engineers"]' : '//XCUIElementTypeStaticText[@name="Engineers"]';
const engineersList = browser.isAndroid ? '//android.widget.CheckBox' : '//XCUIElementTypeSwitch';
const checkedEngineers = browser.isAndroid ? '//android.widget.CheckBox[@checked="true"]' : '//XCUIElementTypeSwitch[@value="1"]';
const okButton = browser.isAndroid ? '//android.widget.Button[@text="OK"]' : '//XCUIElementTypeButton[@name="OK"]';
const engineersRadioButtons = browser.isAndroid ? '//android.widget.RadioButton/android.widget.RadioButton' : '//XCUIElementTypeApplication/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther';
const uncheckedEngineersRadioButtons = browser.isAndroid ? '//android.widget.RadioButton/android.widget.RadioButton[@checked="false"]' : '//XCUIElementTypeApplication/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[@value="0"]';

class JobTimeEntriesPage {
    public async isPageOpened(): Promise<boolean> {
        return page.isElementDisplayed(addTimeEntryButton);
    }

    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(addTimeEntryButton);
    }

    public async clickAddTimeEntryButton(): Promise<void> {
        await page.click(addTimeEntryButton);
    }

    public async waitUntilAddTimeEntryPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(engineerSelectField);
        await page.waitUntilElementDisplayed(typeSelectField);
    }

    public async isEngineerSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(engineerSelectField);
    }

    public async isTypeSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(startDateSelectField);
    }

    public async isStartDateSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(startDateSelectField);
    }

    public async isStartTimeSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(startTimeSelectField);
    }

    public async isEndDateSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(endDateSelectField);
    }

    public async isEndTimeSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(endTimeSelectField);
    }

    public async selectRandomEngineer(timeEntry: TimeEntry): Promise<void> {
        await page.click(engineerSelectField);
        await page.waitUntilElementDisplayed(engineersModal);
        const checkedEngineersElements = await page.getAllElements(checkedEngineers);

        for (let i = 1; i <= checkedEngineersElements.length; i++) {
            const checkedEngineerElement = browser.isAndroid ? `//android.widget.CheckBox[@checked="true"][${i}]` : `//XCUIElementTypeSwitch[@value="1"][${i}]`;
            await page.click(checkedEngineerElement);
            await page.pause(500);
        }

        const engineersElements = await page.getAllElements(engineersList);
        const randomNumber = helper.getRandomNumber(0, engineersElements.length - 1);
        const engineerElement = browser.isAndroid ? `//android.widget.CheckBox[${randomNumber + 1}]` : `//XCUIElementTypeSwitch[${randomNumber + 1}]`;
        timeEntry.engineer = browser.isAndroid ? await page.getText(engineerElement) : await page.getElementAttribute(engineerElement, 'name');
        await page.click(engineerElement);
        await page.click(okButton);
    }

    public async editEngineer(timeEntry: TimeEntry): Promise<void> {
        await page.click(engineerSelectField);
        await page.waitUntilElementDisplayed(engineersRadioButtons);

        const uncheckedEngineersElements = await page.getAllElements(uncheckedEngineersRadioButtons);
        const randomNumber = helper.getRandomNumber(0, uncheckedEngineersElements.length - 1);
        await page.clickElementByIndex(uncheckedEngineersRadioButtons, randomNumber);

        await page.waitUntilElementDisplayed(engineerSelectField);
        timeEntry.engineer = (await page.getText(engineerSelectField)).split(',')[0].trim();
    }

    public async isEngineerSelected(engineer: string): Promise<boolean> {
        return (await page.getText(engineerSelectField)).includes(engineer);
    }

    public async selectRandomType(timeEntry: TimeEntry): Promise<void> {
        await page.click(typeSelectField);
        await page.waitUntilElementDisplayed(selectTypeModal);

        const typeElements = await page.getAllElements(typeOptions);
        const randomNumber = helper.getRandomNumber(0, typeElements.length - 1);
        await page.clickElementByIndex(typeOptions, randomNumber);

        await page.waitUntilElementDisplayed(typeSelectField);
        timeEntry.type = (await page.getText(typeSelectField)).split(',')[0];
    }

    public async isTypeSelected(type: string): Promise<boolean> {
        return (await page.getText(typeSelectField)).includes(type);
    }

    public async getStartDate(): Promise<string> {
        return page.getText(startDateSelectField);
    }

    public async getEndDate(): Promise<string> {
        return page.getText(endDateSelectField);
    }

    public async selectRandomStartDate(timeEntry: TimeEntry, currentDate: string): Promise<void> {
        await page.click(startDateSelectField);
        await dateSelectionModal.waitUntilModalIsDisplayed();
        timeEntry.startDate = await dateSelectionModal.selectDate2DaysBeforeToday(currentDate);
        await dateSelectionModal.clickDoneButton();
        await dateSelectionModal.waitUntilModalIsNotDisplayed()
    }

    public async isStartDateSelected(date: string): Promise<boolean> {
        return (await this.getStartDate()) === date;
    }

    public async selectRandomEndDate(timeEntry: TimeEntry, currentDate: string): Promise<void> {
        await page.click(endDateSelectField);
        await dateSelectionModal.waitUntilModalIsDisplayed();
        timeEntry.endDate = await dateSelectionModal.selectDate2DaysAfterToday(currentDate);
        await dateSelectionModal.clickDoneButton();
        await dateSelectionModal.waitUntilModalIsNotDisplayed();
    }

    public async isEndDateSelected(date: string): Promise<boolean> {
        return (await this.getEndDate()) === date;
    }

    public async clickAddButton(): Promise<void> {
        await page.click(addButton);
    }

    public async isEngineerValueDisplayed(engineer: string): Promise<boolean> {
        return (await page.getText(engineerValue)) === engineer;
    }

    public async isTypeValueDisplayed(type: string): Promise<boolean> {
        return (await page.getText(typeValue)) === type;
    }

    public async isStartDateValueDisplayed(startDate: string): Promise<boolean> {
        return (await page.getText(startDateValue)).includes(startDate);
    }

    public async isEndDateValueDisplayed(endDate: string): Promise<boolean> {
        return (await page.getText(endDateValue)).includes(endDate);
    }

    public async clickTimeEntryCardEditButton(timeEntryType: string): Promise<void> {
        const timeEntryCard = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${timeEntryType}")]` : `//XCUIElementTypeStaticText[@name="${timeEntryType}"]/..`;
        await page.swipeElementToTheLeft(timeEntryCard);
        await page.click(timeEntryCardEditButton);
    }

    public async clickTimeEntryCardDeleteButton(timeEntryType: string): Promise<void> {
        const timeEntryCard = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${timeEntryType}")]` : `//XCUIElementTypeStaticText[@name="${timeEntryType}"]/..`;
        await page.swipeElementToTheLeft(timeEntryCard);
        await page.click(timeEntryCardDeleteButton);
    }

    public async waitUntilConfirmationModalIsDisplayed(): Promise<void> {
        await page.waitUntilElementDisplayed(confirmationModal);
    }

    public async waitUntilConfirmationModalIsNotDisplayed(): Promise<void> {
        await page.waitUntilElementNotDisplayed(confirmationModal);
    }

    public async isConfirmationModalOpened(): Promise<boolean> {
        return page.isElementDisplayed(confirmationModal);
    }

    public async clickYesDeleteItButton(): Promise<void> {
        await page.click(yesDeleteItButton);
    }

    public async isTimeEntryDeleted(timeEntryType: string): Promise<boolean> {
        const timeEntryCard = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${timeEntryType}")]` : `//XCUIElementTypeStaticText[@name="${timeEntryType}"]/..`;
        return !(await page.isElementDisplayed(timeEntryCard));
    }
}

export default new JobTimeEntriesPage();
