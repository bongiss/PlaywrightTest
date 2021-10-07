import { Page } from '@playwright/test';
import { createSelector, Selector } from '../helper-package/src';

export class TopNav {
    public _contact = this._select('a[href="#/contact"]');
    public _shop = this._select('a[href="#/shop"]');

    constructor (private _page: Page, private _select: Selector = createSelector()) {}

    public async clickContact (): Promise<void> {
        await this._page.click(this._contact);
    }

    public async clickShop (): Promise<void> {
        await this._page.click(this._contact);
    }
}