'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Network, Cpu, Layers } from 'lucide-react';
import LaserText from './effects/laser-text';

const PILLARS = [
  {
    icon: Cpu,
    title: 'Intelligenza Centrale',
    text: "Un'AI che impara dal tuo business, analizza i dati e orchestra ogni automazione in modo fluido.",
    color: '#00d4aa',
  },
  {
    icon: Network,
    title: 'Moduli Integrati',
    text: 'Ogni componente opera in modo autonomo ma comunicante — come un sistema nervoso coordinato.',
    color: '#00a8ff',
  },
  {
    icon: Activity,
    title: 'Adattamento Continuo',
    text: 'Il sistema si ottimizza in tempo reale. Ogni interazione diventa dati, ogni dato diventa miglioramento.',
    color: '#00d4aa',
  },
  {
    icon: Layers,
    title: 'Architettura Scalabile',
    text: 'Parti con ciò che ti serve oggi. Aggiungi nuovi moduli quando il business cresce.',
    color: '#00a8ff',
  },
];

const PROCESS_STEPS = [
  { step: '01', label: 'Diagnosi & Strategia', color: '#00d4aa' },
  { step: '02', label: 'Architettura & Build', color: '#00a8ff' },
  { step: '03', label: 'Deploy & Attivazione', color: '#00d4aa' },
];

function TerminalText({ lines, isVisible }: { lines: string[]; isVisible: boolean }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isVisible || done) return;
    if (currentLine >= lines.length) { setDone(true); return; }

    const line = lines[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setVisibleLines((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] || '') + line[currentChar];
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, 22 + Math.random() * 18);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [isVisible, currentLine, currentChar, lines, done]);

  return (
    <div
      className="rounded-xl p-5 font-mono text-xs leading-relaxed"
      style={{
        background: 'rgba(0,11,30,0.8)',
        border: '1px solid rgba(0,212,170,0.15)',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: '1px solid rgba(0,212,170,0.1)' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00d4aa', opacity: 0.7 }} />
        <span className="ml-2 text-[10px] tracking-widest" style={{ color: 'rgba(0,212,170,0.4)' }}>POLPO_AI — terminal</span>
      </div>
      {lines.map((_, i) => (
        <div key={i} className="flex gap-2">
          <span style={{ color: 'rgba(0,212,170,0.4)' }}>{'>'}</span>
          <span style={{ color: i < currentLine || done ? 'rgba(255,255,255,0.7)' : '#00d4aa' }}>
            {visibleLines[i] || ''}
            {i === currentLine && !done && (
              <motion.span
                style={{ color: '#00d4aa' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              >
                _
              </motion.span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [scanPos, setScanPos] = useState(-100);
  const Icon = pillar.icon;

  useEffect(() => {
    if (!hovered) return;
    let raf: number;
    const start = performance.now();
    const duration = 600;
    const tick = (now: number) => {
      const t = (now - start) / duration;
      setScanPos(-10 + t * 120);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setScanPos(200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setScanPos(-100); }}
      className="rounded-2xl p-6 relative overflow-hidden cursor-default"
      style={{
        background: 'rgba(0,11,30,0.85)',
        borderWidth: 1,
        borderStyle: 'solid',
      }}
      animate={{
        borderColor: hovered ? `${pillar.color}50` : 'rgba(255,255,255,0.06)',
        boxShadow: hovered ? `0 0 30px ${pillar.color}18` : 'none',
      }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hovered
            ? `linear-gradient(${scanPos}deg, transparent 40%, ${pillar.color}08 50%, transparent 60%)`
            : 'none',
        }}
      />

      <motion.div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
        animate={{
          background: hovered ? `${pillar.color}20` : `${pillar.color}10`,
          borderColor: hovered ? `${pillar.color}45` : `${pillar.color}20`,
        }}
        style={{ borderWidth: 1, borderStyle: 'solid' }}
      >
        <Icon size={18} style={{ color: pillar.color }} />
      </motion.div>

      <h3 className="text-sm font-bold text-white mb-2">{pillar.title}</h3>
      <p
        className="text-xs leading-relaxed"
        style={{
          color: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.38)',
          transition: 'color 0.3s ease',
        }}
      >
        {pillar.text}
      </p>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${pillar.color}70, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

function ProcessStep({ step, label, color, index }: { step: string; label: string; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="text-2xl font-bold font-mono flex-shrink-0"
        style={{ color, fontFamily: 'JetBrains Mono, monospace' }}
        animate={isInView ? { textShadow: [`0 0 0px ${color}00`, `0 0 15px ${color}80`, `0 0 0px ${color}00`] } : {}}
        transition={{ delay: index * 0.2 + 0.4, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
      >
        {step}
      </motion.span>

      <div className="flex-1 relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.06]" />
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ delay: index * 0.2 + 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <span className="text-sm text-white/70 font-medium whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

export default function StorytellingSection() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInView = useInView(terminalRef, { once: true, margin: '-60px' });

  const TERMINAL_LINES = [
    'Analizzando architettura business...',
    'Mapping flussi operativi → 14 punti di ottimizzazione',
    'Deploy automazioni AI: 4/4 moduli attivi',
    'Sistema nervoso digitale: ONLINE ✓',
  ];

  return (
    <section id="come-funziona" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00d4aa] opacity-[0.03] blur-[120px]" />
        <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#00a8ff] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono, monospace' }}
            >
              Il Nostro Approccio
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              <span className="text-white block">
                <LaserText charDelay={0.04} scanColor="#00d4aa">
                  Non facciamo solo siti.
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
                Creiamo il tuo sistema nervoso digitale.
              </span>
            </h2>

            <div className="space-y-5 mb-8">
              <p className="text-white/60 text-base leading-relaxed">
                Un polpo ha il 60% dei neuroni nei tentacoli. Ogni tentacolo è intelligente
                di per sé, ma coordinato da un cervello centrale. Questa è la nostra filosofia.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Il tuo business ha bisogno della stessa architettura: un cervello centrale
                (la strategia) che coordina moduli operativi specializzati,
                ciascuno capace di agire in autonomia e in perfetta sinergia.
              </p>
            </div>

            <div ref={terminalRef}>
              <TerminalText lines={TERMINAL_LINES} isVisible={terminalInView} />
            </div>

            <div className="flex items-center gap-3 mt-6">
              <div className="flex -space-x-1">
                {['#00d4aa', '#00a8ff', '#00d4aa'].map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full border-2"
                    style={{ background: color, borderColor: '#000b1e' }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
              <p className="text-sm text-white/40">
                Strategie implementate per oltre 50+ aziende
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {PILLARS.map((pillar, i) => (
              <PillarCard key={i} pillar={pillar} index={i} />
            ))}
          </motion.div>
        </div>

        <div className="mt-32">
          <motion.div
            className="relative rounded-3xl overflow-hidden p-12 lg:p-16"
            style={{
              background: 'rgba(0,11,30,0.85)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #00d4aa60, transparent)' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #00a8ff60, transparent)' }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />

            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <p
                  className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
                  style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Il Processo
                </p>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                  <LaserText charDelay={0.035} scanColor="#00d4aa">
                    Dal caos operativo
                  </LaserText>
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #00d4aa 0%, #00a8ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    a un organismo sincrono.
                  </span>
                </h3>
                <p className="text-white/55 leading-relaxed max-w-lg text-sm">
                  Analizziamo il tuo business, mappiamo i flussi, identifichiamo i colli di bottiglia
                  e costruiamo un'architettura digitale su misura. In 30 giorni,
                  il tuo sistema nervoso digitale è attivo.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {PROCESS_STEPS.map((item, i) => (
                  <ProcessStep key={item.step} {...item} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
