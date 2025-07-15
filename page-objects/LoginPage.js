class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.locator('.ico-login');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('button[type="submit"]').filter({ hasText: 'Log in' });
    this.rememberMeCheckbox = page.locator('#RememberMe');
    this.errorMessage = page.locator('.validation-summary-errors');
    this.myAccountLink = page.locator('.ico-account');
    this.logoutLink = page.locator('.ico-logout');
  }

  async navigateToLogin() {
    await this.loginLink.click();
  }

  async login(email, password, rememberMe = false) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isLoggedIn() {
    return await this.myAccountLink.isVisible();
  }
}

module.exports = LoginPage;