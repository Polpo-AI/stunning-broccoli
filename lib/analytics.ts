// Analytics del sito pubblico: GA4 + Microsoft Clarity, caricati solo dopo il consenso.
// Consent Mode v2 "base": nessun tag Google o Clarity parte prima della scelta dell'utente;
// con "Rifiuta" non si carica niente. Vercel Analytics (senza cookie) resta a parte, in SiteMetrics.
// Gli eventi non portano mai dati personali: solo codici, testi dei pulsanti e percorsi.

export const CONSENT_STORAGE_KEY = 'polpo-cookie-consent';
/** Cambiare la versione quando cambiano strumenti o finalità: il banner ricompare a tutti. */
export const CONSENT_VERSION = 1;
/** Il Garante (linee guida cookie 10/06/2021) sconsiglia di riproporre il banner prima di 6 mesi. */
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export const CONSENT_OPEN_EVENT = 'polpo:open-cookie-preferences';
export const CONSENT_CHANGE_EVENT = 'polpo:cookie-consent-change';

export type ConsentChoice = 'granted' | 'denied';
export type StoredConsent = { v: number; analytics: ConsentChoice; at: number };

const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;
const CLARITY_ID_PATTERN = /^[a-z0-9]{6,20}$/;

export function gaMeasurementId(value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID): string | null {
  const id = value?.trim();
  return id && GA_ID_PATTERN.test(id) ? id : null;
}

export function clarityProjectId(value = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID): string | null {
  const id = value?.trim();
  return id && CLARITY_ID_PATTERN.test(id) ? id : null;
}

/** Percorsi con flussi riservati (ricerca padel, prove del modulo): niente tracker, CSP restrittiva. */
export function isPrivatePath(path: string): boolean {
  return path === '/ricerca' || path.startsWith('/ricerca/') || path.startsWith('/contatti/prova');
}

export function parseConsent(raw: string | null, now = Date.now()): StoredConsent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<StoredConsent>;
    if (value.v !== CONSENT_VERSION) return null;
    if (value.analytics !== 'granted' && value.analytics !== 'denied') return null;
    if (typeof value.at !== 'number' || !Number.isFinite(value.at)) return null;
    if (value.at > now + 60_000 || now - value.at > CONSENT_MAX_AGE_MS) return null;
    return { v: value.v, analytics: value.analytics, at: value.at };
  } catch {
    return null;
  }
}

export function readConsent(): StoredConsent | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveConsent(analytics: ConsentChoice): StoredConsent {
  const value: StoredConsent = { v: CONSENT_VERSION, analytics, at: Date.now() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* Storage bloccato: la scelta vale solo per questa pagina, il banner ricomparirà. */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
  return value;
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

type Gtag = (...args: unknown[]) => void;
type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    clarity?: ClarityFn;
    __polpoAnalytics?: { ga?: string; clarity?: string; granted: boolean };
  }
}

function state() {
  if (!window.__polpoAnalytics) window.__polpoAnalytics = { granted: false };
  return window.__polpoAnalytics;
}

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js vuole l'oggetto `arguments`, non un array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    // Consent Mode v2: tutto negato di default, aggiornato solo dopo "Accetta".
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    });
  }
  return window.gtag;
}

function addScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/** Carica GA4 e Clarity. Da chiamare solo con consenso "granted" e fuori dai percorsi riservati. */
export function startAnalytics(ids: { ga: string | null; clarity: string | null }) {
  const s = state();
  s.granted = true;
  if (ids.ga) {
    const gtag = ensureGtag();
    gtag('consent', 'update', { analytics_storage: 'granted' });
    if (s.ga !== ids.ga) {
      s.ga = ids.ga;
      gtag('js', new Date());
      gtag('config', ids.ga, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_flags: 'SameSite=Lax;Secure',
      });
      addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids.ga)}`, 'polpo-ga4');
    }
  }
  if (ids.clarity) {
    if (!window.clarity) {
      const clarity: ClarityFn = function () {
        // eslint-disable-next-line prefer-rest-params
        (clarity.q = clarity.q || []).push(arguments);
      };
      window.clarity = clarity;
    }
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
    if (s.clarity !== ids.clarity) {
      s.clarity = ids.clarity;
      addScript(`https://www.clarity.ms/tag/${encodeURIComponent(ids.clarity)}`, 'polpo-clarity');
    }
  }
}

/** GA4 o Clarity già caricati in questo documento: non si possono "scaricare", serve un documento nuovo. */
export function trackersLoaded(): boolean {
  const s = typeof window === 'undefined' ? undefined : window.__polpoAnalytics;
  return Boolean(s?.ga || s?.clarity);
}

/** Percorso riservato raggiunto da un link, oppure null. */
export function privatePathOf(href: string, origin: string): string | null {
  try {
    const url = new URL(href, origin);
    return url.origin === origin && isPrivatePath(url.pathname) ? url.pathname : null;
  } catch {
    return null;
  }
}

const TRACKER_COOKIES = /^(_ga(_.*)?|_gid|_gat.*|_clck|_clsk|CLID|ANONCHK|MR|MUID|SM)$/;

/** Revoca: aggiorna i consensi dei tag già caricati e cancella i loro cookie di primo livello. */
export function stopAnalytics() {
  const s = state();
  s.granted = false;
  if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
  if (window.clarity) {
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
    window.clarity('consent', false);
  }
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim();
    if (!name || !TRACKER_COOKIES.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

export type EventParams = Record<string, string | number | boolean | undefined>;

const MAX_PARAM_LENGTH = 100;
const EMAIL_LIKE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_LIKE = /\+?\d[\d\s().-]{7,}\d/;

/** Ripulisce i parametri: niente testi lunghi, niente email o numeri di telefono. */
export function sanitizeParams(params: EventParams = {}): Record<string, string | number | boolean> {
  const clean: Record<string, string | number | boolean> = {};
  for (const [key, raw] of Object.entries(params)) {
    if (raw === undefined || !/^[a-z][a-z0-9_]{0,39}$/.test(key)) continue;
    if (typeof raw === 'string') {
      const value = raw.replace(/\s+/g, ' ').trim().slice(0, MAX_PARAM_LENGTH);
      if (!value || EMAIL_LIKE.test(value) || PHONE_LIKE.test(value)) continue;
      clean[key] = value;
    } else if (typeof raw === 'number') {
      if (Number.isFinite(raw)) clean[key] = raw;
    } else {
      clean[key] = raw;
    }
  }
  return clean;
}

/** Invia un evento a GA4 (e lo marca in Clarity) solo con consenso dato e fuori dai percorsi riservati. */
export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === 'undefined') return;
  const s = window.__polpoAnalytics;
  if (!s?.granted || isPrivatePath(window.location.pathname)) return;
  if (!/^[a-z][a-z0-9_]{0,39}$/.test(name)) return;
  if (s.ga && window.gtag) window.gtag('event', name, sanitizeParams(params));
  if (s.clarity && window.clarity) window.clarity('event', name);
}

/** Nome leggibile di una sezione: id, poi titolo collegato da aria-labelledby, poi aria-label. */
export function sectionName(section: Element | null): string | undefined {
  if (!section) return undefined;
  const labelled = section.getAttribute('aria-labelledby');
  const title = labelled ? section.ownerDocument.getElementById(labelled)?.textContent : null;
  const name = section.getAttribute('data-analytics-section') || section.id || title || section.getAttribute('aria-label');
  return name ? name.replace(/\s+/g, ' ').trim().slice(0, MAX_PARAM_LENGTH) || undefined : undefined;
}

export const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;

/** Soglie di scroll appena superate, data la percentuale corrente e quelle già inviate. */
export function crossedScrollThresholds(percent: number, sent: ReadonlySet<number>): number[] {
  return SCROLL_THRESHOLDS.filter(t => percent >= t && !sent.has(t));
}
