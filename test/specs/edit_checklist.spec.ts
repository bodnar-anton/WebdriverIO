import { expect } from 'chai';
import { login } from '../helper/Login';
import jobsPage from '../pages/JobsPage';
import jobSummaryPage from '../pages/JobSummaryPage';
import bottomBar from '../pages/BottomBar';
import jobChecklistsPage from '../pages/JobChecklistsPage';
import Checklist from '../model/Checklist';

const jobName = process.env.JOB_NAME;
const checklist = new Checklist();

describe('Edit checklist', () => {
    before(async () => {
        await login();
    });

    it('Open random job from the list', async () => {
        await jobsPage.openTheJob(jobName);
        await jobSummaryPage.waitUntilPageIsOpened();
        expect(await jobSummaryPage.isPageOpened()).true;
    });

    it('Open «Checklists» tab', async () => {
        await bottomBar.clickChecklistsButton();
        await jobChecklistsPage.waitUntilPageIsOpened();
        expect(await jobChecklistsPage.isPageOpened()).true;
    });

    it('Open random checklist', async () => {
        await jobChecklistsPage.openRandomChecklist(checklist);
        await jobChecklistsPage.waitUntilChecklistPageIsOpened();
        await jobChecklistsPage.getOpenedChecklistName(checklist);
        expect(await jobChecklistsPage.isChecklistPageOpened()).true;
    });

    it('Check random checkpoint', async () => {
        await jobChecklistsPage.switchRandomCheckpoint(checklist);
        expect(await jobChecklistsPage.isCheckpointSwitched(checklist.selectedCheckbox)).true;
    });

    it('Enter random notes', async () => {
        await jobChecklistsPage.addCheckboxNotes(checklist.selectedCheckbox);
        expect(await jobChecklistsPage.isNotesEntered(checklist.selectedCheckbox)).true;
    });

    it('Click «Done» button', async () => {
        await jobChecklistsPage.clickDoneButton();
        await jobChecklistsPage.waitUntilPageIsOpened();
        expect(await jobChecklistsPage.isPageOpened()).true;
    });

    it('Open previously used checklist', async () => {
        await jobChecklistsPage.openChecklist(checklist.name);
        await jobChecklistsPage.waitUntilChecklistPageIsOpened();
        expect(await jobChecklistsPage.isChecklistPageOpened()).true;
        expect(await jobChecklistsPage.isCheckpointSwitched(checklist.selectedCheckbox)).true;
        expect(await jobChecklistsPage.isNotesEntered(checklist.selectedCheckbox)).true;
    });
});
