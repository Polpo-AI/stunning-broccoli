import type { ConsultationEvent } from '@/lib/consultation/domain';
export function createTelemetry(enabled:boolean){
 const key='polpo-consultation-journey';let state:{id:string;created:number;emitted:string[]};
 try{const saved=JSON.parse(sessionStorage.getItem(key)||'null');state=saved&&Date.now()-saved.created<2*60*60*1000?saved:{id:crypto.randomUUID(),created:Date.now(),emitted:[]};}catch{state={id:crypto.randomUUID(),created:Date.now(),emitted:[]};}
 const emitted=new Set(state.emitted);const save=()=>{try{sessionStorage.setItem(key,JSON.stringify({...state,emitted:Array.from(emitted)}));}catch{/* No form data is stored and storage is optional. */}};save();
 return {journeyId:state.id,emit(event:ConsultationEvent['event'],step:number){
  const id=`${event}:${step}`;if(emitted.has(id))return;emitted.add(id);save();if(!enabled)return;
  const body=JSON.stringify({journeyId:state.id,event,step});
  if(event==='abandon'&&navigator.sendBeacon){navigator.sendBeacon('/api/consultation/events',new Blob([body],{type:'application/json'}));return;}
  void fetch('/api/consultation/events',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true}).catch(()=>{});
 }};
}
