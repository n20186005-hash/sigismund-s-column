import { useLocale, useTranslations } from 'next-intl';

// Open-Meteo 免费天气 API（无需密钥，适合非营利项目）
// 数据在服务器端获取并缓存 30 分钟（ISR revalidate: 1800）
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

// Sigismund's Column / Castle Square, Warsaw
const LATITUDE = 52.2474;
const LONGITUDE = 21.0135;

function wmoCategory(code: number): string {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'showers';
  if (code === 85 || code === 86) return 'snowShowers';
  if (code >= 95) return 'thunder';
  return 'clear';
}

const GLYPHS: Record<string, string> = {
  clear: '☀️',
  partly: '⛅',
  overcast: '☁️',
  fog: '🌫️',
  drizzle: '🌦️',
  rain: '🌧️',
  snow: '🌨️',
  showers: '🌦️',
  snowShowers: '🌨️',
  thunder: '⛈️',
};

export default async function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();

  let weather: {
    current: { temp: number; feels: number; humidity: number; wind: number; code: number };
    daily: { dates: string[]; codes: number[]; max: number[]; min: number[]; precip: number[] };
  } | null = null;

  try {
    const url =
      `${WEATHER_API}?latitude=${LATITUDE}&longitude=${LONGITUDE}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&timezone=Europe%2FWarsaw&forecast_days=5`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (res.ok) {
      const data = await res.json();
      weather = {
        current: {
          temp: Math.round(data.current.temperature_2m),
          feels: Math.round(data.current.apparent_temperature),
          humidity: Math.round(data.current.relative_humidity_2m),
          wind: Math.round(data.current.wind_speed_10m),
          code: data.current.weather_code,
        },
        daily: {
          dates: data.daily.time as string[],
          codes: data.daily.weather_code as number[],
          max: data.daily.temperature_2m_max.map((v: number) => Math.round(v)),
          min: data.daily.temperature_2m_min.map((v: number) => Math.round(v)),
          precip: data.daily.precipitation_probability_max ?? [],
        },
      };
    }
  } catch {
    weather = null;
  }

  const fmtDay = (dateStr: string) =>
    new Date(dateStr + 'T00:00:00').toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

  return (
    <section id="weather" className="section-padding">
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

        {weather ? (
          <div className="space-y-6">
            {/* Current weather */}
            <div
              className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <div className="text-6xl sm:text-7xl leading-none" aria-hidden="true">
                {GLYPHS[wmoCategory(weather.current.code)] || GLYPHS.clear}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {weather.current.temp}°C
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                    {t(`codes.${wmoCategory(weather.current.code)}`)}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t('location')} · {t('updated')}: {new Date().toLocaleTimeString(locale === 'zh' ? 'zh-CN' : locale, { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:text-center">
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{t('feelsLike')}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{weather.current.feels}°C</p>
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{t('humidity')}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{weather.current.humidity}%</p>
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{t('wind')}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{weather.current.wind} km/h</p>
                </div>
              </div>
            </div>

            {/* Multi-day forecast */}
            <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h3 className="font-medium mb-5" style={{ color: 'var(--text-primary)' }}>{t('forecastTitle')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {weather.daily.dates.map((date, i) => (
                  <div
                    key={date}
                    className="rounded-xl p-4 flex flex-col items-center gap-1.5 text-center"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                  >
                    <p className="text-xs w-full truncate" style={{ color: 'var(--text-muted)' }}>{fmtDay(date)}</p>
                    <span className="text-2xl leading-none" aria-hidden="true">{GLYPHS[wmoCategory(weather.daily.codes[i])] || GLYPHS.clear}</span>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {weather.daily.max[i]}° / {weather.daily.min[i]}°
                    </p>
                    <p className="text-xs" style={{ color: 'var(--accent)' }}>
                      {t('precip')} {weather.daily.precip[i] != null ? `${weather.daily.precip[i]}%` : '–'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('source')}</p>
          </div>
        ) : (
          <div
            className="rounded-2xl p-8 text-center text-sm"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
          >
            {t('fallback')}
          </div>
        )}
      </div>
    </section>
  );
}
