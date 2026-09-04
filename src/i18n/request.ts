import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = (requested && routing.locales.includes(requested as any))
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../messages/${locale}.json`)).default;
  try {
    const fs = await import('node:fs');
    fs.appendFileSync(
      process.cwd() + '/dbg-request.txt',
      locale + ' routeKeys=' + Object.keys((messages as any)?.route || {}).join(',') + '\n'
    );
  } catch (e) {}
  return { locale, messages };
});