'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import MagentaButton from '@/components/shared/v2/MagentaButton';
import Tentacle from '@/components/shared/v2/Tentacle';

const ease = [0.23, 1, 0.32, 1] as const;

interface Props {
  industryEmoji?: string;
  industryLabel?: string;
  title: React.ReactNode;
  body: string;
  ctaLabel?: string;
}

export default function ChatbotHeroV2({ industryEmoji, industryLabel, title, body, ctaLabel = 'Prova in 2 minuti' }: Props) {
  return (
    <section className="relative min-h-[88vh] flex items-center px-8 pt-32 pb-24 overflow-hidden">
      <Tentacle
        style={{ top: 60, right: -40, width: 280, height: 360 }}
        viewBox="0 0 280 360"
        d="M 280 20 Q 120 100, 220 200 T 80 360"
        suckers={[{cx:200,cy:80},{cx:160,cy:160,r:3.5},{cx:170,cy:240},{cx:120,cy:310,r:3}]}
        color="#ff3d8a"
      />
      <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center relative z-10">
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease }}>
          {industryLabel && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.1em] uppercase mb-7"
                  style={{ background: 'rgba(255,61,138,0.10)', border: '1px solid rgba(255,61,138,0.25)', color: '#ff7eb0' }}>
              {industryEmoji} {industryLabel}
            </span>
          )}
          <h1 className="font-display font-light leading-[0.95] tracking-[-0.025em] text-white text-balance"
              style={{ fontSize: 'clamp(44px, 5.5vw, 84px)' }}>
            {title}
          </h1>
          <p className="text-lg text-slate-400 leading-[1.6] max-w-[480px] mt-7 mb-10">{body}</p>
          <div className="flex gap-3">
            <MagentaButton href="#diario">{ctaLabel}</MagentaButton>
            <MagentaButton href="#esempi" variant="outline" trailingArrow={false}>Vedi un esempio</MagentaButton>
          </div>
        </motion.div>
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease, delay: 0.1 }}
                    className="relative justify-self-center">
          <div className="absolute inset-0 -z-10 blur-[60px] opacity-40 rounded-full"
               style={{ background: 'radial-gradient(circle, #ff3d8a, transparent 65%)' }} />
          <Image src="/padel-phone.png" alt="" width={320} height={640} className="drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
