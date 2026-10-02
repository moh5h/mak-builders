import { NextRequest, NextResponse } from 'next/server';
import { sendBookingEmail, sendBookingWhatsApp, type BookingPayload } from '@/lib/notifications';

export const runtime = 'nodejs';

const rate = new Map<string, number[]>();

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const recent = (rate.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
    if (recent.length >= 6) return NextResponse.json({ error: 'Too many booking attempts. Please try again later.' }, { status: 429 });
    recent.push(now); rate.set(ip, recent);

    const body = await req.json();
    if (body.website) return NextResponse.json({ ok: true, emailSent: true, whatsappSent: true });
    if (typeof body.startedAt === 'number' && now - body.startedAt < 1200) return NextResponse.json({ error: 'Please complete the form normally.' }, { status: 400 });

    const booking: BookingPayload = {
      name: clean(body.name, 120), company: clean(body.company, 160), email: clean(body.email, 180), phone: clean(body.phone, 80),
      projectType: clean(body.projectType, 160), date: clean(body.date, 40), time: clean(body.time, 40), explainMore: clean(body.explainMore, 5000),
      notes: clean(body.notes, 3000), page: clean(body.page, 500),
    };

    const required = ['name','company','email','phone','projectType','date','time','explainMore'] as const;
    if (required.some((key) => !booking[key])) return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(booking.email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });

    const [email, whatsapp] = await Promise.all([sendBookingEmail(booking), sendBookingWhatsApp(booking)]);
    if (!email.sent && !whatsapp.sent) {
      console.error('Booking notification failed', { email, whatsapp });
      return NextResponse.json({ error: 'We could not deliver the notification. Please contact MAK Builders directly.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, emailSent: email.sent, whatsappSent: whatsapp.sent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
