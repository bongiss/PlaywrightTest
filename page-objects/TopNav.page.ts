import { Page } from '@playwright/test';
import { createSelector, Selector } from '../Helper-package';

export class TopNav {
    public _contact = this._select('a[href="#/contact"]');

    constructor (private _page: Page, private _select: Selector = createSelector()) {}

    public async clickContact (): Promise<void> {
        await this._page.click(this._contact);
    }
}