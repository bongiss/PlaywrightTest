import { Page } from '@playwright/test';
import { createSelector, isPresent, Selector } from '../helper-package/src';

export class ShopPage {
    public _buyButton = this._select('a.btn.btn-success');

    constructor (private _page: Page, private _select: Selector = createSelector()) {}

    public async clickBuyButton (product: string): Promise<void> {
        
    }


}