import { expect } from 'chai';
import { login } from '../helper/Login';
import header from '../pages/Header';
import sideMenu from '../pages/SideMenu';
import settingsPage from '../pages/SettingsPage';
import Settings from '../model/Settings';

const settings = new Settings();

describe('Settings page usage', () => {
    before(async () => {
        await login();
    });

    it('Open «Settings» page', async () => {
        await header.clickMenuButton();
        await sideMenu.waitUntilMenuIsOpened();
        await sideMenu.clickSettingsButton();
        await settingsPage.waitUntilPageIsOpened();
        expect(await settingsPage.isPageOpened()).true;
    });

    it('Enable the «Dark mode» switch', async () => {
        await settingsPage.switchDarkMode(settings);
        expect(await settingsPage.isDarkModeSwitched(settings.darkMode)).true;
    });

    it('Disable the «Dark mode» switch', async () => {
        await settingsPage.switchDarkMode(settings);
        expect(await settingsPage.isDarkModeSwitched(settings.darkMode)).true;
    });

    it('Enable the «Dyslexic mode» switch', async () => {
        await settingsPage.switchDyslexicMode(settings);
        expect(await settingsPage.isDyslexicModeSwitched(settings.dyslexicMode)).true;
    });

    it('Disable the «Dyslexic mode» switch', async () => {
        await settingsPage.switchDyslexicMode(settings);
        expect(await settingsPage.isDyslexicModeSwitched(settings.dyslexicMode)).true;
    });
});
