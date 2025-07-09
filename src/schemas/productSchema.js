/**
 * Product Schema for Beyond Slim
 * Defines the structure for product data in the application
 */

export const productSchema = {
  // Basic product information
  id: {
    type: 'string',
    required: true,
    description: 'Unique identifier for the product'
  },
  
  title: {
    type: 'string',
    required: true,
    maxLength: 200,
    description: 'Product name/title'
  },
  
  description: {
    type: 'string',
    required: true,
    description: 'Detailed product description'
  },
  
  shortDescription: {
    type: 'string',
    maxLength: 300,
    description: 'Brief product summary'
  },
  
  // Pricing information
  price: {
    type: 'number',
    required: true,
    min: 0,
    description: 'Product price in rupees'
  },
  
  originalPrice: {
    type: 'number',
    min: 0,
    description: 'Original price before discount'
  },
  
  discount: {
    type: 'number',
    min: 0,
    max: 100,
    description: 'Discount percentage'
  },
  
  // Product specifications
  specifications: {
    type: 'object',
    properties: {
      servingSize: {
        type: 'string',
        description: 'e.g., "2 capsules"'
      },
      servingsPerContainer: {
        type: 'string',
        description: 'e.g., "30"'
      },
      recommendedUse: {
        type: 'string',
        description: 'Usage instructions'
      },
      containerSize: {
        type: 'string',
        description: 'e.g., "60 capsules"'
      },
      manufacturedIn: {
        type: 'string',
        description: 'Manufacturing location'
      },
      certifications: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Product certifications'
      }
    }
  },
  
  // Product images
  images: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          required: true,
          description: 'Image URL'
        },
        alt: {
          type: 'string',
          description: 'Alt text for accessibility'
        },
        isPrimary: {
          type: 'boolean',
          default: false,
          description: 'Is this the main product image'
        }
      }
    },
    description: 'Product image gallery'
  },
  
  // Ingredients
  ingredients: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          required: true,
          description: 'Ingredient name'
        },
        description: {
          type: 'string',
          description: 'Ingredient description and benefits'
        },
        image: {
          type: 'string',
          description: 'Ingredient image URL'
        },
        quantity: {
          type: 'string',
          description: 'Amount per serving'
        }
      }
    },
    description: 'List of product ingredients'
  },
  
  // Product benefits
  benefits: {
    type: 'array',
    items: {
      type: 'string'
    },
    description: 'List of product benefits'
  },
  
  // Reviews and ratings
  rating: {
    type: 'object',
    properties: {
      average: {
        type: 'number',
        min: 0,
        max: 5,
        description: 'Average rating out of 5'
      },
      total: {
        type: 'number',
        min: 0,
        description: 'Total number of reviews'
      },
      breakdown: {
        type: 'object',
        properties: {
          5: { type: 'number', min: 0 },
          4: { type: 'number', min: 0 },
          3: { type: 'number', min: 0 },
          2: { type: 'number', min: 0 },
          1: { type: 'number', min: 0 }
        },
        description: 'Rating breakdown by stars'
      }
    }
  },
  
  // Stock information
  stock: {
    type: 'object',
    properties: {
      quantity: {
        type: 'number',
        min: 0,
        description: 'Available stock quantity'
      },
      inStock: {
        type: 'boolean',
        description: 'Is product in stock'
      },
      lowStockThreshold: {
        type: 'number',
        default: 10,
        description: 'Low stock warning threshold'
      }
    }
  },
  
  // SEO information
  seo: {
    type: 'object',
    properties: {
      metaTitle: {
        type: 'string',
        maxLength: 60,
        description: 'SEO meta title'
      },
      metaDescription: {
        type: 'string',
        maxLength: 160,
        description: 'SEO meta description'
      },
      keywords: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'SEO keywords'
      },
      slug: {
        type: 'string',
        description: 'URL-friendly product identifier'
      }
    }
  },
  
  // Categories and tags
  category: {
    type: 'string',
    description: 'Product category'
  },
  
  tags: {
    type: 'array',
    items: {
      type: 'string'
    },
    description: 'Product tags for filtering'
  },
  
  // Status and timestamps
  status: {
    type: 'string',
    enum: ['active', 'inactive', 'draft', 'discontinued'],
    default: 'active',
    description: 'Product status'
  },
  
  createdAt: {
    type: 'date',
    description: 'Product creation date'
  },
  
  updatedAt: {
    type: 'date',
    description: 'Last update date'
  },
  
  // Shipping information
  shipping: {
    type: 'object',
    properties: {
      weight: {
        type: 'number',
        min: 0,
        description: 'Product weight in grams'
      },
      dimensions: {
        type: 'object',
        properties: {
          length: { type: 'number', min: 0 },
          width: { type: 'number', min: 0 },
          height: { type: 'number', min: 0 }
        },
        description: 'Product dimensions in cm'
      },
      freeShipping: {
        type: 'boolean',
        default: false,
        description: 'Is free shipping available'
      },
      shippingTime: {
        type: 'string',
        description: 'Expected shipping time'
      }
    }
  }
};

// Validation functions
export const validateProduct = (product) => {
  const errors = [];
  
  // Required field validation
  if (!product.id) errors.push('Product ID is required');
  if (!product.title) errors.push('Product title is required');
  if (!product.description) errors.push('Product description is required');
  if (typeof product.price !== 'number' || product.price < 0) {
    errors.push('Valid price is required');
  }
  
  // Price validation
  if (product.originalPrice && product.originalPrice < product.price) {
    errors.push('Original price cannot be less than current price');
  }
  
  // Rating validation
  if (product.rating && product.rating.average) {
    if (product.rating.average < 0 || product.rating.average > 5) {
      errors.push('Rating must be between 0 and 5');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default productSchema;
