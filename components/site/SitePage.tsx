import type { ReactNode } from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { LuchtBand } from './LuchtBand';
import { SectieOnthulling } from './SectieOnthulling';

export function SitePage({ children, lucht = true }: { children: ReactNode; lucht?: boolean }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      {lucht && <LuchtBand />}
      <SiteHeader />
      <main className="relative flex-1">{children}</main>
      <SiteFooter />
      {lucht && <SectieOnthulling />}
    </div>
  );
}
