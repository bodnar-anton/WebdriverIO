import { expect } from 'chai';
import { login } from '../../helper/Login';
import jobsPage from '../../pages/JobsPage';
import jobSummaryPage from '../../pages/JobSummaryPage';
import bottomBar from '../../pages/BottomBar';
import jobItemsPage from '../../pages/JobItemsPage';
import JobItem from '../../model/JobItem';

const jobItem = new JobItem();

describe('Add item - Manual entry', () => {
    before(async () => {
        await login();
    });

    it('Open random job from the list', async () => {
        await jobsPage.openRandomJob();
        await jobSummaryPage.waitUntilPageIsOpened();
        expect(await jobSummaryPage.isPageOpened()).true;
    });

    it('Open «Items» tab', async () => {
        await bottomBar.clickItemsButton();
        await jobItemsPage.waitUntilPageIsOpened();
        expect(await jobItemsPage.isPageOpened()).true;
    });

    it('Click «Add item» button', async () => {
        await jobItemsPage.clickAddItemButton();
        await jobItemsPage.waitUntilAddItemManualEntryPageIsOpened();
        expect(await jobItemsPage.isItemTypeSelectFieldDisplayed()).true;
        expect(await jobItemsPage.isDescriptionTextfieldDisplayed()).true;
        expect(await jobItemsPage.isQtyInputFieldManualDisplayed()).true;
        expect(await jobItemsPage.isCostEachInputFieldManualDisplayed()).true;
    });

    it('Select random «Item type»', async () => {
        await jobItemsPage.selectRandomItemType(jobItem);
        expect(await jobItemsPage.isItemTypeSelected(jobItem.itemType)).true;
    });

    it('Enter random «Description»', async () => {
        await jobItemsPage.enterRandomDescription(jobItem);
        expect(await jobItemsPage.isDescriptionEntered(jobItem.description)).true;
    });

    it('Enter random «Qty»', async () => {
        await jobItemsPage.enterRandomQtyManual(jobItem);
        expect(await jobItemsPage.isQtyEnteredManual(jobItem.qty)).true;
    });

    it('Enter random «Cost each»', async () => {
        await jobItemsPage.enterRandomCostEachManual(jobItem);
        expect(await jobItemsPage.isCostEachEnteredManual(jobItem.costEach)).true;
    });

    it('Click «Add» button', async () => {
        await jobItemsPage.clickAddButton();
        await jobItemsPage.waitUntilPageIsOpened();
        expect(await jobItemsPage.isPageOpened()).true;
        expect(await jobItemsPage.isDescriptionDisplayedOnTheItemCard(jobItem.description)).true;
        expect(await jobItemsPage.isTypeDisplayedOnTheItemCard(jobItem.itemType)).true;
        expect(await jobItemsPage.isQtyDisplayedOnTheItemCard(jobItem.qty)).true;
    });

    it('Swipe the previously added item to the left and click «Edit» button', async () => {
        await jobItemsPage.clickEditButtonOnTheItemCard(jobItem.description);
        await jobItemsPage.waitUntilAddItemManualEntryPageIsOpened();
    });

    it('Change the «Description»', async () => {
        await jobItemsPage.enterRandomDescription(jobItem);
        expect(await jobItemsPage.isDescriptionEntered(jobItem.description)).true;
    });

    it('Change the «Qty»', async () => {
        await jobItemsPage.enterRandomQtyManual(jobItem);
        expect(await jobItemsPage.isQtyEnteredManual(jobItem.qty)).true;
    });

    it('Change the «Cost each»', async () => {
        await jobItemsPage.enterRandomCostEachManual(jobItem);
        expect(await jobItemsPage.isCostEachEnteredManual(jobItem.costEach)).true;
    });

    it('Click «Add» button', async () => {
        await jobItemsPage.clickAddButton();
        await jobItemsPage.waitUntilPageIsOpened();
        expect(await jobItemsPage.isPageOpened()).true;
        expect(await jobItemsPage.isDescriptionDisplayedOnTheItemCard(jobItem.description)).true;
        expect(await jobItemsPage.isTypeDisplayedOnTheItemCard(jobItem.itemType)).true;
        expect(await jobItemsPage.isQtyDisplayedOnTheItemCard(jobItem.qty)).true;
    });

    it('Swipe the previously added item to the left and click «Delete» button', async () => {
        await jobItemsPage.clickDeleteButtonOnTheItemCard(jobItem.description);
        await jobItemsPage.waitUntilConfirmationModalIsDisplayed();
        expect(await jobItemsPage.isConfirmationModalOpened()).true;
    });

    it('Click «Yes, delete it» button', async () => {
        await jobItemsPage.clickYesDeleteItButton();
        await jobItemsPage.waitUntilConfirmationModalIsNotDisplayed();
        expect(await jobItemsPage.isItemDeleted(jobItem.description)).true;
    });
});
