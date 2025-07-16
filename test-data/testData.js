const testData = {
  validUser: {
    email: 'testuser@example.com',
    password: 'TestPassword123!'
  },
  
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword'
  },
  
  newUser: {
    firstName: 'John',
    lastName: 'Doe',
    email: `test${Date.now()}@example.com`,
    password: 'TestPassword123!'
  },
  
  searchTerms: {
    valid: ['laptop', 'phone', 'computer', 'book', 'jewelry', 'camera'],
    invalid: ['xyz123nonexistent', 'invalidproduct999', 'notfound123'],
    empty: '',
    special: ['laptop-computer', 'phone & accessories', 'book: title'],
    numeric: ['123', '2023', 'model 5']
  },
  
  products: {
    laptop: 'laptop',
    phone: 'phone',
    camera: 'camera',
    book: 'book',
    jewelry: 'jewelry',
    giftCard: 'gift card'
  },
  
  categories: [
    'Computers',
    'Electronics',
    'Apparel',
    'Digital downloads',
    'Books',
    'Jewelry',
    'Gift Cards'
  ],
  
  billingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    zipCode: '10001',
    phoneNumber: '555-123-4567'
  },
  
  shippingAddress: {
    firstName: 'Jane',
    lastName: 'Smith',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    address1: '456 Oak Avenue',
    address2: 'Suite 200',
    zipCode: '90210',
    phoneNumber: '555-987-6543'
  },
  
  contactForm: {
    fullName: 'Test User',
    email: 'testuser@example.com',
    subject: 'Test Subject',
    enquiry: 'This is a test enquiry message for automated testing purposes.'
  },
  
  newsletter: {
    validEmails: ['test@example.com', 'user@test.com'],
    invalidEmails: ['invalid-email', 'test@', '@example.com']
  },
  
  paymentMethods: {
    creditCard: 'Credit Card',
    paypal: 'PayPal',
    checkMoney: 'Check / Money Order',
    purchaseOrder: 'Purchase Order'
  },
  
  shippingMethods: {
    ground: 'Ground',
    nextDayAir: 'Next Day Air',
    secondDayAir: '2nd Day Air'
  },
  
  discountCodes: {
    valid: ['SAVE10', 'DISCOUNT20'],
    invalid: ['INVALID123', 'EXPIRED456']
  },
  
  giftCardCodes: {
    valid: ['GIFT100', 'GIFT200'],
    invalid: ['INVALID123', 'EXPIRED456']
  },
  
  userProfiles: {
    admin: {
      email: 'admin@example.com',
      password: 'AdminPassword123!'
    },
    customer: {
      email: 'customer@example.com',
      password: 'CustomerPassword123!'
    }
  },
  
  productQuantities: {
    single: 1,
    multiple: 3,
    large: 10,
    maximum: 999
  },
  
  sortOptions: {
    nameAsc: '5',
    nameDesc: '6',
    priceAsc: '10',
    priceDesc: '11',
    createdAsc: '0',
    createdDesc: '1'
  },
  
  displayOptions: {
    perPage: ['3', '6', '9'],
    viewMode: ['grid', 'list']
  },
  
  securityTestData: {
    sqlInjection: ["' OR '1'='1", "'; DROP TABLE users; --"],
    xss: ['<script>alert("xss")</script>', '<img src=x onerror=alert(1)>'],
    longStrings: ['a'.repeat(1000), 'test'.repeat(250)]
  },
  
  performanceTestData: {
    maxLoadTime: 5000,
    maxResponseTime: 3000,
    concurrentUsers: 5
  }
};

module.exports = testData;