const { test, expect } = require('@playwright/test');
const LoginPage = require('../page-objects/LoginPage');
const HomePage = require('../page-objects/HomePage');
const testData = require('../test-data/testData');

test.describe('Login Functionality', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display login page elements', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    await expect(page).toHaveTitle(/Login/);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
    
    // Check for error message
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should show error for empty fields', async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.loginButton.click();
    
    // Check for validation messages
    await expect(page.locator('.field-validation-error')).toHaveCount({ min: 1 });
  });
});