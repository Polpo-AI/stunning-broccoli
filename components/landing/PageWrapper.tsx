'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import GlobalTransition from '../shared/GlobalTransition';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();
  const [, setTick] = useState(0);

  // Triggered safely by framer-motion exactly when the old page fully unmounts
  const handleExitComplete = () => {
    if (!lenis) return;
    if (window.location.hash) return;
    lenis.scrollTo(0, { immediate: true });
    
    // Force a dummy state change to ensure React 18 flushes the unmount tick.
    // This solves the Framer Motion "mount stall" bug where it waits forever globally.
    setTick(t => t + 1);
  };

  return (
    <GlobalTransition onExitComplete={handleExitComplete}>
      {children}
    </GlobalTransition>
  );
}
