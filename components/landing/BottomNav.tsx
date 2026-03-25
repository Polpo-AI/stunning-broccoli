'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Home, Globe, MessageSquare, Bot } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home',     href: '/',                              icon: Home,         accent: '#22d3ee' },
  { label: 'Siti Web', href: '/creazione-siti-web',            icon: Globe,        accent: '#38bdf8' },
  { label: 'Chatbot',  href: '/chatbot-whatsapp-prenotazioni', icon: MessageSquare, accent: '#34d399' },
  { label: 'AI Agent', href: '/agenti-ai',                     icon: Bot,          accent: '#a78bfa' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

/* Single nav item with magnetic hover + ripple effect */
function NavItem({ label, href, icon: Icon, accent, active }: {
  label: string; href: string; icon: React.ElementType; accent: string; active: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  // Magnetic pull values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Max pull: 6px
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setHovered(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, key: Date.now() });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <Link
      ref={ref}
      href={href}
      aria-current={active ? 'page' : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative flex flex-col items-center gap-1 px-4 py-2.5 rounded-[17px] min-w-[64px] focus-visible:outline-none overflow-hidden"
    >
      {/* Active background glow */}
      {active && (
        <motion.div
          layoutId="bnav-bg"
          className="absolute inset-0 rounded-[17px]"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${accent}28 0%, ${accent}10 60%, transparent 100%)`,
            borderTop: `1px solid ${accent}35`,
          }}
        />
      )}

      {/* Hover overlay */}
      {hovered && !active && (
        <motion.div
          className="absolute inset-0 rounded-[17px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ background: `${accent}10` }}
        />
      )}

      {/* Click ripple */}
      {ripple && (
        <motion.div
          key={ripple.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x, top: ripple.y,
            width: 8, height: 8,
            marginLeft: -4, marginTop: -4,
            background: accent,
          }}
          initial={{ opacity: 0.7, scale: 0 }}
          animate={{ opacity: 0, scale: 8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}

      {/* Icon with magnetic motion */}
      <motion.div
        className="relative"
        style={{ x: springX, y: springY }}
        animate={active ? { scale: 1.15, y: -1 } : { scale: 1, y: 0 }}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        {/* Active dot glow */}
        {active && (
          <motion.div
            layoutId="bnav-dot"
            className="absolute inset-0 rounded-full blur-[6px] opacity-70"
            style={{ background: accent }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}
        {/* Hover pulse ring */}
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ background: accent, mixBlendMode: 'plus-lighter' }}
          />
        )}
        <Icon
          className="relative w-[18px] h-[18px] transition-colors duration-300"
          style={{ color: active || hovered ? accent : '#475569' }}
          strokeWidth={active ? 2.2 : 1.75}
        />
      </motion.div>

      {/* Label */}
      <motion.span
        className="text-[9.5px] font-semibold tracking-wide transition-colors duration-300 leading-none"
        style={{ x: springX, y: springY }}
        animate={{ color: active || hovered ? accent : '#475569' }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </Link>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const activeHref = NAV_ITEMS.find(({ href }) => isActive(pathname, href))?.href ?? '/';
  const accentColor = NAV_ITEMS.find(({ href }) => href === activeHref)?.accent ?? '#22d3ee';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-5 pointer-events-none">
      <motion.nav
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="pointer-events-auto"
        aria-label="Navigazione rapida"
      >
        {/* Outer gradient ring — changes color with active section */}
        <motion.div
          className="relative rounded-[22px] p-px"
          animate={{
            boxShadow: `0 0 30px ${accentColor}25, 0 8px 32px rgba(0,0,0,0.65)`,
          }}
          transition={{ duration: 0.5 }}
          style={{
            background: `linear-gradient(135deg, ${accentColor}22, transparent 55%, ${accentColor}15)`,
          }}
        >
          {/* Inner pill */}
          <div
            className="flex items-center gap-0.5 px-2 py-2 rounded-[21px]"
            style={{
              background: 'rgba(7, 11, 20, 0.92)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
            }}
          >
            {NAV_ITEMS.map(({ href, ...rest }) => (
              <NavItem
                key={href}
                href={href}
                active={isActive(pathname, href)}
                {...rest}
              />
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </div>
  );
}
