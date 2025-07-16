const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/HomePage');
const testData = require('../test-data/testData');

test.describe('Search Functionality', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display search elements', async ({ page }) => {
    await expect(homePage.searchBox).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();
  });

  test('should search with valid term', async ({ page }) => {
    const searchTerm = testData.searchTerms.valid[0];
    await homePage.search(searchTerm);
    
    await expect(page).toHaveURL(/.*search/);
  });

  test('should handle search with no results', async ({ page }) => {
    await homePage.search(testData.searchTerms.invalid[0]);
    

    await expect(page).toHaveURL(/.*search/);
  });
});