import { useTranslations } from 'next-intl';

export default function RouteSection() {
  const t = useTranslations('route');

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

        <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('overview')}
        </p>

        <div className="space-y-4 mb-8">
          <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {typeof window !== 'undefined' ? 
              (new URLSearchParams(window.location.search).get('locale') === 'en' ? 'Route Steps' : '游览步骤') 
              : '游览步骤'}
          </h3>
          {(t.raw('steps') as string[]).map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium" style={{ background: 'var(--accent)', color: '#fff' }}>
                {i + 1}
              </div>
              <p className="pt-1" style={{ color: 'var(--text-secondary)' }}>{step}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
          <h4 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
            {typeof window !== 'undefined' ?
              (new URLSearchParams(window.location.search).get('locale') === 'en' ? 'Additional Tips' : '补充说明')
              : '补充说明'}
          </h4>
          <ul className="space-y-2">
            {(t.raw('supplements') as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: 'var(--accent)' }}>•</span>
                <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}