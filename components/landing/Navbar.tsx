'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const links = [['Soluzioni', 'soluzioni'], ['Settori', 'settori'], ['Metodo', 'metodo']];

export default function Navbar() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (menu.current) menu.current.open = false; };
  const href = (id: string) => pathname === '/' ? `#${id}` : `/#${id}`;
  return (
    <header className="p-header">
      <a href="#main-content" className="p-skip">Salta al contenuto</a>
      <Link className="p-wordmark" href="/" aria-label="Polpo AI — Home">polpo<span>ai</span><i aria-hidden="true">✳</i></Link>
      <nav className="p-nav" aria-label="Navigazione principale">{links.map(([label,id]) => <a href={href(id)} key={id}>{label}</a>)}</nav>
      <a className="nav-contact" href={href('contatti')}>Parliamone <ArrowUpRight size={16} aria-hidden="true" /></a>
      <details className="p-mobile-menu" ref={menu}><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Navigazione mobile">{links.map(([label,id]) => <a href={href(id)} key={id} onClick={closeMenu}>{label}</a>)}<a href={href('contatti')} onClick={closeMenu}>Analisi gratuita ↗</a></nav></details>
    </header>
  );
}
