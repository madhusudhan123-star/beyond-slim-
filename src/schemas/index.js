/**
 * Main Schema Index for Beyond Slim
 * Central export point for all schema definitions
 */

// Import all schemas
import productSchema, { validateProduct } from './productSchema';
import orderSchema, { validateOrder } from './orderSchema';
import orderConfirmationSchema, { 
  validateOrderConfirmation,
  generateOrderNumber,
  formatOrderForDisplay,
  calculateEstimatedDelivery
} from './orderConfirmationSchema';
import userSchema, { validateUser } from './userSchema';
import reviewSchema, { validateReview } from './reviewSchema';
import blogSchema, { 
  blogCategorySchema, 
  blogTagSchema, 
  validateBlogPost, 
  validateBlogCategory, 
  validateBlogTag 
} from './blogSchema';
import faqSchema, { 
  faqCategorySchema, 
  validateFaq, 
  validateFaqCategory 
} from './faqSchema';
import contactSchema, { 
  contactCategorySchema, 
  validateContact, 
  validateContactCategory 
} from './contactSchema';

// Export all schemas
export {
  // Product schema
  productSchema,
  validateProduct,
  
  // Order schema
  orderSchema,
  validateOrder,
  
  // Order confirmation schema
  orderConfirmationSchema,
  validateOrderConfirmation,
  generateOrderNumber,
  formatOrderForDisplay,
  calculateEstimatedDelivery,
  
  // User schema
  userSchema,
  validateUser,
  
  // Review schema
  reviewSchema,
  validateReview,
  
  // Blog schemas
  blogSchema,
  blogCategorySchema,
  blogTagSchema,
  validateBlogPost,
  validateBlogCategory,
  validateBlogTag,
  
  // FAQ schemas
  faqSchema,
  faqCategorySchema,
  validateFaq,
  validateFaqCategory,
  
  // Contact schemas
  contactSchema,
  contactCategorySchema,
  validateContact,
  validateContactCategory
};

// Schema registry for easy access
export const schemas = {
  product: productSchema,
  order: orderSchema,
  orderConfirmation: orderConfirmationSchema,
  user: userSchema,
  review: reviewSchema,
  blog: blogSchema,
  blogCategory: blogCategorySchema,
  blogTag: blogTagSchema,
  faq: faqSchema,
  faqCategory: faqCategorySchema,
  contact: contactSchema,
  contactCategory: contactCategorySchema
};

// Validation registry
export const validators = {
  product: validateProduct,
  order: validateOrder,
  orderConfirmation: validateOrderConfirmation,
  user: validateUser,
  review: validateReview,
  blog: validateBlogPost,
  blogCategory: validateBlogCategory,
  blogTag: validateBlogTag,
  faq: validateFaq,
  faqCategory: validateFaqCategory,
  contact: validateContact,
  contactCategory: validateContactCategory
};

// Common validation utilities
export const validationUtils = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    return emailRegex.test(email);
  },
  
  // Phone validation (Indian format)
  isValidPhone: (phone) => {
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  },
  
  // URL validation
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  // Postal code validation (Indian format)
  isValidPostalCode: (postalCode) => {
    const postalCodeRegex = /^[0-9]{6}$/;
    return postalCodeRegex.test(postalCode);
  },
  
  // Slug validation
  isValidSlug: (slug) => {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
  },
  
  // Generate slug from text
  generateSlug: (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  },
  
  // Sanitize HTML content
  sanitizeHtml: (html) => {
    // Basic HTML sanitization - in production, use a proper library like DOMPurify
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');
  },
  
  // Calculate reading time
  calculateReadingTime: (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  },
  
  // Generate order number
  generateOrderNumber: (prefix = 'BYD') => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  },

  // Format order for display
  formatOrderForDisplay: (orderData) => {
    return {
      ...orderData,
      formattedAmount: `₹ ${Number(orderData.totalAmount || 0).toFixed(2)}`,
      formattedDate: new Date(orderData.orderDate || new Date()).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      maskedEmail: orderData.customerEmail ? orderData.customerEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3') : '',
      maskedPhone: orderData.customerPhone ? orderData.customerPhone.replace(/(.{2})(.*)(.{2})/, '$1******$3') : ''
    };
  },

  // Calculate estimated delivery
  calculateEstimatedDelivery: (orderDate, businessDays = 7) => {
    const date = new Date(orderDate || new Date());
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
  },
};

// Schema field types for reference
export const fieldTypes = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  ARRAY: 'array',
  OBJECT: 'object',
  ENUM: 'enum'
};

// Common field patterns
export const patterns = {
  EMAIL: '^[^@]+@[^@]+\\.[^@]+$',
  PHONE: '^[+]?[0-9]{10,15}$',
  POSTAL_CODE: '^[0-9]{6}$',
  SLUG: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
  HEX_COLOR: '^#[0-9A-F]{6}$',
  URL: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$'
};

// Default export
const schemaModule = {
  schemas,
  validators,
  validationUtils,
  fieldTypes,
  patterns
};

export default schemaModule;
