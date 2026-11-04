// Optional local integration harness; no remote database URLs are accepted.
const {pathToFileURL}=require('node:url'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{randomUUID}=require('node:crypto'),{spawnSync}=require('node:child_process');
(async()=>{
 if(!process.env.POLPO_TEST_EMBEDDED_MODULE||!process.env.POLPO_TEST_PG_MODULE)throw Error('Set optional embedded-postgres and pg module paths; never production credentials');
 const {default:EmbeddedPostgres}=await import(pathToFileURL(process.env.POLPO_TEST_EMBEDDED_MODULE));
 const databaseDir=fs.mkdtempSync(path.join(os.tmpdir(),'polpo-consultation-postgres-')),password=randomUUID(),port=55487;
 const pg=new EmbeddedPostgres({databaseDir,user:'postgres',password,port,persistent:true,onLog:()=>{},onError:()=>{}});
 try{
  await pg.initialise();await pg.start();
  const result=spawnSync(process.execPath,['scripts/test-consultation-postgres.cjs'],{stdio:'inherit',env:{...process.env,POLPO_TEST_ISOLATED:'true',POLPO_TEST_DATABASE_URL:`postgresql://postgres:${password}@127.0.0.1:${port}/postgres`}});
  if(result.status!==0)throw Error('SQL_TEST_FAILED');
  await pg.stop();await pg.start();const client=pg.getPgClient();await client.connect();
  const resultAfterRestart=await client.query('select count(*) from public.polpo_consultation_requests');await client.end();
  if(Number(resultAfterRestart.rows[0].count)!==1)throw Error('RESTART_PERSISTENCE_FAILED');
  console.log('Restart persistence: passed (local isolated PostgreSQL only)');
 }finally{await pg.stop();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
