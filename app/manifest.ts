import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PolpoAI — Siti Web, Assistente WhatsApp e Automazioni Intelligenti',
    short_name: 'PolpoAI',
    description:
      'Siti web vetrina, assistente WhatsApp con dashboard e automazioni intelligenti. Costruiti su misura, insieme o separatamente.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1228',
    theme_color: '#0B1228',
    lang: 'it-IT',
    icons: [
      {
        src: '/icon',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
