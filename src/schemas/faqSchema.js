/**
 * FAQ Schema for Beyond Slim
 * Defines the structure for frequently asked questions
 */

export const faqSchema = {
  // Basic FAQ information
  id: {
    type: 'string',
    required: true,
    description: 'Unique FAQ identifier'
  },
  
  question: {
    type: 'string',
    required: true,
    maxLength: 300,
    description: 'FAQ question text'
  },
  
  answer: {
    type: 'string',
    required: true,
    maxLength: 2000,
    description: 'FAQ answer text (supports HTML)'
  },
  
  shortAnswer: {
    type: 'string',
    maxLength: 150,
    description: 'Brief answer for quick display'
  },
  
  // Organization
  category: {
    type: 'string',
    enum: ['product', 'ordering', 'shipping', 'returns', 'general', 'health'],
    default: 'general',
    description: 'FAQ category'
  },
  
  priority: {
    type: 'number',
    min: 1,
    max: 100,
    default: 50,
    description: 'Display priority (higher = more important)'
  },
  
  order: {
    type: 'number',
    min: 0,
    description: 'Display order within category'
  },
  
  // Content metadata
  keywords: {
    type: 'array',
    items: {
      type: 'string'
    },
    description: 'Keywords for search functionality'
  },
  
  tags: {
    type: 'array',
    items: {
      type: 'string'
    },
    description: 'Tags for grouping and filtering'
  },
  
  // Status and visibility
  isActive: {
    type: 'boolean',
    default: true,
    description: 'Is FAQ active and visible'
  },
  
  isFeatured: {
    type: 'boolean',
    default: false,
    description: 'Is this a featured FAQ'
  },
  
  // Related information
  relatedFaqs: {
    type: 'array',
    items: {
      type: 'string',
      description: 'Related FAQ ID'
    },
    maxItems: 5,
    description: 'Related FAQ questions'
  },
  
  relatedProducts: {
    type: 'array',
    items: {
      type: 'string',
      description: 'Related product ID'
    },
    description: 'Products related to this FAQ'
  },
  
  // Engagement metrics
  views: {
    type: 'number',
    default: 0,
    description: 'Number of times FAQ was viewed'
  },
  
  helpful: {
    type: 'number',
    default: 0,
    description: 'Number of helpful votes'
  },
  
  notHelpful: {
    type: 'number',
    default: 0,
    description: 'Number of not helpful votes'
  },
  
  // Rich content
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
        caption: {
          type: 'string',
          description: 'Image caption'
        }
      }
    },
    description: 'Images to include in the answer'
  },
  
  links: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          required: true,
          description: 'Link text'
        },
        url: {
          type: 'string',
          required: true,
          description: 'Link URL'
        },
        isExternal: {
          type: 'boolean',
          default: false,
          description: 'Is external link'
        }
      }
    },
    description: 'Related links to include'
  },
  
  // Author information
  author: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        required: true,
        description: 'Author ID'
      },
      name: {
        type: 'string',
        required: true,
        description: 'Author name'
      },
      role: {
        type: 'string',
        description: 'Author role/title'
      }
    }
  },
  
  // Review information
  reviewedBy: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        required: true,
        description: 'Reviewer ID'
      },
      name: {
        type: 'string',
        required: true,
        description: 'Reviewer name'
      },
      reviewedAt: {
        type: 'date',
        required: true,
        description: 'Review date'
      }
    }
  },
  
  // Timestamps
  createdAt: {
    type: 'date',
    required: true,
    description: 'Creation timestamp'
  },
  
  updatedAt: {
    type: 'date',
    required: true,
    description: 'Last update timestamp'
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
      slug: {
        type: 'string',
        description: 'URL-friendly slug'
      }
    }
  }
};

// FAQ Category Schema
export const faqCategorySchema = {
  id: {
    type: 'string',
    required: true,
    description: 'Category ID'
  },
  
  name: {
    type: 'string',
    required: true,
    maxLength: 100,
    description: 'Category name'
  },
  
  description: {
    type: 'string',
    maxLength: 300,
    description: 'Category description'
  },
  
  icon: {
    type: 'string',
    description: 'Category icon name or URL'
  },
  
  color: {
    type: 'string',
    pattern: '^#[0-9A-F]{6}$',
    description: 'Category color (hex code)'
  },
  
  order: {
    type: 'number',
    min: 0,
    description: 'Display order'
  },
  
  isActive: {
    type: 'boolean',
    default: true,
    description: 'Is category active'
  },
  
  faqCount: {
    type: 'number',
    default: 0,
    description: 'Number of FAQs in this category'
  },
  
  createdAt: {
    type: 'date',
    required: true,
    description: 'Creation timestamp'
  },
  
  updatedAt: {
    type: 'date',
    required: true,
    description: 'Last update timestamp'
  }
};

// Validation functions
export const validateFaq = (faq) => {
  const errors = [];
  
  // Required field validation
  if (!faq.id) errors.push('FAQ ID is required');
  if (!faq.question) errors.push('FAQ question is required');
  if (!faq.answer) errors.push('FAQ answer is required');
  
  // Length validation
  if (faq.question && faq.question.length > 300) {
    errors.push('FAQ question cannot exceed 300 characters');
  }
  
  if (faq.answer && faq.answer.length > 2000) {
    errors.push('FAQ answer cannot exceed 2000 characters');
  }
  
  if (faq.shortAnswer && faq.shortAnswer.length > 150) {
    errors.push('Short answer cannot exceed 150 characters');
  }
  
  // Priority validation
  if (faq.priority && (faq.priority < 1 || faq.priority > 100)) {
    errors.push('Priority must be between 1 and 100');
  }
  
  // Images validation
  if (faq.images) {
    faq.images.forEach((image, index) => {
      if (!image.url) {
        errors.push(`Image ${index + 1}: URL is required`);
      }
    });
  }
  
  // Links validation
  if (faq.links) {
    faq.links.forEach((link, index) => {
      if (!link.text) {
        errors.push(`Link ${index + 1}: Text is required`);
      }
      if (!link.url) {
        errors.push(`Link ${index + 1}: URL is required`);
      }
    });
  }
  
  // Author validation
  if (faq.author) {
    if (!faq.author.id) errors.push('Author ID is required');
    if (!faq.author.name) errors.push('Author name is required');
  }
  
  // SEO validation
  if (faq.seo) {
    if (faq.seo.metaTitle && faq.seo.metaTitle.length > 60) {
      errors.push('SEO meta title cannot exceed 60 characters');
    }
    if (faq.seo.metaDescription && faq.seo.metaDescription.length > 160) {
      errors.push('SEO meta description cannot exceed 160 characters');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateFaqCategory = (category) => {
  const errors = [];
  
  if (!category.id) errors.push('Category ID is required');
  if (!category.name) errors.push('Category name is required');
  
  if (category.name && category.name.length > 100) {
    errors.push('Category name cannot exceed 100 characters');
  }
  
  if (category.description && category.description.length > 300) {
    errors.push('Category description cannot exceed 300 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default faqSchema;
