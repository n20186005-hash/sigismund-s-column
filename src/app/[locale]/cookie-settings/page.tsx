import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

const baseUrl = 'https://sigismundscolumn.com';
const selfUrls: Record<string, string> = {
  pl: `${baseUrl}/pl`,
  en: `${baseUrl}/en`,
  zh: `${baseUrl}/zh`,
  ru: `${baseUrl}/ru`,
  de: `${baseUrl}/de`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = '/cookie-settings';
  const selfUrl = (selfUrls[locale] || selfUrls.pl) + path;
  const languages: Record<string, string> = {
    pl: selfUrls.pl + path,
    en: selfUrls.en + path,
    zh: selfUrls.zh + path,
    ru: selfUrls.ru + path,
    de: selfUrls.de + path,
    'x-default': selfUrls.pl + path,
  };

  return {
    alternates: {
      canonical: selfUrl,
      languages,
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
