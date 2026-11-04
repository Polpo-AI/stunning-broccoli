import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Polpo AI — Automazioni intelligenti per le PMI', short_name: 'Polpo AI',
    description: 'Assistenti AI, prenotazioni e automazioni dei processi su misura per le piccole e medie imprese.',
    start_url: '/', display: 'standalone', background_color: '#080e23', theme_color: '#080e23', lang: 'it-IT',
    icons: [{ src: '/icon', sizes: '192x192', type: 'image/png', purpose: 'any' }, { src: '/apple-icon', sizes: '180x180', type: 'image/png', purpose: 'any' }],
  };
}
