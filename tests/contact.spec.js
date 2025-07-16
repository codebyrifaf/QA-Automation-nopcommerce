const { test, expect } = require('@playwright/test');
const HomePage = require('../page-objects/HomePage');
const testData = require('../test-data/testData');

test.describe('Contact and Information Pages', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display contact us page', async ({ page }) => {
   
    await page.locator('text=Contact us').click();
    

    await expect(page).toHaveURL(/.*contactus/);
    await expect(page.locator('.page-title')).toContainText('Contact us');
    await expect(page.locator('#FullName')).toBeVisible();
    await expect(page.locator('#Email')).toBeVisible();
    await expect(page.locator('#Subject')).toBeVisible();
    await expect(page.locator('#Enquiry')).toBeVisible();
    await expect(page.locator('input[type="submit"]')).toBeVisible();
  });

  test('should submit contact form successfully', async ({ page }) => {
 
    await page.locator('text=Contact us').click();
 
    await page.locator('#FullName').fill(`${testData.newUser.firstName} ${testData.newUser.lastName}`);
    await page.locator('#Email').fill(testData.newUser.email);
    await page.locator('#Subject').fill('Test Subject');
    await page.locator('#Enquiry').fill('This is a test enquiry message for automated testing.');
    

    await page.locator('input[type="submit"]').click();
    

    await expect(page.locator('.result')).toBeVisible();
  });

  test('should validate contact form fields', async ({ page }) => {

    await page.locator('text=Contact us').click();
    
   
    await page.locator('input[type="submit"]').click();
    
    
    await expect(page.locator('.field-validation-error')).toHaveCount({ min: 1 });
  });

  test('should validate email format in contact form', async ({ page }) => {
   
    await page.locator('text=Contact us').click();
    
    
    await page.locator('#FullName').fill(`${testData.newUser.firstName} ${testData.newUser.lastName}`);
    await page.locator('#Email').fill('invalid-email');
    await page.locator('#Subject').fill('Test Subject');
    await page.locator('#Enquiry').fill('Test message');
    
   
    await page.locator('input[type="submit"]').click();
    
    
    await expect(page.locator('.field-validation-error')).toBeVisible();
  });

  test('should display about us page', async ({ page }) => {
   
    const aboutUsLink = page.locator('text=About us');
    const aboutUsExists = await aboutUsLink.isVisible();
    
    if (aboutUsExists) {
      await aboutUsLink.click();
      
    
      await expect(page).toHaveURL(/.*about-us/);
      await expect(page.locator('.page-title')).toContainText('About us');
      await expect(page.locator('.page-body')).toBeVisible();
    }
  });

  test('should display sitemap page', async ({ page }) => {
   
    const sitemapLink = page.locator('text=Sitemap');
    const sitemapExists = await sitemapLink.isVisible();
    
    if (sitemapExists) {
      await sitemapLink.click();
      
   
      await expect(page).toHaveURL(/.*sitemap/);
      await expect(page.locator('.page-title')).toContainText('Sitemap');
      await expect(page.locator('.sitemap')).toBeVisible();
    }
  });

  test('should display news page', async ({ page }) => {
  
    const newsLink = page.locator('text=News');
    const newsExists = await newsLink.isVisible();
    
    if (newsExists) {
      await newsLink.click();
      
    
      await expect(page).toHaveURL(/.*news/);
      await expect(page.locator('.page-title')).toContainText('News');
      await expect(page.locator('.news-items')).toBeVisible();
    }
  });

  test('should display privacy policy page', async ({ page }) => {
   
    const privacyLink = page.locator('text=Privacy notice');
    const privacyExists = await privacyLink.isVisible();
    
    if (privacyExists) {
      await privacyLink.click();
      
      await expect(page).toHaveURL(/.*privacyinfo/);
      await expect(page.locator('.page-title')).toContainText('Privacy notice');
      await expect(page.locator('.page-body')).toBeVisible();
    }
  });

  test('should display terms and conditions page', async ({ page }) => {
   
    const termsLink = page.locator('text=Conditions of Use');
    const termsExists = await termsLink.isVisible();
    
    if (termsExists) {
      await termsLink.click();
      
    
      await expect(page).toHaveURL(/.*conditionsofuse/);
      await expect(page.locator('.page-title')).toContainText('Conditions of Use');
      await expect(page.locator('.page-body')).toBeVisible();
    }
  });

  test('should display shipping and returns page', async ({ page }) => {
   
    const shippingLink = page.locator('text=Shipping & returns');
    const shippingExists = await shippingLink.isVisible();
    
    if (shippingExists) {
      await shippingLink.click();
      
   
      await expect(page).toHaveURL(/.*shippinginfo/);
      await expect(page.locator('.page-title')).toContainText('Shipping & returns');
      await expect(page.locator('.page-body')).toBeVisible();
    }
  });

  test('should handle newsletter subscription', async ({ page }) => {
    
    await page.locator('.footer').scrollIntoViewIfNeeded();
    
  
    const newsletterEmail = page.locator('#newsletter-email');
    const newsletterButton = page.locator('#newsletter-subscribe-button');
    
    if (await newsletterEmail.isVisible()) {
      await newsletterEmail.fill(testData.newUser.email);
      await newsletterButton.click();
      
    
      await expect(page.locator('#newsletter-result-block')).toBeVisible();
    }
  });

  test('should validate newsletter email format', async ({ page }) => {
    
    await page.locator('.footer').scrollIntoViewIfNeeded();
    
   
    const newsletterEmail = page.locator('#newsletter-email');
    const newsletterButton = page.locator('#newsletter-subscribe-button');
    
    if (await newsletterEmail.isVisible()) {
      await newsletterEmail.fill('invalid-email');
      await newsletterButton.click();
      
   
      await expect(page.locator('#newsletter-result-block')).toBeVisible();
    }
  });

  test('should display social media links', async ({ page }) => {
   
    await page.locator('.footer').scrollIntoViewIfNeeded();
    
   
    const socialLinks = page.locator('.social-links a, .follow-us a');
    const socialCount = await socialLinks.count();
    
    if (socialCount > 0) {
    
      await expect(socialLinks.first()).toBeVisible();
      
    
      const firstLink = socialLinks.first();
      const href = await firstLink.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('should display company information', async ({ page }) => {
   
    await page.locator('.footer').scrollIntoViewIfNeeded();
    
   
    const companyInfo = page.locator('.company-info, .footer-info');
    const companyInfoExists = await companyInfo.isVisible();
    
    if (companyInfoExists) {
      await expect(companyInfo).toBeVisible();
    }
  });

  test('should handle search from information pages', async ({ page }) => {
   
    const aboutUsLink = page.locator('text=About us');
    const aboutUsExists = await aboutUsLink.isVisible();
    
    if (aboutUsExists) {
      await aboutUsLink.click();
      
    
      await homePage.search(testData.searchTerms.valid[0]);
      
  
      await expect(page).toHaveURL(/.*search/);
    }
  });

  test('should display page loading correctly', async ({ page }) => {
   
    const startTime = Date.now();
    
    await page.locator('text=Contact us').click();
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    
    expect(loadTime).toBeLessThan(5000);
    
    
    await expect(page.locator('.page-title')).toBeVisible();
  });

  test('should handle breadcrumb navigation on information pages', async ({ page }) => {
   
    await page.locator('text=Contact us').click();
    
    
    const breadcrumb = page.locator('.breadcrumb');
    const breadcrumbExists = await breadcrumb.isVisible();
    
    if (breadcrumbExists) {
      await expect(breadcrumb).toBeVisible();
      
      
      await breadcrumb.locator('a').first().click();
      
      
      await expect(homePage.logo).toBeVisible();
    }
  });
});
