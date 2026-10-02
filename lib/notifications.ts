export type BookingPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  date: string;
  time: string;
  explainMore: string;
  notes?: string;
  page?: string;
};

function esc(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatBookingText(b: BookingPayload) {
  return [
    'NEW MAK BUILDERS BOOKING',
    '',
    `Name: ${b.name}`,
    `Company: ${b.company}`,
    `Email: ${b.email}`,
    `Phone / WhatsApp: ${b.phone}`,
    `Project: ${b.projectType}`,
    `Preferred: ${b.date} at ${b.time}`,
    '',
    'Explain more:',
    b.explainMore,
    '',
    'Additional notes:',
    b.notes || '—',
  ].join('\n');
}

export async function sendBookingEmail(b: BookingPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  if (!apiKey || !from || !to) return { sent: false, reason: 'Email is not configured.' };

  const html = `
    <div style="font-family:Arial,sans-serif;background:#071018;color:#eaf8ff;padding:32px;line-height:1.55">
      <div style="max-width:720px;margin:auto;background:#0d1721;border:1px solid #1d3444;border-radius:18px;padding:28px">
        <div style="font-size:12px;letter-spacing:.14em;color:#67e8ff;margin-bottom:12px">MAK BUILDERS · NEW BOOKING</div>
        <h1 style="margin:0 0 22px;font-size:26px">${esc(b.name)} · ${esc(b.company)}</h1>
        <table style="width:100%;border-collapse:collapse;color:#d8edf6">
          ${[
            ['Name', b.name], ['Company', b.company], ['Email', b.email], ['Phone / WhatsApp', b.phone],
            ['Project type', b.projectType], ['Preferred date', b.date], ['Preferred time', b.time],
          ].map(([k,v]) => `<tr><td style="padding:9px 10px;color:#7da3b5;border-bottom:1px solid #17303d">${esc(k)}</td><td style="padding:9px 10px;border-bottom:1px solid #17303d">${esc(v)}</td></tr>`).join('')}
        </table>
        <div style="margin-top:24px"><div style="color:#67e8ff;font-size:12px;letter-spacing:.12em">EXPLAIN MORE</div><p style="white-space:pre-wrap">${esc(b.explainMore)}</p></div>
        <div style="margin-top:20px"><div style="color:#67e8ff;font-size:12px;letter-spacing:.12em">NOTES</div><p style="white-space:pre-wrap">${esc(b.notes || '—')}</p></div>
      </div>
    </div>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: b.email,
      subject: `New MAK Builders booking — ${b.company} — ${b.projectType}`,
      html,
      text: formatBookingText(b),
    }),
  });
  if (!response.ok) return { sent: false, reason: `Resend ${response.status}: ${await response.text()}` };
  return { sent: true };
}

export async function sendBookingWhatsApp(b: BookingPayload) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.BOOKING_NOTIFY_WHATSAPP;
  const contentSid = process.env.TWILIO_WHATSAPP_CONTENT_SID;
  if (!sid || !token || !from || !to) return { sent: false, reason: 'WhatsApp is not configured.' };

  const form = new URLSearchParams();
  form.set('To', `whatsapp:${to}`);
  form.set('From', `whatsapp:${from}`);

  if (contentSid) {
    form.set('ContentSid', contentSid);
    form.set('ContentVariables', JSON.stringify({
      '1': b.name,
      '2': b.company,
      '3': b.email,
      '4': b.phone,
      '5': b.projectType,
      '6': `${b.date} at ${b.time}`,
      '7': b.explainMore.slice(0, 1200),
      '8': (b.notes || '—').slice(0, 800),
    }));
  } else {
    // Useful for Twilio WhatsApp Sandbox testing / active-session testing.
    // Production business-initiated messages generally require an approved template.
    form.set('Body', formatBookingText(b));
  }

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
  });
  if (!response.ok) return { sent: false, reason: `Twilio ${response.status}: ${await response.text()}` };
  return { sent: true };
}

export async function sendSupportEmail(data: { email: string; company: string; category: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  if (!apiKey || !from || !to) return { sent: false };
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `MAK support — ${data.category} — ${data.company}`, text: `Company: ${data.company}\nEmail: ${data.email}\nCategory: ${data.category}\n\n${data.message}` }),
  });
  return { sent: response.ok };
}
