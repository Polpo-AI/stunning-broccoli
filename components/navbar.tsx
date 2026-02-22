'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Come Funziona', href: '#come-funziona' },
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'Contatti', href: '#contatti' },
];

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#@';

function GlitchLink({ label, href }: { label: string; href: string }) {
  const [display, setDisplay] = useState(label);
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const runGlitch = () => {
    let iter = 0;
    const total = label.length * 3;
    const tick = () => {
      setDisplay(
        label.split('').map((ch, i) =>
          i < iter / 3 ? label[i] : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join('')
      );
      iter++;
      if (iter < total) frameRef.current = requestAnimationFrame(tick);
      else setDisplay(label);
    };
    tick();
  };

  const handleEnter = () => {
    setHovered(true);
    clearTimeout(timeoutRef.current);
    runGlitch();
  };

  const handleLeave = () => {
    setHovered(false);
    setDisplay(label);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <a
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative text-sm font-medium tracking-wide group"
      style={{
        color: hovered ? '#00d4aa' : 'rgba(255,255,255,0.65)',
        transition: 'color 0.2s ease',
        fontFamily: hovered ? 'JetBrains Mono, monospace' : 'inherit',
      }}
    >
      {display}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px"
        style={{ background: 'linear-gradient(90deg, #00d4aa, #00a8ff)' }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scanPos, setScanPos] = useState(-100);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(-100);
      setTimeout(() => {
        const duration = 1200;
        const start = performance.now();
        const animate = (now: number) => {
          const t = (now - start) / duration;
          setScanPos(-100 + t * 300);
          if (t < 1) requestAnimationFrame(animate);
          else setScanPos(300);
        };
        requestAnimationFrame(animate);
      }, 100);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-glass border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-0 bottom-0 w-16 pointer-events-none"
          style={{
            left: `${scanPos}%`,
            background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.06), rgba(0,212,170,0.12), rgba(0,212,170,0.06), transparent)',
            filter: 'blur(2px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        <a href="#" className="flex items-center gap-3 group">
          <motion.div
            className="relative w-10 h-10"
            whileHover={{ rotate: [0, -5, 5, -3, 0], scale: 1.08 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/logo2.png"
              alt="Polpo AI"
              fill
              className="object-contain"
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.3), transparent)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.3 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-white">
            Polpo{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4aa, #00a8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AI
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <GlitchLink key={link.label} label={link.label} href={link.href} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="#contatti"
            className="relative px-5 py-2 text-sm font-semibold rounded-lg overflow-hidden"
            style={{
              background: '#00d4aa',
              color: '#000b1e',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="absolute inset-0 -skew-x-12"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
              animate={{ x: ['-150%', '250%'] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
            />
            <span className="relative flex items-center gap-1.5">
              <Zap size={12} className="fill-current" />
              Inizia Ora
            </span>
          </motion.a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(0,11,30,0.97)',
              borderTop: '1px solid rgba(0,212,170,0.12)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="text-white/80 hover:text-[#00d4aa] font-medium text-base transition-colors flex items-center gap-2"
                >
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contatti"
                onClick={() => setMobileOpen(false)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.24, duration: 0.3 }}
                className="mt-2 px-5 py-3 text-sm font-semibold rounded-lg bg-[#00d4aa] text-[#000b1e] text-center"
              >
                Inizia Ora
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
