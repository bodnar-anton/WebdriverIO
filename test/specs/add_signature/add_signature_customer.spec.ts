import { expect } from 'chai';
import { login } from '../../helper/Login';
import jobsPage from '../../pages/JobsPage';
import jobSummaryPage from '../../pages/JobSummaryPage';
import bottomBar from '../../pages/BottomBar';
import jobSignaturesPage from '../../pages/JobSignaturesPage';
import Customer from '../../model/Customer';
import commonElements from '../../helper/CommonElements';

const customer = new Customer();

describe('Add signature - Customer', () => {
    before(async () => {
        await login();
        await commonElements.disableSignatureRotation();
    });

    it('Open random job from the list', async () => {
        await jobsPage.openRandomJob();
        await jobSummaryPage.waitUntilPageIsOpened();
        expect(await jobSummaryPage.isPageOpened()).true;
    });

    it('Open «Signatures» tab', async () => {
        await bottomBar.clickSignaturesButton();
        await jobSignaturesPage.waitUntilPageIsOpened();
        expect(await jobSignaturesPage.isPageOpened()).true;
    });

    it('Click «Add signature» button', async () => {
        await jobSignaturesPage.clickAddSignatureButton();
        await jobSignaturesPage.waitUntilSignatureTypePopupIsDisplayed();
        expect(await jobSignaturesPage.isSignatureTypePopupOpened()).true;
    });

    it('Select the «Customer» type', async () => {
        await jobSignaturesPage.clickCustomerButton();
        await jobSignaturesPage.waitUntilNameEditModalIsDisplayed();
        expect(await jobSignaturesPage.isNameEditModalDisplayed()).true;
    });

    it('Enter random «First name»', async () => {
        await jobSignaturesPage.enterRandomFirstName(customer);
        expect(await jobSignaturesPage.isFirstNameEntered(customer.firstName)).true;
    });

    it('Enter random «Last name»', async () => {
        await jobSignaturesPage.enterRandomLastName(customer);
        expect(await jobSignaturesPage.isLastNameEntered(customer.lastName)).true;
    });

    it('Click «Save» button', async () => {
        await jobSignaturesPage.clickNameModalSaveButton();
        await jobSignaturesPage.waitUntilSignatureWhiteBoardIsOpened();
        expect(await jobSignaturesPage.isSignatureWhiteBoardOpened()).true;
    });

    it('Make a random signature', async () => {
        await jobSignaturesPage.makeCustomerSignature();
    });

    it('Click «Done» button', async () => {
        await jobSignaturesPage.clickDoneButton();
        await jobSignaturesPage.waitUntilPageIsOpened();
        expect(await jobSignaturesPage.isSignatureDisplayed(`${customer.firstName} ${customer.lastName} (Customer)`));
    });

    it('Swipe previously added signature to the left and click «Edit name» button', async () => {
        await jobSignaturesPage.clickSignatureEditNameButton(`${customer.firstName} ${customer.lastName} (Customer)`);
        await jobSignaturesPage.waitUntilNameEditModalIsDisplayed();
        expect(await jobSignaturesPage.isNameEditModalDisplayed()).true;
    });

    it('Edit the «First name»', async () => {
        await jobSignaturesPage.enterRandomFirstName(customer);
        expect(await jobSignaturesPage.isFirstNameEntered(customer.firstName)).true;
    });

    it('Edit the «Last name»', async () => {
        await jobSignaturesPage.enterRandomLastName(customer);
        expect(await jobSignaturesPage.isLastNameEntered(customer.lastName)).true;
    });

    it('Click «Save» button', async () => {
        await jobSignaturesPage.clickNameModalSaveButton();
        await jobSignaturesPage.waitUntilPageIsOpened();
        expect(await jobSignaturesPage.isSignatureDisplayed(`${customer.firstName} ${customer.lastName} (Customer)`));
    });

    it('Swipe previously added signature to the left and click «Delete» button', async () => {
        await jobSignaturesPage.clickSignatureDeleteButton(`${customer.firstName} ${customer.lastName} (Customer)`);
        await jobSignaturesPage.waitUntilConfirmationModalIsDisplayed();
        expect(await jobSignaturesPage.isConfirmationModalOpened()).true;
    });

    it('Click «Yes, delete it» button', async () => {
        await jobSignaturesPage.clickYesDeleteItButton();
        await jobSignaturesPage.waitUntilConfirmationModalIsNotDisplayed();
        expect(await jobSignaturesPage.isSignatureDeleted(`${customer.firstName} ${customer.lastName} (Customer)`)).true;
    });
});
