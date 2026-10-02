import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAK Builders — Modular AI Knowledge',
  description:
    'MAK Builders develops ERP platforms, AI-native business systems, intelligent automation, computer vision, integrations, and next-generation enterprise software from Lebanon.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'MAK Builders — Modular AI Knowledge',
    description: 'We build the systems businesses will run on next.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
