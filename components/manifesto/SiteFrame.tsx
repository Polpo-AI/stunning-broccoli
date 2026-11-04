'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function SiteFrame({children}: {children: React.ReactNode}) {
  const isHome = usePathname() === '/';
  if (isHome) return <>{children}</>;
  return <><header className="manifesto-inner-nav"><Link href="/" className="manifesto-brand">polpo<span>AI</span><span className="brand-orbit" aria-hidden="true">✳</span></Link><nav aria-label="Navigazione principale"><Link href="/chatbot-whatsapp-prenotazioni">Assistenti WhatsApp</Link><Link href="/agenti-ai">Automazioni</Link><Link href="/#contatti">Analisi gratuita ↗</Link></nav></header><main id="main-content" tabIndex={-1} className="manifesto-legacy">{children}</main><footer className="manifesto-inner-footer"><Link href="/">← Torna a Polpo AI</Link><a href="mailto:info@polpo-ai.com">info@polpo-ai.com</a></footer></>;
}
