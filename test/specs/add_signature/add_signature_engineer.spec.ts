import { expect } from 'chai';
import { login } from '../../helper/Login';
import commonElements from '../../helper/CommonElements';
import jobsPage from '../../pages/JobsPage';
import jobSummaryPage from '../../pages/JobSummaryPage';
import bottomBar from '../../pages/BottomBar';
import jobSignaturesPage from '../../pages/JobSignaturesPage';
import Engineer from '../../model/Engineer';

const jobName = process.env.JOB_NAME;
const engineer = new Engineer();

describe('Add signature - Engineer', () => {
    before(async () => {
        await login();
        await commonElements.disableSignatureRotation();
    });

    it('Open random job from the list', async () => {
        await jobsPage.openTheJob(jobName);
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

    it('Select the «Engineer» type', async () => {
        await jobSignaturesPage.clickEngineerButton();
        await jobSignaturesPage.waitUntilSelectEngineerPopupIsOpened();
        expect(await jobSignaturesPage.isSelectEngineerPopupOpened()).true;
    });

    it('Select random engineer', async () => {
        await jobSignaturesPage.selectRandomEngineer(engineer);
        await jobSignaturesPage.waitUntilSignatureWhiteBoardIsOpened();
        expect(await jobSignaturesPage.isSignatureWhiteBoardOpened()).true;
    });

    it('Make a random signature', async () => {
        await jobSignaturesPage.makeEngineerSignature();
    });

    it('Click «Done» button', async () => {
        await jobSignaturesPage.clickDoneButton();
        await jobSignaturesPage.waitUntilPageIsOpened();
        expect(await jobSignaturesPage.isSignatureDisplayed(`${engineer.name} (Engineer)`));
    });

    it('Swipe previously added signature to the left and click «Edit name» button', async () => {
        await jobSignaturesPage.clickSignatureEditNameButton(engineer.name);
        await jobSignaturesPage.waitUntilSelectEngineerPopupIsOpened();
        expect(await jobSignaturesPage.isSelectEngineerPopupOpened()).true;
    });

    it('Select the engineer', async () => {
        await jobSignaturesPage.selectRandomEngineer(engineer);
        await jobSignaturesPage.waitUntilPageIsOpened();
        expect(await jobSignaturesPage.isSignatureDisplayed(`${engineer.name} (Engineer)`));
    });

    it('Swipe previously added signature to the left and click «Delete» button', async () => {
        await jobSignaturesPage.clickSignatureDeleteButton(`${engineer.name} (Engineer)`);
        await jobSignaturesPage.waitUntilConfirmationModalIsDisplayed();
        expect(await jobSignaturesPage.isConfirmationModalOpened()).true;
    });

    it('Click «Yes, delete it» button', async () => {
        await jobSignaturesPage.clickYesDeleteItButton();
        await jobSignaturesPage.waitUntilConfirmationModalIsNotDisplayed();
        expect(await jobSignaturesPage.isSignatureDeleted(`${engineer.name} (Engineer)`)).true;
    });
});
