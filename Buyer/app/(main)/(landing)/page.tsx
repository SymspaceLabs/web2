// ======================================================================
// Landing Page
// app/(landing)/page.tsx
// ======================================================================

// ✅ Metadata for SEO
export const metadata = {
  title: 'Symspace - AI Powered AR Commerce',
  description: 'Revolutionize your shopping experience through Augmented Reality.',
  openGraph: {
    title: 'Symspace - Future of Retail',
    description: 'Shop with confidence using AR technology',
    images: ['/og-image.jpg'],
  }
};

import Section1 from './sections/section-1';
import Section2 from './sections/section-2';
import Section3 from './sections/section-3';
import Section4 from './sections/section-4';
import Section5 from './sections/section-5';
import Section6 from './sections/section-6';
import Section7 from './sections/section-7';
import Section8 from './sections/section-8';
import Section9 from './sections/section-9';
import Section10 from './sections/section-10';
import Section11 from './sections/section-11';
import Section12 from './sections/section-12';
import Section13 from './sections/section-13';
import Section14 from './sections/section-14';
import Section15 from './sections/section-15';
import Section16 from './sections/section-16';
import BlobBackground from '@/components/blob-background';

// ✅ Server Component (default) - No 'use client' needed
export default function LandingPage() {
  return (
    <main className="relative bg-[#1F1F1F] overflow-hidden">
      {/* Background Blobs */}
      <BlobBackground />
      
      {/* Sections */}
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
      <Section10 />
      <Section11 />
      <Section12 />
      <Section13 />
      <Section14 />
      <Section15 />
      <Section16 />
    </main>
  );
}