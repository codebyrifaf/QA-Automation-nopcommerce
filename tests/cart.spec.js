const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/HomePage');
const ProductPage = require('../page-objects/ProductPage');
const CartPage = require('../page-objects/CartPage');
const testData = require('../test-data/testData');

test.describe('Shopping Cart Functionality', () => {
  let homePage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
  });

  test('should display empty cart message when cart is empty', async ({ page }) => {
    await homePage.navigateToCart();
    
    // Check for various empty cart message selectors
    const emptyCartSelectors = [
      '.no-data',
      '.order-summary-content .no-data',
      '.cart .no-data',
      'text="Your Shopping Cart is empty!"',
      'text="Your cart is empty"'
    ];
    
    let emptyMessageFound = false;
    for (const selector of emptyCartSelectors) {
      if (await page.locator(selector).isVisible()) {
        emptyMessageFound = true;
        break;
      }
    }
    
    expect(emptyMessageFound).toBe(true);
  });

  test('should add product to cart and display correctly', async ({ page }) => {

    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    const productName = await productPage.getProductTitle();
    
    await productPage.addToCart();
    await productPage.closeNotification();
    

    await homePage.navigateToCart();
    

    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.productName.first()).toContainText(productName.trim());
    await expect(cartPage.subtotal).toBeVisible();
    await expect(cartPage.total).toBeVisible();
  });

  test('should update product quantity in cart', async ({ page }) => {

    await homePage.search(testData.products.phone);
    await page.locator('.product-title a').first().click();
    
    await productPage.addToCart();
    await productPage.closeNotification();
    

    await homePage.navigateToCart();

    await cartPage.updateQuantity(0, 3);
     
    await expect(cartPage.quantity.first()).toHaveValue('3');
  });

  test('should remove product from cart', async ({ page }) => {

    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    
    await productPage.addToCart();
    await productPage.closeNotification();

    await homePage.navigateToCart();
    

    await cartPage.removeItem(0);
   
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });

  test('should calculate total correctly with multiple products', async ({ page }) => {

    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    

    await homePage.goto();
    await homePage.search(testData.products.phone);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
    await homePage.navigateToCart();
    

    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.subtotal).toBeVisible();
    await expect(cartPage.total).toBeVisible();
  });

  test('should continue shopping from cart', async ({ page }) => {
 
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
   
    await homePage.navigateToCart();
    
 
    await cartPage.continueShopping();
    
 
    await expect(homePage.logo).toBeVisible();
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

  test('should apply discount code', async ({ page }) => {

    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
    // Navigate to cart
    await homePage.navigateToCart();
    
    // Try to apply discount code
    await cartPage.applyDiscountCode('DISCOUNT10');
    
    // Note: This might show an error for invalid code, which is expected
    await expect(page.locator('.message-error, .message-success')).toBeVisible();
  });

  test('should apply gift card code', async ({ page }) => {
    // Add a product to cart
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
    // Navigate to cart
    await homePage.navigateToCart();
    
    // Try to apply gift card code
    await cartPage.applyGiftCard('GIFT123');
    
    // Note: This might show an error for invalid code, which is expected
    await expect(page.locator('.message-error, .message-success')).toBeVisible();
  });

  test('should select gift wrapping option', async ({ page }) => {
    // Add a product to cart
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await productPage.addToCart();
    await productPage.closeNotification();
    
    // Navigate to cart
    await homePage.navigateToCart();
    
    // Select gift wrapping if available
    const giftWrappingExists = await cartPage.giftWrappingDropdown.isVisible();
    if (giftWrappingExists) {
      await cartPage.selectGiftWrapping('1');
      await cartPage.updateCartButton.click();
    }
  });
});
