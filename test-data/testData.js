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
    valid: ['laptop', 'phone', 'computer'],
    invalid: ['xyz123nonexistent'],
    empty: ''
  },
  
  products: {
    laptop: 'laptop',
    phone: 'phone',
    camera: 'camera'
  },
  
  categories: [
    'Computers',
    'Electronics',
    'Apparel',
    'Digital downloads',
    'Books',
    'Jewelry',
    'Gift Cards'
  ]
};

module.exports = testData;