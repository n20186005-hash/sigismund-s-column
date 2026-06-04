import { useTranslations } from 'next-intl';

export default function BasicInfo() {
  const t = useTranslations('basicInfo');

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

        <div className="space-y-4">
          {[
            { label: t('officialName'), value: t('officialNameValue') },
            { label: t('type'), value: t('typeValue') },
            { label: t('country'), value: t('countryValue') },
            { label: t('city'), value: t('cityValue') },
            { label: t('address'), value: t('addressValue') },
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-sm font-medium min-w-[120px]" style={{ color: 'var(--text-muted)' }}>
                {item.label}
              </span>
              <span className="text-base" style={{ color: 'var(--text-primary)' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
