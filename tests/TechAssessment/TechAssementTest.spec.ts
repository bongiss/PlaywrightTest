import { test, expect } from "@playwright/test";
import { makeString } from "../../utilities/randomStringGenerator";
import { MainPage } from "../../page-objects/Main Page/MainPage";
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

    test("View Popular Car Model and verify Details", async ({page}) => {
        await mainPage.clickPopularModelSection();
        expect(await mainPage.verifyCarEngine()).toBe(true);
        expect(await mainPage.verifyMaxSpeed()).toBe(true);
    });

    test("View Popular Make and view Random Car Model and Details", async ({page}) => {
        await mainPage.clickPopularMakeSection();
        await mainPage.selectCarModel();
        expect(await mainPage.verifyCarEngine()).toBe(true);
        expect(await mainPage.verifyMaxSpeed()).toBe(true);
    });


    test("Vote via Popular Make", async ({page}) => {
        let username = makeString(8);
        await registerPage.register(username,'Morgan','Evangelio','Qwerty.101');
        await registerPage.verifyRegistrationSuccessful();
        await basePage.login(username,'Qwerty.101');
        await mainPage.goto_homepage();
        await mainPage.clickPopularMakeSection();
        await mainPage.selectCarModel();
        await mainPage.enterComment("Popular Make Section");
        expect(await mainPage.voteandverify()).toBe(true);
    });

    test("Vote via popular model", async ({page}) => {
        let username = makeString(8);
        await registerPage.register(username,'Morgan','Evangelio','Qwerty.101');
        await registerPage.verifyRegistrationSuccessful();
        await basePage.login(username,'Qwerty.101');
        await mainPage.goto_homepage();
        await mainPage.clickPopularModelSection();
        await mainPage.enterComment("Popular Model Section");
        expect(await mainPage.voteandverify()).toBe(true);
    });

    test("View Overall Car Rating", async ({page}) => {
        await mainPage.clickOverallRatingSection();
        expect(await mainPage.verifyOverAllRatingTable()).toBe(true);
    });

    test("View and vote a random car in Overall Car Rating Section", async ({page}) => {
        let username = makeString(8);
        await registerPage.register(username,'Morgan','Evangelio','Qwerty.101');
        await registerPage.verifyRegistrationSuccessful();
        await basePage.login(username,'Qwerty.101');
        await mainPage.goto_homepage();
        await mainPage.clickOverallRatingSection();
        await mainPage.selectCarModel();
        await mainPage.enterComment("Overall Rating Section");
        expect(await mainPage.voteandverify()).toBe(true);
    });

    test("Verify comment table", async ({page}) => {
        await mainPage.clickPopularMakeSection();
        await mainPage.selectCarModel();
        expect(await mainPage.verifyAuthorColumn()).not.toEqual('');
    });

    test("Sort by rank desc", async ({page}) => {
        await mainPage.clickOverallRatingSection();
        await mainPage.sortbyRank();
        expect(await mainPage.verifyRankColumn()).toBe("10"); 
    });
        

});
