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
    
   
    await expect(page.locator('.field-validation-error')).toHaveCount({ min: 1 });
  });

  test('should complete successful registration', async ({ page }) => {
    await homePage.navigateToRegister();
    
   
    await page.locator('#FirstName').fill(testData.newUser.firstName);
    await page.locator('#LastName').fill(testData.newUser.lastName);
    await page.locator('#Email').fill(testData.newUser.email);
    await page.locator('#Password').fill(testData.newUser.password);
    await page.locator('#ConfirmPassword').fill(testData.newUser.password);
    
    await page.locator('#register-button').click();
    

    await expect(page.locator('.result, .registration-result')).toBeVisible();
  });

  test('should validate password confirmation', async ({ page }) => {
    await homePage.navigateToRegister();
    
    await page.locator('#FirstName').fill(testData.newUser.firstName);
    await page.locator('#LastName').fill(testData.newUser.lastName);
    await page.locator('#Email').fill(testData.newUser.email);
    await page.locator('#Password').fill(testData.newUser.password);
    await page.locator('#ConfirmPassword').fill('different-password');
    
    await page.locator('#register-button').click();
    
    await expect(page.locator('.field-validation-error')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await homePage.navigateToRegister();
    
    await page.locator('#FirstName').fill(testData.newUser.firstName);
    await page.locator('#LastName').fill(testData.newUser.lastName);
    await page.locator('#Email').fill('invalid-email');
    await page.locator('#Password').fill(testData.newUser.password);
    await page.locator('#ConfirmPassword').fill(testData.newUser.password);
    
    await page.locator('#register-button').click();
 
    await expect(page.locator('.field-validation-error')).toBeVisible();
  });

  test('should validate password strength', async ({ page }) => {
    await homePage.navigateToRegister();
    
    await page.locator('#FirstName').fill(testData.newUser.firstName);
    await page.locator('#LastName').fill(testData.newUser.lastName);
    await page.locator('#Email').fill(testData.newUser.email);
    await page.locator('#Password').fill('weak');
    await page.locator('#ConfirmPassword').fill('weak');
    
    await page.locator('#register-button').click();
    
   
    await expect(page.locator('.field-validation-error')).toBeVisible();
  });

  test('should handle existing email registration', async ({ page }) => {
    await homePage.navigateToRegister();
    
    await page.locator('#FirstName').fill(testData.newUser.firstName);
    await page.locator('#LastName').fill(testData.newUser.lastName);
    await page.locator('#Email').fill(testData.validUser.email);
    await page.locator('#Password').fill(testData.newUser.password);
    await page.locator('#ConfirmPassword').fill(testData.newUser.password);
    
    await page.locator('#register-button').click();
 
    await expect(page.locator('.validation-summary-errors, .field-validation-error')).toBeVisible();
  });

  test('should handle optional fields', async ({ page }) => {
    await homePage.navigateToRegister();
    
   
    const genderMale = page.locator('#Gender_Male');
    const genderFemale = page.locator('#Gender_Female');
    const dateOfBirth = page.locator('#DateOfBirth');
    const companyName = page.locator('#Company');
    const newsletter = page.locator('#Newsletter');
    
    if (await genderMale.isVisible()) {
      await genderMale.check();
    }
    
    if (await dateOfBirth.isVisible()) {
      await dateOfBirth.fill('01/01/1990');
    }
    
    if (await companyName.isVisible()) {
      await companyName.fill('Test Company');
    }
    
    if (await newsletter.isVisible()) {
      await newsletter.check();
    }
    

    await page.locator('#FirstName').fill(testData.newUser.firstName);
    await page.locator('#LastName').fill(testData.newUser.lastName);
    await page.locator('#Email').fill(testData.newUser.email);
    await page.locator('#Password').fill(testData.newUser.password);
    await page.locator('#ConfirmPassword').fill(testData.newUser.password);
    
    await page.locator('#register-button').click();
    
    await expect(page.locator('.result, .registration-result')).toBeVisible();
  });

  test('should validate required field marking', async ({ page }) => {
    await homePage.navigateToRegister();
   
    await expect(page.locator('label[for="FirstName"]')).toContainText('*');
    await expect(page.locator('label[for="LastName"]')).toContainText('*');
    await expect(page.locator('label[for="Email"]')).toContainText('*');
    await expect(page.locator('label[for="Password"]')).toContainText('*');
    await expect(page.locator('label[for="ConfirmPassword"]')).toContainText('*');
  });

  test('should handle terms and conditions', async ({ page }) => {
    await homePage.navigateToRegister();
    
    const termsLink = page.locator('text=Terms of service');
    const termsExists = await termsLink.isVisible();
    
    if (termsExists) {
      await termsLink.click();
      await expect(page).toHaveURL(/.*conditions/);
    }
  });

  test('should handle privacy policy link', async ({ page }) => {
    await homePage.navigateToRegister();
    
    const privacyLink = page.locator('text=Privacy policy');
    const privacyExists = await privacyLink.isVisible();
    
    if (privacyExists) {
      await privacyLink.click();
      await expect(page).toHaveURL(/.*privacy/);
    }
  });
});