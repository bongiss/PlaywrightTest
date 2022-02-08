import { Page } from '@playwright/test';

export async function getInputValue (page: Page, selector: string): Promise<string> {
    return await page.getAttribute(selector, 'value') || '';
}

export async function isPresent (page: Page, selector: string): Promise<boolean> {
    try {
        await page.waitForSelector(selector, { state: 'attached', timeout: 5000 });
        return true;
    } catch {
        return false;
    }
}

export async function isDisplayed (page: Page, selector: string): Promise<boolean> {
    let el;
    try {
        el = await page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    } catch {}
    if (!el) {
        return false;
    }
    const isVisible = await el.isVisible();
    const bounds = await el.boundingBox();
    const isZeroWidth = bounds && bounds.width === 0 && bounds.height === 0;
    return isVisible && !isZeroWidth;
}

export async function selectOptionByIndex (page: Page, selector: string, index: string): Promise<void> {
    const option = await page.$(`${selector} :nth-match(option, ${index})`);
    await page.selectOption(selector, option);
}

export async function selectOptionByText (page: Page, selector: string, text: string): Promise<void> {
    await page.selectOption(selector, { label: text });
}
