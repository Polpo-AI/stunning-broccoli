'use client';

import { Globe, MessageSquare, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/shared/ServiceCard';

const services = [
  {
    id: 'siti-web',
    icon: <Globe className="w-6 h-6" />,
    title: 'Siti Web Vetrina',
    desc:
      'Un sito costruito attorno al tuo lavoro, non da un modello già pronto. Veloce sul telefono, trovabile su Google, scritto in italiano semplice. Pensato per portare richieste vere, non per vincere premi di design.',
    href: '/creazione-siti-web',
    accentColor: 'cyan',
    numberLabel: '01',
  },
  {
    id: 'chatbot',
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Assistente WhatsApp',
    desc:
      'Risponde su WhatsApp al posto tuo: prende prenotazioni, fissa appuntamenti, gestisce richieste 24 ore su 24. Tu controlli tutto da un pannello semplice. Funziona per qualsiasi attività che riceve prenotazioni: estetici, ristoranti, palestre, padel, studi medici, hotel e qualunque altro settore.',
    href: '/chatbot-whatsapp-prenotazioni',
    accentColor: 'green',
    numberLabel: '02',
  },
  {
    id: 'agenti-ai',
    icon: <Bot className="w-6 h-6" />,
    title: 'Automazioni Intelligenti',
    desc:
      'Per le attività di tutti i giorni: fatture, preventivi, email, trasferimento dati tra programmi. Capiamo insieme cosa ha più senso automatizzare nel tuo caso e costruiamo l\'assistente che lo fa al posto tuo.',
    href: '/agenti-ai',
    accentColor: 'purple',
    numberLabel: '03',
  },
];

export default function ServicesSection() {
  return (
    <section id="servizi" className="relative py-28 md:py-36">
      {/* No section-local orbs — il bg colore arriva da layout body */}

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header — stile editoriale */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-end mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div>
            <h2 className="h2-editorial">
              Tre <em>strumenti</em>,<br />
              una mano sola.
            </h2>
          </div>
          <p className="text-base md:text-[17px] text-slate-300/85 leading-relaxed max-w-[480px]">
            Ogni progetto parte da una domanda:{' '}
            <em className="text-white not-italic font-medium">cosa stai facendo a mano che potrebbe farsi da solo?</em>{' '}
            Poi costruiamo lo strumento più semplice possibile per rispondere.
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
