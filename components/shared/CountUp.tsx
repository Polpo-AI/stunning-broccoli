'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /**
   * Stringa da renderizzare. Il primo numero estratto viene animato 0→valore,
   * tutto il resto (prefissi/suffissi tipo "h+", "+", "%", "<") rimane fisso.
   * Se non c'è un numero, si fa solo un fade-in (es. "24/7", "Top 10").
   */
  children: string;
  /** Durata animazione (ms). Default 1500. */
  duration?: number;
  /** Delay prima di partire (ms). Default 0. */
  delay?: number;
  /** Decimali da mostrare. Default 0. */
  decimals?: number;
  className?: string;
}

/* Estrae il primo numero (int o decimale) e ritorna le parti prefisso + numero + suffisso */
function parse(text: string): { prefix: string; num: number | null; suffix: string; decimals: number } {
  const match = text.match(/^([^\d.,]*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { prefix: text, num: null, suffix: '', decimals: 0 };
  const raw = match[2].replace(',', '.');
  const num = parseFloat(raw);
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
  return { prefix: match[1], num, suffix: match[3], decimals };
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({
  children,
  duration = 1500,
  delay = 0,
  decimals,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(children);
  const [done, setDone] = useState(false);
  const parsed = parse(children);
  const useDecimals = decimals ?? parsed.decimals;

  useEffect(() => {
    if (done) return;
    const node = ref.current;
    if (!node) return;

    // Se il browser non supporta IntersectionObserver o non c'è numero, fade-in solo
    if (typeof IntersectionObserver === 'undefined' || parsed.num === null) {
      setDisplay(children);
      setDone(true);
      return;
    }

    // Rispetta prefers-reduced-motion
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(children);
      setDone(true);
      return;
    }

    let cancelled = false;
    let rafId: number | null = null;

    const animate = () => {
      const start = performance.now() + delay;
      const target = parsed.num as number;

      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = now - start;
        if (elapsed < 0) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        const t = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(t);
        const value = (target * eased).toFixed(useDecimals);
        setDisplay(`${parsed.prefix}${value}${parsed.suffix}`);
        if (t < 1) rafId = requestAnimationFrame(tick);
        else setDone(true);
      };

      // Set initial value to 0 with same formatting
      setDisplay(`${parsed.prefix}${(0).toFixed(useDecimals)}${parsed.suffix}`);
      rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            animate();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
