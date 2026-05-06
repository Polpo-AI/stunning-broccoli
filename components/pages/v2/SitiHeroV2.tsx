'use client';

import { motion } from 'framer-motion';
import MagentaButton from '@/components/shared/v2/MagentaButton';
import Tentacle from '@/components/shared/v2/Tentacle';
import { Globe } from 'lucide-react';

const ease = [0.23, 1, 0.32, 1] as const;

export default function SitiHeroV2() {
  return (
    <section className="relative min-h-[80vh] flex items-center px-8 pt-32 pb-24 overflow-hidden">
      <Tentacle
        style={{ bottom: 0, left: -30, width: 240, height: 320 }}
        viewBox="0 0 240 320"
        d="M 0 0 Q 180 80, 80 180 T 200 320"
        suckers={[{cx:140,cy:60},{cx:120,cy:140,r:3},{cx:130,cy:230}]}
        color="#22d3ee"
      />
      <div className="max-w-[1100px] mx-auto w-full relative z-10">
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease }}>
          <span className="section-num-editorial block mb-6">— Siti web</span>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-cyan-400 mb-7"
               style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.25)' }}>
            <Globe className="w-6 h-6" strokeWidth={1.4} />
          </div>
          <h1 className="font-display font-light leading-[0.95] tracking-[-0.025em] text-white text-balance"
              style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}>
            Una <em className="italic text-cyan-400">vetrina</em><br/>che lavora<br/>mentre dormi.
          </h1>
          <p className="text-lg text-slate-400 leading-[1.6] max-w-[560px] mt-9 mb-10">
            Siti veloci, mobile-first, indicizzati su Google. In meno di 30 giorni online — con i contenuti scritti insieme.
          </p>
          <div className="flex gap-3">
            <MagentaButton href="/v2#diario">Parliamone</MagentaButton>
            <MagentaButton href="#portfolio" variant="outline" trailingArrow={false}>Vedi i lavori</MagentaButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
