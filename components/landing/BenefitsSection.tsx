'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { Shield, Sparkles, TrendingUp, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Risparmi tempo',
    desc: 'Le attività ripetitive diventano automatiche. Hai più ore libere ogni giorno.',
  },
  {
    icon: Sparkles,
    title: 'Non perdi contatti',
    desc: 'Ogni richiesta riceve una risposta immediata, anche fuori orario e nei weekend.',
  },
  {
    icon: TrendingUp,
    title: 'Processi più ordinati',
    desc: 'Il tuo lavoro diventa più strutturato. Meno caos, meno errori, meno stress.',
  },
  {
    icon: Zap,
    title: 'Focus sulla crescita',
    desc: 'Smetti di correre per stare al passo. Inizia a costruire il business che vuoi davvero.',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // ── 2. SMOOTHING (SPRING PHYSICS) ────────────────────────────────────────────
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothScroll, [0, 0.2, 0.5, 0.8, 1], [0, 0.4, 1, 0.4, 0]);
  const decorOpacity = useTransform(smoothScroll, [0, 0.3, 0.5, 0.7, 1], [0, 0.4, 1, 0.4, 0]);

  // Layering Parallax
  const contentY = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [50, 0, 0, -30]);
  const bgY = useTransform(smoothScroll, [0, 1], ["0%", "20%"]); // Slower background
  const decorY = useTransform(smoothScroll, [0, 1], ["0%", "-12%"]); // Faster decorative

  const revealMask = useTransform(smoothScroll, [0, 0.35], [100, 0]);
  const blur = useTransform(smoothScroll, [0, 0.3], [5, 0]);
  const bgScale = useTransform(smoothScroll, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  const maskStyle = useTransform(revealMask, (v) =>
    `linear-gradient(to top, black ${100 - v}%, transparent ${110 - v}%)`
  );
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section ref={containerRef} id="vantaggi" className="relative py-32 md:py-48 bg-[#070B14] overflow-hidden">
      {/* Background Decor with Parallax */}
      {/* Layer 1: Background Aura */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.02) 0%, transparent 60%)',
          opacity: decorOpacity,
          scale: bgScale,
          y: bgY
        }}
      />

      {/* Layer 2: Decorative Element */}
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none z-10 opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
          y: decorY,
          filter: 'blur(80px)'
        }}
      />

      {/* Layer 3: Content */}
      <motion.div
        style={{
          opacity,
          y: contentY,
          WebkitMaskImage: maskStyle,
          maskImage: maskStyle,
          filter: blurFilter,
          willChange: 'opacity, transform, mask-image, filter',
          transform: 'translateZ(0)'
        }}
        className="relative z-20 max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold tracking-[0.15em] text-cyan-400 uppercase opacity-80 block"
          >
            Vantaggi concreti
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight tracking-tight"
          >
            Cosa cambia davvero.
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                variants={item}
                whileHover={{ y: -5, scale: 1.01 }}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.04] group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {b.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
