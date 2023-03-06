import { expect } from 'chai';
import loginPage from '../../pages/LoginPage';
import jobsPage from '../../pages/JobsPage';

const email = process.env.EMAIL;
const invalidPassword = 'qwer123';
const validPassword = process.env.PASSWORD;

describe('Login to the application', () => {
    it('Open the login page', async () => {
        await loginPage.waitUntilPageIsOpened();
        expect(await loginPage.isPageOpened()).true;
    });

    it('Click «Sing In» button', async () => {
        await loginPage.clickSingInButton();
        await loginPage.waitUntilSignInFailedErrorIsDisplayed();
        expect(await loginPage.isSignInFailedErrorDisplayed()).true;
    });

    it('Enter valid Email address', async () => {
        await loginPage.clickErrorModalOkButton();
        await loginPage.waitUntilSignInFailedErrorIsNotDisplayed();

        await loginPage.enterEmail(email);
        expect(await loginPage.isEmailEntered(email)).true;
    });

    it('Click «Sing In» button', async () => {
        await loginPage.clickSingInButton();
        await loginPage.waitUntilSignInFailedErrorIsDisplayed();
        expect(await loginPage.isSignInFailedErrorDisplayed()).true;
    });

    it('Enter invalid password', async () => {
        await loginPage.clickErrorModalOkButton();
        await loginPage.waitUntilSignInFailedErrorIsNotDisplayed();

        await loginPage.enterPassword(invalidPassword);
        expect(await loginPage.isPasswordEntered()).true;
    });

    it('Click «Sing In» button', async () => {
        await loginPage.clickSingInButton();
        await loginPage.waitUntilSignInFailedErrorIsDisplayed();
        expect(await loginPage.isSignInFailedErrorDisplayed()).true;
    });

    it('Enter valid password', async () => {
        await loginPage.clickErrorModalOkButton();
        await loginPage.waitUntilSignInFailedErrorIsNotDisplayed();

        await loginPage.enterPassword(validPassword);
        expect(await loginPage.isPasswordEntered()).true;
    });

    it('Click «Sing In» button', async () => {
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
        expect(await jobsPage.isPageOpened()).true;
    });
});


