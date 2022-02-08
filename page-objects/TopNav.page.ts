import { Page } from '@playwright/test';
import { createSelector, Selector } from '../Helper-package/src';

export class TopNav {
    private _contact = this._select('a[href="#/contact"]');
    private _shop = this._select('a[href="#/shop"]');
    private _cart = this._select('a[href="#/cart"]');

    constructor (private _page: Page, private _select: Selector = createSelector()) {}

    public async clickContact (): Promise<void> {
        await this._page.click(this._contact);
    }

    public async clickShop (): Promise<void> {
        await this._page.click(this._shop);
    }

    public async clickCart (): Promise<void> {
        await this._page.click(this._cart);
    }
}