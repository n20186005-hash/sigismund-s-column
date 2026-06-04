import { useTranslations } from 'next-intl';

export default function InfoSection() {
  const t = useTranslations('knowledge');

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

        <div className="space-y-10">
          {(t.raw('sections') as Array<{id: string; title: string; content: string}>).map((section) => (
            <div key={section.id} className="scroll-mt-20">
              <h3
                id={section.id}
                className="font-display text-xl sm:text-2xl font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {section.title}
              </h3>
              <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}