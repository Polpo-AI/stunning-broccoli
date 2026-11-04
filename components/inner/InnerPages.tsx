import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import PolpoIcon from '@/components/landing/PolpoIcon';
import type { Chapter, DetailPage } from './content';

export const analysisHref = 'mailto:info@polpo-ai.com?subject=Analisi%20gratuita%20Polpo%20AI&body=Ciao%20Polpo%2C%0A%0AAttivit%C3%A0%3A%0AProcesso%20da%20semplificare%3A%0AStrumenti%20che%20utilizzo%3A%0ARecapito%3A';
export function pageMetadata(title: string, description: string, slug: string): Metadata {
 return { title, description, alternates:{canonical:`https://polpo-ai.com/${slug}`}, openGraph:{title,description,url:`https://polpo-ai.com/${slug}`,siteName:'Polpo AI',locale:'it_IT',type:'website',images:[{url:'/worlds-stage.webp',width:1536,height:1024,alt:'L’universo tridimensionale di Polpo AI'}]},twitter:{card:'summary_large_image',title,description,images:['/worlds-stage.webp']} };
}
export function InnerHero({ eyebrow, lead, emphasis, intro, world='studio', solution=false, art='/worlds-stage.webp', showObject=true, trail }: {eyebrow:string;lead:string;emphasis:string;intro:string;world?:string;solution?:boolean;art?:string;showObject?:boolean;trail?:{label:string;href:string}}) {
 return <section className="inner-hero">
  <div className="inner-hero-art" aria-hidden="true"><Image src={art} alt="" fill priority sizes="100vw" quality={85}/></div>
  <div className="inner-hero-veil" aria-hidden="true"/>
  <nav className="inner-breadcrumb" aria-label="Percorso"><Link href="/">Polpo AI</Link><span aria-hidden="true">/</span><Link href={trail?.href??(solution?'/soluzioni':'/settori')} aria-current={trail?'page':undefined}>{trail?.label??(solution?'Soluzioni':'Mondi Polpo')}</Link></nav>
  <div className="inner-hero-copy"><p className="a-eyebrow">{eyebrow}</p><h1>{lead}{' '}<br/><em>{emphasis}</em></h1><p>{intro}</p><a href={analysisHref} className="a-button">Richiedi la tua analisi gratuita<PolpoIcon name="outward"/></a></div>
  {showObject && <div className="inner-hero-object" aria-hidden="true"><Image src={`/worlds-${world}.webp`} alt="" width={512} height={512} sizes="(max-width:760px) 170px, 300px" quality={85}/></div>}
  <span className="inner-hero-caption" aria-hidden="true">LA STESSA INTELLIGENZA. IL TUO MODO DI LAVORARE.</span>
 </section>;
}
export function InnerChapters({ label='UN FLUSSO. PIÙ POSSIBILITÀ.', chapters }: {label?:string;chapters:Chapter[]}) {
 return <section className="inner-chapters" aria-label="Il percorso della soluzione"><div className="inner-chapter-art" aria-hidden="true"><Image src="/immersive-a-depth.webp" alt="" fill sizes="100vw" quality={80}/></div><p className="a-eyebrow">{label}</p><ol>{chapters.map((chapter,index)=><li key={chapter.label}><span className="inner-chapter-index" aria-hidden="true">0{index+1}</span><div><p className="inner-kicker">{chapter.label}</p><h2>{chapter.title}</h2><p>{chapter.text}</p></div></li>)}</ol></section>;
}
export function InnerFinale({ title='Partiamo dal tuo lavoro.', emphasis='Troviamo il punto da connettere.' }: {title?:string;emphasis?:string}) {
 return <section className="inner-finale"><div aria-hidden="true" className="inner-finale-orbit"/><p className="a-eyebrow">IL PRIMO PASSO È UNA CONVERSAZIONE</p><h2>{title}{' '}<br/><em>{emphasis}</em></h2><p>Raccontaci come lavori e quali passaggi vorresti semplificare.{' '}<br/>Valutiamo insieme cosa può avere senso automatizzare.</p><a className="a-button" href={analysisHref}>Richiedi la tua analisi gratuita<PolpoIcon name="outward"/></a><small>Si apre la tua app email, indirizzata a info@polpo-ai.com.</small></section>;
}
export function InnerDetail({page}:{page:DetailPage}) {
 const service = {'@context':'https://schema.org','@type':'Service',name:page.title,description:page.description,url:`https://polpo-ai.com/${page.slug}`,provider:{'@id':'https://polpo-ai.com/#organization'}};
 const faq = {'@context':'https://schema.org','@type':'FAQPage',mainEntity:page.faq.map(item=>({'@type':'Question',name:item.q,acceptedAnswer:{'@type':'Answer',text:item.a}}))};
 const breadcrumb = {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://polpo-ai.com'},{'@type':'ListItem',position:2,name:page.eyebrow.startsWith('SOLUZIONI')?'Soluzioni':'Settori',item:`https://polpo-ai.com/${page.eyebrow.startsWith('SOLUZIONI')?'soluzioni':'settori'}`},{'@type':'ListItem',position:3,name:page.title,item:`https://polpo-ai.com/${page.slug}`}]};
 return <div className="inner-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([service,faq,breadcrumb])}}/>
  <InnerHero eyebrow={page.eyebrow} lead={page.lead} emphasis={page.emphasis} intro={page.intro} world={page.world} solution={page.eyebrow.startsWith('SOLUZIONI')} art={page.slug==='chatbot-whatsapp-prenotazioni'?'/immersive-a-hero.webp':undefined} showObject={page.slug!=='chatbot-whatsapp-prenotazioni'}/>
  <InnerChapters chapters={page.chapters}/>
  <section className="inner-faq"><div><p className="a-eyebrow">PRIMA DI COMINCIARE</p><h2>Le domande giuste.{' '}<br/><em>Le risposte, insieme.</em></h2></div><div>{page.faq.map(item=><details key={item.q}><summary>{item.q}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true"><path d="m5 9 7 7 7-7"/></svg></summary><p>{item.a}</p></details>)}</div></section>
  <nav className="inner-related" aria-label="Continua a esplorare"><p className="a-eyebrow">IL FILO CONTINUA</p>{page.related.map(link=><Link key={link.href} href={link.href}>{link.title}<PolpoIcon name="outward"/></Link>)}</nav>
  <InnerFinale/>
 </div>;
}
