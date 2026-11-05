// Export by default. --check is read-only; --apply-schema requires explicit approval.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),ts=require('typescript');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'polpo-schema-'));
for(const file of ['domain.ts','crm-mapping.ts','properties.ts'])fs.writeFileSync(path.join(dir,file.replace('.ts','.js')),ts.transpileModule(fs.readFileSync('lib/consultation/'+file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const {hubspotProperties}=require(path.join(dir,'properties.js'));
const apply=process.argv.includes('--apply-schema'),check=process.argv.includes('--check');
if(!apply&&!check)console.log(JSON.stringify({group:{name:'contact_information',label:'Informazioni contatto'},properties:hubspotProperties},null,2));
else (async()=>{
 const token=process.env.POLPO_HUBSPOT_ACCESS_TOKEN,expected=process.env.POLPO_HUBSPOT_PORTAL_ID;
 if(!token)throw Error('POLPO_HUBSPOT_ACCESS_TOKEN_REQUIRED');
 if(expected!=='149703632')throw Error('HUBSPOT_EXPECTED_PORTAL_REQUIRED');
 if(apply&&process.env.POLPO_SCHEMA_APPLY_APPROVED!=='true')throw Error('POLPO_SCHEMA_EXPLICIT_APPROVAL_REQUIRED');
 async function call(url,method='GET',body){const r=await fetch('https://api.hubapi.com'+url,{method,headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('HUBSPOT_SCHEMA_HTTP_'+r.status);return r.status===204?null:r.json();}
 const account=await call('/integrations/v1/me');if(String(account.portalId??account.hubId??'')!==expected)throw Error('HUBSPOT_PORTAL_MISMATCH');
 const base='/crm/properties/2026-09/contacts';let {results}=await call(base);if(!Array.isArray(results))throw Error('HUBSPOT_SCHEMA_INVALID_RESPONSE');
 if(apply)for(const property of hubspotProperties){const actual=results.find(x=>x.name===property.name);if(!actual){await call(base,'POST',property);console.log(JSON.stringify({created:property.name}));continue;}if(actual.type!==property.type||actual.fieldType!==property.fieldType||(property.hasUniqueValue&&!actual.hasUniqueValue))throw Error('HUBSPOT_EXISTING_SCHEMA_INCOMPATIBLE');const missing=(property.options||[]).filter(o=>!actual.options?.some(a=>a.value===o.value));if(missing.length){if(property.name!=='polpo_strumenti'||missing.some(o=>o.value!=='telefono'))throw Error('HUBSPOT_UNEXPECTED_OPTION_CHANGE');await call(base+'/'+property.name,'PATCH',{options:[...actual.options,...missing]});console.log(JSON.stringify({extended:property.name,addedOptions:missing.map(o=>o.value)}));}}
 if(apply)({results}=await call(base));
 const mismatches=[];for(const e of hubspotProperties){const a=results.find(p=>p.name===e.name);if(!a){mismatches.push(e.name+':missing');continue;}if(a.type!==e.type||a.fieldType!==e.fieldType||(e.hasUniqueValue&&!a.hasUniqueValue))mismatches.push(e.name+':type_or_uniqueness');if(e.options&&e.options.some(o=>!a.options?.some(v=>v.value===o.value)))mismatches.push(e.name+':options');}
 console.log(JSON.stringify({mode:apply?'approved-schema-setup':'read-only',propertiesChecked:hubspotProperties.length,mismatches,portalIdentityVerified:true,deliveryVerified:false}));if(mismatches.length)process.exitCode=1;
})().catch(e=>{console.error(/^HUBSPOT_|^POLPO_/.test(e.message)?e.message:'SCHEMA_CHECK_FAILED');process.exitCode=1;});
