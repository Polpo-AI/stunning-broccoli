'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Globe, MessageSquare, Bot, X, Menu } from 'lucide-react';

const serviziLinks = [
  { label: 'Siti Web Vetrina', href: '/creazione-siti-web', icon: Globe, color: 'text-cyan-400' },
  { label: 'Chatbot WhatsApp', href: '/chatbot-whatsapp-prenotazioni', icon: MessageSquare, color: 'text-emerald-400' },
  { label: 'Agenti AI', href: '/agenti-ai', icon: Bot, color: 'text-violet-400' },
];

const isServiziActive = (pathname: string) =>
  serviziLinks.some((l) => pathname.startsWith(l.href));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviziOpen, setServiziOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => { setMenuOpen(false); setServiziOpen(false); }, [pathname]);

  const activeLink = 'text-white font-semibold';
  const baseLink  = 'text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium relative group';

  const isHome     = pathname === '/';
  const isContatti = pathname === '/#contatti';
  const isServizi  = isServiziActive(pathname);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
        scrolled
          ? 'bg-[#070B14]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden">
            <Image src="/logo a.jpg" alt="PolpoAI logo" fill className="object-contain" />
          </div>
          <span className="text-[1.1rem] font-bold text-white tracking-tight">
            Polpo<span className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">AI</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-7">

          <Link href="/" className={`${baseLink} ${isHome ? activeLink : ''}`}>
            Home
            {isHome && <span className="absolute -bottom-1 left-0 w-full h-px bg-cyan-400 rounded" />}
          </Link>

          {/* Servizi Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServiziOpen(true)}
            onMouseLeave={() => setServiziOpen(false)}
          >
            <button
              className={`flex items-center gap-1 ${baseLink} ${isServizi ? activeLink : ''} py-1.5`}
              aria-expanded={serviziOpen}
              aria-haspopup="true"
            >
              Servizi
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${serviziOpen ? 'rotate-180' : ''}`} />
              {isServizi && <span className="absolute -bottom-0.5 left-0 w-full h-px bg-cyan-400 rounded" />}
            </button>

            <AnimatePresence>
              {serviziOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                >
                  <div className="bg-[#0A0F1C]/95 border border-white/8 rounded-2xl shadow-2xl shadow-black/60 p-2 w-60 flex flex-col backdrop-blur-2xl">
                    {serviziLinks.map((link) => {
                      const Icon = link.icon;
                      const active = pathname.startsWith(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group ${
                            active
                              ? 'text-white bg-white/[0.05]'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 ${link.color}`} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/#contatti" className={baseLink}>
            Contatti
          </Link>
        </div>

        {/* ── CTA Desktop ── */}
        <div className="hidden md:block">
          <Link
            href="/#contatti"
            className="btn-primary text-sm"
          >
            Prenota una demo
          </Link>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait">
            {menuOpen
              ? <motion.div key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
              : <motion.div key="menu" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden overflow-hidden bg-[#070B14]/97 backdrop-blur-2xl border-t border-white/[0.05]"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              <Link
                href="/"
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${isHome ? 'text-white bg-white/[0.05]' : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'}`}
              >
                Home
              </Link>

              {/* Servizi section */}
              <div className="mt-2">
                <span className="px-4 text-[11px] font-bold text-cyan-400/70 uppercase tracking-widest block mb-2">
                  Servizi
                </span>
                <div className="flex flex-col gap-1 pl-2">
                  {serviziLinks.map((link) => {
                    const Icon = link.icon;
                    const active = pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                          active
                            ? 'text-white bg-white/[0.05]'
                            : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${link.color}`} />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link
                href="/#contatti"
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/[0.03] transition-colors mt-1"
              >
                Contatti
              </Link>

              {/* Mobile CTA */}
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <Link
                  href="/#contatti"
                  className="btn-primary block text-center py-4"
                >
                  Prenota una demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
