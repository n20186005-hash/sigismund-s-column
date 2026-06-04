import { useTranslations } from 'next-intl';

export default function HoursSection() {
  const t = useTranslations('hours');

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-tertiary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{t('outdoor')}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{t('outdoorTime')}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-tertiary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{t('lighthouse')}</h3>
              <div className="space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <p><span style={{ color: 'var(--text-muted)' }}>{t('summer')}:</span> {t('summerTime')}</p>
                <p><span style={{ color: 'var(--text-muted)' }}>{t('winter')}:</span> {t('winterTime')}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <h4 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{t('warning')}</h4>
                <p style={{ color: 'var(--text-secondary)' }}>{t('warningTime')}</p>
              </div>
            </div>
          </div>

          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            💡 {t('tip')}
          </p>
        </div>
      </div>
    </section>
  );
}
