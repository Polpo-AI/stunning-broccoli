import { readConfig } from '@/lib/consultation/server-config';
import { authenticated } from '@/lib/consultation/intake';
import { testName, testDetails } from '@/lib/consultation/test-fixture';
import { isUUID } from '@/lib/consultation/domain';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Read-only evidence for fixed synthetic fixtures. Never returns contact fields or provider bodies.
export async function GET(request: Request) {
  const config = readConfig(), headers = { 'Cache-Control': 'no-store' };
  if (!authenticated(request, config.workerSecret)) return Response.json({ code: 'unauthorized' }, { status: 401, headers });
  const reference = new URL(request.url).searchParams.get('reference');
  if (!isUUID(reference)) return Response.json({ code: 'invalid_reference' }, { status: 422, headers });
  try {
    const stored = await fetch(`${config.databaseUrl}/rest/v1/polpo_consultation_requests?id=eq.${reference}&select=payload,notification_id,notification_status,crm_status`, {
      headers: { apikey: config.databaseKey, Authorization: `Bearer ${config.databaseKey}` }, cache: 'no-store', signal: AbortSignal.timeout(5000),
    });
    if (!stored.ok) throw new Error('storage');
    const job = (await stored.json())[0];
    if (!job || job.payload?.contact?.name !== testName || job.payload?.details !== testDetails) return Response.json({ code: 'synthetic_fixture_required' }, { status: 404, headers });
    if (!job.notification_id) return Response.json({ crmStatus: job.crm_status, notificationStatus: job.notification_status, providerAccepted: false }, { headers });
    const response = await fetch(`https://api.resend.com/emails/${encodeURIComponent(job.notification_id)}`, {
      headers: { Authorization: `Bearer ${config.resendKey}` }, cache: 'no-store', signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return Response.json({ providerAccepted: true, deliveryLookupStatus: response.status, deliveryVerified: false }, { headers });
    const email = await response.json();
    const event = ['sent', 'delivered', 'delivery_delayed', 'bounced', 'failed', 'complained', 'opened', 'clicked'].includes(email.last_event) ? email.last_event : 'unknown';
    return Response.json({ crmStatus: job.crm_status, notificationStatus: job.notification_status, providerAccepted: true, lastEvent: event, deliveryVerified: ['delivered', 'opened', 'clicked'].includes(event) }, { headers });
  } catch { return Response.json({ code: 'evidence_unavailable' }, { status: 503, headers }); }
}
