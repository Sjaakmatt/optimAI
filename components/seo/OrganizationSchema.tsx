import { JsonLd } from './JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

// Externe, geverifieerde bedrijfsprofielen. Alleen live URLs toevoegen.
const SAME_AS: string[] = [
  'https://www.linkedin.com/company/factumai',
];

export function OrganizationSchema() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'FactumAI',
    legalName: 'FactumAI B.V.',
    url: SITE_URL,
    email: 'info@factumai.nl',
    telephone: '+31-6-10555658',
    description:
      'FactumAI bouwt en implementeert AI-agents voor MKB-bedrijven. Nederlands, pragmatisch, vaste prijs.',
    image: `${SITE_URL}/opengraph-image`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    foundingDate: '2026',
    founder: { '@type': 'Person', name: 'Sjaak ter Veld', url: `${SITE_URL}/over/sjaak-ter-veld` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hoogkarspel',
      addressRegion: 'Noord-Holland',
      postalCode: '1616',
      addressCountry: 'NL',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 52.6939, longitude: 5.1494 },
    areaServed: {
      '@type': 'Country',
      name: 'Netherlands',
    },
    knowsAbout: [
      'AI-agents',
      'Procesautomatisering',
      'MKB-automatisering',
      'Offertes automatiseren',
      'Orderverwerking',
      'Facturatie-automatisering',
    ],
    ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+31-6-10555658',
      email: 'info@factumai.nl',
      areaServed: 'NL',
      availableLanguage: ['Dutch', 'nl'],
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'FactumAI',
    inLanguage: 'nl-NL',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  return <JsonLd data={[organization, website]} />;
}
