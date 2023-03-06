import page from './Page';
import Checklist from '../model/Checklist';
import helper from '../helper/Helper';
import Checkbox from '../model/Checkbox';

const checklists = browser.isAndroid ? '//android.widget.Image[contains(@text, "arrow forward")]/../..' : '//XCUIElementTypeImage[@name="arrow forward"]/..';
const checkboxes = browser.isAndroid ? '//android.widget.CheckBox/android.widget.CheckBox' : '//XCUIElementTypeSwitch';
const doneButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Done")]' : '//XCUIElementTypeButton[@name="Done"]';
const openedChecklistName = browser.isAndroid ? '//android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[1]/android.widget.TextView[1]' : '//XCUIElementTypeApplication/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeStaticText';

class JobChecklistsPage {
    public async isPageOpened(): Promise<boolean> {
        return page.isElementDisplayed(checklists);
    }

    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(checklists);
    }

    public async openChecklist(checklistName): Promise<void> {
        const checklistElement = browser.isAndroid ? `//android.widget.TextView[@text="${checklistName}"]` : `//XCUIElementTypeStaticText[@name="${checklistName}"]/..`;
        await page.click(checklistElement);
    }

    public async openRandomChecklist(checklist: Checklist): Promise<void> {
        const checklistsElements = await page.getAllElements(checklists);
        const randomNumber = helper.getRandomNumber(0, checklistsElements.length - 1);
        await page.clickElementByIndex(checklists, randomNumber);
    }

    public async getOpenedChecklistName(checklist: Checklist): Promise<void> {
        checklist.name = await page.getElementAttribute(openedChecklistName, 'name');
    }

    public async waitUntilChecklistPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(checkboxes);
    }

    public async isChecklistPageOpened(): Promise<boolean> {
        return page.isElementDisplayed(checkboxes);
    }

    public async switchRandomCheckpoint(checklist: Checklist): Promise<void> {
        const attr = browser.isAndroid ? 'checked' : 'value';
        const enabledValue = browser.isAndroid ? 'true' : '1';
        const checkboxesElements = await page.getAllElements(checkboxes);
        const randomNumber = helper.getRandomNumber(0, checkboxesElements.length - 1);

        const currentValue = (await page.getElementAttribute(checkboxesElements[randomNumber], attr)) === enabledValue;
        await page.clickElementByIndex(checkboxes, randomNumber);
        checklist.selectedCheckbox.name = browser.isAndroid ? await page.getText(await page.getElementByIndex(checkboxes, randomNumber)) : await page.getElementAttribute(await page.getElementByIndex(checkboxes, randomNumber), 'name');
        checklist.selectedCheckbox.value = !currentValue;
    }

    public async isCheckpointSwitched(checkbox: Checkbox): Promise<boolean> {
        const attr = browser.isAndroid ? 'checked' : 'value';
        const enabledValue = browser.isAndroid ? 'true' : '1';

        const checkboxElement = browser.isAndroid ? `//android.widget.CheckBox/android.widget.CheckBox[contains(@text, "${checkbox.name}")]` : `//XCUIElementTypeSwitch[@name="${checkbox.name}"]`;
        return ((await page.getElementAttribute(checkboxElement, attr)) === enabledValue) === checkbox.value;
    }

    public async addCheckboxNotes(checkbox: Checkbox): Promise<void> {
        const checkboxNotesButton = browser.isAndroid ? `//android.widget.CheckBox/android.widget.CheckBox[contains(@text, "${checkbox.name}")]/ancestor::android.view.View/following-sibling::android.view.View[1]/android.widget.Button` : `//XCUIElementTypeSwitch[@name="${checkbox.name}"]/following-sibling::XCUIElementTypeButton[1]`;
        const notesTextfield = browser.isAndroid ? `//android.widget.CheckBox/android.widget.CheckBox[contains(@text, "${checkbox.name}")]/ancestor::android.view.View/following-sibling::android.view.View[1]/android.widget.EditText` : `//XCUIElementTypeSwitch[@name="${checkbox.name}"]/following-sibling::XCUIElementTypeTextView[1]`;
        if (await page.isElementDisplayed(checkboxNotesButton)) {
            await page.click(checkboxNotesButton);
        }
        const randomString = helper.generateRandomString();
        await page.setValue(notesTextfield, randomString);
        checkbox.notes = randomString;
    }

    public async isNotesEntered(checkbox: Checkbox): Promise<boolean> {
        const notesTextfield = browser.isAndroid ? `//android.widget.CheckBox/android.widget.CheckBox[contains(@text, "${checkbox.name}")]/ancestor::android.view.View/following-sibling::android.view.View[1]/android.widget.EditText` : `//XCUIElementTypeSwitch[@name="${checkbox.name}"]/following-sibling::XCUIElementTypeTextView[1]`;
        return (await page.getText(notesTextfield)) === checkbox.notes;
    }

    public async clickDoneButton(): Promise<void> {
        await page.click(doneButton);
    }
}

export default new JobChecklistsPage();
