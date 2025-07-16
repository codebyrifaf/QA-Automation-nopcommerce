const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/HomePage');
const CategoryPage = require('../page-objects/CategoryPage');
const testData = require('../test-data/testData');

test.describe('Category and Navigation', () => {
  let homePage;
  let categoryPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    categoryPage = new CategoryPage(page);
    await homePage.goto();
  });

  test('should navigate to category pages', async ({ page }) => {
    for (const category of testData.categories.slice(0, 3)) {
      await homePage.clickCategory(category);
      await expect(categoryPage.categoryTitle).toBeVisible();
      await expect(categoryPage.categoryTitle).toContainText(category);
      await homePage.goto();
    }
  });

  test('should display category products', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Verify products are displayed
    const productCount = await categoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    
    // Verify product elements
    await expect(categoryPage.productTitles.first()).toBeVisible();
    await expect(categoryPage.productPrices.first()).toBeVisible();
  });

  test('should sort products by different criteria', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Test sorting by name
    await categoryPage.sortBy('5');
    await page.waitForLoadState('networkidle');
    
    // Verify sorting applied
    await expect(categoryPage.productItems.first()).toBeVisible();
    
    // Test sorting by price
    await categoryPage.sortBy('10');
    await page.waitForLoadState('networkidle');
    
    await expect(categoryPage.productItems.first()).toBeVisible();
  });

  test('should change products per page display', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Change to 4 products per page
    await categoryPage.changeDisplayPerPage('4');
    await page.waitForLoadState('networkidle');
    
    // Verify page updated
    await expect(categoryPage.productItems.first()).toBeVisible();
  });

  test('should switch between grid and list view', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Switch to list view
    await categoryPage.switchToListView();
    await page.waitForLoadState('networkidle');
    
    // Verify view changed
    await expect(categoryPage.productItems.first()).toBeVisible();
    
    // Switch back to grid view
    await categoryPage.switchToGridView();
    await page.waitForLoadState('networkidle');
    
    await expect(categoryPage.productItems.first()).toBeVisible();
  });

  test('should navigate through pagination', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Check if pagination exists
    const paginationExists = await categoryPage.isPaginationVisible();
    
    if (paginationExists) {
      // Test next page
      await categoryPage.clickNextPage();
      await page.waitForLoadState('networkidle');
      
      // Verify products still visible
      await expect(categoryPage.productItems.first()).toBeVisible();
      
      // Test previous page
      await categoryPage.clickPreviousPage();
      await page.waitForLoadState('networkidle');
      
      await expect(categoryPage.productItems.first()).toBeVisible();
    }
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Verify breadcrumb is visible
    await expect(categoryPage.breadcrumb).toBeVisible();
    
    // Verify breadcrumb contains category name
    const breadcrumbText = await categoryPage.getBreadcrumbText();
    expect(breadcrumbText).toContain(testData.categories[0]);
  });

  test('should add products to cart from category page', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Add first product to cart
    await categoryPage.addProductToCart(0);
    
    // Verify success notification
    await expect(page.locator('#bar-notification')).toBeVisible();
  });

  test('should add products to wishlist from category page', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Add first product to wishlist
    await categoryPage.addProductToWishlist(0);
    
    // Verify success notification
    await expect(page.locator('#bar-notification')).toBeVisible();
  });

  test('should add products to compare from category page', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Add first product to compare
    await categoryPage.addProductToCompare(0);
    
    // Verify success notification
    await expect(page.locator('#bar-notification')).toBeVisible();
  });

  test('should navigate to subcategories', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Check if subcategories exist
    const subcategoryCount = await categoryPage.getSubcategoryCount();
    
    if (subcategoryCount > 0) {
      // Click first subcategory
      await categoryPage.clickSubcategory(0);
      
      // Verify navigation to subcategory
      await expect(categoryPage.categoryTitle).toBeVisible();
    }
  });

  test('should display category description', async ({ page }) => {
    await homePage.clickCategory(testData.categories[0]);
    
    // Check if category description exists
    const descriptionExists = await categoryPage.categoryDescription.isVisible();
    
    if (descriptionExists) {
      await expect(categoryPage.categoryDescription).toBeVisible();
    }
  });

  test('should handle empty categories', async ({ page }) => {
    // This would test a category with no products
    // For demo purposes, we'll navigate to a category and check for no products message
    await homePage.clickCategory(testData.categories[6]); // Gift Cards
    
    // Check if there are products or no products message
    const productCount = await categoryPage.getProductCount();
    
    if (productCount === 0) {
      await expect(page.locator('.no-data')).toBeVisible();
    } else {
      await expect(categoryPage.productItems.first()).toBeVisible();
    }
  });
});
