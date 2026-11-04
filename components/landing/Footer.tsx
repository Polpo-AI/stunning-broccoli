import Link from 'next/link';
export default function Footer() { return <footer className="a-footer"><Link className="a-logo" href="/">Polpo<span>AI</span></Link><p>Automazioni AI per le PMI.<br />Il lavoro prende una nuova forma.</p><a href="mailto:info@polpo-ai.com">info@polpo-ai.com ↗</a><small>© {new Date().getFullYear()} Polpo AI</small></footer>; }
