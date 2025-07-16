class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart-item-row');
    this.productName = page.locator('.product-name');
    this.productPrice = page.locator('.product-unit-price');
    this.quantity = page.locator('.qty-input');
    this.updateCartButton = page.locator('.update-cart-button');
    this.removeCheckbox = page.locator('.remove-from-cart input[type="checkbox"]');
    this.updateCartButtonForRemove = page.locator('.update-cart-button');
    this.continueShoppingButton = page.locator('.continue-shopping-button');
    this.checkoutButton = page.locator('#checkout');
    this.termsCheckbox = page.locator('#termsofservice');
    this.subtotal = page.locator('.cart-subtotal');
    this.tax = page.locator('.cart-tax');
    this.total = page.locator('.cart-total');
    this.emptyCartMessage = page.locator('.no-data, .order-summary-content .no-data, .cart .no-data');
    this.giftWrappingDropdown = page.locator('#checkout_attribute_1');
    this.discountBox = page.locator('#discountcouponcode');
    this.applyDiscountButton = page.locator('.apply-discount-coupon-code-button');
    this.giftCardBox = page.locator('#giftcardcouponcode');
    this.applyGiftCardButton = page.locator('.apply-gift-card-coupon-code-button');
  }

  async updateQuantity(itemIndex, newQuantity) {
    await this.quantity.nth(itemIndex).clear();
    await this.quantity.nth(itemIndex).fill(newQuantity.toString());
    await this.updateCartButton.click();
  }

  async removeItem(itemIndex) {
    await this.removeCheckbox.nth(itemIndex).check();
    await this.updateCartButtonForRemove.click();
  }

  async proceedToCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async applyDiscountCode(code) {
    await this.discountBox.fill(code);
    await this.applyDiscountButton.click();
  }

  async applyGiftCard(code) {
    await this.giftCardBox.fill(code);
    await this.applyGiftCardButton.click();
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async getSubtotal() {
    return await this.subtotal.textContent();
  }

  async getTotal() {
    return await this.total.textContent();
  }

  async isCartEmpty() {
    return await this.emptyCartMessage.isVisible();
  }

  async getProductName(index = 0) {
    return await this.productName.nth(index).textContent();
  }

  async selectGiftWrapping(option) {
    await this.giftWrappingDropdown.selectOption(option);
  }
}

module.exports = CartPage;
