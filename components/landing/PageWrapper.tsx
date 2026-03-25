'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import GlobalTransition from '../shared/GlobalTransition';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  // Triggered safely by framer-motion exactly when the old page fully unmounts
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
