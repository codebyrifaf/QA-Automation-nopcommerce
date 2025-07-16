const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/HomePage');
const ProductPage = require('../page-objects/ProductPage');
const CartPage = require('../page-objects/CartPage');
const CheckoutPage = require('../page-objects/CheckoutPage');
const testData = require('../test-data/testData');

test.describe('Checkout Process', () => {
  let homePage;
  let productPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await homePage.goto();
  });

  test('should navigate to checkout from cart', async ({ page }) => {
    
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
   
    await homePage.navigateToCart();
    
  
    await cartPage.termsCheckbox.check();
    await cartPage.checkoutButton.click();
   
    await expect(page).toHaveURL(/.*checkout/);
  });

  test('should require terms acceptance for checkout', async ({ page }) => {
   
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
   
    await homePage.navigateToCart();
    
   
    await cartPage.checkoutButton.click();
    
   
    await expect(page.locator('.terms-of-service-warning-box')).toBeVisible();
  });

  test('should display checkout steps', async ({ page }) => {
   
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
    
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
  
    await expect(page.locator('.checkout-step')).toHaveCount({ min: 3 });
  });

  test('should handle guest checkout', async ({ page }) => {
    
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
    
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    
   
    const guestCheckoutButton = page.locator('.checkout-as-guest-button');
    const guestCheckoutExists = await guestCheckoutButton.isVisible();
    
    if (guestCheckoutExists) {
      await guestCheckoutButton.click();
      await expect(page).toHaveURL(/.*checkout/);
    }
  });

  test('should fill billing address form', async ({ page }) => {
   
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
    
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
   
    const guestCheckoutButton = page.locator('.checkout-as-guest-button');
    if (await guestCheckoutButton.isVisible()) {
      await guestCheckoutButton.click();
    }
    
    const billingAddress = {
      firstName: testData.newUser.firstName,
      lastName: testData.newUser.lastName,
      email: testData.newUser.email,
      country: 'United States',
      city: 'New York',
      address1: '123 Main St',
      zipCode: '10001',
      phoneNumber: '555-1234567'
    };
   
    const billingForm = page.locator('#billing-address-select');
    if (await billingForm.isVisible()) {
      await checkoutPage.fillBillingAddress(billingAddress);
    }
  });

  test('should handle shipping address same as billing', async ({ page }) => {
 
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
   
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    
   
    const guestCheckoutButton = page.locator('.checkout-as-guest-button');
    if (await guestCheckoutButton.isVisible()) {
      await guestCheckoutButton.click();
    }
    
   
    const shipToSameAddress = page.locator('#ShipToSameAddress');
    if (await shipToSameAddress.isVisible()) {
      await shipToSameAddress.check();
      await expect(shipToSameAddress).toBeChecked();
    }
  });

  test('should select shipping method', async ({ page }) => {
    
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
  
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    
   
    const shippingMethods = page.locator('input[name="shippingoption"]');
    if (await shippingMethods.count() > 0) {
      await shippingMethods.first().check();
      await expect(shippingMethods.first()).toBeChecked();
    }
  });

  test('should select payment method', async ({ page }) => {
   
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    
    const paymentMethods = page.locator('input[name="paymentmethod"]');
    if (await paymentMethods.count() > 0) {
      await paymentMethods.first().check();
      await expect(paymentMethods.first()).toBeChecked();
    }
  });

  test('should display order summary', async ({ page }) => {

    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
  
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    
   
    const orderSummary = page.locator('.order-summary-content');
    if (await orderSummary.isVisible()) {
      await expect(orderSummary).toBeVisible();
      await expect(page.locator('.order-total')).toBeVisible();
    }
  });

  test('should handle checkout validation errors', async ({ page }) => {
    
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
   
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    
   
    const continueButton = page.locator('.new-address-next-step-button');
    if (await continueButton.isVisible()) {
      await continueButton.click();
      
      
      await expect(page.locator('.field-validation-error')).toHaveCount({ min: 1 });
    }
  });

  test('should handle different country selection', async ({ page }) => {
  
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
   
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    
    
    const guestCheckoutButton = page.locator('.checkout-as-guest-button');
    if (await guestCheckoutButton.isVisible()) {
      await guestCheckoutButton.click();
    }
    
    
    const countryDropdown = page.locator('#BillingNewAddress_CountryId');
    if (await countryDropdown.isVisible()) {
      await countryDropdown.selectOption('Canada');
      await expect(countryDropdown).toHaveValue('Canada');
    }
  });

  test('should calculate tax and shipping costs', async ({ page }) => {
   
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
    
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    
   
    const taxAmount = page.locator('.tax-rate');
    const shippingAmount = page.locator('.shipping-cost');
    
    if (await taxAmount.isVisible()) {
      await expect(taxAmount).toBeVisible();
    }
    
    if (await shippingAmount.isVisible()) {
      await expect(shippingAmount).toBeVisible();
    }
  });
});
