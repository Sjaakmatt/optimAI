// design-sync bundle entry: the components synced to claude.ai/design.
// Keep in step with componentSrcMap in .design-sync/config.json.
import './shims/process-env';

// Ondergrond (design-sync only; the app sets this on <html>/<body>)
export * from './shims/SiteDoek';

// Site
export * from '../components/site/Breadcrumbs';
export * from '../components/site/ContactForm';
export * from '../components/site/Logostrook';
export * from '../components/site/LuchtBand';
export * from '../components/site/SiteFooter';
export * from '../components/site/SiteHeader';
export * from '../components/site/SitePage';
export * from '../components/site/Woordmerk';

// Home
export * from '../components/home/Aanpak';
export * from '../components/home/Afspraken';
export * from '../components/home/Dageraad';
export * from '../components/home/Hero';
export * from '../components/home/Landschap';
export * from '../components/home/Opkomend';
export * from '../components/home/Podium';
export * from '../components/home/PolderFoto';
export * from '../components/home/Portret';
export * from '../components/home/Projecten';
export * from '../components/home/VideoCarousel';
export * from '../components/home/WatHijDoet';

// Booking
export * from '../components/booking/AgendaDialoog';
export * from '../components/booking/AgendaKiezer';

// Site-agent
export { default as AgentPaneel } from '../components/site-agent/AgentPaneel';
export type { AgentPaneelProps } from '../components/site-agent/AgentPaneel';
export * from '../components/site-agent/SiteAgent';
export { default as TerugbelKaart } from '../components/site-agent/TerugbelKaart';
export type { TerugbelKaartProps } from '../components/site-agent/TerugbelKaart';

// Mail agent demo
export * from '../components/mailagent/MailAgent';
