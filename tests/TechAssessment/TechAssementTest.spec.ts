import { test, expect } from "@playwright/test";
import { makeString } from "../../utilities/randomStringGenerator";
import { MainPage } from "../../page-objects/Main Page/MainPage";
import { ProductsPage } from "../../page-objects/Products Page/ProductsPage";
import { RegisterPage } from "../../page-objects/Register Page/RegisterPage";
import BasePage  from "../../page-objects/BasePage";


test.describe("Buggy Cars E2E:", () => {

    let basePage,registerPage,mainPage,productsPage,checkoutPage: any;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        registerPage = new RegisterPage(page);
        mainPage = new MainPage(page);
        await page.goto('https://buggy.justtestit.org/');
    });
        
    test("Successful Register and Login", async ({page}) => {
        let username = makeString(8);
        await registerPage.register(username,'Morgan','Evangelio','Qwerty.101');
        expect(await registerPage.verifyRegistrationSuccessful()).toBe(true);
        await basePage.login(username,'Qwerty.101');
        expect(await basePage.verifyUserhasloggedIn()).toBe(true);
    });

    test("Registration Error", async ({page}) => {
        let username = makeString(8);
        await registerPage.register(username,'Morgan','Evangelio','Qwerty.101');
        expect(await registerPage.verifyRegistrationSuccessful()).toBe(true);
        await registerPage.register(username,'Morgan','Evangelio','Qwerty.101');
        expect(await registerPage.verifyRegistrationError()).toBe(true);

    });

    test("Login Error", async ({page}) => {
        let username = makeString(8);
        await registerPage.register(username,'Morgan','Evangelio','Qwerty.101');
        expect(await registerPage.verifyRegistrationSuccessful()).toBe(true);
        await basePage.login(username+'1','Qwerty.101');
        expect(await registerPage.loginError()).toBe(true);

    });

    test.only("Popular Vote", async ({page}) => {
        let username = makeString(8);
        await registerPage.register(username,'Morgan','Evangelio','Qwerty.101');
        await basePage.login(username,'Qwerty.101');
        await mainPage.goto_homepage();
        await mainPage.clickPopularMake();
        await mainPage.clickCarModel();
        await mainPage.enterComment();

    });

});
