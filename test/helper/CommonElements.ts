import page from '../pages/Page';
import header from '../pages/Header';
import sideMenu from '../pages/SideMenu';
import settingsPage from '../pages/SettingsPage';
import jobsPage from '../pages/JobsPage';

class CommonElements {
    public async disableSignatureRotation(): Promise<void> {
        await header.clickMenuButton();
        await sideMenu.waitUntilMenuIsOpened();
        await sideMenu.clickSettingsButton();
        await settingsPage.waitUntilPageIsOpened();

        await settingsPage.disableSignatureRotation();
        await header.clickBackButton();
        await jobsPage.waitUntilLoadingIsFinished();
        await page.pause(3000);
    }
}

export default new CommonElements();
