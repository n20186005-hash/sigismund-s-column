'use client';

import { useTranslations } from 'next-intl';

export default function HotelsSection() {
  const t = useTranslations('hotels');
  const hotels = t.raw('hotels') as Array<{name: string; desc: string; price: string}>;

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

        <div className="space-y-4">
          {hotels.map((hotel, i) => (
            <div key={i} className="p-5 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{hotel.name}</h4>
                  <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{hotel.desc}</p>
                </div>
                <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: 'var(--accent)', color: '#fff' }}>
                  {hotel.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg border" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
          <h4 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{t('supplements')}</h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('supplementsContent')}</p>
        </div>
      </div>
    </section>
  );
}