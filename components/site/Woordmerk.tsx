// Het woordmerk: een klein beeldmerk (drie lagen, zoals het landschap in de
// hero) naast de naam. Puur SVG, dus scherp op elk scherm en zonder plaatje.

export function Woordmerk({ groot = false }: { groot?: boolean }) {
  const maat = groot ? 30 : 24;
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg
        width={maat}
        height={maat}
        viewBox="0 0 24 24"
        aria-hidden
        focusable="false"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="wm-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0b27a" />
            <stop offset="1" stopColor="#c4643f" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="22" height="22" rx="7" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
        <path d="M4 15.5 C 7 12, 9 12, 12 14.5 S 17 17, 20 13.5 V 20 H 4 Z" fill="rgba(255,255,255,0.22)" />
        <path d="M4 17.5 C 7.5 15, 10 15.5, 12.5 17 S 17.5 19, 20 16.5 V 20 H 4 Z" fill="rgba(255,255,255,0.55)" />
        <circle cx="16.5" cy="8" r="2.6" fill="url(#wm-g)" />
      </svg>
      <span
        className={`font-display leading-none tracking-[-0.02em] text-[var(--fg)] ${groot ? 'text-[24px]' : 'text-[18px]'}`}
      >
        Factum<span className="text-[var(--accent-text)]">AI</span>
      </span>
    </span>
  );
}
