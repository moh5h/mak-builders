'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Loader2, X } from 'lucide-react';

export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const startedAt = useMemo(() => Date.now(), [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    setStatus('idle');
    setMessage('');
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, startedAt, page: window.location.href }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Booking could not be sent.');
      form.reset();
      setStatus('success');
      setMessage(
        result.whatsappSent && result.emailSent
          ? 'Your request was delivered to MAK Builders by email and WhatsApp.'
          : result.emailSent
            ? 'Your request was delivered by email. WhatsApp delivery could not be confirmed.'
            : 'Your request was received.'
      );
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="modal-shell" role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="booking-modal panel-glow">
        <button className="icon-close" onClick={onClose} aria-label="Close booking"><X size={20} /></button>
        {status === 'success' ? (
          <div className="success-state">
            <div className="success-icon"><CheckCircle2 size={34} /></div>
            <span className="section-kicker">REQUEST RECEIVED</span>
            <h2 id="booking-title">Meeting request sent.</h2>
            <p>{message}</p>
            <button className="btn primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="booking-heading">
              <span className="section-kicker">BOOK A WORKING SESSION</span>
              <h2 id="booking-title">Tell us what you’re trying to build.</h2>
              <p>Give us enough context to make the first conversation useful. Your request is sent directly to the MAK Builders team.</p>
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
              <label><span>Preferred date</span><input name="date" type="date" min={new Date().toISOString().slice(0, 10)} required /></label>
              <label><span>Preferred time</span><input name="time" type="time" required /></label>
              <label className="wide"><span>Explain more</span><textarea name="explainMore" required rows={6} placeholder="Describe the problem, current workflow, what you want to improve, and what a successful outcome would look like." /></label>
              <label className="wide"><span>Additional notes <em>optional</em></span><textarea name="notes" rows={3} placeholder="Anything else we should know before the meeting?" /></label>
              {status === 'error' && <div className="form-error wide">{message}</div>}
              <div className="booking-actions wide">
                <span>Secure server-side notification · Email + WhatsApp</span>
                <button className="btn primary" disabled={status === 'sending'} type="submit">
                  {status === 'sending' ? <><Loader2 className="spin" size={17} /> Sending</> : 'Send meeting request'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
