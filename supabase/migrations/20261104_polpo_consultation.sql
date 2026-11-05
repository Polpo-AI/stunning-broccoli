-- Apply ONLY to the dedicated Polpo AI website project, never Polpo Padel.
-- This file alone does not provision or verify a running delivery queue.
begin;
create table public.polpo_consultation_requests (
 id uuid primary key default gen_random_uuid(), fingerprint text not null, contact_key text not null,
 payload jsonb not null, privacy_version text not null, marketing_version text not null,
 acquired_at timestamptz not null default now(),
 crm_status text not null default 'pending' check(crm_status in ('pending','synced','failed')),
 crm_contact_id text, crm_company_id text, crm_attempts integer not null default 0,
 crm_next_at timestamptz not null default now(), crm_error text,
 notification_status text not null default 'pending' check(notification_status in ('pending','sent','failed')),
 notification_id text, notification_attempts integer not null default 0,
 notification_first_attempt_at timestamptz, notification_next_at timestamptz not null default now(), notification_error text,
 lease_token uuid, locked_until timestamptz
);
create index on public.polpo_consultation_requests(fingerprint,acquired_at desc);
create index on public.polpo_consultation_requests(crm_status,crm_next_at);
create index on public.polpo_consultation_requests(notification_status,notification_next_at);
create table public.polpo_consultation_idempotency (
 key uuid primary key, fingerprint text not null,
 request_id uuid not null references public.polpo_consultation_requests(id) on delete cascade
);
create table public.polpo_consultation_limits (
 key text not null, bucket bigint not null, hits integer not null default 1,
 primary key(key,bucket)
);
create table public.polpo_consultation_events (
 journey_id uuid not null, event text not null check(event in ('start','step_complete','abandon','submit_success','submit_error')),
 step integer not null check(step between 1 and 5), created_at timestamptz not null default now(),
 primary key(journey_id,event,step)
);
alter table public.polpo_consultation_requests enable row level security;
alter table public.polpo_consultation_idempotency enable row level security;
alter table public.polpo_consultation_limits enable row level security;
alter table public.polpo_consultation_events enable row level security;
revoke all on public.polpo_consultation_requests,public.polpo_consultation_idempotency,public.polpo_consultation_limits,public.polpo_consultation_events from public,anon,authenticated;
grant all on public.polpo_consultation_requests,public.polpo_consultation_idempotency,public.polpo_consultation_limits,public.polpo_consultation_events to service_role;

create function public.polpo_consultation_acquire(p_key uuid,p_fingerprint text,p_contact_key text,p_ip_key text,p_payload jsonb,p_privacy_version text,p_marketing_version text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare existing public.polpo_consultation_idempotency; rid uuid; n integer; v_bucket bigint:=floor(extract(epoch from now())/900);
begin
 perform pg_advisory_xact_lock(hashtextextended('polpo-idem:'||p_key::text,0));
 select * into existing from public.polpo_consultation_idempotency where key=p_key;
 if found then
  if existing.fingerprint<>p_fingerprint then return jsonb_build_object('code','conflict'); end if;
  return jsonb_build_object('code','accepted','request_id',existing.request_id,'duplicate',true);
 end if;
 insert into public.polpo_consultation_limits as l values('intake-ip:'||p_ip_key,v_bucket,1)
 on conflict(key,bucket) do update set hits=l.hits+1 returning hits into n;
 if n>5 then return jsonb_build_object('code','rate_limited'); end if;
 insert into public.polpo_consultation_limits as l values('intake-contact:'||p_contact_key,v_bucket,1)
 on conflict(key,bucket) do update set hits=l.hits+1 returning hits into n;
 if n>3 then return jsonb_build_object('code','rate_limited'); end if;
 perform pg_advisory_xact_lock(hashtextextended('polpo-payload:'||p_fingerprint,0));
 select id into rid from public.polpo_consultation_requests where fingerprint=p_fingerprint and acquired_at>now()-interval '15 minutes' order by acquired_at desc limit 1;
 if rid is null then
  insert into public.polpo_consultation_requests(fingerprint,contact_key,payload,privacy_version,marketing_version)
  values(p_fingerprint,p_contact_key,p_payload,p_privacy_version,p_marketing_version) returning id into rid;
 end if;
 insert into public.polpo_consultation_idempotency values(p_key,p_fingerprint,rid);
 return jsonb_build_object('code','accepted','request_id',rid);
end $$;

create function public.polpo_consultation_claim()
returns jsonb language plpgsql security definer set search_path='' as $$
declare job public.polpo_consultation_requests; h boolean; n boolean; token uuid:=gen_random_uuid();
begin
 select r.* into job from public.polpo_consultation_requests r
 where (locked_until is null or locked_until<now())
 and ((crm_status='pending' and crm_next_at<=now() and not exists (select 1 from public.polpo_consultation_requests older where older.contact_key=r.contact_key and older.crm_status='pending' and (older.acquired_at,older.id)<(r.acquired_at,r.id))) or (notification_status='pending' and notification_next_at<=now()))
 order by acquired_at,id for update skip locked limit 1;
 if not found then return null; end if;
 h:=job.crm_status='pending' and job.crm_next_at<=now() and not exists (select 1 from public.polpo_consultation_requests older where older.contact_key=job.contact_key and older.crm_status='pending' and (older.acquired_at,older.id)<(job.acquired_at,job.id));
 n:=job.notification_status='pending' and job.notification_next_at<=now();
 update public.polpo_consultation_requests set lease_token=token,locked_until=now()+interval '2 minutes',
 crm_attempts=crm_attempts+case when h then 1 else 0 end,
 notification_attempts=notification_attempts+case when n then 1 else 0 end,
 notification_first_attempt_at=case when n then coalesce(notification_first_attempt_at,now()) else notification_first_attempt_at end
 where id=job.id returning * into job;
 return to_jsonb(job)||jsonb_build_object('crm_due',h,'notification_due',n);
end $$;

create function public.polpo_consultation_checkpoint(p_id uuid,p_lease uuid,p_channel text,p_status text,p_external_id text default null,p_company_id text default null,p_error text default null,p_retry_seconds integer default 60)
returns boolean language plpgsql security definer set search_path='' as $$
declare affected integer;
begin
 if p_error is not null and p_error!~'^[A-Z0-9_]{1,64}$' then raise exception 'invalid_error_code'; end if;
 if p_retry_seconds<1 or p_retry_seconds>86400 then raise exception 'invalid_retry'; end if;
 if p_channel='crm' and p_status in ('synced','pending','failed') then
  update public.polpo_consultation_requests set crm_status=p_status,crm_contact_id=coalesce(p_external_id,crm_contact_id),crm_company_id=coalesce(p_company_id,crm_company_id),crm_error=p_error,crm_next_at=now()+make_interval(secs=>p_retry_seconds)
  where id=p_id and lease_token=p_lease and locked_until>now();
 elsif p_channel='notification' and p_status in ('sent','pending','failed') then
  update public.polpo_consultation_requests set notification_status=p_status,notification_id=coalesce(p_external_id,notification_id),notification_error=p_error,notification_next_at=now()+make_interval(secs=>p_retry_seconds)
  where id=p_id and lease_token=p_lease and locked_until>now();
 else raise exception 'invalid_checkpoint'; end if;
 get diagnostics affected=row_count;return affected=1;
end $$;

create function public.polpo_consultation_release(p_id uuid,p_lease uuid)
returns boolean language plpgsql security definer set search_path='' as $$
declare affected integer;
begin
 update public.polpo_consultation_requests set lease_token=null,locked_until=null where id=p_id and lease_token=p_lease;
 get diagnostics affected=row_count;return affected=1;
end $$;

create function public.polpo_consultation_event(p_journey uuid,p_event text,p_step integer,p_ip_key text)
returns boolean language plpgsql security definer set search_path='' as $$
declare n integer;v_bucket bigint:=floor(extract(epoch from now())/900);
begin
 if p_event not in ('start','step_complete','abandon','submit_success','submit_error') or p_step not between 1 and 5 then return false; end if;
 insert into public.polpo_consultation_limits as l values('events:'||p_ip_key,v_bucket,1)
 on conflict(key,bucket) do update set hits=l.hits+1 returning hits into n;
 if n>120 then return false; end if;
 insert into public.polpo_consultation_events values(p_journey,p_event,p_step,now()) on conflict do nothing;
 return true;
end $$;

-- Operator-only redrive. Successful deliveries are preserved, not replayed.
create function public.polpo_consultation_redrive(p_id uuid)
returns boolean language plpgsql security definer set search_path='' as $$
declare affected integer;
begin
 update public.polpo_consultation_requests set
 crm_status=case when crm_status='failed' then 'pending' else crm_status end,
 crm_attempts=case when crm_status='failed' then 0 else crm_attempts end,
 notification_status=case when notification_status='failed' then 'pending' else notification_status end,
 notification_attempts=case when notification_status='failed' then 0 else notification_attempts end,
 crm_next_at=now(),notification_next_at=now()
 where id=p_id and (locked_until is null or locked_until<now());
 get diagnostics affected=row_count;return affected=1;
end $$;

-- Called only with the retention interval approved for the website project.
-- Unresolved requests are NOT silently deleted; they require operator review.
create function public.polpo_consultation_maintenance(p_retention_days integer)
returns void language plpgsql security definer set search_path='' as $$
begin
 if p_retention_days not between 7 and 730 then raise exception 'invalid_retention'; end if;
 delete from public.polpo_consultation_limits where bucket<floor(extract(epoch from now()-interval '2 days')/900);
 delete from public.polpo_consultation_events where created_at<now()-interval '30 days';
 delete from public.polpo_consultation_requests where acquired_at<now()-make_interval(days=>p_retention_days) and crm_status='synced' and notification_status='sent';
end $$;

revoke all on function public.polpo_consultation_acquire(uuid,text,text,text,jsonb,text,text),public.polpo_consultation_claim(),public.polpo_consultation_checkpoint(uuid,uuid,text,text,text,text,text,integer),public.polpo_consultation_release(uuid,uuid),public.polpo_consultation_event(uuid,text,integer,text),public.polpo_consultation_redrive(uuid),public.polpo_consultation_maintenance(integer) from public,anon,authenticated;
grant execute on function public.polpo_consultation_acquire(uuid,text,text,text,jsonb,text,text),public.polpo_consultation_claim(),public.polpo_consultation_checkpoint(uuid,uuid,text,text,text,text,text,integer),public.polpo_consultation_release(uuid,uuid),public.polpo_consultation_event(uuid,text,integer,text),public.polpo_consultation_redrive(uuid),public.polpo_consultation_maintenance(integer) to service_role;
commit;
