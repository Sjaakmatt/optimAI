import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FactumAI · AI-agents voor MKB',
    short_name: 'FactumAI',
    description:
      'AI-agents die het dagelijkse werk van MKB-bedrijven overnemen. Mails, offertes, orders, facturatie, inkoop, planning.',
    lang: 'nl-NL',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f5efe4',
    theme_color: '#1a1814',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
