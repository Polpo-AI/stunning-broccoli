'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, Globe, Bot, Calendar, Mail, Database, Zap, ArrowUpRight } from 'lucide-react';

const ease = [0.23, 1, 0.32, 1] as const;

export default function ServicesSectionV2() {
  return (
    <section id="lavoro" className="relative z-10 px-8 py-36 max-w-[1320px] mx-auto">
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-end mb-20"
      >
        <div>
          <span className="section-num-editorial">— Cap. 01 / Lavoro</span>
          <h2 className="h2-editorial mt-4">Tre <em>strumenti</em>,<br/>una mano sola.</h2>
        </div>
        <p className="text-[17px] text-slate-400 leading-[1.6] max-w-[460px]">
          Ogni progetto parte da una domanda: <em className="text-white not-italic">cosa stai facendo a mano che potrebbe farsi da solo?</em> Poi costruiamo lo strumento più piccolo possibile per rispondere.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-5 lg:grid-rows-[380px_280px]">
        {/* Featured */}
        <Link href="/chatbot-whatsapp" className="lg:row-span-2 relative p-9 rounded-[28px] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{ background: 'linear-gradient(160deg, rgba(255,61,138,0.10) 0%, rgba(7,11,20,0.4) 50%)', border: '1px solid rgba(255,61,138,0.25)' }}>
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase text-magenta-soft mb-4"
                  style={{ background: 'rgba(255,61,138,0.10)', border: '1px solid rgba(255,61,138,0.30)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-magenta" style={{ boxShadow: '0 0 8px #ff3d8a' }} />
              Più richiesto
            </span>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-magenta-soft"
                 style={{ background: 'rgba(255,61,138,0.12)', border: '1px solid rgba(255,61,138,0.25)' }}>
              <MessageSquare className="w-6 h-6" strokeWidth={1.4} />
            </div>
          </div>
          <div>
            <div className="font-display text-4xl font-normal leading-none tracking-tight text-white mb-3.5">
              Chatbot <em className="italic text-magenta">WhatsApp</em>
            </div>
            <p className="text-base text-slate-400 leading-[1.65] max-w-[360px] mb-4">
              Un assistente che gestisce prenotazioni, FAQ e nuovi contatti — direttamente dove i tuoi clienti già parlano. Niente app da scaricare, niente form da compilare.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-magenta-soft">
              Apri il caso · Padel Roma <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
            </span>
            <div className="flex gap-9 mt-6 pt-6 border-t border-white/10">
              <div><div className="font-display text-4xl italic text-magenta-soft leading-none">+38%</div><div className="text-[11px] text-slate-500 mt-1">prenotazioni mensili</div></div>
              <div><div className="font-display text-4xl italic text-magenta-soft leading-none">−6h</div><div className="text-[11px] text-slate-500 mt-1">/settimana al telefono</div></div>
            </div>
          </div>
        </Link>

        {/* Siti */}
        <CompactCard
          num="02" iconBg="rgba(6,182,212,0.10)" iconBorder="rgba(6,182,212,0.20)" iconColor="text-cyan-400"
          icon={<Globe className="w-[22px] h-[22px]" strokeWidth={1.4} />}
          title={<>Siti <em className="italic text-cyan-400">vetrina</em></>}
          desc="Veloci, mobile-first, ottimizzati per Google. Online in meno di 30 giorni."
          href="/siti-web" linkColor="text-cyan-400"
        />

        {/* Agenti */}
        <CompactCard
          num="03" iconBg="rgba(139,92,246,0.10)" iconBorder="rgba(139,92,246,0.20)" iconColor="text-violet-400"
          icon={<Bot className="w-[22px] h-[22px]" strokeWidth={1.4} />}
          title={<>Agenti <em className="italic text-violet-400">AI</em> su misura</>}
          desc="Email, dati, report. Un agente che lavora di notte — al posto tuo."
          href="/agenti-ai" linkColor="text-violet-400" titleSize="text-[22px]"
        />

        {/* Wide integrations */}
        <Link href="/#integrazioni" className="lg:col-span-2 lg:row-start-2 relative p-7 rounded-[28px] flex items-center justify-between gap-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
              style={{ background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-[60%]">
            <div className="font-display text-sm italic text-white/40 mb-2.5">— 04 · su richiesta</div>
            <div className="font-display text-2xl font-normal text-white mb-2 leading-tight">Integrazioni & <em className="italic text-amber">automazioni</em></div>
            <p className="text-sm text-slate-400 leading-[1.65]">Colleghiamo gestionali, calendari, CRM. Tutto quello che già usi, ma senza il copia-incolla.</p>
          </div>
          <div className="flex">
            <IconBubble color="text-cyan-400"><Calendar className="w-5 h-5" strokeWidth={1.4} /></IconBubble>
            <IconBubble color="text-magenta-soft" offset><Mail className="w-5 h-5" strokeWidth={1.4} /></IconBubble>
            <IconBubble color="text-amber" offset><Database className="w-5 h-5" strokeWidth={1.4} /></IconBubble>
            <IconBubble color="text-violet-400" offset><Zap className="w-5 h-5" strokeWidth={1.4} /></IconBubble>
          </div>
        </Link>
      </div>
    </section>
  );
}

function CompactCard({ num, icon, iconBg, iconBorder, iconColor, title, desc, href, linkColor, titleSize = 'text-2xl' }: any) {
  return (
    <Link href={href} className="relative p-9 rounded-[28px] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
          style={{ background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
      <div>
        <div className="font-display text-sm italic text-white/40">— {num}</div>
        <div className={`w-14 h-14 rounded-2xl mt-3.5 flex items-center justify-center ${iconColor}`} style={{ background: iconBg, border: `1px solid ${iconBorder}` }}>{icon}</div>
      </div>
      <div>
        <div className={`font-display ${titleSize} font-normal text-white mb-3.5 leading-none tracking-tight`}>{title}</div>
        <p className="text-sm text-slate-400 leading-[1.65] mb-4">{desc}</p>
        <span className={`inline-flex items-center gap-2 text-[13px] font-semibold ${linkColor}`}>Sfoglia →</span>
      </div>
    </Link>
  );
}

function IconBubble({ children, color, offset }: any) {
  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} ${offset ? '-ml-3' : ''}`}
         style={{ background: '#0d1525', border: '1px solid rgba(255,255,255,0.10)' }}>{children}</div>
  );
}
