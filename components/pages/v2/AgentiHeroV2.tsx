'use client';

import { motion } from 'framer-motion';
import MagentaButton from '@/components/shared/v2/MagentaButton';
import Tentacle from '@/components/shared/v2/Tentacle';
import { Bot } from 'lucide-react';

const ease = [0.23, 1, 0.32, 1] as const;

export default function AgentiHeroV2() {
  return (
    <section className="relative min-h-[80vh] flex items-center px-8 pt-32 pb-24 overflow-hidden">
      <Tentacle
        style={{ top: 40, right: 0, width: 260, height: 340 }}
        viewBox="0 0 260 340"
        d="M 260 0 Q 100 90, 200 180 T 80 340"
        suckers={[{cx:170,cy:70},{cx:150,cy:160,r:3.5},{cx:160,cy:240},{cx:110,cy:310}]}
        color="#a78bfa"
      />
      <div className="max-w-[1100px] mx-auto w-full relative z-10">
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease }}>
          <span className="section-num-editorial block mb-6">— Agenti AI</span>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-violet-400 mb-7"
               style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)' }}>
            <Bot className="w-6 h-6" strokeWidth={1.4} />
          </div>
          <h1 className="font-display font-light leading-[0.95] tracking-[-0.025em] text-white text-balance"
              style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}>
            Un collega in più,<br/>che <em className="italic text-violet-400">non chiede ferie.</em>
          </h1>
          <p className="text-lg text-slate-400 leading-[1.6] max-w-[560px] mt-9 mb-10">
            Email triagiate, dati estratti, report generati. Un agente AI cucito attorno al tuo flusso — non un altro tool da imparare.
          </p>
          <div className="flex gap-3">
            <MagentaButton href="/#diario">Parliamone</MagentaButton>
            <MagentaButton href="#esempi" variant="outline" trailingArrow={false}>Casi reali</MagentaButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
