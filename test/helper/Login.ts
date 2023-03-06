import page from '../pages/Page';
import loginPage from '../pages/LoginPage';
import jobsPage from '../pages/JobsPage';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

export async function login(): Promise<void> {
    await loginPage.waitUntilPageIsOpened();
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickSingInButton();

    await jobsPage.waitUntilLocationGrantDialogIsDisplayed();
    await jobsPage.grantLocationAccess();
    await jobsPage.waitUntilLocationGrantDialogIsNotDisplayed();

    if (browser.isIOS) {
        await jobsPage.waitUntilAllowNotificationsModalIsDisplayed();
        await jobsPage.allowNotifications();
        await jobsPage.waitUntilAllowNotificationsModalIsNotDisplayed();
    }

    await jobsPage.clickJobsTitle();
    await page.pause(3000);
}
