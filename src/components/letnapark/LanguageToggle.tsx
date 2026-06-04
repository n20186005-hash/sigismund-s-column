'use client';

import { useParams } from 'next/navigation';

export default function LanguageToggle() {
  const params = useParams();
  const locale = params.locale as string;

  const toggleLocale = locale === 'zh' ? 'en' : 'zh';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const newPath = currentPath.replace(`/${locale}`, `/${toggleLocale}`);

  return (
    <a
      href={newPath}
      className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
      style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
    >
      {locale === 'zh' ? 'EN' : '中'}
    </a>
  );
}
