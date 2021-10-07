import { test, expect } from "@playwright/test";
import { ContactPage } from "../../page-objects/ContactPAge.page";
import { TopNav } from "../../page-objects/TopNav.page";
import { UrlActions } from "../../test-helpers/UrlAction.page";

test.describe.parallel('Technical Assessment Automation', () => {
    
    test.beforeEach(async ({ page }) => {
        const urlActions = new UrlActions(page);
        await urlActions.goToUrl('http://jupiter.cloud.planittesting.com/');
      });

    test('Test Case 1', async ({ page }) => {
        const topNav = new TopNav(page);
        const contactPage = new ContactPage(page);

        await topNav.clickContact();
        await contactPage.clickSubmit();
        
        //error text/messages validation
        expect(await contactPage.errorHeaderMessage()).toContain('but we won\'t get it unless you complete the form correctly.');
        expect(await contactPage.forenameErrIsDisplayed()).toEqual(true);
        expect(await contactPage.forenameErrorText()).toContain('Forename is required');
        expect(await contactPage.emailErrIsDisplayed()).toEqual(true);
        expect(await contactPage.emailErrText()).toContain('Email is required');
        expect(await contactPage.inputMessageErrDisplayed()).toEqual(true);
        expect(await contactPage.inputMessageErrText()).toContain('Message is required');

        await contactPage.enterForname('John');
        await contactPage.enterSurname('Example');
        await contactPage.enterEmail('John.Example@planit.net.au');
        await contactPage.enterTelephone('02112345678');
        await contactPage.enterMessage('Hello world');
        await contactPage.clickSubmit();

        expect(await contactPage.feedbackSuccessMessageDisplayed()).toEqual(true);
        expect(await contactPage.feedbackSuccessMessageText()).toContain('we appreciate your feedback.');

    });
    for (let runs of [1,2,3,4,5]){
        test(`Test Case 2 run: ${runs}`, async ({ page }) => {
            const topNav = new TopNav(page);
            const contactPage = new ContactPage(page);
    
            await topNav.clickContact();
            await contactPage.enterForname('John');
            await contactPage.enterSurname('Example');
            await contactPage.enterEmail('John.Example@planit.net.au');
            await contactPage.enterTelephone('02112345678');
            await contactPage.enterMessage('Hello world');
            await contactPage.clickSubmit();
    
            expect(await contactPage.feedbackSuccessMessageDisplayed()).toEqual(true);
            expect(await contactPage.feedbackSuccessMessageText()).toContain('we appreciate your feedback.');
        });
    }
});