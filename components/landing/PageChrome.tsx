'use client';
import { usePathname } from 'next/navigation';
import Footer from '@/components/landing/Footer';

export default function PageChrome({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === '/';
  return <><main id="main-content" tabIndex={-1} className={isHome ? 'home-main' : 'legacy-main'}>{children}</main><Footer /></>;
}
