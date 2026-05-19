'use client';

import { motion } from 'framer-motion';
import { FadeUp } from './animations';

export interface WhoIsItForItem {
  /** Icona (preferibile: Lucide icon, es. <Briefcase className="w-7 h-7" />). Può essere anche string emoji per retrocompatibilità. */
  icon: React.ReactNode;
  /** Titolo del profilo */
  title: string;
  /** Descrizione in linguaggio comune */
  desc: string;
  /** OPZIONALE — esempio concreto in italic per chiarezza */
  example?: string;
}

interface WhoIsItForProps {
  /** Variante colore — usa il color brand della pagina */
  variant?: 'siti' | 'chatbot' | 'agenti' | 'padel';
  /** Sopratitolo (eyebrow). Default "Per chi è" */
  eyebrow?: string;
  /** Titolo principale (può contenere <em> per gradient) */
  title: React.ReactNode;
  /** Subtitle opzionale */
  subtitle?: string;
  /** Lista profili */
  items: WhoIsItForItem[];
  /** Closing note opzionale sotto la griglia */
  footnote?: string;
}

/**
 * "Per chi è questo servizio?" — design premium con:
 * - Eyebrow + h2 editoriale
 * - Card a sfondo gradient con top accent line
 * - Icon-box grande con halo del color brand
 * - Hover lift + colore del brand
 * - Footnote opzionale ("se non ti riconosci, parliamone")
 */
export default function WhoIsItFor({
  variant = 'siti',
  eyebrow = 'Per chi è',
  title,
  subtitle,
  items,
  footnote,
}: WhoIsItForProps) {
  /* Token color per variant */
  const v = {
    siti: {
      h2: 'is-siti',
      eyebrow: 'eyebrow-siti',
      topBar: 'from-sky-400 via-cyan-400 to-blue-400',
      iconColor: 'text-sky-300',
      iconBg: 'rgba(56,189,248,0.12)',
      iconBorder: 'rgba(56,189,248,0.30)',
      iconHaloHover: 'rgba(56,189,248,0.22)',
      glow: 'rgba(56,189,248,0.20)',
      shadowHover: '0 20px 60px -16px rgba(56,189,248,0.40)',
      hoverBorder: 'hover:border-sky-400/50',
      hoverTitle: 'group-hover:text-sky-300',
    },
    chatbot: {
      h2: 'is-chatbot',
      eyebrow: 'eyebrow-chatbot',
      topBar: 'from-emerald-400 via-teal-400 to-cyan-400',
      iconColor: 'text-emerald-300',
      iconBg: 'rgba(16,185,129,0.12)',
      iconBorder: 'rgba(16,185,129,0.30)',
      iconHaloHover: 'rgba(16,185,129,0.22)',
      glow: 'rgba(16,185,129,0.20)',
      shadowHover: '0 20px 60px -16px rgba(16,185,129,0.40)',
      hoverBorder: 'hover:border-emerald-400/50',
      hoverTitle: 'group-hover:text-emerald-300',
    },
    agenti: {
      h2: 'is-agenti',
      eyebrow: 'eyebrow-agenti',
      topBar: 'from-violet-400 via-purple-400 to-indigo-400',
      iconColor: 'text-violet-300',
      iconBg: 'rgba(139,92,246,0.12)',
      iconBorder: 'rgba(139,92,246,0.30)',
      iconHaloHover: 'rgba(139,92,246,0.22)',
      glow: 'rgba(139,92,246,0.22)',
      shadowHover: '0 20px 60px -16px rgba(139,92,246,0.40)',
      hoverBorder: 'hover:border-violet-400/50',
      hoverTitle: 'group-hover:text-violet-300',
    },
    padel: {
      h2: 'is-padel',
      eyebrow: 'eyebrow-chatbot',
      topBar: 'from-emerald-400 via-teal-400 to-cyan-300',
      iconColor: 'text-emerald-300',
      iconBg: 'rgba(16,185,129,0.12)',
      iconBorder: 'rgba(16,185,129,0.30)',
      iconHaloHover: 'rgba(16,185,129,0.22)',
      glow: 'rgba(16,185,129,0.20)',
      shadowHover: '0 20px 60px -16px rgba(16,185,129,0.40)',
      hoverBorder: 'hover:border-emerald-400/50',
      hoverTitle: 'group-hover:text-emerald-300',
    },
  }[variant];

  return (
    <section className="relative py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="text-center mb-12 md:mb-14">
          <span className={`${v.eyebrow} mb-5`}>{eyebrow}</span>
          <h2 className={`h2-editorial ${v.h2} mt-4 mb-5`}>{title}</h2>
          {subtitle && (
            <p className="text-base md:text-[17px] text-slate-300/85 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </FadeUp>

        {/* Cards Grid — premium con top accent + icon-box grande */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
        >
          {items.map((item, i) => (
            <motion.article
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
                },
              }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
              className={`group relative p-6 md:p-7 rounded-2xl border border-white/[0.10] ${v.hoverBorder} overflow-hidden cursor-default`}
              style={{
                background:
                  'linear-gradient(160deg, rgba(20,28,55,0.94) 0%, rgba(14,21,46,0.97) 50%, rgba(11,17,40,0.99) 100%)',
                backdropFilter: 'blur(18px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
                boxShadow: `0 10px 32px rgba(0,0,0,0.45),
                            0 2px 0 rgba(255,255,255,0.05) inset,
                            0 -1px 24px rgba(0,0,0,0.4) inset`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `${v.shadowHover},
                  0 12px 32px rgba(0,0,0,0.5),
                  0 2px 0 rgba(255,255,255,0.05) inset`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 32px rgba(0,0,0,0.45),
                  0 2px 0 rgba(255,255,255,0.05) inset,
                  0 -1px 24px rgba(0,0,0,0.4) inset`;
              }}
            >
              {/* Highlight 3D superiore */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.20) 50%, transparent)',
                }}
              />

              {/* Top accent bar — gradient del brand */}
              <div
                className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${v.topBar}`}
                style={{ opacity: 0.6 }}
              />

              {/* Hover halo */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${v.glow}, transparent 65%)`,
                }}
              />

              {/* Numero progressivo decorativo */}
              <span className="absolute top-5 right-6 text-[11px] font-bold tracking-widest text-white/20 select-none font-editorial italic">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Layout flex: icon-box grande + testo */}
              <div className="flex items-start gap-4 md:gap-5 relative">
                {/* Icon-box 3D con halo color brand */}
                <div
                  className={`relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center ${v.iconColor} transition-all duration-400 group-hover:scale-110 group-hover:-rotate-3`}
                  style={{
                    background: v.iconBg,
                    border: `1px solid ${v.iconBorder}`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 14px rgba(0,0,0,0.3)`,
                  }}
                  aria-hidden
                >
                  <span className="relative z-10 flex items-center justify-center">{item.icon}</span>
                  {/* Halo dietro l'icona on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${v.iconHaloHover} 0%, transparent 70%)`,
                      filter: 'blur(8px)',
                    }}
                  />
                </div>

                {/* Testo */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-base md:text-lg font-bold text-white mb-2 leading-tight transition-colors duration-200 ${v.hoverTitle}`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-300/85 text-sm leading-relaxed">{item.desc}</p>

                  {/* Esempio concreto opzionale */}
                  {item.example && (
                    <p
                      className={`text-xs sm:text-sm mt-3 ${v.iconColor} italic font-editorial leading-relaxed border-l-2 pl-3`}
                      style={{ borderColor: v.iconBorder }}
                    >
                      {item.example}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Footnote opzionale */}
        {footnote && (
          <FadeUp delay={0.2}>
            <p className="text-center text-sm text-slate-400 mt-10 max-w-xl mx-auto italic">
              {footnote}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
