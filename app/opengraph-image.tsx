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
          background: '#f4ede0',
          color: '#2a2420',
          fontFamily: 'serif',
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
              color: '#8a8070',
              fontFamily: 'monospace',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            AI-agents voor MKB
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 500, maxWidth: 900 }}>
            Uw digitale collega.
            <br />
            <span style={{ fontStyle: 'italic', color: '#5c5248' }}>Geen dashboard.</span>
          </div>
          <div style={{ fontSize: 26, color: '#5c5248', maxWidth: 820, lineHeight: 1.4 }}>
            AI-agents die het echte werk doen. Mails, offertes, orders, facturatie, planning.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #ddd1b8',
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: '#8a8070',
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
              color: '#a8803a',
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
