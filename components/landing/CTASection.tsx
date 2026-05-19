'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Errore invio');
      setStatus('success');
      setForm({ nome: '', email: '', messaggio: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contatti" className="relative py-28 md:py-36 overflow-hidden">
      {/* No section-local orbs — bg unico dal layout */}

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

            <h2 className="h2-editorial mb-5">
              Fai lavorare il tuo business{' '}
              <em>anche quando non ci sei.</em>
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
              <div
                className="relative rounded-2xl border border-cyan-500/30 p-10 flex flex-col items-center gap-4 text-center overflow-hidden"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(20,28,55,0.92) 0%, rgba(14,21,46,0.96) 50%, rgba(11,17,40,0.98) 100%)',
                  backdropFilter: 'blur(20px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                  boxShadow:
                    '0 20px 60px -16px rgba(6,182,212,0.30), 0 10px 32px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.06) inset',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.20) 50%, transparent)' }}
                />
                <div className="w-14 h-14 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 12px rgba(0,0,0,0.3)' }}
                >
                  <CheckCircle className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Messaggio inviato!</h3>
                <p className="text-slate-300/85 text-sm">Ti contatteremo entro 24 ore.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm text-cyan-300 hover:text-cyan-200 underline"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative rounded-2xl border border-white/[0.10] p-8 flex flex-col gap-5 overflow-hidden"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(20,28,55,0.92) 0%, rgba(14,21,46,0.96) 50%, rgba(11,17,40,0.98) 100%)',
                  backdropFilter: 'blur(20px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                  boxShadow:
                    '0 20px 60px -16px rgba(0,0,0,0.6), 0 10px 32px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.06) inset',
                }}
                noValidate
              >
                {/* Highlight 3D superiore */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.20) 50%, transparent)' }}
                />
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
