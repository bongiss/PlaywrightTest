import { Page } from '@playwright/test';
import { createSelector, isPresent, Selector } from '../helper-package/src';

export class ContactPage {
    public _submit = this._select('a:has-text("Submit")');
    public _headerMessage = this._select('#header-message');
    public _forenameErr = this._select('#forename-err');
    public _emailErr = this._select('#email-err');
    public _inputMessageErr = this._select('#message-err');
    public _foreNameInputTxt = this._select('#forename');
    public _surnameInputTxt = this._select('#surname');
    public _emailInputTxt = this._select('#email');
    public _telephoneInputTxt = this._select('#telephone');
    public _messageInputTxt = this._select('#message');
    public _feedbackSentSuccess = this._select('.alert.alert-success');

    constructor (private _page: Page, private _select: Selector = createSelector()) {}

    public async clickSubmit (): Promise<void> {
        await this._page.click(this._submit);
    }

    public async errorHeaderMessage (): Promise<string> {
        return await this._page.innerText(this._headerMessage);
    }

    public async forenameErrIsDisplayed (): Promise<boolean> {
        return await isPresent(this._page, this._forenameErr);
    }

    public async forenameErrorText (): Promise<string> {
        return await this._page.innerText(this._forenameErr);
    }

    public async emailErrIsDisplayed (): Promise<boolean> {
        return await isPresent(this._page, this._emailErr);
    }

    public async emailErrText (): Promise<string> {
        return await this._page.innerText(this._emailErr);
    }

    public async inputMessageErrDisplayed (): Promise<boolean> {
        return await isPresent(this._page, this._inputMessageErr);
    }

    public async inputMessageErrText (): Promise<string> {
        return await this._page.innerText(this._inputMessageErr);
    }

    public async enterForname (text: string): Promise<void> {
        await this._page.fill(this._foreNameInputTxt, text);
    }

    public async enterSurname (text: string): Promise<void> {
        await this._page.fill(this._surnameInputTxt, text);
    }

    public async enterEmail (text: string): Promise<void> {
        await this._page.fill(this._emailInputTxt, text);
    }

    public async enterTelephone (text: string): Promise<void> {
        await this._page.fill(this._telephoneInputTxt, text);
    }

    public async enterMessage (text: string): Promise<void> {
        await this._page.fill(this._messageInputTxt, text);
    }

    public async feedbackSuccessMessageDisplayed (): Promise<boolean> {
        await this._page.waitForSelector(this._feedbackSentSuccess);
        return await isPresent(this._page, this._feedbackSentSuccess);
    }

    public async feedbackSuccessMessageText (): Promise<string> {
        return await this._page.innerText(this._feedbackSentSuccess);
    }

}