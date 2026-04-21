import { JsonLd } from './JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export function FounderSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/over#sjaak-ter-veld`,
    name: 'Sjaak ter Veld',
    givenName: 'Sjaak',
    familyName: 'ter Veld',
    jobTitle: 'Oprichter',
    description:
      'Oprichter van FactumAI. Bedrijfskundig geschoold en 8+ jaar werkzaam in IT-optimalisatie, procesverbetering en projectmanagement. Bouwt AI-agents op maat voor Nederlandse MKB-bedrijven.',
    image: `${SITE_URL}/portret.jpg`,
    url: `${SITE_URL}/over`,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    founderOf: { '@id': `${SITE_URL}/#organization` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hoogkarspel',
      addressRegion: 'Noord-Holland',
      addressCountry: 'NL',
    },
    knowsAbout: [
      'AI-agents',
      'Multi-agent systemen',
      'Procesautomatisering MKB',
      'AI-integraties',
      'Bedrijfskunde',
      'IT-optimalisatie',
      'Projectmanagement',
    ],
    knowsLanguage: ['nl-NL', 'en'],
    alumniOf: { '@type': 'EducationalOrganization', name: 'Bedrijfskunde (hoger onderwijs)' },
    nationality: { '@type': 'Country', name: 'Netherlands' },
  };

  return <JsonLd data={data} />;
}
