import { Breadcrumbs } from 'factumai-demo';

/** Een binnenpagina twee niveaus diep. */
export function Kennisartikel() {
  return (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Kennis', href: '/kennis' },
        { label: 'AI-agents implementeren', href: '/kennis/ai-agents-implementeren' },
      ]}
    />
  );
}

/** Het kortste pad: één niveau onder de homepage. */
export function EenNiveau() {
  return (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  );
}

/** Een diep pad dat op smalle schermen doorloopt naar een tweede regel. */
export function DiepPad() {
  return (
    <div style={{ maxWidth: 360 }}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Diensten', href: '/diensten' },
          { label: 'AI-agent laten bouwen', href: '/diensten/ai-agent-laten-bouwen' },
          { label: 'Mailafhandeling voor de groothandel', href: '/diensten/ai-agent-laten-bouwen/mail' },
        ]}
      />
    </div>
  );
}
