import { expect } from 'chai';
import { login } from '../../helper/Login';
import jobsPage from '../../pages/JobsPage';
import addJobPage from '../../pages/AddJobPage';
import Job from '../../model/Job';
import jobSummaryPage from '../../pages/JobSummaryPage';
import header from '../../pages/Header';

const job = new Job();

describe('Create new job - Start date in the future', () => {
    before(async () => {
        await login();
    });

    it('Click add job button (+)', async () => {
        await jobsPage.clickAddNewJobButton();
        await addJobPage.waitUntilPageIsOpened();
        expect(await addJobPage.isCustomerSelectFieldDisplayed()).true;
        expect(await addJobPage.isJobNameInputFieldDisplayed()).true;
        expect(await addJobPage.isJobTypeSelectFieldDisplayed()).true;
        expect(await addJobPage.isWorkToBeDoneInputFieldDisplayed()).true;
        await addJobPage.scrollPageToBottom();
        expect(await addJobPage.isSelectStartDateButtonDisplayed()).true;
        expect(await addJobPage.isSelectEndDateButtonDisplayed()).true;
        expect(await addJobPage.isAllDaySwitchDisplayed()).true;
        expect(await addJobPage.isSelectStartTimeButtonDisplayed()).true;
        expect(await addJobPage.isSelectEndTimeButtonDisplayed()).true;
    });

    it('Select random customer', async () => {
        await addJobPage.scrollPageToTop();
        await addJobPage.selectRandomCustomer(job);
        expect(await addJobPage.isCustomerSelected(job.customer)).true;
        expect(await addJobPage.isSiteSelectFieldDisplayed()).true;
    });

    it('Select random «Site»', async () => {
        await addJobPage.selectRandomSite(job);
        expect(await addJobPage.isSiteSelected(job.site)).true;
    });

    it('Enter random job name', async () => {
        await addJobPage.enterRandomJobName(job);
        expect(await addJobPage.isJobNameEntered(job.name)).true;
    });

    it('Select random job type', async () => {
        await addJobPage.selectRandomJobType(job);
        expect(await addJobPage.isJobTypeSelected(job.type)).true;
    });

    it('Enter «Work to be done»', async () => {
        await addJobPage.enterRandomWorkToBeDone(job);
        expect(await addJobPage.isWorkToBeDoneEntered(job.workToBeDone)).true;
    });

    it('Select «Start date» to the date in the future', async () => {
        const currentDate = await addJobPage.getStartDate();
        await addJobPage.selectStartDateInFuture(job, currentDate);
        expect(await addJobPage.isStartDateSelected(job.startDate)).true;
    });

    it('Select «End date» to the date in the future', async () => {
        const currentDate = await addJobPage.getEndDate();
        await addJobPage.selectEndDateInFuture(job, currentDate);
        expect(await addJobPage.isEndDateSelected(job.endDate)).true;
    });

    it('Click «Save» button', async () => {
        await addJobPage.clickSaveButton();
        await addJobPage.waitUntilSavedSuccessfullyModalIsOpened();
        expect(await addJobPage.isSavedSuccessfullyModalDisplayed()).true;
    });

    it('Click «OK» button', async () => {
        await addJobPage.clickOkButton();
        await jobsPage.waitUntilPageIsOpened();
        expect(await jobsPage.isPageOpened()).true;
    });

    it('Select the «Show jobs for» filter, so the previously added job is displayed', async () => {
        await jobsPage.selectTheFilter('Tomorrow');
        expect(await jobsPage.isFilterSelected('Tomorrow')).true;
        expect(await jobsPage.scrollDownUntilJobIsDisplayed(job.name)).true;
    });

    it('Open previously added job', async () => {
        await jobsPage.openTheJob(job.name);
        await jobSummaryPage.waitUntilPageIsOpened();
        expect(await jobSummaryPage.isPageOpened()).true;

        expect(await jobSummaryPage.isJobDescriptionDisplayed(job.name)).true;
        expect(await jobSummaryPage.isCustomerDisplayed(job.customer)).true;
        expect(await jobSummaryPage.isJobTypeDisplayed(job.type)).true;
        expect(await jobSummaryPage.isStartDateDisplayed(job.startDate)).true;
        expect(await jobSummaryPage.isEndDateDisplayed(job.endDate)).true;
        expect(await jobSummaryPage.isJobStatusDisplayed('Scheduled')).true;
        expect(await jobSummaryPage.isWorkToBeDoneDisplayed(job.workToBeDone)).true;
    });

    it('Click «Open map» button', async () => {
        await jobSummaryPage.clickOpenMapButton();
        await jobSummaryPage.waitUntilMapIsOpened();
        expect(await jobSummaryPage.isMapOpened()).true;
    });

    it('Click «Get directions» button', async () => {
        await header.clickCloseButton();
        await jobSummaryPage.waitUntilPageIsOpened();
        await jobSummaryPage.clickGetDirectionsButton();
        await jobSummaryPage.waitUntilPageIsNotOpened();
        expect(await jobSummaryPage.isPageOpened()).false;
    });
});
