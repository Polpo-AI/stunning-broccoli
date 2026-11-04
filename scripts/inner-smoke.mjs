import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3111';
const routes=['/soluzioni','/settori','/metodo','/contatti','/agenti-ai','/chatbot-whatsapp-prenotazioni','/chatbot-whatsapp-prenotazioni-padel','/chatbot-whatsapp-prenotazioni-centri-estetici','/chatbot-whatsapp-prenotazioni-ristoranti','/chatbot-whatsapp-prenotazioni-hotel-bb','/chatbot-whatsapp-prenotazioni-studi-medici','/chatbot-whatsapp-prenotazioni-palestre'];
test('internal pages preserve HTML content, canonical URLs and preview policy',async()=>{
 for(const route of routes){
  const res=await fetch(base+route);assert.equal(res.status,200,route);
  const html=await res.text();
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,route+' unique h1');
  assert.ok(html.includes(`href="https://polpo-ai.com${route}"`),route+' canonical');
  assert.ok(html.includes('noindex, nofollow'),route+' preview noindex');
  assert.ok(html.includes('mailto:info@polpo-ai.com'),route+' real CTA');
  assert.ok(!html.includes('framer-motion'),route+' no old animation component');
  for(const link of ['/soluzioni','/settori','/metodo','/contatti']) assert.ok(html.includes(`href="${link}"`),route+' links to '+link);
 }
});
test('sitemap includes real hubs and retains existing sector URLs',async()=>{
 const xml=await(await fetch(base+'/sitemap.xml')).text();
 for(const route of routes)assert.ok(xml.includes(`https://polpo-ai.com${route}`),route);
 assert.ok(!xml.includes('/creazione-siti-web'));
});
