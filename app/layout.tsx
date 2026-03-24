import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SmoothScroll from '@/components/landing/SmoothScroll';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import BottomNav from '@/components/landing/BottomNav';
import { PageWrapper } from '@/components/landing/PageWrapper';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'PolpoAI — Siti web, Chatbot e Agenti AI su misura',
  description:
    'PolpoAI crea siti web, chatbot personalizzati e agenti AI su misura per il tuo business. Risparmia tempo e non perdere più contatti.',
  openGraph: {
    title: 'PolpoAI — Siti web, Chatbot e Agenti AI su misura',
    description: 'PolpoAI crea siti web, chatbot personalizzati e agenti AI su misura per il tuo business.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.variable}>
      <body className={inter.className}>
        {/*
          Persistent background: always mounted, never re-renders during navigation.
          Gives visual continuity between pages.
        */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(6,182,212,0.06) 0%, transparent 65%),' +
              'radial-gradient(ellipse 60% 50% at 10% 90%, rgba(6,182,212,0.04) 0%, transparent 60%),' +
              '#070B14',
          }}
        />
        <SmoothScroll>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            {/* pb-24 per bottom nav clearance */}
            <main className="flex-1 pt-[72px] pb-24 relative z-10">
              <PageWrapper>{children}</PageWrapper>
            </main>
            <Footer />
          </div>
        </SmoothScroll>
        {/* Bottom Nav fuori da SmoothScroll per restare sempre visibile */}
        <BottomNav />
      </body>
    </html>
  );
}
