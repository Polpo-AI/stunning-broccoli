import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    // Inizializzare all'interno della funzione previene errori di build su Vercel 
    // se le variabili d'ambiente non sono presenti in fase di build.
    const resend = new Resend(process.env.RESEND_API_KEY || 're_build_placeholder');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'placeholder_key'
    );

    const { nome, email, messaggio } = await req.json();

    // Validation
    if (!nome?.trim() || !email?.trim() || !messaggio?.trim()) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from('leads').insert([{ nome, email, messaggio }]);
    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json({ error: 'Errore salvataggio dati' }, { status: 500 });
    }

    // 2. Notification email to PolpoAI team
    await resend.emails.send({
      from: 'PolpoAI <info@polpo-ai.com>',
      to: ['info@polpo-ai.com'],
      subject: `🦑 Nuovo lead da ${nome}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#070B14;font-family:'Inter',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#070B14;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#0e1729 0%,#111827 100%);border:1px solid rgba(6,182,212,0.2);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:32px;">🦑</p>
                    <h1 style="margin:0;color:#06b6d4;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Nuovo messaggio ricevuto</h1>
                    <p style="margin:8px 0 0;color:#64748b;font-size:14px;">PolpoAI — Form di contatto</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="background:#0e1729;border:1px solid rgba(6,182,212,0.15);border-top:none;padding:40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:24px;">
                          <p style="margin:0 0 6px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Nome</p>
                          <p style="margin:0;color:#f1f5f9;font-size:18px;font-weight:600;">${nome}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:24px;border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">
                          <p style="margin:0 0 6px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Email</p>
                          <a href="mailto:${email}" style="color:#06b6d4;font-size:16px;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">
                          <p style="margin:0 0 10px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Messaggio</p>
                          <div style="background:rgba(6,182,212,0.04);border:1px solid rgba(6,182,212,0.12);border-radius:10px;padding:16px 20px;">
                            <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.7;">${messaggio.replace(/\n/g, '<br>')}</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background:#070B14;border:1px solid rgba(6,182,212,0.15);border-top:none;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
                    <p style="margin:0;color:#334155;font-size:12px;">Ricevuto il ${new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    // 3. Confirmation email to the user
    await resend.emails.send({
      from: 'PolpoAI <info@polpo-ai.com>',
      to: [email],
      subject: 'Abbiamo ricevuto il tuo messaggio 🦑',
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:'Inter',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#070B14 0%,#0d1526 100%);border-radius:16px 16px 0 0;padding:48px 40px;text-align:center;">
                    <p style="margin:0 0 12px;font-size:48px;">🦑</p>
                    <h1 style="margin:0 0 8px;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.5px;">Ciao, ${nome}!</h1>
                    <p style="margin:0;color:#06b6d4;font-size:16px;font-weight:500;">Abbiamo ricevuto il tuo messaggio</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="background:#ffffff;padding:48px 40px;">
                    <p style="margin:0 0 16px;color:#334155;font-size:16px;line-height:1.7;">
                      Grazie per averci contattato! 🎉
                    </p>
                    <p style="margin:0 0 16px;color:#334155;font-size:16px;line-height:1.7;">
                      Il tuo messaggio è arrivato correttamente e il nostro team lo leggerà al più presto. <strong>Ti risponderemo entro 24 ore lavorative.</strong>
                    </p>
                    <p style="margin:0 0 32px;color:#334155;font-size:16px;line-height:1.7;">
                      Nel frattempo, se hai domande urgenti puoi rispondere direttamente a questa email.
                    </p>

                    <!-- Message recap -->
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #06b6d4;border-radius:4px 12px 12px 4px;padding:20px 24px;margin-bottom:40px;">
                      <p style="margin:0 0 8px;color:#94a3b8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Il tuo messaggio</p>
                      <p style="margin:0;color:#475569;font-size:14px;line-height:1.7;">${messaggio.replace(/\n/g, '<br>')}</p>
                    </div>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="https://polpo-ai.com" style="display:inline-block;background:linear-gradient(135deg,#06b6d4,#0891b2);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:50px;letter-spacing:0.2px;">
                            Visita polpo-ai.com
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background:#f1f5f9;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
                    <p style="margin:0 0 8px;color:#94a3b8;font-size:13px;font-weight:600;">PolpoAI</p>
                    <p style="margin:0 0 4px;color:#cbd5e1;font-size:12px;">Siti web, Chatbot e Agenti AI su misura</p>
                    <a href="mailto:info@polpo-ai.com" style="color:#06b6d4;font-size:12px;text-decoration:none;">info@polpo-ai.com</a>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
