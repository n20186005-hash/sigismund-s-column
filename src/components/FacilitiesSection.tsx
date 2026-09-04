import { useTranslations } from 'next-intl';

const FACILITY_ICONS = ['🚻', '🅿️', '🍽️', '🏨', '🛒', '⛽', '💊', '🏧', '📶', '♿', '🚲'];

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const items = t.raw('items') as Array<{ name: string; desc: string }>;

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 flex items-start gap-4"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                {FACILITY_ICONS[i] || '✓'}
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-6 rounded-xl p-4 flex items-start gap-3 text-xs leading-relaxed"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <span className="flex-shrink-0">💡</span>
          <span style={{ color: 'var(--text-muted)' }}>{t('note')}</span>
        </div>
      </div>
    </section>
  );
}
