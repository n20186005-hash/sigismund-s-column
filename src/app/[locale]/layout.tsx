import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const baseUrl = 'https://sigismundscolumn.com';
const mapsUrl = 'https://maps.app.goo.gl/qfsryFsYLAMbNAku8';
const heroImageUrl = `${baseUrl}/gallery/images%20(1).jpg`;

const selfUrls: Record<string, string> = {
  pl: `${baseUrl}/pl`,
  en: `${baseUrl}/en`,
  zh: `${baseUrl}/zh`,
  ru: `${baseUrl}/ru`,
  de: `${baseUrl}/de`,
};

const localeMap: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  pl: 'pl_PL',
  ru: 'ru_RU',
  de: 'de_DE',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await getMessages()) as any;
  const selfUrl = selfUrls[locale] || selfUrls.pl;

  const languages: Record<string, string> = {
    pl: selfUrls.pl,
    en: selfUrls.en,
    zh: selfUrls.zh,
    ru: selfUrls.ru,
    de: selfUrls.de,
    'x-default': selfUrls.pl,
  };

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: selfUrl,
      languages,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "Sigismund's Column",
      locale: localeMap[locale] || 'pl_PL',
      type: 'website',
      images: [
        {
          url: heroImageUrl,
          alt: `${messages.hero.title} - Plac Zamkowy, Warszawa`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [heroImageUrl],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages() as any;

  const langMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en',
    pl: 'pl',
    ru: 'ru',
    de: 'de',
  };

  const selfUrl = selfUrls[locale] || selfUrls.pl;
  const heroTitle = messages?.hero?.title || "Sigismund's Column";

  const touristAttraction = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${selfUrl}#attraction`,
    name: heroTitle,
    alternateName: ["Sigismund's Column", 'Kolumna Zygmunta III Wazy', 'Pomnik króla Zygmunta III Wazy'],
    description: messages?.meta?.description || 'Complete visitor guide to Sigismund\'s Column in Warsaw, Poland.',
    url: selfUrl,
    image: [heroImageUrl],
    isAccessibleForFree: true,
    touristType: ['Historical monument', 'Old Town landmark'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plac Zamkowy',
      addressLocality: 'Warszawa',
      addressRegion: 'Mazowieckie',
      postalCode: '00-001',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.2472527,
      longitude: 21.0133777,
    },
    hasMap: mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      bestRating: '5',
      reviewCount: '18224',
    },
    sameAs: [
      mapsUrl,
      'https://en.wikipedia.org/wiki/Sigismund%27s_Column',
      'https://www.poland.travel/en/',
    ],
  };

  const eeaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: "Sigismund's Column",
        url: baseUrl,
        logo: `${baseUrl}/icons/icon.svg`,
        description:
          "Independent, non-commercial visitor information project about Sigismund's Column in Warsaw, Poland.",
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: "Sigismund's Column",
        inLanguage: ['pl', 'en', 'zh', 'ru', 'de'],
        publisher: { '@id': `${baseUrl}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${selfUrl}#webpage`,
        url: selfUrl,
        name: messages?.meta?.title || "Sigismund's Column",
        description: messages?.meta?.description || 'Visitor guide to Sigismund\u2019s Column in Warsaw.',
        inLanguage: langMap[locale] || 'pl',
        dateModified: '2026-09-04',
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${selfUrl}#attraction` },
        primaryImageOfPage: heroImageUrl,
      },
    ],
  };

  const gaScript = `(function () {
  var KEY = 'cookiePrefs';
  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP';
    document.head.appendChild(s);
    gtag('config', 'G-HXM22WWPKP', { anonymize_ip: true });
  }
  function shouldLoad() {
    try {
      var prefs = JSON.parse(localStorage.getItem(KEY) || '{}');
      return prefs.analytics === true;
    } catch (e) { return false; }
  }
  if (shouldLoad()) { loadGA(); }
  document.addEventListener('consent-updated', function () { if (shouldLoad()) { loadGA(); } });
})();`;

  const swScript = `if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0 && !location.hostname.includes('localhost')) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });
}`;

  return (
    <html lang={langMap[locale] || 'pl'} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <meta name="theme-color" content="#3a7a8d" />
        <meta name="application-name" content="Sigismund's Column" />
        <meta name="apple-mobile-web-app-title" content="Sigismund's Column" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttraction) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eeaGraph) }}
        />
        <script dangerouslySetInnerHTML={{ __html: gaScript }} />
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
