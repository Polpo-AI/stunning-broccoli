'use client';
import Link from 'next/link';
import { useRef } from 'react';
import PolpoIcon from './PolpoIcon';
export default function Navbar() {
  const menu = useRef<HTMLDetailsElement>(null);
  function close() { if (menu.current) menu.current.open = false; }
  return <header className="a-header"><a className="a-skip" href="#main-content">Salta al contenuto</a><Link className="a-logo" href="/" aria-label="Polpo AI, homepage"><PolpoIcon name="polpo" className="a-brand-mark" /> Polpo<span>AI</span></Link><nav aria-label="Navigazione principale"><a href="/soluzioni">Soluzioni</a><a href="/settori">Settori</a><a href="/metodo">Metodo</a></nav><a className="a-header-contact" href="/contatti">Parliamone <PolpoIcon name="outward" /></a><details ref={menu} className="a-menu" onKeyDown={event => { if (event.key === 'Escape' && menu.current?.open) { event.preventDefault(); close(); menu.current.querySelector('summary')?.focus(); } }}><summary>Menu <PolpoIcon name="menu" className="a-menu-open" /><PolpoIcon name="close" className="a-menu-close" /></summary><nav aria-label="Navigazione mobile"><a href="/soluzioni" onClick={close}>Soluzioni</a><a href="/settori" onClick={close}>Settori</a><a href="/metodo" onClick={close}>Metodo</a><a href="/contatti" onClick={close}>Analisi gratuita</a></nav></details></header>;
}
