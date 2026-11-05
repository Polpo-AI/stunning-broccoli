-- Private research dataset for padel-surveys-v2.
-- Never apply this migration to the hosted project before the activation review.
create schema if not exists research_private;
revoke all on schema research_private from public, anon, authenticated;
grant usage on schema research_private to service_role;

create table research_private.survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_type text not null check (survey_type in ('giocatori', 'circoli')),
  survey_version text not null check (survey_version = 'padel-surveys-v2'),
  answers jsonb not null check (jsonb_typeof(answers) = 'object'),
  priority_detail text check (priority_detail is null or char_length(priority_detail) <= 300),
  status text not null default 'active' check (status in ('active', 'deletion_requested')),
  acquired_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '365 days'),
  idempotency_hash text not null unique check (idempotency_hash ~ '^[0-9a-f]{64}$'),
  payload_hash text not null check (payload_hash ~ '^[0-9a-f]{64}$'),
  check (survey_type = 'circoli' or priority_detail is null)
);
create index survey_responses_analysis_idx on research_private.survey_responses (survey_type, survey_version, acquired_at);
alter table research_private.survey_responses enable row level security;

-- Contact data has no response ID, foreign key, response hash, or shared identifier.
create table research_private.survey_contacts (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) <= 254),
  research_contact boolean not null default false,
  marketing_opt_in boolean not null default false,
  privacy_version text not null check (privacy_version = 'padel-research-privacy-v1'),
  acquired_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '180 days'),
  idempotency_hash text not null unique check (idempotency_hash ~ '^[0-9a-f]{64}$'),
  payload_hash text not null check (payload_hash ~ '^[0-9a-f]{64}$'),
  check (research_contact or marketing_opt_in)
);
create index survey_contacts_expiry_idx on research_private.survey_contacts (expires_at);
alter table research_private.survey_contacts enable row level security;

-- Short-lived HMACs only, used to rate-limit server requests. Raw IPs are never stored here.
create table research_private.survey_rate_limits (
  purpose text not null check (purpose in ('response', 'contact')),
  ip_hmac text not null check (ip_hmac ~ '^[0-9a-f]{64}$'),
  hit_count integer not null check (hit_count > 0),
  expires_at timestamptz not null,
  primary key (purpose, ip_hmac)
);
create index survey_rate_limits_expiry_idx on research_private.survey_rate_limits (expires_at);
alter table research_private.survey_rate_limits enable row level security;

revoke all on all tables in schema research_private from public, anon, authenticated;
grant select, insert, update, delete on research_private.survey_responses, research_private.survey_contacts, research_private.survey_rate_limits to service_role;

create or replace function research_private.take_rate_slot(p_purpose text, p_ip_hmac text, p_limit integer)
returns boolean
language plpgsql
security invoker
set search_path = pg_catalog, research_private
as $$
declare
  v_count integer;
begin
  delete from research_private.survey_rate_limits where expires_at < now();
  insert into research_private.survey_rate_limits(purpose, ip_hmac, hit_count, expires_at)
  values (p_purpose, p_ip_hmac, 1, now() + interval '1 day')
  on conflict (purpose, ip_hmac) do update
    set hit_count = research_private.survey_rate_limits.hit_count + 1
  returning hit_count into v_count;
  return v_count <= p_limit;
end;
$$;

create or replace function public.research_submit_response(
  p_audience text,
  p_survey_version text,
  p_answers jsonb,
  p_priority_detail text,
  p_idempotency_hash text,
  p_payload_hash text,
  p_ip_hash text
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
  p_ip_hash text
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
  return query select 'accepted'::text, v_id;
end;
$$;

revoke all on function research_private.take_rate_slot(text, text, integer) from public, anon, authenticated;
revoke all on function public.research_submit_response(text, text, jsonb, text, text, text, text) from public, anon, authenticated;
revoke all on function public.research_submit_contact(text, boolean, boolean, text, text, text, text) from public, anon, authenticated;
grant execute on function research_private.take_rate_slot(text, text, integer) to service_role;
grant execute on function public.research_submit_response(text, text, jsonb, text, text, text, text) to service_role;
grant execute on function public.research_submit_contact(text, boolean, boolean, text, text, text, text) to service_role;

-- The private schema is not exposed to the Data API. This view intentionally excludes
-- free text, contact data, IDs, timestamps, and cells with fewer than five responses.
create or replace view research_private.response_distribution
with (security_invoker = true)
as
  select r.survey_type, r.survey_version, q.key as question_id, answer.value as answer_value,
         count(distinct r.id)::integer as response_count
  from research_private.survey_responses r
  cross join lateral jsonb_each(r.answers) as q(key, values)
  cross join lateral jsonb_array_elements_text(q.values) as answer(value)
  where r.status = 'active'
  group by r.survey_type, r.survey_version, q.key, answer.value
  having count(distinct r.id) >= 5;
revoke all on research_private.response_distribution from public, anon, authenticated;
grant select on research_private.response_distribution to service_role;

create or replace function public.research_delete_expired()
returns table(deleted_responses bigint, deleted_contacts bigint, deleted_rate_keys bigint)
language plpgsql
security invoker
set search_path = pg_catalog, research_private
as $$
begin
  delete from research_private.survey_responses where expires_at <= now();
  get diagnostics deleted_responses = row_count;
  delete from research_private.survey_contacts where expires_at <= now();
  get diagnostics deleted_contacts = row_count;
  delete from research_private.survey_rate_limits where expires_at <= now();
  get diagnostics deleted_rate_keys = row_count;
  return next;
end;
$$;
revoke all on function public.research_delete_expired() from public, anon, authenticated;
grant execute on function public.research_delete_expired() to service_role;

comment on schema research_private is 'Private Polpo padel market research data. Keep out of exposed Supabase API schemas.';
comment on table research_private.survey_responses is 'Survey responses only. No direct identifiers or contact link. expires_at is 365 days; scheduled purge required.';
comment on table research_private.survey_contacts is 'Voluntary contact choices, technically separate from survey responses. expires_at is 180 days; scheduled purge required.';
comment on table research_private.survey_rate_limits is 'HMAC network keys for abuse prevention. expires_at is within 24 hours; scheduled purge and request cleanup apply.';
