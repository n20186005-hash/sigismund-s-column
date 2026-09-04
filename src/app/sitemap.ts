import type { MetadataRoute } from 'next';

const baseUrl = 'https://sigismundscolumn.com';
const locales = ['pl', 'en', 'zh', 'ru', 'de'] as const;
const pagePaths = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of pagePaths) {
      const urlPath = path === '' ? `/${locale}` : `/${locale}${path}`;
      const languages: Record<string, string> = {
        pl: `${baseUrl}/pl${path}`,
        en: `${baseUrl}/en${path}`,
        zh: `${baseUrl}/zh${path}`,
        ru: `${baseUrl}/ru${path}`,
        de: `${baseUrl}/de${path}`,
        'x-default': `${baseUrl}/pl${path}`,
      };

      entries.push({
        url: `${baseUrl}${urlPath}`,
        lastModified: new Date('2026-09-04'),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : 0.6,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
