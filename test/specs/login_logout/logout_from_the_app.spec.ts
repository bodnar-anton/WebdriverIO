import { expect } from 'chai';
import { login } from '../../helper/Login';
import header from '../../pages/Header';
import sideMenu from '../../pages/SideMenu';
import loginPage from '../../pages/LoginPage';

describe('Sign out from the application', () => {
    before(async () => {
        await login();
    });

    it('Sign out from the application', async () => {
        await header.clickMenuButton();
        await sideMenu.waitUntilMenuIsOpened();
        await sideMenu.clickSignOutButton();
        await loginPage.waitUntilPageIsOpened();
        expect(await loginPage.isPageOpened()).true;
    });
});
