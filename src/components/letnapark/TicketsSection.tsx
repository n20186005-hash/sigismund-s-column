import { useTranslations } from 'next-intl';

export default function TicketsSection() {
  const t = useTranslations('tickets');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          <div className="p-6 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="flex items-center gap-3 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{t('outdoor')}</h3>
            </div>
            <p className="text-2xl font-semibold" style={{ color: 'var(--accent)' }}>{t('outdoorPrice')}</p>
          </div>

          <div className="p-6 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="flex items-center gap-3 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{t('lighthouse')}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>{t('adults')}</span>
                <span style={{ color: 'var(--text-primary)' }}>{t('adultsPrice')}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>{t('students')}</span>
                <span style={{ color: 'var(--text-primary)' }}>{t('studentsPrice')}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>{t('children')}</span>
                <span style={{ color: 'var(--text-primary)' }}>{t('childrenPrice')}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <div>
                <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{t('card')}</h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('cardPrice')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
