import Image from 'next/image';
import Link from 'next/link';

const cols = [
  { h: 'Lavoro',   items: [{l:'Chatbot',href:'/chatbot-whatsapp'},{l:'Siti',href:'/siti-web'},{l:'Agenti AI',href:'/agenti-ai'},{l:'Integrazioni',href:'/#integrazioni'}] },
  { h: 'Casi',     items: [{l:'Padel Roma',href:'#'},{l:'Hotel Garda',href:'#'},{l:'Studio Biaggi',href:'#'}] },
  { h: 'Contatti', items: [{l:'ciao@polpo-ai.com',href:'mailto:ciao@polpo-ai.com'},{l:'Instagram',href:'#'},{l:'LinkedIn',href:'#'}] },
];

export default function FooterV2() {
  return (
    <footer className="relative z-10 px-8 pt-20 pb-10 border-t border-white/[0.06] bg-[#0A0F1C]">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-14 mb-14">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo a.jpg" alt="" width={34} height={34} className="rounded-[9px]" />
              <span className="font-display text-[22px] font-semibold italic tracking-tight">
                Polpo<span className="text-cyan-400 not-italic font-normal">/AI</span>
              </span>
            </Link>
            <div className="font-display text-2xl font-light italic leading-[1.25] text-white/85 mt-6 max-w-[380px] tracking-tight">
              Otto braccia,<br/>infinite cose <em className="text-magenta-soft">fatte bene.</em>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h5 className="font-display text-sm font-normal italic text-white/55 mb-4.5">{c.h}</h5>
              <ul className="list-none">
                {c.items.map((i) => (
                  <li key={i.l} className="mb-3"><Link href={i.href} className="text-slate-400 text-sm hover:text-magenta-soft transition-colors">{i.l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-7 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-xs text-slate-600">© 2026 PolpoAI · P.IVA 12345678910</span>
          <span className="text-xs text-slate-600 font-display italic">Fatto con <span className="text-magenta animate-pulse-magenta inline-block">♥</span> in Italia</span>
        </div>
      </div>
    </footer>
  );
}
