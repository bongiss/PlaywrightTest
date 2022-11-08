import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../../page-objects/CheckoutPage.page";
import { ContactPage } from "../../page-objects/ContactPage.page";
import { ShopPage } from "../../page-objects/ShopPage.page";
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
    test('Test Case 3', async ({ page }) => {
        const topNav = new TopNav(page);
        const shopPage = new ShopPage(page);
        const checkoutPage = new CheckoutPage(page);

        await topNav.clickShop();
        await shopPage.clickBuyButton('Funny Cow');
        await shopPage.clickBuyButton('Funny Cow');
        await shopPage.clickBuyButton('Fluffy Bunny');
        await topNav.clickCart();
        expect(await checkoutPage.verifyItemInCart('Funny Cow')).toEqual(true);
        expect(await checkoutPage.verifyItemInCart('Fluffy Bunny')).toEqual(true);
    });
    test('Test Case 4', async ({ page }) => {
        const topNav = new TopNav(page);
        const shopPage = new ShopPage(page);
        const checkoutPage = new CheckoutPage(page);

        await topNav.clickShop();
        await shopPage.clickBuyButton('Stuffed Frog');
        await shopPage.clickBuyButton('Stuffed Frog');
        await shopPage.clickBuyButton('Fluffy Bunny');
        await shopPage.clickBuyButton('Fluffy Bunny');
        await shopPage.clickBuyButton('Fluffy Bunny');
        await shopPage.clickBuyButton('Fluffy Bunny');
        await shopPage.clickBuyButton('Fluffy Bunny');
        await shopPage.clickBuyButton('Valentine Bear');
        await shopPage.clickBuyButton('Valentine Bear');
        await shopPage.clickBuyButton('Valentine Bear');
        await topNav.clickCart();
        expect(await checkoutPage.verifyItemInCart('Stuffed Frog')).toEqual(true);
        expect(await checkoutPage.verifyItemInCart('Fluffy Bunny')).toEqual(true);
        expect(await checkoutPage.verifyItemInCart('Valentine Bear')).toEqual(true);

        expect(await checkoutPage.verifyItemPrice('Stuffed Frog','10.99')).toEqual(true);
        expect(await checkoutPage.verifyItemPrice('Fluffy Bunny','9.99')).toEqual(true);
        expect(await checkoutPage.verifyItemPrice('Valentine Bear','14.99')).toEqual(true);

        expect(await checkoutPage.verifyItemsSubtotal()).toEqual(true);
        expect(await checkoutPage.verifyTotalAmount()).toEqual(true);
    });
});