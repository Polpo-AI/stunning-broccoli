'use client';
import { Analytics, type BeforeSendEvent } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { usePathname } from 'next/navigation';
function isResearch(path: string) { return path === '/ricerca' || path.startsWith('/ricerca/'); }
// Also reject late events from a script mounted before client navigation to a survey.
function excludeResearch<T extends { url: string }>(event: T): T | null {
  if (isResearch(new URL(event.url, 'https://polpo-ai.com').pathname) ||
      (typeof window !== 'undefined' && isResearch(window.location.pathname))) return null;
  return event;
}
export default function SiteTelemetry() {
  const pathname = usePathname();
  if (isResearch(pathname)) return null;
  return <><Analytics beforeSend={(event: BeforeSendEvent) => excludeResearch(event)} /><SpeedInsights beforeSend={excludeResearch} /></>;
}
