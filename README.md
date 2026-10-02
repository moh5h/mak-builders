# MAK Builders — Full-Stack Next.js Website

A standalone, production-oriented MAK Builders website built with **Next.js + React + TypeScript + Framer Motion**. It does not depend on Lovable.

## What is included

- Futuristic animated network background and enterprise system-map hero
- Responsive navigation and mobile design
- ERP / AI / computer vision / systems integration / data capabilities
- Selected solution cards
- Interactive delivery process
- Three-founder structure with profile modal
- Lebanon / About section
- Real support form API
- Real meeting-booking API
- `Explain more` booking field
- Email booking notification through **Resend**
- WhatsApp booking notification through **Twilio WhatsApp**
- Scripted MAK Assistant front-end demo
- Vercel-ready full-stack structure

## Run locally

Install Node.js 20+ (Node 22 is excellent), open the project folder in VS Code, then:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
copy .env.example .env.local
```

Fill in the credentials.

### Email — Resend

Create a Resend account/API key and set:

```env
RESEND_API_KEY=...
RESEND_FROM_EMAIL="MAK Builders <bookings@your-domain.com>"
BOOKING_NOTIFY_EMAIL=shaabanmohammad302@gmail.com
```

For production, verify the sending domain in Resend.

### WhatsApp — Twilio WhatsApp

Set:

```env
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_FROM=+1...
BOOKING_NOTIFY_WHATSAPP=+96171488475
TWILIO_WHATSAPP_CONTENT_SID=HX...
```

#### Important WhatsApp rule

A website booking is a **business-initiated WhatsApp message**. For production delivery outside an active 24-hour WhatsApp customer-service window, WhatsApp providers normally require an **approved message template**.

This project supports a Twilio WhatsApp Content Template with **8 variables**:

1. Customer name
2. Company
3. Customer email
4. Customer phone / WhatsApp
5. Project type
6. Preferred date and time
7. Explain more
8. Additional notes

A suitable template body is conceptually:

```text
New MAK Builders booking

Name: {{1}}
Company: {{2}}
Email: {{3}}
Phone: {{4}}
Project: {{5}}
Preferred: {{6}}

Explain more:
{{7}}

Notes:
{{8}}
```

Once approved in Twilio/WhatsApp, put its Content SID in `TWILIO_WHATSAPP_CONTENT_SID`.

If `TWILIO_WHATSAPP_CONTENT_SID` is left empty, the API sends a normal `Body` message. That is useful for Twilio WhatsApp Sandbox / testing or eligible active-session messaging, but should not be relied on for production business-initiated notifications.

## Deploy to Vercel

### Option A — GitHub + Vercel

1. Create a GitHub repository.
2. Push this project.
3. In Vercel choose **Add New → Project**.
4. Import the repository.
5. Vercel automatically recognizes Next.js.
6. Add all variables from `.env.example` in **Project Settings → Environment Variables**.
7. Deploy.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Add environment variables in the Vercel dashboard, then:

```bash
vercel --prod
```

## Where to edit the site

- Main page: `components/HomePage.tsx`
- Team, capabilities, solutions, FAQ: `lib/site-data.ts`
- Booking form: `components/BookingModal.tsx`
- Assistant: `components/Assistant.tsx`
- Animated background: `components/NeuralBackground.tsx`
- Main visual system: `components/SystemCore.tsx`
- Styling: `app/globals.css`
- Booking backend: `app/api/book/route.ts`
- Notification providers: `lib/notifications.ts`

## Security notes

- Never put Resend or Twilio secrets in frontend code.
- Never commit `.env.local` to GitHub.
- Vercel environment variables keep production credentials server-side.
- The booking API includes validation, a honeypot, and lightweight rate limiting. For a heavily advertised public site, add Cloudflare Turnstile and/or durable rate limiting before scaling paid WhatsApp notifications.
