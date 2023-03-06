import page from './Page';
import Customer from '../model/Customer';
import Engineer from '../model/Engineer';
import helper from '../helper/Helper';

const addSignatureButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Add signature")]' : '//XCUIElementTypeButton[contains(@name, "Add signature")]';
const signatureTypePopup = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Select signature type")]' : '//XCUIElementTypeStaticText[@name="Select signature type"]';
const customerButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Customer")]' : '//XCUIElementTypeButton[@name="Customer"]';
const engineerButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Engineer")]' : '//XCUIElementTypeButton[@name="Engineer"]';
const nameInputFields = browser.isAndroid ? '//android.widget.EditText' : '//XCUIElementTypeTextField';
const nameModalSaveButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "SAVE")]' : '//XCUIElementTypeButton[@name="Save"]';
const signatureWhiteBoard = browser.isAndroid ? '//android.view.View[@resource-id="signaturePadContainer"]' : '//XCUIElementTypeStaticText[@name="Add signature"]';
const doneButton = browser.isAndroid ? '//android.view.View[@resource-id="btnSaveSignature"]' : '//XCUIElementTypeButton[@name="Done"]';
const signatureEditNameButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "EDIT NAME")]' : '//XCUIElementTypeButton[contains(@name, "Edit name")]';
const signatureDeleteButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "DELETE")]' : '//XCUIElementTypeButton[contains(@name, "Delete")]';
const confirmationModal = browser.isAndroid ? '//*[contains(@text, "Delete signature")]' : '//XCUIElementTypeStaticText[@name="Delete signature"]';
const yesDeleteItButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "YES, DELETE IT")]' : '//XCUIElementTypeButton[@name="Yes, delete it"]';
const markJobAsCompleteModal = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Mark job as complete?")]' : '//XCUIElementTypeStaticText[@name="Mark job as complete?"]';
const yesButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "YES")]' : '//XCUIElementTypeButton[@name="Yes"]';
const selectEngineerPopup = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Select engineer") or contains(@text, "Change engineer")]' : '//XCUIElementTypeStaticText[@name="Select engineer" or @name="Change engineer"]';
const engineersList = browser.isAndroid ? '//android.app.Dialog/android.view.View[1]/android.widget.Button' : '//XCUIElementTypeStaticText[@name="Select engineer" or @name="Change engineer"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeButton[not(@name="Cancel")]';

class JobSignaturesPage {
    public async isPageOpened(): Promise<boolean> {
        return page.isElementDisplayed(addSignatureButton);
    }

    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementsDisplayed(addSignatureButton);
    }

    public async clickAddSignatureButton(): Promise<void> {
        await page.click(addSignatureButton);
    }

    public async waitUntilSignatureTypePopupIsDisplayed(): Promise<void> {
        await page.waitUntilElementDisplayed(signatureTypePopup);
    }

    public async isSignatureTypePopupOpened(): Promise<boolean> {
        return page.isElementDisplayed(signatureTypePopup);
    }

    public async clickCustomerButton(): Promise<void> {
        await page.click(customerButton);
    }

    public async clickEngineerButton(): Promise<void> {
        await page.click(engineerButton);
    }

    public async waitUntilSelectEngineerPopupIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(selectEngineerPopup);
    }

    public async isSelectEngineerPopupOpened(): Promise<boolean> {
        return page.isElementDisplayed(selectEngineerPopup);
    }

    public async selectRandomEngineer(engineer: Engineer): Promise<void> {
        const engineers = await page.getAllElements(engineersList);
        const randomNumber = helper.getRandomNumber(0, engineers.length - 1);
        const selectedEngineer = browser.isAndroid ? `//android.app.Dialog/android.view.View[1]/android.widget.Button[${randomNumber + 1}]` : `//XCUIElementTypeStaticText[@name="Select engineer" or @name="Change engineer"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeButton[${randomNumber + 1}]`;
        engineer.name = await page.getText(selectedEngineer);
        await page.clickElementByIndex(engineersList, randomNumber);
    }

    public async waitUntilNameEditModalIsDisplayed(): Promise<void> {
        await page.waitUntilElementsDisplayed(nameInputFields);
    }

    public async isNameEditModalDisplayed(): Promise<boolean> {
        return page.areElementsDisplayed(nameInputFields);
    }

    public async enterRandomFirstName(customer: Customer): Promise<void> {
        const randomString = helper.generateRandomString();
        await page.setValue(await page.getElementByIndex(nameInputFields, 0), randomString);
        customer.firstName = randomString;
    }

    public async isFirstNameEntered(firstName: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(nameInputFields, 0))) === firstName;
    }

    public async enterRandomLastName(customer: Customer): Promise<void> {
        const randomString = helper.generateRandomString();
        await page.setValue(await page.getElementByIndex(nameInputFields, 1), randomString);
        customer.lastName = randomString;
    }

    public async isLastNameEntered(lastName: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(nameInputFields, 1))) === lastName;
    }

    public async clickNameModalSaveButton(): Promise<void> {
        await page.click(nameModalSaveButton);
    }

    public async waitUntilSignatureWhiteBoardIsOpened(): Promise<void> {
        await page.waitUntilElementsDisplayed(signatureWhiteBoard)
    }

    public async isSignatureWhiteBoardOpened(): Promise<boolean> {
        return page.isElementDisplayed(signatureWhiteBoard);
    }

    public async makeCustomerSignature(): Promise<void> {
        const windowSize = await browser.getWindowSize();
        const windowCenter = {x: windowSize.width / 2, y: windowSize.height / 2};
        const rectangleWidth = 400;

        const point1 = {x: windowCenter.x - (rectangleWidth / 2), y: windowCenter.y + (rectangleWidth / 2)};
        const point2 = {x: windowCenter.x - (rectangleWidth / 2), y: windowCenter.y - (rectangleWidth / 2)};
        const point3 = {x: windowCenter.x + (rectangleWidth / 2), y: windowCenter.y - (rectangleWidth / 2)};
        const point4 = {x: windowCenter.x + (rectangleWidth / 2), y: windowCenter.y + (rectangleWidth / 2)};


        await browser.touchAction([
            { action: 'longPress', x: point1.x, y: point1.y },
            { action: 'moveTo', x: point2.x, y: point2.y },
            'release'
        ]);
        await browser.touchAction([
            { action: 'longPress', x: point2.x, y: point2.y },
            { action: 'moveTo', x: point3.x, y: point3.y },
            'release'
        ]);
        await browser.touchAction([
            { action: 'longPress', x: point3.x, y: point3.y },
            { action: 'moveTo', x: point4.x, y: point4.y },
            'release'
        ]);
        await browser.touchAction([
            { action: 'longPress', x: point4.x, y: point4.y },
            { action: 'moveTo', x: point1.x, y: point1.y },
            'release'
        ]);
    }

    public async makeEngineerSignature(): Promise<void> {
        const windowSize = await browser.getWindowSize();
        const windowCenter = {x: windowSize.width / 2, y: windowSize.height / 2};
        const rectangleWidth = 400;

        const point1 = {x: windowCenter.x, y: windowCenter.y + (rectangleWidth / 2)};
        const point2 = {x: windowCenter.x - (rectangleWidth / 2), y: windowCenter.y};
        const point3 = {x: windowCenter.x, y: windowCenter.y - (rectangleWidth / 2)};
        const point4 = {x: windowCenter.x + (rectangleWidth / 2), y: windowCenter.y};


        await browser.touchAction([
            { action: 'longPress', x: point1.x, y: point1.y },
            { action: 'moveTo', x: point2.x, y: point2.y },
            'release'
        ]);
        await browser.touchAction([
            { action: 'longPress', x: point2.x, y: point2.y },
            { action: 'moveTo', x: point3.x, y: point3.y },
            'release'
        ]);
        await browser.touchAction([
            { action: 'longPress', x: point3.x, y: point3.y },
            { action: 'moveTo', x: point4.x, y: point4.y },
            'release'
        ]);
        await browser.touchAction([
            { action: 'longPress', x: point4.x, y: point4.y },
            { action: 'moveTo', x: point1.x, y: point1.y },
            'release'
        ]);
    }

    public async clickDoneButton(): Promise<void> {
        await page.click(doneButton);
    }

    public async isSignatureDisplayed(signatureName: string): Promise<boolean> {
        const signatureBlock = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${signatureName}")]` : `//XCUIElementTypeStaticText[contains(@name, "${signatureName}")]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]`;
        return page.isElementDisplayed(signatureBlock);
    }

    public async clickSignatureEditNameButton(signatureName: string): Promise<void> {
        const signatureBlock = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${signatureName}")]` : `//XCUIElementTypeStaticText[contains(@name, "${signatureName}")]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]`;
        await page.swipeElementToTheLeft(signatureBlock);
        await page.click(signatureEditNameButton);
    }

    public async clickSignatureDeleteButton(signatureName: string): Promise<void> {
        const signatureBlock = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${signatureName}")]` : `//XCUIElementTypeStaticText[contains(@name, "${signatureName}")]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]`;
        await page.swipeElementToTheLeft(signatureBlock);
        await page.click(signatureDeleteButton);
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

    public async isSignatureDeleted(signatureName: string): Promise<boolean> {
        const signatureBlock = browser.isAndroid ? `//android.widget.TextView[contains(@text, "${signatureName}")]` : `//XCUIElementTypeStaticText[contains(@name, "${signatureName}")]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]`;
        return !(await page.isElementDisplayed(signatureBlock));
    }

    public async waitUntilMarkJobAsCompleteModalIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(markJobAsCompleteModal);
    }

    public async isMarkJobAsCompleteModalOpened(): Promise<boolean> {
        return page.isElementDisplayed(markJobAsCompleteModal);
    }

    public async clickYesButton(): Promise<void> {
        await page.click(yesButton);
    }
}

export default new JobSignaturesPage();
