'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Transition } from 'framer-motion';
import { Globe, MessageSquare, Bot, X } from 'lucide-react';

const springTransition: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 35,
  mass: 1
};

// --- DATA ---
const services = [
  {
    id: 'siti-web',
    icon: Globe,
    kicker: 'ONLINE IN POCHI GIORNI.',
    title: 'Creazione siti web',
    desc: 'Ti costruiamo un sito veloce, ottimizzato per Google e pronto a convertire visitatori in clienti. Ci occupiamo di tutto — tu pensi al business.',
    target: 'Professionisti, PMI, attività locali',
    examples: 'Landing contatti, sito vetrina, pagina prenotazione call, FAQ/testimonianze',
    benefits: 'Più richieste, sito veloce, SEO base, design coerente',
    deliverables: 'Sito responsive, SEO base, form contatti/WhatsApp/Calendly',
    color: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/40',
    glow: 'rgba(6, 182, 212, 0.15)',
    iconColor: 'text-cyan-400',
  },
  {
    id: 'chatbot',
    icon: MessageSquare,
    kicker: 'RISPONDE 24/7, CATTURA CONTATTI.',
    title: 'Chatbot personalizzati',
    desc: 'Un assistente virtuale che conosce il tuo business, risponde ai clienti in tempo reale e raccoglie contatti anche di notte.',
    target: 'Chi riceve domande frequenti, e-commerce/servizi, team piccoli',
    examples: 'FAQ automatiche, raccolta lead, supporto prezzi/orari, pre-qualifica clienti',
    benefits: 'Risposte immediate, più lead, meno lavoro ripetitivo, esperienza cliente migliore',
    color: 'from-teal-500/10 to-cyan-500/10',
    borderColor: 'border-teal-500/40',
    glow: 'rgba(20, 184, 166, 0.15)',
    iconColor: 'text-teal-400',
  },
  {
    id: 'agenti-ai',
    icon: Bot,
    kicker: 'AUTOMATIZZA IL LAVORO RIPETITIVO.',
    title: 'Agenti AI su misura',
    desc: 'Attività che fai ogni giorno diventano automatiche. Email, report, gestione dati — il tuo AI agent lavora mentre tu ti concentri su altro.',
    target: 'Chi fa report/email/gestione dati, processi ripetitivi',
    examples: 'Report automatici, email follow-up, aggiornamento CRM, estrazione dati da file',
    benefits: 'Risparmio tempo, meno errori, processi standard, scalabilità',
    color: 'from-blue-500/10 to-cyan-500/10',
    borderColor: 'border-blue-500/40',
    glow: 'rgba(59, 130, 246, 0.15)',
    iconColor: 'text-blue-400',
  },
];

export default function ServicesSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Selected service object
  const selectedService = services.find((s) => s.id === selectedId);

  // --- HOOKS: Scroll Lock & ESC Key ---
  useEffect(() => {
    // Scroll Lock
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Modal behavior: ESC to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = ''; // Cleanup
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId]);

  return (
    <section id="servizi" className="relative py-24 bg-[#070B14]">
      {/* Background Decor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase opacity-80">
            I nostri servizi
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Cosa facciamo per te.
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">
            Tre soluzioni concrete. Tutte su misura. Tutte con un obiettivo: farti risparmiare tempo e guadagnare di più.
          </p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {services.map((s) => {
            const Icon = s.icon;

            return (
              <motion.div
                layoutId={`card-container-${s.id}`}
                transition={springTransition}
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`group relative rounded-2xl border border-white/5 bg-gradient-to-br ${s.color} p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:${s.borderColor}`}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${s.glow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
                // Disable reduced motion layout anims if user prefers
                layout={prefersReducedMotion ? false : true}
              >
                <motion.div layoutId={`card-icon-${s.id}`} transition={springTransition} className="mb-6 inline-flex items-center justify-center w-13 h-13 rounded-xl">
                  <Icon className={`w-8 h-8 ${s.iconColor}`} strokeWidth={1.5} />
                </motion.div>

                <motion.div layoutId={`card-kicker-${s.id}`} transition={springTransition} className="mb-1">
                  <span className={`text-xs font-semibold ${s.iconColor} opacity-70 tracking-wide uppercase`}>
                    {s.kicker}
                  </span>
                </motion.div>

                <motion.h3 layoutId={`card-title-${s.id}`} transition={springTransition} className="text-xl font-bold text-white mb-3">
                  {s.title}
                </motion.h3>

                <motion.p layoutId={`card-desc-${s.id}`} transition={springTransition} className="text-slate-400 leading-relaxed text-sm mb-6">
                  {s.desc}
                </motion.p>

                <motion.div layoutId={`card-cta-dummy-${s.id}`} transition={springTransition} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Scopri i dettagli
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- EXPANDED MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedId && selectedService && (
          // CONTENITORE PRINCIPALE (Fixed full screen wrapper)
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto"
            // Role & Aria for A11y
            role="dialog"
            aria-modal="true"
            aria-labelledby={`dialog-title-${selectedService.id}`}
          >
            {/* BACKDROP (Dim + Blur) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#070B14]/80 backdrop-blur-sm"
              // Cliccando il backdrop su desktop si chiude
              onClick={() => setSelectedId(null)}
            />

            {/* EXPANDED CARD */}
            <motion.div
              layoutId={`card-container-${selectedService.id}`}
              transition={springTransition}
              className={`
                relative z-[110] bg-[#0A0F1C] border border-white/10 
                shadow-2xl overflow-hidden flex flex-col
                
                /* MOBILE: Modal Full Screen con safe areas */
                w-full h-full rounded-none
                pt-[env(safe-area-inset-top,16px)] pb-[env(safe-area-inset-bottom,16px)]
                
                /* DESKTOP/TABLET: Dialog centrata */
                md:w-[90vw] md:max-w-3xl md:h-[85vh] md:max-h-[85vh] md:rounded-2xl
              `}
              layout={prefersReducedMotion ? false : true}
              {...(prefersReducedMotion ? {
                initial: { opacity: 0, y: 50 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, scale: 0.95 }
              } : {})}
              // Fermiamo il click per evitare che chiuda se propaga al backdrop
              onClick={(e) => e.stopPropagation()}
            >

              {/* TOP BAR FIXA (Bottone Chiudi) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="flex-none sticky top-0 right-0 z-[120] flex justify-end p-4 md:p-6 bg-gradient-to-b from-[#0A0F1C] to-transparent pointer-events-none"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  autoFocus
                  className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg active:scale-95"
                  aria-label="Chiudi finestra"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>

              {/* CONTENUTO SCROLLABILE */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain px-6 pb-20 md:px-10 md:pb-12 pt-4 md:pt-0"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="max-w-2xl mx-auto md:mx-0">

                  {/* Icon & Intro */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div layoutId={`card-icon-${selectedService.id}`} transition={springTransition} className="mt-1 flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#070B14] border border-white/5">
                      <selectedService.icon className={`w-7 h-7 ${selectedService.iconColor}`} strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <motion.div layoutId={`card-kicker-${selectedService.id}`} transition={springTransition} className="mb-1">
                        <span className={`text-xs font-semibold ${selectedService.iconColor} opacity-70 tracking-wide uppercase`}>
                          {selectedService.kicker}
                        </span>
                      </motion.div>
                      <motion.h3 layoutId={`card-title-${selectedService.id}`} transition={springTransition} id={`dialog-title-${selectedService.id}`} className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                        {selectedService.title}
                      </motion.h3>
                    </div>
                  </div>

                  <motion.p layoutId={`card-desc-${selectedService.id}`} transition={springTransition} className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10">
                    {selectedService.desc}
                  </motion.p>

                  {/* Details Grid: Compaiono con Fade-In quando la card è aperta */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5, transition: { duration: 0.15 } }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 border-t border-white/5 pt-8"
                  >
                    {/* Per chi è */}
                    <div>
                      <h4 className="text-sm font-semibold tracking-widest text-[#818cf8] uppercase mb-3">
                        Per chi è
                      </h4>
                      <p className="text-slate-200 leading-relaxed font-medium">
                        {selectedService.target}
                      </p>
                    </div>

                    {/* Vantaggi concreti */}
                    <div>
                      <h4 className="text-sm font-semibold tracking-widest text-[#34d399] uppercase mb-3">
                        Vantaggi concreti
                      </h4>
                      <p className="text-slate-200 leading-relaxed font-medium">
                        {selectedService.benefits}
                      </p>
                    </div>

                    {/* Esempi tipici */}
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">
                        Esempi tipici
                      </h4>
                      <p className="text-slate-200 leading-relaxed">
                        {selectedService.examples}
                      </p>
                    </div>

                    {/* Cosa consegniamo (Opzionale, renderizzato se c'è) */}
                    {selectedService.deliverables && (
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold tracking-widest text-amber-400 uppercase mb-3">
                          Cosa consegniamo
                        </h4>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                          <p className="text-slate-200 leading-relaxed">
                            {selectedService.deliverables}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* CTA interno chiudi (Solo per dare una exit route comoda da mobile se scrolli fondo) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 flex justify-center md:justify-start"
                  >
                    <button
                      onClick={() => setSelectedId(null)}
                      className="px-8 py-3 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      Chiudi dettagli
                    </button>
                  </motion.div>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
