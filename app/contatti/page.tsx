import Consultation from '@/components/consultation/Consultation';
import { pageMetadata } from '@/components/inner/InnerPages';
import { readConfig } from '@/lib/consultation/server-config';
import { privacyDocument } from '@/lib/consultation/privacy';
export const dynamic='force-dynamic';
export const metadata=pageMetadata('Contatti — Richiedi la tua analisi gratuita','Racconta a Polpo AI la tua attività e i passaggi da semplificare. Richiedi un’analisi gratuita.','contatti');
export default function ContattiPage(){const config=readConfig();return <Consultation canSubmit={config.enabled} analytics={config.analytics} privacyApproved={privacyDocument.status==='approved'}/>;}
