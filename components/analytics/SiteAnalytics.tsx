'use client';
import './consent.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useReportWebVitals } from 'next/web-vitals';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CONSENT_OPEN_EVENT, CONSENT_STORAGE_KEY, clarityProjectId, crossedScrollThresholds, gaMeasurementId, isPrivatePath,
  privatePathOf, readConsent, saveConsent, trackersLoaded, sectionName, startAnalytics, stopAnalytics, trackEvent, type ConsentChoice,
} from '@/lib/analytics';

const ids = { ga: gaMeasurementId(), clarity: clarityProjectId() };
const enabled = Boolean(ids.ga || ids.clarity);

function linkLabel(el: Element) {
  return (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim();
}

function linkLocation(el: Element) {
  if (el.closest('.a-header, header')) return 'header';
  if (el.closest('.a-footer, footer')) return 'footer';
  return sectionName(el.closest('section')) || 'page';
}

/** Click su CTA, menu ed email, raccolti con un solo listener: nessun componente da modificare. */
function onDocumentClick(event: MouseEvent) {
  const target = event.target instanceof Element ? event.target.closest('a, button, summary') : null;
  if (!target || target.closest('[data-analytics-ignore]')) return;
  const href = target.getAttribute('href') || '';
  const text = linkLabel(target);
  const location = linkLocation(target);
  const menu = target.closest('.a-menu') ? 'mobile' : target.closest('.a-header nav') ? 'desktop' : null;
  if (target.tagName === 'SUMMARY' && target.closest('.a-menu')) {
    trackEvent('menu_toggle', { menu_state: target.closest('details')?.open ? 'close' : 'open' });
    return;
  }
  if (menu) {
    trackEvent('menu_click', { menu_type: menu, link_text: text, link_url: href });
    return;
  }
  if (href.startsWith('mailto:')) {
    trackEvent('contact_email_click', { cta_location: location });
    return;
  }
  const isContactCta = /^(https:\/\/polpo-ai\.com)?\/contatti(\/?$|[?#])/.test(href) || href === '#contatti';
  if (isContactCta || target.classList.contains('a-button') || target.classList.contains('a-header-contact')) {
    trackEvent('cta_click', { cta_text: text, cta_url: href, cta_location: location });
  }
}

function useEngagementTracking(active: boolean, pathname: string) {
  useEffect(() => {
    if (!active) return;
    document.addEventListener('click', onDocumentClick, { capture: true });
    return () => document.removeEventListener('click', onDocumentClick, { capture: true });
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const sent = new Set<number>();
    let frame = 0;
    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const threshold of crossedScrollThresholds(percent, sent)) {
        sent.add(threshold);
        trackEvent('scroll_depth', { percent_scrolled: threshold, page_path: pathname });
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [active, pathname]);

  useEffect(() => {
    if (!active || typeof IntersectionObserver === 'undefined') return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const name = sectionName(entry.target);
        observer.unobserve(entry.target);
        if (!name || seen.has(name)) continue;
        seen.add(name);
        trackEvent('section_view', { section_name: name, page_path: pathname });
      }
    }, { threshold: 0.4 });
    // Le pagine si montano dopo il cambio di percorso: si aspetta un frame prima di osservare.
    const frame = window.requestAnimationFrame(() => {
      document.querySelectorAll('main section').forEach(section => observer.observe(section));
    });
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); };
  }, [active, pathname]);
}

function reportWebVital(metric: { name: string; value: number; id: string; rating?: string }) {
  trackEvent('web_vitals', {
    metric_name: metric.name,
    metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_rating: metric.rating,
    page_path: window.location.pathname,
    non_interaction: true,
  });
}

export default function SiteAnalytics() {
  const pathname = usePathname() || '/';
  const privatePath = isPrivatePath(pathname);
  const [choice, setChoice] = useState<ConsentChoice | null | undefined>(undefined);
  const [bannerOpen, setBannerOpen] = useState(false);
  const firstButton = useRef<HTMLButtonElement>(null);
  const reopened = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const stored = readConsent();
    setChoice(stored?.analytics ?? null);
    setBannerOpen(!stored);
    const reopen = () => { reopened.current = true; setBannerOpen(true); };
    // Scelta fatta in un'altra scheda: la revoca vale subito anche qui (documento nuovo se i tracker erano attivi).
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== CONSENT_STORAGE_KEY) return;
      const next = readConsent();
      if (next?.analytics !== 'granted' && trackersLoaded()) {
        stopAnalytics();
        window.location.reload();
        return;
      }
      setChoice(next?.analytics ?? null);
      setBannerOpen(!next);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener(CONSENT_OPEN_EVENT, reopen); window.removeEventListener('storage', onStorage); };
  }, []);

  const active = enabled && choice === 'granted' && !privatePath;
  useEffect(() => { if (active) startAnalytics(ids); }, [active]);
  useEngagementTracking(active, pathname);

  // GA4 e Clarity non si spengono in un documento già aperto: verso i percorsi riservati
  // si passa sempre da un caricamento completo, che arriva senza tracker e con la CSP del middleware.
  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      if (!trackersLoaded() || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!link || (link.getAttribute('target') && link.getAttribute('target') !== '_self')) return;
      if (!privatePathOf(link.getAttribute('href') || '', window.location.origin)) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign((link as HTMLAnchorElement).href);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  // Ripiego per navigazioni senza click (indietro/avanti, router.push): documento nuovo.
  useEffect(() => { if (privatePath && trackersLoaded()) window.location.reload(); }, [privatePath]);

  // Callback stabile: Next registra di nuovo gli osservatori se cambia. trackEvent controlla da sé il consenso.
  useReportWebVitals(reportWebVital);

  // Il focus va al banner solo quando l'utente lo riapre, non al primo caricamento.
  useEffect(() => { if (bannerOpen && reopened.current) firstButton.current?.focus({ preventScroll: true }); }, [bannerOpen]);

  const decide = useCallback((value: ConsentChoice) => {
    saveConsent(value);
    if (value === 'denied') {
      const wasLoaded = trackersLoaded();
      stopAnalytics();
      // Il consent update non ferma le misurazioni senza cookie di GA4 né Clarity: si ricarica la pagina.
      if (wasLoaded) { window.location.reload(); return; }
    }
    setChoice(value);
    setBannerOpen(false);
  }, []);

  if (!enabled || privatePath || !bannerOpen) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-text" data-analytics-ignore onKeyDown={event => { if (event.key === 'Escape') decide('denied'); }}>
      <button type="button" className="cookie-banner-close" aria-label="Chiudi e continua senza cookie di statistica" onClick={() => decide('denied')}>×</button>
      <p id="cookie-banner-title" className="cookie-banner-title">Cookie di statistica</p>
      <p id="cookie-banner-text">
        Usiamo cookie tecnici, necessari al sito. Con il tuo consenso usiamo anche Google Analytics e Microsoft Clarity
        per capire come viene usato il sito e migliorarlo: niente pubblicità, niente profilazione.
        Puoi cambiare idea quando vuoi da &ldquo;Preferenze cookie&rdquo; in fondo alla pagina. <Link href="/cookie">Cookie policy</Link>
      </p>
      <div className="cookie-banner-actions">
        <button ref={firstButton} type="button" className="cookie-banner-choice" onClick={() => decide('denied')}>Rifiuta</button>
        <button type="button" className="cookie-banner-choice" onClick={() => decide('granted')}>Accetta</button>
      </div>
      {choice && <p className="cookie-banner-current">Scelta attuale: {choice === 'granted' ? 'accettati' : 'rifiutati'}.</p>}
    </div>
  );
}
