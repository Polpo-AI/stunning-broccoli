'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CODE_LINES = [
  'const neural = await polpo.ai.train({ epochs: 8, threads: "auto" });',
  'octopus.tentacles.map(t => t.automate({ trigger: "webhook" }));',
  'system.init({ mode: "neural", core: "distributed", uptime: Infinity });',
  'crm.pipeline.sync({ ai: true, latency: 0 });',
  'funnel.optimize({ conversion_rate: 0.94, ab_test: true });',
  'analytics.stream({ realtime: true, source: "all_channels" });',
  'chatbot.deploy({ model: "gpt-4o", persona: "custom", 24x7: true });',
  'scaling.horizontal({ trigger: "load > 0.7", nodes: "auto" });',
  'webhook.register({ events: ["lead", "sale", "churn"], batch: false });',
  'ai.orchestrate({ services: tentacles, sync: "realtime" });',
];

const GPS_COORDS = [
  { lat: '41°54\'N', lon: '12°29\'E', label: 'ROMA' },
  { lat: '45°28\'N', lon: '09°11\'E', label: 'MILANO' },
  { lat: '43°46\'N', lon: '11°15\'E', label: 'FIRENZE' },
  { lat: '40°51\'N', lon: '14°15\'E', label: 'NAPOLI' },
];

function GPSCoord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % GPS_COORDS.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const coord = GPS_COORDS[idx];

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[9px] tracking-widest text-white/20 leading-relaxed"
        >
          <div className="text-[#bc13fe]/30 font-bold">{coord.label}</div>
          <div>{coord.lat}</div>
          <div>{coord.lon}</div>
          <div className="text-white/10 mt-1">SYS_NODE_ACTIVE</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollingCode() {
  return (
    <div className="relative overflow-hidden h-full">
      <motion.div
        className="flex flex-col gap-3"
        animate={{ y: [0, -CODE_LINES.length * 28] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...CODE_LINES, ...CODE_LINES].map((line, i) => (
          <div
            key={i}
            className="font-mono text-[9px] text-white/10 whitespace-nowrap tracking-wide"
            style={{ opacity: 0.4 - (i % CODE_LINES.length) * 0.02 }}
          >
            <span className="text-[#bc13fe]/20 mr-2">{String(i % CODE_LINES.length + 1).padStart(2, '0')}</span>
            {line}
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#000b1e] via-transparent to-[#000b1e] pointer-events-none" />
    </div>
  );
}

function CornerGrid({ position }: { position: 'tl' | 'br' }) {
  const size = 120;
  const lines = 6;
  const step = size / lines;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={
        position === 'tl'
          ? { top: 80, left: 0 }
          : { bottom: 80, right: 0 }
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0.3, 0.5, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay: position === 'br' ? 4 : 0 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: lines + 1 }).map((_, i) => (
          <g key={i}>
            <line
              x1={i * step} y1={0} x2={i * step} y2={size}
              stroke="rgba(188,19,254,0.2)" strokeWidth="0.5"
            />
            <line
              x1={0} y1={i * step} x2={size} y2={i * step}
              stroke="rgba(188,19,254,0.2)" strokeWidth="0.5"
            />
          </g>
        ))}
        <rect
          x={0} y={0} width={size} height={size}
          fill="none" stroke="rgba(0,212,170,0.3)" strokeWidth="1"
        />
        {position === 'tl' ? (
          <>
            <line x1={0} y1={0} x2={16} y2={0} stroke="rgba(0,212,170,0.7)" strokeWidth="1.5" />
            <line x1={0} y1={0} x2={0} y2={16} stroke="rgba(0,212,170,0.7)" strokeWidth="1.5" />
          </>
        ) : (
          <>
            <line x1={size} y1={size} x2={size - 16} y2={size} stroke="rgba(0,212,170,0.7)" strokeWidth="1.5" />
            <line x1={size} y1={size} x2={size} y2={size - 16} stroke="rgba(0,212,170,0.7)" strokeWidth="1.5" />
          </>
        )}
      </svg>
    </motion.div>
  );
}

export default function TechDecoratives() {
  return (
    <>
      <div className="fixed bottom-8 left-6 z-20 pointer-events-none">
        <GPSCoord />
      </div>

      <div className="fixed top-1/3 right-4 z-20 pointer-events-none w-80 h-48 overflow-hidden opacity-60">
        <ScrollingCode />
      </div>

      <div className="fixed left-0 top-0 z-20 pointer-events-none overflow-hidden w-36 h-36">
        <CornerGrid position="tl" />
      </div>
      <div className="fixed right-0 bottom-0 z-20 pointer-events-none overflow-hidden w-36 h-36">
        <CornerGrid position="br" />
      </div>

      <div className="fixed top-8 right-24 z-20 pointer-events-none">
        <motion.div
          className="flex items-center gap-1.5"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-1 h-1 rounded-full bg-[#00d4aa]" />
          <span className="font-mono text-[9px] text-white/20 tracking-widest">SYS.ONLINE</span>
        </motion.div>
      </div>

      <div className="fixed bottom-8 right-8 z-20 pointer-events-none">
        <motion.div
          className="font-mono text-[9px] text-white/15 tracking-widest"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <div>POLPO_AI_v2.0</div>
          <div className="text-[#bc13fe]/20">BUILD_2025.02</div>
        </motion.div>
      </div>
    </>
  );
}
