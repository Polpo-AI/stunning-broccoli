'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion';
import {
  Globe,
  MessageSquare,
  GitBranch,
  TrendingUp,
  Puzzle,
  BarChart3,
  Brain,
  Rocket,
} from 'lucide-react';
import LaserText from './effects/laser-text';

type Ease = [number, number, number, number];
const EASE: Ease = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    id: 1,
    num: '01',
    icon: Globe,
    name: 'Siti Web',
    tagline: 'Presenza digitale premium',
    description:
      'Progettiamo siti ad alte performance — veloci, SEO-ottimizzati e convertibili. Non un sito web, ma una macchina da lead.',
    accent: '#00d4aa',
    size: 'large',
  },
  {
    id: 2,
    num: '02',
    icon: MessageSquare,
    name: 'Chatbot AI',
    tagline: 'Assistenza 24/7 intelligente',
    description:
      'Chatbot addestrati sul tuo business. Gestiscono obiezioni, qualificano lead e prenotano appuntamenti in autonomia.',
    accent: '#00a8ff',
    size: 'normal',
  },
  {
    id: 3,
    num: '03',
    icon: GitBranch,
    name: 'Automazioni CRM',
    tagline: 'Pipeline che si muovono da sole',
    description:
      'Integriamo e automatizziamo il tuo CRM per eliminare le attività ripetitive e aumentare il tasso di chiusura.',
    accent: '#00d4aa',
    size: 'normal',
  },
  {
    id: 4,
    num: '04',
    icon: TrendingUp,
    name: 'Funnel',
    tagline: 'Percorsi di vendita convertenti',
    description:
      'Costruiamo funnel di acquisizione multi-step con logiche comportamentali per trasformare i visitatori in clienti.',
    accent: '#00a8ff',
    size: 'normal',
  },
  {
    id: 5,
    num: '05',
    icon: Puzzle,
    name: 'Integrazioni',
    tagline: 'Ecosistema connesso',
    description:
      'Connettiamo tutti i tuoi strumenti — CRM, e-commerce, payment gateway, calendari — in un flusso unico e sincronizzato.',
    accent: '#00d4aa',
    size: 'normal',
  },
  {
    id: 6,
    num: '06',
    icon: BarChart3,
    name: 'Analytics',
    tagline: 'Decisioni basate sui dati',
    description:
      'Dashboard centralizzate che aggregano dati da tutte le fonti. Vedi cosa funziona e ottimizza in tempo reale.',
    accent: '#00a8ff',
    size: 'large',
  },
  {
    id: 7,
    num: '07',
    icon: Brain,
    name: 'Supporto AI',
    tagline: "L'AI come risorsa interna",
    description:
      'Agenti AI personalizzati per il tuo team. Rispondono, analizzano documenti, generano report e supportano le vendite.',
    accent: '#00d4aa',
    size: 'normal',
  },
  {
    id: 8,
    num: '08',
    icon: Rocket,
    name: 'Scaling',
    tagline: 'Crescita sistematica',
    description:
      'Strategie e architetture scalabili che permettono al tuo business di crescere senza aumentare i costi operativi.',
    accent: '#00a8ff',
    size: 'normal',
  },
];

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#@01';

function useGlitch(text: string, intervalMs = 5000) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame: number;
    let iteration = 0;
    let timeout: ReturnType<typeof setTimeout>;

    function runGlitch() {
      const totalFrames = text.length * 4;
      iteration = 0;

      function tick() {
        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (i < iteration / 4) return text[i];
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join('')
        );
        iteration++;
        if (iteration < totalFrames) {
          frame = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
        }
      }

      tick();
    }

    const schedule = () => {
      timeout = setTimeout(() => {
        runGlitch();
        schedule();
      }, intervalMs + Math.random() * 2000);
    };

    schedule();
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [text, intervalMs]);

  return display;
}

function GlitchNumber({ num, accent }: { num: string; accent: string }) {
  const glitched = useGlitch(num);
  return (
    <span
      className="font-mono text-xs font-bold tracking-widest"
      style={{ color: accent, fontFamily: 'JetBrains Mono, monospace' }}
    >
      {glitched}
    </span>
  );
}

function TiltCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), {
    stiffness: 400,
    damping: 35,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 400,
    damping: 35,
  });
  const beamX = useTransform(rawX, [-0.5, 0.5], ['0%', '100%']);
  const beamY = useTransform(rawY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      className="relative rounded-2xl h-full cursor-pointer"
    >
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          background:
            'linear-gradient(145deg, rgba(0,20,50,0.9) 0%, rgba(0,11,30,0.97) 100%)',
          borderWidth: 1,
          borderStyle: 'solid',
        }}
        animate={{
          borderColor: hovered ? `${service.accent}55` : 'rgba(255,255,255,0.07)',
          boxShadow: hovered
            ? `0 0 50px ${service.accent}20, 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`
            : '0 4px 24px rgba(0,0,0,0.4)',
        }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at ${beamX} ${beamY}, ${service.accent}18 0%, transparent 65%)`,
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${beamX} ${beamY}, rgba(255,255,255,0.04) 0%, transparent 50%)`,
            }}
          />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(${service.accent}80 1px, transparent 1px), linear-gradient(90deg, ${service.accent}80 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        <div className="relative z-10 p-5 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              animate={{
                background: hovered ? `${service.accent}22` : 'rgba(255,255,255,0.04)',
                borderColor: hovered ? `${service.accent}45` : 'rgba(255,255,255,0.07)',
              }}
              style={{ borderWidth: 1, borderStyle: 'solid' }}
              transition={{ duration: 0.35 }}
            >
              <Icon
                size={20}
                style={{
                  color: hovered ? service.accent : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.3s ease',
                }}
              />
            </motion.div>
            <GlitchNumber num={service.num} accent={hovered ? service.accent : 'rgba(255,255,255,0.2)'} />
          </div>

          <h3 className="text-base font-bold text-white mb-1 leading-tight">
            {service.name}
          </h3>
          <p
            className="text-[11px] font-semibold tracking-wider uppercase mb-3"
            style={{
              color: hovered ? service.accent : 'rgba(255,255,255,0.3)',
              transition: 'color 0.3s ease',
            }}
          >
            {service.tagline}
          </p>
          <p
            className="text-xs leading-relaxed flex-1"
            style={{
              color: hovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.3s ease',
            }}
          >
            {service.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <motion.div
              className="h-px flex-1 mr-3"
              style={{
                background: `linear-gradient(90deg, ${service.accent}60, transparent)`,
              }}
              animate={{ opacity: hovered ? 1 : 0.2 }}
              transition={{ duration: 0.35 }}
            />
            <span
              className="font-mono text-[9px] tracking-widest uppercase"
              style={{
                color: hovered ? service.accent : 'rgba(255,255,255,0.2)',
                transition: 'color 0.3s ease',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              STATUS: OPERATIONAL
            </span>
          </div>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-x-0 bottom-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${service.accent}90, transparent)`,
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function TentaclesSVG() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <motion.path
          d="M150,150 Q400,80 600,300 Q800,520 1050,450"
          stroke="url(#tentGrad1)"
          strokeWidth="0.8"
          strokeDasharray="6 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.path
          d="M300,500 Q500,350 700,200 Q900,50 1100,180"
          stroke="url(#tentGrad2)"
          strokeWidth="0.8"
          strokeDasharray="6 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 3.5, ease: 'easeInOut', delay: 1 }}
        />
        <motion.path
          d="M80,350 Q350,280 600,400 Q850,520 1150,300"
          stroke="url(#tentGrad1)"
          strokeWidth="0.6"
          strokeDasharray="4 14"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 4, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.path
          d="M600,50 Q650,200 500,350 Q350,500 400,580"
          stroke="url(#tentGrad2)"
          strokeWidth="0.7"
          strokeDasharray="5 12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.8 }}
        />

        <motion.circle
          cx="150" cy="150" r="3"
          fill="#00d4aa"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.circle
          cx="1050" cy="450" r="3"
          fill="#00a8ff"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
        />
        <motion.circle
          cx="600" cy="300" r="4"
          fill="#00d4aa"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.8, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
        />
        <motion.circle
          cx="300" cy="500" r="2.5"
          fill="#00a8ff"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.circle
          cx="1100" cy="180" r="2.5"
          fill="#00d4aa"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8 }}
        />

        <defs>
          <linearGradient id="tentGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity="0" />
            <stop offset="30%" stopColor="#00d4aa" stopOpacity="1" />
            <stop offset="70%" stopColor="#00a8ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00a8ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tentGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00a8ff" stopOpacity="0" />
            <stop offset="40%" stopColor="#00a8ff" stopOpacity="1" />
            <stop offset="60%" stopColor="#00d4aa" stopOpacity="1" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.8, filter: 'blur(8px)' },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 22,
      mass: 0.8,
    },
  },
};

export default function ServicesSection() {
  return (
    <section
      id="servizi"
      className="py-28 relative overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,212,170,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#00d4aa]/40 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-[#00a8ff]/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <motion.div
              className="w-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #00d4aa)' }}
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p
              className="text-xs font-bold tracking-[0.35em] uppercase"
              style={{
                color: '#00d4aa',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              I Tentacoli Operativi
            </p>
            <motion.div
              className="w-8 h-px"
              style={{ background: 'linear-gradient(90deg, #00d4aa, transparent)' }}
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            <span className="text-white block">
              <LaserText charDelay={0.05} scanColor="#00d4aa">
                Otto braccia.
              </LaserText>
            </span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4aa 0%, #00a8ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Un unico sistema.
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed tracking-wide">
            Ogni servizio è un tentacolo specializzato. Tutti connessi al core centrale,
            tutti sincronizzati, tutti orientati a un obiettivo: la crescita del tuo business.
          </p>
        </motion.div>

        <div className="relative">
          <TentaclesSVG />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10"
          >
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="h-full min-h-[220px]"
              >
                <TiltCard service={service} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#contatti"
            className="group relative flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden"
            style={{
              border: '1px solid rgba(0,212,170,0.25)',
              color: '#00d4aa',
            }}
          >
            <motion.span
              className="absolute inset-0 -skew-x-[15deg]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(0,212,170,0.07), transparent)',
              }}
              animate={{ x: ['-150%', '250%'] }}
              transition={{
                duration: 1.6,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
            />
            <span className="relative font-semibold text-sm tracking-wide">
              Costruiamo il tuo sistema
            </span>
            <span className="relative group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
