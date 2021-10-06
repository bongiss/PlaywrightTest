import { test, expect } from "@playwright/test";
import { UrlActions } from "../../test-helpers/UrlAction.page";

test.describe('', () => {
    test('', async ({ page }) => {
        const urlActions = new UrlActions(page);
        
        await urlActions.goToUrl('http://jupiter.cloud.planittesting.com/');
    });
});