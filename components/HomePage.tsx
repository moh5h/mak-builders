'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import NeuralBackground from './NeuralBackground';
import SystemCore from './SystemCore';
import BookingModal from './BookingModal';
import TeamModal from './TeamModal';
import Assistant from './Assistant';
import { capabilities, solutions, processSteps, founders, faqs } from '@/lib/site-data';

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.14 },
  transition: { duration: 0.7 },
};

export default function HomePage() {
  const [booking, setBooking] = useState(false);
  const [teamIndex, setTeamIndex] = useState<number | null>(null);
  const [processIndex, setProcessIndex] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [supportState, setSupportState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submitSupport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSupportState('sending');
    const form = e.currentTarget;
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      form.reset();
      setSupportState('sent');
    } catch {
      setSupportState('error');
    }
  }

  return (
    <main className="site-shell">
      <NeuralBackground />
      <div className="ambient-orb orb-cyan" />
      <div className="ambient-orb orb-violet" />
      <div className="scan-grid" aria-hidden="true" />

      <div className="announcement"><span /> Building AI-native enterprise systems from Lebanon.</div>
      <header className="navbar">
        <a className="brand" href="#home" aria-label="MAK Builders home">
          <div className="brand-mark"><span>M</span><span>A</span><span>K</span></div>
          <div><strong>MAK Builders</strong><small>Modular AI Knowledge</small></div>
        </a>
        <nav className={mobileNav ? 'open' : ''}>
          {['build:What We Build','solutions:Solutions','process:Process','team:Team','about:About','support:Support'].map((item) => {
            const [id, text] = item.split(':');
            return <a key={id} href={`#${id}`} onClick={() => setMobileNav(false)}>{text}</a>;
          })}
          <button className="btn primary compact" onClick={() => { setBooking(true); setMobileNav(false); }}>Book a meeting</button>
        </nav>
        <button className="mobile-menu" onClick={() => setMobileNav((v) => !v)} aria-label="Toggle navigation">{mobileNav ? <X /> : <Menu />}</button>
      </header>

      <section className="hero section" id="home">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="hero-badge"><span className="pulse-dot" /> Lebanon-built · enterprise-minded · AI-native</div>
          <h1>We build the systems businesses will run on <span>next.</span></h1>
          <p>ERP platforms, AI-enhanced business systems, workflow automation, computer vision, data integrations, and intelligent digital products engineered as one connected operating layer.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#build">Explore what we build <ArrowRight size={17} /></a>
            <button className="btn ghost" onClick={() => setBooking(true)}><CalendarDays size={17} /> Book a meeting</button>
          </div>
          <div className="hero-metrics">
            <div><span>01</span><strong>ERP</strong><small>Custom operational core</small></div>
            <div><span>02</span><strong>AI</strong><small>Applied intelligence</small></div>
            <div><span>03</span><strong>Systems</strong><small>Physical + digital integration</small></div>
          </div>
        </motion.div>
        <div className="hero-visual"><SystemCore /></div>
      </section>

      <section className="signal-strip" aria-label="MAK Builders capabilities">
        {['ERP ARCHITECTURE','AI WORKFLOWS','COMPUTER VISION','SYSTEM INTEGRATION','DECISION INTELLIGENCE'].map((x) => <span key={x}><i />{x}</span>)}
      </section>

      <section className="section" id="build">
        <motion.div className="section-heading" {...reveal}>
          <span className="section-kicker">01 — WHAT WE BUILD</span>
          <h2>Business systems designed around how operations actually work.</h2>
          <p>Software engineering, enterprise architecture, automation, data, and AI — assembled only where each layer creates real operational value.</p>
        </motion.div>
        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article className="capability-card" key={item.title} {...reveal} transition={{ duration: 0.6, delay: index * 0.05 }}>
                <div className="card-top"><span>{item.index}</span><div className="card-icon"><Icon size={20} /></div></div>
                <h3>{item.title}</h3><p>{item.text}</p><strong>{item.outcome} <ArrowRight size={14} /></strong>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="section section-dark" id="solutions">
        <motion.div className="section-heading" {...reveal}>
          <span className="section-kicker">02 — SELECTED SOLUTIONS</span>
          <h2>From enterprise core systems to intelligence at the edge.</h2>
          <p>The warehouse platform is one proof point of what MAK Builders can create — not the limit of the company.</p>
        </motion.div>
        <div className="solutions-grid">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.article className={`solution-card ${solution.featured ? 'featured' : ''}`} key={solution.title} {...reveal} transition={{ duration: 0.65, delay: index * 0.06 }}>
                <div className="solution-icon"><Icon size={22} /></div>
                <span className="solution-label">{solution.label}</span><h3>{solution.title}</h3><p>{solution.text}</p>
                <div className="chips">{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="section" id="process">
        <motion.div className="section-heading" {...reveal}>
          <span className="section-kicker">03 — HOW WE WORK</span>
          <h2>We reduce uncertainty before we scale implementation.</h2>
          <p>Investigation first. Architecture second. Technology only after the problem is understood well enough to deserve it.</p>
        </motion.div>
        <div className="process-console">
          <div className="process-list">
            {processSteps.map(([num, title], i) => <button key={title} className={i === processIndex ? 'active' : ''} onClick={() => setProcessIndex(i)}><span>{num}</span>{title}<ArrowRight size={14} /></button>)}
          </div>
          <motion.div key={processIndex} className="process-detail" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}>
            <span className="process-number">{processSteps[processIndex][0]}</span>
            <div><span className="section-kicker">DELIVERY PHASE</span><h3>{processSteps[processIndex][1]}</h3><p>{processSteps[processIndex][2]}</p></div>
          </motion.div>
        </div>
      </section>

      <section className="section section-dark" id="team">
        <motion.div className="section-heading" {...reveal}>
          <span className="section-kicker">04 — FOUNDING TEAM</span>
          <h2>Three founders. Complementary ownership.</h2>
          <p>The structure is ready; the remaining public profiles can be finalized after the team agrees on titles and responsibilities.</p>
        </motion.div>
        <div className="team-grid">
          {founders.map((member, index) => (
            <motion.button className="founder-card" key={member.name} onClick={() => setTeamIndex(index)} {...reveal} transition={{ duration: 0.6, delay: index * 0.07 }}>
              <div className="founder-avatar"><span>{member.initials}</span></div>
              <div className="founder-content"><span className="team-index">0{index + 1}</span><h3>{member.name}</h3><p>{member.role}</p><strong>View profile <ArrowRight size={14} /></strong></div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="section about-grid" id="about">
        <motion.div className="about-copy" {...reveal}>
          <span className="section-kicker">05 — ABOUT MAK</span>
          <h2>Built from Lebanon. Engineered for serious operations.</h2>
          <p>MAK stands for <strong>Modular AI Knowledge</strong>: modular systems, AI where it creates leverage, and knowledge that becomes part of the operating layer instead of remaining trapped in separate tools.</p>
          <div className="principles">
            {['Engineered, not improvised','Explainable by design','Interoperable with existing systems','Scalable from pilot to production'].map((x) => <span key={x}><Check size={15} />{x}</span>)}
          </div>
        </motion.div>
        <motion.div className="location-console panel-glow" {...reveal}>
          <div className="location-map">
            <div className="map-grid" /><div className="lebanon-signal"><span /><i /></div>
            <div className="map-label"><MapPin size={16} /><div><strong>LEBANON</strong><small>Eastern Mediterranean · regional reach</small></div></div>
          </div>
          <div className="location-stats"><div><Globe2 size={17} /><span><strong>Regional + global</strong><small>Built to cross borders</small></span></div><div><ShieldCheck size={17} /><span><strong>Enterprise mindset</strong><small>Security and reliability first</small></span></div></div>
        </motion.div>
      </section>

      <section className="section section-dark" id="support">
        <div className="support-layout">
          <motion.div className="support-copy" {...reveal}>
            <span className="section-kicker">06 — SUPPORT</span>
            <h2>Already working with MAK? Keep the signal clear.</h2>
            <p>Use the support channel for technical questions, project follow-up, implementation issues, or general business inquiries.</p>
            <div className="support-contact"><Mail size={18} /><span><strong>Direct support workflow</strong><small>Messages are routed to the team through the site backend.</small></span></div>
            <div className="faq-list">
              {faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={17} /></summary><p>{a}</p></details>)}
            </div>
          </motion.div>
          <motion.form className="support-form panel-glow" onSubmit={submitSupport} {...reveal}>
            <span className="section-kicker">SEND A REQUEST</span>
            <label><span>Email</span><input name="email" type="email" required placeholder="you@company.com" /></label>
            <label><span>Company</span><input name="company" required placeholder="Company name" /></label>
            <label><span>Category</span><select name="category" required defaultValue=""><option value="" disabled>Select category</option><option>Technical support</option><option>Project follow-up</option><option>ERP / integration</option><option>AI / automation</option><option>Business inquiry</option></select></label>
            <label><span>Message</span><textarea name="message" rows={6} required placeholder="Tell us what you need help with." /></label>
            <button className="btn primary" disabled={supportState === 'sending'}>{supportState === 'sending' ? 'Sending...' : 'Send request'}</button>
            {supportState === 'sent' && <p className="form-success">Request sent successfully.</p>}
            {supportState === 'error' && <p className="form-error">Could not send. Please try again.</p>}
          </motion.form>
        </div>
      </section>

      <section className="cta-band">
        <div><span className="section-kicker">START WITH THE PROBLEM</span><h2>Have an operation that should work smarter?</h2><p>Bring the process, the pain point, and the constraints. We’ll help structure the system around it.</p></div>
        <button className="btn primary large" onClick={() => setBooking(true)}>Book a working session <ArrowRight size={18} /></button>
      </section>

      <footer>
        <div className="footer-brand"><div className="brand-mark"><span>M</span><span>A</span><span>K</span></div><div><strong>MAK Builders</strong><p>ERP · AI · automation · integrated systems</p></div></div>
        <div className="footer-links"><a href="#build">What we build</a><a href="#solutions">Solutions</a><a href="#team">Team</a><a href="#about">Lebanon</a><button onClick={() => setBooking(true)}>Book a meeting</button></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} MAK Builders</span><span>Modular AI Knowledge · Lebanon</span><span className="footer-status"><i /> SYSTEMS ONLINE</span></div>
      </footer>

      <BookingModal open={booking} onClose={() => setBooking(false)} />
      <TeamModal index={teamIndex} onClose={() => setTeamIndex(null)} />
      <Assistant onBook={() => setBooking(true)} />
    </main>
  );
}
