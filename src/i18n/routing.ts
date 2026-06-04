import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en', 'pl', 'ru', 'de'],
  defaultLocale: 'zh',
  localePrefix: {
    mode: 'always',
  },
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/letnapark': {
      zh: '/letnapark',
      en: '/letnapark',
      pl: '/letnapark',
      ru: '/letnapark',
      de: '/letnapark',
    },
    '/sigismunds-column': {
      zh: '/sigismunds-column',
      en: '/sigismunds-column',
      pl: '/sigismunds-column',
      ru: '/sigismunds-column',
      de: '/sigismunds-column',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
