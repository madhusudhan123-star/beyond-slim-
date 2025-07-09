/**
 * URL Slug Utilities for Beyond Slim
 * Handles creation and management of SEO-friendly URLs
 */

// Function to generate URL slug from title
export const generateSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Function to extract ID from slug (if needed)
export const extractIdFromSlug = (slug) => {
  const match = slug.match(/^(\d+)-/);
  return match ? parseInt(match[1]) : null;
};

// Product URL slugs
export const productSlugs = {
  'beyond-slim-capsules': {
    id: 'beyond-slim-capsules',
    title: 'Beyond Slim Capsules',
    slug: 'beyond-slim-capsules',
    url: '/product/beyond-slim-capsules',
    metaTitle: 'Beyond Slim Capsules - Natural Weight Loss Supplement',
    metaDescription: 'Transform your body naturally with Beyond Slim\'s cutting-edge formula. Visible results, 100% satisfaction guaranteed.',
    keywords: ['weight loss', 'natural supplements', 'beyond slim', 'ayurvedic', 'fat burner']
  }
};

// Blog URL slugs (generated from existing blog data)
export const blogSlugs = {
  'natural-weight-loss-methods': {
    id: 1,
    title: 'Natural Weight Loss Methods That Actually Work',
    slug: 'natural-weight-loss-methods',
    url: '/blog/natural-weight-loss-methods',
    metaTitle: 'Natural Weight Loss Methods That Actually Work - Beyond Slim Blog',
    metaDescription: 'Discover effective natural weight loss methods that provide lasting results without harsh chemicals or extreme diets.',
    keywords: ['natural weight loss', 'weight loss methods', 'healthy weight loss', 'natural supplements']
  },
  'ayurvedic-oils-benefits': {
    id: 2,
    title: 'The Science Behind Ayurvedic Slimming Oils',
    slug: 'ayurvedic-oils-benefits',
    url: '/blog/ayurvedic-oils-benefits',
    metaTitle: 'The Science Behind Ayurvedic Slimming Oils - Beyond Slim Blog',
    metaDescription: 'Learn about the scientific benefits of Ayurvedic oils and how they support natural weight management.',
    keywords: ['ayurvedic oils', 'slimming oils', 'natural weight loss', 'ayurveda', 'traditional medicine']
  },
  'sustainable-weight-loss-routine': {
    id: 3,
    title: 'Creating a Sustainable Weight Loss Routine',
    slug: 'sustainable-weight-loss-routine',
    url: '/blog/sustainable-weight-loss-routine',
    metaTitle: 'Creating a Sustainable Weight Loss Routine - Beyond Slim Blog',
    metaDescription: 'Tips and strategies for maintaining a healthy lifestyle while achieving your weight loss goals.',
    keywords: ['sustainable weight loss', 'weight loss routine', 'healthy lifestyle', 'weight management']
  }
};

// Page URL slugs
export const pageSlugs = {
  home: {
    slug: '',
    url: '/',
    title: 'Beyond Slim - Natural Weight Loss Supplement',
    metaTitle: 'Beyond Slim - Transform Your Body Naturally',
    metaDescription: 'Transform your body naturally with Beyond Slim\'s cutting-edge formula. Visible results, 100% satisfaction guaranteed.'
  },
  about: {
    slug: 'about-us',
    url: '/about-us',
    title: 'About Beyond Slim',
    metaTitle: 'About Beyond Slim - Our Story & Mission',
    metaDescription: 'Learn about Beyond Slim\'s mission to help people achieve their weight loss goals naturally and safely.'
  },
  product: {
    slug: 'products',
    url: '/products',
    title: 'Beyond Slim Products',
    metaTitle: 'Beyond Slim Products - Natural Weight Loss Supplements',
    metaDescription: 'Explore our range of natural weight loss supplements designed to help you achieve your goals safely and effectively.'
  },
  contact: {
    slug: 'contact-us',
    url: '/contact-us',
    title: 'Contact Beyond Slim',
    metaTitle: 'Contact Us - Beyond Slim Customer Support',
    metaDescription: 'Get in touch with Beyond Slim customer support for questions about our products, orders, or general inquiries.'
  },
  faq: {
    slug: 'frequently-asked-questions',
    url: '/frequently-asked-questions',
    title: 'FAQ - Beyond Slim',
    metaTitle: 'Frequently Asked Questions - Beyond Slim',
    metaDescription: 'Find answers to common questions about Beyond Slim products, usage, shipping, and more.'
  },
  blog: {
    slug: 'health-blog',
    url: '/health-blog',
    title: 'Health & Wellness Blog',
    metaTitle: 'Health & Wellness Blog - Beyond Slim',
    metaDescription: 'Read the latest articles on natural weight loss, healthy living, and wellness tips from Beyond Slim experts.'
  },
  checkout: {
    slug: 'secure-checkout',
    url: '/secure-checkout',
    title: 'Secure Checkout',
    metaTitle: 'Secure Checkout - Beyond Slim',
    metaDescription: 'Complete your Beyond Slim purchase with our secure checkout process. Fast, safe, and convenient.'
  }
};

// Function to get slug data by URL
export const getSlugByUrl = (url) => {
  // Check product slugs
  const productSlug = Object.values(productSlugs).find(slug => slug.url === url);
  if (productSlug) return productSlug;
  
  // Check blog slugs
  const blogSlug = Object.values(blogSlugs).find(slug => slug.url === url);
  if (blogSlug) return blogSlug;
  
  // Check page slugs
  const pageSlug = Object.values(pageSlugs).find(slug => slug.url === url);
  if (pageSlug) return pageSlug;
  
  return null;
};

// Function to get blog post by slug
export const getBlogBySlug = (slug) => {
  return blogSlugs[slug] || null;
};

// Function to get product by slug
export const getProductBySlug = (slug) => {
  return productSlugs[slug] || null;
};

// Function to generate sitemap data
export const generateSitemap = () => {
  const sitemapData = [];
  
  // Add page URLs
  Object.values(pageSlugs).forEach(page => {
    sitemapData.push({
      url: page.url,
      changefreq: page.slug === '' ? 'daily' : 'weekly',
      priority: page.slug === '' ? '1.0' : '0.8'
    });
  });
  
  // Add product URLs
  Object.values(productSlugs).forEach(product => {
    sitemapData.push({
      url: product.url,
      changefreq: 'weekly',
      priority: '0.9'
    });
  });
  
  // Add blog URLs
  Object.values(blogSlugs).forEach(blog => {
    sitemapData.push({
      url: blog.url,
      changefreq: 'monthly',
      priority: '0.7'
    });
  });
  
  return sitemapData;
};

// Function to validate and sanitize slug
export const validateSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return false;
  
  // Check if slug contains only valid characters
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug) && slug.length > 0 && slug.length <= 100;
};

// Function to create breadcrumb data
export const createBreadcrumbs = (currentUrl) => {
  const breadcrumbs = [
    { label: 'Home', url: '/' }
  ];
  
  const urlParts = currentUrl.split('/').filter(part => part);
  
  if (urlParts.length > 0) {
    if (urlParts[0] === 'health-blog') {
      breadcrumbs.push({ label: 'Blog', url: '/health-blog' });
      
      if (urlParts.length > 1) {
        const blogSlug = urlParts[1];
        const blogPost = getBlogBySlug(blogSlug);
        if (blogPost) {
          breadcrumbs.push({ label: blogPost.title, url: blogPost.url });
        }
      }
    } else if (urlParts[0] === 'products') {
      breadcrumbs.push({ label: 'Products', url: '/products' });
      
      if (urlParts.length > 1) {
        const productSlug = urlParts[1];
        const product = getProductBySlug(productSlug);
        if (product) {
          breadcrumbs.push({ label: product.title, url: product.url });
        }
      }
    } else {
      // Handle other pages
      const pageSlug = Object.values(pageSlugs).find(page => 
        page.url === '/' + urlParts.join('/')
      );
      if (pageSlug) {
        breadcrumbs.push({ label: pageSlug.title, url: pageSlug.url });
      }
    }
  }
  
  return breadcrumbs;
};

const urlSlugs = {
  generateSlug,
  extractIdFromSlug,
  productSlugs,
  blogSlugs,
  pageSlugs,
  getSlugByUrl,
  getBlogBySlug,
  getProductBySlug,
  generateSitemap,
  validateSlug,
  createBreadcrumbs
};

export default urlSlugs;
