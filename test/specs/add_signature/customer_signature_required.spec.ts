import { expect } from 'chai';
import { login } from '../../helper/Login';
import commonElements from '../../helper/CommonElements';
import jobsPage from '../../pages/JobsPage';
import jobSummaryPage from '../../pages/JobSummaryPage';
import bottomBar from '../../pages/BottomBar';
import jobDetailsPage from '../../pages/JobDetailsPage'
import Job from '../../model/Job';
import Customer from '../../model/Customer';
import jobSignaturesPage from '../../pages/JobSignaturesPage';

const job = new Job();
const customer = new Customer();

describe('Customer signature required test', () => {
    before(async () => {
        await login();
        await commonElements.disableSignatureRotation();
    });

    it('Open random job from the list', async () => {
        await jobsPage.openRandomJob();
        await jobSummaryPage.waitUntilPageIsOpened();
        expect(await jobSummaryPage.isPageOpened()).true;
    });

    it('Open «Details» tab', async () => {
        await bottomBar.clickDetailsButton();
        await jobDetailsPage.waitUntilPageIsOpened();
        expect(await jobDetailsPage.isJobStatusSelectFieldDisplayed()).true;
    });

    it('Try to change job status to «Complete»', async () => {
        await jobDetailsPage.selectJobStatus(job, 'Complete');
        await jobDetailsPage.waitUntilJobCannotBeMarkedAsCompleteModalIsDisplayed();
        expect(await jobDetailsPage.isJobCannotBeMarkedAsCompleteModalDisplayed()).true;
    });

    it('Click «Add signature» button', async () => {
        await jobDetailsPage.clickAddSignatureButton();
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
        await jobSignaturesPage.waitUntilMarkJobAsCompleteModalIsOpened();
        expect(await jobSignaturesPage.isMarkJobAsCompleteModalOpened()).true;
    });

    it('Click «Yes» button', async () => {
        await jobSignaturesPage.clickYesButton();
        await jobDetailsPage.waitUntilPageIsOpened();
        expect(await jobDetailsPage.isJobStatusSelected(job.status)).true;
    });
});
