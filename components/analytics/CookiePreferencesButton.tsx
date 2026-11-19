'use client';
import { openCookiePreferences } from '@/lib/analytics';

/** Riapre il banner dei cookie: il consenso si revoca con la stessa facilità con cui si dà. */
export default function CookiePreferencesButton({ className }: { className?: string }) {
  return <button type="button" className={className} data-analytics-ignore onClick={openCookiePreferences}>Preferenze cookie</button>;
}
