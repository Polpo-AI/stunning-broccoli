'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useContext, useRef } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Easing requested by user: cubic-bezier(0.4, 0, 0.2, 1)
const TRANSITION_EASING = [0.4, 0, 0.2, 1] as const;
const TRANSITION_DURATION = 0.6; // 600ms total duration

/**
 * Freezes the Next.js App Router context for the exiting component.
 * This prevents the old page from receiving new server components while `AnimatePresence` runs its unmount.
 * Fixes the notorious "mount stall" freeze in Next.js 14 production builds.
 */
function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  if (!frozen) {
    return <>{children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

/**
 * Liquid Curtain Transition Strategy:
 * When path changes, we do NOT block the router. Instead, the `AnimatePresence` mode="wait" in PageWrapper
 * allows this component (which wraps the children) to visually perform the open/close sequence.
 */
export default function GlobalTransition({ 
  children,
  onExitComplete
}: { 
  children: React.ReactNode;
  onExitComplete?: () => void;
}) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const d = isMobile ? TRANSITION_DURATION * 0.8 : TRANSITION_DURATION;

  // The page content variants
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      filter: isMobile ? 'none' : 'blur(12px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: d * 0.6, delay: d * 0.4 }, // fade in after curtain mostly open
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      filter: isMobile ? 'none' : 'blur(12px)',
      transition: { duration: d * 0.6 },
    },
  };

  // The liquid shapes variants (using the tentacle image)
  const leftShapeVariants = {
    initial: { x: '-100%', scale: 1 },
    animate: { 
      x: '-100%', 
      scale: 1,
      transition: { duration: d, ease: TRANSITION_EASING } 
    },
    exit: { 
      x: '0%', 
      scale: isMobile ? 1.01 : 1.03, // Slight breathing scale when closed, reduced on mobile
      transition: { duration: d, ease: TRANSITION_EASING } 
    },
  };

  const rightShapeVariants = {
    initial: { x: '100%', scale: 1 },
    animate: { 
      x: '100%', 
      scale: 1,
      transition: { duration: d, ease: TRANSITION_EASING } 
    },
    exit: { 
      x: '0%', 
      scale: isMobile ? 1.01 : 1.03,
      transition: { duration: d, ease: TRANSITION_EASING } 
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
      <motion.div key={pathname} className="relative w-full">
        {/* The actual page content */}
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full origin-top"
          style={{ willChange: 'opacity, transform, filter' }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>

        {/* The Transition Overlay (Tentacle Curtains) */}
        {/* We use position fixed to cover the entire viewport during transition */}
        <motion.div 
          className="fixed inset-0 z-[100] pointer-events-none flex overflow-hidden"
          aria-hidden
        >
          <motion.div 
            className="w-[50%] h-full flex-shrink-0 origin-left"
            variants={leftShapeVariants}
            initial="exit"     // Start closed when mounting a new route
            animate="animate"  // Open up
            exit="exit"        // Close down when leaving
            style={{ willChange: 'transform' }}
          >
            <img
              src="/997e3798-42a4-43af-bdb7-f71e4739b374.png"
              alt=""
              className="w-full h-full object-cover object-[10%_center] lg:object-left"
              style={{
                filter: 'invert(1) hue-rotate(180deg) brightness(1.15) saturate(1.2)',
                mixBlendMode: 'screen',
                transform: 'translateZ(0)',
              }}
            />
          </motion.div>
          <motion.div 
            className="w-[50%] h-full flex-shrink-0 origin-right"
            variants={rightShapeVariants}
            initial="exit"
            animate="animate"
            exit="exit"
            style={{ willChange: 'transform' }}
          >
            <img
              src="/997e3798-42a4-43af-bdb7-f71e4739b374.png"
              alt=""
              className="w-full h-full object-cover object-[10%_center] lg:object-right"
              style={{
                filter: 'invert(1) hue-rotate(180deg) brightness(1.15) saturate(1.2)',
                mixBlendMode: 'screen',
                transform: 'scaleX(-1) translateZ(0)',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
