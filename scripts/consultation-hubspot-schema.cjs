// Default: export the proposed manifest. --check: read-only verification, no CRM writes.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),ts=require('typescript');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'polpo-schema-'));
for(const file of ['domain.ts','properties.ts'])fs.writeFileSync(path.join(dir,file.replace('.ts','.js')),ts.transpileModule(fs.readFileSync('lib/consultation/'+file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const {hubspotProperties}=require(path.join(dir,'properties.js'));
if(!process.argv.includes('--check'))console.log(JSON.stringify({group:{name:'polpo_consultation',label:'Polpo — mini-consulenza',displayOrder:20},properties:hubspotProperties},null,2));
else (async()=>{
 const token=process.env.POLPO_HUBSPOT_ACCESS_TOKEN;if(!token)throw Error('POLPO_HUBSPOT_ACCESS_TOKEN_REQUIRED');
 const res=await fetch('https://api.hubapi.com/crm/properties/2026-09/contacts',{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(10000)});
 if(!res.ok)throw Error('HUBSPOT_SCHEMA_HTTP_'+res.status);
 const {results}=await res.json();if(!Array.isArray(results))throw Error('HUBSPOT_SCHEMA_INVALID_RESPONSE');
 const mismatches=[];
 for(const expected of hubspotProperties){const actual=results.find(p=>p.name===expected.name);if(!actual){mismatches.push(expected.name+':missing');continue;}if(actual.type!==expected.type||actual.fieldType!==expected.fieldType||(expected.hasUniqueValue&&!actual.hasUniqueValue))mismatches.push(expected.name+':type_or_uniqueness');if(expected.options&&expected.options.some(o=>!actual.options?.some(a=>a.value===o.value)))mismatches.push(expected.name+':options');}
 console.log(JSON.stringify({mode:'read-only',propertiesChecked:hubspotProperties.length,mismatches,portalIdentityVerified:false,deliveryVerified:false}));if(mismatches.length)process.exitCode=1;
})().catch(e=>{console.error(/^HUBSPOT_|^POLPO_/.test(e.message)?e.message:'SCHEMA_CHECK_FAILED');process.exitCode=1;});
