'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { Layers, Brain, Users, MessageCircle, Zap, X, Menu } from 'lucide-react';

interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType | null;
  isLogo?: boolean;
  isCTA?: boolean;
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'logo', label: 'Polpo AI', href: '#', icon: null, isLogo: true },
  { id: 'servizi', label: 'Servizi', href: '#servizi', icon: Layers },
  { id: 'come-funziona', label: 'Come Funziona', href: '#come-funziona', icon: Brain },
  { id: 'chi-siamo', label: 'Chi Siamo', href: '#chi-siamo', icon: Users },
  { id: 'contatti-link', label: 'Contatti', href: '#contatti', icon: MessageCircle },
  { id: 'cta', label: 'Inizia Ora', href: '#contatti', icon: Zap, isCTA: true },
];

function DockItemComponent({
  item,
  mouseX,
}: {
  item: DockItem;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [tooltip, setTooltip] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current) return 999;
    const rect = ref.current.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const scale = useSpring(useTransform(distance, [0, 80, 140], [1.75, 1.35, 1.0]), {
    stiffness: 350,
    damping: 28,
  });
  const translateY = useSpring(useTransform(distance, [0, 80, 140], [-18, -9, 0]), {
    stiffness: 350,
    damping: 28,
  });

  const Icon = item.icon;

  const baseStyle = item.isCTA
    ? 'bg-[#00d4aa] text-[#000b1e] shadow-[0_0_20px_rgba(0,212,170,0.4)]'
    : 'bg-white/[0.07] text-white/80 hover:text-white border border-white/[0.08]';

  return (
    <motion.a
      ref={ref}
      href={item.href}
      style={{ scale, y: translateY }}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      className={`relative flex items-center justify-center rounded-2xl transition-colors duration-200 ${baseStyle} ${item.isLogo ? 'w-16 h-16 p-0' : item.isCTA ? 'w-12 h-12' : 'w-12 h-12'
        }`}
    >
      {item.isLogo ? (
        <div className="relative w-14 h-14 flex items-center justify-center">
          <Image
            src="/polpo-icona.png"
            alt="Polpo AI"
            fill
            className="object-contain"
          />
        </div>
      ) : Icon ? (
        <Icon size={20} />
      ) : null}

      <AnimatePresence>
        {tooltip && (
          <motion.div
            className="absolute bottom-full mb-3 left-1/2 pointer-events-none z-50"
            style={{ translateX: '-50%' }}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/15 text-white text-xs font-semibold whitespace-nowrap tracking-wide">
              {item.label}
            </div>
            <div className="w-1.5 h-1.5 bg-white/10 border-r border-b border-white/15 rotate-45 mx-auto -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

function MobileDock() {
  const [open, setOpen] = useState(false);
  const mobileLinks = DOCK_ITEMS.filter((i) => !i.isLogo);

  return (
    <>
      <div className="flex md:hidden fixed bottom-6 right-6 z-50 flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2 items-end"
            >
              {mobileLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl backdrop-blur-xl text-sm font-semibold ${item.isCTA
                      ? 'bg-[#00d4aa] text-[#000b1e]'
                      : 'bg-white/10 text-white border border-white/10'
                      }`}
                  >
                    {Icon && <Icon size={16} />}
                    {item.label}
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-2xl bg-[#bc13fe] text-white flex items-center justify-center shadow-[0_0_30px_rgba(188,19,254,0.5)]"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="flex md:hidden fixed top-5 left-5 z-50">
        <a href="#" className="flex items-center gap-2.5">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <Image src="/polpo-icona.png" alt="Polpo AI" fill className="object-contain" />
          </div>
          <span className="text-sm font-bold text-white">
            Polpo <span style={{ background: 'linear-gradient(135deg, #bc13fe, #00d4aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI</span>
          </span>
        </a>
      </div>
    </>
  );
}

export default function DockNav() {
  const mouseX = useMotionValue(Infinity);

  return (
    <>
      <motion.nav
        className="hidden md:flex fixed bottom-8 left-1/2 z-50 items-end gap-3 px-5 py-3.5 rounded-3xl"
        style={{ translateX: '-50%' }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onFocus={() => { }}
        aria-label="Navigation dock"
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'rgba(0, 8, 20, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 2px 0 rgba(255,255,255,0.06) inset',
          }}
        />

        <div className="relative flex items-end gap-3">
          {DOCK_ITEMS.slice(0, 1).map((item) => (
            <DockItemComponent key={item.id} item={item} mouseX={mouseX} />
          ))}

          <div className="w-px h-8 self-center" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }} />

          {DOCK_ITEMS.slice(1, 5).map((item) => (
            <DockItemComponent key={item.id} item={item} mouseX={mouseX} />
          ))}

          <div className="w-px h-8 self-center" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }} />

          {DOCK_ITEMS.slice(5).map((item) => (
            <DockItemComponent key={item.id} item={item} mouseX={mouseX} />
          ))}
        </div>
      </motion.nav>

      <MobileDock />
    </>
  );
}
