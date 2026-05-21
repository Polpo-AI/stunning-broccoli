'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, Sparkles, MousePointerClick } from 'lucide-react';
import { FadeUp } from '@/components/shared/animations';

/* ─── Portfolio Showcase ────────────────────────────────────────────────
   Sezione da inserire nella home /creazione-siti-web.
   3 card cliccabili che aprono i siti esempio in /portfolio/*. */

const examples = [
  {
    title: 'Smash Burger',
    sector: 'Ristorazione',
    desc: 'Foodporn vibrante, foto golose, menu sfogliabile. Stile caldo e diretto.',
    href: '/portfolio/smash-burger',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=85',
    accent: '#FF6B35',
    badge: 'Ristorante',
  },
  {
    title: 'Fotografo Eventi',
    sector: 'Servizi creativi',
    desc: 'Editoriale minimal, gallerie ampie, font serif elegante. Per chi vende sguardo.',
    href: '/portfolio/fotografo-eventi',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85',
    accent: '#8B7355',
    badge: 'Fotografo',
  },
  {
    title: 'Avvocato · Prima e Dopo',
    sector: 'Libero professionista',
    desc: 'Corporate premium emerald. Con un tap "Vedi com\'era prima" mostriamo il sito del 2010 — il prima e dopo a confronto.',
    href: '/portfolio/libero-professionista',
    img: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=900&q=85',
    accent: '#34D399',
    badge: 'Restyling',
    special: true,
  },
];

/* ─── Card con 3D tilt magnetic on hover ─────────────────────────────── */
function PortfolioCard({ e, i }: { e: typeof examples[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);

  // 3D tilt via mouse position
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springMx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const springMy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });
  // Map mouse position → rotation
  const rotateX = useTransform(springMy, [-1, 1], [6, -6]);
  const rotateY = useTransform(springMx, [-1, 1], [-6, 6]);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((event.clientX - cx) / (rect.width / 2));
    my.set((event.clientY - cy) / (rect.height / 2));
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    setHovering(false);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 },
        },
      }}
      style={{ perspective: 1200 }}
    >
      <Link
        ref={ref}
        href={e.href}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleLeave}
        className="group relative block rounded-2xl overflow-hidden h-full"
        style={{
          background:
            'linear-gradient(160deg, rgba(20,28,55,0.94) 0%, rgba(14,21,46,0.97) 50%, rgba(11,17,40,0.99) 100%)',
          border: `1px solid rgba(255,255,255,0.10)`,
          boxShadow: hovering
            ? `0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px ${e.accent}30 inset, 0 0 32px ${e.accent}20`
            : '0 10px 32px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.05) inset',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="h-full"
        >
          {/* Top accent line del color brand del sito esempio */}
          <div
            className="absolute top-0 inset-x-0 h-[3px] z-10 transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, ${e.accent}, transparent)`,
              opacity: hovering ? 1 : 0.7,
            }}
          />

          {/* Preview immagine */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={e.img}
              alt={`Preview sito ${e.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
            {/* Overlay dark sotto */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 30%, rgba(11,18,40,0.55) 80%, rgba(11,18,40,0.9) 100%)',
              }}
            />

            {/* Badge tipo sito — top-left (sticker style, solido per massima visibilità) */}
            <span
              className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-[0.12em]"
              style={{
                background: e.accent,
                color: '#0B1228',
                boxShadow: `0 6px 18px ${e.accent}55, 0 0 0 1px rgba(255,255,255,0.20) inset`,
              }}
            >
              {e.special && <Sparkles className="w-3 h-3" strokeWidth={2.6} />}
              {e.badge}
            </span>

            {/* LIVE DEMO badge — top-right con pulse dot */}
            <span
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
              style={{
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(255,255,255,0.20)',
                color: '#fff',
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#22d3ee',
                  boxShadow: '0 0 8px #22d3ee',
                }}
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              Live demo
            </span>

            {/* Click hint that fades in on hover */}
            <motion.span
              className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                background: e.accent,
                color: '#0B1228',
                boxShadow: `0 8px 20px ${e.accent}55`,
              }}
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={hovering ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.92 }}
              transition={{ duration: 0.25 }}
            >
              <MousePointerClick className="w-3 h-3" strokeWidth={2.6} />
              Apri
            </motion.span>
          </div>

          {/* Testo */}
          <div className="p-6 sm:p-7">
            <p
              className="text-xs tracking-[0.18em] uppercase font-bold mb-2"
              style={{ color: e.accent }}
            >
              {e.sector}
            </p>
            <h3
              className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {e.title}
            </h3>
            <p className="text-sm text-slate-200/90 leading-relaxed mb-5">{e.desc}</p>

            {/* CTA + arrow that travels on hover */}
            <span
              className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-300 group-hover:gap-2.5"
              style={{ color: e.accent }}
            >
              Apri l&apos;esempio
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>

          {/* Hover halo */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${e.accent}1F, transparent 60%)`,
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioShowcase() {
  return (
    <section id="portfolio" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="text-center mb-12 md:mb-16">
          {/* Eyebrow custom (no pseudo dot, uso il motion.span sotto come dot animato) */}
          <span
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-5"
            style={{
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.30)',
              color: '#7dd3fc',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
            }}
          >
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: '#22d3ee',
                boxShadow: '0 0 10px #22d3ee',
              }}
              animate={{ scale: [1, 1.7, 1], opacity: [1, 0.45, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            Portfolio · 3 demo navigabili
          </span>

          <h2 className="h2-editorial is-siti mt-4 mb-5">
            Tocca con mano, prima di <em>decidere</em>.
          </h2>
          <p className="text-base md:text-[17px] text-slate-200/90 leading-relaxed max-w-2xl mx-auto">
            Tre settori, tre stili, tre brand inventati.{' '}
            <strong className="text-white font-semibold">Clicca su una card</strong> per aprire il
            sito esempio — tutto navigabile, mobile-first, performante.
          </p>

          {/* Mini metadati strip */}
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.18em] font-semibold text-slate-300/80">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              Mobile-first
            </span>
            <span className="text-slate-500">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              Animazioni leggere
            </span>
            <span className="text-slate-500">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              0 template, 0 wordpress
            </span>
          </div>
        </FadeUp>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {examples.map((e, i) => (
            <PortfolioCard key={e.href} e={e} i={i} />
          ))}
        </motion.div>

        {/* Footnote */}
        <FadeUp delay={0.2}>
          <p className="text-center text-sm text-slate-300/85 mt-10 max-w-2xl mx-auto">
            Questi sono solo <strong className="text-white font-semibold">3 esempi</strong>. Il tuo sito sarà
            costruito attorno al tuo settore, al tuo brand, ai tuoi clienti — non sarà come
            nessuno di questi.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
