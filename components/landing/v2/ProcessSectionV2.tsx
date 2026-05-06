'use client';

import { motion } from 'framer-motion';
import Tentacle from '@/components/shared/v2/Tentacle';

const ease = [0.23, 1, 0.32, 1] as const;

const steps = [
  { i: 'i.',   color: '#ff3d8a', border: 'rgba(255,61,138,0.40)', title: <>Si <em>ascolta.</em></>,    body: 'Una call di 30 minuti. Capiamo cosa stai facendo a mano e cosa vorresti smettere di fare.', dur: '— 1 settimana' },
  { i: 'ii.',  color: '#22d3ee', border: 'rgba(6,182,212,0.40)',  title: <>Si <em>costruisce.</em></>, body: 'Disegniamo, scriviamo, integriamo. Una versione alla volta, con te a bordo.',                  dur: '— 2–3 settimane' },
  { i: 'iii.', color: '#ffb547', border: 'rgba(255,181,71,0.40)', title: <>Si <em>vive.</em></>,       body: "Lanciamo, monitoriamo, miglioriamo. Quando qualcosa serve, c'è un umano che risponde.",       dur: '— per sempre' },
];

export default function ProcessSectionV2() {
  return (
    <section id="studio" className="relative z-10 py-32 bg-[#0A0F1C] border-y border-white/[0.06] overflow-hidden">
      <Tentacle
        style={{ top: -20, right: 0, width: 200, height: 280 }}
        viewBox="0 0 200 280"
        d="M 200 0 Q 80 80, 160 160 T 60 280"
        suckers={[{cx:140,cy:60},{cx:120,cy:125,r:3},{cx:115,cy:200}]}
      />
      <div className="max-w-[1320px] mx-auto px-8 pb-16">
        <span className="section-num-editorial block mb-4">— Cap. 03 / Metodo</span>
        <h2 className="h2-editorial max-w-[800px]">Dal primo caffè<br/>al <em className="text-magenta">go-live.</em></h2>
      </div>
      <div className="max-w-[1320px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 relative">
        <div className="hidden md:block absolute top-[60px] left-[12%] right-[12%] h-px"
             style={{ background: 'linear-gradient(90deg, transparent, rgba(255,61,138,0.4), rgba(6,182,212,0.4), transparent)' }} />
        {steps.map((s, idx) => (
          <motion.div
            key={s.i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: idx * 0.1 }}
            className="px-6 flex flex-col items-start"
          >
            <div className="w-30 h-30 rounded-full flex items-center justify-center font-display text-[56px] font-light italic mb-7 relative z-10"
                 style={{ width: 120, height: 120, background: '#070B14', border: `1px solid ${s.border}`, color: s.color }}>
              {s.i}
            </div>
            <h3 className="h3-editorial mb-2.5">{s.title}</h3>
            <p className="text-sm text-slate-400 leading-[1.65] max-w-[320px]">{s.body}</p>
            <div className="inline-flex items-center gap-1.5 mt-3.5 text-[11px] text-slate-500 font-display italic">{s.dur}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
