/**
 * Test Thank You Page Integration
 * This file demonstrates how to test the thank you page with sample data
 */

import { generateOrderNumber, validateOrderConfirmation, calculateEstimatedDelivery } from '../schemas';

// Sample order data for testing
const sampleOrderData = {
  orderNumber: generateOrderNumber(),
  orderDate: new Date().toLocaleDateString('en-IN'),
  productName: 'Beyond Slim Capsules',
  quantity: 2,
  totalAmount: 7980,
  paymentMethod: 'Online Payment',
  transactionId: 'pay_test_123456789',
  customerName: 'John Doe',
  customerEmail: 'john.doe@example.com',
  customerPhone: '9876543210',
  shippingAddress: '123 Main Street\nMumbai, Maharashtra\nIndia'
};

// Test validation
console.log('Testing Order Confirmation Validation:');
const validationResult = validateOrderConfirmation(sampleOrderData);
console.log('Validation Result:', validationResult);

// Test estimated delivery calculation
console.log('\nTesting Estimated Delivery Calculation:');
const estimatedDelivery = calculateEstimatedDelivery(sampleOrderData.orderDate);
console.log('Estimated Delivery:', estimatedDelivery);

// Test order number generation
console.log('\nTesting Order Number Generation:');
for (let i = 0; i < 5; i++) {
  console.log(`Order ${i + 1}:`, generateOrderNumber());
}

// Export sample data for manual testing
export const testOrderData = sampleOrderData;

// Function to simulate successful checkout and redirect to thank you page
export const simulateCheckoutSuccess = () => {
  // Store test data in localStorage
  localStorage.setItem('beyondSlimOrderSuccess', JSON.stringify(sampleOrderData));
  
  // Navigate to thank you page (this would be done in actual component)
  console.log('Simulated checkout success. Order data stored in localStorage.');
  console.log('Navigate to: /thank-you');
  
  return sampleOrderData;
};

// Function to clear test data
export const clearTestData = () => {
  localStorage.removeItem('beyondSlimOrderSuccess');
  console.log('Test data cleared from localStorage.');
};

// Test different payment methods
export const testPaymentMethods = [
  { ...sampleOrderData, paymentMethod: 'Cash on Delivery', transactionId: 'COD-1234567890' },
  { ...sampleOrderData, paymentMethod: 'Razorpay', transactionId: 'razorpay_test_123' },
  { ...sampleOrderData, paymentMethod: 'UPI', transactionId: 'upi_test_123' },
  { ...sampleOrderData, paymentMethod: 'Card Payment', transactionId: 'card_test_123' }
];

// Test edge cases
export const testEdgeCases = {
  minimumOrder: {
    ...sampleOrderData,
    quantity: 1,
    totalAmount: 3990
  },
  
  largeOrder: {
    ...sampleOrderData,
    quantity: 10,
    totalAmount: 39900
  },
  
  longAddress: {
    ...sampleOrderData,
    shippingAddress: 'Apartment 123, Building Name, Street Address Line 1, Street Address Line 2, Landmark, City, State, Country - 123456'
  },
  
  specialCharacters: {
    ...sampleOrderData,
    customerName: 'Ravi Kumar',
    customerEmail: 'ravi.kumar@example.co.in',
    shippingAddress: 'Flat 2A, Shri Krishna Apartments\nBandra (East), Mumbai - 400051\nMaharashtra, India'
  }
};

export default {
  testOrderData,
  simulateCheckoutSuccess,
  clearTestData,
  testPaymentMethods,
  testEdgeCases
};
