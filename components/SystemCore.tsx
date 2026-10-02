'use client';

import { motion } from 'framer-motion';

const nodes = [
  ['ERP', 'Core', 'node-a'],
  ['AI', 'Decision', 'node-b'],
  ['CV', 'Vision', 'node-c'],
  ['API', 'Integration', 'node-d'],
  ['DATA', 'Insight', 'node-e'],
];

export default function SystemCore() {
  return (
    <motion.div
      className="system-core-card"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2 }}
    >
      <div className="system-core-head">
        <div>
          <span className="eyebrow-mini">MAK SYSTEM MAP</span>
          <strong>Enterprise intelligence layer</strong>
        </div>
        <span className="live-pill"><i /> LIVE</span>
      </div>

      <div className="system-visual">
        <svg className="system-lines" viewBox="0 0 620 430" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6ff0ff" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#6ff0ff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#9d7dff" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path d="M85 90 C210 15 405 35 520 105" />
          <path d="M85 90 C220 165 195 275 95 338" />
          <path d="M520 105 C410 175 430 282 520 338" />
          <path d="M95 338 C255 405 375 392 520 338" />
          <path d="M310 210 C215 150 170 112 85 90" />
          <path d="M310 210 C400 145 448 120 520 105" />
          <path d="M310 210 C245 292 180 320 95 338" />
          <path d="M310 210 C390 270 447 310 520 338" />
        </svg>
        {nodes.map(([title, sub, cls], index) => (
          <motion.div
            key={title}
            className={`system-node ${cls}`}
            animate={{ y: [0, index % 2 ? -4 : 4, 0] }}
            transition={{ duration: 4.2 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>{title}</span><small>{sub}</small>
          </motion.div>
        ))}
        <div className="core-ring ring-1" />
        <div className="core-ring ring-2" />
        <motion.div
          className="mak-core"
          animate={{ boxShadow: ['0 0 30px rgba(111,240,255,.14)', '0 0 70px rgba(111,240,255,.26)', '0 0 30px rgba(111,240,255,.14)'] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span>MAK</span><small>orchestrate</small>
        </motion.div>
      </div>

      <div className="system-signals">
        <span><i /> ERP context synchronized</span>
        <span><i /> AI workflow online</span>
        <span><i /> Integration fabric healthy</span>
      </div>
    </motion.div>
  );
}
