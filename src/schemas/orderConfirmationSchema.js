/**
 * Order Confirmation Schema for Beyond Slim
 * Defines the structure for order confirmation data passed to thank you page
 */

export const orderConfirmationSchema = {
  // Basic order identification
  orderNumber: {
    type: 'string',
    required: true,
    pattern: '^BYD-[0-9]{6}-[0-9]{3}$',
    description: 'Unique order number (e.g., BYD-123456-789)'
  },
  
  orderDate: {
    type: 'string',
    required: true,
    description: 'Order date in local format'
  },
  
  // Product information
  productName: {
    type: 'string',
    required: true,
    description: 'Name of the product ordered'
  },
  
  quantity: {
    type: 'number',
    required: true,
    min: 1,
    description: 'Quantity of product ordered'
  },
  
  totalAmount: {
    type: 'number',
    required: true,
    min: 0,
    description: 'Total amount paid including shipping'
  },
  
  // Payment information
  paymentMethod: {
    type: 'string',
    required: true,
    enum: ['Online Payment', 'Cash on Delivery', 'Razorpay', 'UPI', 'Card Payment'],
    description: 'Payment method used for the order'
  },
  
  transactionId: {
    type: 'string',
    required: true,
    description: 'Transaction ID from payment gateway or COD reference'
  },
  
  // Customer information
  customerName: {
    type: 'string',
    required: true,
    description: 'Full name of the customer'
  },
  
  customerEmail: {
    type: 'string',
    required: true,
    pattern: '^[^@]+@[^@]+\\.[^@]+$',
    description: 'Customer email address'
  },
  
  customerPhone: {
    type: 'string',
    required: true,
    pattern: '^[0-9]{10}$',
    description: 'Customer phone number (10 digits)'
  },
  
  // Shipping information
  shippingAddress: {
    type: 'string',
    required: true,
    description: 'Complete shipping address with line breaks'
  },
  
  // Optional fields for enhanced experience
  estimatedDelivery: {
    type: 'string',
    description: 'Estimated delivery date'
  },
  
  trackingNumber: {
    type: 'string',
    description: 'Shipping tracking number (if available)'
  },
  
  specialInstructions: {
    type: 'string',
    maxLength: 500,
    description: 'Special delivery instructions'
  },
  
  // Promotional information
  discountApplied: {
    type: 'number',
    min: 0,
    description: 'Discount amount applied'
  },
  
  couponCode: {
    type: 'string',
    description: 'Coupon code used (if any)'
  },
  
  // System information
  orderSource: {
    type: 'string',
    enum: ['website', 'mobile_app', 'phone', 'whatsapp'],
    default: 'website',
    description: 'Source of the order'
  },
  
  ipAddress: {
    type: 'string',
    description: 'Customer IP address for fraud prevention'
  },
  
  userAgent: {
    type: 'string',
    description: 'Customer browser/device information'
  },
  
  // Timestamps
  createdAt: {
    type: 'date',
    description: 'Order creation timestamp'
  },
  
  confirmedAt: {
    type: 'date',
    description: 'Order confirmation timestamp'
  }
};

// Validation function for order confirmation data
export const validateOrderConfirmation = (orderData) => {
  const errors = [];
  
  // Required field validation
  if (!orderData.orderNumber) errors.push('Order number is required');
  if (!orderData.orderDate) errors.push('Order date is required');
  if (!orderData.productName) errors.push('Product name is required');
  if (!orderData.customerName) errors.push('Customer name is required');
  if (!orderData.customerEmail) errors.push('Customer email is required');
  if (!orderData.customerPhone) errors.push('Customer phone is required');
  if (!orderData.shippingAddress) errors.push('Shipping address is required');
  if (!orderData.paymentMethod) errors.push('Payment method is required');
  if (!orderData.transactionId) errors.push('Transaction ID is required');
  
  // Type validation
  if (typeof orderData.quantity !== 'number' || orderData.quantity < 1) {
    errors.push('Valid quantity is required (minimum 1)');
  }
  
  if (typeof orderData.totalAmount !== 'number' || orderData.totalAmount < 0) {
    errors.push('Valid total amount is required');
  }
  
  // Format validation
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (orderData.customerEmail && !emailRegex.test(orderData.customerEmail)) {
    errors.push('Invalid email format');
  }
  
  const phoneRegex = /^[0-9]{10}$/;
  if (orderData.customerPhone && !phoneRegex.test(orderData.customerPhone)) {
    errors.push('Phone number must be exactly 10 digits');
  }
  
  const orderNumberRegex = /^BYD-[0-9]{6}-[0-9]{3}$/;
  if (orderData.orderNumber && !orderNumberRegex.test(orderData.orderNumber)) {
    errors.push('Invalid order number format');
  }
  
  // Enum validation
  const validPaymentMethods = ['Online Payment', 'Cash on Delivery', 'Razorpay', 'UPI', 'Card Payment'];
  if (orderData.paymentMethod && !validPaymentMethods.includes(orderData.paymentMethod)) {
    errors.push('Invalid payment method');
  }
  
  const validOrderSources = ['website', 'mobile_app', 'phone', 'whatsapp'];
  if (orderData.orderSource && !validOrderSources.includes(orderData.orderSource)) {
    errors.push('Invalid order source');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Helper function to generate order number
export const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `BYD-${timestamp}-${random}`;
};

// Helper function to format order data for display
export const formatOrderForDisplay = (orderData) => {
  return {
    ...orderData,
    formattedAmount: `₹ ${Number(orderData.totalAmount).toFixed(2)}`,
    formattedDate: new Date(orderData.orderDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    maskedEmail: orderData.customerEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
    maskedPhone: orderData.customerPhone.replace(/(.{2})(.*)(.{2})/, '$1******$3')
  };
};

// Helper function to calculate estimated delivery
export const calculateEstimatedDelivery = (orderDate, businessDays = 7) => {
  const date = new Date(orderDate);
  let daysAdded = 0;
  
  while (daysAdded < businessDays) {
    date.setDate(date.getDate() + 1);
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      daysAdded++;
    }
  }
  
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default orderConfirmationSchema;
