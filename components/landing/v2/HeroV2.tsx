'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Tentacle from '@/components/shared/v2/Tentacle';

const ease = [0.23, 1, 0.32, 1] as const;

export default function HeroV2() {
  return (
    <section className="relative px-8 pt-16 pb-32 z-10 max-w-[1320px] mx-auto">
      <Tentacle
        variant="warm"
        style={{ top: -40, right: '8%', width: 240, height: 320 }}
        viewBox="0 0 240 320"
        d="M 120 0 Q 180 80, 100 140 T 140 320"
        suckers={[{cx:135,cy:60,r:3},{cx:118,cy:115},{cx:105,cy:180,r:3},{cx:125,cy:240}]}
      />
      <Tentacle
        style={{ bottom: 80, left: -40, width: 280, height: 200 }}
        viewBox="0 0 280 200"
        d="M 0 100 Q 80 60, 140 110 T 280 80"
        suckers={[{cx:60,cy:92},{cx:120,cy:98,r:3},{cx:180,cy:100},{cx:230,cy:92,r:3}]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-end">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          className="pt-12"
        >
          <span className="eyebrow-warm mb-7">In ascolto · oggi disponibili</span>
          <h1 className="h1-editorial mb-8">
            Lavoriamo<br/>
            <em>al posto tuo,</em><br/>
            <span className="underline-mark">anche di notte.</span>
          </h1>
          <p className="text-[19px] text-slate-400 leading-[1.55] max-w-[520px] mb-11">
            Siti, chatbot e agenti su misura per <strong className="text-white font-medium">artigiani digitali</strong> che hanno smesso di rispondere al telefono — e iniziato a rispondere ai clienti.
          </p>
          <div className="flex gap-3.5 items-center">
            <Link href="/contatti" className="btn-magenta">
              Prenotiamo una call <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
            </Link>
            <Link href="/#casi" className="px-6 py-4 text-[15px] font-medium text-slate-400 underline underline-offset-[6px] decoration-white/20 inline-flex items-center gap-2">
              Vedi i casi <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="relative h-[540px] flex items-center justify-center"
        >
          <div className="absolute w-[380px] h-[380px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 65%)', filter: 'blur(20px)' }} />
          <div className="absolute w-[280px] h-[280px] top-[20%] -right-[10%] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,61,138,0.15) 0%, transparent 65%)', filter: 'blur(20px)' }} />
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 0.8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <Image
              src="/polpo.png"
              alt="Polpo mascot"
              width={420}
              height={420}
              priority
              style={{ filter: 'drop-shadow(0 0 40px rgba(6,182,212,0.5)) drop-shadow(0 0 12px rgba(6,182,212,0.3))' }}
            />
          </motion.div>
          <div className="absolute top-[8%] -left-[8%] inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium text-white" style={{ background: 'rgba(13,21,37,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-pulse-magenta" style={{ boxShadow: '0 0 8px #ff3d8a' }} />
            3 prenotazioni nelle ultime 2h
          </div>
        </motion.div>
      </div>

      <div className="mt-24 pt-12 border-t border-white/10 grid grid-cols-3 gap-8">
        {[
          { num: <><em>24</em><span className="text-[28px] align-super opacity-60 font-normal font-sans">/7</span></>, lbl: 'sempre operativo, sempre vigile, mai in ferie', emColor: 'cyan' },
          { num: <><em>&lt;3</em><span className="text-[28px] align-super opacity-60 font-normal font-sans">s</span></>, lbl: 'tempo medio di risposta sui canali integrati', emColor: 'magenta' },
          { num: <><em>0</em></>, lbl: 'contatti persi nelle ore in cui ti riposi', emColor: 'cyan' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            className="flex flex-col gap-2"
          >
            <div className={`font-display text-[96px] font-light leading-[0.9] tracking-[-0.04em] text-white ${s.emColor === 'magenta' ? '[&_em]:text-magenta' : '[&_em]:text-cyan-400'} [&_em]:italic [&_em]:font-normal`}>
              {s.num}
            </div>
            <div className="text-[13px] text-slate-500 leading-[1.5] max-w-[240px]">{s.lbl}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
