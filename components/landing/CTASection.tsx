'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { CircleCheck as CheckCircle, Loader as Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ nome: '', email: '', messaggio: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // ── 2. SMOOTHING (SPRING PHYSICS) ────────────────────────────────────────────
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothScroll, [0, 0.2, 0.5, 0.8, 1], [0, 0.4, 1, 0.4, 0]);
  const decorOpacity = useTransform(smoothScroll, [0, 0.3, 0.5, 0.7, 1], [0, 0.4, 1, 0.4, 0]);

  // Layering Parallax
  const contentY = useTransform(smoothScroll, [0, 0.2, 0.8, 1], [50, 0, 0, -40]);
  const bgY = useTransform(smoothScroll, [0, 1], ["0%", "15%"]); // Slower background
  const decorY = useTransform(smoothScroll, [0, 1], ["0%", "-10%"]); // Faster decorative

  const revealMask = useTransform(smoothScroll, [0, 0.35], [100, 0]);
  const blur = useTransform(smoothScroll, [0, 0.25], [8, 0]);
  const bgScale = useTransform(smoothScroll, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  const maskStyle = useTransform(revealMask, (v) =>
    `linear-gradient(to top, black ${100 - v}%, transparent ${110 - v}%)`
  );
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

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
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('loading');

    if (!supabase) {
      console.error('Supabase client not initialized');
      setStatus('error');
      return;
    }

    const { error } = await supabase.from('leads').insert([form]);
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ nome: '', email: '', messaggio: '' });
    }

  };

  return (
    <section ref={containerRef} id="contatti" className="relative py-40 md:py-64 bg-[#070B14] overflow-hidden">
      {/* Layer 1: Background Aura */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.02) 0%, transparent 70%)',
          opacity: decorOpacity,
          scale: bgScale,
          y: bgY
        }}
      />

      {/* Layer 2: Decorative Accent */}
      <motion.div
        className="absolute top-0 right-0 w-full h-full pointer-events-none z-10 opacity-10"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
          y: decorY,
          filter: 'blur(50px)'
        }}
      />

      {/* Layer 3: Content */}
      <motion.div
        style={{
          opacity,
          y: contentY,
          WebkitMaskImage: maskStyle,
          maskImage: maskStyle,
          filter: blurFilter,
          willChange: 'opacity, transform, mask-image, filter',
          transform: 'translateZ(0)'
        }}
        className="relative z-20 max-w-5xl mx-auto px-6"
      >
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex justify-center lg:justify-start mb-8"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(6, 182, 212, 0.5))',
                animation: 'float 4s ease-in-out infinite',
              }}
            >
              <Image
                src="/polpo.png"
                alt="PolpoAI mascot"
                width={180}
                height={180}
                className="object-contain select-none"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-8"
            >
              Fai lavorare il tuo business{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
                }}
              >
                anche quando non ci sei.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 leading-relaxed text-xl max-w-md mx-auto lg:mx-0 opacity-80"
            >
              Raccontaci il tuo business. Ti mostriamo come l&apos;AI può aiutarti in modo concreto, senza impegno.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {status === 'success' ? (
              <div className="rounded-2xl border border-cyan-500/20 bg-white/[0.03] p-10 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Messaggio inviato!</h3>
                <p className="text-slate-400 text-sm">
                  Ti contatteremo il prima possibile. Di solito rispondiamo entro 24 ore.
                </p>
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
                className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 flex flex-col gap-6 shadow-2xl"
              >
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
                  className="w-full py-4 rounded-xl font-bold text-[#070B14] bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                  {status === 'loading' ? 'Invio in corso...' : 'Inizia ora'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
