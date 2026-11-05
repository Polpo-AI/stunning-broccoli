import {headers} from 'next/headers';
import {notFound} from 'next/navigation';
import {randomUUID} from 'node:crypto';
import type {Metadata} from 'next';
import Consultation from '@/components/consultation/Consultation';
import {readConfig} from '@/lib/consultation/server-config';
import {privacyDocument} from '@/lib/consultation/privacy';
import {supportedContactLegalBasis} from '@/lib/consultation/legal-basis';
import {productionTestConfig,productionTestAuthenticated} from '@/lib/consultation/production-test';
export const dynamic='force-dynamic';export const runtime='nodejs';
export const metadata:Metadata={title:'Prova riservata mini-consulenza',robots:{index:false,follow:false}};
export default async function ProductionTest(){
 const test=productionTestConfig();if(!productionTestAuthenticated((await headers()).get('authorization'),test))notFound();
 const c=readConfig();const ready=c.workerEnabled&&supportedContactLegalBasis(c.hubspotLegalBasis)&&privacyDocument.status==='approved';
 return <Consultation canSubmit={ready} analytics={false} privacyApproved={privacyDocument.status==='approved'} testId={randomUUID()}/>;
}
