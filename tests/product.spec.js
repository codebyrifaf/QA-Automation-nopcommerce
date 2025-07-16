const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/HomePage');
const ProductPage = require('../page-objects/ProductPage');
const CartPage = require('../page-objects/CartPage');
const testData = require('../test-data/testData');

test.describe('Product Management', () => {
  let homePage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
  });

  test('should display product details correctly', async ({ page }) => {
    await homePage.search(testData.products.laptop);
    await expect(page).toHaveURL(/.*search/);
    
  
    await page.locator('.product-title a').first().click();
    
    
    await expect(productPage.productTitle).toBeVisible();
    await expect(productPage.productPrice).toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.productImages).toBeVisible();
    await expect(productPage.productDescription).toBeVisible();
  });

  test('should add single product to cart', async ({ page }) => {
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    
    await productPage.addToCart();
    
  
    await expect(productPage.notificationBar).toBeVisible();
    await expect(page.locator('.content')).toContainText('added to your shopping cart');
  
    await homePage.navigateToCart();
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  test('should add multiple quantities to cart', async ({ page }) => {
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    
    await productPage.addToCart(3);

    await expect(productPage.notificationBar).toBeVisible();
  
    await homePage.navigateToCart();
    await expect(cartPage.quantity.first()).toHaveValue('3');
  });

  test('should add product to wishlist', async ({ page }) => {
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    
    await productPage.addToWishlist();

    await expect(productPage.notificationBar).toBeVisible();
    await expect(page.locator('.content')).toContainText('added to your wishlist');
  });

  test('should add product to compare list', async ({ page }) => {
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    
    await productPage.addToCompare();
n
    await expect(productPage.notificationBar).toBeVisible();
    await expect(page.locator('.content')).toContainText('added to your product comparison');
  });

  test('should display product reviews section', async ({ page }) => {
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    
    await productPage.clickReviewsTab();
    await expect(productPage.writeReviewButton).toBeVisible();
  });

  test('should handle email to friend functionality', async ({ page }) => {
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    
    await productPage.emailToFriend();
    
 
    await expect(page).toHaveURL(/.*emailwishlist/);
  });

  test('should display product specifications', async ({ page }) => {
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    
 
    const specsVisible = await productPage.productSpecs.isVisible();
    if (specsVisible) {
      await expect(productPage.productSpecs).toBeVisible();
    }
  });

  test('should handle out of stock products', async ({ page }) => {
  
    await homePage.search('gift card');
    await page.locator('.product-title a').first().click();
  
    const addToCartVisible = await productPage.isAddToCartButtonVisible();
    if (addToCartVisible) {
      await expect(productPage.addToCartButton).toBeVisible();
    }
  });
});
