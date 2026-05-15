'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarCheck, Users, Bell, RefreshCcw, AlarmClock,
  ArrowRight, CheckCircle2, X,
} from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import SectionCTA from '@/components/shared/SectionCTA';
import { FadeUp } from '@/components/shared/animations';
import WhatsAppMockup from '@/components/shared/WhatsAppMockup';
import CountUp from '@/components/shared/CountUp';

/* ─── WhatsApp Mockup ─── */
const waMessages = [
  { id: '1', sender: 'user' as const, text: 'Ciao! Vorrei prenotare un campo sabato alle 18 🎾', delay: 0.5 },
  { id: '2', sender: 'bot'  as const, text: '✅ Perfetto! Ho trovato disponibilità per sabato 5 aprile alle 18:00 sul Campo 2.\n💰 Costo: €14 a testa\n⏱ Durata: 90 min\n\nConfermi la prenotazione?', delay: 2.0 },
  { id: '3', sender: 'user' as const, text: 'Sì, confermo! Siamo solo in 2 però', delay: 4.5 },
  { id: '4', sender: 'bot'  as const, text: '🔍 Nessun problema! Sto cercando altri 2 giocatori del tuo livello disponibili sabato sera...\n\n👥 Ho trovato Marco e Giulia (livello 3.5 come te). Ti mando la conferma appena accettano!', delay: 6.5 },
  { id: '5', sender: 'bot'  as const, text: '🎉 Tutti e 4 confermati! La partita è fatta.\n📍 Campo 2 — Sabato 5 apr. ore 18:00\n👥 Tu, Luca, Marco, Giulia\n\nRiceverai un promemoria venerdì sera.', delay: 9.0 },
];

/* ─── Card glass 3D shared style ─── */
const cardStyle = {
  background:
    'linear-gradient(160deg, rgba(20,28,55,0.92) 0%, rgba(14,21,46,0.96) 50%, rgba(11,17,40,0.98) 100%)',
  backdropFilter: 'blur(20px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
  boxShadow:
    '0 10px 32px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.05) inset, 0 -1px 24px rgba(0,0,0,0.4) inset',
} as const;

/* ─── Features ─── */
const features = [
  {
    icon: CalendarCheck,
    color: 'text-emerald-400',
    iconBg: 'bg-emerald-500/12 border-emerald-500/25',
    numGradient: 'linear-gradient(135deg, rgba(52,211,153,0.50), rgba(52,211,153,0.18))',
    num: '01',
    title: 'Prenotazione campo istantanea',
    desc: 'Il giocatore scrive su WhatsApp quando vuole giocare — anche "sabato alle 18" in linguaggio naturale. Il bot controlla la disponibilità e prenota, inviando conferma con campo, orario e prezzo.',
  },
  {
    icon: Users,
    color: 'text-teal-400',
    iconBg: 'bg-teal-500/12 border-teal-500/25',
    numGradient: 'linear-gradient(135deg, rgba(45,212,191,0.50), rgba(45,212,191,0.18))',
    num: '02',
    title: 'Matchmaking automatico',
    desc: 'Se il gruppo è incompleto, il bot cerca altri giocatori compatibili per livello e disponibilità. Manda inviti automatici finché il campo è pieno — 4 giocatori, zero fatica.',
  },
  {
    icon: Bell,
    color: 'text-cyan-400',
    iconBg: 'bg-cyan-500/12 border-cyan-500/25',
    numGradient: 'linear-gradient(135deg, rgba(34,211,238,0.50), rgba(34,211,238,0.18))',
    num: '03',
    title: 'Inviti smart ai giocatori',
    desc: 'Gli altri giocatori ricevono un messaggio con chi c\'è già, il livello del gruppo e i dettagli della partita. Accettano o rifiutano con un semplice messaggio. Nessuna telefonata.',
  },
  {
    icon: RefreshCcw,
    color: 'text-indigo-400',
    iconBg: 'bg-indigo-500/12 border-indigo-500/25',
    numGradient: 'linear-gradient(135deg, rgba(129,140,248,0.50), rgba(129,140,248,0.18))',
    num: '04',
    title: 'Gestione disdette automatica',
    desc: 'Un giocatore cancella? Il bot trova un sostituto in automatico tra i disponibili del circolo. Lo staff non viene disturbato, la partita non salta.',
  },
  {
    icon: AlarmClock,
    color: 'text-amber-400',
    iconBg: 'bg-amber-500/12 border-amber-500/25',
    numGradient: 'linear-gradient(135deg, rgba(251,191,36,0.50), rgba(251,191,36,0.18))',
    num: '05',
    title: 'Promemoria il giorno prima',
    desc: 'La sera prima della partita tutti i giocatori confermati ricevono un promemoria automatico su WhatsApp. Zero no-show, campi sempre sfruttati.',
  },
];

/* ─── Before/After ─── */
const painVsGain = [
  { before: 'Gruppi WhatsApp caotici per trovare il quarto',  after: 'Il bot cerca il sostituto perfetto in automatico' },
  { before: 'Chiamate continue al desk per prenotare',         after: 'Prenotazione in 30 secondi via messaggio' },
  { before: 'Campi vuoti per disdette last minute',            after: 'Sostituto trovato e campo pieno sempre' },
  { before: 'Nessuno risponde e la partita non si fa',         after: 'Inviti automatici fino a campo completo' },
];

/* ─── Stats ─── */
const stats = [
  { value: '< 30s',  label: 'per prenotare un campo' },
  { value: '0',      label: 'chiamate al desk' },
  { value: '4/4',    label: 'giocatori trovati in automatico' },
  { value: '100%',   label: 'su WhatsApp, nessuna app' },
];

/* ─── FAQ ─── */
const faq: FAQItem[] = [
  { q: 'Si integra con Playtomic o Sportclubby?',                  a: 'Sì. Inseriamo il deep link diretto al tuo campo nel messaggio di conferma, così il pagamento avviene sulla piattaforma che già usi. Il bot si occupa del resto.' },
  { q: 'Posso gestire più campi contemporaneamente?',               a: 'Assolutamente. Il bot gestisce l\'intera disponibilità del circolo: campi multipli, fasce orarie diverse, prezzi differenziati per orario o tipo di campo.' },
  { q: 'Cosa succede se un giocatore non ha WhatsApp?',             a: 'Praticamente tutti i tuoi giocatori già lo usano. In ogni caso, il front desk resta operativo — il bot riduce le richieste del 70-80%, non le elimina del tutto.' },
  { q: 'Il bot capisce il linguaggio naturale?',                    a: 'Sì. Frasi come "stasera verso le 19" o "sabato pomeriggio" vengono interpretate correttamente dal bot, che chiede conferma prima di procedere.' },
  { q: 'Come viene gestita la privacy dei giocatori?',              a: 'I dati rimangono all\'interno del tuo sistema. Non vengono condivisi con terzi e rispettiamo pienamente il GDPR, con consenso esplicito alla prima interazione.' },
];

/* ─── Page ─── */
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

      {/* HERO */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/8 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                <span className="text-lg">🎾</span>
                Soluzione per Circoli Padel
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.06] tracking-[-0.025em] mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Il tuo circolo padel{' '}
                <span className="gradient-text-chatbot">sempre pieno</span>, senza stress.
              </h1>

              <p className="text-base sm:text-lg text-slate-300/85 leading-relaxed mb-8">
                Il bot gestisce prenotazioni, matchmaking e disdette interamente su WhatsApp.
                Nessuna app da scaricare. I tuoi giocatori scrivono un messaggio e la partita si organizza da sola.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'Prenotazione campo in 30 secondi',
                  'Matchmaking automatico per completare i 4',
                  'Sostituto trovato in caso di disdetta',
                  'Promemoria automatici il giorno prima',
                ].map((v, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 text-sm font-medium">{v}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/#contatti" className="btn-primary">
                  Prenota demo gratuita
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/chatbot-whatsapp-prenotazioni"
                  className="btn-outline"
                >
                  Vedi tutte le soluzioni
                </Link>
              </div>
            </motion.div>

            {/* Chat mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex justify-center w-full relative z-10 pointer-events-auto"
            >
              <WhatsAppMockup messages={waMessages} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-20 md:py-24 max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-12 md:mb-16">
          <span className="section-label">Come funziona</span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            5 funzioni, tutto su WhatsApp
          </h2>
          <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
            Dal messaggio del giocatore alla partita organizzata: il bot gestisce ogni step senza bisogno dello staff.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
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
              {/* Top highlight */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 50%, transparent)' }}
              />

              {/* Numero card 3D (gradient visibile) */}
              <span
                className="absolute top-5 right-5 text-3xl font-black select-none bg-clip-text text-transparent"
                style={{
                  backgroundImage: f.numGradient,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {f.num}
              </span>

              <div
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center mb-5 border ${f.iconBg}`}
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)' }}
              >
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-3 leading-tight pr-10">
                {f.title}
              </h3>
              <p className="text-slate-300/80 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}

          {/* Image card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative rounded-2xl overflow-hidden border border-white/[0.10] min-h-[200px] sm:min-h-[220px]"
            style={cardStyle}
          >
            <Image
              src="/padel-hero.png"
              alt="Campo da padel serale"
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1228] via-[#0B1228]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-white font-semibold text-base">Il campo si riempie da solo.</p>
              <p className="text-slate-300/80 text-xs mt-1">Tu ti godi il circolo, ci pensa il bot.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRIMA / DOPO */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp className="text-center mb-12 md:mb-14">
            <span className="section-label">Prima e dopo</span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Prima e dopo il bot
            </h2>
            <p className="text-base sm:text-lg text-slate-300/80">La differenza che senti ogni giorno al circolo.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before */}
            <div
              className="relative rounded-2xl border border-red-500/25 p-6 sm:p-7 overflow-hidden"
              style={cardStyle}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(244,63,94,0.4) 50%, transparent)' }}
              />
              <div className="flex items-center gap-2 mb-5">
                <X className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-bold text-xs sm:text-sm uppercase tracking-wider">Senza bot</span>
              </div>
              <ul className="flex flex-col gap-3 sm:gap-4">
                {painVsGain.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 shrink-0 mt-2" />
                    <span className="text-slate-300/80 text-sm leading-relaxed">{p.before}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div
              className="relative rounded-2xl border border-emerald-500/30 p-6 sm:p-7 overflow-hidden"
              style={cardStyle}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.5) 50%, transparent)' }}
              />
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-wider">Con il bot</span>
              </div>
              <ul className="flex flex-col gap-3 sm:gap-4">
                {painVsGain.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2 animate-pulse" />
                    <span className="text-slate-100 text-sm leading-relaxed">{p.after}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IMMAGINE ATMOSFERA */}
      <section className="relative h-[360px] md:h-[420px] overflow-hidden">
        <Image
          src="/padel-hero.png"
          alt="Atmosfera circolo padel"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1228] via-[#0B1228]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1228] via-transparent to-[#0B1228]" />
        <div className="relative h-full flex items-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-lg"
          >
            <p className="text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
              Il tuo circolo
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Un posto dove la partita si organizza mentre stai già in campo.
            </h2>
            <p className="text-slate-300/85 text-base sm:text-lg leading-relaxed">
              Giocatori amatoriali, persone diverse, livelli diversi — uniti da un messaggio WhatsApp.
              Questo è il circolo che i tuoi soci vogliono frequentare.
            </p>
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
            Domande frequenti
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <FAQAccordion items={faq} />
        </FadeUp>
      </section>

      {/* CTA */}
      <SectionCTA
        title="Vuoi vedere come funziona davvero?"
        subtitle="Ti mostriamo una demo live sul tuo circolo. Gratis, senza impegno, in 20 minuti."
        primaryLabel="Prenota la demo gratuita"
        primaryHref="/#contatti"
        secondaryLabel="Vedi altre soluzioni"
        secondaryHref="/chatbot-whatsapp-prenotazioni"
      />
    </div>
  );
}
