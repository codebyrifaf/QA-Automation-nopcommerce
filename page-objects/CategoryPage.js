class CategoryPage {
  constructor(page) {
    this.page = page;
    this.categoryTitle = page.locator('.category-title h1');
    this.productItems = page.locator('.product-item');
    this.productTitles = page.locator('.product-title a');
    this.productPrices = page.locator('.price');
    this.addToCartButtons = page.locator('.add-to-cart-button');
    this.addToWishlistButtons = page.locator('.add-to-wishlist-button');
    this.addToCompareButtons = page.locator('.add-to-compare-list-button');
    this.sortByDropdown = page.locator('#products-orderby');
    this.displayPerPageDropdown = page.locator('#products-pagesize');
    this.viewAsGrid = page.locator('#products-viewmode .grid');
    this.viewAsList = page.locator('#products-viewmode .list');
    this.breadcrumb = page.locator('.breadcrumb');
    this.pagination = page.locator('.pager');
    this.categoryDescription = page.locator('.category-description');
    this.subcategories = page.locator('.sub-category-item');
    this.productBox = page.locator('.product-box');
    this.priceFilter = page.locator('.price-range-filter');
    this.manufacturerFilter = page.locator('.manufacturer-filter');
    this.specificationFilter = page.locator('.specification-filter');
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async clickProduct(index = 0) {
    await this.productTitles.nth(index).click();
  }

  async addProductToCart(index = 0) {
    await this.addToCartButtons.nth(index).click();
  }

  async addProductToWishlist(index = 0) {
    await this.addToWishlistButtons.nth(index).click();
  }

  async addProductToCompare(index = 0) {
    await this.addToCompareButtons.nth(index).click();
  }

  async sortBy(option) {
    await this.sortByDropdown.selectOption(option);
  }

  async changeDisplayPerPage(option) {
    await this.displayPerPageDropdown.selectOption(option);
  }

  async switchToListView() {
    await this.viewAsList.click();
  }

  async switchToGridView() {
    await this.viewAsGrid.click();
  }

  async getCategoryTitle() {
    return await this.categoryTitle.textContent();
  }

  async getProductTitle(index = 0) {
    return await this.productTitles.nth(index).textContent();
  }

  async getProductPrice(index = 0) {
    return await this.productPrices.nth(index).textContent();
  }

  async clickSubcategory(index = 0) {
    await this.subcategories.nth(index).click();
  }

  async getSubcategoryCount() {
    return await this.subcategories.count();
  }

  async getBreadcrumbText() {
    return await this.breadcrumb.textContent();
  }

  async isPaginationVisible() {
    return await this.pagination.isVisible();
  }

  async clickNextPage() {
    await this.pagination.locator('.next-page').click();
  }

  async clickPreviousPage() {
    await this.pagination.locator('.previous-page').click();
  }
}

module.exports = CategoryPage;
