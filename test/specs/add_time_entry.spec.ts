import { expect } from 'chai';
import { login } from '../helper/Login';
import jobsPage from '../pages/JobsPage';
import jobSummaryPage from '../pages/JobSummaryPage';
import bottomBar from '../pages/BottomBar';
import jobTimeEntriesPage from '../pages/JobTimeEntriesPage';
import TimeEntry from '../model/TimeEntry';

const jobName = process.env.JOB_NAME;
const timeEntry = new TimeEntry();

describe('Add time entry', () => {
    before(async () => {
        await login();
    });

    it('Open random job from the list', async () => {
        await jobsPage.openTheJob(jobName);
        await jobSummaryPage.waitUntilPageIsOpened();
        expect(await jobSummaryPage.isPageOpened()).true;
    });

    it('Open «Time entries» tab', async () => {
        await bottomBar.clickTimeEntriesButton();
        await jobTimeEntriesPage.waitUntilPageIsOpened();
        expect(await jobTimeEntriesPage.isPageOpened()).true;
    });

    it('Click «Add time entry» button', async () => {
        await jobTimeEntriesPage.clickAddTimeEntryButton();
        await jobTimeEntriesPage.waitUntilAddTimeEntryPageIsOpened();
        expect(await jobTimeEntriesPage.isEngineerSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isTypeSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isStartDateSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isStartTimeSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isEndDateSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isEndTimeSelectFieldDisplayed()).true;
    });

    it('Select random «Engineer»', async () => {
        await jobTimeEntriesPage.selectRandomEngineer(timeEntry);
        await jobTimeEntriesPage.waitUntilAddTimeEntryPageIsOpened();
        expect(await jobTimeEntriesPage.isEngineerSelected(timeEntry.engineer)).true;
    });

    it('Select random «Type»', async () => {
        await jobTimeEntriesPage.selectRandomType(timeEntry);
        expect(await jobTimeEntriesPage.isTypeSelected(timeEntry.type)).true;
    });

    it('Select «Start date» in the past', async () => {
        const currentDate = await jobTimeEntriesPage.getStartDate();
        await jobTimeEntriesPage.selectRandomStartDate(timeEntry, currentDate);
        expect(await jobTimeEntriesPage.isStartDateSelected(timeEntry.startDate)).true;
    });

    it('Select «End date» in the future', async () => {
        const currentDate = await jobTimeEntriesPage.getEndDate();
        await jobTimeEntriesPage.selectRandomEndDate(timeEntry, currentDate);
        expect(await jobTimeEntriesPage.isEndDateSelected(timeEntry.endDate)).true;
    });

    it('Click «Add» button', async () => {
        await jobTimeEntriesPage.clickAddButton();
        expect(await jobTimeEntriesPage.isEngineerValueDisplayed(timeEntry.engineer)).true;
        expect(await jobTimeEntriesPage.isTypeValueDisplayed(timeEntry.type)).true;
        expect(await jobTimeEntriesPage.isStartDateValueDisplayed(timeEntry.startDate)).true;
        expect(await jobTimeEntriesPage.isEndDateValueDisplayed(timeEntry.endDate)).true;
    });

    it('Swipe previously added time entry to the left and click «Edit» button', async () => {
        await jobTimeEntriesPage.clickTimeEntryCardEditButton(timeEntry.type);
        await jobTimeEntriesPage.waitUntilAddTimeEntryPageIsOpened();
        expect(await jobTimeEntriesPage.isEngineerSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isTypeSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isStartDateSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isStartTimeSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isEndDateSelectFieldDisplayed()).true;
        expect(await jobTimeEntriesPage.isEndTimeSelectFieldDisplayed()).true;
    });

    it('Edit the «Engineer»', async () => {
        await jobTimeEntriesPage.editEngineer(timeEntry);
        await jobTimeEntriesPage.waitUntilAddTimeEntryPageIsOpened();
        expect(await jobTimeEntriesPage.isEngineerSelected(timeEntry.engineer)).true;
    });

    it('Edit the «Type»', async () => {
        await jobTimeEntriesPage.selectRandomType(timeEntry);
        expect(await jobTimeEntriesPage.isTypeSelected(timeEntry.type)).true;
    });

    it('Click «Done» button', async () => {
        await jobTimeEntriesPage.clickAddButton();
        expect(await jobTimeEntriesPage.isEngineerValueDisplayed(timeEntry.engineer)).true;
        expect(await jobTimeEntriesPage.isTypeValueDisplayed(timeEntry.type)).true;
        expect(await jobTimeEntriesPage.isStartDateValueDisplayed(timeEntry.startDate)).true;
        expect(await jobTimeEntriesPage.isEndDateValueDisplayed(timeEntry.endDate)).true;
    });

    it('Swipe previously added time entry to the left and click «Delete» button', async () => {
        await jobTimeEntriesPage.clickTimeEntryCardDeleteButton(timeEntry.type);
        await jobTimeEntriesPage.waitUntilConfirmationModalIsDisplayed();
        expect(await jobTimeEntriesPage.isConfirmationModalOpened()).true;
    });

    it('Click «Yes, delete it» button', async () => {
        await jobTimeEntriesPage.clickYesDeleteItButton();
        await jobTimeEntriesPage.waitUntilConfirmationModalIsNotDisplayed();
        expect(await jobTimeEntriesPage.isTimeEntryDeleted(timeEntry.type)).true;
    });
});
