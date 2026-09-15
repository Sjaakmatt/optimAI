import type { CSSProperties, ReactNode } from 'react';

/**
 * De ondergrond van de site: het leigrijze vlak met warm-witte tekst dat de
 * app op <html> en <body> zet. Zet elke pagina of elk ontwerp hierin (of geef
 * de root zelf `background: var(--bg); color: var(--fg)`), anders staan de
 * componenten op wit en verdwijnt de tekst.
 */
export function SiteDoek({
  children,
  vol = false,
  className = '',
  style,
}: {
  children: ReactNode;
  /** Vul het hele scherm (pagina) in plaats van een afgerond vlak (kaart). */
  vol?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`antialiased ${vol ? 'min-h-screen' : 'rounded-[14px] p-6'} ${className}`}
      style={{ background: 'var(--bg)', color: 'var(--fg)', ...style }}
    >
      {children}
    </div>
  );
}
