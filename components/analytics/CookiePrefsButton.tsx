'use client';

// Heropent de cookiebanner zodat de bezoeker zijn keuze kan herzien of
// intrekken. Alleen zichtbaar als er analytics geconfigureerd is.
import { GA_ID } from '@/lib/analytics/gtag';

export function CookiePrefsButton({ className }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-cookie-consent'))}
      className={className ?? 'uppercase tracking-[0.14em] hover:text-[var(--ink)] transition-colors'}
    >
      Cookievoorkeuren
    </button>
  );
}
