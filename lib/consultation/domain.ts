export const sectors = [
  { id:'sport', label:'Sport e circoli', example:'Le richieste dei giocatori arrivano su WhatsApp e poi ricopiamo tutto in agenda.', object:'sport' },
  { id:'beauty', label:'Beauty', example:'Durante i trattamenti arrivano messaggi per spostare gli appuntamenti.', object:'beauty' },
  { id:'restaurant', label:'Ristorazione', example:'Le prenotazioni arrivano da più canali e vorremmo seguirle senza interrompere il servizio.', object:'restaurant' },
  { id:'professional', label:'Studi professionali', example:'Riceviamo documenti via email e riportiamo a mano le informazioni nel gestionale.', object:'studio' },
  { id:'hospitality', label:'Hospitality', example:'Rispondiamo spesso alle stesse domande degli ospiti prima dell’arrivo.', object:'hospitality' },
  { id:'other', label:'Altro', example:'Ogni giorno ripetiamo lo stesso passaggio tra messaggi, file e strumenti diversi.', object:'studio' },
] as const;
export const problems = [
 {id:'bookings',label:'Prenotazioni',detail:'Richieste, disponibilità e appuntamenti'},
 {id:'messages',label:'Messaggi',detail:'Conversazioni e domande ricorrenti'},
 {id:'reminders',label:'Promemoria e cancellazioni',detail:'Conferme, cambi e disdette'},
 {id:'manual',label:'Operazioni manuali',detail:'Copie, documenti e passaggi ripetitivi'},
 {id:'integrations',label:'Integrazioni',detail:'Strumenti che non si parlano'},
] as const;
export const tools = [
 {id:'whatsapp',label:'WhatsApp'}, {id:'phone',label:'Telefono'}, {id:'email',label:'Email'},
 {id:'calendar',label:'Calendari'}, {id:'excel',label:'Excel'}, {id:'management',label:'Gestionali'},
] as const;
export type Sector = typeof sectors[number]['id'];
export type Problem = typeof problems[number]['id'];
export type Tool = typeof tools[number]['id'];
export type Consultation = {
 schemaVersion:1; submissionId:string; journeyId:string; sector:Sector; problems:Problem[]; tools:Tool[];
 managementSoftware:string; details:string; primaryProblem:Problem|'';
 contact:{name:string;businessName:string;email:string;phone:string;preference:''|'email'|'phone'};
 privacyAccepted:true; marketingOptIn:boolean; website:string;
};
export type FieldErrors = Record<string,string>;
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function isUUID(value:unknown):value is string{return typeof value==='string'&&uuid.test(value);}
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
export function text(value:unknown,max:number,multiline=false):string|null{
 if(typeof value!=='string'||value.length>max*2)return null;
 const clean=value.normalize('NFKC').replace(multiline?/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f<>]/g:/[\u0000-\u001f\u007f<>]/g,'').trim();
 return clean.length<=max?clean:null;
}
export function normalizePhone(value:string){const p=value.replace(/[\s().-]/g,'').replace(/^00/,'+');return /^\+[1-9]\d{7,14}$/.test(p)?p:null;}
export function validateContact(value:unknown):{value:Consultation['contact'];errors:FieldErrors}{
 const v=record(value)?value:{};const errors:FieldErrors={};
 const name=text(v.name,120),businessName=text(v.businessName,160),email=text(v.email,254)?.toLowerCase(),rawPhone=text(v.phone,50),preference=v.preference??'';
 if(!name)errors['contact.name']='Inserisci il tuo nome.';
 if(!businessName)errors['contact.businessName']='Inserisci il nome della tua attività.';
 if(email===null||email===undefined||(email&&!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)))errors['contact.email']='Controlla l’indirizzo email.';
 const phone=rawPhone?normalizePhone(rawPhone):'';
 if(rawPhone===null||phone===null)errors['contact.phone']='Indica il telefono con prefisso internazionale, per esempio +39.';
 if(!email&&!rawPhone)errors['contact.email']='Inserisci almeno un’email oppure un telefono.';
 if(!['','email','phone'].includes(String(preference)))errors['contact.preference']='Scegli una preferenza valida.';
 if(preference==='email'&&!email)errors['contact.preference']='Aggiungi l’email per scegliere questo canale.';
 if(preference==='phone'&&!phone)errors['contact.preference']='Aggiungi il telefono per scegliere questo canale.';
 return {value:{name:name||'',businessName:businessName||'',email:email||'',phone:phone||'',preference:preference as Consultation['contact']['preference']},errors};
}
export function parseConsultation(input:unknown):{ok:true;value:Consultation}|{ok:false;errors:FieldErrors}{
 if(!record(input))return {ok:false,errors:{form:'Richiesta non valida.'}};
 const errors:FieldErrors={};if(record(input.contact)&&Object.keys(input.contact).some(k=>!['name','businessName','email','phone','preference'].includes(k)))errors.form='Richiesta non valida.';const allowed=['schemaVersion','submissionId','journeyId','sector','problems','primaryProblem','tools','managementSoftware','details','contact','privacyAccepted','marketingOptIn','website'];
 if(Object.keys(input).some(k=>!allowed.includes(k))||input.schemaVersion!==1)errors.form='Richiesta non valida.';
 if(!isUUID(input.submissionId)||!isUUID(input.journeyId))errors.form='Ricarica il percorso e riprova.';
 if(!sectors.some(x=>x.id===input.sector))errors.sector='Scegli il tuo settore.';
 function list<T extends string>(v:unknown,valid:readonly T[],key:string):T[]{if(!Array.isArray(v)||v.length>valid.length||v.some(x=>!valid.includes(x))){errors[key]='Controlla le opzioni selezionate.';return [];}return valid.filter(x=>v.includes(x));}
 const chosenProblems=list(input.problems,problems.map(x=>x.id),'problems');const chosenTools=list(input.tools,tools.map(x=>x.id),'tools');
 const primaryProblem=input.primaryProblem??(chosenProblems.length===1?chosenProblems[0]:'');
 if(typeof primaryProblem!=='string'||(primaryProblem&&!chosenProblems.includes(primaryProblem as Problem))||(chosenProblems.length>1&&!primaryProblem))errors.primaryProblem='Indica quale dei passaggi selezionati è il principale.';
 const managementSoftware=text(input.managementSoftware,100),details=text(input.details,1000,true),website=text(input.website,200);
 if(managementSoftware===null)errors.managementSoftware='Usa al massimo 100 caratteri.';
 if(details===null)errors.details='Usa al massimo 1000 caratteri.';
 if(website===null||website)errors.form='Richiesta non valida.';
 const contact=validateContact(input.contact);Object.assign(errors,contact.errors);
 if(input.privacyAccepted!==true)errors.privacyAccepted='Leggi l’informativa e conferma la presa visione.';
 if(typeof input.marketingOptIn!=='boolean')errors.marketingOptIn='Controlla la scelta facoltativa.';
 if(input.marketingOptIn===true&&!contact.value.email)errors.marketingOptIn='Per gli aggiornamenti email serve un indirizzo email.';
 if(Object.keys(errors).length)return {ok:false,errors};
 return {ok:true,value:{schemaVersion:1,submissionId:String(input.submissionId),journeyId:String(input.journeyId),sector:input.sector as Sector,problems:chosenProblems,primaryProblem:primaryProblem as Problem|'',tools:chosenTools,managementSoftware:chosenTools.includes('management')?managementSoftware||'':'',details:details||'',contact:contact.value,privacyAccepted:true,marketingOptIn:input.marketingOptIn===true,website:''}};
}
export const eventNames=['start','step_complete','abandon','submit_success','submit_error'] as const;
export type ConsultationEvent={journeyId:string;event:typeof eventNames[number];step:number};
export function parseEvent(input:unknown):ConsultationEvent|null{
 if(!record(input)||Object.keys(input).some(k=>!['journeyId','event','step'].includes(k))||!isUUID(input.journeyId)||!eventNames.includes(input.event as ConsultationEvent['event'])||!Number.isInteger(input.step)||Number(input.step)<1||Number(input.step)>5)return null;
 return {journeyId:input.journeyId,event:input.event as ConsultationEvent['event'],step:Number(input.step)};
}
