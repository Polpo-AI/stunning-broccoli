'use client';

import { motion, useInView, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { AlertCircle, Clock, Zap } from 'lucide-react';

const problems = [
  {
    icon: AlertCircle,
    title: 'Troppe email e messaggi',
    desc: 'Rispondi sempre alle stesse domande, ogni giorno. Un lavoro ripetitivo che toglie tempo a ciò che conta davvero.',
  },
  {
    icon: Clock,
    title: 'Il tempo non basta mai',
    desc: 'Tra richieste, preventivi e follow-up, la giornata finisce prima che tu riesca a concentrarti sulla crescita.',
  },
  {
    icon: Zap,
    title: 'Opportunità perse',
    desc: 'Ogni messaggio senza risposta rapida è un potenziale cliente che va dalla concorrenza. Fuori orario, il costo raddoppia.',
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothScroll, [0, 0.2, 0.5, 0.8, 1], [0, 0.4, 1, 0.4, 0]);
  const decorOpacity = useTransform(smoothScroll, [0, 0.3, 0.5, 0.7, 1], [0, 0.5, 1, 0.5, 0]);

  // Layering Parallax
  const contentY = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [40, 0, 0, -25]);
  const bgScale = useTransform(smoothScroll, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const bgY = useTransform(smoothScroll, [0, 1], ["0%", "15%"]);
  const decorY = useTransform(smoothScroll, [0, 1], ["0%", "-10%"]);

  const revealMask = useTransform(smoothScroll, [0, 0.3], [100, 0]);
  const blur = useTransform(smoothScroll, [0, 0.2], [4, 0]);

  const maskStyle = useTransform(revealMask, (v) =>
    `linear-gradient(to top, black ${100 - v}%, transparent ${110 - v}%)`
  );
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-[#070B14]/80 overflow-hidden">
      {/* Background Decor with Parallax */}
      {/* Layer 1: Background Aura (Slower) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(6, 182, 212, 0.03) 0%, transparent 70%)',
          opacity: decorOpacity,
          scale: bgScale,
          y: bgY
        }}
      />

      {/* Layer 2: Decorative Shapes (Faster) */}
      <motion.div
        className="absolute top-1/4 right-10 w-64 h-64 pointer-events-none z-10 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          y: decorY,
          filter: 'blur(40px)'
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-10 w-48 h-48 pointer-events-none z-10 opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          y: decorY,
          filter: 'blur(30px)'
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
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold tracking-[0.15em] text-cyan-400 uppercase opacity-80 block"
          >
            Il problema
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight tracking-tight"
          >
            Ogni giorno perdi tempo prezioso.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 mt-6 max-w-lg mx-auto text-lg leading-relaxed"
          >
            Non perché non sei bravo — ma perché stai facendo lavoro che una macchina può fare meglio di te.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={item}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  borderColor: 'rgba(34, 211, 238, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)'
                }}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-red-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
