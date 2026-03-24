import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://polpo-ai.com';

  const routes = [
    '',
    '/creazione-siti-web',
    '/chatbot-whatsapp-prenotazioni',
    '/agenti-ai',
    '/chatbot-whatsapp-prenotazioni-ristoranti',
    '/chatbot-whatsapp-prenotazioni-centri-estetici',
    '/chatbot-whatsapp-prenotazioni-studi-medici',
    '/chatbot-whatsapp-prenotazioni-palestre',
    '/chatbot-whatsapp-prenotazioni-hotel-bb',
    '/chatbot-whatsapp-prenotazioni-padel',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
