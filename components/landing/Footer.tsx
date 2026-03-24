import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const servicesLinks = [
  { label: 'Siti Web Vetrina', href: '/creazione-siti-web' },
  { label: 'Chatbot WhatsApp', href: '/chatbot-whatsapp-prenotazioni' },
  { label: 'Agenti AI', href: '/agenti-ai' },
];

const industriesLinks = [
  { label: 'Ristoranti', href: '/chatbot-whatsapp-prenotazioni-ristoranti' },
  { label: 'Centri Estetici', href: '/chatbot-whatsapp-prenotazioni-centri-estetici' },
  { label: 'Studi Medici', href: '/chatbot-whatsapp-prenotazioni-studi-medici' },
  { label: 'Palestre', href: '/chatbot-whatsapp-prenotazioni-palestre' },
  { label: 'Hotel & B&B', href: '/chatbot-whatsapp-prenotazioni-hotel-bb' },
  { label: 'Padel', href: '/chatbot-whatsapp-prenotazioni-padel' },
];

export default function Footer() {
  return (
    <footer className="bg-[#070B14] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Grid principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image src="/logo a.jpg" alt="PolpoAI logo" fill className="object-contain" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Polpo<span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">
              Intelligenza Artificiale su misura per far crescere il tuo business.
            </p>
            <a
              href="mailto:info@polpo-ai.com"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 w-fit"
            >
              <Mail className="w-3.5 h-3.5" />
              info@polpo-ai.com
            </a>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5">Servizi</h4>
            <ul className="flex flex-col gap-3">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Settori */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5">Chatbot per Settore</h4>
            <ul className="flex flex-col gap-3">
              {industriesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Risorse */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5">Azienda</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/#contatti" className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200">
                  Contattaci
                </Link>
              </li>
              <li>
                <Link href="/#contatti" className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200">
                  Prenota una demo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} PolpoAI. Tutti i diritti riservati · P.IVA: ITXXXXXXXXXXX
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-600">Sistemi operativi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
