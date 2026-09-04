import { useTranslations, useLocale } from 'next-intl';

const officialLinkUrls = [
  'https://www.gov.pl/',
  'https://www.poland.travel/en/',
  'https://nid.pl/',
  'https://um.warszawa.pl/',
  'https://go2warsaw.pl/',
  'https://www.bn.org.pl/',
  'https://www.mazovia.pl/',
];

const officialLinkNames: Record<string, string[]> = {
  zh: [
    '波兰共和国门户网站（gov.pl）',
    '波兰国家旅游局（Poland Travel）',
    '波兰国家遗产研究院（NID）',
    '华沙市政府（um.warszawa.pl）',
    '华沙市旅游局（Go2Warsaw）',
    '波兰国家图书馆',
    '马佐夫舍省政府',
  ],
  en: [
    'Government of Poland (gov.pl)',
    'Poland Travel – National Tourist Office',
    'National Heritage Board of Poland (NID)',
    'City of Warsaw (um.warszawa.pl)',
    'Warsaw Tourist Organization (Go2Warsaw)',
    'National Library of Poland',
    'Mazovia Province Government',
  ],
  pl: [
    'Rząd RP – portal gov.pl',
    'Polska Organizacja Turystyczna (Poland Travel)',
    'Narodowy Instytut Dziedzictwa (NID)',
    'Miasto Stołeczne Warszawa (um.warszawa.pl)',
    'Warszawska Organizacja Turystyczna (Go2Warsaw)',
    'Biblioteka Narodowa',
    'Samorząd Województwa Mazowieckiego',
  ],
  ru: [
    'Правительство Польши (gov.pl)',
    'Польский туристический портал (Poland Travel)',
    'Национальный институт культурного наследия (NID)',
    'Мэрия Варшавы (um.warszawa.pl)',
    'Варшавская туристическая организация (Go2Warsaw)',
    'Национальная библиотека Польши',
    'Правительство Мазовецкого воеводства',
  ],
  de: [
    'Regierung von Polen (gov.pl)',
    'Polen Travel – Nationales Tourismusbüro',
    'Nationales Institut für Kulturerbe Polens (NID)',
    'Stadt Warschau (um.warszawa.pl)',
    'Warschauer Tourismusorganisation (Go2Warsaw)',
    'Nationalbibliothek Polens',
    'Verwaltung der Woiwodschaft Masowien',
  ],
};

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const prefix = `/${locale}`;
  const names = officialLinkNames[locale] || officialLinkNames.en;

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Sigismund&apos;s Column
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('officialResourcesTitle')}
            </p>
            <div className="flex flex-col gap-2">
              {officialLinkUrls.map((url, i) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-sm"
                  style={{ color: 'var(--accent)' }}
                >
                  {names[i] || url}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mt-4 sm:mt-0">
            <a href={`${prefix}/privacy-policy`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('privacy')}
            </a>
            <a href={`${prefix}/terms-of-service`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('terms')}
            </a>
            <a href={`${prefix}/cookie-settings`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('cookies')}
            </a>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('lastUpdated')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('photoCredit')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
