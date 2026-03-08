'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const links = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Esempio', href: '#esempio' },
  { label: 'Vantaggi', href: '#vantaggi' },
  { label: 'Contatti', href: '#contatti' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${scrolled
        ? 'bg-[#070B14]/85 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg shadow-black/20 py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative w-8 h-8">
            <Image src="/logo a.jpg" alt="logo a.jpg" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Polpo<span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">AI</span>
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <motion.button
              key={l.href}
              onClick={() => handleNav(l.href)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </motion.button>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <motion.button
            onClick={() => handleNav('#contatti')}
            whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-cyan-500 text-[#070B14] transition-all duration-200 shadow-lg shadow-cyan-500/30 font-bold"
          >
            Prenota una demo
          </motion.button>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-5 h-0.5 bg-white mb-1 transition-all" />
          <div className="w-5 h-0.5 bg-white mb-1 transition-all" />
          <div className="w-5 h-0.5 bg-white transition-all" />
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#070B14]/95 backdrop-blur-md border-b border-cyan-500/10 px-6 py-4 flex flex-col gap-4"
        >
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-left text-slate-300 hover:text-cyan-400 transition-colors font-medium py-1"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contatti')}
            className="w-full px-5 py-2.5 rounded-full text-sm font-semibold bg-cyan-500 text-[#070B14] mt-2"
          >
            Prenota una demo
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
