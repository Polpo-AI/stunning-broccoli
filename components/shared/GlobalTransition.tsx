'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useContext, useRef } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/* Solo fade — niente translate Y per evitare flicker / layout shift su mobile.
   La durata è breve per non rendere il cambio pagina lento. */
const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.22, ease: EASE } },
  exit:    { opacity: 0, transition: { duration: 0.12, ease: EASE } },
};

export default function GlobalTransition({
  children,
  onExitComplete,
}: {
  children: React.ReactNode;
  onExitComplete?: () => void;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
        style={{ willChange: 'opacity' }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
