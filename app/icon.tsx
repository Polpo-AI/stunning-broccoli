import { ImageResponse } from '@vercel/og';

/**
 * Favicon dinamico Next.js — generato server-side al deploy.
 *
 * Genera un PNG 192x192 con:
 * - Sfondo dark gradient cyber (matching col tema sito)
 * - Polpo mascotte centrato con leggero "halo" cyan
 * - Bordo morbido che si distingue sulla SERP bianca di Google
 *
 * Google preferisce PNG su sfondo distinguibile (non bianco/trasparente).
 * Edge runtime: la prima generazione è cached da Vercel.
 */
export const runtime = 'edge';
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default async function Icon() {
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
          borderRadius: '38px', // iOS-style rounded square
        }}
      >
        {/* Cerchio interno scuro che maschera il bordo bianco del JPG */}
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
          {/* Logo polpo — viene croppato dal cerchio sopra */}
          {/* Usiamo un'img assoluta per evitare problemi di percorso edge */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://polpo-ai.com/polpo-icon.jpg"
            width={150}
            height={150}
            alt=""
            style={{ objectFit: 'cover', transform: 'scale(1.2)' }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
