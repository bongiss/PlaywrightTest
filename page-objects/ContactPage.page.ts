import { Page } from '@playwright/test';
import { createSelector, isPresent, Selector } from '../Helper-package/src';

export class ContactPage {
    private _submit = this._select('a:has-text("Submit")');
    private _headerMessage = this._select('#header-message');
    private _forenameErr = this._select('#forename-err');
    private _emailErr = this._select('#email-err');
    private _inputMessageErr = this._select('#message-err');
    private _foreNameInputTxt = this._select('#forename');
    private _surnameInputTxt = this._select('#surname');
    private _emailInputTxt = this._select('#email');
    private _telephoneInputTxt = this._select('#telephone');
    private _messageInputTxt = this._select('#message');
    private _feedbackSentSuccess = this._select('.alert.alert-success');

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