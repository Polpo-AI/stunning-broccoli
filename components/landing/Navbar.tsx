'use client';
import Link from 'next/link';
import { useRef } from 'react';
export default function Navbar() {
  const menu = useRef<HTMLDetailsElement>(null);
  function close() { if (menu.current) menu.current.open = false; }
  return <header className="a-header"><a className="a-skip" href="#main-content">Salta al contenuto</a><Link className="a-logo" href="/" aria-label="Polpo AI, homepage"><span aria-hidden="true">✳</span> Polpo<span>AI</span></Link><nav aria-label="Navigazione principale"><a href="/#soluzioni">Soluzioni</a><a href="/#settori">Il tuo mondo</a><a href="/#metodo">Come lavoriamo</a></nav><a className="a-header-contact" href="/#contatti">Parliamone <span aria-hidden="true">↗</span></a><details ref={menu} className="a-menu"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Navigazione mobile"><a href="/#soluzioni" onClick={close}>Soluzioni</a><a href="/#settori" onClick={close}>Il tuo mondo</a><a href="/#metodo" onClick={close}>Come lavoriamo</a><a href="/#contatti" onClick={close}>Analisi gratuita</a></nav></details></header>;
}
