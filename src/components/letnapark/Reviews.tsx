'use client';

import { useTranslations } from 'next-intl';

export default function Reviews() {
  const t = useTranslations('reviews');
  const reviews = t.raw('items') as Array<{name: string; date: string; rating: number; text: string}>;

  return (
    <section id="reviews" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          {reviews.map((review, i) => (
            <div key={i} className="p-6 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: 'var(--accent)', color: '#fff' }}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{review.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={j < review.rating ? '#f0b429' : 'none'} stroke={j < review.rating ? '#f0b429' : 'var(--border-color)'} strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{review.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{t('declaration')}</p>
          <a
            href="https://maps.app.goo.gl/ZbALGJAhPn7YohZaA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline"
            style={{ color: 'var(--accent)' }}
          >
            {t('moreReviews')}
          </a>
        </div>
      </div>
    </section>
  );
}