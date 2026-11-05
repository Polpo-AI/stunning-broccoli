-- Run on an isolated DB with both research migrations installed. Rolls back fixtures.
begin;
set local role service_role;
do $$
declare r record;
begin
 select * into r from public.research_submit_response('giocatori','padel-surveys-v2','{"synthetic":["test"]}',null,repeat('a',64),repeat('b',64),repeat('c',64),'14_17','padel-research-privacy-v1');
 assert r.code='accepted';
 assert (select expires_at=acquired_at+interval '90 days' from research_private.survey_responses where id=r.response_id);
 assert (select age_band='14_17' and expires_at=acquired_at+interval '24 months' from research_private.consent_evidence where subject_hash=repeat('a',64));
 select * into r from public.research_submit_response('giocatori','padel-surveys-v2','{"synthetic":["test"]}',null,repeat('a',64),repeat('b',64),repeat('c',64),'14_17','padel-research-privacy-v1'); assert r.code='duplicate';
 select * into r from public.research_withdraw('response',repeat('a',64),repeat('d',64)); assert r.code='revoked';
 assert not exists(select 1 from research_private.survey_responses where idempotency_hash=repeat('a',64));
 assert (select withdrawn_at is not null from research_private.consent_evidence where subject_hash=repeat('a',64));
 select * into r from public.research_submit_response('giocatori','padel-surveys-v2','{"synthetic":["test"]}',null,repeat('a',64),repeat('b',64),repeat('c',64),'14_17','padel-research-privacy-v1'); assert r.code='conflict';
 select * into r from public.research_submit_contact('synthetic@example.test',true,false,'padel-research-privacy-v1',repeat('e',64),repeat('f',64),repeat('c',64),'18_plus'); assert r.code='accepted';
 assert (select expires_at=acquired_at+interval '90 days' from research_private.survey_contacts where id=r.contact_id);
 select * into r from public.research_withdraw('contact',repeat('e',64),repeat('d',64)); assert r.code='revoked';
 assert not exists(select 1 from research_private.survey_contacts where idempotency_hash=repeat('e',64));
 -- Expired consent evidence purges; unexpired proof survives response/contact deletion.
 update research_private.consent_evidence set expires_at=now()-interval '1 second' where subject_hash=repeat('a',64);
 perform public.research_delete_expired();
 assert not exists(select 1 from research_private.consent_evidence where subject_hash=repeat('a',64));
 assert exists(select 1 from research_private.consent_evidence where subject_hash=repeat('e',64));
end $$;
set local role anon;
do $$ begin
 begin perform public.research_withdraw('response',repeat('a',64),repeat('d',64)); raise exception 'anon should be denied'; exception when insufficient_privilege then null; end;
 begin perform 1 from research_private.survey_responses; raise exception 'anon should be denied'; exception when insufficient_privilege then null; end;
end $$;
rollback;
