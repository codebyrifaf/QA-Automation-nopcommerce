const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/HomePage');
const testData = require('../test-data/testData');

test.describe('User Registration', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display registration page elements', async ({ page }) => {
    await homePage.navigateToRegister();
    
    await expect(page).toHaveTitle(/Register/);
    await expect(page.locator('#FirstName')).toBeVisible();
    await expect(page.locator('#LastName')).toBeVisible();
    await expect(page.locator('#Email')).toBeVisible();
    await expect(page.locator('#Password')).toBeVisible();
    await expect(page.locator('#ConfirmPassword')).toBeVisible();
    await expect(page.locator('#register-button')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await homePage.navigateToRegister();
    await page.locator('#register-button').click();
    
    // Check for validation errors
    await expect(page.locator('.field-validation-error')).toHaveCount({ min: 1 });
  });
});