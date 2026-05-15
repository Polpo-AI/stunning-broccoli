'use client';

import { motion } from 'framer-motion';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SectionCTA from '@/components/shared/SectionCTA';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import WhatsAppMockup from '@/components/shared/WhatsAppMockup';
import { Target, CheckCircle2 } from 'lucide-react';
import { FadeUp, staggerContainer, fadeUpVariants, staggerContainerFast } from '@/components/shared/animations';

export interface VerticalChatbotPageProps {
  settore: string;
  keyword: string;
  slug: string;
  problemi: string[];
  vantaggi: string[];
  faq: FAQItem[];
  emoji: string;
}

// Stile glass card 3D condiviso
const cardStyle = {
  background:
    'linear-gradient(160deg, rgba(20,28,55,0.92) 0%, rgba(14,21,46,0.96) 50%, rgba(11,17,40,0.98) 100%)',
  backdropFilter: 'blur(20px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
  boxShadow:
    '0 10px 32px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.05) inset, 0 -1px 24px rgba(0,0,0,0.4) inset',
} as const;

export default function VerticalChatbotPage({
  settore,
  problemi,
  vantaggi,
  faq,
  emoji,
}: VerticalChatbotPageProps) {
  const mockupMessages = [
    { id: '1', sender: 'user' as const, text: `Ciao, vorrei info per ${settore.toLowerCase()}`, delay: 0.5 },
    { id: '2', sender: 'bot'  as const, text: 'Ciao! Certo, dimmi pure come posso aiutarti. Ti serve prenotare o avere info su orari/prezzi?', delay: 1.5 },
    { id: '3', sender: 'user' as const, text: 'Vorrei prenotare per due persone stasera', delay: 3.5 },
    { id: '4', sender: 'bot'  as const, text: 'Ottimo. Per stasera ho disponibilità alle 19:30 o alle 21:00. Quale preferisci?', delay: 4.8 },
  ];

  return (
    <div className="min-h-screen">
      {/* BREADCRUMB */}
      <FadeUp className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Chatbot WhatsApp', href: '/chatbot-whatsapp-prenotazioni' },
            { label: settore },
          ]}
        />
      </FadeUp>

      {/* HERO */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="relative z-10 text-center lg:text-left"
            >
              <motion.div
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/8 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-sm"
              >
                <span className="text-lg">{emoji}</span>
                Soluzione per {settore}
              </motion.div>

              <motion.h1
                variants={fadeUpVariants}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-[-0.02em] leading-[1.08] capitalize"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Il tuo{' '}
                <span className="gradient-text-chatbot">Chatbot WhatsApp</span>{' '}
                per {settore.toLowerCase()}.
              </motion.h1>

              <motion.p
                variants={fadeUpVariants}
                className="text-base sm:text-lg text-slate-300/85 mb-8 leading-relaxed"
              >
                Risolvi i problemi tipici del tuo settore: niente più chiamate perse,{' '}
                {problemi[0]?.toLowerCase()} e {problemi[1]?.toLowerCase()}.
              </motion.p>

              <motion.ul
                variants={staggerContainerFast}
                className="flex flex-col gap-3 text-left mb-8"
              >
                {vantaggi.map((v, i) => (
                  <motion.li key={i} variants={fadeUpVariants} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200 font-medium text-sm leading-relaxed">{v}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 mt-4 lg:mt-0 flex justify-center w-full"
            >
              <WhatsAppMockup messages={mockupMessages} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-12 md:mb-14">
            <span className="section-label">Pain points</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Il problema specifico del tuo settore
            </h2>
            <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
              Sappiamo quanto sia frustrante dover interrompere il lavoro ogni cinque minuti per rispondere sempre alle stesse domande.
            </p>
          </FadeUp>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {problemi.map((p, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                whileHover={{ y: -6 }}
                className="relative p-6 sm:p-7 rounded-2xl border border-white/[0.10] transition-all duration-300 group overflow-hidden"
                style={cardStyle}
              >
                {/* Top highlight */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 50%, transparent)' }}
                />
                {/* Numero card 3D (più visibile) */}
                <span
                  className="absolute top-5 right-5 text-3xl font-black select-none bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgba(244,63,94,0.55), rgba(244,63,94,0.18))',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border border-red-500/20 bg-red-500/10"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)' }}
                >
                  <Target className="w-5 h-5 text-red-400" />
                </motion.div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 leading-tight pr-10">
                  {p}
                </h3>
                <p className="text-slate-300/80 leading-relaxed text-sm">
                  Con l&apos;intelligenza artificiale questo problema viene eliminato alla radice. Risposte automatiche, zero attese.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 text-center tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Domande Comuni: {settore}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <FAQAccordion items={faq} />
        </FadeUp>
      </section>

      <SectionCTA
        title="Vuoi vedere come funziona?"
        subtitle={`Scopri come un Chatbot su WhatsApp può rivoluzionare il settore ${settore}.`}
        primaryLabel="Prenota la demo gratuita"
        primaryHref="/#contatti"
        secondaryLabel="Torna alle soluzioni"
        secondaryHref="/chatbot-whatsapp-prenotazioni"
      />
    </div>
  );
}
