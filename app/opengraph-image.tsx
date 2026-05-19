import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export const alt = 'PolpoAI — Siti web, Chatbot WhatsApp e Agenti AI su misura';
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
          padding: '64px',
          background:
            'radial-gradient(ellipse 100% 70% at 50% -10%, rgba(34,211,238,0.45) 0%, transparent 60%),' +
            'radial-gradient(ellipse 70% 60% at 95% 25%, rgba(167,139,250,0.40) 0%, transparent 55%),' +
            'radial-gradient(ellipse 55% 50% at 8% 35%, rgba(96,165,250,0.30) 0%, transparent 55%),' +
            'radial-gradient(ellipse 50% 45% at 82% 70%, rgba(244,63,94,0.32) 0%, transparent 55%),' +
            'radial-gradient(ellipse 60% 50% at 25% 90%, rgba(52,211,153,0.30) 0%, transparent 55%),' +
            'linear-gradient(180deg, #0B1228 0%, #0C1530 50%, #0B142E 100%)',
          color: '#f1f5f9',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src={`https://polpo-ai.com/polpo-icon.jpg`}
            width={64}
            height={64}
            style={{
              borderRadius: '16px',
              boxShadow: '0 0 24px rgba(34,211,238,0.4)',
            }}
            alt="PolpoAI logo"
          />
          <div
            style={{
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            <span style={{ color: '#f1f5f9' }}>Polpo</span>
            <span
              style={{
                background: 'linear-gradient(135deg, #22d3ee, #a78bfa)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI
            </span>
          </div>
        </div>

        {/* Middle: claim */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '88px',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Il tuo business,</span>
            <span
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 45%, #a78bfa 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              più semplice.
            </span>
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#cbd5e1',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Siti web, chatbot WhatsApp e agenti AI su misura. Per PMI italiane.
          </div>
        </div>

        {/* Bottom: 3 services tags */}
        <div style={{ display: 'flex', gap: '14px' }}>
          {[
            { label: 'Siti Web', color: '#38bdf8' },
            { label: 'Chatbot WhatsApp', color: '#10b981' },
            { label: 'Agenti AI', color: '#a78bfa' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: '999px',
                background: `${s.color}1F`,
                border: `1px solid ${s.color}66`,
                color: s.color,
                fontSize: '22px',
                fontWeight: 600,
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
