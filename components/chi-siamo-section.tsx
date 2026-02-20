'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import LaserText from './effects/laser-text';

const STATS = [
  { value: 50, suffix: '+', label: 'Aziende trasformate', color: '#00d4aa' },
  { value: 300, suffix: '%', label: 'ROI medio', color: '#00a8ff' },
  { value: 8, suffix: '', label: 'Servizi integrati', color: '#00d4aa' },
  { value: 30, suffix: 'gg', label: 'Tempo medio di deploy', color: '#00a8ff' },
];

function CounterStat({ stat }: { stat: typeof STATS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * stat.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-8 text-center relative overflow-hidden cursor-default"
      style={{
        background: 'rgba(0,11,30,0.85)',
        borderWidth: 1,
        borderStyle: 'solid',
      }}
      animate={{
        borderColor: hovered ? `${stat.color}50` : 'rgba(255,255,255,0.05)',
        boxShadow: hovered ? `0 0 40px ${stat.color}20, inset 0 0 30px ${stat.color}05` : 'none',
      }}
      transition={{ duration: 0.35 }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: hovered
            ? `radial-gradient(circle at 50% 50%, ${stat.color}08 0%, transparent 70%)`
            : 'none',
        }}
      />

      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}70, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="text-4xl lg:text-5xl font-bold mb-2 font-mono"
        style={{ color: stat.color, fontFamily: 'JetBrains Mono, monospace' }}
        animate={hovered ? { textShadow: `0 0 25px ${stat.color}80` } : { textShadow: 'none' }}
        transition={{ duration: 0.3 }}
      >
        {count}{stat.suffix}
      </motion.div>
      <p
        className="text-sm leading-relaxed"
        style={{
          color: hovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.35)',
          transition: 'color 0.3s ease',
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

function HolographicCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const tiltX = (mousePos.y - 0.5) * 12;
  const tiltY = (mousePos.x - 0.5) * -12;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
      className="relative rounded-3xl overflow-hidden p-10 h-80 flex flex-col justify-between cursor-default"
      style={{
        background: 'rgba(0,11,30,0.9)',
        border: '1px solid rgba(255,255,255,0.06)',
        rotateX: hovered ? tiltX : 0,
        rotateY: hovered ? tiltY : 0,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease',
      }}
      animate={{
        borderColor: hovered ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.06)',
        boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,212,170,0.1)' : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      transition={{ duration: 0.35 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hovered
            ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,212,170,0.12) 0%, rgba(0,168,255,0.06) 40%, transparent 70%)`
            : 'none',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,170,0.5) 2px, rgba(0,212,170,0.5) 3px)',
          backgroundSize: '100% 6px',
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-6 w-24 h-24 rounded-full bg-[#00d4aa] opacity-[0.08] blur-[30px]" />
        <div className="absolute bottom-4 right-6 w-24 h-24 rounded-full bg-[#00a8ff] opacity-[0.08] blur-[30px]" />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          className="relative w-16 h-16 flex-shrink-0"
          animate={hovered ? { scale: 1.08, rotate: [0, -3, 3, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/Gemini_Generated_Image_2i7jnj2i7jnj2i7j.png"
            alt="Polpo AI"
            fill
            className="object-contain"
          />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-white">Polpo AI</h3>
          <p className="text-sm" style={{ color: '#00d4aa' }}>AI Agency — Italia</p>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-white/60 italic leading-relaxed text-sm">
          "Siamo nati dall'ossessione per un problema: perché le aziende usano
          strumenti potenti in modo frammentato? La risposta è Polpo AI."
        </p>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00d4aa80, transparent)' }}
        animate={{ opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function ChiSiamoSection() {
  return (
    <section id="chi-siamo" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,212,170,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {STATS.map((stat) => (
            <CounterStat key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <HolographicCard />

          <div>
            <motion.p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono, monospace' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Chi Siamo
            </motion.p>
            <motion.h2
              className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-white block">
                <LaserText charDelay={0.04} scanColor="#00d4aa">
                  Un team ossessionato
                </LaserText>
              </span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #00d4aa 0%, #00a8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                dall'efficienza digitale.
              </span>
            </motion.h2>

            <motion.p
              className="text-white/55 text-base leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Siamo strateghi digitali, sviluppatori e specialisti AI con un obiettivo comune:
              costruire sistemi che lavorano mentre tu dormi. Non vendiamo soluzioni preconfezionate —
              progettiamo architetture su misura.
            </motion.p>
            <motion.p
              className="text-white/55 text-base leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ogni progetto inizia con l'ascolto profondo del tuo business. Poi costruiamo.
              Poi ottimizziamo. Poi scaliamo. Tutto con la precisione di un sistema nervoso digitale.
            </motion.p>

            <motion.a
              href="#contatti"
              className="inline-flex items-center gap-2 text-sm font-semibold group relative"
              style={{ color: '#00d4aa' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ x: 4 }}
            >
              Scopri come lavoriamo
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
              <motion.span
                className="absolute -bottom-0.5 left-0 h-px"
                style={{ background: '#00d4aa' }}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
