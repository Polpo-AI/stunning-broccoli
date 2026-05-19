'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  if (!frozen) return <>{children}</>;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/* Desktop: leggero fade. Mobile: nessuna transition per evitare flicker. */
const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.18, ease: EASE } },
  exit:    { opacity: 0, transition: { duration: 0.08, ease: EASE } },
};

export default function GlobalTransition({
  children,
  onExitComplete,
}: {
  children: React.ReactNode;
  onExitComplete?: () => void;
}) {
  const pathname = usePathname();
  /* `null` = SSR/non ancora montato → rendiamo direttamente i children
     senza wrapping per evitare qualsiasi flicker durante l'idratazione.
     Dopo il mount sappiamo se siamo su mobile (no transition) o desktop. */
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  /* Render diretto su SSR/prima del mount E su mobile: zero animazione,
     zero unmount/remount, scroll-to-top gestito comunque da PageWrapper. */
  if (isMobile === null || isMobile) {
    return <>{children}</>;
  }

  /* Desktop: fade pulito. */
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
