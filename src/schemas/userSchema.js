/**
 * User Schema for Beyond Slim
 * Defines the structure for user data in the application
 */

export const userSchema = {
  // Basic user information
  id: {
    type: 'string',
    required: true,
    description: 'Unique user identifier'
  },
  
  firstName: {
    type: 'string',
    required: true,
    maxLength: 50,
    description: 'User first name'
  },
  
  lastName: {
    type: 'string',
    required: true,
    maxLength: 50,
    description: 'User last name'
  },
  
  email: {
    type: 'string',
    required: true,
    unique: true,
    pattern: '^[^@]+@[^@]+\\.[^@]+$',
    description: 'User email address'
  },
  
  phone: {
    type: 'string',
    pattern: '^[+]?[0-9]{10,15}$',
    description: 'User phone number'
  },
  
  // Authentication
  password: {
    type: 'string',
    required: true,
    minLength: 8,
    description: 'Hashed password'
  },
  
  isEmailVerified: {
    type: 'boolean',
    default: false,
    description: 'Email verification status'
  },
  
  emailVerificationToken: {
    type: 'string',
    description: 'Token for email verification'
  },
  
  passwordResetToken: {
    type: 'string',
    description: 'Token for password reset'
  },
  
  passwordResetExpires: {
    type: 'date',
    description: 'Password reset token expiry'
  },
  
  // User profile
  profile: {
    type: 'object',
    properties: {
      avatar: {
        type: 'string',
        description: 'User avatar image URL'
      },
      dateOfBirth: {
        type: 'date',
        description: 'User date of birth'
      },
      gender: {
        type: 'string',
        enum: ['male', 'female', 'other', 'prefer_not_to_say'],
        description: 'User gender'
      },
      bio: {
        type: 'string',
        maxLength: 500,
        description: 'User bio/description'
      }
    }
  },
  
  // Addresses
  addresses: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          required: true,
          description: 'Address identifier'
        },
        type: {
          type: 'string',
          enum: ['home', 'work', 'other'],
          default: 'home',
          description: 'Address type'
        },
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
          description: 'Secondary address line'
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
          description: 'Contact phone for this address'
        },
        isDefault: {
          type: 'boolean',
          default: false,
          description: 'Is this the default address'
        }
      }
    },
    description: 'User saved addresses'
  },
  
  // Preferences
  preferences: {
    type: 'object',
    properties: {
      language: {
        type: 'string',
        enum: ['en', 'hi', 'te', 'ta', 'bn'],
        default: 'en',
        description: 'Preferred language'
      },
      currency: {
        type: 'string',
        enum: ['INR', 'USD'],
        default: 'INR',
        description: 'Preferred currency'
      },
      notifications: {
        type: 'object',
        properties: {
          email: {
            type: 'boolean',
            default: true,
            description: 'Email notifications enabled'
          },
          sms: {
            type: 'boolean',
            default: true,
            description: 'SMS notifications enabled'
          },
          push: {
            type: 'boolean',
            default: true,
            description: 'Push notifications enabled'
          },
          marketing: {
            type: 'boolean',
            default: false,
            description: 'Marketing communications enabled'
          }
        }
      }
    }
  },
  
  // User activity
  lastLogin: {
    type: 'date',
    description: 'Last login timestamp'
  },
  
  loginCount: {
    type: 'number',
    default: 0,
    description: 'Total login count'
  },
  
  // Account status
  status: {
    type: 'string',
    enum: ['active', 'inactive', 'suspended', 'deleted'],
    default: 'active',
    description: 'Account status'
  },
  
  role: {
    type: 'string',
    enum: ['customer', 'admin', 'moderator'],
    default: 'customer',
    description: 'User role'
  },
  
  // Shopping behavior
  orders: {
    type: 'array',
    items: {
      type: 'string',
      description: 'Order ID reference'
    },
    description: 'User order history references'
  },
  
  wishlist: {
    type: 'array',
    items: {
      type: 'string',
      description: 'Product ID reference'
    },
    description: 'User wishlist items'
  },
  
  cart: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        productId: {
          type: 'string',
          required: true,
          description: 'Product identifier'
        },
        quantity: {
          type: 'number',
          required: true,
          min: 1,
          description: 'Quantity in cart'
        },
        addedAt: {
          type: 'date',
          required: true,
          description: 'When item was added to cart'
        }
      }
    },
    description: 'User shopping cart items'
  },
  
  // Loyalty and rewards
  loyalty: {
    type: 'object',
    properties: {
      points: {
        type: 'number',
        default: 0,
        min: 0,
        description: 'Loyalty points balance'
      },
      tier: {
        type: 'string',
        enum: ['bronze', 'silver', 'gold', 'platinum'],
        default: 'bronze',
        description: 'Loyalty tier'
      },
      totalSpent: {
        type: 'number',
        default: 0,
        min: 0,
        description: 'Total amount spent'
      },
      totalOrders: {
        type: 'number',
        default: 0,
        min: 0,
        description: 'Total number of orders'
      }
    }
  },
  
  // Reviews and ratings
  reviews: {
    type: 'array',
    items: {
      type: 'string',
      description: 'Review ID reference'
    },
    description: 'User reviews written'
  },
  
  // Social login
  socialAccounts: {
    type: 'object',
    properties: {
      google: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          name: { type: 'string' },
          picture: { type: 'string' }
        }
      },
      facebook: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          name: { type: 'string' },
          picture: { type: 'string' }
        }
      }
    }
  },
  
  // Timestamps
  createdAt: {
    type: 'date',
    required: true,
    description: 'Account creation timestamp'
  },
  
  updatedAt: {
    type: 'date',
    required: true,
    description: 'Last update timestamp'
  },
  
  // GDPR compliance
  gdprConsent: {
    type: 'object',
    properties: {
      marketing: {
        type: 'boolean',
        default: false,
        description: 'Consent for marketing communications'
      },
      analytics: {
        type: 'boolean',
        default: false,
        description: 'Consent for analytics tracking'
      },
      personalization: {
        type: 'boolean',
        default: false,
        description: 'Consent for personalization'
      },
      consentDate: {
        type: 'date',
        description: 'When consent was given'
      }
    }
  }
};

// Validation functions
export const validateUser = (user) => {
  const errors = [];
  
  // Required field validation
  if (!user.id) errors.push('User ID is required');
  if (!user.firstName) errors.push('First name is required');
  if (!user.lastName) errors.push('Last name is required');
  if (!user.email) errors.push('Email is required');
  if (!user.password) errors.push('Password is required');
  
  // Email validation
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (user.email && !emailRegex.test(user.email)) {
    errors.push('Invalid email format');
  }
  
  // Phone validation
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  if (user.phone && !phoneRegex.test(user.phone)) {
    errors.push('Invalid phone number format');
  }
  
  // Password validation
  if (user.password && user.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  // Address validation
  if (user.addresses) {
    user.addresses.forEach((address, index) => {
      if (!address.firstName) errors.push(`Address ${index + 1}: First name is required`);
      if (!address.lastName) errors.push(`Address ${index + 1}: Last name is required`);
      if (!address.addressLine1) errors.push(`Address ${index + 1}: Address line 1 is required`);
      if (!address.city) errors.push(`Address ${index + 1}: City is required`);
      if (!address.state) errors.push(`Address ${index + 1}: State is required`);
      if (!address.postalCode) errors.push(`Address ${index + 1}: Postal code is required`);
      
      // Postal code validation for India
      const postalCodeRegex = /^[0-9]{6}$/;
      if (address.postalCode && !postalCodeRegex.test(address.postalCode)) {
        errors.push(`Address ${index + 1}: Invalid postal code format`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default userSchema;
