import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FactumAI · AI-agents voor MKB';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(180deg, #0a0a0c 0%, #1a1220 55%, #6b3a3a 82%, #e0a070 100%)',
          color: '#f4f1ec',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '16px',
          }}
        >
          <div style={{ fontSize: 40, fontWeight: 500 }}>FactumAI</div>
          <div
            style={{
              fontSize: 14,
              color: '#e9b46a',
              fontFamily: 'monospace',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            AI-agents voor MKB
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 58,
              lineHeight: 1.08,
              whiteSpace: 'nowrap',
              fontWeight: 500,
              maxWidth: 1040,
            }}
          >
            <div>Er gaat niets mis.</div>
            <div style={{ color: '#c6c1b9' }}>
              En toch bent u elke week uren kwijt.
            </div>
          </div>
          <div style={{ fontSize: 26, color: '#c6c1b9', maxWidth: 820, lineHeight: 1.4 }}>
            Mails, offertes, orders, facturatie en planning: voorbereid tot en met het besluit.
            Uw mens tekent af.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.18)',
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: '#e9b46a',
              fontFamily: 'monospace',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            factumai.nl
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#918b82',
              fontFamily: 'monospace',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Nederlands · pragmatisch · vakmanschap
          </div>
        </div>
      </div>
    ),
    size,
  );
}
