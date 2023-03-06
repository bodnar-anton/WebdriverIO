import page from '../pages/Page';
import helper from './Helper';

const dateSelectionModal = browser.isAndroid ? '//android.app.Dialog' : '//XCUIElementTypeOther[@name="web dialog"]';
const doneButton = browser.isAndroid ? '//android.widget.Button[contains(@text, "DONE")]' : '//XCUIElementTypeButton[@name="Done"]';

class DateSelectionModal {
    public async waitUntilModalIsDisplayed(): Promise<void> {
        await page.waitUntilElementDisplayed(dateSelectionModal);
    }

    public async waitUntilModalIsNotDisplayed(): Promise<void> {
        await page.waitUntilElementNotDisplayed(dateSelectionModal);
    }

    public async moveYearSliderUp(currentValue: string, years: number): Promise<void> {
        if (years === 0) { return; }
        const nextValue = helper.formatNumberDate(parseInt(currentValue, 10) + 1);
        const selectedYear = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[3]//android.widget.Button[@text="${currentValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[5]/XCUIElementTypeButton[@name="${currentValue}"]`;
        const nextYear = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[3]//android.widget.Button[@text="${nextValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[5]/XCUIElementTypeButton[@name="${nextValue}"]`;

        const windowSize = await browser.getWindowSize();

        const selectedYearPosition = await (await page.getElement(selectedYear)).getLocation();
        const selectedYearSize = await (await page.getElement(selectedYear)).getSize();
        const selectedYearCenter = {x: selectedYearPosition.x + (selectedYearSize.width / 2), y: selectedYearPosition.y + (selectedYearSize.height / 2)};

        const nextYearPosition = await (await page.getElement(nextYear)).getLocation();
        const nextYearSize = await (await page.getElement(nextYear)).getSize();
        const nextYearCenter = {x: nextYearPosition.x + (nextYearSize.width / 2), y: nextYearPosition.y + (nextYearSize.height * 3/4)};

        const startPoint = {x: nextYearCenter.x, y: nextYearCenter.y};
        const endPoint = {x: windowSize.width - 10, y: selectedYearCenter.y};

        for (let i = 0; i < years; i++) {
            await browser.touchAction([
                { action: 'longPress', x: startPoint.x, y: startPoint.y },
                { action: 'moveTo', x: endPoint.x, y: endPoint.y },
                'release'
            ]);
            await page.pause(500);
        }
    }

    public async moveYearSliderDown(currentValue: string, years: number): Promise<void> {
        if (years === 0) { return; }
        const previousValue = helper.formatNumberDate(parseInt(currentValue, 10) - 1);
        const selectedYear = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[3]//android.widget.Button[@text="${currentValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[5]/XCUIElementTypeButton[@name="${currentValue}"]`;
        const previousYear = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[3]//android.widget.Button[@text="${previousValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[5]/XCUIElementTypeButton[@name="${previousValue}"]`;

        const windowSize = await browser.getWindowSize();

        const selectedYearPosition = await (await page.getElement(selectedYear)).getLocation();
        const selectedYearSize = await (await page.getElement(selectedYear)).getSize();
        const selectedYearCenter = {x: selectedYearPosition.x + (selectedYearSize.width / 2), y: selectedYearPosition.y + (selectedYearSize.height / 2)};

        const swipeOffset = browser.isAndroid ? 1/4 : 1/2;
        const previousYearPosition = await (await page.getElement(previousYear)).getLocation();
        const previousYearSize = await (await page.getElement(previousYear)).getSize();
        const previousYearCenter = {x: previousYearPosition.x + (previousYearSize.width / 2), y: previousYearPosition.y + (previousYearSize.height * swipeOffset)};

        const startPoint = {x: previousYearCenter.x, y: previousYearCenter.y};
        const endPoint = {x: windowSize.width - 10, y: selectedYearCenter.y};

        for (let i = 0; i < years; i++) {
            await browser.touchAction([
                { action: 'longPress', x: startPoint.x, y: startPoint.y },
                { action: 'moveTo', x: endPoint.x, y: endPoint.y },
                'release'
            ]);
            await page.pause(500);
        }
    }

    public async moveMonthSliderUp(currentValue: string, months: number): Promise<void> {
        if (months === 0) { return; }
        const previousValue = helper.formatNumberDate(parseInt(currentValue, 10) - 1);
        const selectedMonth = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[2]//android.widget.Button[@text="${currentValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[4]/XCUIElementTypeButton[@name="${currentValue}"]`;
        const previousMonth = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[2]//android.widget.Button[@text="${previousValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[4]/XCUIElementTypeButton[@name="${previousValue}"]`;

        const windowSize = await browser.getWindowSize();

        const selectedMonthPosition = await (await page.getElement(selectedMonth)).getLocation();
        const selectedMonthSize = await (await page.getElement(selectedMonth)).getSize();
        const selectedMonthCenter = {x: selectedMonthPosition.x + (selectedMonthSize.width / 2), y: selectedMonthPosition.y + (selectedMonthSize.height / 2)};

        const previousMonthPosition = await (await page.getElement(previousMonth)).getLocation();
        const previousMonthSize = await (await page.getElement(previousMonth)).getSize();
        const previousMonthCenter = {x: previousMonthPosition.x + (previousMonthSize.width / 2), y: previousMonthPosition.y + (previousMonthSize.height * 3/4)};

        const startPoint = {x: previousMonthCenter.x, y: previousMonthCenter.y};
        const endPoint = {x: windowSize.width - 10, y: selectedMonthCenter.y};

        for (let i = 0; i < months; i++) {
            await browser.touchAction([
                { action: 'longPress', x: startPoint.x, y: startPoint.y },
                { action: 'moveTo', x: endPoint.x, y: endPoint.y },
                'release'
            ]);
            await page.pause(500);
        }
    }

    public async moveMonthSliderDown(currentValue: string, months: number): Promise<void> {
        if (months === 0) { return; }
        const nextValue = helper.formatNumberDate(parseInt(currentValue, 10) + 1);
        const selectedMonth = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[2]//android.widget.Button[@text="${currentValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[4]/XCUIElementTypeButton[@name="${currentValue}"]`;
        const nextMonth = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[2]//android.widget.Button[@text="${nextValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[4]/XCUIElementTypeButton[@name="${nextValue}"]`;

        const windowSize = await browser.getWindowSize();

        const selectedMonthPosition = await (await page.getElement(selectedMonth)).getLocation();
        const selectedMonthSize = await (await page.getElement(selectedMonth)).getSize();
        const selectedMonthCenter = {x: selectedMonthPosition.x + (selectedMonthSize.width / 2), y: selectedMonthPosition.y + (selectedMonthSize.height / 2)};

        const swipeOffset = browser.isAndroid ? 1/4 : 1/2;
        const nextMonthPosition = await (await page.getElement(nextMonth)).getLocation();
        const nextMonthSize = await (await page.getElement(nextMonth)).getSize();
        const nextMonthCenter = {x: nextMonthPosition.x + (nextMonthSize.width / 2), y: nextMonthPosition.y + (nextMonthSize.height * swipeOffset)};

        const startPoint = {x: nextMonthCenter.x, y: nextMonthCenter.y};
        const endPoint = {x: windowSize.width - 10, y: selectedMonthCenter.y};

        for (let i = 0; i < months; i++) {
            await browser.touchAction([
                { action: 'longPress', x: startPoint.x, y: startPoint.y },
                { action: 'moveTo', x: endPoint.x, y: endPoint.y },
                'release'
            ]);
            await page.pause(500);
        }
    }

    public async moveDaySliderUp(currentValue: string, days: number): Promise<void> {
        if (days === 0) { return; }
        const previousValue = helper.formatNumberDate(parseInt(currentValue, 10) - 1);
        const selectedDay = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[1]//android.widget.Button[@text="${currentValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/XCUIElementTypeButton[@name="${currentValue}"]`;
        const previousDay = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[1]//android.widget.Button[@text="${previousValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/XCUIElementTypeButton[@name="${previousValue}"]`;

        const windowSize = await browser.getWindowSize();

        const selectedDayPosition = await (await page.getElement(selectedDay)).getLocation();
        const selectedDaySize = await (await page.getElement(selectedDay)).getSize();
        const selectedDayCenter = {x: selectedDayPosition.x + (selectedDaySize.width / 2), y: selectedDayPosition.y + (selectedDaySize.height / 2)};

        const previousDayPosition = await (await page.getElement(previousDay)).getLocation();
        const previousDaySize = await (await page.getElement(previousDay)).getSize();
        const previousDayCenter = {x: previousDayPosition.x + (previousDaySize.width / 2), y: previousDayPosition.y + (previousDaySize.height * 3/4)};

        const startPoint = {x: previousDayCenter.x, y: previousDayCenter.y};
        const endPoint = {x: windowSize.width - 10, y: selectedDayCenter.y};

        for (let i = 0; i < days; i++) {
            await browser.touchAction([
                { action: 'longPress', x: startPoint.x, y: startPoint.y },
                { action: 'moveTo', x: endPoint.x, y: endPoint.y },
                'release'
            ]);
            await page.pause(500);
        }
    }

    public async moveDaySliderDown(currentValue: string, days: number): Promise<void> {
        if (days === 0) { return; }
        const nextValue = helper.formatNumberDate(parseInt(currentValue, 10) + 1);
        const selectedDay = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[1]//android.widget.Button[@text="${currentValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/XCUIElementTypeButton[@name="${currentValue}"]`;
        const nextDay = browser.isAndroid ? `//android.app.Dialog/android.view.View[2]/android.view.View[1]//android.widget.Button[@text="${nextValue}"]` : `//XCUIElementTypeWebView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/XCUIElementTypeButton[@name="${nextValue}"]`;

        const windowSize = await browser.getWindowSize();

        const selectedDayPosition = await (await page.getElement(selectedDay)).getLocation();
        const selectedDaySize = await (await page.getElement(selectedDay)).getSize();
        const selectedDayCenter = {x: selectedDayPosition.x + (selectedDaySize.width / 2), y: selectedDayPosition.y + (selectedDaySize.height / 2)};

        const swipeOffset = browser.isAndroid ? 1/4 : 1/2;
        const nextDayPosition = await (await page.getElement(nextDay)).getLocation();
        const nextDaySize = await (await page.getElement(nextDay)).getSize();
        const nextDayCenter = {x: nextDayPosition.x + (nextDaySize.width / 2), y: nextDayPosition.y + (nextDaySize.height * swipeOffset)};

        const startPoint = {x: nextDayCenter.x, y: nextDayCenter.y};
        const endPoint = {x: windowSize.width - 10, y: selectedDayCenter.y};

        for (let i = 0; i < days; i++) {
            await browser.touchAction([
                { action: 'longPress', x: startPoint.x, y: startPoint.y },
                { action: 'moveTo', x: endPoint.x, y: endPoint.y },
                'release'
            ]);
            await page.pause(500);
        }
    }

    public async selectTheDate(currentDate: string, day: number, month: number, year: number): Promise<void> {
        const currentDay = parseInt(currentDate.split('/')[0], 10);
        const currentMonth = parseInt(currentDate.split('/')[1], 10);
        const currentYear = parseInt(currentDate.split('/')[2], 10);

        let curDate = new Date(currentYear, currentMonth - 1, currentDay);
        let years = curDate.getFullYear() - year;
        let months = (curDate.getMonth() + 1) - month;
        let days = helper.getCurrentDay(curDate.getDate(), day, currentMonth, month, year) - day;

        let currentYearValue = curDate.getFullYear().toString();
        let currentMonthValue = helper.formatNumberDate(curDate.getMonth() + 1);
        let currentDayValue = helper.formatNumberDate(helper.getCurrentDay(curDate.getDate(), day, currentMonth, month, year));

        if (years < 0) {
            await this.moveYearSliderUp(currentYearValue, Math.abs(years));
        } else {
            await this.moveYearSliderDown(currentYearValue, Math.abs(years));
        }

        if (months < 0) {
            await this.moveMonthSliderDown(currentMonthValue, Math.abs(months));
        } else {
            await this.moveMonthSliderUp(currentMonthValue, Math.abs(months));
        }

        if (days < 0) {
            await this.moveDaySliderDown(currentDayValue, Math.abs(days));
        } else {
            await this.moveDaySliderUp(currentDayValue, Math.abs(days));
        }
    }

    public async selectTomorrowDate(currentDate: string): Promise<string> {
        let tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        await this.selectTheDate(currentDate, tomorrowDate.getDate(), tomorrowDate.getMonth() + 1, tomorrowDate.getFullYear());
        return `${helper.formatNumberDate(tomorrowDate.getDate())}/${helper.formatNumberDate(tomorrowDate.getMonth() + 1)}/${tomorrowDate.getFullYear().toString()}`;
    }

    public async selectDate2DaysAfterToday(currentDate: string): Promise<string> {
        let date2DaysAfterToday = new Date();
        date2DaysAfterToday.setDate(date2DaysAfterToday.getDate() + 2);
        await this.selectTheDate(currentDate, date2DaysAfterToday.getDate(), date2DaysAfterToday.getMonth() + 1, date2DaysAfterToday.getFullYear());
        return `${helper.formatNumberDate(date2DaysAfterToday.getDate())}/${helper.formatNumberDate(date2DaysAfterToday.getMonth() + 1)}/${date2DaysAfterToday.getFullYear().toString()}`;
    }

    public async selectYesterdayDate(currentDate: string): Promise<string> {
        let yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        await this.selectTheDate(currentDate, yesterdayDate.getDate(), yesterdayDate.getMonth() + 1, yesterdayDate.getFullYear());
        return `${helper.formatNumberDate(yesterdayDate.getDate())}/${helper.formatNumberDate(yesterdayDate.getMonth() + 1)}/${yesterdayDate.getFullYear().toString()}`;
    }

    public async selectDate2DaysBeforeToday(currentDate: string): Promise<string> {
        let date2DaysBeforeToday = new Date();
        date2DaysBeforeToday.setDate(date2DaysBeforeToday.getDate() - 2);
        await this.selectTheDate(currentDate, date2DaysBeforeToday.getDate(), date2DaysBeforeToday.getMonth() + 1, date2DaysBeforeToday.getFullYear());
        return `${helper.formatNumberDate(date2DaysBeforeToday.getDate())}/${helper.formatNumberDate(date2DaysBeforeToday.getMonth() + 1)}/${date2DaysBeforeToday.getFullYear().toString()}`;
    }

    public async clickDoneButton(): Promise<void> {
        await page.click(doneButton);
    }
}

export default new DateSelectionModal();
