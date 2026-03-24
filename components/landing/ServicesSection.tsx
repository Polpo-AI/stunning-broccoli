'use client';

import { Globe, MessageSquare, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/shared/ServiceCard';

const services = [
  {
    id: 'siti-web',
    icon: <Globe className="w-6 h-6" />,
    title: 'Creazione Siti Web',
    desc: 'Un sito veloce, bellissimo su mobile e ottimizzato per Google — pronto a convertire visitatori in clienti.',
    href: '/creazione-siti-web',
    accentColor: 'cyan',
    numberLabel: '01',
  },
  {
    id: 'chatbot',
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Chatbot WhatsApp',
    desc: 'Un assistente virtuale 24/7 che gestisce prenotazioni, risponde ai clienti e non perde nessun contatto.',
    href: '/chatbot-whatsapp-prenotazioni',
    accentColor: 'green',
    numberLabel: '02',
  },
  {
    id: 'agenti-ai',
    icon: <Bot className="w-6 h-6" />,
    title: 'Agenti AI su misura',
    desc: 'Automazioni intelligenti per email, report e data entry. Lavoro ripetitivo eliminato, focus sulla crescita.',
    href: '/agenti-ai',
    accentColor: 'purple',
    numberLabel: '03',
  },
];

export default function ServicesSection() {
  return (
    <section id="servizi" className="relative py-28 md:py-36 bg-[var(--bg-base)]">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(6,182,212,0.025) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="section-label">I nostri servizi</span>
          <h2 className="section-title mb-5">
            Cosa facciamo per te.
          </h2>
          <p className="section-subtitle max-w-md mx-auto">
            Tre soluzioni concrete, tutte su misura. Clicca sul servizio che ti interessa.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, idx) => (
            <ServiceCard
              key={s.id}
              title={s.title}
              description={s.desc}
              href={s.href}
              icon={s.icon}
              index={idx}
              accentColor={s.accentColor}
              numberLabel={s.numberLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
