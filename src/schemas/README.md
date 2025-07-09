# Beyond Slim - Schema Documentation

This directory contains comprehensive schema definitions for the Beyond Slim e-commerce application. These schemas define the structure, validation rules, and data types for all major entities in the system.

## 📋 Available Schemas

### 1. **Product Schema** (`productSchema.js`)
Defines the structure for product information including:
- Basic product details (title, description, price)
- Product specifications and ingredients
- Images and media
- SEO metadata
- Stock management
- Reviews and ratings
- Shipping information

### 2. **Order Schema** (`orderSchema.js`)
Comprehensive order management schema including:
- Customer information
- Order items and pricing
- Shipping and billing addresses
- Payment details
- Order status and tracking
- Return/refund information

### 3. **User Schema** (`userSchema.js`)
User account and profile management:
- Basic user information
- Authentication details
- User addresses
- Preferences and settings
- Shopping behavior (cart, wishlist, orders)
- Loyalty program data

### 4. **Review Schema** (`reviewSchema.js`)
Product review and rating system:
- Review content and ratings
- Detailed rating categories
- Review images
- Moderation and approval workflow
- User feedback and helpfulness votes

### 5. **Blog Schema** (`blogSchema.js`)
Content management for blog posts:
- Blog post content and metadata
- Author information
- Categories and tags
- SEO optimization
- Comments and engagement
- Publication workflow

### 6. **FAQ Schema** (`faqSchema.js`)
Frequently asked questions management:
- Question and answer pairs
- Categorization and prioritization
- Rich content support
- Search optimization
- Analytics tracking

### 7. **Contact Schema** (`contactSchema.js`)
Customer support and inquiry management:
- Contact form submissions
- Inquiry tracking and status
- Response management
- Customer feedback
- Support analytics

## 🚀 Usage Examples

### Basic Import
```javascript
// Import specific schemas
import { productSchema, validateProduct } from './schemas/productSchema';
import { orderSchema, validateOrder } from './schemas/orderSchema';

// Import all schemas
import { schemas, validators } from './schemas';
```

### Schema Validation
```javascript
import { validateProduct } from './schemas';

const productData = {
  id: 'prod_001',
  title: 'Beyond Slim Capsules',
  description: 'Natural weight loss supplement',
  price: 3990,
  // ... other fields
};

const validation = validateProduct(productData);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

### Using Validation Utils
```javascript
import { validationUtils } from './schemas';

// Email validation
const isValid = validationUtils.isValidEmail('user@example.com');

// Generate slug
const slug = validationUtils.generateSlug('Beyond Slim Product');

// Calculate reading time
const readingTime = validationUtils.calculateReadingTime(blogContent);
```

## 📊 Schema Structure

Each schema follows a consistent structure:

```javascript
export const schemaName = {
  fieldName: {
    type: 'string|number|boolean|date|array|object',
    required: true|false,
    description: 'Field description',
    // Additional validation rules
  }
};
```

## 🔧 Validation Rules

### Common Field Types
- **String**: Text fields with optional length limits
- **Number**: Numeric values with min/max constraints
- **Boolean**: True/false values
- **Date**: Timestamp fields
- **Array**: Lists of items with optional item validation
- **Object**: Complex nested structures
- **Enum**: Predefined set of values

### Validation Patterns
- **Email**: `^[^@]+@[^@]+\.[^@]+$`
- **Phone**: `^[+]?[0-9]{10,15}$`
- **Postal Code**: `^[0-9]{6}$` (Indian format)
- **URL**: Standard URL validation
- **Slug**: `^[a-z0-9]+(?:-[a-z0-9]+)*$`

## 🛠️ Utility Functions

### Email Validation
```javascript
validationUtils.isValidEmail(email)
```

### Phone Validation
```javascript
validationUtils.isValidPhone(phone)
```

### Slug Generation
```javascript
validationUtils.generateSlug(text)
```

### Order Number Generation
```javascript
validationUtils.generateOrderNumber('BS') // Returns: BS20250109xxxx
```

### HTML Sanitization
```javascript
validationUtils.sanitizeHtml(htmlContent)
```

### Reading Time Calculation
```javascript
validationUtils.calculateReadingTime(content) // Returns minutes
```

## 📝 Schema Extensions

### Adding New Fields
To add new fields to existing schemas:

1. Add the field definition to the schema object
2. Update the validation function if needed
3. Update this documentation

### Creating New Schemas
For new entity types:

1. Create a new schema file (e.g., `newEntitySchema.js`)
2. Follow the existing pattern for structure
3. Add validation functions
4. Export from `index.js`
5. Update documentation

## 🔒 Security Considerations

- All user inputs should be validated using these schemas
- HTML content is sanitized to prevent XSS attacks
- Email and phone patterns prevent injection attacks
- File uploads are validated for type and size
- SQL injection prevention through proper validation

## 📈 Performance Tips

- Use schema validation on the server side
- Cache validation results for frequently accessed data
- Implement field-level validation for better UX
- Use TypeScript for compile-time validation

## 🧪 Testing

Each schema includes validation functions that can be tested:

```javascript
import { validateProduct } from './schemas';

describe('Product Schema Validation', () => {
  it('should validate required fields', () => {
    const result = validateProduct({});
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Product ID is required');
  });
});
```

## 📚 API Integration

These schemas are designed to work with:
- REST API endpoints
- GraphQL resolvers
- Database models (MongoDB, PostgreSQL)
- Form validation libraries
- State management systems

## 🔄 Migration Guide

When updating schemas:
1. Add new fields as optional initially
2. Implement backward compatibility
3. Update validation logic
4. Test thoroughly before deployment
5. Document breaking changes

## 📞 Support

For questions or issues related to schemas:
- Check existing validation functions
- Review field requirements
- Consult this documentation
- Contact the development team

---

*Last updated: January 2025*
