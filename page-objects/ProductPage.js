class ProductPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('.product-name h1');
    this.productPrice = page.locator('.price-value-27, .price .actual-price, .product-price .price-value');
    this.addToCartButton = page.locator('#add-to-cart-button-27, .add-to-cart-button, button:has-text("Add to cart")');
    this.quantityInput = page.locator('#product_enteredQuantity_27, .qty-input, input[name="addtocart_27.EnteredQuantity"]');
    this.productImages = page.locator('.picture img');
    this.productDescription = page.locator('.short-description');
    this.fullDescription = page.locator('.full-description');
    this.productSpecs = page.locator('.product-specs');
    this.addToWishlistButton = page.locator('#add-to-wishlist-button-27, .add-to-wishlist-button, button:has-text("Add to wishlist")');
    this.addToCompareButton = page.locator('.add-to-compare-list-button, button:has-text("Add to compare list")');
    this.emailFriendButton = page.locator('.email-a-friend-button');
    this.notificationBar = page.locator('#bar-notification');
    this.closeNotificationButton = page.locator('.close');
    this.reviewsTab = page.locator('text=Reviews');
    this.writeReviewButton = page.locator('.write-product-review-button');
  }

  async addToCart(quantity = 1) {
    if (quantity > 1) {
      await this.quantityInput.clear();
      await this.quantityInput.fill(quantity.toString());
    }
    await this.addToCartButton.click();
  }

  async addToWishlist() {
    await this.addToWishlistButton.click();
  }

  async addToCompare() {
    await this.addToCompareButton.click();
  }

  async emailToFriend() {
    await this.emailFriendButton.click();
  }

  async closeNotification() {
    await this.closeNotificationButton.click();
  }

  async getProductTitle() {
    return await this.productTitle.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  async isAddToCartButtonVisible() {
    return await this.addToCartButton.isVisible();
  }

  async isNotificationVisible() {
    return await this.notificationBar.isVisible();
  }

  async clickReviewsTab() {
    await this.reviewsTab.click();
  }

  async clickWriteReview() {
    await this.writeReviewButton.click();
  }
}

module.exports = ProductPage;
