import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

const PLAYFAIR_ITALIC_BOLD =
  'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd1-vwONRk.ttf';

export default async function Icon() {
  const fontData = await fetch(PLAYFAIR_ITALIC_BOLD).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#2a2420',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#a8803a',
          fontSize: 380,
          fontFamily: 'Playfair',
          fontStyle: 'italic',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          paddingBottom: 24,
        }}
      >
        F
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Playfair',
          data: fontData,
          style: 'italic',
          weight: 700,
        },
      ],
    },
  );
}
