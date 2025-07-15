class HomePage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('.search-box-button');
    this.logo = page.locator('.logo');
    this.categories = page.locator('.top-menu a');
    this.featuredProducts = page.locator('.product-item');
    this.registerLink = page.locator('.ico-register');
    this.cartLink = page.locator('.ico-cart');
    this.wishlistLink = page.locator('.ico-wishlist');
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(searchTerm) {
    await this.searchBox.fill(searchTerm);
    await this.searchButton.click();
  }

  async clickCategory(categoryName) {
    await this.categories.filter({ hasText: categoryName }).click();
  }

  async clickFeaturedProduct(index = 0) {
    await this.featuredProducts.nth(index).click();
  }

  async navigateToRegister() {
    await this.registerLink.click();
  }

  async navigateToCart() {
    await this.cartLink.click();
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async isLogoVisible() {
    return await this.logo.isVisible();
  }
}

module.exports = HomePage;