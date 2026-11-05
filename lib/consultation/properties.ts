import { sectors, problems, tools } from './domain';
const text=(name:string,label:string,textarea=false)=>({name,label,type:'string',fieldType:textarea?'textarea':'text',groupName:'polpo_consultation'});
const enumeration=(name:string,label:string,options:readonly {id:string;label:string}[],multiple=false)=>({name,label,type:'enumeration',fieldType:multiple?'checkbox':'select',groupName:'polpo_consultation',options:options.map((x,i)=>({label:x.label,value:x.id,displayOrder:i}))});
const date=(name:string,label:string)=>({name,label,type:'datetime',fieldType:'date',groupName:'polpo_consultation'});
export const hubspotProperties=[
 {...text('polpo_contact_key','Polpo — identity key'),hasUniqueValue:true},
 enumeration('polpo_sector','Polpo — settore',sectors),
 enumeration('polpo_problems','Polpo — problemi operativi',problems,true),
 enumeration('polpo_tools','Polpo — strumenti',tools,true),
 text('polpo_management_software','Polpo — gestionale'),text('polpo_operational_context','Polpo — contesto operativo',true),
 text('polpo_request_id','Polpo — ultima richiesta'),date('polpo_received_at','Polpo — acquisizione richiesta'),
 text('polpo_business_name','Polpo — attività dichiarata'),text('polpo_full_name','Polpo — nome dichiarato'),
 enumeration('polpo_contact_preference','Polpo — preferenza contatto',[{id:'unspecified',label:'Non indicata'},{id:'email',label:'Email'},{id:'phone',label:'Telefono'}]),
 text('polpo_source','Polpo — provenienza'),text('polpo_privacy_version','Polpo — versione informativa'),date('polpo_privacy_ack_at','Polpo — presa visione'),
 {name:'polpo_request_marketing_opt_in',label:'Polpo — opt-in email in questa richiesta',type:'bool',fieldType:'booleancheckbox',groupName:'polpo_consultation'},
 date('polpo_marketing_consent_at','Polpo — ultimo opt-in email esplicito'),text('polpo_marketing_consent_version','Polpo — testo ultimo opt-in email'),
 enumeration('polpo_company_match_status','Polpo — associazione azienda',[{id:'matched_existing_domain',label:'Dominio aziendale esistente'},{id:'manual_review',label:'Da verificare manualmente'},{id:'existing_kept',label:'Associazione esistente conservata'}]),
];
