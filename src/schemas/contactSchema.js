/**
 * Contact Schema for Beyond Slim
 * Defines the structure for contact form submissions and inquiries
 */

export const contactSchema = {
  // Basic contact information
  id: {
    type: 'string',
    required: true,
    description: 'Unique contact inquiry identifier'
  },
  
  // Contact details
  firstName: {
    type: 'string',
    required: true,
    maxLength: 50,
    description: 'Contact first name'
  },
  
  lastName: {
    type: 'string',
    required: true,
    maxLength: 50,
    description: 'Contact last name'
  },
  
  email: {
    type: 'string',
    required: true,
    pattern: '^[^@]+@[^@]+\\.[^@]+$',
    description: 'Contact email address'
  },
  
  phone: {
    type: 'string',
    pattern: '^[+]?[0-9]{10,15}$',
    description: 'Contact phone number'
  },
  
  // Inquiry details
  subject: {
    type: 'string',
    required: true,
    maxLength: 200,
    description: 'Inquiry subject'
  },
  
  message: {
    type: 'string',
    required: true,
    maxLength: 2000,
    description: 'Inquiry message'
  },
  
  category: {
    type: 'string',
    enum: ['general', 'product', 'order', 'shipping', 'return', 'complaint', 'feedback', 'partnership'],
    default: 'general',
    description: 'Inquiry category'
  },
  
  priority: {
    type: 'string',
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    description: 'Inquiry priority'
  },
  
  // Order reference (if applicable)
  orderId: {
    type: 'string',
    description: 'Related order ID'
  },
  
  orderNumber: {
    type: 'string',
    description: 'Related order number'
  },
  
  // Status and tracking
  status: {
    type: 'string',
    enum: ['new', 'open', 'pending', 'resolved', 'closed'],
    default: 'new',
    description: 'Inquiry status'
  },
  
  assignedTo: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Assigned agent ID'
      },
      name: {
        type: 'string',
        description: 'Assigned agent name'
      },
      email: {
        type: 'string',
        description: 'Assigned agent email'
      },
      department: {
        type: 'string',
        description: 'Agent department'
      }
    }
  },
  
  // Customer information
  customer: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Customer ID (if registered user)'
      },
      isExistingCustomer: {
        type: 'boolean',
        default: false,
        description: 'Is this an existing customer'
      },
      totalOrders: {
        type: 'number',
        default: 0,
        description: 'Total number of orders'
      },
      totalSpent: {
        type: 'number',
        default: 0,
        description: 'Total amount spent'
      }
    }
  },
  
  // Additional details
  attachments: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        fileName: {
          type: 'string',
          required: true,
          description: 'File name'
        },
        fileUrl: {
          type: 'string',
          required: true,
          description: 'File URL'
        },
        fileSize: {
          type: 'number',
          description: 'File size in bytes'
        },
        fileType: {
          type: 'string',
          description: 'File MIME type'
        },
        uploadedAt: {
          type: 'date',
          description: 'Upload timestamp'
        }
      }
    },
    maxItems: 5,
    description: 'File attachments'
  },
  
  // Response and resolution
  responses: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          required: true,
          description: 'Response ID'
        },
        message: {
          type: 'string',
          required: true,
          description: 'Response message'
        },
        respondedBy: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' }
          }
        },
        isInternal: {
          type: 'boolean',
          default: false,
          description: 'Is this an internal note'
        },
        attachments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              fileName: { type: 'string' },
              fileUrl: { type: 'string' },
              fileSize: { type: 'number' },
              fileType: { type: 'string' }
            }
          }
        },
        createdAt: {
          type: 'date',
          required: true,
          description: 'Response timestamp'
        }
      }
    },
    description: 'Response history'
  },
  
  resolution: {
    type: 'object',
    properties: {
      summary: {
        type: 'string',
        maxLength: 500,
        description: 'Resolution summary'
      },
      resolvedBy: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' }
        }
      },
      resolvedAt: {
        type: 'date',
        description: 'Resolution timestamp'
      },
      resolutionTime: {
        type: 'number',
        description: 'Resolution time in minutes'
      }
    }
  },
  
  // Feedback and rating
  feedback: {
    type: 'object',
    properties: {
      rating: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Customer satisfaction rating'
      },
      comment: {
        type: 'string',
        maxLength: 500,
        description: 'Customer feedback comment'
      },
      submittedAt: {
        type: 'date',
        description: 'Feedback submission timestamp'
      }
    }
  },
  
  // Source information
  source: {
    type: 'string',
    enum: ['website', 'email', 'phone', 'chat', 'social', 'mobile_app'],
    default: 'website',
    description: 'Source of the inquiry'
  },
  
  referrer: {
    type: 'string',
    description: 'Referring URL or source'
  },
  
  userAgent: {
    type: 'string',
    description: 'User agent string'
  },
  
  ipAddress: {
    type: 'string',
    description: 'IP address of the user'
  },
  
  // Marketing consent
  marketingConsent: {
    type: 'boolean',
    default: false,
    description: 'Consent for marketing communications'
  },
  
  // Timestamps
  createdAt: {
    type: 'date',
    required: true,
    description: 'Inquiry creation timestamp'
  },
  
  updatedAt: {
    type: 'date',
    required: true,
    description: 'Last update timestamp'
  },
  
  lastResponseAt: {
    type: 'date',
    description: 'Last response timestamp'
  },
  
  // Tags and labels
  tags: {
    type: 'array',
    items: {
      type: 'string'
    },
    description: 'Tags for categorization'
  },
  
  // Analytics
  analytics: {
    type: 'object',
    properties: {
      responseTime: {
        type: 'number',
        description: 'First response time in minutes'
      },
      totalResponses: {
        type: 'number',
        default: 0,
        description: 'Total number of responses'
      },
      escalated: {
        type: 'boolean',
        default: false,
        description: 'Was this inquiry escalated'
      },
      escalatedTo: {
        type: 'string',
        description: 'Escalated to which department/person'
      },
      satisfactionScore: {
        type: 'number',
        description: 'Customer satisfaction score'
      }
    }
  }
};

// Contact Category Schema
export const contactCategorySchema = {
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
  
  department: {
    type: 'string',
    description: 'Responsible department'
  },
  
  autoAssignTo: {
    type: 'string',
    description: 'Auto-assign to user ID'
  },
  
  priority: {
    type: 'string',
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    description: 'Default priority for this category'
  },
  
  slaHours: {
    type: 'number',
    default: 24,
    description: 'SLA response time in hours'
  },
  
  emailTemplate: {
    type: 'string',
    description: 'Auto-response email template'
  },
  
  isActive: {
    type: 'boolean',
    default: true,
    description: 'Is category active'
  },
  
  order: {
    type: 'number',
    description: 'Display order'
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
export const validateContact = (contact) => {
  const errors = [];
  
  // Required field validation
  if (!contact.id) errors.push('Contact ID is required');
  if (!contact.firstName) errors.push('First name is required');
  if (!contact.lastName) errors.push('Last name is required');
  if (!contact.email) errors.push('Email is required');
  if (!contact.subject) errors.push('Subject is required');
  if (!contact.message) errors.push('Message is required');
  
  // Email validation
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (contact.email && !emailRegex.test(contact.email)) {
    errors.push('Invalid email format');
  }
  
  // Phone validation
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  if (contact.phone && !phoneRegex.test(contact.phone)) {
    errors.push('Invalid phone number format');
  }
  
  // Length validation
  if (contact.firstName && contact.firstName.length > 50) {
    errors.push('First name cannot exceed 50 characters');
  }
  
  if (contact.lastName && contact.lastName.length > 50) {
    errors.push('Last name cannot exceed 50 characters');
  }
  
  if (contact.subject && contact.subject.length > 200) {
    errors.push('Subject cannot exceed 200 characters');
  }
  
  if (contact.message && contact.message.length > 2000) {
    errors.push('Message cannot exceed 2000 characters');
  }
  
  // Attachments validation
  if (contact.attachments && contact.attachments.length > 5) {
    errors.push('Maximum 5 attachments allowed');
  }
  
  if (contact.attachments) {
    contact.attachments.forEach((attachment, index) => {
      if (!attachment.fileName) {
        errors.push(`Attachment ${index + 1}: File name is required`);
      }
      if (!attachment.fileUrl) {
        errors.push(`Attachment ${index + 1}: File URL is required`);
      }
    });
  }
  
  // Response validation
  if (contact.responses) {
    contact.responses.forEach((response, index) => {
      if (!response.id) {
        errors.push(`Response ${index + 1}: ID is required`);
      }
      if (!response.message) {
        errors.push(`Response ${index + 1}: Message is required`);
      }
    });
  }
  
  // Feedback validation
  if (contact.feedback && contact.feedback.rating) {
    if (contact.feedback.rating < 1 || contact.feedback.rating > 5) {
      errors.push('Feedback rating must be between 1 and 5');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateContactCategory = (category) => {
  const errors = [];
  
  if (!category.id) errors.push('Category ID is required');
  if (!category.name) errors.push('Category name is required');
  
  if (category.name && category.name.length > 100) {
    errors.push('Category name cannot exceed 100 characters');
  }
  
  if (category.description && category.description.length > 300) {
    errors.push('Category description cannot exceed 300 characters');
  }
  
  if (category.slaHours && category.slaHours < 0) {
    errors.push('SLA hours must be positive');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default contactSchema;
