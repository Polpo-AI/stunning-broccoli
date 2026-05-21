'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, Mail, Instagram, Award, MapPin, Heart, Calendar, Sparkles } from 'lucide-react';
import ParallaxImage from '@/components/portfolio/ParallaxImage';

/* ─── Marco Rossi · Fotografo Eventi ───────────────────────────────────────
   Stile: editoriale minimal, gallerie ampie, sobrio, professionale.
   Colori: avorio + nero + bordeaux/sabbia.
   Font: Cormorant Garamond (serif) + Inter (body). */

const MAIL_SUBJECT =
  'Mi interessa un sito tipo Marco Rossi Photography (esempio fotografo)';
const MAIL_HREF = `mailto:info@polpo-ai.com?subject=${MAIL_SUBJECT}`;

const portfolio = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85', cat: 'Wedding', title: 'Anna & Luca · Lago di Como' },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85', cat: 'Wedding', title: 'Sara & Marco · Tuscany Hills' },
  { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=85', cat: 'Wedding', title: 'Giulia & Andrea · Borgo Antico' },
  { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=85', cat: 'Corporate', title: 'Annual Gala · Milano Design Week' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=85', cat: 'Corporate', title: 'Conference · Tech Summit 2024' },
  { src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&q=85', cat: 'Corporate', title: 'Product Launch · Headquarters' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=85', cat: 'Portrait', title: 'Studio session · Milano' },
  { src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=900&q=85', cat: 'Portrait', title: 'Editorial · for Vogue Italia' },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=85', cat: 'Portrait', title: 'Founder series · 2024' },
];

const services = [
  { name: 'Matrimoni', desc: 'Reportage completo del vostro giorno. Dalla preparazione alla festa.', from: '€1.800' },
  { name: 'Corporate & Eventi', desc: 'Conferenze, gala, launch. Consegna entro 72h.', from: '€600' },
  { name: 'Ritratti & Editoriali', desc: 'Sessioni in studio o on-location. Ritratti che restano.', from: '€400' },
];

const testimonials = [
  { name: 'Anna B.', role: 'sposa', review: 'Marco ha catturato emozioni che pensavo perdute. Ogni foto un ricordo.' },
  { name: 'Andrea V.', role: 'event manager', review: 'Professionale, discreto, tempi rispettati. Il nostro fotografo di fiducia da 3 anni.' },
  { name: 'Sara T.', role: 'CEO startup', review: 'Foto editoriali pulite e potenti. Gli scatti che servivano alla nostra brand identity.' },
];

const FILTERS = ['Tutti', 'Wedding', 'Corporate', 'Portrait'] as const;
type Filter = typeof FILTERS[number];

const weddings2024 = [
  { date: '08 Giu 2024', couple: 'Anna & Luca', place: 'Villa Cipressi · Lago di Como', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85' },
  { date: '14 Lug 2024', couple: 'Sara & Marco', place: 'Borgo Finocchieto · Tuscany', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=85' },
  { date: '02 Set 2024', couple: 'Giulia & Andrea', place: 'Castello di Cisterna · Asti', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=85' },
  { date: '21 Set 2024', couple: 'Elena & Marco', place: 'Villa Pisani · Stra (VE)', img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=85' },
  { date: '05 Ott 2024', couple: 'Chiara & Davide', place: 'Castello Odescalchi · Bracciano', img: 'https://images.unsplash.com/photo-1525772764200-be829a350797?w=600&q=85' },
];

const packages = [
  { phase: '01', title: 'Pre-wedding', desc: 'Una call iniziale + sopralluogo location. Definiamo mood, momenti chiave, dress code.', time: '2 settimane prima' },
  { phase: '02', title: 'Il Giorno', desc: 'Reportage completo dalla preparazione al primo ballo. Solo io o con assistente.', time: '8-12 ore' },
  { phase: '03', title: 'Selezione', desc: 'Anteprima 20 foto entro 7 giorni. Il resto in galleria privata online.', time: '3-4 settimane' },
  { phase: '04', title: 'Consegna', desc: 'Galleria definitiva 200-400 scatti high-res + album fine art opzionale.', time: '6-8 settimane' },
];

const publications = [
  'Vogue Italia',
  'Junebug Weddings',
  'Style Me Pretty',
  'White Sposa',
  'Wed Italy',
  'Brides',
];

export default function FotografoEventiSite() {
  const [filter, setFilter] = useState<Filter>('Tutti');
  const filtered = filter === 'Tutti' ? portfolio : portfolio.filter((p) => p.cat === filter);

  return (
    <div
      style={{
        background: '#F5F1EB',
        color: '#1a1a1a',
        fontFamily: '"Inter", system-ui, sans-serif',
        minHeight: '100vh',
      }}
    >
      {/* Cormorant Garamond via Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&display=swap"
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-end pb-16 sm:pb-20 px-6 sm:px-12 overflow-hidden">
        {/* Foto hero con parallax editoriale */}
        <ParallaxImage
          src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=2000&q=90"
          alt="Coppia di sposi in luce naturale"
          priority
          sizes="100vw"
          strength={0.16}
          containerClassName="z-0"
          overlay={
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.75) 100%)',
              }}
            />
          }
        />

        {/* Brand strip top — shift down 56px per non finire sotto i pulsanti fixed
            del portfolio (PolpoAI back top-left + ProgressBar) */}
        <div className="absolute top-14 left-0 right-0 z-10 flex items-center justify-between p-6 sm:p-8 text-white">
          <div
            className="text-base sm:text-lg tracking-[0.3em] uppercase font-light"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            M · ROSSI
          </div>
          <a
            href="#contact"
            className="text-xs sm:text-sm tracking-[0.2em] uppercase underline decoration-1 underline-offset-4 opacity-90 hover:opacity-100"
          >
            Contact
          </a>
        </div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 max-w-5xl text-white"
        >
          <p className="text-xs sm:text-sm tracking-[0.4em] uppercase mb-6 sm:mb-8 font-semibold" style={{ color: '#FAFAFA' }}>
            Photographer · Milano
          </p>
          <h1
            className="leading-[0.95] mb-6 sm:mb-8"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.5rem, 9vw, 7rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}
          >
            Marco
            <br />
            <em style={{ fontWeight: 400 }}>Rossi</em>
          </h1>
          <p className="text-base sm:text-lg max-w-md leading-relaxed font-normal" style={{ color: '#fff' }}>
            Racconto matrimoni, eventi e ritratti.
            <br />
            <span className="italic" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem' }}>
              Per immagini che durano più della giornata.
            </span>
          </p>
        </motion.div>
      </section>

      {/* ═══════════════ PUBLICATIONS STRIP (autorità) ═══════════════ */}
      <section
        className="py-12 px-6 sm:px-12 border-y"
        style={{
          background: '#FAF7F2',
          borderColor: '#E5DCD0',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-center text-xs tracking-[0.3em] uppercase mb-6 font-semibold"
            style={{ color: '#5A4F45' }}
          >
            — Pubblicato su
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-16">
            {publications.map((pub) => (
              <span
                key={pub}
                className="text-[clamp(0.95rem,1.8vw,1.35rem)] tracking-wide italic transition-opacity hover:opacity-100"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  color: '#1a1a1a',
                  opacity: 0.55,
                  fontWeight: 500,
                }}
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PORTFOLIO GRID con FILTRI ═══════════════ */}
      <section className="py-20 sm:py-28 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 sm:mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: '#5A4F45' }}>
              — Selected works
            </p>
            <h2
              className="leading-[1] mb-8"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 400,
              }}
            >
              Un anno di <em style={{ fontWeight: 400 }}>storie</em>.
            </h2>

            {/* Filter chips */}
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full" style={{ background: '#FAF7F2', border: '1px solid #E5DCD0' }}>
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm tracking-wider uppercase font-semibold transition-all"
                    style={{
                      background: active ? '#1a1a1a' : 'transparent',
                      color: active ? '#F5F1EB' : '#5A4F45',
                    }}
                    aria-pressed={active}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2">
            <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.figure
                key={p.src}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="relative aspect-[4/5] overflow-hidden cursor-pointer group"
              >
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 text-white"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.92) 100%)',
                  }}
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1 font-semibold" style={{ color: '#F5F1EB' }}>
                    {p.cat}
                  </p>
                  <p
                    className="text-lg leading-tight"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic' }}
                  >
                    {p.title}
                  </p>
                </div>
              </motion.figure>
            ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section
        className="py-20 sm:py-28 px-6 sm:px-12"
        style={{ background: '#FAF7F2', borderTop: '1px solid #E5DCD0' }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=85"
              alt="Marco Rossi, fotografo"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: '#5A4F45' }}>
              — A few words
            </p>
            <h2
              className="leading-[1.05] mb-6"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 400,
              }}
            >
              Dieci anni dietro
              <br />
              l'<em style={{ fontWeight: 400 }}>obiettivo</em>.
            </h2>
            <p className="leading-relaxed text-base sm:text-lg mb-4" style={{ color: '#2A2A2A' }}>
              Dal 2014 fotografo storie. Da quel matrimonio in Toscana che mi cambiò la vita,
              ho seguito oltre 240 coppie, 80 eventi corporate, 150 sessioni ritratto.
            </p>
            <p className="leading-relaxed text-base sm:text-lg mb-8" style={{ color: '#2A2A2A' }}>
              Lavoro con luce naturale, gesto reale, post-produzione minima.
              Il mio compito è essere invisibile finché serve, presente quando serve davvero.
            </p>
            <div className="flex flex-wrap gap-6 text-xs tracking-[0.18em] uppercase font-semibold" style={{ color: '#5A4F45' }}>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5" />
                240+ matrimoni
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                Milano · Italia · Europa
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PACKAGES TIMELINE — Come lavoro ═══════════════ */}
      <section className="py-20 sm:py-28 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: '#5A4F45' }}>
              — Come lavoriamo insieme
            </p>
            <h2
              className="leading-[1]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 400,
              }}
            >
              Dal sì alla <em style={{ fontWeight: 400 }}>consegna</em>.
            </h2>
          </div>

          {/* Timeline orizzontale con linea che attraversa */}
          <div className="relative">
            {/* Linea connettrice (desktop only) */}
            <div
              aria-hidden
              className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #5A4F45 20%, #5A4F45 80%, transparent)' }}
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
              {packages.map((p, i) => (
                <motion.div
                  key={p.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="text-center md:text-left relative"
                >
                  {/* Punto numerato sulla timeline */}
                  <div className="flex md:block items-center gap-4 mb-4">
                    <div
                      className="relative w-14 h-14 mx-auto md:mx-0 rounded-full flex items-center justify-center font-bold text-base"
                      style={{
                        background: '#1a1a1a',
                        color: '#F5F1EB',
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 16px rgba(26,26,26,0.3)',
                      }}
                    >
                      {p.phase}
                    </div>
                  </div>
                  <h3
                    className="text-2xl mb-2"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500 }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm mb-3 font-semibold tracking-wider uppercase" style={{ color: '#5A4F45' }}>
                    {p.time}
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#2A2A2A' }}>
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="py-20 sm:py-28 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: '#5A4F45' }}>— Services</p>
            <h2
              className="leading-[1]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 400,
              }}
            >
              Cosa <em style={{ fontWeight: 400 }}>faccio</em>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="text-center md:text-left"
              >
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-bold" style={{ color: '#5A4F45' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className="text-3xl mb-4"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}
                >
                  {s.name}
                </h3>
                <p className="leading-relaxed mb-6 text-base" style={{ color: '#2A2A2A' }}>
                  {s.desc}
                </p>
                <p className="text-sm tracking-[0.15em] uppercase font-semibold" style={{ color: '#5A4F45' }}>
                  da <span style={{ color: '#1a1a1a' }} className="font-bold">{s.from}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MATRIMONI 2024 — Recent stories ═══════════════ */}
      <section
        className="py-20 sm:py-28 px-6 sm:px-12"
        style={{ background: '#FAF7F2', borderTop: '1px solid #E5DCD0', borderBottom: '1px solid #E5DCD0' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 sm:mb-16 flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: '#5A4F45' }}>
                — Recent stories
              </p>
              <h2
                className="leading-[1]"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 400,
                }}
              >
                Matrimoni <em style={{ fontWeight: 400 }}>2024</em>.
              </h2>
            </div>
            <p className="text-sm sm:text-base max-w-md italic" style={{ fontFamily: '"Cormorant Garamond", serif', color: '#2A2A2A' }}>
              Cinque tappe della stagione. Cinque luoghi diversi.
              Cinque modi diversi di dire <em>sì</em>.
            </p>
          </div>

          {/* Vertical timeline */}
          <ol className="relative pl-6 sm:pl-10">
            {/* Linea verticale */}
            <span
              aria-hidden
              className="absolute left-1.5 sm:left-2.5 top-2 bottom-2 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, #5A4F45 12%, #5A4F45 88%, transparent)' }}
            />
            {weddings2024.map((w, i) => (
              <motion.li
                key={w.date}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="relative pb-10 last:pb-0 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-8 items-center"
              >
                {/* Dot sulla timeline */}
                <span
                  aria-hidden
                  className="absolute -left-[18px] sm:-left-[34px] top-3 w-3 h-3 rounded-full"
                  style={{ background: '#1a1a1a', boxShadow: '0 0 0 4px #FAF7F2' }}
                />
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-2 font-bold flex items-center gap-2" style={{ color: '#5A4F45' }}>
                    <Calendar className="w-3.5 h-3.5" />
                    {w.date}
                  </p>
                  <h3
                    className="leading-tight mb-1.5"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
                      fontWeight: 500,
                    }}
                  >
                    <span className="italic">{w.couple}</span>
                  </h3>
                  <p className="text-sm sm:text-base flex items-center gap-2" style={{ color: '#2A2A2A' }}>
                    <MapPin className="w-3.5 h-3.5 inline-block shrink-0" style={{ color: '#5A4F45' }} />
                    {w.place}
                  </p>
                </div>
                <div className="relative w-full sm:w-44 h-32 sm:h-28 rounded-sm overflow-hidden hidden sm:block" style={{ boxShadow: '0 8px 24px rgba(26,26,26,0.12)' }}>
                  <Image
                    src={w.img}
                    alt={w.couple}
                    fill
                    sizes="(max-width: 640px) 100vw, 180px"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section
        className="py-20 sm:py-28 px-6 sm:px-12"
        style={{ background: '#1a1a1a', color: '#F5F1EB' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: '#D4C9B6' }}>— Words</p>
            <h2
              className="leading-[1]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 400,
              }}
            >
              Quello che <em style={{ fontWeight: 400 }}>dicono</em>.
            </h2>
          </div>
          <div className="space-y-12 sm:space-y-16 max-w-3xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="text-center"
              >
                <p
                  className="leading-relaxed mb-6"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    color: '#FAF7F2',
                  }}
                >
                  &ldquo;{t.review}&rdquo;
                </p>
                <footer className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: '#D4C9B6' }}>
                  — {t.name}, {t.role}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section
        id="contact"
        className="py-20 sm:py-28 px-6 sm:px-12 text-center"
        style={{ background: '#F5F1EB' }}
      >
        <Camera className="w-8 h-8 mx-auto mb-6" strokeWidth={1.2} style={{ color: '#5A4F45' }} />
        <p className="text-xs tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: '#5A4F45' }}>— Lavoriamo insieme</p>
        <h2
          className="leading-[1] mb-6"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 300,
          }}
        >
          Scrivimi una <em style={{ fontWeight: 400 }}>storia</em>.
        </h2>
        <p className="max-w-xl mx-auto leading-relaxed mb-10 text-base sm:text-lg" style={{ color: '#2A2A2A' }}>
          Raccontami il tuo progetto. Rispondo entro 24 ore — sempre.
        </p>
        <a
          href={MAIL_HREF}
          className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:opacity-80"
          style={{
            background: '#1a1a1a',
            color: '#F5F1EB',
          }}
        >
          <Mail className="w-4 h-4" />
          Scrivimi
        </a>

        <div className="mt-12 flex justify-center gap-8 text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#5A4F45' }}>
          <a href="#" className="hover:opacity-100 flex items-center gap-2">
            <Instagram className="w-3.5 h-3.5" />
            @marcorossi.ph
          </a>
          <span>·</span>
          <span>Milano</span>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer
        className="py-8 px-6 text-center text-xs font-medium"
        style={{ background: '#F5F1EB', borderTop: '1px solid #E5DCD0', color: '#5A4F45' }}
      >
        © {new Date().getFullYear()} Marco Rossi Photography — Esempio sito vetrina realizzato da
        <a href="https://polpo-ai.com" className="ml-1 underline hover:opacity-80">
          PolpoAI
        </a>
      </footer>
    </div>
  );
}
