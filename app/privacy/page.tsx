import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { previewAvailable } from '@/lib/consultation/server-config';
import { privacyDocument } from '@/lib/consultation/privacy';
import { privacySections } from '@/lib/consultation/privacy-content';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Informativa privacy — Polpo AI',robots:{index:false,follow:false},alternates:{canonical:'https://polpo-ai.com/privacy'}};
export default function PrivacyPage(){
 if(!previewAvailable()&&privacyDocument.status!=='approved')notFound();
 return <div className="privacy-draft"><Link href="/contatti">Torna al percorso</Link><p className="a-eyebrow">POLPO AI · PRIVACY</p><h1>La tua richiesta.<br/><em>I tuoi dati.</em></h1>{privacyDocument.status!=='approved'&&<p className="privacy-status">Testo predisposto per revisione. L’invio resta disabilitato finché configurazioni e verifiche non sono complete.</p>}{privacySections.map(section=><section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<p><a href="mailto:info@polpo-ai.com">info@polpo-ai.com</a> · <a href="https://www.garanteprivacy.it/home/diritti/come-agire-per-tutelare-i-tuoi-dati-personali">Esercitare i diritti: Garante Privacy</a></p></div>;
}
