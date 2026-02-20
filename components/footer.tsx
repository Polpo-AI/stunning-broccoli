'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LINKS = {
  Servizi: [
    { label: 'Siti Web', href: '#servizi' },
    { label: 'Chatbot AI', href: '#servizi' },
    { label: 'Automazioni CRM', href: '#servizi' },
    { label: 'Funnel', href: '#servizi' },
    { label: 'Analytics', href: '#servizi' },
  ],
  Agenzia: [
    { label: 'Come Funziona', href: '#come-funziona' },
    { label: 'Chi Siamo', href: '#chi-siamo' },
    { label: 'Contatti', href: '#contatti' },
    { label: 'Blog', href: '#' },
  ],
};

const NODE_POSITIONS = [
  { x: 10, y: 30, color: '#00d4aa', delay: 0 },
  { x: 35, y: 15, color: '#00a8ff', delay: 0.4 },
  { x: 60, y: 40, color: '#00d4aa', delay: 0.8 },
  { x: 80, y: 20, color: '#00a8ff', delay: 1.2 },
  { x: 90, y: 60, color: '#00d4aa', delay: 0.6 },
  { x: 50, y: 75, color: '#00a8ff', delay: 1.0 },
  { x: 20, y: 70, color: '#00d4aa', delay: 1.4 },
];

function CircuitOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" fill="none">
        <motion.path
          d="M0,100 H200 L250,50 H500 L550,100 H800 L850,150 H1200"
          stroke="url(#footerGrad1)"
          strokeWidth="0.8"
          strokeDasharray="8 12"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,150 H150 L200,80 H450 L500,130 H750 L800,60 H1200"
          stroke="url(#footerGrad2)"
          strokeWidth="0.6"
          strokeDasharray="6 16"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.path
          d="M100,0 V60 H300 V120 H600 V80 H900 V140 H1100 V200"
          stroke="#00d4aa"
          strokeWidth="0.5"
          strokeDasharray="4 18"
          strokeOpacity="0.15"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 4, ease: 'easeInOut', delay: 1 }}
        />

        {NODE_POSITIONS.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x * 12}
            cy={node.y * 2}
            r="2.5"
            fill={node.color}
            animate={{ opacity: [0.2, 1, 0.2], r: [2, 3.5, 2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: node.delay }}
          />
        ))}

        <defs>
          <linearGradient id="footerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity="0" />
            <stop offset="40%" stopColor="#00d4aa" stopOpacity="1" />
            <stop offset="60%" stopColor="#00a8ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00a8ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="footerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00a8ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00a8ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="text-sm relative inline-flex items-center gap-1.5"
        style={{
          color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
          transition: 'color 0.2s ease',
        }}
      >
        <motion.span
          className="w-1 h-1 rounded-full flex-shrink-0"
          style={{ background: '#00d4aa' }}
          animate={{ scale: hovered ? 1.5 : 1, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.2 }}
        />
        {label}
        <motion.span
          className="absolute -bottom-0.5 left-3 h-px"
          style={{ background: 'linear-gradient(90deg, #00d4aa, #00a8ff)' }}
          animate={{ width: hovered ? 'calc(100% - 0.75rem)' : '0%' }}
          transition={{ duration: 0.2 }}
        />
      </a>
    </li>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: '#000b1e',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <CircuitOverlay />

      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.4), transparent)' }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <motion.a
              href="#"
              className="flex items-center gap-3 mb-6 w-fit"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="relative w-10 h-10"
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/Gemini_Generated_Image_2i7jnj2i7jnj2i7j.png"
                  alt="Polpo AI"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <span className="text-xl font-bold text-white">
                Polpo{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00d4aa, #00a8ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  AI
                </span>
              </span>
            </motion.a>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              Il tuo sistema nervoso digitale. Intelligenza centrale, otto braccia operative.
            </p>

            <div className="flex items-center gap-3">
              {['#00d4aa', '#00a8ff', '#00d4aa'].map((color, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                  style={{
                    background: `${color}10`,
                    border: `1px solid ${color}25`,
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: `0 0 15px ${color}50`,
                    borderColor: `${color}80`,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: color }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([category, links], ci) => (
            <div key={category}>
              <motion.h4
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
              >
                {category}
              </motion.h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <FooterLink key={link.label} label={link.label} href={link.href} />
                ))}
              </ul>
            </div>
          ))}

          <div>
            <motion.h4
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{
                color: 'rgba(255,255,255,0.25)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Contatti
            </motion.h4>
            <div className="space-y-3">
              <motion.a
                href="mailto:info@polpo-ai.com"
                className="block text-sm font-medium relative w-fit"
                style={{ color: '#00d4aa' }}
                whileHover={{ x: 3 }}
              >
                info@polpo-ai.com
              </motion.a>
              <p className="text-sm text-white/40">Italia — Remote First</p>
            </div>

            <div className="mt-8">
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'JetBrains Mono, monospace' }}
              >
                System Status
              </p>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#00d4aa' }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    boxShadow: ['0 0 0px rgba(0,212,170,0)', '0 0 8px rgba(0,212,170,0.8)', '0 0 0px rgba(0,212,170,0)'],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span
                  className="text-xs font-mono"
                  style={{ color: 'rgba(0,212,170,0.6)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  ALL_SYSTEMS_ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p
            className="text-xs font-mono"
            style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            © {new Date().getFullYear()} Polpo AI · v2.4.1 · All rights reserved
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Cookie Policy', 'Termini'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(0,212,170,0.7)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
