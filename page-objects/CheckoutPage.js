class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.billingAddressSection = page.locator('#billing-address-select');
    this.shippingAddressSection = page.locator('#shipping-address-select');
    this.shippingMethodSection = page.locator('#shipping-method-buttons-container');
    this.paymentMethodSection = page.locator('#payment-method-buttons-container');
    this.paymentInfoSection = page.locator('#payment-info-buttons-container');
    this.confirmOrderSection = page.locator('#confirm-order-buttons-container');
    

    this.billingFirstName = page.locator('#BillingNewAddress_FirstName');
    this.billingLastName = page.locator('#BillingNewAddress_LastName');
    this.billingEmail = page.locator('#BillingNewAddress_Email');
    this.billingCountry = page.locator('#BillingNewAddress_CountryId');
    this.billingCity = page.locator('#BillingNewAddress_City');
    this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
    this.billingZipCode = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhoneNumber = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinueButton = page.locator('#billing-buttons-container .new-address-next-step-button');
    

    this.shippingContinueButton = page.locator('#shipping-buttons-container .new-address-next-step-button');
    this.shipToSameAddressCheckbox = page.locator('#ShipToSameAddress');
    

    this.shippingMethodOptions = page.locator('input[name="shippingoption"]');
    this.shippingMethodContinueButton = page.locator('#shipping-method-buttons-container .shipping-method-next-step-button');

    this.paymentMethodOptions = page.locator('input[name="paymentmethod"]');
    this.paymentMethodContinueButton = page.locator('#payment-method-buttons-container .payment-method-next-step-button');

    this.paymentInfoContinueButton = page.locator('#payment-info-buttons-container .payment-info-next-step-button');
    

    this.confirmOrderButton = page.locator('#confirm-order-buttons-container .confirm-order-next-step-button');
    this.orderSummary = page.locator('.order-summary-content');
    this.orderTotal = page.locator('.order-total');

    this.orderCompleteTitle = page.locator('.order-completed .title');
    this.orderNumber = page.locator('.order-number');
    this.continueButton = page.locator('.order-completed-continue-button');
  }

  async fillBillingAddress(address) {
    await this.billingFirstName.fill(address.firstName);
    await this.billingLastName.fill(address.lastName);
    await this.billingEmail.fill(address.email);
    await this.billingCountry.selectOption(address.country);
    await this.billingCity.fill(address.city);
    await this.billingAddress1.fill(address.address1);
    await this.billingZipCode.fill(address.zipCode);
    await this.billingPhoneNumber.fill(address.phoneNumber);
    await this.billingContinueButton.click();
  }

  async continueShipping() {
    await this.shippingContinueButton.click();
  }

  async selectShippingMethod(index = 0) {
    await this.shippingMethodOptions.nth(index).check();
    await this.shippingMethodContinueButton.click();
  }

  async selectPaymentMethod(index = 0) {
    await this.paymentMethodOptions.nth(index).check();
    await this.paymentMethodContinueButton.click();
  }

  async continuePaymentInfo() {
    await this.paymentInfoContinueButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async getOrderNumber() {
    return await this.orderNumber.textContent();
  }

  async getOrderTotal() {
    return await this.orderTotal.textContent();
  }

  async isOrderComplete() {
    return await this.orderCompleteTitle.isVisible();
  }

  async continueShopping() {
    await this.continueButton.click();
  }

  async checkShipToSameAddress() {
    await this.shipToSameAddressCheckbox.check();
  }
}

module.exports = CheckoutPage;
