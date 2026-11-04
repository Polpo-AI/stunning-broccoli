import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="p-footer">
      <div className="footer-top"><Link className="p-wordmark" href="/">polpo<span>ai</span><i aria-hidden="true">✳</i></Link><p>Automazioni intelligenti.<br />Connessioni umane.</p><a href="mailto:info@polpo-ai.com">info@polpo-ai.com ↗</a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Polpo AI</span><nav aria-label="Navigazione footer"><Link href="/#soluzioni">Soluzioni</Link><Link href="/#settori">Settori</Link><Link href="/#contatti">Contatti</Link></nav><span>PROGETTATO INTORNO AL TUO LAVORO</span></div>
    </footer>
  );
}
