'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Globe, MessageSquare, Bot, X, Menu } from 'lucide-react';

const serviziLinks = [
  { label: 'Siti Web Vetrina',  href: '/creazione-siti-web',            icon: Globe,         color: 'text-sky-400' },
  { label: 'Assistente WhatsApp', href: '/chatbot-whatsapp-prenotazioni', icon: MessageSquare, color: 'text-emerald-400' },
  { label: 'Agenti AI',         href: '/agenti-ai',                     icon: Bot,           color: 'text-violet-400' },
];

const isServiziActive = (pathname: string) =>
  serviziLinks.some((l) => pathname.startsWith(l.href));

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [serviziOpen, setServiziOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setServiziOpen(false); }, [pathname]);

  // Nasconde la navbar polpo sui siti esempio del portfolio
  // (così il visitatore vede il sito esempio "puro", senza il chrome del nostro sito).
  // IMPORTANTE: questo `return null` DEVE stare DOPO tutte le chiamate a hooks
  // altrimenti React lancia "Rendered fewer/more hooks" quando si naviga tra
  // /portfolio/* ↔ il resto del sito (il numero di hooks cambierebbe tra render).
  if (pathname?.startsWith('/portfolio')) return null;

  const activeLink = 'text-white font-semibold';
  const baseLink   = 'text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium relative group';

  const isHome    = pathname === '/';
  const isServizi = isServiziActive(pathname);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform animate-nav-in ${
        scrolled
          ? 'bg-[#0B1228]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12">

        {/* ── Logo ── */}
        <Link href="/" prefetch={true} className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/10">
            <Image
              src="/logo a.jpg"
              alt="PolpoAI logo"
              fill
              className="object-cover scale-[1.18]"
              priority
            />
          </div>
          <span
            className="text-[1.15rem] font-extrabold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Polpo
            <span
              className="text-cyan-400 group-hover:opacity-80 transition-opacity duration-200"
            >
              AI
            </span>
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

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 origin-top transition-all duration-200 ${
                serviziOpen
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 -translate-y-1 scale-[0.97] pointer-events-none'
              }`}
            >
              <div className="bg-[#0F1730]/95 border border-white/8 rounded-2xl shadow-2xl shadow-black/60 p-2 w-60 flex flex-col backdrop-blur-2xl">
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
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${link.color}`} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <Link href="/#contatti" className={baseLink}>
            Contatti
          </Link>
        </div>

        {/* ── CTA Desktop ── */}
        <div className="hidden md:block">
          <Link href="/#contatti" className="btn-primary text-sm">
            Prenota una demo
          </Link>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors relative w-9 h-9 flex items-center justify-center"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
        >
          <Menu
            className={`w-5 h-5 absolute transition-all duration-200 ${
              menuOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'
            }`}
          />
          <X
            className={`w-5 h-5 absolute transition-all duration-200 ${
              menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden bg-[#0B1228]/97 backdrop-blur-2xl border-t border-white/[0.05] transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          <Link
            href="/"
            className={`px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
              isHome ? 'text-white bg-white/[0.05]' : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            Home
          </Link>

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

          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <Link href="/#contatti" className="btn-primary block text-center py-4">
              Prenota una demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
