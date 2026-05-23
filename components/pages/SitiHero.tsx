'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { staggerContainer, fadeUpVariants } from '@/components/shared/animations';
import { CheckCircle2 } from 'lucide-react';

export default function SitiHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background colored aurora */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,189,248,0.18) 0%, transparent 55%),' +
              'radial-gradient(ellipse 50% 50% at 18% 80%, rgba(6,182,212,0.10) 0%, transparent 55%),' +
              'radial-gradient(ellipse 40% 40% at 82% 70%, rgba(96,165,250,0.10) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute opacity-[0.025]"
          style={{
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 70%)',
          }}
        />
      </div>

      {/* Mascot — bottom-left */}
      <motion.div
        className="absolute bottom-4 left-2 md:bottom-10 md:left-16 pointer-events-none select-none z-0 opacity-40 md:opacity-60"
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        aria-hidden
      >
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [0, -1, 1, 0],
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            filter: 'drop-shadow(0 0 32px rgba(56,189,248,0.50)) drop-shadow(0 0 12px rgba(6,182,212,0.25))',
            willChange: 'transform',
          }}
          className="relative w-24 h-24 md:w-[140px] md:h-[140px]"
        >
          <Image src="/polpo.png" alt="" fill className="object-contain" />
        </motion.div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.span variants={fadeUpVariants} className="eyebrow-siti mb-7">
            Il tuo sito vetrina
          </motion.span>

          <motion.h1 variants={fadeUpVariants} className="h1-editorial is-siti mb-6">
            Il tuo <em>sito web</em><br />
            pronto a portare clienti.
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Non un sito qualsiasi, ma un sito <strong className="text-white font-medium">costruito attorno al tuo lavoro</strong>.
            Veloce sul telefono, trovabile su Google, scritto in italiano semplice. Pensato per portare richieste vere.
          </motion.p>

          <motion.ul
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mt-2"
          >
            {[
              'Consegnato in 15–30 giorni',
              'Ottimizzato per mobile e Google',
              'Copy scritto per convertire',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] text-sm text-slate-300" style={{ background: 'rgba(255,255,255,0.025)' }}>
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" strokeWidth={1.8} />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
