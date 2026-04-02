'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarCheck, Users, Bell, RefreshCcw, AlarmClock,
  ArrowRight, CheckCircle2, X
} from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import SectionCTA from '@/components/shared/SectionCTA';
import { FadeUp } from '@/components/shared/animations';
import WhatsAppMockup from '@/components/shared/WhatsAppMockup';

/* ─── WhatsApp Mockup ─── */
const waMessages = [
  { id: '1', sender: 'user' as const, text: 'Ciao! Vorrei prenotare un campo sabato alle 18 🎾', delay: 0.5 },
  { id: '2', sender: 'bot' as const,  text: '✅ Perfetto! Ho trovato disponibilità per sabato 5 aprile alle 18:00 sul Campo 2.\n💰 Costo: €14 a testa\n⏱ Durata: 90 min\n\nConfermi la prenotazione?', delay: 2.0 },
  { id: '3', sender: 'user' as const, text: 'Sì, confermo! Siamo solo in 2 però', delay: 4.5 },
  { id: '4', sender: 'bot' as const,  text: '🔍 Nessun problema! Sto cercando altri 2 giocatori del tuo livello disponibili sabato sera...\n\n👥 Ho trovato Marco e Giulia (livello 3.5 come te). Ti mando la conferma appena accettano!', delay: 6.5 },
  { id: '5', sender: 'bot' as const,  text: '🎉 Tutti e 4 confermati! La partita è fatta.\n📍 Campo 2 — Sabato 5 apr. ore 18:00\n👥 Tu, Luca, Marco, Giulia\n\nRiceverai un promemoria venerdì sera.', delay: 9.0 },
];

/* ─── Features ─── */
const features = [
  {
    icon: CalendarCheck,
    color: 'text-green-400',
    bg: 'bg-green-500/8 border-green-500/15',
    num: '01',
    title: 'Prenotazione campo istantanea',
    desc: 'Il giocatore scrive su WhatsApp quando vuole giocare — anche "sabato alle 18" in linguaggio naturale. Il bot controlla la disponibilità e prenota, inviando conferma con campo, orario e prezzo.',
  },
  {
    icon: Users,
    color: 'text-teal-400',
    bg: 'bg-teal-500/8 border-teal-500/15',
    num: '02',
    title: 'Matchmaking automatico',
    desc: 'Se il gruppo è incompleto, il bot cerca altri giocatori compatibili per livello e disponibilità. Manda inviti automatici finché il campo è pieno — 4 giocatori, zero fatica.',
  },
  {
    icon: Bell,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/8 border-cyan-500/15',
    num: '03',
    title: 'Inviti smart ai giocatori',
    desc: 'Gli altri giocatori ricevono un messaggio con chi c\'è già, il livello del gruppo e i dettagli della partita. Accettano o rifiutano con un semplice messaggio. Nessuna telefonata.',
  },
  {
    icon: RefreshCcw,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/8 border-indigo-500/15',
    num: '04',
    title: 'Gestione disdette automatica',
    desc: 'Un giocatore cancella? Il bot trova un sostituto in automatico tra i disponibili del circolo. Lo staff non viene disturbato, la partita non salta.',
  },
  {
    icon: AlarmClock,
    color: 'text-amber-400',
    bg: 'bg-amber-500/8 border-amber-500/15',
    num: '05',
    title: 'Promemoria il giorno prima',
    desc: 'La sera prima della partita tutti i giocatori confermati ricevono un promemoria automatico su WhatsApp. Zero no-show, campi sempre sfruttati.',
  },
];

/* ─── Before/After ─── */
const painVsGain = [
  { before: 'Gruppi WhatsApp caotici per trovare il quarto', after: 'Il bot cerca il sostituto perfetto in automatico' },
  { before: 'Chiamate continue al desk per prenotare', after: 'Prenotazione in 30 secondi via messaggio' },
  { before: 'Campi vuoti per disdette last minute', after: 'Sostituto trovato e campo pieno sempre' },
  { before: 'Nessuno risponde e la partita non si fa', after: 'Inviti automatici fino a campo completo' },
];

/* ─── Stats ─── */
const stats = [
  { value: '< 30s', label: 'per prenotare un campo' },
  { value: '0', label: 'chiamate al desk' },
  { value: '4/4', label: 'giocatori trovati in automatico' },
  { value: '100%', label: 'su WhatsApp, nessuna app' },
];

/* ─── FAQ ─── */
const faq: FAQItem[] = [
  { q: "Si integra con Playtomic o Sportclubby?", a: "Sì. Inseriamo il deep link diretto al tuo campo nel messaggio di conferma, così il pagamento avviene sulla piattaforma che già usi. Il bot si occupa del resto." },
  { q: "Posso gestire più campi contemporaneamente?", a: "Assolutamente. Il bot gestisce l'intera disponibilità del circolo: campi multipli, fasce orarie diverse, prezzi differenziati per orario o tipo di campo." },
  { q: "Cosa succede se un giocatore non ha WhatsApp?", a: "Praticamente tutti i tuoi giocatori già lo usano. In ogni caso, il front desk resta operativo — il bot riduce le richieste del 70-80%, non le elimina del tutto." },
  { q: "Il bot capisce il linguaggio naturale?", a: "Sì. Frasi come 'stasera verso le 19' o 'sabato pomeriggio' vengono interpretate correttamente dal bot, che chiede conferma prima di procedere." },
  { q: "Come viene gestita la privacy dei giocatori?", a: "I dati rimangono all'interno del tuo sistema. Non vengono condivisi con terzi e rispettiamo pienamente il GDPR, con consenso esplicito alla prima interazione." },
];

/* ─── Page ─── */
export default function PadelChatbotPage() {
  return (
    <div className="bg-[#070B14] min-h-screen text-white">

      {/* BREADCRUMB */}
      <FadeUp className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Chatbot WhatsApp', href: '/chatbot-whatsapp-prenotazioni' },
          { label: 'Padel' },
        ]} />
      </FadeUp>

      {/* ── HERO ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(34,197,94,0.07),transparent)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/25 bg-green-500/8 text-green-400 text-sm font-medium mb-6">
                <span className="text-xl">🎾</span>
                Soluzione per Circoli Padel
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.08] tracking-tight mb-6">
                Il tuo circolo padel{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                  sempre pieno
                </span>
                , senza stress.
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Il bot gestisce prenotazioni, matchmaking e disdette interamente su WhatsApp.
                Nessuna app da scaricare. I tuoi giocatori scrivono un messaggio e la partita si organizza da sola.
              </p>

              <ul className="flex flex-col gap-3 mb-10">
                {[
                  'Prenotazione campo in 30 secondi',
                  'Matchmaking automatico per completare i 4',
                  'Sostituto trovato in caso di disdetta',
                  'Promemoria automatici il giorno prima',
                ].map((v, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-slate-300 text-sm font-medium">{v}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/#contatti"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-green-500 text-[#070B14] font-bold text-sm shadow-lg shadow-green-500/30 hover:bg-green-400 transition-all duration-300"
                  >
                    Prenota demo gratuita <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/chatbot-whatsapp-prenotazioni"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-slate-300 font-medium text-sm hover:border-green-500/40 hover:text-green-400 transition-all duration-300"
                  >
                    Vedi tutte le soluzioni
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right — chat mockup */}
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

      {/* ── STATS ── */}
      <section className="border-y border-white/5 bg-[#0A0F1C] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold text-green-400 mb-1">{s.value}</div>
                <div className="text-slate-500 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-sm font-medium mb-5">
            Come funziona
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            5 funzioni, tutto su WhatsApp
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Dal messaggio del giocatore alla partita organizzata: il bot gestisce ogni step senza bisogno dello staff.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -4 }}
              className={`relative p-7 rounded-2xl border ${f.bg} transition-all duration-300 group`}
            >
              <span className="absolute top-5 right-5 text-4xl font-black opacity-5 group-hover:opacity-10 transition-opacity select-none">
                {f.num}
              </span>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${f.bg}`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-white font-bold text-lg mb-3 leading-tight">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}

          {/* Image card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative rounded-2xl overflow-hidden border border-white/8 min-h-[220px]"
          >
            <Image
              src="/padel-hero.png"
              alt="Campo da padel serale"
              fill
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-white font-semibold text-sm">Il campo si riempie da solo.</p>
              <p className="text-slate-400 text-xs mt-1">Tu ti godi il circolo, ci pensa il bot.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRIMA / DOPO ── */}
      <section className="py-24 bg-[#0A0F1C] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prima e dopo il bot</h2>
            <p className="text-slate-400 text-lg">La differenza che senti ogni giorno al circolo.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before */}
            <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-7">
              <div className="flex items-center gap-2 mb-6">
                <X className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Senza bot</span>
              </div>
              <ul className="flex flex-col gap-4">
                {painVsGain.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 shrink-0 mt-2" />
                    <span className="text-slate-400 text-sm leading-relaxed">{p.before}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.04] p-7">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-bold text-sm uppercase tracking-wider">Con il bot</span>
              </div>
              <ul className="flex flex-col gap-4">
                {painVsGain.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 mt-2 animate-pulse" />
                    <span className="text-slate-200 text-sm leading-relaxed">{p.after}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMMAGINE ATMOSFERA ── */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src="/padel-hero.png"
          alt="Atmosfera circolo padel"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]" />
        <div className="relative h-full flex items-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-lg"
          >
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-4">Il tuo circolo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Un posto dove la partita si organizza mentre stai già in campo.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Giocatori amatoriali, persone diverse, livelli diversi — uniti da un messaggio WhatsApp.
              Questo è il circolo che i tuoi soci vogliono frequentare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-3xl font-bold mb-10 text-center">Domande frequenti</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <FAQAccordion items={faq} />
        </FadeUp>
      </section>

      {/* ── CTA ── */}
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
