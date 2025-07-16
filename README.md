# nopCommerce Playwright Test Suite

A comprehensive automated testing suite for the nopCommerce demo site using Playwright framework.

## 🚀 Features

- **Cross-browser Testing**: Chrome, Firefox, Safari, and Mobile
- **Comprehensive Test Coverage**: Login, Registration, Search, Product Management, Cart, Checkout, Navigation, and Contact
- **Page Object Model**: Organized and maintainable test structure
- **Parallel Test Execution**: Fast test execution with configurable parallelization
- **Multiple Reporting**: HTML, JSON, and JUnit reports
- **CI/CD Integration**: GitHub Actions workflow included

## 📁 Project Structure

```
├── page-objects/          # Page Object Model classes
│   ├── HomePage.js        # Home page interactions
│   ├── LoginPage.js       # Login page interactions
│   ├── ProductPage.js     # Product page interactions
│   ├── CartPage.js        # Shopping cart interactions
│   ├── CategoryPage.js    # Category page interactions
│   └── CheckoutPage.js    # Checkout process interactions
├── tests/                 # Test specification files
│   ├── login.spec.js      # Login functionality tests
│   ├── registration.spec.js # Registration tests
│   ├── search.spec.js     # Basic search tests
│   ├── search-enhanced.spec.js # Advanced search tests
│   ├── product.spec.js    # Product management tests
│   ├── cart.spec.js       # Shopping cart tests
│   ├── category.spec.js   # Category navigation tests
│   ├── checkout.spec.js   # Checkout process tests
│   ├── navigation.spec.js # Navigation and UI tests
│   └── contact.spec.js    # Contact and info pages tests
├── test-data/             # Test data and configurations
│   └── testData.js        # Centralized test data
├── test-results/          # Test execution results
├── screenshots/           # Test failure screenshots
├── playwright-report/     # HTML test reports
└── .github/workflows/     # CI/CD configurations
```

## 🧪 Test Coverage

### Authentication & User Management
- ✅ Login functionality (valid/invalid credentials, validation)
- ✅ Registration process (form validation, password confirmation)
- ✅ Remember me functionality
- ✅ Forgot password navigation
- ✅ Security testing (SQL injection, XSS attempts)

### Product Management
- ✅ Product details display
- ✅ Add products to cart (single/multiple quantities)
- ✅ Add to wishlist and compare
- ✅ Product reviews and ratings
- ✅ Email to friend functionality
- ✅ Product specifications display

### Shopping Cart
- ✅ Add/remove items from cart
- ✅ Update quantities
- ✅ Apply discount codes and gift cards
- ✅ Tax and shipping calculations
- ✅ Gift wrapping options
- ✅ Terms and conditions acceptance

### Search & Navigation
- ✅ Basic and advanced search functionality
- ✅ Search filters and sorting
- ✅ Category navigation
- ✅ Breadcrumb navigation
- ✅ Pagination handling
- ✅ Search suggestions/autocomplete

### Checkout Process
- ✅ Guest checkout
- ✅ Billing and shipping address forms
- ✅ Shipping method selection
- ✅ Payment method selection
- ✅ Order summary and confirmation
- ✅ Form validation and error handling

### UI & Navigation
- ✅ Header and footer elements
- ✅ Main navigation menu
- ✅ Responsive design elements
- ✅ Social media links
- ✅ Newsletter subscription
- ✅ Information pages (About, Contact, etc.)

### Contact & Information
- ✅ Contact form functionality
- ✅ Form validation
- ✅ Information pages display
- ✅ Newsletter subscription
- ✅ Social media integration

## 🛠️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright Browsers**
   ```bash
   npm run install-browsers
   ```

3. **Run Tests**
   ```bash
   # Run all tests
   npm test
   
   # Run tests with UI
   npm run test:ui
   
   # Run tests in headed mode
   npm run test:headed
   
   # Run specific test suites
   npm run test:login
   npm run test:product
   npm run test:cart
   ```

## 📊 Test Scripts

### Individual Test Suites
- `npm run test:login` - Login functionality tests
- `npm run test:registration` - User registration tests
- `npm run test:search` - Basic search tests
- `npm run test:search-enhanced` - Advanced search tests
- `npm run test:product` - Product management tests
- `npm run test:cart` - Shopping cart tests
- `npm run test:category` - Category navigation tests
- `npm run test:checkout` - Checkout process tests
- `npm run test:navigation` - Navigation and UI tests
- `npm run test:contact` - Contact and info pages tests

### Test Groups
- `npm run test:smoke` - Smoke tests (login, search, registration)
- `npm run test:e2e` - End-to-end tests (product, cart, checkout)
- `npm run test:ui-components` - UI component tests

### Browser-specific Tests
- `npm run test:chromium` - Chrome browser tests
- `npm run test:firefox` - Firefox browser tests
- `npm run test:webkit` - Safari browser tests
- `npm run test:mobile` - Mobile device tests

## 📋 Configuration

### Playwright Configuration
- **Test Directory**: `./tests`
- **Timeout**: 30 seconds
- **Retries**: 2 (in CI), 0 (locally)
- **Base URL**: `https://demo.nopcommerce.com/`
- **Screenshots**: On failure only
- **Videos**: On failure only
- **Traces**: On first retry

### Supported Browsers
- ✅ Chromium (Desktop Chrome)
- ✅ Firefox (Desktop Firefox)
- ✅ WebKit (Desktop Safari)
- ✅ Mobile (iPhone 12)

## 📈 Reports

After test execution, reports are generated in multiple formats:

1. **HTML Report**: `playwright-report/index.html`
2. **JSON Report**: `test-results.json`
3. **JUnit Report**: `test-results.xml`

View the HTML report:
```bash
npm run show-report
```

## 🔧 CI/CD Integration

GitHub Actions workflow is configured to:
- Run tests on push to `main` and `develop` branches
- Run tests on pull requests to `main`
- Generate and upload test reports as artifacts
- Support multiple environments and parallel execution

## 🎯 Best Practices

1. **Page Object Model**: All page interactions are abstracted into page object classes
2. **Centralized Test Data**: Test data is maintained in a single location
3. **Reusable Components**: Common functionality is shared across test files
4. **Parallel Execution**: Tests are designed to run independently and in parallel
5. **Error Handling**: Comprehensive error handling and retry mechanisms
6. **Security Testing**: Includes tests for common security vulnerabilities

## 🐛 Troubleshooting

### Common Issues

1. **Browser Installation**: Run `npm run install-browsers` if tests fail to start
2. **Timeout Issues**: Increase timeout in `playwright.config.js` if needed
3. **Network Issues**: Check internet connection and proxy settings
4. **Screenshot Issues**: Ensure proper permissions for screenshot directory

### Debug Mode
Run tests in debug mode to step through test execution:
```bash
npm run test:debug
```

## 📝 Contributing

1. Follow the existing page object model structure
2. Add new test data to `test-data/testData.js`
3. Include both positive and negative test scenarios
4. Add appropriate assertions and error handling
5. Update documentation for new features

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [nopCommerce Demo Site](https://demo.nopcommerce.com/)
- [Playwright Documentation](https://playwright.dev/)
- [Test Reports](./playwright-report/index.html)