'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, X, MessageCircle, Brain, Users, LayoutDashboard,
  Smartphone, Clock, UserPlus, ListChecks, BarChart3, ShieldCheck, Sparkles,
  MessageSquare,
} from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import SectionCTA from '@/components/shared/SectionCTA';
import { FadeUp } from '@/components/shared/animations';
import WhatsAppMockup from '@/components/shared/WhatsAppMockup';
import CountUp from '@/components/shared/CountUp';

/* ─── WhatsApp conversation — partita matching ─── */
const waMessages = [
  { id: '1', sender: 'user' as const, text: 'Ciao, cerco una partita sabato sera. Livello 3.5 🎾', delay: 0.5 },
  {
    id: '2', sender: 'bot' as const,
    text:
      'Ciao! Ho due opzioni per sabato sera:\n\n• 18:30 — Campo 2, mancano 2 giocatori del tuo livello\n• 21:00 — Campo 1, partita completa con 3 conferme\n\nA quale ti aggiungo?',
    delay: 2.0,
  },
  { id: '3', sender: 'user' as const, text: 'Mettimi nella 18:30, vengo con un amico', delay: 5.0 },
  {
    id: '4', sender: 'bot' as const,
    text:
      '✅ Siete dentro. Cerco gli altri 2 giocatori compatibili e ti aggiorno appena confermano.',
    delay: 7.0,
  },
  {
    id: '5', sender: 'bot' as const,
    text:
      '🎉 Partita completa! Marco e Giulia (livello 3.5) hanno confermato.\n📍 Campo 2 — Sabato ore 18:30\nPromemoria venerdì sera.',
    delay: 10.0,
  },
];

/* ─── Shared card style ─── */
const cardStyle = {
  background: 'linear-gradient(160deg, var(--bg-raised) 0%, var(--bg-surface) 100%)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)',
} as const;

const topHighlight = {
  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 50%, transparent)',
} as const;

/* ─── COME FUNZIONA — 4 step ─── */
const steps = [
  {
    icon: MessageCircle,
    color: 'text-emerald-400',
    iconBg: 'bg-emerald-500/12 border-emerald-500/25',
    numColor: 'rgba(52,211,153,0.50)',
    num: '01',
    title: 'Il giocatore scrive su WhatsApp',
    desc:
      'Il giocatore contatta il numero WhatsApp Business del circolo per cercare una partita, chiedere disponibilità o proporsi per un determinato giorno e livello.',
  },
  {
    icon: Brain,
    color: 'text-teal-400',
    iconBg: 'bg-teal-500/12 border-teal-500/25',
    numColor: 'rgba(45,212,191,0.50)',
    num: '02',
    title: 'Il bot capisce la richiesta',
    desc:
      'L\'assistente raccoglie le informazioni utili: giorno, orario, livello, preferenze e disponibilità del giocatore.',
  },
  {
    icon: Users,
    color: 'text-cyan-400',
    iconBg: 'bg-cyan-500/12 border-cyan-500/25',
    numColor: 'rgba(34,211,238,0.50)',
    num: '03',
    title: 'Il sistema propone o crea una partita',
    desc:
      'Se esiste una partita compatibile, il bot la propone al giocatore. Se manca un giocatore, può invitare profili compatibili. Se non ci sono partite disponibili, può inserirlo in lista d\'attesa.',
  },
  {
    icon: LayoutDashboard,
    color: 'text-indigo-400',
    iconBg: 'bg-indigo-500/12 border-indigo-500/25',
    numColor: 'rgba(129,140,248,0.50)',
    num: '04',
    title: 'La dashboard si aggiorna',
    desc:
      'La segreteria vede partite aperte, giocatori iscritti, richieste ricevute, liste d\'attesa e stato delle conferme da una dashboard semplice e operativa.',
  },
];

/* ─── PUNTI DI FORZA — 7 punti ─── */
const strengths = [
  {
    icon: Smartphone,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/25',
    title: 'WhatsApp Business del circolo',
    desc:
      'Il giocatore scrive al numero ufficiale del circolo, senza scaricare nuove app e senza cambiare abitudini.',
  },
  {
    icon: Clock,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/25',
    title: 'Automatizza il lavoro della segreteria',
    desc:
      'Il bot svolge le attività ripetitive: raccoglie richieste, invia inviti, gestisce conferme e aggiorna lo stato delle partite.',
  },
  {
    icon: Users,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/25',
    title: 'Matching per livello e disponibilità',
    desc:
      'Il sistema può suggerire giocatori compatibili in base a livello, disponibilità e preferenze operative del circolo.',
  },
  {
    icon: UserPlus,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/25',
    title: 'Gestione dei posti mancanti',
    desc:
      'Quando manca il quarto giocatore, il bot può contattare profili compatibili e raccogliere le risposte al posto della segreteria.',
  },
  {
    icon: ListChecks,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/25',
    title: 'Liste d\'attesa intelligenti',
    desc:
      'Se non ci sono partite disponibili, il giocatore può essere inserito in lista d\'attesa e ricontattato quando si libera un posto compatibile.',
  },
  {
    icon: LayoutDashboard,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/25',
    title: 'Dashboard operativa',
    desc:
      'Il circolo mantiene sempre il controllo: può creare, modificare e monitorare partite, giocatori, richieste e conferme.',
  },
  {
    icon: BarChart3,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/25',
    title: 'Report del valore generato',
    desc:
      'Il sistema può mostrare quante richieste sono state gestite, quante partite sono state completate e quanto lavoro manuale è stato ridotto.',
  },
];

/* ─── CONFRONTO ─── */
const comparison: { feature: string; manual: string; polpo: string }[] = [
  {
    feature: 'Ricerca giocatori',
    manual: 'La segreteria scrive a più persone una alla volta.',
    polpo: 'Il bot invita profili compatibili in automatico o su indicazione del circolo.',
  },
  {
    feature: 'Richieste dei giocatori',
    manual: 'Sparse tra chat, gruppi e telefonate.',
    polpo: 'Raccolte e organizzate nella dashboard.',
  },
  {
    feature: 'Liste d\'attesa',
    manual: 'Gestite a memoria o su note separate.',
    polpo: 'Strutturate per giorno, orario e livello.',
  },
  {
    feature: 'Conferme',
    manual: 'Da controllare conversazione per conversazione.',
    polpo: 'Raccolte e aggiornate nel sistema.',
  },
  {
    feature: 'Controllo della segreteria',
    manual: 'Dipende dalla persona di turno.',
    polpo: 'Dashboard condivisa e sempre aggiornata.',
  },
];

/* ─── DASHBOARD features ─── */
const dashboardFeatures = [
  'Creazione e modifica partite',
  'Stato dei posti disponibili',
  'Giocatori iscritti',
  'Richieste arrivate da WhatsApp',
  'Lista d\'attesa per giorno e livello',
  'Suggerimenti di giocatori compatibili',
  'Storico e note giocatore',
  'Stato delle conferme',
  'Report mensile del valore generato',
];

/* ─── BENEFICI ─── */
const benefits = [
  {
    icon: Clock,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/12 border-emerald-500/25',
    title: 'Riduci il lavoro manuale',
    desc: 'La segreteria non deve più rincorrere ogni giocatore uno per uno.',
  },
  {
    icon: MessageSquare,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/12 border-cyan-500/25',
    title: 'Rispondi più velocemente',
    desc: 'Il bot può gestire le richieste anche quando il desk è occupato.',
  },
  {
    icon: Sparkles,
    color: 'text-violet-400',
    bg: 'bg-violet-500/12 border-violet-500/25',
    title: 'Non perdi opportunità',
    desc: 'Ogni richiesta può essere raccolta, classificata e trasformata in una possibile partita.',
  },
  {
    icon: ShieldCheck,
    color: 'text-amber-400',
    bg: 'bg-amber-500/12 border-amber-500/25',
    title: 'Mantieni il controllo',
    desc: 'Il circolo decide regole, livelli, disponibilità e modalità operative.',
  },
];

/* ─── STATS rapide ─── */
const stats = [
  { value: '< 30s', label: 'per gestire una richiesta in chat' },
  { value: '24/7',  label: 'finestra di risposta del bot' },
  { value: '1', label: 'dashboard unica per la segreteria' },
  { value: '0', label: 'app da scaricare per i giocatori' },
];

/* ─── FAQ ─── */
const faq: FAQItem[] = [
  {
    q: 'Il bot sostituisce la segreteria?',
    a: 'No. Il bot automatizza le attività ripetitive: raccoglie richieste, invita giocatori compatibili e gestisce conferme. La segreteria mantiene sempre il controllo tramite dashboard.',
  },
  {
    q: 'Il giocatore deve scaricare un\'app?',
    a: 'No. Il giocatore usa WhatsApp, scrivendo al numero WhatsApp Business del circolo.',
  },
  {
    q: 'Il sistema può creare nuove partite?',
    a: 'Sì. Il sistema può supportare la creazione di partite e aiutare a completarle invitando giocatori compatibili.',
  },
  {
    q: 'Come vengono scelti i giocatori da invitare?',
    a: 'Il sistema considera livello, disponibilità, preferenze e regole definite dal circolo.',
  },
  {
    q: 'Cosa succede se non ci sono partite disponibili?',
    a: 'Il giocatore può essere inserito in lista d\'attesa e ricontattato quando si libera un posto o viene creata una partita compatibile.',
  },
  {
    q: 'Il circolo può intervenire manualmente?',
    a: 'Sì. La dashboard permette alla segreteria di creare, modificare e supervisionare partite, richieste e giocatori.',
  },
  {
    q: 'Si integra con gestionali esistenti?',
    a: 'Il servizio nasce per funzionare anche senza integrazioni con gestionali esterni. Eventuali integrazioni possono essere valutate in base alle esigenze del circolo.',
  },
  {
    q: 'Il bot usa il WhatsApp del circolo?',
    a: 'Sì. Il servizio è pensato per lavorare con il WhatsApp Business del circolo, così il giocatore continua a comunicare con il numero ufficiale della struttura.',
  },
  {
    q: 'È adatto anche a piccoli circoli?',
    a: 'Sì. È pensato soprattutto per circoli che vogliono organizzare meglio le partite senza adottare un gestionale complesso.',
  },
];

/* ============================================================================
   PAGE
   ============================================================================ */
export default function PadelChatbotPage() {
  return (
    <div className="min-h-screen">
      {/* BREADCRUMB */}
      <FadeUp className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Chatbot WhatsApp', href: '/chatbot-whatsapp-prenotazioni' },
            { label: 'Padel' },
          ]}
        />
      </FadeUp>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. HERO                                                       */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT — copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="eyebrow-chatbot mb-6">
                🎾 Assistente WhatsApp per circoli padel
              </span>

              <h1 className="h1-editorial is-padel mt-6 mb-6">
                Il tuo <em>assistente WhatsApp</em><br />
                per gestire le partite di padel.
              </h1>

              <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed mb-8">
                Risponde ai giocatori, raccoglie disponibilità, propone partite compatibili
                e aiuta la segreteria a chiudere i posti mancanti — tutto dal{' '}
                <span className="text-white font-medium">WhatsApp Business del circolo</span>.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'Risponde 24/7 anche quando il desk è occupato',
                  'Invita giocatori compatibili al posto della segreteria',
                  'Organizza richieste, conferme e liste d\'attesa',
                  'La segreteria mantiene il controllo dalla dashboard',
                ].map((v, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 text-sm font-medium">{v}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/#contatti" className="btn-primary">
                  Richiedi una demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#come-funziona" className="btn-outline">
                  Scopri come funziona
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — WhatsApp mockup (animazione conversazione esistente) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center w-full relative z-10 pointer-events-auto"
            >
              <WhatsAppMockup messages={waMessages} />
              <p className="text-slate-400 text-xs sm:text-sm text-center mt-5 max-w-[280px] italic leading-relaxed">
                Una conversazione semplice per il giocatore. Una gestione ordinata per il circolo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. PROBLEMA                                                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp className="text-center mb-10">
            <span className="section-label">Il problema</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Il problema non è solo prenotare il campo.{' '}
              <span className="gradient-text-chatbot">È completare la partita.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300/85 leading-relaxed">
              Molti circoli gestiscono ancora le partite tramite WhatsApp, telefonate, gruppi e
              messaggi manuali. Quando manca un giocatore, la segreteria deve cercare profili
              compatibili, scrivere a più persone, attendere risposte, confermare la presenza e
              tenere tutto aggiornato.
            </p>
            <p className="text-base sm:text-lg text-white font-medium mt-5">
              Il nostro assistente automatizza proprio questo lavoro ripetitivo.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div
              className="relative rounded-2xl border border-white/[0.10] p-6 sm:p-8 mt-8 overflow-hidden"
              style={cardStyle}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={topHighlight} />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Meno messaggi manuali da inviare',
                  'Meno caos nei gruppi WhatsApp',
                  'Richieste dei giocatori più ordinate',
                  'Partite incomplete più facili da gestire',
                  'Segreteria sempre in controllo tramite dashboard',
                ].map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. COME FUNZIONA — 4 step                                     */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="come-funziona" className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-12 md:mb-16">
            <span className="section-label">Come funziona</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Dal messaggio del giocatore alla partita completata
            </h2>
            <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
              Quattro passaggi. Nessun intervento manuale ripetitivo per la segreteria.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6 }}
                className="relative p-6 sm:p-7 rounded-2xl border border-white/[0.10] transition-all duration-300 group overflow-hidden"
                style={cardStyle}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={topHighlight} />
                <span
                  className="absolute top-5 right-5 text-3xl font-black select-none"
                  style={{ color: s.numColor, fontFamily: 'var(--font-display)' }}
                >
                  {s.num}
                </span>
                <div
                  className={`relative w-11 h-11 rounded-xl flex items-center justify-center mb-5 border ${s.iconBg}`}
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)' }}
                >
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-3 leading-tight pr-10">
                  {s.title}
                </h3>
                <p className="text-slate-300/85 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 4. PUNTI DI FORZA — 7                                         */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-12 md:mb-16">
            <span className="section-label">Punti di forza</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Perché è diverso da un semplice chatbot
            </h2>
            <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
              Non è un gestionale generico né un altro tool da imparare. È un assistente WhatsApp
              che vive sul numero ufficiale del tuo circolo.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6 }}
                className="relative p-6 rounded-2xl border border-white/[0.10] transition-all duration-300 group overflow-hidden"
                style={cardStyle}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={topHighlight} />
                <div
                  className={`relative w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${s.bg}`}
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)' }}
                >
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2.5 leading-tight">
                  {s.title}
                </h3>
                <p className="text-slate-300/80 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5. CONFRONTO                                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp className="text-center mb-12">
            <span className="section-label">Confronto</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Non sostituisce il tuo modo di lavorare.{' '}
              <span className="gradient-text-chatbot">Lo rende più efficiente.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
              Il servizio è pensato per chi vuole mantenere il rapporto diretto con i giocatori
              tramite WhatsApp, ma con più ordine, automazione e controllo.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div
              className="relative rounded-2xl border border-white/[0.10] overflow-hidden"
              style={cardStyle}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={topHighlight} />

              {/* Header row */}
              <div className="hidden sm:grid grid-cols-[1.2fr_1.4fr_1.4fr] gap-px bg-white/[0.06]">
                <div className="px-5 py-4 bg-[#0B1228]">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Attività</span>
                </div>
                <div className="px-5 py-4 bg-[#0B1228]">
                  <span className="text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <X className="w-3.5 h-3.5" /> Gestione manuale WhatsApp
                  </span>
                </div>
                <div className="px-5 py-4 bg-[#0B1228]">
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Assistente WhatsApp PolpoAI
                  </span>
                </div>
              </div>

              {/* Rows */}
              <div className="flex flex-col">
                {comparison.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 sm:grid-cols-[1.2fr_1.4fr_1.4fr] gap-px bg-white/[0.06] border-t border-white/[0.06]"
                  >
                    <div className="px-5 py-4 sm:py-5 bg-[#0B1228]">
                      <span className="text-white font-bold text-sm">{row.feature}</span>
                    </div>
                    <div className="px-5 py-4 sm:py-5 bg-[#0B1228]">
                      <span className="text-xs uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5 mb-2 sm:hidden">
                        <X className="w-3.5 h-3.5" /> Manuale
                      </span>
                      <p className="text-slate-300/80 text-sm leading-relaxed">{row.manual}</p>
                    </div>
                    <div className="px-5 py-4 sm:py-5 bg-[#0B1228]">
                      <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5 mb-2 sm:hidden">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Con PolpoAI
                      </span>
                      <p className="text-slate-100 text-sm leading-relaxed">{row.polpo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 6. DASHBOARD                                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <FadeUp>
              <span className="section-label">Dashboard</span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-5 tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Tutto sotto controllo da una{' '}
                <span className="gradient-text-chatbot">dashboard semplice</span>.
              </h2>
              <p className="text-base sm:text-lg text-slate-300/85 leading-relaxed mb-8">
                La dashboard permette al circolo di gestire manualmente le partite e
                supervisionare il lavoro del bot. Niente formazione, niente complessità: solo
                quello che serve per organizzare meglio il lavoro.
              </p>
              <ul className="grid grid-cols-1 gap-2.5">
                {dashboardFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span className="text-slate-200 text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Mockup dashboard semplificato */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="relative rounded-2xl border border-white/[0.10] p-5 sm:p-6 overflow-hidden"
              style={cardStyle}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={topHighlight} />

              {/* Dashboard "browser" header */}
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.06]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                <span className="text-slate-400 text-xs ml-3 font-mono">dashboard.polpo-ai.com</span>
              </div>

              {/* Stat row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { v: '12', l: 'Partite oggi', c: 'text-emerald-400' },
                  { v: '4', l: 'Posti mancanti', c: 'text-amber-400' },
                  { v: '8', l: 'In attesa', c: 'text-cyan-400' },
                ].map((s, i) => (
                  <div key={i} className="rounded-lg p-3 bg-white/[0.03] border border-white/[0.06]">
                    <div className={`text-2xl font-extrabold ${s.c}`} style={{ fontFamily: 'var(--font-display)' }}>
                      {s.v}
                    </div>
                    <div className="text-slate-400 text-[10px] uppercase tracking-wide mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Match rows */}
              <div className="flex flex-col gap-2.5">
                {[
                  { time: 'Sab 18:30 — Campo 2', status: '3/4', statusColor: 'text-amber-400', tag: 'Cerca 1 giocatore', tagBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30' },
                  { time: 'Sab 21:00 — Campo 1', status: '4/4', statusColor: 'text-emerald-400', tag: 'Completa', tagBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' },
                  { time: 'Dom 10:00 — Campo 3', status: '2/4', statusColor: 'text-cyan-400', tag: 'In raccolta', tagBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-white/[0.025] border border-white/[0.06]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`text-base font-bold ${m.statusColor} shrink-0`}>{m.status}</div>
                      <div className="text-slate-300 text-xs truncate">{m.time}</div>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border ${m.tagBg} shrink-0`}>
                      {m.tag}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 7. BENEFICI — 4 card                                          */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-12 md:mb-14">
            <span className="section-label">Benefici concreti</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Meno tempo su WhatsApp.{' '}
              <span className="gradient-text-chatbot">Più partite organizzate.</span>
            </h2>
          </FadeUp>

          {/* Stats */}
          <FadeUp delay={0.1} className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="text-center"
                >
                  <div
                    className="text-2xl sm:text-3xl font-extrabold gradient-text-chatbot mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <CountUp delay={i * 100}>{s.value}</CountUp>
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="relative p-6 rounded-2xl border border-white/[0.10] transition-all duration-300 group overflow-hidden"
                style={cardStyle}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={topHighlight} />
                <div
                  className={`relative w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${b.bg}`}
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)' }}
                >
                  <b.icon className={`w-5 h-5 ${b.color}`} />
                </div>
                <h3 className="text-white font-bold text-base mb-2 leading-tight">{b.title}</h3>
                <p className="text-slate-300/80 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 8. FAQ                                                        */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 text-center tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Domande frequenti
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <FAQAccordion items={faq} />
        </FadeUp>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 9. CTA FINALE                                                 */}
      {/* ════════════════════════════════════════════════════════════ */}
      <SectionCTA
        title="Vuoi ridurre il tempo speso a gestire partite su WhatsApp?"
        subtitle="Ti mostriamo un esempio pratico sul flusso reale del tuo circolo. Demo gratuita, senza impegno, in 20 minuti."
        primaryLabel="Richiedi una demo"
        primaryHref="/#contatti"
        secondaryLabel="Vedi altre soluzioni"
        secondaryHref="/chatbot-whatsapp-prenotazioni"
      />
    </div>
  );
}
