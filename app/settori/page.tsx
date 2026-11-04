import Link from 'next/link';
import WorldExplorer from '@/components/landing/WorldExplorer';
import PolpoIcon from '@/components/landing/PolpoIcon';
import { InnerFinale, pageMetadata } from '@/components/inner/InnerPages';
export const metadata = pageMetadata('Automazioni AI per i tuoi settori — I mondi Polpo','Sport e circoli, beauty, ristorazione, studi professionali e hospitality: esplora i mondi Polpo e i possibili flussi da connettere.','settori');
export default function SettoriPage(){return <div className="inner-page"><div className="inner-sector-intro"><nav className="inner-breadcrumb" aria-label="Percorso"><Link href="/">Polpo AI</Link><span aria-hidden="true">/</span><span>Settori</span></nav></div><WorldExplorer asPage/><nav className="inner-related" aria-label="Altri contesti"><p className="a-eyebrow">ALTRI CONTESTI DA ESPLORARE</p><Link href="/chatbot-whatsapp-prenotazioni-studi-medici">Segreteria degli studi medici<PolpoIcon name="outward"/></Link><Link href="/chatbot-whatsapp-prenotazioni-palestre">Palestre e centri fitness<PolpoIcon name="outward"/></Link></nav><InnerFinale/></div>}
