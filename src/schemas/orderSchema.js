/**
 * Order Schema for Beyond Slim
 * Defines the structure for order data in the application
 */

export const orderSchema = {
  // Basic order information
  id: {
    type: 'string',
    required: true,
    description: 'Unique order identifier'
  },
  
  orderNumber: {
    type: 'string',
    required: true,
    description: 'Human-readable order number (e.g., BS2025001)'
  },
  
  // Customer information
  customer: {
    type: 'object',
    required: true,
    properties: {
      id: {
        type: 'string',
        description: 'Customer ID (if registered user)'
      },
      firstName: {
        type: 'string',
        required: true,
        maxLength: 50,
        description: 'Customer first name'
      },
      lastName: {
        type: 'string',
        required: true,
        maxLength: 50,
        description: 'Customer last name'
      },
      email: {
        type: 'string',
        required: true,
        pattern: '^[^@]+@[^@]+\\.[^@]+$',
        description: 'Customer email address'
      },
      phone: {
        type: 'string',
        required: true,
        pattern: '^[+]?[0-9]{10,15}$',
        description: 'Customer phone number'
      }
    }
  },
  
  // Order items
  items: {
    type: 'array',
    required: true,
    minItems: 1,
    items: {
      type: 'object',
      properties: {
        productId: {
          type: 'string',
          required: true,
          description: 'Product identifier'
        },
        productName: {
          type: 'string',
          required: true,
          description: 'Product name at time of order'
        },
        quantity: {
          type: 'number',
          required: true,
          min: 1,
          description: 'Quantity ordered'
        },
        unitPrice: {
          type: 'number',
          required: true,
          min: 0,
          description: 'Price per unit at time of order'
        },
        totalPrice: {
          type: 'number',
          required: true,
          min: 0,
          description: 'Total price for this item (quantity × unitPrice)'
        },
        productImage: {
          type: 'string',
          description: 'Product image URL'
        }
      }
    },
    description: 'List of ordered items'
  },
  
  // Shipping address
  shippingAddress: {
    type: 'object',
    required: true,
    properties: {
      firstName: {
        type: 'string',
        required: true,
        maxLength: 50,
        description: 'Recipient first name'
      },
      lastName: {
        type: 'string',
        required: true,
        maxLength: 50,
        description: 'Recipient last name'
      },
      addressLine1: {
        type: 'string',
        required: true,
        maxLength: 100,
        description: 'Primary address line'
      },
      addressLine2: {
        type: 'string',
        maxLength: 100,
        description: 'Secondary address line (apartment, suite, etc.)'
      },
      city: {
        type: 'string',
        required: true,
        maxLength: 50,
        description: 'City name'
      },
      state: {
        type: 'string',
        required: true,
        maxLength: 50,
        description: 'State or province'
      },
      postalCode: {
        type: 'string',
        required: true,
        pattern: '^[0-9]{6}$',
        description: 'Postal/ZIP code'
      },
      country: {
        type: 'string',
        required: true,
        default: 'India',
        description: 'Country name'
      },
      phone: {
        type: 'string',
        pattern: '^[+]?[0-9]{10,15}$',
        description: 'Delivery contact phone'
      }
    }
  },
  
  // Billing address (optional, defaults to shipping address)
  billingAddress: {
    type: 'object',
    properties: {
      // Same structure as shippingAddress
      firstName: { type: 'string', maxLength: 50 },
      lastName: { type: 'string', maxLength: 50 },
      addressLine1: { type: 'string', maxLength: 100 },
      addressLine2: { type: 'string', maxLength: 100 },
      city: { type: 'string', maxLength: 50 },
      state: { type: 'string', maxLength: 50 },
      postalCode: { type: 'string', pattern: '^[0-9]{6}$' },
      country: { type: 'string', default: 'India' },
      phone: { type: 'string', pattern: '^[+]?[0-9]{10,15}$' }
    },
    description: 'Billing address (if different from shipping)'
  },
  
  // Order totals
  pricing: {
    type: 'object',
    required: true,
    properties: {
      subtotal: {
        type: 'number',
        required: true,
        min: 0,
        description: 'Sum of all item prices'
      },
      discount: {
        type: 'number',
        min: 0,
        default: 0,
        description: 'Total discount amount'
      },
      shipping: {
        type: 'number',
        min: 0,
        default: 0,
        description: 'Shipping charges'
      },
      tax: {
        type: 'number',
        min: 0,
        default: 0,
        description: 'Tax amount (GST, etc.)'
      },
      total: {
        type: 'number',
        required: true,
        min: 0,
        description: 'Final total amount'
      }
    }
  },
  
  // Payment information
  payment: {
    type: 'object',
    required: true,
    properties: {
      method: {
        type: 'string',
        required: true,
        enum: ['razorpay', 'cod', 'upi', 'card', 'netbanking'],
        description: 'Payment method used'
      },
      status: {
        type: 'string',
        required: true,
        enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
        default: 'pending',
        description: 'Payment status'
      },
      transactionId: {
        type: 'string',
        description: 'Payment gateway transaction ID'
      },
      paymentId: {
        type: 'string',
        description: 'Payment gateway payment ID'
      },
      paidAt: {
        type: 'date',
        description: 'Payment completion timestamp'
      },
      failureReason: {
        type: 'string',
        description: 'Reason for payment failure'
      }
    }
  },
  
  // Order status and tracking
  status: {
    type: 'string',
    required: true,
    enum: [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'out_for_delivery',
      'delivered',
      'cancelled',
      'returned',
      'refunded'
    ],
    default: 'pending',
    description: 'Current order status'
  },
  
  tracking: {
    type: 'object',
    properties: {
      carrier: {
        type: 'string',
        description: 'Shipping carrier name'
      },
      trackingNumber: {
        type: 'string',
        description: 'Shipping tracking number'
      },
      trackingUrl: {
        type: 'string',
        description: 'URL to track shipment'
      },
      estimatedDelivery: {
        type: 'date',
        description: 'Estimated delivery date'
      },
      shippedAt: {
        type: 'date',
        description: 'Shipment date'
      },
      deliveredAt: {
        type: 'date',
        description: 'Delivery date'
      }
    }
  },
  
  // Order history and notes
  statusHistory: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          required: true,
          description: 'Status at this point'
        },
        timestamp: {
          type: 'date',
          required: true,
          description: 'When status changed'
        },
        note: {
          type: 'string',
          description: 'Additional notes about status change'
        },
        updatedBy: {
          type: 'string',
          description: 'Who updated the status'
        }
      }
    },
    description: 'History of status changes'
  },
  
  notes: {
    type: 'string',
    maxLength: 500,
    description: 'Special instructions or notes from customer'
  },
  
  adminNotes: {
    type: 'string',
    maxLength: 1000,
    description: 'Internal notes for admin use'
  },
  
  // Timestamps
  createdAt: {
    type: 'date',
    required: true,
    description: 'Order creation timestamp'
  },
  
  updatedAt: {
    type: 'date',
    required: true,
    description: 'Last update timestamp'
  },
  
  // Discounts and coupons
  coupon: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'Coupon code used'
      },
      discountType: {
        type: 'string',
        enum: ['percentage', 'fixed'],
        description: 'Type of discount'
      },
      discountValue: {
        type: 'number',
        min: 0,
        description: 'Discount value (percentage or fixed amount)'
      },
      discountAmount: {
        type: 'number',
        min: 0,
        description: 'Actual discount amount applied'
      }
    }
  },
  
  // Return/refund information
  returns: {
    type: 'object',
    properties: {
      requested: {
        type: 'boolean',
        default: false,
        description: 'Has return been requested'
      },
      requestedAt: {
        type: 'date',
        description: 'Return request date'
      },
      reason: {
        type: 'string',
        description: 'Reason for return'
      },
      status: {
        type: 'string',
        enum: ['pending', 'approved', 'rejected', 'completed'],
        description: 'Return request status'
      },
      refundAmount: {
        type: 'number',
        min: 0,
        description: 'Amount to be refunded'
      }
    }
  }
};

// Validation functions
export const validateOrder = (order) => {
  const errors = [];
  
  // Required field validation
  if (!order.id) errors.push('Order ID is required');
  if (!order.orderNumber) errors.push('Order number is required');
  if (!order.customer) errors.push('Customer information is required');
  if (!order.items || order.items.length === 0) errors.push('Order must have at least one item');
  if (!order.shippingAddress) errors.push('Shipping address is required');
  if (!order.pricing) errors.push('Pricing information is required');
  if (!order.payment) errors.push('Payment information is required');
  
  // Customer validation
  if (order.customer) {
    if (!order.customer.firstName) errors.push('Customer first name is required');
    if (!order.customer.lastName) errors.push('Customer last name is required');
    if (!order.customer.email) errors.push('Customer email is required');
    if (!order.customer.phone) errors.push('Customer phone is required');
  }
  
  // Items validation
  if (order.items) {
    order.items.forEach((item, index) => {
      if (!item.productId) errors.push(`Item ${index + 1}: Product ID is required`);
      if (!item.productName) errors.push(`Item ${index + 1}: Product name is required`);
      if (typeof item.quantity !== 'number' || item.quantity < 1) {
        errors.push(`Item ${index + 1}: Valid quantity is required`);
      }
      if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
        errors.push(`Item ${index + 1}: Valid unit price is required`);
      }
    });
  }
  
  // Pricing validation
  if (order.pricing) {
    if (typeof order.pricing.subtotal !== 'number' || order.pricing.subtotal < 0) {
      errors.push('Valid subtotal is required');
    }
    if (typeof order.pricing.total !== 'number' || order.pricing.total < 0) {
      errors.push('Valid total is required');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default orderSchema;
