import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import TentacleDefs from '@/components/shared/v2/TentacleDefs';
import NavbarV2 from '@/components/landing/v2/NavbarV2';
import FooterV2 from '@/components/landing/v2/FooterV2';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://polpo-ai.com'),
  title: 'PolpoAI — Otto braccia, infinite cose fatte bene',
  description: 'Siti, chatbot e agenti AI su misura per il tuo business.',
  openGraph: {
    title: 'PolpoAI — Otto braccia, infinite cose fatte bene',
    description: 'Siti, chatbot e agenti AI su misura per il tuo business.',
    url: 'https://polpo-ai.com',
    siteName: 'PolpoAI',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/polpo.png', width: 1200, height: 630, alt: 'PolpoAI Mascotte' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PolpoAI — Otto braccia, infinite cose fatte bene',
    description: 'Siti, chatbot e agenti AI su misura per il tuo business.',
    images: ['/polpo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-[#070B14] text-white antialiased">
        <TentacleDefs />
        <div className="fixed inset-0 -z-10 pointer-events-none" />
        <NavbarV2 />
        <main>{children}</main>
        <FooterV2 />
      </body>
    </html>
  );
}
