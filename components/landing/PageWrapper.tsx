'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import GlobalTransition from '../shared/GlobalTransition';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Scroll-to-top quando cambia il path (sia su desktop che mobile).
  // Salta il primo render per non rovinare il deep-link a un hash.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.location.hash) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, lenis]);

  // onExitComplete è ridondante ora ma lo lascio per il fallback desktop
  const handleExitComplete = () => {
    if (!lenis) return;
    if (window.location.hash) return;
    lenis.scrollTo(0, { immediate: true });
  };

  return (
    <GlobalTransition onExitComplete={handleExitComplete}>
      {children}
    </GlobalTransition>
  );
}
