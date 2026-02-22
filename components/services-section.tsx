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
  X,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from './ui/button';
import LaserText from './effects/laser-text';

type Ease = [number, number, number, number];
const EASE: Ease = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    id: 'siti-web',
    num: '01',
    icon: Globe,
    name: 'Siti Web',
    tagline: 'Un sito chiaro e veloce che trasforma visite in contatti.',
    description: 'Costruiamo un sito che spiega bene cosa fai e guida le persone a contattarti. Messaggio chiaro, struttura semplice, prestazioni veloci.',
    extendedDescription: 'Un sito web professionale è la base del tuo business online. Lo progettiamo per essere veloce, sicuro e ottimizzato per convertire ogni visitatore in un potenziale cliente.',
    badges: ['Conversione', 'Performance', 'UX'],
    isIdealeSe: [
      'Hai un sito vecchio che non porta richieste',
      'Le persone visitano ma non ti contattano',
      'Vuoi comunicare meglio il tuo valore',
    ],
    whatYouGet: [
      'Design moderno e responsive',
      'Ottimizzazione per i motori di ricerca',
      'Struttura orientata alla conversione',
    ],
    practicalExamples: [
      { title: 'Landing Page', desc: 'Sito a pagina singola per prodotti o promozioni' },
      { title: 'Sito Aziendale', desc: 'Presentazione completa della tua attività e servizi' },
    ],
    accent: '#00d4aa',
  },
  {
    id: 'chatbot',
    num: '02',
    icon: MessageSquare,
    name: 'Chatbot AI',
    tagline: 'Assistenza automatica 24/7 che risponde e qualifica i lead.',
    description: 'Un assistente intelligente che parla con i tuoi clienti, risponde alle domande frequenti e raccoglie contatti anche mentre dormi.',
    extendedDescription: 'I nostri chatbot non sono semplici risponditori automatici. Usano l\'intelligenza artificiale per comprendere le intenzioni degli utenti e fornire risposte precise e utili.',
    badges: ['Risposta 24/7', 'Qualifica Lead', 'AI'],
    isIdealeSe: [
      'Ricevi troppe domande ripetitive via chat o mail',
      'Vuoi dare risposte istantanee ai tuoi clienti',
      'Perdi contatti fuori dall\'orario di lavoro',
    ],
    whatYouGet: [
      'Integrazione con il tuo sito e social',
      'Addestramento sui tuoi dati aziendali',
      'Dashboard per monitorare le conversazioni',
    ],
    practicalExamples: [
      { title: 'Customer Support', desc: 'Risposte automatiche h24 basate sui tuoi dati' },
      { title: 'Lead Generation', desc: 'Qualifica i contatti prima della tua chiamata' },
    ],
    accent: '#00a8ff',
  },
  {
    id: 'automazioni',
    num: '03',
    icon: GitBranch,
    name: 'Automazioni',
    tagline: 'Colleghiamo i tuoi software per eliminare il lavoro manuale.',
    description: 'Facciamo parlare tra loro le tue app per automatizzare compiti ripetitivi. Risparmia ore di lavoro e riduci gli errori umani.',
    extendedDescription: 'L\'orchestrazione dei flussi di lavoro permette di scalare senza aumentare lo stress. Automatizziamo tutto ciò che è ripetitivo e noioso.',
    badges: ['Efficienza', 'Sincronizzazione', 'No-Code'],
    isIdealeSe: [
      'Passi ore a copiare dati da un programma all\'altro',
      'Dimentichi spesso di inviare mail o notifiche',
      'I tuoi processi interni sono lenti e manuali',
    ],
    whatYouGet: [
      'Flussi di lavoro automatizzati tra app',
      'Notifiche in tempo reale su Slack/Telegram',
      'Sincronizzazione database automatica',
    ],
    practicalExamples: [
      { title: 'Sync CRM', desc: 'Aggiornamento automatico contatti tra software' },
      { title: 'Follow-up Automati', desc: 'Invio email e reminder post-contatto' },
    ],
    accent: '#00d4aa',
  },
  {
    id: 'crm-funnel',
    num: '04',
    icon: TrendingUp,
    name: 'CRM & Funnel',
    tagline: 'Gestisci i contatti in modo ordinato e guidali all\'acquisto.',
    description: 'Un sistema per tracciare ogni potenziale cliente e guidarlo lungo un percorso che lo porta a diventare un cliente pagante.',
    extendedDescription: 'Monitora ogni opportunità commerciale. Un CRM ben configurato e un funnel ottimizzato sono il motore della crescita aziendale.',
    badges: ['Sales', 'Growth', 'Tracciamento'],
    isIdealeSe: [
      'Perdi traccia dei contatti e delle trattative',
      'Non hai un processo di vendita chiaro',
      'Vuoi aumentare il valore medio di ogni cliente',
    ],
    whatYouGet: [
      'Pipeline di vendita personalizzata',
      'Sistemi di prenotazione automatizzati',
      'Reportistica chiara sulle vendite',
    ],
    practicalExamples: [
      { title: 'Pipeline Vendite', desc: 'Gestione visiva delle trattative in corso' },
      { title: 'Booking Funnel', desc: 'Percorso automatico per prenotare appuntamenti' },
    ],
    accent: '#00a8ff',
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
  onClick,
  isHidden,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  onClick: () => void;
  isHidden: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });
  const beamX = useTransform(rawX, [-0.5, 0.5], ['0%', '100%']);
  const beamY = useTransform(rawY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(x);
      rawY.set(y);
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
      layoutId={`card-${service.id}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        opacity: isHidden ? 0 : 1,
        scale: isHidden ? 0.95 : hovered ? 1.02 : 1,
        pointerEvents: isHidden ? 'none' : 'auto',
      }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      onClick={onClick}
      className="relative rounded-2xl h-full cursor-pointer group"
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

          <motion.h3
            layoutId={`title-${service.id}`}
            className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#00d4aa] transition-colors"
          >
            {service.name}
          </motion.h3>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.badges.map((badge) => (
              <span
                key={badge}
                className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border border-white/5 bg-white/[0.03] text-white/40 group-hover:border-[#00d4aa]/20 group-hover:text-[#00d4aa]/60 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>

          <motion.p
            layoutId={`desc-${service.id}`}
            className="text-xs leading-relaxed flex-1"
            style={{
              color: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.3s ease',
            }}
          >
            {service.tagline}
          </motion.p>

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
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeService = SERVICES.find((s) => s.id === activeId);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeId]);

  return (
    <section
      id="servizi"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-28 relative overflow-hidden group/section"
      style={{ background: 'transparent' }}
    >
      {/* Spotlight Effect (Desktop Only) */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/section:opacity-100 transition-opacity duration-500 hidden lg:block"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 212, 170, 0.08), transparent 40%)`
          ),
        }}
      />

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
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
              I nostri Servizi
            </p>
            <motion.div
              className="w-8 h-px"
              style={{ background: 'linear-gradient(90deg, #00d4aa, transparent)' }}
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="text-white block mb-2">
              Costruiamo il tuo sistema digitale
            </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4aa 0%, #00a8ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              in 4 parti collegate tra loro.
            </span>
          </h2>

          <div className="flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
            <span>Traffico</span>
            <ArrowRight size={10} className="text-[#00d4aa]/40" />
            <span>Conversazione</span>
            <ArrowRight size={10} className="text-[#00d4aa]/40" />
            <span>Automazione</span>
            <ArrowRight size={10} className="text-[#00d4aa]/40" />
            <span>Vendita</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-1.5 h-3 bg-[#00d4aa]/50 inline-block ml-1"
            />
          </div>
        </motion.div>

        <div className="relative">
          <TentaclesSVG />

          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {!activeId ? (
                <motion.div
                  key="grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"
                >
                  {SERVICES.map((service, index) => (
                    <motion.div
                      key={service.id}
                      variants={cardVariants}
                      className="h-full min-h-[200px]"
                    >
                      <TiltCard
                        service={service}
                        index={index}
                        onClick={() => setActiveId(service.id)}
                        isHidden={activeId !== null && activeId !== service.id}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="overlay"
                  layoutId={`card-${activeId}`}
                  className="absolute inset-0 z-20"
                  transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                >
                  <div
                    className="h-full w-full rounded-2xl p-8 lg:p-12 relative overflow-auto border border-white/10"
                    style={{
                      background: 'rgba(0, 11, 30, 0.98)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <button
                      onClick={() => setActiveId(null)}
                      className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white z-30"
                    >
                      <X size={24} />
                    </button>

                    <div className="flex flex-col lg:flex-row gap-12 h-full relative z-20">
                      <div className="flex-1 space-y-10">
                        <div>
                          <div className="flex items-center gap-5 mb-8">
                            <motion.div
                              layoutId={`icon-${activeId}`}
                              className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
                              style={{ background: `${activeService?.accent}15`, borderColor: `${activeService?.accent}30` }}
                            >
                              {activeService && <activeService.icon size={32} style={{ color: activeService.accent }} />}
                            </motion.div>
                            <div>
                              <p className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: activeService?.accent }}>
                                SERVIZIO {activeService?.num}
                              </p>
                              <motion.h3
                                layoutId={`title-${activeId}`}
                                className="text-3xl font-bold text-white uppercase tracking-tight"
                              >
                                {activeService?.name}
                              </motion.h3>
                            </div>
                          </div>

                          <motion.p
                            layoutId={`desc-${activeId}`}
                            className="text-xl text-white leading-relaxed font-light mb-8"
                          >
                            {activeService?.extendedDescription}
                          </motion.p>

                          <div className="grid sm:grid-cols-2 gap-10">
                            <div className="space-y-6">
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00d4aa] flex items-center gap-2">
                                <span className="w-4 h-px bg-[#00d4aa]/30" />
                                Cosa ottieni
                              </h4>
                              <ul className="grid gap-4">
                                {activeService?.whatYouGet.map((item, i) => (
                                  <li key={i} className="flex items-start gap-4 text-white/80 group">
                                    <CheckCircle2 size={18} className="text-[#00d4aa] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-6">
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00a8ff] flex items-center gap-2">
                                <span className="w-4 h-px bg-[#00a8ff]/30" />
                                È ideale se
                              </h4>
                              <ul className="grid gap-4">
                                {activeService?.isIdealeSe.map((item, i) => (
                                  <li key={i} className="flex items-start gap-4 text-white/60 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                    <span className="text-sm leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-1/3 space-y-6">
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-8 h-full flex flex-col justify-between">
                          <div className="space-y-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                              Esempi pratici
                            </h4>
                            <div className="space-y-5">
                              {activeService?.practicalExamples.map((example, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-colors">
                                  <p className="text-[10px] font-bold text-[#00a8ff] uppercase mb-2">
                                    {example.title}
                                  </p>
                                  <p className="text-sm text-white/80 leading-relaxed font-light">
                                    {example.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3 pt-6">
                            <Button
                              asChild
                              className="w-full bg-[#00d4aa] hover:bg-[#00d4aa]/90 text-[#000b1e] font-bold h-12 rounded-xl group"
                            >
                              <a href="#contatti" className="flex items-center justify-center gap-2">
                                Parliamone
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </a>
                            </Button>
                            <Button
                              onClick={() => setActiveId(null)}
                              variant="ghost"
                              className="w-full text-white/30 hover:text-white hover:bg-white/5 h-12 rounded-xl"
                            >
                              Torna ai servizi
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-white/20 text-xs font-mono tracking-[0.3em] uppercase">
            Non sono strumenti separati. È un unico sistema che lavora per te.
          </p>
        </motion.div>

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
