import { NextRequest, NextResponse } from 'next/server';
import { sendSupportEmail } from '@/lib/notifications';

export const runtime = 'nodejs';

function clean(value: unknown, max: number) { return typeof value === 'string' ? value.trim().slice(0, max) : ''; }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = { email: clean(body.email, 180), company: clean(body.company, 160), category: clean(body.category, 100), message: clean(body.message, 5000) };
    if (!data.email || !data.company || !data.category || !data.message) return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });
    const result = await sendSupportEmail(data);
    if (!result.sent) return NextResponse.json({ error: 'Support email is not configured.' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
