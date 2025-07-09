/**
 * Blog Schema for Beyond Slim
 * Defines the structure for blog posts and articles
 */

export const blogSchema = {
  // Basic blog information
  id: {
    type: 'string',
    required: true,
    description: 'Unique blog post identifier'
  },
  
  title: {
    type: 'string',
    required: true,
    maxLength: 200,
    description: 'Blog post title'
  },
  
  slug: {
    type: 'string',
    required: true,
    unique: true,
    description: 'URL-friendly identifier for the blog post'
  },
  
  excerpt: {
    type: 'string',
    maxLength: 500,
    description: 'Brief summary of the blog post'
  },
  
  content: {
    type: 'string',
    required: true,
    description: 'Full blog post content (HTML or Markdown)'
  },
  
  // Author information
  author: {
    type: 'object',
    required: true,
    properties: {
      id: {
        type: 'string',
        required: true,
        description: 'Author user ID'
      },
      name: {
        type: 'string',
        required: true,
        description: 'Author display name'
      },
      avatar: {
        type: 'string',
        description: 'Author avatar URL'
      },
      bio: {
        type: 'string',
        maxLength: 300,
        description: 'Author bio'
      },
      socialLinks: {
        type: 'object',
        properties: {
          twitter: { type: 'string' },
          linkedin: { type: 'string' },
          instagram: { type: 'string' },
          website: { type: 'string' }
        }
      }
    }
  },
  
  // Featured image
  featuredImage: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        required: true,
        description: 'Featured image URL'
      },
      alt: {
        type: 'string',
        description: 'Alt text for accessibility'
      },
      caption: {
        type: 'string',
        description: 'Image caption'
      },
      width: {
        type: 'number',
        description: 'Image width in pixels'
      },
      height: {
        type: 'number',
        description: 'Image height in pixels'
      }
    }
  },
  
  // Categories and tags
  category: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        required: true,
        description: 'Category ID'
      },
      name: {
        type: 'string',
        required: true,
        description: 'Category name'
      },
      slug: {
        type: 'string',
        required: true,
        description: 'Category URL slug'
      }
    }
  },
  
  tags: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          required: true,
          description: 'Tag ID'
        },
        name: {
          type: 'string',
          required: true,
          description: 'Tag name'
        },
        slug: {
          type: 'string',
          required: true,
          description: 'Tag URL slug'
        }
      }
    },
    description: 'Blog post tags'
  },
  
  // Publication status
  status: {
    type: 'string',
    enum: ['draft', 'published', 'scheduled', 'archived'],
    default: 'draft',
    description: 'Publication status'
  },
  
  publishedAt: {
    type: 'date',
    description: 'Publication date'
  },
  
  scheduledAt: {
    type: 'date',
    description: 'Scheduled publication date'
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
      ogImage: {
        type: 'string',
        description: 'Open Graph image URL'
      },
      canonicalUrl: {
        type: 'string',
        description: 'Canonical URL'
      }
    }
  },
  
  // Content metadata
  readingTime: {
    type: 'number',
    description: 'Estimated reading time in minutes'
  },
  
  wordCount: {
    type: 'number',
    description: 'Word count of the content'
  },
  
  // Engagement metrics
  views: {
    type: 'number',
    default: 0,
    description: 'Number of views'
  },
  
  likes: {
    type: 'number',
    default: 0,
    description: 'Number of likes'
  },
  
  shares: {
    type: 'number',
    default: 0,
    description: 'Number of shares'
  },
  
  comments: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          required: true,
          description: 'Comment ID'
        },
        userId: {
          type: 'string',
          description: 'User ID (if registered user)'
        },
        author: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              required: true,
              description: 'Commenter name'
            },
            email: {
              type: 'string',
              required: true,
              description: 'Commenter email'
            },
            website: {
              type: 'string',
              description: 'Commenter website'
            },
            avatar: {
              type: 'string',
              description: 'Commenter avatar URL'
            }
          }
        },
        content: {
          type: 'string',
          required: true,
          maxLength: 1000,
          description: 'Comment content'
        },
        parentId: {
          type: 'string',
          description: 'Parent comment ID for replies'
        },
        status: {
          type: 'string',
          enum: ['pending', 'approved', 'rejected', 'spam'],
          default: 'pending',
          description: 'Comment moderation status'
        },
        createdAt: {
          type: 'date',
          required: true,
          description: 'Comment creation timestamp'
        },
        updatedAt: {
          type: 'date',
          description: 'Comment last update timestamp'
        }
      }
    },
    description: 'Blog post comments'
  },
  
  // Related content
  relatedPosts: {
    type: 'array',
    items: {
      type: 'string',
      description: 'Related blog post ID'
    },
    maxItems: 5,
    description: 'Related blog posts'
  },
  
  // Content settings
  settings: {
    type: 'object',
    properties: {
      allowComments: {
        type: 'boolean',
        default: true,
        description: 'Allow comments on this post'
      },
      requireModeration: {
        type: 'boolean',
        default: true,
        description: 'Require comment moderation'
      },
      isFeatured: {
        type: 'boolean',
        default: false,
        description: 'Is this a featured post'
      },
      isSticky: {
        type: 'boolean',
        default: false,
        description: 'Pin this post to the top'
      },
      showAuthor: {
        type: 'boolean',
        default: true,
        description: 'Show author information'
      },
      showPublishDate: {
        type: 'boolean',
        default: true,
        description: 'Show publication date'
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
  
  // Analytics
  analytics: {
    type: 'object',
    properties: {
      uniqueViews: {
        type: 'number',
        default: 0,
        description: 'Number of unique views'
      },
      bounceRate: {
        type: 'number',
        description: 'Bounce rate percentage'
      },
      avgTimeOnPage: {
        type: 'number',
        description: 'Average time spent on page (seconds)'
      },
      referralSources: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            source: { type: 'string' },
            visits: { type: 'number' }
          }
        },
        description: 'Traffic sources'
      }
    }
  }
};

// Blog Category Schema
export const blogCategorySchema = {
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
  
  slug: {
    type: 'string',
    required: true,
    unique: true,
    description: 'URL-friendly slug'
  },
  
  description: {
    type: 'string',
    maxLength: 500,
    description: 'Category description'
  },
  
  parentId: {
    type: 'string',
    description: 'Parent category ID for hierarchical categories'
  },
  
  postCount: {
    type: 'number',
    default: 0,
    description: 'Number of posts in this category'
  },
  
  color: {
    type: 'string',
    pattern: '^#[0-9A-F]{6}$',
    description: 'Category color (hex code)'
  },
  
  icon: {
    type: 'string',
    description: 'Category icon name or URL'
  },
  
  isActive: {
    type: 'boolean',
    default: true,
    description: 'Is category active'
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

// Blog Tag Schema
export const blogTagSchema = {
  id: {
    type: 'string',
    required: true,
    description: 'Tag ID'
  },
  
  name: {
    type: 'string',
    required: true,
    maxLength: 50,
    description: 'Tag name'
  },
  
  slug: {
    type: 'string',
    required: true,
    unique: true,
    description: 'URL-friendly slug'
  },
  
  description: {
    type: 'string',
    maxLength: 200,
    description: 'Tag description'
  },
  
  postCount: {
    type: 'number',
    default: 0,
    description: 'Number of posts with this tag'
  },
  
  color: {
    type: 'string',
    pattern: '^#[0-9A-F]{6}$',
    description: 'Tag color (hex code)'
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
export const validateBlogPost = (blog) => {
  const errors = [];
  
  // Required field validation
  if (!blog.id) errors.push('Blog ID is required');
  if (!blog.title) errors.push('Blog title is required');
  if (!blog.slug) errors.push('Blog slug is required');
  if (!blog.content) errors.push('Blog content is required');
  if (!blog.author) errors.push('Author information is required');
  
  // Title length validation
  if (blog.title && blog.title.length > 200) {
    errors.push('Blog title cannot exceed 200 characters');
  }
  
  // Excerpt length validation
  if (blog.excerpt && blog.excerpt.length > 500) {
    errors.push('Blog excerpt cannot exceed 500 characters');
  }
  
  // Author validation
  if (blog.author) {
    if (!blog.author.id) errors.push('Author ID is required');
    if (!blog.author.name) errors.push('Author name is required');
  }
  
  // SEO validation
  if (blog.seo) {
    if (blog.seo.metaTitle && blog.seo.metaTitle.length > 60) {
      errors.push('SEO meta title cannot exceed 60 characters');
    }
    if (blog.seo.metaDescription && blog.seo.metaDescription.length > 160) {
      errors.push('SEO meta description cannot exceed 160 characters');
    }
  }
  
  // Comments validation
  if (blog.comments) {
    blog.comments.forEach((comment, index) => {
      if (!comment.id) errors.push(`Comment ${index + 1}: ID is required`);
      if (!comment.content) errors.push(`Comment ${index + 1}: Content is required`);
      if (!comment.author || !comment.author.name) {
        errors.push(`Comment ${index + 1}: Author name is required`);
      }
      if (!comment.author || !comment.author.email) {
        errors.push(`Comment ${index + 1}: Author email is required`);
      }
      if (comment.content && comment.content.length > 1000) {
        errors.push(`Comment ${index + 1}: Content cannot exceed 1000 characters`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateBlogCategory = (category) => {
  const errors = [];
  
  if (!category.id) errors.push('Category ID is required');
  if (!category.name) errors.push('Category name is required');
  if (!category.slug) errors.push('Category slug is required');
  
  if (category.name && category.name.length > 100) {
    errors.push('Category name cannot exceed 100 characters');
  }
  
  if (category.description && category.description.length > 500) {
    errors.push('Category description cannot exceed 500 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateBlogTag = (tag) => {
  const errors = [];
  
  if (!tag.id) errors.push('Tag ID is required');
  if (!tag.name) errors.push('Tag name is required');
  if (!tag.slug) errors.push('Tag slug is required');
  
  if (tag.name && tag.name.length > 50) {
    errors.push('Tag name cannot exceed 50 characters');
  }
  
  if (tag.description && tag.description.length > 200) {
    errors.push('Tag description cannot exceed 200 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default blogSchema;
