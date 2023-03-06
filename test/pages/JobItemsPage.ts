import page from './Page';
import JobItem from '../model/JobItem';
import helper from '../helper/Helper';

const addItemButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "Add item")]' : '//XCUIElementTypeButton[contains(@name, "Add item")]';
const itemTypeSelectField = browser.isAndroid ? '//android.view.View[contains(@text, "Item type")]' : '//XCUIElementTypeOther[contains(@name, "Item type")]';
const itemSelectField = browser.isAndroid ? '//android.widget.TextView[@text="Item"]/following-sibling::android.view.View[1]/android.widget.Button' : '//XCUIElementTypeStaticText[@name="Item"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeButton[1]';
const itemSelectFieldText = browser.isAndroid ? '//android.widget.TextView[@text="Item"]/following-sibling::android.view.View[1]/android.view.View[1]/android.widget.TextView' : '//XCUIElementTypeStaticText[@name="Item"]/parent::XCUIElementTypeOther/following-sibling::*[1]/XCUIElementTypeStaticText';
const textFields = browser.isAndroid ? '//android.widget.EditText' : '//*[self::XCUIElementTypeTextView or self::XCUIElementTypeTextField]';
const addButton = browser.isAndroid ? '//*[@resource-id="btnSaveItem"]' : '//XCUIElementTypeButton[@name="Add"]';
const itemCardDescription = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Description:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Description:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const itemCardType = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Type:")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Type:"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const itemCardQty = browser.isAndroid ? '//android.widget.TextView[contains(@text, "Qty")]/following-sibling::android.widget.TextView[1]' : '//XCUIElementTypeStaticText[@name="Qty"]/parent::XCUIElementTypeOther/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeStaticText';
const itemEditButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "EDIT")]' : '//XCUIElementTypeButton[contains(@name, "Edit")]';
const itemDeleteButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "DELETE")]' : '//XCUIElementTypeButton[contains(@name, "Delete")]';
const confirmationModal = browser.isAndroid ? '//*[contains(@text, "Delete item")]' : '//XCUIElementTypeStaticText[@name="Delete item"]';
const yesDeleteItButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "YES, DELETE IT")]' : '//XCUIElementTypeButton[@name="Yes, delete it"]';
const selectFromRepositoryTab = browser.isAndroid ? '//android.widget.Button[@text="Select from repository"]' : '//XCUIElementTypeButton[@name="Select from repository"]';
const itemsList = browser.isAndroid ? '//android.widget.Button[contains(@text, "Cost per item")]' : '//XCUIElementTypeButton[contains(@name, "Cost per item:")]';
const itemTypesList = browser.isAndroid ? '//android.widget.RadioButton/android.widget.RadioButton[@checked="false"]' : '//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther';

class JobItemsPage {
    public async isPageOpened(): Promise<boolean> {
        return page.isElementDisplayed(addItemButton);
    }

    public async waitUntilPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(addItemButton);
    }

    public async clickAddItemButton(): Promise<void> {
        await page.click(addItemButton);
    }

    public async waitUntilAddItemManualEntryPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(itemTypeSelectField);
    }

    public async waitUntilAddItemFromRepositryPageIsOpened(): Promise<void> {
        await page.waitUntilElementDisplayed(itemTypeSelectField);
        await page.waitUntilElementDisplayed(itemSelectField);
    }

    public async isItemTypeSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(itemTypeSelectField);
    }

    public async isItemSelectFieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(itemSelectField);
    }

    public async isDescriptionTextfieldDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(await page.getElementByIndex(textFields, 0));
    }

    public async isQtyInputFieldManualDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(await page.getElementByIndex(textFields, 1));
    }

    public async isCostEachInputFieldManualDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(await page.getElementByIndex(textFields, 2));
    }

    public async isQtyInputFieldRepositoryDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(await page.getElementByIndex(textFields, 0));
    }

    public async isCostEachInputFieldRepositoryDisplayed(): Promise<boolean> {
        return page.isElementDisplayed(await page.getElementByIndex(textFields, 1));
    }

    public async enterRandomDescription(jobItem: JobItem): Promise<void> {
        const randomString = helper.generateRandomString(10);
        await page.setValue(await page.getElementByIndex(textFields, 0), randomString);
        jobItem.description = randomString;
    }

    public async isDescriptionEntered(description: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(textFields, 0))) === description;
    }

    public async enterRandomQtyManual(jobItem: JobItem): Promise<void> {
        const randomNumber = helper.getRandomNumber(1, 100).toString();
        await page.setValue(await page.getElementByIndex(textFields, 1), randomNumber);
        jobItem.qty = randomNumber;
    }

    public async enterRandomQtyRepository(jobItem: JobItem): Promise<void> {
        const randomNumber = helper.getRandomNumber(1, 100).toString();
        await page.setValue(await page.getElementByIndex(textFields, 0), randomNumber);
        jobItem.qty = randomNumber;
    }

    public async isQtyEnteredManual(qty: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(textFields, 1))).includes(qty);
    }

    public async isQtyEnteredRepository(qty: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(textFields, 0))).includes(qty);
    }

    public async enterRandomCostEachManual(jobItem: JobItem): Promise<void> {
        const randomNumber = helper.getRandomNumber(100, 1000).toString();
        await page.setValue(await page.getElementByIndex(textFields, 2), randomNumber);
        jobItem.costEach = randomNumber;
    }

    public async enterRandomCostEachRepository(jobItem: JobItem): Promise<void> {
        const randomNumber = helper.getRandomNumber(100, 1000).toString();
        await page.setValue(await page.getElementByIndex(textFields, 1), randomNumber);
        jobItem.costEach = randomNumber;
    }

    public async isCostEachEnteredManual(costEach: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(textFields, 2))).includes(costEach);
    }

    public async isCostEachEnteredRepository(costEach: string): Promise<boolean> {
        return (await page.getText(await page.getElementByIndex(textFields, 1))).includes(costEach);
    }

    public async clickAddButton(): Promise<void> {
        await page.click(addButton);
    }

    public async isDescriptionDisplayedOnTheItemCard(description: string): Promise<boolean> {
        return (await page.getText(itemCardDescription)) === description;
    }

    public async isTypeDisplayedOnTheItemCard(type: string): Promise<boolean> {
        return (await page.getText(itemCardType)) === type;
    }

    public async isQtyDisplayedOnTheItemCard(qty: string): Promise<boolean> {
        return (await page.getText(itemCardQty)) === qty;
    }

    public async clickEditButtonOnTheItemCard(description: string): Promise<void> {
        const itemCardElement = browser.isAndroid ? `//android.widget.TextView[@text="${description}"]/..` : `//XCUIElementTypeStaticText[@name="${description}"]/..`;
        await page.swipeElementToTheLeft(itemCardElement);
        await page.click(itemEditButton);
    }

    public async clickDeleteButtonOnTheItemCard(description: string): Promise<void> {
        const itemCardElement = browser.isAndroid ? `//android.widget.TextView[@text="${description}"]/..` : `//XCUIElementTypeStaticText[@name="${description}"]/..`;
        await page.swipeElementToTheLeft(itemCardElement);
        await page.click(itemDeleteButton);
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

    public async isItemDeleted(description: string): Promise<boolean> {
        const itemCardElement = browser.isAndroid ? `//android.widget.TextView[@text="${description}"]/..` : `//XCUIElementTypeStaticText[@name="${description}"]/..`;
        return !(await page.isElementDisplayed(itemCardElement));
    }

    public async clickSelectFromRepositoryTab(): Promise<void> {
        await page.click(selectFromRepositoryTab);
    }

    public async selectRandomItemType(jobItem: JobItem): Promise<void> {
        await page.click(itemTypeSelectField);
        await page.waitUntilElementDisplayed(itemTypesList);

        const itemTypesElements = await page.getAllElements(itemTypesList);
        const randomNumber = helper.getRandomNumber(0, itemTypesElements.length - 1);
        await page.clickElementByIndex(itemTypesList, randomNumber);

        await this.waitUntilAddItemManualEntryPageIsOpened();
        jobItem.itemType = (await page.getText(itemTypeSelectField)).split(',')[0];
    }

    public async isItemTypeSelected(itemType: string): Promise<boolean> {
        return (await page.getText(itemTypeSelectField)).includes(itemType);
    }

    public async selectRandomItem(jobItem: JobItem): Promise<void> {
        await page.click(itemSelectField);
        await page.waitUntilElementsDisplayed(itemsList);

        const itemsElements = await page.getAllElements(itemsList);
        const randomNumber = helper.getRandomNumber(0, itemsElements.length - 1);
        await page.clickElementByIndex(itemsList, randomNumber);

        await this.waitUntilAddItemFromRepositryPageIsOpened();
        jobItem.description = browser.isAndroid ? await page.getText(itemSelectFieldText) : await (await page.getElement(itemSelectFieldText)).getText();
    }

    public async isItemSelected(item: string): Promise<boolean> {
        const actualValue = browser.isAndroid ? await page.getText(itemSelectFieldText) : await (await page.getElement(itemSelectFieldText)).getText();
        return actualValue === item;
    }
}

export default new JobItemsPage();
