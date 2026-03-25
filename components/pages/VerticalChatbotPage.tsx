'use client';

import { motion } from 'framer-motion';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SectionCTA from '@/components/shared/SectionCTA';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import WhatsAppMockup from '@/components/shared/WhatsAppMockup';
import { Target, CheckCircle2 } from 'lucide-react';
import { FadeUp, SectionHeader, staggerContainer, fadeUpVariants, staggerContainerFast } from '@/components/shared/animations';

export interface VerticalChatbotPageProps {
  settore: string;
  keyword: string;
  slug: string;
  problemi: string[];
  vantaggi: string[];
  faq: FAQItem[];
  emoji: string;
}

export default function VerticalChatbotPage({
  settore,
  keyword,
  slug,
  problemi,
  vantaggi,
  faq,
  emoji
}: VerticalChatbotPageProps) {

  const mockupMessages = [
    { id: '1', sender: 'user' as const, text: `Ciao, vorrei info per ${settore.toLowerCase()}`, delay: 0.5 },
    { id: '2', sender: 'bot' as const, text: 'Ciao! Certo, dimmi pure come posso aiutarti. Ti serve prenotare o avere info su orari/prezzi?', delay: 1.5 },
    { id: '3', sender: 'user' as const, text: 'Vorrei prenotare per due persone stasera', delay: 3.5 },
    { id: '4', sender: 'bot' as const, text: 'Ottimo. Per stasera ho disponibilità alle 19:30 o alle 21:00. Quale preferisci?', delay: 4.8 },
  ];

  return (
    <div className="bg-[#070B14] min-h-screen text-white">

      {/* BREADCRUMB */}
      <FadeUp className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Chatbot WhatsApp', href: '/chatbot-whatsapp-prenotazioni' },
          { label: settore }
        ]} />
      </FadeUp>

      {/* HERO */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.12),rgba(255,255,255,0))] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="relative z-10 text-center lg:text-left"
            >
              <motion.div
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-sm font-medium mb-6"
              >
                <span className="text-xl">{emoji}</span>
                Soluzione per {settore}
              </motion.div>

              <motion.h1
                variants={fadeUpVariants}
                className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight capitalize"
              >
                Il tuo{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                  Chatbot WhatsApp
                </span>{' '}
                per {settore.toLowerCase()}.
              </motion.h1>

              <motion.p
                variants={fadeUpVariants}
                className="text-lg text-slate-400 mb-10 leading-relaxed"
              >
                Risolvi i problemi tipici del tuo settore: niente più chiamate perse, {problemi[0]?.toLowerCase()} e {problemi[1]?.toLowerCase()}.
              </motion.p>

              <motion.ul
                variants={staggerContainerFast}
                className="flex flex-col gap-3.5 text-left mb-10"
              >
                {vantaggi.map((v, i) => (
                  <motion.li key={i} variants={fadeUpVariants} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-medium text-sm leading-relaxed">{v}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 mt-12 lg:mt-0 flex justify-center w-full"
            >
              <WhatsAppMockup messages={mockupMessages} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-24 bg-[#0A0F1C] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Il problema specifico del tuo settore</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Sappiamo quanto sia frustrante dover interrompere il lavoro ogni cinque minuti per rispondere sempre alle stesse domande.
            </p>
          </FadeUp>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {problemi.map((p, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                whileHover={{ y: -4, borderColor: 'rgba(239,68,68,0.3)' }}
                className="p-7 rounded-2xl bg-[#070B14] border border-red-500/10 transition-colors duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-10 h-10 mb-5"
                >
                  <Target className="w-10 h-10 text-red-400" />
                </motion.div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-red-300 transition-colors duration-200">{p}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Con l'intelligenza artificiale questo problema viene eliminato alla radice. Risposte automatiche, zero attese.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-3xl font-bold mb-10 text-center">Domande Comuni: {settore}</h2>
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
