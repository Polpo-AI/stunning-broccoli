'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
export default function PageChrome({ children }: { children: React.ReactNode }) { return <><main id="main-content" tabIndex={-1} className={usePathname() === '/' ? 'a-home' : 'a-inner'}>{children}</main><Footer /></>; }
