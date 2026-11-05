-- Approved survey consent, separate evidence and 90-day retention. No CRM changes.
begin;
alter table research_private.survey_responses alter column expires_at set default (now() + interval '90 days');
alter table research_private.survey_contacts alter column expires_at set default (now() + interval '90 days');
update research_private.survey_responses set expires_at=least(expires_at, acquired_at + interval '90 days');
update research_private.survey_contacts set expires_at=least(expires_at, acquired_at + interval '90 days');
create table research_private.consent_evidence (
  purpose text not null check (purpose in ('response', 'contact')),
  subject_hash text not null check(subject_hash ~ '^[0-9a-f]{64}$'),
  privacy_version text not null check(privacy_version='padel-research-privacy-v1'),
  age_band text not null check(age_band in ('14_17','18_plus')),
  acquired_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 months'),
  withdrawn_at timestamptz,
  primary key(purpose, subject_hash)
);
alter table research_private.consent_evidence enable row level security;
revoke all on research_private.consent_evidence from public,anon,authenticated;
grant select,insert,update,delete on research_private.consent_evidence to service_role;
create index consent_evidence_expiry_idx on research_private.consent_evidence(expires_at);
alter table research_private.survey_contacts add constraint no_survey_marketing check (not marketing_opt_in and research_contact);
alter table research_private.survey_rate_limits drop constraint survey_rate_limits_purpose_check;
alter table research_private.survey_rate_limits add constraint survey_rate_limits_purpose_check check(purpose in ('response','contact','withdrawal'));
drop function public.research_submit_response(text,text,jsonb,text,text,text,text);
drop function public.research_submit_contact(text,boolean,boolean,text,text,text,text);
create or replace function public.research_submit_response(
  p_audience text,
  p_survey_version text,
  p_answers jsonb,
  p_priority_detail text,
  p_idempotency_hash text,
  p_payload_hash text,
  p_ip_hash text,
  p_age_band text,
  p_privacy_version text
)
returns table(code text, response_id uuid)
language plpgsql
security invoker
set search_path = pg_catalog, research_private
as $$
declare
  v_id uuid;
  v_existing_hash text;
begin
  if p_age_band is null or p_age_band not in ('14_17','18_plus') or p_privacy_version is null or p_privacy_version <> 'padel-research-privacy-v1' then raise exception 'invalid_consent'; end if;
  perform pg_advisory_xact_lock(hashtextextended(p_idempotency_hash,0));
  if exists(select 1 from research_private.consent_evidence where purpose='response' and subject_hash=p_idempotency_hash and withdrawn_at is not null) then
    return query select 'conflict'::text, null::uuid; return;
  end if;
  insert into research_private.survey_responses
    (survey_type, survey_version, answers, priority_detail, idempotency_hash, payload_hash)
  values (p_audience, p_survey_version, p_answers, p_priority_detail, p_idempotency_hash, p_payload_hash)
  on conflict (idempotency_hash) do nothing
  returning id into v_id;

  if v_id is null then
    select id, payload_hash into v_id, v_existing_hash
    from research_private.survey_responses where idempotency_hash = p_idempotency_hash;
    if v_existing_hash = p_payload_hash then return query select 'duplicate'::text, v_id; else return query select 'conflict'::text, null::uuid; end if;
    return;
  end if;
  if not research_private.take_rate_slot('response', p_ip_hash, 8) then
    delete from research_private.survey_responses where id = v_id;
    return query select 'rate_limited'::text, null::uuid;
    return;
  end if;
  insert into research_private.consent_evidence(purpose,subject_hash,privacy_version,age_band) values ('response',p_idempotency_hash,p_privacy_version,p_age_band);
  return query select 'accepted'::text, v_id;
end;
$$;
create or replace function public.research_submit_contact(
  p_email text,
  p_research_contact boolean,
  p_marketing_opt_in boolean,
  p_privacy_version text,
  p_idempotency_hash text,
  p_payload_hash text,
  p_ip_hash text,
  p_age_band text
)
returns table(code text, contact_id uuid)
language plpgsql
security invoker
set search_path = pg_catalog, research_private
as $$
declare
  v_id uuid;
  v_existing_hash text;
begin
  if p_research_contact is distinct from true or p_marketing_opt_in is distinct from false then raise exception 'invalid_consent'; end if;
  if p_age_band is null or p_age_band not in ('14_17','18_plus') or p_privacy_version is null or p_privacy_version <> 'padel-research-privacy-v1' then raise exception 'invalid_consent'; end if;
  perform pg_advisory_xact_lock(hashtextextended(p_idempotency_hash,0));
  if exists(select 1 from research_private.consent_evidence where purpose='contact' and subject_hash=p_idempotency_hash and withdrawn_at is not null) then
    return query select 'conflict'::text, null::uuid; return;
  end if;
  insert into research_private.survey_contacts
    (email, research_contact, marketing_opt_in, privacy_version, idempotency_hash, payload_hash)
  values (p_email, p_research_contact, p_marketing_opt_in, p_privacy_version, p_idempotency_hash, p_payload_hash)
  on conflict (idempotency_hash) do nothing
  returning id into v_id;

  if v_id is null then
    select id, payload_hash into v_id, v_existing_hash
    from research_private.survey_contacts where idempotency_hash = p_idempotency_hash;
    if v_existing_hash = p_payload_hash then return query select 'duplicate'::text, v_id; else return query select 'conflict'::text, null::uuid; end if;
    return;
  end if;
  if not research_private.take_rate_slot('contact', p_ip_hash, 5) then
    delete from research_private.survey_contacts where id = v_id;
    return query select 'rate_limited'::text, null::uuid;
    return;
  end if;
  insert into research_private.consent_evidence(purpose,subject_hash,privacy_version,age_band) values ('contact',p_idempotency_hash,p_privacy_version,p_age_band);
  return query select 'accepted'::text, v_id;
end;
$$;

revoke all on function public.research_submit_response(text,text,jsonb,text,text,text,text,text,text) from public,anon,authenticated;
revoke all on function public.research_submit_contact(text,boolean,boolean,text,text,text,text,text) from public,anon,authenticated;
grant execute on function public.research_submit_response(text,text,jsonb,text,text,text,text,text,text) to service_role;
grant execute on function public.research_submit_contact(text,boolean,boolean,text,text,text,text,text) to service_role;
create function public.research_withdraw(p_purpose text,p_subject_hash text,p_ip_hash text)
returns table(code text) language plpgsql security invoker set search_path=pg_catalog,research_private as $$
begin
  if p_purpose is null or p_purpose not in ('response','contact') or p_subject_hash is null or p_subject_hash !~ '^[0-9a-f]{64}$' then raise exception 'invalid_receipt'; end if;
  if not research_private.take_rate_slot('withdrawal', p_ip_hash, 10) then return query select 'rate_limited'::text; return; end if;
  -- Serialize revoke against the same receipt's submission, including retries.
  perform pg_advisory_xact_lock(hashtextextended(p_subject_hash,0));
  update research_private.consent_evidence set withdrawn_at=coalesce(withdrawn_at,now()) where purpose=p_purpose and subject_hash=p_subject_hash;
  if p_purpose='response' then delete from research_private.survey_responses where idempotency_hash=p_subject_hash;
  else delete from research_private.survey_contacts where idempotency_hash=p_subject_hash; end if;
  return query select 'revoked'::text;
end; $$;
revoke all on function public.research_withdraw(text,text,text) from public,anon,authenticated;
grant execute on function public.research_withdraw(text,text,text) to service_role;
create or replace function public.research_delete_expired()
returns table(deleted_responses bigint,deleted_contacts bigint,deleted_rate_keys bigint)
language plpgsql security invoker set search_path=pg_catalog,research_private as $$
begin
  delete from research_private.survey_responses where expires_at<=now(); get diagnostics deleted_responses=row_count;
  delete from research_private.survey_contacts where expires_at<=now(); get diagnostics deleted_contacts=row_count;
  delete from research_private.survey_rate_limits where expires_at<=now(); get diagnostics deleted_rate_keys=row_count;
  delete from research_private.consent_evidence where expires_at<=now();
  return next;
end; $$;
comment on table research_private.survey_responses is 'Responses expire after 90 days. No contact link.';
comment on table research_private.survey_contacts is 'Voluntary research callback only. No marketing. Expires after 90 days.';
comment on table research_private.consent_evidence is 'Consent proof only; no answers, contact details, or IP. Maximum 24 months from acquisition.';
commit;
