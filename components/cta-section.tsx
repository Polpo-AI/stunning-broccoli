'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, Zap, Shield, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LaserText from './effects/laser-text';

const EASE = [0.22, 1, 0.36, 1] as const;

function ElectricInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  textarea,
  rows,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [beamPos, setBeamPos] = useState(0);

  useEffect(() => {
    if (!focused) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) % 2000) / 2000;
      setBeamPos(t * 100);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [focused]);

  const sharedProps = {
    required,
    value,
    placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: 'w-full px-4 py-3.5 rounded-xl text-white text-sm focus:outline-none resize-none transition-all duration-200',
    style: {
      background: focused ? 'rgba(0,212,170,0.04)' : 'rgba(255,255,255,0.03)',
      border: 'none',
      color: 'rgba(255,255,255,0.85)',
    } as React.CSSProperties,
  };

  return (
    <div>
      <label
        className="block text-xs font-semibold uppercase tracking-widest mb-2"
        style={{
          color: focused ? '#00d4aa' : 'rgba(255,255,255,0.35)',
          transition: 'color 0.2s ease',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        {label}
      </label>
      <div className="relative rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            border: `1px solid ${focused ? 'rgba(0,212,170,0.45)' : 'rgba(255,255,255,0.07)'}`,
            transition: 'border-color 0.25s ease',
          }}
        />

        {focused && (
          <motion.div
            className="absolute top-0 bottom-0 w-8 pointer-events-none"
            style={{
              left: `${beamPos}%`,
              background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.15), transparent)',
            }}
          />
        )}

        {focused && (
          <>
            <motion.div
              className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, #00d4aa80, transparent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, #00a8ff60, transparent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            />
          </>
        )}

        {textarea ? (
          <textarea
            {...sharedProps}
            rows={rows || 4}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            {...sharedProps}
            type={type}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

function SuccessState() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const w = canvas.width;
    const h = canvas.height;

    const CHARS = '01アイウ<>/[]{}';
    const cols = Math.floor(w / 14);
    const drops = Array.from({ length: cols }, () => Math.random() * -30);
    let raf: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0,11,30,0.12)';
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < cols; i++) {
        ctx.fillStyle = i % 3 === 0 ? '#00d4aa' : '#00a8ff';
        ctx.font = '10px monospace';
        ctx.globalAlpha = 0.12;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * 14, drops[i] * 14);
        ctx.globalAlpha = 1;
        drops[i] += 0.5;
        if (drops[i] * 14 > h) drops[i] = -Math.random() * 10;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center gap-6 min-h-[400px]"
      style={{ border: '1px solid rgba(0,212,170,0.25)', background: 'rgba(0,11,30,0.9)' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 p-12">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.35)' }}
          animate={{ boxShadow: ['0 0 0px rgba(0,212,170,0)', '0 0 30px rgba(0,212,170,0.4)', '0 0 0px rgba(0,212,170,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CheckCircle size={32} style={{ color: '#00d4aa' }} />
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Messaggio ricevuto!
        </motion.h3>
        <motion.p
          className="text-white/50 leading-relaxed max-w-xs mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Ti risponderemo entro 24 ore con una proposta personalizzata.
        </motion.p>

        <motion.div
          className="mt-6 font-mono text-xs tracking-widest"
          style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono, monospace' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          TRANSMISSION_COMPLETE ✓
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const LOADING_STEPS = ['Cifratura dati...', 'Instradamento sicuro...', 'Consegna in corso...'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < LOADING_STEPS.length) setLoadingStep(step);
      else {
        clearInterval(interval);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 300);
      }
    }, 380);
  };

  const CHECKLIST = [
    { icon: CheckCircle, text: 'Analisi gratuita del tuo business' },
    { icon: Clock, text: 'Strategia personalizzata in 48h' },
    { icon: Shield, text: 'Nessun impegno, massima trasparenza' },
  ];

  return (
    <section id="contatti" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#00d4aa] opacity-[0.03] blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.p
                className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
                style={{ color: '#00d4aa', fontFamily: 'JetBrains Mono, monospace' }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Inizia Oggi
              </motion.p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-white block">
                  <LaserText charDelay={0.04} scanColor="#00d4aa">
                    Pronto ad attivare
                  </LaserText>
                </span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #00d4aa 0%, #00a8ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  il tuo sistema
                </span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #00d4aa 0%, #00a8ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  nervoso digitale?
                </span>
              </h2>

              <p className="text-white/55 text-base leading-relaxed mb-10">
                Parliamo del tuo business. In 30 minuti ti mostriamo come
                costruire un'architettura AI che lavora per te — 24 ore su 24,
                7 giorni su 7.
              </p>

              <div className="space-y-4">
                {CHECKLIST.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'rgba(0,212,170,0.1)',
                          border: '1px solid rgba(0,212,170,0.3)',
                        }}
                        whileHover={{ scale: 1.2, boxShadow: '0 0 12px rgba(0,212,170,0.4)' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                      </motion.div>
                      <span className="text-white/65 text-sm">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Contatti diretti
                </p>
                <motion.a
                  href="mailto:info@polpo-ai.com"
                  className="text-sm font-medium relative inline-block"
                  style={{ color: '#00d4aa' }}
                  whileHover={{ x: 4 }}
                >
                  info@polpo-ai.com
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-px"
                    style={{ background: '#00d4aa' }}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              </div>
            </div>

            <div>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessState key="success" />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="relative rounded-3xl p-8 space-y-5"
                    style={{
                      background: 'rgba(0,11,30,0.85)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-x-0 top-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.5), transparent)' }}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <ElectricInput
                      label="Nome e Cognome"
                      placeholder="Mario Rossi"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      required
                    />
                    <ElectricInput
                      label="Email"
                      type="email"
                      placeholder="mario@azienda.it"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                    />
                    <ElectricInput
                      label="Il tuo Business"
                      placeholder="Raccontaci del tuo business e cosa vuoi automatizzare..."
                      value={form.message}
                      onChange={(v) => setForm({ ...form, message: v })}
                      required
                      textarea
                      rows={4}
                    />

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base relative overflow-hidden"
                      style={{ background: '#00d4aa', color: '#000b1e' }}
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                      <motion.span
                        className="absolute inset-0 -skew-x-12"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                        animate={!loading ? { x: ['-150%', '250%'] } : {}}
                        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                      />
                      <span className="relative flex items-center gap-2">
                        {loading ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 rounded-full"
                              style={{ borderColor: 'rgba(0,11,30,0.3)', borderTopColor: '#000b1e' }}
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                            />
                            <span
                              className="font-mono text-sm"
                              style={{ fontFamily: 'JetBrains Mono, monospace' }}
                            >
                              {LOADING_STEPS[loadingStep]}
                            </span>
                          </>
                        ) : (
                          <>
                            Invia il messaggio
                            <Send size={16} />
                          </>
                        )}
                      </span>
                    </motion.button>

                    <p
                      className="text-center text-xs"
                      style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      Dati cifrati · Nessuno spam · TLS 1.3
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
