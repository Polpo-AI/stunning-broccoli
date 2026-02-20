'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  children: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  scanColor?: string;
  once?: boolean;
}

export default function LaserText({
  children,
  className = '',
  delay = 0,
  charDelay = 0.035,
  scanColor = '#00d4aa',
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });

  const words = children.split(' ');
  let globalCharIndex = 0;

  const totalChars = children.replace(/ /g, '').length;
  const totalDuration = delay + totalChars * charDelay + 0.4;

  return (
    <span ref={ref} className={`relative inline ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
          {word.split('').map((char) => {
            const idx = globalCharIndex++;
            const charStart = delay + idx * charDelay;
            return (
              <motion.span
                key={idx}
                className="inline-block relative"
                initial={{ opacity: 0, y: 6 }}
                animate={
                  isInView
                    ? {
                        opacity: [0, 1, 1],
                        y: [6, -1, 0],
                        textShadow: [
                          `0 0 18px ${scanColor}, 0 0 40px ${scanColor}`,
                          `0 0 6px ${scanColor}80`,
                          '0 0 0px transparent',
                        ],
                        color: ['#ffffff', '#ffffff'],
                      }
                    : { opacity: 0, y: 6 }
                }
                transition={{
                  duration: 0.45,
                  delay: charStart,
                  ease: 'easeOut',
                  times: [0, 0.25, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}

      {isInView && (
        <motion.span
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            width: '2px',
            background: `linear-gradient(to bottom, transparent 0%, ${scanColor} 30%, ${scanColor} 70%, transparent 100%)`,
            boxShadow: `0 0 8px ${scanColor}, 0 0 20px ${scanColor}80`,
            left: 0,
          }}
          initial={{ x: '-2px', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
          transition={{
            x: { duration: totalDuration - delay - 0.1, delay, ease: 'linear' },
            opacity: { duration: totalDuration - delay, delay, times: [0, 0.03, 0.9, 1] },
          }}
        />
      )}
    </span>
  );
}
