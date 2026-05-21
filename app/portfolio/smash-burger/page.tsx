'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Flame, Beef, MapPin, Clock, Phone, Instagram, Star, Sparkles, Calendar, Navigation } from 'lucide-react';
import ParallaxImage from '@/components/portfolio/ParallaxImage';
import MagneticButton from '@/components/portfolio/MagneticButton';

/* ─── Smash Burger esempio sito vetrina ────────────────────────────────────
   Stile: foodporn vibrante, colori caldi (nero/arancione/giallo), foto golose.
   Font: Bebas Neue (display) + Inter (body).
   No chrome polpo — sito standalone. */

const MAIL_SUBJECT =
  'Mi interessa un sito tipo MEAT %26 FIRE (esempio Smash Burger)';
const MAIL_HREF = `mailto:info@polpo-ai.com?subject=${MAIL_SUBJECT}`;

const burgers = [
  {
    name: 'CLASSIC SMASH',
    desc: 'Doppio smash 90g · cheddar fuso · cipolla caramellata · salsa segreta',
    price: '€9',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  },
  {
    name: 'FIRE BACON',
    desc: 'Doppio smash · bacon affumicato · jalapeño · BBQ chipotle',
    price: '€11',
    img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80',
  },
  {
    name: 'TRUFFLE BEAST',
    desc: 'Triplo smash · provolone · funghi · maionese al tartufo',
    price: '€14',
    img: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&q=80',
  },
  {
    name: 'PIG OUT',
    desc: 'Smash · pulled pork · onion rings · BBQ Kentucky',
    price: '€12',
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80',
  },
  {
    name: 'CHEESE OVERLOAD',
    desc: 'Doppio smash · 4 formaggi fusi · cipolla rossa · salsa cheddar',
    price: '€11',
    img: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80',
  },
  {
    name: 'VEG NO LIMITS',
    desc: 'Burger di legumi · avocado · cheddar vegan · cipolla rossa',
    price: '€10',
    img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80',
  },
];

const gallery = [
  'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80',
  'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80',
];

const testimonials = [
  { name: 'Marco D.', review: 'Il miglior smash della città. Punto.' },
  { name: 'Giulia R.', review: 'Pane soffice, carne croccante. Una bomba.' },
  { name: 'Luca B.', review: 'Atmosfera rock, servizio veloce, prezzi onesti.' },
];

/* ─── Hook: tavoli liberi live (decresce ogni 25-50s, mai sotto 1) ──────── */
function useLiveTables(initial: number) {
  const [n, setN] = useState(initial);
  useEffect(() => {
    const id = window.setInterval(() => {
      setN((v) => (v > 1 ? v - 1 : Math.floor(Math.random() * 3) + 3)); // si "resetta" tra 3 e 5
    }, 18000 + Math.random() * 18000);
    return () => window.clearInterval(id);
  }, []);
  return n;
}

/* ─── Hook: countdown al cambio "Burger della settimana" (domenica 23:59) ── */
function useWeekCountdown() {
  const [text, setText] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      // Cerco la prossima domenica notte
      const daysToSunday = (7 - now.getDay()) % 7;
      end.setDate(now.getDate() + (daysToSunday || 7));
      end.setHours(23, 59, 59, 999);
      const diff = end.getTime() - now.getTime();
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      setText(`${d}g ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m`);
    };
    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);
  return text;
}

export default function SmashBurgerSite() {
  const liveTables = useLiveTables(3);
  const weekLeft = useWeekCountdown();
  return (
    <div
      style={{
        background: '#0a0a0a',
        color: '#fff',
        fontFamily: '"Inter", system-ui, sans-serif',
        minHeight: '100vh',
      }}
    >
      {/* Bebas Neue font via Google Fonts CDN */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Foto hero a tutto schermo con parallax GPU */}
        <ParallaxImage
          src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=2000&q=85"
          alt="Smash burger sfrigolante sulla piastra"
          priority
          sizes="100vw"
          strength={0.18}
          containerClassName="z-0"
          overlay={
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%),' +
                  'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,107,53,0.2) 0%, transparent 70%)',
              }}
            />
          }
        />

        {/* Contenuto hero */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 sm:py-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] mb-7"
              style={{
                background: 'rgba(255,107,53,0.15)',
                border: '1px solid rgba(255,107,53,0.4)',
                color: '#FFB627',
              }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.15, 0.95, 1.1, 1],
                  opacity: [1, 0.85, 1, 0.92, 1],
                  filter: ['drop-shadow(0 0 0px #FF6B35)', 'drop-shadow(0 0 6px #FF6B35)', 'drop-shadow(0 0 2px #FF6B35)', 'drop-shadow(0 0 8px #FF6B35)', 'drop-shadow(0 0 0px #FF6B35)'],
                }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'inline-flex' }}
              >
                <Flame className="w-3.5 h-3.5" strokeWidth={2.5} />
              </motion.span>
              Smash · grigliato · godurioso
            </span>

            <h1
              className="text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-[-0.02em] mb-5"
              style={{ fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.02em' }}
            >
              MEAT
              <br />
              <span style={{ color: '#FF6B35' }}>&amp; FIRE</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-2xl mb-9">
              Burger schiacciati sulla piastra a 280°. Pane fresco di giornata.
              Niente filtri Instagram — solo carne, fuoco e tre minuti di attesa.
            </p>

            <div className="flex flex-wrap gap-3">
              <MagneticButton
                href="#menu"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-base uppercase tracking-wider transition-[background,box-shadow] duration-300"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  color: '#fff',
                  boxShadow: '0 12px 32px rgba(255,107,53,0.4)',
                }}
                strength={0.35}
              >
                <Beef className="w-4 h-4" strokeWidth={2.5} />
                Vedi il menu
              </MagneticButton>
              <MagneticButton
                href={MAIL_HREF}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-base uppercase tracking-wider border-2 transition-[background] duration-300 hover:bg-white/10"
                style={{ borderColor: '#fff' }}
                strength={0.3}
              >
                Prenota un tavolo
              </MagneticButton>
            </div>

            {/* Stats orari/luogo */}
            <div className="mt-14 flex flex-wrap gap-6 sm:gap-10 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: '#FF6B35' }} />
                <span>Via del Gusto 18 · Milano</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: '#FF6B35' }} />
                <span>Mar-Dom · 12-15 / 19-23</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: '#FF6B35' }} />
                <span>02 1234 5678</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-white/75">
          <span className="w-12 h-px bg-white/30" />
          Scrolla per vedere
        </div>
      </section>

      {/* ═══════════════ REVIEWS STRIP (Google rating) ═══════════════ */}
      <section
        className="py-8 px-6 border-y"
        style={{
          background: 'rgba(255,107,53,0.06)',
          borderColor: 'rgba(255,107,53,0.18)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Google G */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base"
              style={{
                background: '#fff',
                color: '#1a1a1a',
                fontFamily: 'Arial, sans-serif',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
            >
              <span style={{ color: '#4285F4' }}>G</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: '#FFB627' }} />
                  ))}
                </div>
                <span className="font-bold text-white text-base ml-1">4.8</span>
                <span className="text-white/75 text-sm">/ 5</span>
              </div>
              <p className="text-xs text-white/80 mt-0.5 uppercase tracking-wider font-semibold">
                312 recensioni Google · Milano
              </p>
            </div>
          </div>
          <p className="text-sm text-white/85 italic max-w-md text-center sm:text-right">
            &ldquo;Pane soffice, carne croccante. <strong className="text-white not-italic font-bold">Una bomba.</strong>&rdquo;
            <span className="block text-xs not-italic text-white/65 mt-1">— Giulia R., 2 settimane fa</span>
          </p>
        </div>
      </section>

      {/* ═══════════════ MENU ═══════════════ */}
      <section id="menu" className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span
              className="text-xs uppercase tracking-[0.25em] mb-3 block"
              style={{ color: '#FF6B35' }}
            >
              — Il menu
            </span>
            <h2
              className="text-[clamp(2.5rem,7vw,5rem)] leading-[0.95]"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              I NOSTRI <span style={{ color: '#FF6B35' }}>SIX</span> CULT
            </h2>
            <p className="text-white/80 mt-4 max-w-xl">
              Sei panini iconici. Sei mood. Ognuno ha il suo carattere.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {burgers.map((b, i) => (
              <motion.article
                key={b.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={b.img}
                    alt={b.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-sm font-bold"
                    style={{
                      background: '#FF6B35',
                      color: '#000',
                      boxShadow: '0 4px 16px rgba(255,107,53,0.5)',
                    }}
                  >
                    {b.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-2xl leading-tight mb-2"
                    style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                  >
                    {b.name}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">{b.desc}</p>
                </div>
                {/* Edge accent */}
                <div
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                  style={{
                    width: '0%',
                    background: 'linear-gradient(90deg, #FF6B35, #FFB627)',
                  }}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BURGER DELLA SETTIMANA ═══════════════ */}
      <section
        className="py-20 sm:py-28 px-6 relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,107,53,0.18) 0%, rgba(247,147,30,0.06) 100%), #0d0d0d',
        }}
      >
        {/* Pattern decor */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #FF6B35 0 2px, transparent 2px 22px)',
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=1200&q=85"
                alt="Burger della settimana"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Glow rim */}
              <div
                className="absolute inset-0"
                style={{
                  boxShadow: 'inset 0 0 80px rgba(255,107,53,0.4)',
                  pointerEvents: 'none',
                }}
              />
              {/* Price tag */}
              <div
                className="absolute top-5 left-5 px-4 py-2.5 rounded-md font-bold uppercase tracking-wider text-sm"
                style={{
                  background: '#0a0a0a',
                  color: '#FFB627',
                  border: '2px solid #FFB627',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.5rem',
                  letterSpacing: '0.05em',
                }}
              >
                €11 invece di €13
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] mb-5"
                style={{
                  background: '#FFB627',
                  color: '#0a0a0a',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
                Questa settimana
              </span>
              <h2
                className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] mb-5"
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                FIRE <span style={{ color: '#FF6B35' }}>BACON</span> XL
              </h2>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-6">
                Doppio smash 120g sulla piastra rovente, bacon affumicato con legno di
                faggio, jalapeño freschi, BBQ chipotle homemade. Pane brioche tostato al burro.
              </p>
              {/* Countdown */}
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full font-mono text-sm"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,182,39,0.4)',
                }}
              >
                <Calendar className="w-4 h-4" style={{ color: '#FFB627' }} />
                <span className="text-white/85 uppercase tracking-wider text-xs">Cambia tra</span>
                <span className="font-bold text-white text-base tracking-wider">
                  {weekLeft || '7g 00h 00m'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section
        className="py-24 sm:py-32 px-6"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(255,107,53,0.06) 50%, transparent 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span
              className="text-xs uppercase tracking-[0.25em] mb-3 block"
              style={{ color: '#FF6B35' }}
            >
              — La storia
            </span>
            <h2
              className="text-[clamp(2rem,5.5vw,4rem)] leading-[0.95] mb-6"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              DAL 2019,
              <br />
              UNA SOLA REGOLA:
              <br />
              <span style={{ color: '#FF6B35' }}>NIENTE COMPROMESSI.</span>
            </h2>
            <p className="text-white/75 leading-relaxed mb-4">
              Carne 100% italiana da allevatori selezionati. Pane impastato ogni mattina
              da panificio di quartiere. Salse fatte in casa, niente buste.
            </p>
            <p className="text-white/75 leading-relaxed">
              Il segreto? Schiacciamo il burger sulla piastra rovente — così si forma una
              crosta caramellata che racchiude tutto il succo. Tre minuti totali. Otto secoli
              di tradizione americana, fatta a Milano.
            </p>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=1000&q=85"
              alt="Hamburger sulla piastra"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, transparent 60%, rgba(255,107,53,0.3) 100%)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="text-xs uppercase tracking-[0.25em] mb-3 block"
              style={{ color: '#FF6B35' }}
            >
              — La cucina
            </span>
            <h2
              className="text-[clamp(2rem,5.5vw,4rem)] leading-[0.95]"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              FUOCO, FUMO, <span style={{ color: '#FF6B35' }}>FAME</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {gallery.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section
        className="py-24 sm:py-32 px-6"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(255,107,53,0.04) 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-[clamp(2rem,5.5vw,4rem)] leading-[0.95] text-center mb-12"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            COSA DICONO <span style={{ color: '#FF6B35' }}>DI NOI</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-current"
                      style={{ color: '#FFB627' }}
                    />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-4 italic">"{t.review}"</p>
                <p className="text-sm text-white/75 font-bold uppercase tracking-wider">
                  — {t.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DOVE TROVARCI (mappa) ═══════════════ */}
      <section id="trovarci" className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span
              className="text-xs uppercase tracking-[0.25em] mb-3 block font-semibold"
              style={{ color: '#FF6B35' }}
            >
              — Dove trovarci
            </span>
            <h2
              className="text-[clamp(2rem,5.5vw,4rem)] leading-[0.95]"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              VIENI A TROVARCI, <span style={{ color: '#FF6B35' }}>SIAMO QUI</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 sm:gap-6">
            {/* MAP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,107,53,0.2)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              }}
            >
              <iframe
                title="Mappa MEAT & FIRE"
                src="https://www.openstreetmap.org/export/embed.html?bbox=9.182%2C45.460%2C9.196%2C45.470&amp;layer=mapnik&amp;marker=45.465%2C9.189"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.7)' }}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Mappa via del Gusto 18 Milano"
              />
              {/* Pin overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                <motion.div
                  animate={{ y: [-4, 0, -4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: '#FF6B35',
                      boxShadow: '0 8px 24px rgba(255,107,53,0.6), 0 0 0 4px rgba(255,107,53,0.25)',
                    }}
                  >
                    <Flame className="w-6 h-6 text-white" strokeWidth={2.4} />
                  </div>
                  <div
                    className="w-0 h-0 -mt-px"
                    style={{
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '12px solid #FF6B35',
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* INFO CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="p-7 sm:p-8 rounded-2xl flex flex-col gap-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: '#FFB627' }}>
                  Indirizzo
                </p>
                <p className="text-white font-bold text-lg leading-snug">
                  Via del Gusto 18
                  <br />
                  20121 Milano (MI)
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: '#FFB627' }}>
                  Orari
                </p>
                <ul className="text-sm text-white/85 space-y-1.5">
                  <li className="flex justify-between gap-4">
                    <span>Lun</span><span className="text-white/65">chiuso</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Mar–Ven</span><span>12:00–15:00 · 19:00–23:00</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Sab–Dom</span><span>12:00–23:30</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Via+del+Gusto+18+Milano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    color: '#fff',
                  }}
                >
                  <Navigation className="w-4 h-4" strokeWidth={2.5} />
                  Indicazioni
                </a>
                <a
                  href="tel:+390212345678"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all hover:bg-white/10"
                  style={{
                    border: '1.5px solid #fff',
                    color: '#fff',
                  }}
                >
                  <Phone className="w-4 h-4" strokeWidth={2.5} />
                  Chiama
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA / CONTATTI ═══════════════ */}
      <section
        className="py-24 sm:py-32 px-6 relative overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,53,0.25) 0%, transparent 60%),' +
            '#0a0a0a',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Flame
            className="w-12 h-12 mx-auto mb-6"
            style={{ color: '#FF6B35' }}
            strokeWidth={2}
          />
          <h2
            className="text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] mb-5"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            HAI <span style={{ color: '#FF6B35' }}>FAME?</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/85 mb-6 leading-relaxed">
            Prenota un tavolo per stasera. Sabato pieno entro le 20.
          </p>

          {/* LIVE TAVOLI counter — animated urgency */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full mb-8"
            style={{
              background: 'rgba(220, 38, 38, 0.15)',
              border: '1.5px solid rgba(248, 113, 113, 0.5)',
              boxShadow: '0 0 24px rgba(248, 113, 113, 0.25)',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: '#F87171', boxShadow: '0 0 10px #F87171' }}
            />
            <span className="text-sm font-bold uppercase tracking-wider text-white">
              Solo <motion.span
                key={liveTables}
                initial={{ scale: 1.3, color: '#FFB627' }}
                animate={{ scale: 1, color: '#fff' }}
                transition={{ duration: 0.4 }}
                className="inline-block font-extrabold text-lg mx-1"
              >
                {liveTables}
              </motion.span> tavol{liveTables === 1 ? 'o' : 'i'} liber{liveTables === 1 ? 'o' : 'i'} stasera
            </span>
          </motion.div>

          <div>
            <a
              href={MAIL_HREF}
              className="inline-flex items-center gap-3 px-9 py-5 rounded-full font-bold text-base uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                color: '#fff',
                boxShadow: '0 16px 40px rgba(255,107,53,0.5)',
              }}
            >
              <Phone className="w-5 h-5" strokeWidth={2.5} />
              Prenota ora
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-white/85 text-sm">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 hover:text-white transition-colors font-medium"
            >
              <Instagram className="w-4 h-4" />
              @meatandfire
            </a>
            <span className="text-white/40" aria-hidden>·</span>
            <a
              href="tel:+390212345678"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              02 1234 5678
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer
        className="py-8 px-6 text-center text-xs text-white/65"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        © {new Date().getFullYear()} MEAT &amp; FIRE — Esempio sito vetrina realizzato da
        <a
          href="https://polpo-ai.com"
          className="ml-1 underline hover:text-white"
        >
          PolpoAI
        </a>
      </footer>
    </div>
  );
}
