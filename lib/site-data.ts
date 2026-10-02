import {
  Blocks,
  BrainCircuit,
  ChartNoAxesCombined,
  Code2,
  Eye,
  Network,
  PackageCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

export const capabilities = [
  {
    icon: Blocks,
    index: '01',
    title: 'ERP & Business Platforms',
    text: 'Unify inventory, operations, approvals, workflows, financial visibility, and management decisions in software built around how the company actually works.',
    outcome: 'One operating system. Fewer blind spots.',
  },
  {
    icon: BrainCircuit,
    index: '02',
    title: 'AI & Automation',
    text: 'Turn repetitive work and complex operational decisions into reliable, human-supervised intelligent workflows.',
    outcome: 'More capacity without losing control.',
  },
  {
    icon: Eye,
    index: '03',
    title: 'Computer Vision',
    text: 'Connect cameras and physical operations to digital intelligence for verification, traceability, quality, and operational awareness.',
    outcome: 'Make physical events digitally actionable.',
  },
  {
    icon: Network,
    index: '04',
    title: 'Systems Integration',
    text: 'Connect ERP, APIs, databases, devices, and external services into one coordinated enterprise ecosystem.',
    outcome: 'Integrate first. Replace only when necessary.',
  },
  {
    icon: ChartNoAxesCombined,
    index: '05',
    title: 'Data & Decision Intelligence',
    text: 'Transform fragmented operational data into live dashboards, alerts, analytics, forecasts, and decision-support tools.',
    outcome: 'Move from reporting to action.',
  },
  {
    icon: Code2,
    index: '06',
    title: 'Custom Digital Products',
    text: 'Engineer focused software products for differentiated workflows, new ventures, customer experiences, and operational innovation.',
    outcome: 'Purpose-built digital advantage.',
  },
];

export const solutions = [
  {
    icon: PackageCheck,
    label: 'PHARMA / OPERATIONS',
    title: 'AI-enabled pharmaceutical inventory verification',
    text: 'A physical-digital control layer that observes warehouse movement, correlates it with ERP/WMS authorization, and escalates mismatches before stock exits a controlled boundary.',
    tags: ['Computer vision', 'ERP integration', 'Verification logic'],
    featured: true,
  },
  {
    icon: Workflow,
    label: 'ENTERPRISE CORE',
    title: 'Smart ERP & operations platform',
    text: 'A modular environment joining inventory, approvals, workflow, finance visibility, integrations, and executive insight.',
    tags: ['Custom ERP', 'Workflow', 'Live dashboards'],
  },
  {
    icon: Sparkles,
    label: 'CUSTOMER OPERATIONS',
    title: 'AI customer & appointment assistant',
    text: 'An intelligent service layer that answers, qualifies, schedules, and hands off customer conversations with context intact.',
    tags: ['AI assistant', 'Scheduling', 'Human handoff'],
  },
  {
    icon: ChartNoAxesCombined,
    label: 'DECISION INTELLIGENCE',
    title: 'Operational analytics command center',
    text: 'A management workspace that consolidates data, surfaces exceptions, and helps leaders move from metrics to action.',
    tags: ['Analytics', 'Forecasting', 'Executive views'],
  },
];

export const processSteps = [
  ['01', 'Discover', 'Map the real operating problem, constraints, users, current systems, and measurable business outcome.'],
  ['02', 'Architect', 'Design the system, data, integrations, security, infrastructure, and delivery blueprint.'],
  ['03', 'Prototype', 'Make the highest-risk ideas tangible and testable before scaling investment.'],
  ['04', 'Integrate', 'Connect the product to the platforms, APIs, devices, people, and workflows around it.'],
  ['05', 'Validate', 'Measure reliability, edge cases, performance, security, and operational readiness.'],
  ['06', 'Deploy', 'Launch with observability, documentation, ownership, and adoption built in.'],
  ['07', 'Improve', 'Use live operational evidence to strengthen the system and compound business value.'],
] as const;

export const founders = [
  {
    initials: 'MS',
    name: 'ENG. Mohammad Shaaban',
    role: 'CCE Engineer | Technical Systems Lead',
    bio: 'Mohammad leads technical architecture across MAK Builders — from investigation and system design through AI, computer vision, integrations, and end-to-end technical planning.',
    focus: ['System architecture', 'AI & computer vision', 'Systems integration', 'Hardware–software systems', 'Technical planning'],
  },
  {
    initials: '02',
    name: 'Founding Member 02',
    role: 'Role title — to be finalized',
    bio: 'Founder profile intentionally left editable until the team confirms the final responsibilities and public positioning.',
    focus: ['Focus area — editable', 'Responsibility — editable', 'Expertise — editable'],
  },
  {
    initials: '03',
    name: 'Founding Member 03',
    role: 'Role title — to be finalized',
    bio: 'Founder profile intentionally left editable until the team confirms the final responsibilities and public positioning.',
    focus: ['Focus area — editable', 'Responsibility — editable', 'Expertise — editable'],
  },
];

export const faqs = [
  ['Do you only build AI products?', 'No. We build complete business systems. AI is used where it creates practical leverage; the foundation may also include ERP, integrations, data infrastructure, automation, and custom software.'],
  ['Can you work with our existing ERP?', 'Yes. Integration-first delivery is a core MAK Builders principle. We can extend an existing stack, connect multiple systems, or build a focused layer around legacy software.'],
  ['Is the warehouse platform your main product?', 'It is one highlighted solution and an example of our physical-digital engineering capabilities. MAK Builders is broader: ERP, AI-native systems, integration, automation, data, and custom products.'],
  ['Where is MAK Builders based?', 'MAK Builders is being built from Lebanon with an enterprise mindset and ambitions to serve regional and global companies.'],
] as const;
