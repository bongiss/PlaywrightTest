import { expect, Page } from '@playwright/test';
import { createSelector, Selector } from '../helper-package/src';

export class ShopPage {
    
    public _buyButton = this._select('a.btn.btn-success');
    public _productLabel = this._select('.product-title.ng-binding');

    constructor (private _page: Page, private _select: Selector = createSelector()) {}

    public async clickBuyButton (product: string): Promise<void> {
        await this._page.waitForSelector(this._productLabel);
        await this._page.waitForSelector(this._buyButton);
        const prod = await this._page.$$(this._productLabel);

        for (let index = 1; index<=prod.length;index++){
            if (await this._page.innerText(`:nth-match(${this._productLabel},${index})`) === product){
                await this._page.click(`:nth-match(${this._buyButton},${index})`)
                break;
            }
        }
    }
}