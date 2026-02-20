'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import AICore from './ai-core';
import ShimmerButton from './effects/shimmer-button';
import LaserText from './effects/laser-text';

type Ease = [number, number, number, number];
const EASE: Ease = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
  visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
};
const coreVariants: Variants = {
  hidden: { x: 60, opacity: 0, scale: 0.9, filter: 'blur(12px)' },
  visible: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.1, ease: EASE, delay: 0.4 } },
};

const STAT_TARGETS = [
  { value: 8, suffix: '', label: 'Servizi integrati', color: '#00d4aa' },
  { value: 100, suffix: '%', label: 'Automazioni AI', color: '#00a8ff' },
  { value: 24, suffix: '/7', label: 'Operatività', color: '#00d4aa' },
];

function AnimatedStat({ target, suffix, label, color, delay }: { target: number; suffix: string; label: string; color: string; delay: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const startTime = performance.now() + delay * 1000;
    let frame: number;
    const tick = (now: number) => {
      if (now < startTime) { frame = requestAnimationFrame(tick); return; }
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target, delay]);

  return (
    <div ref={ref} className="flex flex-col group cursor-default">
      <motion.span
        className="text-2xl font-bold font-mono"
        style={{ color }}
        whileHover={{ scale: 1.1, textShadow: `0 0 20px ${color}80` }}
        transition={{ duration: 0.2 }}
      >
        {count}{suffix}
      </motion.span>
      <span className="text-xs text-white/35 mt-0.5 tracking-[0.15em] uppercase">{label}</span>
    </div>
  );
}

function DataParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);

    const CHARS = '01アイウエオカキ<>/[]{}';
    const cols = Math.floor(w / 18);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -50);
    const speeds: number[] = Array.from({ length: cols }, () => 0.3 + Math.random() * 0.5);
    const colors = ['#00d4aa', '#00a8ff', 'rgba(0,212,170,0.5)'];

    let raf: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(0,11,30,0.06)';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * 18;
        const y = drops[i] * 18;
        ctx.fillStyle = colors[i % colors.length];
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.globalAlpha = 0.08 + Math.random() * 0.06;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;
        drops[i] += speeds[i];
        if (y > h + 100) drops[i] = -Math.random() * 20;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
      aria-hidden="true"
    />
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <DataParticles />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="max-w-7xl mx-auto px-6 w-full pt-32 pb-24 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            <motion.div variants={itemVariants}>
              <motion.span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
                style={{
                  border: '1px solid rgba(0,212,170,0.3)',
                  color: '#00d4aa',
                  background: 'rgba(0,212,170,0.05)',
                }}
                animate={{
                  boxShadow: ['0 0 0px rgba(0,212,170,0)', '0 0 12px rgba(0,212,170,0.3)', '0 0 0px rgba(0,212,170,0)'],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Zap size={10} className="fill-current" />
                AI-Powered Agency
              </motion.span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
                <span className="text-white block">
                  <LaserText delay={0.5} charDelay={0.04} scanColor="#00d4aa" once={false}>
                    Un cervello
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
                  <LaserText delay={0.9} charDelay={0.06} scanColor="#00a8ff" once={false}>
                    digitale.
                  </LaserText>
                </span>
                <span className="text-white text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight block">
                  <LaserText delay={1.2} charDelay={0.025} scanColor="#00d4aa" once={false}>
                    Otto braccia operative per il tuo business.
                  </LaserText>
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/55 leading-relaxed max-w-xl"
            >
              Non costruiamo semplici siti. Creiamo il tuo{' '}
              <span className="text-[#00d4aa] font-medium">sistema nervoso digitale</span>
              {' '}— un ecosistema intelligente dove ogni automazione lavora in perfetta sinergia.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <ShimmerButton
                href="#contatti"
                shimmerColor="rgba(0,212,170,0.3)"
                className="px-8 py-4 rounded-xl bg-[#00d4aa] text-[#000b1e] font-bold text-base glow-teal"
              >
                <span className="flex items-center gap-2">
                  Attiva il tuo sistema
                  <ArrowRight size={18} />
                </span>
              </ShimmerButton>

              <ShimmerButton
                href="#servizi"
                shimmerColor="rgba(0,168,255,0.15)"
                className="px-8 py-4 rounded-xl border border-white/10 text-white/80 font-medium text-base hover:border-[#00a8ff]/40 hover:text-white bg-white/[0.02]"
              >
                Scopri i servizi
              </ShimmerButton>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-10 pt-2">
              {STAT_TARGETS.map((stat, i) => (
                <AnimatedStat
                  key={stat.label}
                  target={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  color={stat.color}
                  delay={i * 0.15}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={coreVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <AICore />

              <motion.div
                className="absolute -top-4 -right-4 font-mono text-[9px] tracking-widest"
                style={{ color: 'rgba(0,212,170,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                CORE_ACTIVE
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 font-mono text-[9px] tracking-widest"
                style={{ color: 'rgba(0,168,255,0.5)', fontFamily: 'JetBrains Mono, monospace' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              >
                8 NODES_ONLINE
              </motion.div>

              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-widest whitespace-nowrap"
                style={{ color: 'rgba(0,168,255,0.3)', fontFamily: 'JetBrains Mono, monospace' }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                SYS:BOOT_COMPLETE
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#00d4aa]/50 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
