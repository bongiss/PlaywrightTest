import { Page } from '@playwright/test';

export class UrlActions {

    constructor (private _page: Page) {}

    public async goToUrl (urlString: string): Promise<void> {
        await this._page.goto(urlString);
    }
}