/**
 * Sitemap Generator for Beyond Slim
 * Generates XML sitemap for SEO purposes
 */

import { generateSitemap } from '../utils/urlSlugs';

export const generateSitemapXML = () => {
  const sitemapData = generateSitemap();
  const baseUrl = 'https://beyondslim.com'; // Replace with your actual domain
  
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapData.map(item => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
};

export const downloadSitemap = () => {
  const xmlContent = generateSitemapXML();
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const sitemapGenerator = {
  generateSitemapXML,
  downloadSitemap
};

export default sitemapGenerator;
