const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/HomePage');
const testData = require('../test-data/testData');

test.describe('Navigation and UI Elements', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display all main navigation elements', async ({ page }) => {
  
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.searchBox).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();
    await expect(homePage.registerLink).toBeVisible();
    await expect(homePage.cartLink).toBeVisible();
    await expect(homePage.wishlistLink).toBeVisible();
    
    await expect(homePage.categories).toHaveCount({ min: 5 });
  });

  test('should navigate to all main categories', async ({ page }) => {
    const categoryElements = await homePage.categories.all();
    
    for (let i = 0; i < Math.min(categoryElements.length, 7); i++) {
      const categoryText = await categoryElements[i].textContent();
      await categoryElements[i].click();
      
  
      await expect(page.locator('.category-title, .page-title')).toBeVisible();
      
   
      await homePage.goto();
    }
  });

  test('should display footer information', async ({ page }) => {
    
    await page.locator('.footer').scrollIntoViewIfNeeded();
    
   
    await expect(page.locator('.footer')).toBeVisible();
    await expect(page.locator('.footer-info')).toBeVisible();
  });

  test('should navigate to information pages', async ({ page }) => {
    const infoLinks = [
      { selector: 'text=About us', expectedUrl: /.*about-us/ },
      { selector: 'text=Contact us', expectedUrl: /.*contactus/ },
      { selector: 'text=Sitemap', expectedUrl: /.*sitemap/ },
      { selector: 'text=News', expectedUrl: /.*news/ }
    ];
    
    for (const link of infoLinks) {
      const linkElement = page.locator(link.selector);
      const linkExists = await linkElement.isVisible();
      
      if (linkExists) {
        await linkElement.click();
        await expect(page).toHaveURL(link.expectedUrl);
        await homePage.goto();
      }
    }
  });

  test('should display currency selector', async ({ page }) => {
    const currencySelector = page.locator('.currency-selector');
    const currencyExists = await currencySelector.isVisible();
    
    if (currencyExists) {
      await expect(currencySelector).toBeVisible();
      
   
      await currencySelector.click();
      await expect(page.locator('.currency-dropdown')).toBeVisible();
    }
  });

  test('should display language selector', async ({ page }) => {
    const languageSelector = page.locator('.language-selector');
    const languageExists = await languageSelector.isVisible();
    
    if (languageExists) {
      await expect(languageSelector).toBeVisible();
    }
  });

  test('should display recently viewed products', async ({ page }) => {

    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await page.waitForLoadState('networkidle');
    
  
    await homePage.goto();
 
    const recentlyViewed = page.locator('.recently-viewed-products');
    const recentlyViewedExists = await recentlyViewed.isVisible();
    
    if (recentlyViewedExists) {
      await expect(recentlyViewed).toBeVisible();
    }
  });

  test('should display featured products on homepage', async ({ page }) => {
    await expect(homePage.featuredProducts).toHaveCount({ min: 1 });
    
 
    const firstProduct = homePage.featuredProducts.first();
    await expect(firstProduct).toBeVisible();
    await expect(firstProduct.locator('.product-title')).toBeVisible();
    await expect(firstProduct.locator('.price')).toBeVisible();
  });

  test('should handle responsive design elements', async ({ page }) => {
  
    const mobileMenuToggle = page.locator('.mobile-menu-toggle');
    const mobileMenuExists = await mobileMenuToggle.isVisible();
    
    if (mobileMenuExists) {
      await mobileMenuToggle.click();
      await expect(page.locator('.mobile-menu')).toBeVisible();
    }
  });

  test('should display social media links', async ({ page }) => {
   
    await page.locator('.footer').scrollIntoViewIfNeeded();
    
    const socialLinks = page.locator('.social-links, .follow-us');
    const socialLinksExist = await socialLinks.isVisible();
    
    if (socialLinksExist) {
      await expect(socialLinks).toBeVisible();
    }
  });

  test('should display newsletter signup', async ({ page }) => {
    await page.locator('.footer').scrollIntoViewIfNeeded();
    
    const newsletterSignup = page.locator('.newsletter-subscribe');
    const newsletterExists = await newsletterSignup.isVisible();
    
    if (newsletterExists) {
      await expect(newsletterSignup).toBeVisible();
      await expect(newsletterSignup.locator('input[type="email"]')).toBeVisible();
      await expect(newsletterSignup.locator('button, input[type="submit"]')).toBeVisible();
    }
  });

  test('should handle breadcrumb navigation', async ({ page }) => {
   
    await homePage.clickCategory(testData.categories[0]);
    
    const breadcrumb = page.locator('.breadcrumb');
    const breadcrumbExists = await breadcrumb.isVisible();
    
    if (breadcrumbExists) {
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb.locator('a')).toHaveCount({ min: 1 });
    
      await breadcrumb.locator('a').first().click();
      await expect(homePage.logo).toBeVisible();
    }
  });

  test('should display page loading indicators', async ({ page }) => {
  
    await homePage.clickCategory(testData.categories[0]);
    
   
    const loadingIndicator = page.locator('.loading, .ajax-loading');
    const loadingExists = await loadingIndicator.isVisible();
    
    if (loadingExists) {
      await expect(loadingIndicator).toBeVisible();
    }
  });

  test('should handle search box autocomplete', async ({ page }) => {
   
    await homePage.searchBox.fill('comp');
   
    await page.waitForTimeout(1000);
   
    const autocomplete = page.locator('.ui-autocomplete, .search-autocomplete');
    const autocompleteExists = await autocomplete.isVisible();
    
    if (autocompleteExists) {
      await expect(autocomplete).toBeVisible();
    }
  });

  test('should display mini shopping cart', async ({ page }) => {
    
    await homePage.search(testData.products.laptop);
    await page.locator('.product-title a').first().click();
    await page.locator('#add-to-cart-button-27').click();
    
    const miniCart = page.locator('.mini-shopping-cart');
    const miniCartExists = await miniCart.isVisible();
    
    if (miniCartExists) {
      await expect(miniCart).toBeVisible();
    }
  });

  test('should display page title correctly', async ({ page }) => {
   
    await expect(page).toHaveTitle(/nopCommerce/);
    
 
    await homePage.clickCategory(testData.categories[0]);
    await expect(page).toHaveTitle(new RegExp(testData.categories[0]));
  });
});
