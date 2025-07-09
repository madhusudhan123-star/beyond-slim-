/**
 * Review Schema for Beyond Slim
 * Defines the structure for product reviews and ratings
 */

export const reviewSchema = {
  // Basic review information
  id: {
    type: 'string',
    required: true,
    description: 'Unique review identifier'
  },
  
  // Product and user references
  productId: {
    type: 'string',
    required: true,
    description: 'Product being reviewed'
  },
  
  userId: {
    type: 'string',
    required: true,
    description: 'User who wrote the review'
  },
  
  orderId: {
    type: 'string',
    description: 'Order ID if this is a verified purchase review'
  },
  
  // Review content
  rating: {
    type: 'number',
    required: true,
    min: 1,
    max: 5,
    description: 'Rating out of 5 stars'
  },
  
  title: {
    type: 'string',
    maxLength: 100,
    description: 'Review title/headline'
  },
  
  content: {
    type: 'string',
    required: true,
    maxLength: 2000,
    description: 'Review text content'
  },
  
  // Review metadata
  isVerifiedPurchase: {
    type: 'boolean',
    default: false,
    description: 'Is this review from a verified purchase'
  },
  
  helpfulVotes: {
    type: 'number',
    default: 0,
    min: 0,
    description: 'Number of helpful votes received'
  },
  
  totalVotes: {
    type: 'number',
    default: 0,
    min: 0,
    description: 'Total number of votes received'
  },
  
  // Review status
  status: {
    type: 'string',
    enum: ['pending', 'approved', 'rejected', 'hidden'],
    default: 'pending',
    description: 'Review moderation status'
  },
  
  moderationReason: {
    type: 'string',
    description: 'Reason for rejection/hiding if applicable'
  },
  
  // User information (for display)
  reviewer: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        required: true,
        description: 'Reviewer display name'
      },
      avatar: {
        type: 'string',
        description: 'Reviewer avatar URL'
      },
      isAnonymous: {
        type: 'boolean',
        default: false,
        description: 'Should reviewer identity be hidden'
      }
    }
  },
  
  // Images and media
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
    maxItems: 5,
    description: 'Review images uploaded by user'
  },
  
  // Detailed ratings (optional)
  detailedRatings: {
    type: 'object',
    properties: {
      effectiveness: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Product effectiveness rating'
      },
      quality: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Product quality rating'
      },
      valueForMoney: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Value for money rating'
      },
      packaging: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Packaging quality rating'
      },
      delivery: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Delivery experience rating'
      }
    }
  },
  
  // Usage information
  usage: {
    type: 'object',
    properties: {
      duration: {
        type: 'string',
        description: 'How long user has been using the product'
      },
      frequency: {
        type: 'string',
        description: 'How often user uses the product'
      },
      results: {
        type: 'string',
        description: 'Results experienced by user'
      }
    }
  },
  
  // Recommendation
  wouldRecommend: {
    type: 'boolean',
    description: 'Would the reviewer recommend this product'
  },
  
  // Timestamps
  createdAt: {
    type: 'date',
    required: true,
    description: 'Review creation timestamp'
  },
  
  updatedAt: {
    type: 'date',
    required: true,
    description: 'Last update timestamp'
  },
  
  // Admin response
  adminResponse: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        maxLength: 1000,
        description: 'Admin response to the review'
      },
      respondedBy: {
        type: 'string',
        description: 'Admin who responded'
      },
      respondedAt: {
        type: 'date',
        description: 'Response timestamp'
      }
    }
  },
  
  // Reporting and flags
  reports: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        reportedBy: {
          type: 'string',
          required: true,
          description: 'User who reported the review'
        },
        reason: {
          type: 'string',
          required: true,
          enum: ['spam', 'inappropriate', 'fake', 'offensive', 'other'],
          description: 'Reason for reporting'
        },
        details: {
          type: 'string',
          maxLength: 500,
          description: 'Additional details about the report'
        },
        reportedAt: {
          type: 'date',
          required: true,
          description: 'Report timestamp'
        }
      }
    },
    description: 'Reports filed against this review'
  }
};

// Validation functions
export const validateReview = (review) => {
  const errors = [];
  
  // Required field validation
  if (!review.id) errors.push('Review ID is required');
  if (!review.productId) errors.push('Product ID is required');
  if (!review.userId) errors.push('User ID is required');
  if (!review.content) errors.push('Review content is required');
  
  // Rating validation
  if (typeof review.rating !== 'number' || review.rating < 1 || review.rating > 5) {
    errors.push('Rating must be a number between 1 and 5');
  }
  
  // Content length validation
  if (review.content && review.content.length > 2000) {
    errors.push('Review content cannot exceed 2000 characters');
  }
  
  if (review.title && review.title.length > 100) {
    errors.push('Review title cannot exceed 100 characters');
  }
  
  // Detailed ratings validation
  if (review.detailedRatings) {
    const detailedRatingKeys = ['effectiveness', 'quality', 'valueForMoney', 'packaging', 'delivery'];
    detailedRatingKeys.forEach(key => {
      const rating = review.detailedRatings[key];
      if (rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 5)) {
        errors.push(`${key} rating must be a number between 1 and 5`);
      }
    });
  }
  
  // Images validation
  if (review.images && review.images.length > 5) {
    errors.push('Maximum 5 images allowed per review');
  }
  
  // Reviewer validation
  if (review.reviewer && !review.reviewer.name) {
    errors.push('Reviewer name is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default reviewSchema;
