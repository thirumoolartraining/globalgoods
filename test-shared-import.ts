// Test file to verify shared module import
import type { Product } from './shared';
import { users, products } from './shared';

// This is a type-only import test
const testProduct: Product = {
  id: 'test',
  name: 'Test Product',
  description: 'Test Description',
  price: '0.00',
  category: 'test',
  weight: '1kg',
  image: '',
  images: [],
  inStock: true,
  isOrganic: false,
  grade: 'A',
  tags: ['test']
};

// Log to verify the module is imported correctly
console.log('Shared module exports:', {
  // Check if types are properly imported
  isProductTypeValid: testProduct ? '✅ Valid' : '❌ Invalid',
  // Check if database tables are available
  usersTable: users ? '✅ Available' : '❌ Missing',
  productsTable: products ? '✅ Available' : '❌ Missing'
});

// This file is just for testing and won't be included in the production build
