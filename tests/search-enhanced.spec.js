const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/HomePage');
const testData = require('../test-data/testData');

test.describe('Enhanced Search Functionality', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should search with multiple valid terms', async ({ page }) => {
    for (const term of testData.searchTerms.valid) {
      await homePage.search(term);
      await expect(page).toHaveURL(/.*search/);
      await expect(page.locator('.search-results')).toBeVisible();
      await homePage.goto();
    }
  });

  test('should handle case-insensitive search', async ({ page }) => {
    const searchTerm = testData.searchTerms.valid[0];
    

    await homePage.search(searchTerm.toUpperCase());
    await expect(page).toHaveURL(/.*search/);
    
    await homePage.goto();
    await homePage.search(searchTerm.toLowerCase());
    await expect(page).toHaveURL(/.*search/);
  });

  test('should search with special characters', async ({ page }) => {
    const specialSearchTerms = ['laptop-computer', 'phone & accessories', 'book: title'];
    
    for (const term of specialSearchTerms) {
      await homePage.search(term);
      await expect(page).toHaveURL(/.*search/);
      await homePage.goto();
    }
  });

  test('should handle very long search terms', async ({ page }) => {
    const longSearchTerm = 'a'.repeat(100);
    await homePage.search(longSearchTerm);
    await expect(page).toHaveURL(/.*search/);
  });

  test('should handle search with numbers', async ({ page }) => {
    const numericSearchTerms = ['123', '2023', 'model 5'];
    
    for (const term of numericSearchTerms) {
      await homePage.search(term);
      await expect(page).toHaveURL(/.*search/);
      await homePage.goto();
    }
  });

  test('should display search results count', async ({ page }) => {
    await homePage.search(testData.searchTerms.valid[0]);
    

    const resultsInfo = page.locator('.search-results-info, .pager-info');
    await expect(resultsInfo).toBeVisible();
  });

  test('should search using Enter key', async ({ page }) => {
    await homePage.searchBox.fill(testData.searchTerms.valid[0]);
    await homePage.searchBox.press('Enter');
    
    await expect(page).toHaveURL(/.*search/);
  });

  test('should maintain search term in search box after search', async ({ page }) => {
    const searchTerm = testData.searchTerms.valid[0];
    await homePage.search(searchTerm);
    

    await expect(page.locator('#small-searchterms')).toHaveValue(searchTerm);
  });

  test('should handle empty search gracefully', async ({ page }) => {
    await homePage.search('');
    
    await expect(page).toHaveURL(/.*search/);
  });

  test('should search from different pages', async ({ page }) => {

    await page.locator('.ico-login').click();

    await homePage.search(testData.searchTerms.valid[0]);
    await expect(page).toHaveURL(/.*search/);
    
  
    await homePage.goto();
    await page.locator('.ico-register').click();
    
  
    await homePage.search(testData.searchTerms.valid[1]);
    await expect(page).toHaveURL(/.*search/);
  });

  test('should sort search results', async ({ page }) => {
    await homePage.search(testData.searchTerms.valid[0]);

    const sortDropdown = page.locator('#products-orderby');
    const sortExists = await sortDropdown.isVisible();
    
    if (sortExists) {
      await sortDropdown.selectOption('10'); // Sort by price
      await page.waitForLoadState('networkidle');
      

      await expect(page.locator('.product-item')).toHaveCount({ min: 1 });
    }
  });

  test('should filter search results', async ({ page }) => {
    await homePage.search(testData.searchTerms.valid[0]);
    
   
    const priceFilter = page.locator('.price-range-filter');
    const manufacturerFilter = page.locator('.manufacturer-filter');
    
    if (await priceFilter.isVisible()) {

      await priceFilter.locator('input[type="checkbox"]').first().check();
      await page.waitForLoadState('networkidle');
    }
    
    if (await manufacturerFilter.isVisible()) {

      await manufacturerFilter.locator('input[type="checkbox"]').first().check();
      await page.waitForLoadState('networkidle');
    }
  });

  test('should paginate through search results', async ({ page }) => {
    await homePage.search(testData.searchTerms.valid[0]);
    

    const pagination = page.locator('.pager');
    const paginationExists = await pagination.isVisible();
    
    if (paginationExists) {
    
      const nextPage = pagination.locator('.next-page');
      if (await nextPage.isVisible()) {
        await nextPage.click();
        await page.waitForLoadState('networkidle');
        
        await expect(page).toHaveURL(/.*search/);
      }
    }
  });

  test('should search for products in specific categories', async ({ page }) => {
   
    await homePage.search('computer');
    

    const categoryFilter = page.locator('.category-filter');
    if (await categoryFilter.isVisible()) {
      await categoryFilter.locator('input[type="checkbox"]').first().check();
      await page.waitForLoadState('networkidle');
    }
  });

  test('should handle search suggestions/autocomplete', async ({ page }) => {
  
    await homePage.searchBox.fill('lap');
  
    const suggestions = page.locator('.ui-autocomplete, .search-suggestions');
    const suggestionsExist = await suggestions.isVisible();
    
    if (suggestionsExist) {
   
      await suggestions.locator('li').first().click();
      await expect(page).toHaveURL(/.*search/);
    }
  });
});
