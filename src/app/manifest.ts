import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sigismund's Column - Warsaw Visitor Guide",
    short_name: 'Sigismund Column',
    description:
      "Complete visitor guide to Sigismund's Column at Castle Square in Warsaw, Poland: history, opening hours, transport, photos and travel tips.",
    start_url: '/pl',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3a7a8d',
    lang: 'pl',
    categories: ['travel', 'education'],
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
