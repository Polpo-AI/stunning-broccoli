-- Server-only delivery evidence and coordinated CRM retention. No public intake change.
begin;
alter table polpo_ops.consultation_scheduler add column last_http_status integer,add column last_http_at timestamptz,add column last_http_timed_out boolean;
alter table public.polpo_consultation_requests add column retention_resolved boolean not null default false;
create or replace function polpo_ops.consultation_tick() returns void language plpgsql security definer set search_path='' as $$
declare active boolean; token text; rid bigint;
begin
 update polpo_ops.consultation_scheduler s set last_http_status=r.status_code,last_http_at=r.created,last_http_timed_out=coalesce(r.timed_out,false) from net._http_response r where s.singleton and r.id=s.last_request_id;
 update polpo_ops.consultation_scheduler set last_tick_at=now() where singleton returning enabled into active;
 if not active then return; end if;
 select decrypted_secret into token from vault.decrypted_secrets where name='polpo_consultation_worker_secret';
 if token is null or length(token)<32 then raise exception 'WORKER_SECRET_NOT_CONFIGURED'; end if;
 select net.http_post(url:='https://polpo-ai.com/api/internal/consultation-deliveries',headers:=jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||token),body:='{}'::jsonb,timeout_milliseconds:=115000) into rid;
 update polpo_ops.consultation_scheduler set last_request_id=rid where singleton;
end $$;

create or replace function public.polpo_consultation_health() returns jsonb language sql security definer set search_path='' as $$
 select jsonb_build_object(
 'requests',(select count(*) from public.polpo_consultation_requests),
 'crm_pending',(select count(*) from public.polpo_consultation_requests where crm_status='pending'),
 'notification_pending',(select count(*) from public.polpo_consultation_requests where notification_status='pending'),
 'failed',(select count(*) from public.polpo_consultation_requests where crm_status='failed' or notification_status='failed'),
 'oldest_pending_at',(select min(acquired_at) from public.polpo_consultation_requests where crm_status='pending' or notification_status='pending'),
 'expired_leases',(select count(*) from public.polpo_consultation_requests where locked_until<now()),
 'retention_review_due',(select count(*) from public.polpo_consultation_requests where acquired_at<now()-interval '365 days' and not retention_resolved),
 'retention_review_upcoming',(select count(*) from public.polpo_consultation_requests where acquired_at<now()-interval '335 days' and not retention_resolved),
 'worker_last_status',s.last_http_status,'worker_last_response_at',s.last_http_at,'worker_last_timed_out',s.last_http_timed_out,
 'scheduler_enabled',s.enabled,'scheduler_last_tick_at',s.last_tick_at,
 'scheduler_last_request_id',s.last_request_id
 ) from polpo_ops.consultation_scheduler s where singleton;
$$;

create or replace function public.polpo_consultation_maintenance(p_retention_days integer)
returns void language plpgsql security definer set search_path='' as $$
begin
 if p_retention_days not between 7 and 730 then raise exception 'invalid_retention'; end if;
 delete from public.polpo_consultation_limits where bucket<floor(extract(epoch from now()-interval '2 days')/900);
 delete from public.polpo_consultation_events where created_at<now()-interval '30 days';
 delete from public.polpo_consultation_requests where acquired_at<now()-make_interval(days=>p_retention_days) and crm_status='synced' and notification_status='sent' and retention_resolved;
end $$;


create function public.polpo_consultation_retention_resolve(p_id uuid,p_crm_resolution text) returns boolean language plpgsql security definer set search_path='' as $$
declare n integer;
begin
 if p_crm_resolution is null or p_crm_resolution not in ('deleted','separate_justified_purpose') then raise exception 'invalid_resolution'; end if;
 update public.polpo_consultation_requests set retention_resolved=true where id=p_id and crm_status='synced' and notification_status='sent' and (locked_until is null or locked_until<now());
 get diagnostics n=row_count;return n=1;
end $$;
revoke all on function public.polpo_consultation_retention_resolve(uuid,text) from public,anon,authenticated;
grant execute on function public.polpo_consultation_retention_resolve(uuid,text) to service_role;
commit;
