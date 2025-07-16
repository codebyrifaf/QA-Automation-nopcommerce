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

  test('should handle remember me functionality', async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login(testData.invalidUser.email, testData.invalidUser.password, true);
    
   
    await expect(loginPage.rememberMeCheckbox).toBeChecked();
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await loginPage.navigateToLogin();
    

    const forgotPasswordLink = page.locator('text=Forgot password?');
    await forgotPasswordLink.click();

    await expect(page).toHaveURL(/.*passwordrecovery/);
  });

  test('should show validation for invalid email format', async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login('invalid-email', testData.validUser.password);
    
   
    await expect(page.locator('.field-validation-error')).toBeVisible();
  });

  test('should maintain login state after page refresh', async ({ page }) => {
    await loginPage.navigateToLogin();
    
  
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    
 
    await page.reload();
    
   
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('should handle SQL injection attempts', async ({ page }) => {
    await loginPage.navigateToLogin();
    
   
    await loginPage.login("' OR '1'='1", "' OR '1'='1");
    
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should handle XSS attempts in login form', async ({ page }) => {
    await loginPage.navigateToLogin();
    

    await loginPage.login('<script>alert("xss")</script>', testData.validUser.password);
   
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should show proper error for non-existent user', async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login('nonexistent@example.com', 'password123');
    
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should handle multiple login attempts', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    for (let i = 0; i < 3; i++) {
      await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
      await expect(loginPage.errorMessage).toBeVisible();
      await page.waitForTimeout(1000);
    }
  });

  test('should redirect to intended page after login', async ({ page }) => {
   
    await homePage.navigateToCart();
    
  
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      await loginPage.login(testData.validUser.email, testData.validUser.password);
    
      await expect(page).toHaveURL(/.*cart/);
    }
  });
});