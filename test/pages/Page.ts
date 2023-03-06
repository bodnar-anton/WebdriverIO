class Page {
    public async pause(milliseconds: number): Promise<void> {
        await browser.pause(milliseconds);
    }

    public async startDebugging(): Promise<void> {
        await browser.debug();
    }

    public async getElement(element: string | WebdriverIO.Element): Promise<WebdriverIO.Element> {
        return $(element);
    }

    public getAllElements(elements: string): Promise<WebdriverIO.Element[]> {
        return $$(elements);
    }

    public async getElementByIndex(elements: string, index: number): Promise<WebdriverIO.Element> {
        return (await this.getAllElements(elements))[index];
    }

    public async click(element: string | WebdriverIO.Element): Promise<void> {
        await (await this.getElement(element)).click();
    }

    public async clickElementByIndex(elements: string, index: number): Promise<void> {
        await this.click(await this.getElementByIndex(elements, index));
    }

    public async clearValue(element: string | WebdriverIO.Element): Promise<void> {
        await this.click(element);
        while ((await (await this.getElement(element)).getValue()) !== '') {
            await browser.keys(['Control', 'Delete']);
            await browser.keys(['Control', 'Backspace']);
        }
    }

    public async setValue(element: string | WebdriverIO.Element, value: string): Promise<void> {
        await this.waitUntilElementDisplayed(element);
        await (await this.getElement(element)).setValue(value);
    }

    public async getText(element: string | WebdriverIO.Element): Promise<string> {
        await this.waitUntilElementDisplayed(element);

        return (await this.getElement(element)).getText();
    }

    public async getSelectFieldValue(selectField: string | WebdriverIO.Element): Promise<string> {
        const selectElement = await this.getElement(selectField);
        return await browser.execute((selectFld) => {
            // @ts-ignore
            return selectFld.options[selectFld.selectedIndex].text;
        }, selectElement);
    }

    public async isValueEntered(element: string | WebdriverIO.Element, value: string): Promise<boolean> {
        let text = await this.getText(element);

        return text === value;
    }

    public async isEnteredValueNotEmpty(element: string | WebdriverIO.Element): Promise<boolean> {
        let text = await this.getText(element);

        return text.length > 0;
    }

    public async scrollDownUntilElementDisplayed(element: string | WebdriverIO.Element): Promise<void> {
        if (await this.isElementDisplayedInViewport(element)) {
            return;
        }

        await browser.waitUntil(async () => {
            await this.scrollDown();
            await this.pause(1000);
            return this.isElementDisplayedInViewport(element);
        }, { interval: 1000, timeout: 300000 });
    }

    public async scrollUpUntilElementDisplayed(element: string | WebdriverIO.Element): Promise<void> {
        if (await this.isElementDisplayedInViewport(element)) {
            return;
        }

        await browser.waitUntil(async () => {
            await this.scrollUp();
            await this.pause(1000);
            return this.isElementDisplayedInViewport(element);
        }, { interval: 1000, timeout: 300000 });
    }

    public async scrollDown(): Promise<void> {
        const windowSize = await browser.getWindowSize();

        await browser.touchAction([
            { action: 'longPress', x: 10, y: windowSize.height - 20 },
            { action: 'moveTo', x: 10, y: 550 },
            'release'
        ]);
    }

    public async scrollUp(): Promise<void> {
        const windowSize = await browser.getWindowSize();

        await browser.touchAction([
            { action: 'longPress', x: 10, y: 550 },
            { action: 'moveTo', x: 10, y: windowSize.height - 20 },
            'release'
        ]);
    }

    public async swipeElementToTheLeft(element: string | WebdriverIO.Element): Promise<void> {
        const windowSize = await browser.getWindowSize();
        const elementPosition = await (await this.getElement(element)).getLocation();
        const elementSize = await (await this.getElement(element)).getSize();
        const elementCenter = {x: elementPosition.x + (elementSize.width / 2), y: elementPosition.y + (elementSize.height / 2)};

        await browser.touchAction([
            { action: 'longPress', x: ((windowSize.width - elementSize.width) / 2) + elementSize.width - 20, y: elementCenter.y },
            { action: 'moveTo', x: (windowSize.width / 2) - 100, y: elementCenter.y },
            'release'
        ]);
    }

    public async isElementClickable(element: string | WebdriverIO.Element): Promise<boolean> {
        return (await this.getElement(element)).isClickable();
    }

    public async isElementEnabled(element: string | WebdriverIO.Element): Promise<boolean> {
        return (await this.getElement(element)).isEnabled();
    }

    public async getElementAttribute(element: string | WebdriverIO.Element, attributeName: string): Promise<string> {
        return (await this.getElement(element)).getAttribute(attributeName);
    }

    public async isElementDisplayed(element: string | WebdriverIO.Element): Promise<boolean> {
        return (await this.getElement(element)).isDisplayed();
    }

    public async isElementExisting(element: string | WebdriverIO.Element): Promise<boolean> {
        return (await this.getElement(element)).isExisting();
    }

    public async areElementsDisplayed(elements: string): Promise<boolean> {
        if ((await this.getAllElements(elements)).length === 0) {
            return false;
        }

        for (const element of await this.getAllElements(elements)) {
            if (!(await this.isElementDisplayed(element))) {
                return false;
            }
        }

        return true;
    }

    public async isElementDisplayedInViewport(element: string | WebdriverIO.Element): Promise<boolean> {
        if (!(await this.isElementDisplayed(element))) {
            return false;
        }

        const windowSize = await browser.getWindowSize();
        const elementPosition = await (await this.getElement(element)).getLocation();

        return (elementPosition.x < windowSize.width) && (elementPosition.y < windowSize.height);
    }

    public async waitUntilElementDisplayed(element: string | WebdriverIO.Element): Promise<void> {
        await browser.waitUntil(() => this.isElementDisplayed(element));
    }

    public async waitUntilElementsDisplayed(elements: string): Promise<void> {
        await browser.waitUntil(() => this.areElementsDisplayed(elements));
    }

    public async waitUntilElementNotDisplayed(element: string | WebdriverIO.Element): Promise<void> {
        await browser.waitUntil(async () => !(await this.isElementDisplayed(element)));
    }

    public async waitUntilElementIncludesText(element: string | WebdriverIO.Element, text: string): Promise<void> {
        await browser.waitUntil(async () => (await this.getText(element)).includes(text));
    }
}

export default new Page();
