import { test, expect } from "@playwright/test";
import { UrlActions } from "../../test-helpers/UrlAction.page";

test.describe('Technical Assessment Automation', () => {
    test('Test Case 1', async ({ page }) => {
        const urlActions = new UrlActions(page);
        
        await urlActions.goToUrl('http://jupiter.cloud.planittesting.com/');
        
    });
});