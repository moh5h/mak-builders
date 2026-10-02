'use client';

import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const WHATSAPP_NUMBER = '96171488475';

export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    setStatus('idle');
    setMessage('');
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  function openPicker(e: MouseEvent<HTMLInputElement>) {
    try { e.currentTarget.showPicker(); } catch { /* unsupported browser: falls back to typing */ }
  }

  // Opens WhatsApp with the booking pre-written; the visitor just taps Send.
  // window.open must run synchronously in the submit handler or popup blockers stop it.
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (d.website) return;

    const text = [
      '*New MAK Builders booking*',
      '',
      `*Name:* ${d.name}`,
      `*Company:* ${d.company}`,
      `*Email:* ${d.email}`,
      `*Phone / WhatsApp:* ${d.phone}`,
      `*Project:* ${d.projectType}`,
      `*Preferred:* ${d.date} at ${d.time}`,
      '',
      '*Explain more:*',
      d.explainMore,
      ...(d.notes?.trim() ? ['', '*Additional notes:*', d.notes] : []),
    ].join('\n');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    form.reset();
    setStatus('success');
    setMessage('WhatsApp opened with your request. Tap Send in WhatsApp to deliver it to MAK Builders.');
  }

  return (
    <div className="modal-shell" role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="booking-modal panel-glow">
        <button className="icon-close" onClick={onClose} aria-label="Close booking"><X size={20} /></button>
        {status === 'success' ? (
          <div className="success-state">
            <div className="success-icon"><CheckCircle2 size={34} /></div>
            <span className="section-kicker">ALMOST DONE</span>
            <h2 id="booking-title">Finish in WhatsApp.</h2>
            <p>{message}</p>
            <button className="btn primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="booking-heading">
              <span className="section-kicker">BOOK A WORKING SESSION</span>
              <h2 id="booking-title">Tell us what you’re trying to build.</h2>
              <p>Give us enough context to make the first conversation useful. Your request opens in WhatsApp, addressed directly to the MAK Builders team.</p>
            </div>
            <form className="booking-form" onSubmit={submit}>
              <input className="hp-field" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <label><span>Name</span><input name="name" required placeholder="Your full name" /></label>
              <label><span>Company</span><input name="company" required placeholder="Company / organization" /></label>
              <label><span>Email</span><input name="email" type="email" required placeholder="you@company.com" /></label>
              <label><span>Phone / WhatsApp</span><input name="phone" required placeholder="+961 ..." /></label>
              <label className="wide"><span>Project type</span>
                <select name="projectType" required defaultValue="">
                  <option value="" disabled>Select a direction</option>
                  <option>ERP & business platform</option>
                  <option>AI & automation</option>
                  <option>Computer vision</option>
                  <option>Systems integration</option>
                  <option>Data & analytics</option>
                  <option>Custom digital product</option>
                  <option>Other / not sure yet</option>
                </select>
              </label>
              <label><span>Preferred date</span><input name="date" type="date" min={new Date().toISOString().slice(0, 10)} onClick={openPicker} required /></label>
              <label><span>Preferred time</span><input name="time" type="time" onClick={openPicker} required /></label>
              <label className="wide"><span>Explain more</span><textarea name="explainMore" required rows={6} placeholder="Describe the problem, current workflow, what you want to improve, and what a successful outcome would look like." /></label>
              <label className="wide"><span>Additional notes <em>optional</em></span><textarea name="notes" rows={3} placeholder="Anything else we should know before the meeting?" /></label>
              <div className="booking-actions wide">
                <span>Opens WhatsApp with your request ready to send</span>
                <button className="btn primary" type="submit">Send via WhatsApp</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
