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
        src: '/icon.jpg',
        sizes: '570x570',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: '/apple-icon.jpg',
        sizes: '570x570',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: '/polpo-icon.jpg',
        sizes: '570x570',
        type: 'image/jpeg',
      },
    ],
  };
}
