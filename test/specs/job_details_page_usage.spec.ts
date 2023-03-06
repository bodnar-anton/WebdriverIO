import { expect } from 'chai';
import { login } from '../helper/Login';
import jobsPage from '../pages/JobsPage';
import jobSummaryPage from '../pages/JobSummaryPage';
import jobDetailsPage from '../pages/JobDetailsPage';
import bottomBar from '../pages/BottomBar';
import Job from '../model/Job';

const job = new Job();

describe('Job details page usage', () => {
    before(async () => {
        await login();
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
        expect(await jobDetailsPage.isReturnVisitRequiredCheckboxDisplayed()).true;
        expect(await jobDetailsPage.isActualWorkDoneTextfieldDisplayed()).true;
        expect(await jobDetailsPage.isRecommendationsTextfieldDisplayed()).true;
    });

    it('Change the «Job status»', async () => {
        await jobDetailsPage.selectRandomJobStatus(job);
        expect(await jobDetailsPage.isJobStatusSelected(job.status));
    });

    it('Change the «Return visit required?» switch', async () => {
        const returnVisitRequiredValue = await jobDetailsPage.getReturnVisitRequiredValue();
        await jobDetailsPage.changeReturnVisitRequiredValue(job);
        expect(job.returnVisitRequired).to.not.equal(returnVisitRequiredValue);
    });

    it('Enter the «Actual work done»', async () => {
        await jobDetailsPage.enterRandomActualWorkDone(job);
        expect(await jobDetailsPage.isActualWorkDoneEntered(job.actualWorkDone)).true;
    });

    it('Enter the «Recommendations»', async () => {
        await jobDetailsPage.enterRandomRecommendations(job);
        expect(await jobDetailsPage.isRecommendationsEntered(job.recommendations)).true;
    });

    it('Click «Save» button', async () => {
        await jobDetailsPage.clickSaveButton();
        await jobDetailsPage.waitUntilSuccessfullyModalIsDisplayed();
        expect(await jobDetailsPage.isSavedSuccessfullyModalDisplayed()).true;
    });

    it('Click «OK» button', async () => {
        await jobDetailsPage.clickOkButton();
        await jobDetailsPage.waitUntilSuccessfullyModalIsNotDisplayed();
        await jobDetailsPage.waitUntilPageIsOpened();
        expect(await jobDetailsPage.isJobStatusSelectFieldDisplayed()).true;
    });

    it('Open «Summary» tab', async () => {
        await bottomBar.clickSummaryButton();
        await jobSummaryPage.waitUntilPageIsOpened();
        expect(await jobSummaryPage.isPageOpened()).true;
        expect(await jobSummaryPage.isJobStatusDisplayed(job.status)).true;
    });

    it('Open «Details» tab', async () => {
        await bottomBar.clickDetailsButton();
        await jobDetailsPage.waitUntilPageIsOpened();
        expect(await jobDetailsPage.isJobStatusSelected(job.status));
        const returnVisitRequiredValue = await jobDetailsPage.getReturnVisitRequiredValue();
        expect(job.returnVisitRequired).to.be.equal(returnVisitRequiredValue);
        expect(await jobDetailsPage.isActualWorkDoneEntered(job.actualWorkDone)).true;
        expect(await jobDetailsPage.isRecommendationsEntered(job.recommendations)).true;
    });
});
