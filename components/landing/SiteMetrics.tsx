'use client';
import {usePathname} from 'next/navigation';
import { Analytics, type BeforeSendEvent } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
function isPrivateFlow(path: string) { return path === '/ricerca' || path.startsWith('/ricerca/') || path.startsWith('/contatti/prova'); }
function excludePrivateFlow<T extends { url: string }>(event: T): T | null {
  if (isPrivateFlow(new URL(event.url, 'https://polpo-ai.com').pathname) ||
      (typeof window !== 'undefined' && isPrivateFlow(window.location.pathname))) return null;
  return event;
}
export default function SiteMetrics() {
  const pathname = usePathname();
  if (isPrivateFlow(pathname)) return null;
  return <><Analytics beforeSend={(event: BeforeSendEvent) => excludePrivateFlow(event)} /><SpeedInsights beforeSend={excludePrivateFlow} /></>;
}
