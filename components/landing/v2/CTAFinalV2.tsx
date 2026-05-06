'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  heading: React.ReactNode;
  subheading?: string;
  placeholder?: string;
  ctaLabel?: string;
}

export default function CTAFinalV2({
  heading,
  subheading = "Mandaci un'email — risponde una persona, non un bot. (Ironico, vero?)",
  placeholder = 'la-tua-email@cosa-fai-bene.it',
  ctaLabel = 'Scriviamoci',
}: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [email, setEmail] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    setTimeout(() => setState('sent'), 800);
  };

  return (
    <section id="diario" className="relative z-10 px-8 py-36 max-w-[1320px] mx-auto text-center">
      <motion.h2
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="font-display font-light leading-[0.92] tracking-[-0.03em] text-white mb-7 text-balance"
        style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}
      >
        {heading}
      </motion.h2>
      <p className="text-lg text-slate-400 leading-[1.55] max-w-[540px] mx-auto mb-10">{subheading}</p>
      <form onSubmit={submit} className="flex gap-2 max-w-[520px] mx-auto p-1.5 rounded-full backdrop-blur-md focus-within:border-magenta/40"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-5 py-3.5 text-[15px] bg-transparent border-0 text-white outline-none placeholder:text-slate-600"
        />
        <button
          type="submit"
          disabled={state !== 'idle'}
          className="px-6 py-3.5 rounded-full text-white font-semibold text-sm inline-flex items-center gap-2 disabled:opacity-80"
          style={{ background: 'linear-gradient(135deg, #ff3d8a, #ff5b9e)' }}
        >
          {state === 'idle' && (<>{ctaLabel} <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} /></>)}
          {state === 'sending' && (<><Loader2 className="w-3.5 h-3.5 animate-spin" /> Invio…</>)}
          {state === 'sent' && (<><CheckCircle2 className="w-3.5 h-3.5" /> Inviato!</>)}
        </button>
      </form>
    </section>
  );
}
