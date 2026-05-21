'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import GlobalTransition from '../shared/GlobalTransition';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();
  const pathname = usePathname();

  // Scroll-to-top quando cambia il path (sia su desktop che mobile)
  // E anche al primo mount se siamo già scrollati (es. ritorno da /portfolio/* ).
  // L'unico caso in cui NON facciamo scroll è quando l'URL ha un hash:
  // in quel caso il browser/Lenis devono ancorarsi alla sezione corretta.
  useEffect(() => {
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
