import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import TentacleDefs from '@/components/shared/v2/TentacleDefs';
import NavbarV2 from '@/components/landing/v2/NavbarV2';
import FooterV2 from '@/components/landing/v2/FooterV2';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'PolpoAI — Otto braccia, infinite cose fatte bene',
  description: 'Siti, chatbot e agenti AI su misura per il tuo business. Editorial v2.',
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-[#070B14] text-white antialiased">
        <TentacleDefs />
        <div className="page-bg-v2 fixed inset-0 -z-10 pointer-events-none" />
        <NavbarV2 />
        <main>{children}</main>
        <FooterV2 />
      </body>
    </html>
  );
}
