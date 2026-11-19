import { MetadataRoute } from 'next';
import { siteUrl, sitemapEntries } from '@/lib/site-index';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map(({ path, updated }) => ({
    url: `${siteUrl}${path}`,
    lastModified: updated,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
