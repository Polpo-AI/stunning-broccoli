'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { CircleCheck as CheckCircle, Loader as Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CTASection() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ nome: '', email: '', messaggio: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.nome.trim()) e.nome = 'Il nome è obbligatorio';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email non valida';
    if (!form.messaggio.trim()) e.messaggio = 'Il messaggio è obbligatorio';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    if (!supabase) { setStatus('error'); return; }
    const { error } = await supabase.from('leads').insert([form]);
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ nome: '', email: '', messaggio: '' });
    }
  };

  return (
    <section id="contatti" className="relative py-28 md:py-36 bg-[var(--bg-surface)] border-t border-white/5">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left col — brand + copy */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="flex justify-center lg:justify-start mb-8"
              style={{ filter: 'drop-shadow(0 0 36px rgba(6,182,212,0.5))' }}
            >
              <Image
                src="/polpo.png"
                alt="PolpoAI mascot"
                width={140}
                height={140}
                className="object-contain select-none animate-float"
              />
            </div>

            <span className="section-label">Parliamo del tuo progetto</span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Fai lavorare il tuo business{' '}
              <span className="gradient-text">anche quando non ci sei.</span>
            </h2>
            <p className="section-subtitle max-w-sm mx-auto lg:mx-0">
              Raccontaci il tuo business. Ti mostriamo come l&apos;AI può aiutarti in modo concreto, senza impegno.
            </p>
          </motion.div>

          {/* Right col — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            {status === 'success' ? (
              <div className="rounded-2xl border border-cyan-500/25 bg-white/[0.03] p-10 flex flex-col items-center gap-4 text-center">
                <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Messaggio inviato!</h3>
                <p className="text-slate-400 text-sm">Ti contatteremo entro 24 ore.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 underline"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-xl p-8 flex flex-col gap-5 shadow-xl"
                noValidate
              >
                {/* Nome */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wide">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    placeholder="Il tuo nome"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all text-sm"
                  />
                  {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="nome@azienda.it"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all text-sm"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                {/* Messaggio */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wide">
                    Messaggio
                  </label>
                  <textarea
                    value={form.messaggio}
                    onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
                    placeholder="Raccontaci brevemente il tuo business e cosa ti serve..."
                    rows={4}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all text-sm resize-none"
                  />
                  {errors.messaggio && <p className="text-red-400 text-xs mt-1">{errors.messaggio}</p>}
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    Errore nell&apos;invio. Riprova tra qualche istante.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {status === 'loading' ? 'Invio in corso...' : 'Inizia ora — è gratuito'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
