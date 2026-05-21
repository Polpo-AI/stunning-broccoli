'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Scale,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ChevronRight,
  ChevronDown,
  Briefcase,
  Users,
  Target,
  Search,
  FileText,
  Handshake,
  TrendingUp,
  Plus,
  Minus,
  Calendar,
} from 'lucide-react';
import MagneticButton from '@/components/portfolio/MagneticButton';
import CountUp from '@/components/portfolio/CountUp';

/* ─── Sito Avv. Giulia Bianchi · NUOVO ───────────────────────────
   Stile: corporate premium moderno. Navy + gold accent. Geist/Inter. */

const MAIL_SUBJECT =
  'Mi interessa un sito tipo Avv. Giulia Bianchi (esempio libero professionista)';
const MAIL_HREF = `mailto:info@polpo-ai.com?subject=${MAIL_SUBJECT}`;

const expertise = [
  {
    icon: Scale,
    title: 'Diritto Civile',
    desc: 'Contratti, obbligazioni, responsabilità civile. Difesa in giudizio e consulenza preventiva.',
  },
  {
    icon: Briefcase,
    title: 'Diritto Commerciale',
    desc: 'Società, contratti commerciali, M&A, governance. Accanto a imprenditori e startup.',
  },
  {
    icon: Users,
    title: 'Diritto del Lavoro',
    desc: 'Assistenza ad aziende e professionisti su contratti, controversie e ristrutturazioni.',
  },
];

const news = [
  {
    date: '12 Nov 2024',
    cat: 'Aggiornamento',
    title: 'Riforma del Codice della Crisi: cosa cambia per le PMI',
    desc: 'Le novità del D.Lgs. 136/2024 e l\'impatto sulle procedure di allerta precoce.',
  },
  {
    date: '28 Ott 2024',
    cat: 'Caso studio',
    title: 'Risoluzione di vertenza in materia di subfornitura',
    desc: 'Negoziazione assistita conclusa in 45 giorni con recupero integrale del credito.',
  },
  {
    date: '5 Ott 2024',
    cat: 'Pubblicazione',
    title: 'Smart working e tutela del lavoratore: i nuovi confini',
    desc: 'Articolo pubblicato su Diritto del Lavoro Online · Wolters Kluwer.',
  },
];

const stats: { value: number; suffix: string; label: string }[] = [
  { value: 15, suffix: '+', label: 'anni di esperienza' },
  { value: 300, suffix: '+', label: 'clienti assistiti' },
  { value: 92, suffix: '%', label: 'cause vinte in primo grado' },
];

const caseStudies = [
  {
    sector: 'Diritto Commerciale',
    problem: 'PMI alimentare con credito non riscosso da grande distribuzione (€280k, 14 mesi di ritardo).',
    approach: 'Diffida + Negoziazione assistita con interventi su clausole di pagamento. Mediazione obbligatoria.',
    result: 'Recupero del 95% (€266k) in 47 giorni · accordo transattivo + nuove clausole anti-ritardo.',
    metric: '47gg',
    metricLabel: 'risoluzione',
  },
  {
    sector: 'Diritto del Lavoro',
    problem: 'Startup tech a rischio ristrutturazione: 18 dipendenti + 4 dirigenti su contratti misti.',
    approach: 'Audit contrattuale completo + ridefinizione organigramma + accordi individuali su modifica mansioni.',
    result: 'Zero vertenze · risparmio €120k annui · 3 dimissioni concordate + 15 contratti ridefiniti.',
    metric: '€120k',
    metricLabel: 'risparmiati/anno',
  },
  {
    sector: 'Diritto Civile',
    problem: 'Imprenditore con responsabilità da prodotto difettoso · richiesta danni €450k.',
    approach: 'Tecnica defensive: CTU contrattacco + responsabilità solidale fornitore + transazione su tetto.',
    result: 'Transazione a €68k vs €450k richiesti · zero pubblicità negativa · fornitore copre 60%.',
    metric: '−85%',
    metricLabel: 'esposizione',
  },
];

const processSteps = [
  { num: '01', icon: Calendar, title: 'Primo incontro gratuito', desc: '30 minuti, di persona o in videocall. Mi racconti la situazione, ti dico se posso aiutarti.', time: 'Entro 48h' },
  { num: '02', icon: Search, title: 'Analisi del caso', desc: 'Studio documenti, normative, giurisprudenza. Ti scrivo un report con scenari e probabilità.', time: '3-7 giorni' },
  { num: '03', icon: FileText, title: 'Proposta scritta', desc: 'Strategia, tempi, costi. Mandato chiaro, fatturazione trasparente. Niente sorprese.', time: '24h' },
  { num: '04', icon: Handshake, title: 'Implementazione', desc: 'Esecuzione della strategia. Sono io il referente unico. Aggiornamenti settimanali via email.', time: 'Variabile' },
  { num: '05', icon: TrendingUp, title: 'Follow-up', desc: 'Dopo la chiusura: consulenza preventiva 12 mesi inclusa. Stai tranquillo, ci sono io.', time: '12 mesi' },
];

const faqs = [
  { q: 'Quanto costa una consulenza?', a: 'Il primo incontro è sempre gratuito (30 min). Da lì stabiliamo il preventivo: parcella oraria €180/h oppure forfait per pratiche standard. Tutto sempre per iscritto, mai sorprese in fattura.' },
  { q: 'In quanto tempo mi rispondi?', a: 'Email entro 24h (di solito molto meno). WhatsApp/SMS solo per urgenze concrete entro 2h in orario d\'ufficio. Una volta presa in carico la pratica, aggiornamenti settimanali.' },
  { q: 'Lavori solo a Milano?', a: 'Lo studio è a Milano centro ma seguo clienti in tutta Italia in materia commerciale e civile. Per cause attive in giudizio fuori regione mi appoggio a colleghi di fiducia (sempre dichiarato).' },
  { q: 'Posso pagare a rate?', a: 'Sì. Per pratiche oltre €3.000 propongo sempre piani di rateizzazione 3-6-12 mesi senza interessi. Anteprima del piano sempre nel mandato iniziale.' },
  { q: 'Lavori con privati o solo aziende?', a: 'Entrambi, ma con focus diverso. Per i privati: famiglia, lavoro, responsabilità civile. Per le aziende: contratti, governance, recupero crediti, lavoro. Niente penale.' },
  { q: 'Cosa succede se perdo la causa?', a: 'Te lo dico prima. Nell\'analisi iniziale stimo probabilità di esito e costi attesi: se è meno del 60% di vittoria sconsiglio o propongo conciliazione. Vinco il 92% delle cause perché scelgo bene quali prendere.' },
];

const publications = [
  'Wolters Kluwer',
  'Il Sole 24 Ore',
  'Diritto del Lavoro Online',
  'Diritto.it',
  'Altalex',
  'Camera Civile Milano',
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: '#E2E8F0' }}>
      <button
        onClick={onToggle}
        className="w-full text-left py-5 sm:py-6 flex items-start justify-between gap-4 group"
        aria-expanded={isOpen}
      >
        <h3 className="text-base sm:text-lg font-bold leading-snug pr-2" style={{ color: '#0A1118' }}>
          {q}
        </h3>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? '#047857' : 'rgba(4,120,87,0.10)',
            color: isOpen ? '#fff' : '#047857',
          }}
        >
          {isOpen ? <Minus className="w-4 h-4" strokeWidth={2.5} /> : <Plus className="w-4 h-4" strokeWidth={2.5} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-6 text-sm sm:text-base leading-relaxed" style={{ color: '#334155' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NewVersion() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <div
      className="min-h-screen pt-14"
      style={{
        background: '#F8FAFC',
        color: '#0A1118',
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      {/* Geist font via CDN */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
      />

      {/* ═══════════════ NAVBAR ═══════════════
          sticky top-14 (non top-0) per non finire sotto i 2 pulsanti fixed top-4
          del portfolio (PolpoAI back + toggle vecchio/nuovo). Il pt-14 sopra
          assicura che la navbar sia subito visibile (non coperta) anche a scrollY=0. */}
      <header
        className="sticky top-14 z-40 px-6 sm:px-12 py-4 backdrop-blur-md"
        style={{
          background: 'rgba(255,255,255,0.92)',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="font-bold text-lg tracking-tight flex items-center gap-2.5"
            style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
          >
            {/* Emerald square brand mark — signature distinto dal sito fotografo */}
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-sm font-bold text-sm"
              style={{ background: '#047857', color: '#fff' }}
            >
              B
            </span>
            <span>
              Avv. <span style={{ color: '#0A1118' }}>Giulia</span>
              <span style={{ color: '#047857' }}> Bianchi</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: '#1E293B' }}>
            <a href="#about" className="hover:text-emerald-700 transition-colors font-medium">Chi sono</a>
            <a href="#expertise" className="hover:text-emerald-700 transition-colors font-medium">Aree di competenza</a>
            <a href="#news" className="hover:text-emerald-700 transition-colors font-medium">News</a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-md font-semibold transition-all hover:opacity-90"
              style={{ background: '#0A1118', color: '#fff' }}
            >
              Contattami
            </a>
          </div>
        </nav>
      </header>

      {/* ═══════════════ CREDENTIALS STRIP ═══════════════
          Sottile striscia mono sotto la navbar — segnale visivo "studio legale serio"
          impossibile da confondere con un sito editoriale di fotografia. */}
      <div
        className="hidden md:block border-b"
        style={{
          background: '#0A1118',
          borderColor: '#1E293B',
          color: '#34D399',
          fontFamily: '"JetBrains Mono", "Geist Mono", ui-monospace, monospace',
        }}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-3 flex items-center justify-between text-xs tracking-wider uppercase font-semibold">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#34D399', boxShadow: '0 0 8px #34D399' }} />
              <span style={{ color: '#34D399' }} className="font-bold">Studio aperto</span>
            </span>
            <span style={{ color: '#94A3B8' }}>·</span>
            <span style={{ color: '#FFFFFF' }}>ORD. AVV. MILANO · MATR. 47823 · DAL 2010</span>
          </div>
          <div className="flex items-center gap-5" style={{ color: '#F1F5F9' }}>
            <span>+39 02 1234 5678</span>
            <span style={{ color: '#94A3B8' }}>·</span>
            <span>studio@avvbianchi.it</span>
          </div>
        </div>
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="px-6 sm:px-12 pt-12 sm:pt-20 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <p
              className="text-xs tracking-[0.18em] uppercase mb-5"
              style={{ color: '#047857' }}
            >
              — Studio Legale Bianchi · Milano
            </p>
            <h1
              className="leading-[1.02] tracking-[-0.025em] mb-6"
              style={{
                fontFamily: '"Geist", "Inter", sans-serif',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700,
              }}
            >
              Consulenza legale
              <br />
              <span style={{ color: '#047857' }}>per chi non ha tempo da perdere.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#334155' }}>
              Civile, commerciale, lavoro. Risposte chiare, tempi rispettati, soluzioni
              che funzionano nel mondo reale — non solo nei codici.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                href={MAIL_HREF}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-medium text-sm transition-[background,opacity] hover:opacity-90"
                style={{
                  background: '#0A1118',
                  color: '#fff',
                  boxShadow: '0 8px 24px rgba(10,17,24,0.18)',
                }}
                strength={0.3}
              >
                Prenota una consulenza
                <ChevronRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                href="#expertise"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-medium text-sm transition-[background] hover:bg-black/5"
                style={{ border: '1px solid #CBD5E1', color: '#0A1118' }}
                strength={0.25}
              >
                Vedi le aree
              </MagneticButton>
            </div>

            {/* Stats animate (CountUp) */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((s, i) => (
                <div key={s.label}>
                  <CountUp
                    to={s.value}
                    suffix={s.suffix}
                    delay={0.15 + i * 0.12}
                    duration={1.8}
                    className="text-2xl sm:text-3xl font-bold block"
                    style={{ fontFamily: '"Geist", "Inter", sans-serif', color: '#047857' }}
                  />
                  <div className="text-xs mt-1 leading-tight font-medium" style={{ color: '#475569' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Foto avvocato — con bottom accent strip emerald per signature visiva */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="relative aspect-[4/5] rounded-md overflow-hidden"
            style={{
              boxShadow: '0 20px 60px rgba(10,17,24,0.22)',
              border: '1px solid #E2E8F0',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=90"
              alt="Avv. Giulia Bianchi"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
            {/* Bottom strip emerald — segnale visivo distintivo */}
            <div
              className="absolute bottom-0 inset-x-0 h-1.5"
              style={{ background: 'linear-gradient(90deg, #047857 0%, #34D399 100%)' }}
            />
            {/* Badge credenziali — emerald squared, NON pill-rounded come il fotografo */}
            <div
              className="absolute bottom-5 left-5 px-3 py-2 rounded-sm text-xs font-bold backdrop-blur-md flex items-center gap-2"
              style={{
                background: '#0A1118',
                color: '#fff',
                border: '1px solid rgba(52,211,153,0.4)',
              }}
            >
              <Award className="w-3.5 h-3.5" style={{ color: '#34D399' }} />
              <span>ORD. MILANO · DAL 2010</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PUBLICATIONS STRIP ═══════════════ */}
      <section className="px-6 sm:px-12 py-10 sm:py-12 border-y" style={{ background: '#F8FAFC', borderColor: '#E2E8F0' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs tracking-[0.18em] uppercase mb-6 font-bold" style={{ color: '#475569' }}>
            — Pubblicazioni & collaborazioni
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
            {publications.map((pub) => (
              <span
                key={pub}
                className="text-sm sm:text-base font-bold tracking-wide transition-colors hover:text-emerald-700"
                style={{ color: '#475569', fontFamily: '"Geist", "Inter", sans-serif' }}
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ EXPERTISE ═══════════════ */}
      <section
        id="expertise"
        className="px-6 sm:px-12 py-20 sm:py-28"
        style={{ background: '#0A1118', color: '#F8FAFC' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 lg:gap-16 mb-14">
            <div>
              <p
                className="text-xs tracking-[0.18em] uppercase mb-4 font-semibold"
                style={{ color: '#34D399' }}
              >
                — Aree di competenza
              </p>
              <h2
                className="leading-[1.05]"
                style={{
                  fontFamily: '"Geist", "Inter", sans-serif',
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontWeight: 700,
                }}
              >
                Tre ambiti.
                <br />
                <span style={{ color: '#34D399' }}>Un solo approccio.</span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed" style={{ color: '#CBD5E1' }}>
              Lavoro su un numero contenuto di clienti, per dedicare a ciascuno
              l&apos;attenzione che merita. Privati, professionisti, piccole-medie imprese.
              Il primo incontro è sempre gratuito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {expertise.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="p-7 rounded-xl transition-all hover:translate-y-[-4px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(52,211,153,0.12)',
                    border: '1px solid rgba(52,211,153,0.3)',
                  }}
                >
                  <e.icon className="w-5 h-5" style={{ color: '#34D399' }} strokeWidth={1.7} />
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
                >
                  {e.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CASI STUDIO ═══════════════ */}
      <section id="case-studies" className="px-6 sm:px-12 py-20 sm:py-28" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 mb-12 sm:mb-16">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase mb-4 font-bold" style={{ color: '#047857' }}>
                — Casi studio
              </p>
              <h2
                className="leading-[1.05] tracking-[-0.02em]"
                style={{
                  fontFamily: '"Geist", "Inter", sans-serif',
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontWeight: 700,
                  color: '#0A1118',
                }}
              >
                Risultati
                <br />
                <span style={{ color: '#047857' }}>concreti.</span>
              </h2>
            </div>
            <p className="text-base sm:text-lg leading-relaxed self-end" style={{ color: '#334155' }}>
              Tre casi anonimizzati per mostrare come affronto problemi reali.
              Niente teoria: <strong style={{ color: '#0A1118' }}>problema → approccio → risultato misurabile</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {caseStudies.map((cs, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="rounded-xl overflow-hidden flex flex-col"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(10,17,24,0.04)',
                }}
              >
                {/* Metric header */}
                <div
                  className="px-6 py-5 flex items-baseline justify-between gap-3"
                  style={{ background: '#0A1118', color: '#fff' }}
                >
                  <div>
                    <p className="text-3xl sm:text-4xl font-extrabold leading-none" style={{ color: '#34D399', fontFamily: '"Geist", "Inter", sans-serif' }}>
                      {cs.metric}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mt-1.5" style={{ color: '#CBD5E1' }}>
                      {cs.metricLabel}
                    </p>
                  </div>
                  <Target className="w-5 h-5" style={{ color: '#34D399' }} strokeWidth={2} />
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <span
                    className="self-start px-2 py-1 rounded text-[10px] font-semibold tracking-wider uppercase"
                    style={{ background: 'rgba(4,120,87,0.10)', color: '#047857' }}
                  >
                    {cs.sector}
                  </span>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1.5" style={{ color: '#475569' }}>
                      Problema
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#0A1118' }}>{cs.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1.5" style={{ color: '#475569' }}>
                      Approccio
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>{cs.approach}</p>
                  </div>
                  <div className="pt-3 border-t" style={{ borderColor: '#E2E8F0' }}>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1.5" style={{ color: '#047857' }}>
                      Risultato
                    </p>
                    <p className="text-sm leading-relaxed font-semibold" style={{ color: '#0A1118' }}>{cs.result}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="px-6 sm:px-12 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs tracking-[0.18em] uppercase mb-4"
            style={{ color: '#047857' }}
          >
            — Chi sono
          </p>
          <h2
            className="leading-[1.1] mb-8 tracking-[-0.02em]"
            style={{
              fontFamily: '"Geist", "Inter", sans-serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 600,
            }}
          >
            Avvocato e consulente. Lo studio è piccolo,
            <br />
            <span style={{ color: '#475569' }}>i casi che seguo sono pochi e selezionati.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base leading-relaxed" style={{ color: '#334155' }}>
            <p>
              Mi sono laureata alla Statale di Milano nel 2009 con una tesi in diritto
              commerciale internazionale. Iscritta all'Ordine degli Avvocati di Milano dal
              2010, ho lavorato in studi associati prima di aprire il mio nel 2018.
            </p>
            <p>
              Credo nel rapporto diretto col cliente: rispondo io alle email, sono io a
              telefonarti, sono io davanti al giudice. Niente passaggi tra collaboratori,
              niente perdite di informazione, niente sorprese.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS — Come lavoriamo ═══════════════ */}
      <section id="process" className="px-6 sm:px-12 py-20 sm:py-28" style={{ background: '#0A1118', color: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 mb-14">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase mb-4 font-bold" style={{ color: '#34D399' }}>
                — Come lavoriamo
              </p>
              <h2
                className="leading-[1.05] tracking-[-0.02em]"
                style={{
                  fontFamily: '"Geist", "Inter", sans-serif',
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontWeight: 700,
                }}
              >
                Cinque
                <br />
                <span style={{ color: '#34D399' }}>passi netti.</span>
              </h2>
            </div>
            <p className="text-base sm:text-lg leading-relaxed self-end" style={{ color: '#E2E8F0' }}>
              Processo trasparente, milestone definite, niente sorprese.
              Sai sempre dove siamo, quanto manca, quanto costa.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px relative" style={{ background: '#1E293B' }}>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="p-6 sm:p-7 relative group"
                style={{ background: '#0A1118' }}
              >
                {/* Numero grande in sfondo */}
                <div
                  aria-hidden
                  className="absolute top-3 right-4 text-5xl sm:text-6xl font-extrabold leading-none opacity-[0.07]"
                  style={{ fontFamily: '"Geist", "Inter", sans-serif', color: '#34D399' }}
                >
                  {step.num}
                </div>
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(52,211,153,0.10)',
                    border: '1px solid rgba(52,211,153,0.30)',
                  }}
                >
                  <step.icon className="w-5 h-5" style={{ color: '#34D399' }} strokeWidth={1.8} />
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: '#34D399' }}>
                  {step.time}
                </p>
                <h3
                  className="text-base sm:text-lg font-bold mb-3 leading-snug"
                  style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NEWS ═══════════════ */}
      <section id="news" className="px-6 sm:px-12 py-20 sm:py-28" style={{ background: '#ECF3F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-xs tracking-[0.18em] uppercase mb-3"
                style={{ color: '#047857' }}
              >
                — Aggiornamenti
              </p>
              <h2
                className="leading-[1]"
                style={{
                  fontFamily: '"Geist", "Inter", sans-serif',
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  fontWeight: 700,
                }}
              >
                News dallo studio.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {news.map((n, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="p-7 rounded-xl bg-white transition-all hover:translate-y-[-4px] cursor-pointer"
                style={{
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(10,17,24,0.04)',
                }}
              >
                <div className="flex items-center gap-3 text-xs mb-4" style={{ color: '#475569' }}>
                  <span>{n.date}</span>
                  <span>·</span>
                  <span
                    className="px-2 py-0.5 rounded font-semibold"
                    style={{ background: 'rgba(4,120,87,0.10)', color: '#047857' }}
                  >
                    {n.cat}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold mb-3 leading-snug"
                  style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
                >
                  {n.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569' }}>{n.desc}</p>
                <span
                  className="text-xs font-semibold inline-flex items-center gap-1"
                  style={{ color: '#0A1118' }}
                >
                  Leggi <ChevronRight className="w-3 h-3" />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ + BOOKING ═══════════════ */}
      <section id="faq" className="px-6 sm:px-12 py-20 sm:py-28" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">

          {/* FAQ accordion */}
          <div>
            <p className="text-xs tracking-[0.18em] uppercase mb-4 font-bold" style={{ color: '#047857' }}>
              — Domande frequenti
            </p>
            <h2
              className="leading-[1.05] tracking-[-0.02em] mb-10"
              style={{
                fontFamily: '"Geist", "Inter", sans-serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 700,
                color: '#0A1118',
              }}
            >
              Le cose che mi
              <br />
              <span style={{ color: '#047857' }}>chiedete sempre.</span>
            </h2>
            <div>
              {faqs.map((f, i) => (
                <FAQItem
                  key={i}
                  q={f.q}
                  a={f.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>

          {/* Calendly-style booking card */}
          <div
            className="rounded-xl overflow-hidden sticky top-32"
            style={{
              background: '#0A1118',
              color: '#F8FAFC',
              boxShadow: '0 20px 60px rgba(10,17,24,0.15)',
              border: '1px solid rgba(52,211,153,0.20)',
            }}
          >
            <div className="px-6 py-5 border-b flex items-center gap-3" style={{ borderColor: '#1E293B' }}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.30)' }}
              >
                <Calendar className="w-5 h-5" style={{ color: '#34D399' }} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: '#34D399' }}>
                  Self-serve
                </p>
                <p className="text-sm font-bold">Prenota in 30 secondi</p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#E2E8F0' }}>
                Primo incontro 30 min, di persona o videocall. <strong style={{ color: '#fff' }}>Sempre gratuito.</strong>
              </p>

              {/* Mock slots */}
              <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-3" style={{ color: '#E2E8F0' }}>
                Slot disponibili questa settimana
              </p>
              <div className="space-y-2 mb-5">
                {[
                  { day: 'Mer 20 Nov', time: '14:30', mode: 'Videocall' },
                  { day: 'Gio 21 Nov', time: '11:00', mode: 'In studio · Milano' },
                  { day: 'Ven 22 Nov', time: '16:00', mode: 'Videocall' },
                ].map((slot, i) => (
                  <a
                    key={i}
                    href={MAIL_HREF}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-md transition-all hover:bg-white/5 group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid #1E293B',
                    }}
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{slot.day} · {slot.time}</p>
                      <p className="text-xs mt-0.5 font-medium" style={{ color: '#CBD5E1' }}>{slot.mode}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" style={{ color: '#34D399' }} />
                  </a>
                ))}
              </div>

              <MagneticButton
                href={MAIL_HREF}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md font-bold text-sm transition-[opacity] hover:opacity-90"
                style={{
                  background: '#34D399',
                  color: '#0A1118',
                  boxShadow: '0 8px 24px rgba(52,211,153,0.30)',
                }}
                strength={0.3}
              >
                <Calendar className="w-4 h-4" />
                Scegli un altro orario
              </MagneticButton>

              <p className="text-xs text-center mt-4 leading-relaxed font-medium" style={{ color: '#CBD5E1' }}>
                Risposta entro 2 ore in orario d&apos;ufficio.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════ CONTATTI ═══════════════ */}
      <section
        id="contact"
        className="px-6 sm:px-12 py-20 sm:py-28"
        style={{ background: '#0A1118', color: '#F8FAFC' }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p
              className="text-xs tracking-[0.18em] uppercase mb-4 font-semibold"
              style={{ color: '#34D399' }}
            >
              — Parliamone
            </p>
            <h2
              className="leading-[1.05] mb-6 tracking-[-0.02em]"
              style={{
                fontFamily: '"Geist", "Inter", sans-serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 700,
              }}
            >
              Il primo
              <br />
              <span style={{ color: '#34D399' }}>incontro è gratuito.</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#CBD5E1' }}>
              30 minuti, di persona o in videocall. Mi racconti la situazione, ti dico
              se posso aiutarti e in quanto tempo. Senza impegno.
            </p>
            <MagneticButton
              href={MAIL_HREF}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-bold text-sm transition-[opacity] hover:opacity-90"
              style={{
                background: '#34D399',
                color: '#0A1118',
                boxShadow: '0 8px 24px rgba(52,211,153,0.35)',
              }}
              strength={0.32}
            >
              <Mail className="w-4 h-4" />
              Scrivimi
            </MagneticButton>
          </div>

          <div className="space-y-5 text-sm leading-relaxed">
            <div className="flex items-start gap-4">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#34D399' }} />
              <div>
                <p className="font-semibold mb-1">Studio Legale Bianchi</p>
                <p style={{ color: '#E2E8F0' }} className="text-sm">Via Manzoni 28 · 20121 Milano</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#34D399' }} />
              <div>
                <p className="font-semibold mb-1">Telefono</p>
                <p style={{ color: '#E2E8F0' }} className="text-sm">+39 02 1234 5678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#34D399' }} />
              <div>
                <p className="font-semibold mb-1">Email</p>
                <p style={{ color: '#E2E8F0' }} className="text-sm">studio@avvbianchi.it</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Linkedin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#34D399' }} />
              <div>
                <p className="font-semibold mb-1">LinkedIn</p>
                <p style={{ color: '#E2E8F0' }} className="text-sm">/in/giulia-bianchi-avv</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BookOpen className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#34D399' }} />
              <div>
                <p className="font-semibold mb-1">Orari</p>
                <p style={{ color: '#E2E8F0' }} className="text-sm">Lun-Ven 9:30-18:30 · Sab su appuntamento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer
        className="px-6 py-8 text-center text-xs"
        style={{ background: '#0A1118', color: '#CBD5E1' }}
      >
        © {new Date().getFullYear()} Studio Legale Bianchi — P.IVA IT01234567890 · Esempio sito vetrina realizzato da
        <a href="https://polpo-ai.com" className="ml-1 underline hover:opacity-80">
          PolpoAI
        </a>
      </footer>
    </div>
  );
}
