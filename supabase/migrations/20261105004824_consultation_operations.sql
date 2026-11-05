begin;
create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;
create schema if not exists polpo_ops;
revoke all on schema polpo_ops from public,anon,authenticated;
create table polpo_ops.consultation_scheduler (
 singleton boolean primary key default true check(singleton), enabled boolean not null default false,
 last_tick_at timestamptz, last_request_id bigint
);
insert into polpo_ops.consultation_scheduler(singleton) values(true);
alter table polpo_ops.consultation_scheduler enable row level security;
revoke all on polpo_ops.consultation_scheduler from public,anon,authenticated;
create function polpo_ops.consultation_tick() returns void language plpgsql security definer set search_path='' as $$
declare active boolean; token text; rid bigint;
begin
 update polpo_ops.consultation_scheduler set last_tick_at=now() where singleton returning enabled into active;
 if not active then return; end if;
 select decrypted_secret into token from vault.decrypted_secrets where name='polpo_consultation_worker_secret';
 if token is null or length(token)<32 then raise exception 'WORKER_SECRET_NOT_CONFIGURED'; end if;
 select net.http_post(url:='https://polpo-ai.com/api/internal/consultation-deliveries',headers:=jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||token),body:='{}'::jsonb,timeout_milliseconds:=115000) into rid;
 update polpo_ops.consultation_scheduler set last_request_id=rid where singleton;
end $$;
revoke all on function polpo_ops.consultation_tick() from public,anon,authenticated;
select cron.schedule('polpo-consultation-deliveries','* * * * *','select polpo_ops.consultation_tick();');
create function public.polpo_consultation_health() returns jsonb language sql security definer set search_path='' as $$
 select jsonb_build_object(
 'requests',(select count(*) from public.polpo_consultation_requests),
 'crm_pending',(select count(*) from public.polpo_consultation_requests where crm_status='pending'),
 'notification_pending',(select count(*) from public.polpo_consultation_requests where notification_status='pending'),
 'failed',(select count(*) from public.polpo_consultation_requests where crm_status='failed' or notification_status='failed'),
 'oldest_pending_at',(select min(acquired_at) from public.polpo_consultation_requests where crm_status='pending' or notification_status='pending'),
 'expired_leases',(select count(*) from public.polpo_consultation_requests where locked_until<now()),
 'retention_review_due',(select count(*) from public.polpo_consultation_requests where acquired_at<now()-interval '365 days' and (crm_status<>'synced' or notification_status<>'sent')),
 'scheduler_enabled',s.enabled,'scheduler_last_tick_at',s.last_tick_at,
 'scheduler_last_request_id',s.last_request_id
 ) from polpo_ops.consultation_scheduler s where singleton;
$$;
revoke all on function public.polpo_consultation_health() from public,anon,authenticated;
grant execute on function public.polpo_consultation_health() to service_role;
commit;
