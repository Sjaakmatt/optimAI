import { JsonLd } from './JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factumai.nl';

export function OrganizationSchema() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'FactumAI',
    url: SITE_URL,
    email: 'info@factumai.nl',
    telephone: '+31-6-10555658',
    description:
      'FactumAI bouwt en implementeert AI-agents voor MKB-bedrijven. Nederlands, pragmatisch, vaste prijs.',
    image: `${SITE_URL}/opengraph-image`,
    founder: {
      '@type': 'Person',
      name: 'Sjaak ter Veld',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hoogkarspel',
      addressRegion: 'Noord-Holland',
      addressCountry: 'NL',
    },
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
    priceRange: 'Vaste prijs · op aanvraag',
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
