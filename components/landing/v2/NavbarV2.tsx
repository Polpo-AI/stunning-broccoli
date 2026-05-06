'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const links = [
  { label: 'Lavoro', href: '/' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Casi',   href: '/#casi' },
  { label: 'Diario', href: '/#diario' },
];

export default function NavbarV2() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="sticky top-0 z-50 h-[76px] px-8 flex items-center backdrop-blur-[28px] border-b"
      style={{
        background: scrolled ? 'rgba(7,11,20,0.92)' : 'rgba(7,11,20,0.85)',
        borderColor: 'rgba(255,255,255,0.10)',
      }}
    >
      <div className="max-w-[1320px] mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo a.jpg" alt="" width={34} height={34} className="rounded-[9px]" />
          <span className="font-display text-[22px] font-semibold italic tracking-tight">
            Polpo<span className="text-cyan-400 not-italic font-normal">/AI</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-9">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href="/contatti"
          className="px-[22px] py-[11px] rounded-full bg-white text-[#070B14] text-sm font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform"
        >
          Parliamone
          <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-pulse-magenta" />
        </Link>
      </div>
    </motion.nav>
  );
}
