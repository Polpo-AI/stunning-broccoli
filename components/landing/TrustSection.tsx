'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Heart, Users } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Approccio su misura',
    desc: 'Niente soluzioni preconfezionate. Ascoltiamo il tuo business e costruiamo esattamente quello che ti serve.',
  },
  {
    icon: Heart,
    title: 'Velocità',
    desc: 'Lavoriamo in modo snello e rapido. Dal primo incontro al go-live, passiamo ai fatti senza perdere tempo.',
  },
  {
    icon: Users,
    title: 'Supporto completo',
    desc: 'Non ti lasciamo solo dopo il lancio. Siamo con te per ogni aggiornamento, domanda o nuova esigenza.',
  },
];

export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.4, 1, 0.4, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [35, 0, 0, -35]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]); // Slower background
  const decorY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]); // Faster decorative

  const revealMask = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2], [4, 0]);

  return (
    <section ref={containerRef} className="py-24 bg-[#070B14] relative overflow-hidden">
      {/* Layer 1: Subtle Ambient Light */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(6, 182, 212, 0.05) 0%, transparent 60%)',
          y: bgY
        }}
      />

      {/* Layer 3: Content */}
      <motion.div
        style={{
          opacity,
          y: contentY,
          clipPath: useTransform(revealMask, (v) => `inset(0 0 ${v}% 0)`),
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          willChange: 'opacity, transform, clip-path, filter',
          transform: 'translateZ(0)'
        }}
        className="relative z-20 max-w-5xl mx-auto px-6"
      >
        <div ref={ref} className="text-center mb-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            <span className="text-white font-semibold">Progetti su misura,</span> pensati per il tuo settore.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-12 h-px bg-cyan-500/40 mx-auto mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.7, delay: 0.3 + idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] transition-colors duration-300 hover:border-cyan-500/20 hover:bg-white/[0.04] group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">{it.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
