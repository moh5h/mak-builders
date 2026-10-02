'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { founders } from '@/lib/site-data';

export default function TeamModal({ index, onClose }: { index: number | null; onClose: () => void }) {
  const member = index == null ? null : founders[index];
  useEffect(() => {
    if (!member) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [member]);
  if (!member) return null;

  return (
    <div className="modal-shell" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="team-modal panel-glow">
        <button className="icon-close" onClick={onClose} aria-label="Close profile"><X size={20} /></button>
        <div className="team-modal-top">
          <div className="member-orbit"><span>{member.initials}</span></div>
          <div>
            <span className="section-kicker">FOUNDING TEAM</span>
            <h2>{member.name}</h2>
            <p className="member-role">{member.role}</p>
          </div>
        </div>
        <p className="member-bio">{member.bio}</p>
        <div className="focus-grid">
          {member.focus.map((focus) => <span key={focus}>{focus}</span>)}
        </div>
      </div>
    </div>
  );
}
