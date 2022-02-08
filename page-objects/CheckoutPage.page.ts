import { expect, Page } from '@playwright/test';
import { createSelector, Selector } from '../helper-package';

export class CheckoutPage {
    
    private _cartItems = this._select('.cart-item.ng-scope td:nth-child(1)');
    private _cartItemsPrice = this._select('.cart-item.ng-scope td:nth-child(2)');
    private _cartItemsQuantity = this._select('input[name="quantity"]');
    private _cartItemsSubTotal = this._select('.cart-item.ng-scope td:nth-child(4)');
    private _cartTotalAmount = this._select('.total.ng-binding');
    
    constructor (private _page: Page, private _select: Selector = createSelector()) {}

    public async verifyItemInCart (product: string): Promise<boolean> {
        await this._page.waitForSelector(this._cartItems);
        const items = await this._page.$$(this._cartItems);

        for (let index=1; index<=items.length; index++){
            if ((await this._page.innerText(`:nth-match(${this._cartItems},${index})`)).includes(product)){
                return true;
                break;
            }
        }
        
    }

    public async verifyItemPrice (product,price: string): Promise<boolean> {
        await this._page.waitForSelector(this._cartItems);
        const items = await this._page.$$(this._cartItems);

        for (let index=1; index<=items.length; index++){
            if ((await this._page.innerText(`:nth-match(${this._cartItems},${index})`)).includes(product)){
                if ((await this._page.innerText(`:nth-match(${this._cartItemsPrice},${index})`)).includes(price)){
                    return true;
                    break;
                }
            }
        }
        
    }

    public async verifyItemsSubtotal (): Promise<boolean> {
        let checkFlag: number = 0;
        await this._page.waitForSelector(this._cartItems);
        const items = await this._page.$$(this._cartItems);

        for (let index=1; index<=items.length; index++){
            let price: any = parseFloat((await this._page.innerText(`:nth-match(${this._cartItemsPrice},${index})`)).replace('$', ''));
            let quantity: any = parseInt(await this._page.inputValue(`:nth-match(${this._cartItemsQuantity},${index})`));
            let subtotal: any = parseFloat((await this._page.innerText(`:nth-match(${this._cartItemsSubTotal},${index})`)).replace('$', ''));
          
            if (subtotal == (price*quantity)){
                checkFlag = checkFlag + 1;
            }
        }

        if (checkFlag == items.length){
            return true;
        }else{
            return false;
        }
    }

    public async verifyTotalAmount (): Promise<boolean> {
        let totalAmount: number = 0;
        await this._page.waitForSelector(this._cartItems);
        const items = await this._page.$$(this._cartItems);
        let total: any = parseFloat((await this._page.innerText(this._cartTotalAmount)).replace('Total: ', ''));

        for (let index=1; index<=items.length; index++){            
            let subtotal: any = parseFloat((await this._page.innerText(`:nth-match(${this._cartItemsSubTotal},${index})`)).replace('$', ''));
            totalAmount = totalAmount + subtotal;
        }

        if (total == totalAmount){
            return true;
        }else{
            return false;
        }
    }
}