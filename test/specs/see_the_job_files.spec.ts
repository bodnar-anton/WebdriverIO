import { expect } from 'chai';
import { login } from '../helper/Login';
import jobsPage from '../pages/JobsPage';
import jobSummaryPage from '../pages/JobSummaryPage';
import bottomBar from '../pages/BottomBar';
import jobFilesPage from '../pages/JobFilesPage';

const jobName = process.env.JOB_NAME;

describe('See the job files', () => {
    before(async () => {
        await login();
    });

    it('Open the job with files from the job list', async () => {
        await jobsPage.openTheJob(jobName);
        await jobSummaryPage.waitUntilPageIsOpened();
        expect(await jobSummaryPage.isPageOpened()).true;
    });

    it('Open «Files» tab', async () => {
        await bottomBar.clickFilesButton();
        await jobFilesPage.waitUntilPageIsOpened();
        expect(await jobFilesPage.areFilesDisplayed()).true;
    });
});
