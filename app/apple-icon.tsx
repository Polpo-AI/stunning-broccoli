import { ImageResponse } from '@vercel/og';

/**
 * Apple touch icon dinamica (iOS home screen + iPadOS).
 * Stesso design del favicon ma 180x180, square con angoli arrotondati
 * (iOS comunque applica una maschera quadrata).
 */
export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 30% 25%, #22d3ee33 0%, transparent 55%),' +
            'radial-gradient(circle at 75% 75%, #a78bfa33 0%, transparent 55%),' +
            'linear-gradient(135deg, #0B1228 0%, #1A2350 100%)',
        }}
      >
        <div
          style={{
            width: '78%',
            height: '78%',
            borderRadius: '50%',
            background: '#0B1228',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow:
              '0 0 24px rgba(34,211,238,0.4), inset 0 0 0 2px rgba(34,211,238,0.25)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://polpo-ai.com/polpo-icon.jpg"
            width={140}
            height={140}
            alt=""
            style={{ objectFit: 'cover', transform: 'scale(1.2)' }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
