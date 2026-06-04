import { useTranslations } from 'next-intl';

export default function Recommendations() {
  const t = useTranslations('recommendations');
  const attractions = t.raw('attractions') as Array<{name: string; url: string}>;
  const tours = t.raw('tours') as Array<{name: string; url: string}>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-8"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3
              className="font-medium text-lg mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('attractionsTitle')}
            </h3>
            <div className="space-y-3">
              {attractions.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl transition-colors"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--accent)', color: '#fff' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--text-primary)' }}>{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="font-medium text-lg mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('toursTitle')}
            </h3>
            <div className="space-y-3">
              {tours.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl transition-colors"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--accent)', color: '#fff' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--text-primary)' }}>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}