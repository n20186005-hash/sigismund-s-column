'use client';

import { useTranslations } from 'next-intl';

export default function PhotoSpotsSection() {
  const t = useTranslations('photoSpots');
  const spots = t.raw('spots') as Array<{name: string; desc: string}>;

  return (
    <section id="gallery" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {spots.map((spot, i) => (
            <div key={i} className="p-5 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)', color: '#fff' }}>
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{spot.name}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{spot.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg border" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
          <h4 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{t('tips')}</h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('tipsContent')}</p>
        </div>
      </div>
    </section>
  );
}