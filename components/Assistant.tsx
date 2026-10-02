'use client';

import { FormEvent, useState } from 'react';
import { Bot, CalendarDays, MessageCircle, Send, X } from 'lucide-react';

type Message = { from: 'bot' | 'user'; text: string };

const quick = [
  'What does MAK Builders do?',
  'Tell me about ERP solutions',
  'I need an AI automation idea',
  'Book a meeting',
];

function answer(input: string) {
  const q = input.toLowerCase();
  if (/(book|meeting|appointment|schedule)/.test(q)) return '__BOOK__';
  if (/(erp|business platform|operations platform)/.test(q)) return 'MAK Builders develops custom ERP and business platforms around real company workflows — inventory, approvals, operations, visibility, integrations, and management dashboards — instead of forcing teams into a generic template.';
  if (/(warehouse|pharma|medicine|inventory)/.test(q)) return 'Our pharmaceutical warehouse concept combines computer vision, transaction-system integration, verification zones, and deterministic correlation logic to detect outbound inventory mismatches. It is one MAK Builders solution, not our entire identity.';
  if (/(team|founder|mohammad)/.test(q)) return 'MAK Builders has three founders. ENG. Mohammad Shaaban is presented as CCE Engineer | Technical Systems Lead. The other two public profiles are intentionally left editable until the team finalizes their roles.';
  if (/(lebanon|where|location)/.test(q)) return 'MAK Builders is being built from Lebanon with the goal of delivering enterprise-grade systems for regional and global opportunities.';
  if (/(ai idea|automation|artificial intelligence)/.test(q)) return 'A strong MAK-style AI project starts with an operational bottleneck. We then decide whether automation, decision support, forecasting, computer vision, an AI assistant, or workflow orchestration creates measurable leverage.';
  if (/(what does|do you do|services|build)/.test(q)) return 'We build ERP platforms, AI-enhanced business systems, workflow automation, computer vision solutions, integration/data systems, intelligent customer experiences, and custom digital products.';
  return 'I can help with MAK Builders services, ERP, AI automation, the warehouse solution, the founding team, Lebanon, or booking a meeting.';
}

export default function Assistant({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Welcome to MAK Builders. Tell me what you are trying to improve, build, or automate.' },
  ]);

  function ask(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');
    const response = answer(text);
    window.setTimeout(() => {
      if (response === '__BOOK__') {
        setMessages((m) => [...m, { from: 'bot', text: 'I’ll open the meeting form so you can give the team the full context.' }]);
        window.setTimeout(() => { setOpen(false); onBook(); }, 350);
      } else {
        setMessages((m) => [...m, { from: 'bot', text: response }]);
      }
    }, 180);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <>
      <button className="assistant-launch" onClick={() => setOpen(true)} aria-label="Open MAK Assistant">
        <MessageCircle size={20} /><span>MAK Assistant</span><i />
      </button>
      {open && (
        <div className="assistant-panel panel-glow">
          <div className="assistant-head">
            <div className="assistant-brand"><div className="assistant-icon"><Bot size={18} /></div><div><strong>MAK Assistant</strong><span>Demo intelligence layer</span></div></div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18} /></button>
          </div>
          <div className="assistant-messages">
            {messages.map((m, i) => <div key={i} className={`assistant-msg ${m.from}`}>{m.text}</div>)}
          </div>
          <div className="quick-prompts">
            {quick.map((q) => <button key={q} onClick={() => ask(q)}>{q === 'Book a meeting' && <CalendarDays size={13} />}{q}</button>)}
          </div>
          <form className="assistant-input" onSubmit={submit}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about ERP, AI, integrations..." />
            <button aria-label="Send"><Send size={17} /></button>
          </form>
        </div>
      )}
    </>
  );
}
