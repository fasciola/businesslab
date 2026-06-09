import { useRef } from 'react';
import type { MutableRefObject } from 'react';
import Lenis from 'lenis';
import HeroSection from '../sections/HeroSection';
import IntroductionSection from '../sections/IntroductionSection';
import JurisdictionsSection from '../sections/JurisdictionsSection';
import SuccessStoriesSection from '../sections/SuccessStoriesSection';
import PartnersSection from '../sections/PartnersSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

interface HomePageProps {
  lenisRef: MutableRefObject<Lenis | null>;
}

export default function HomePage({ lenisRef: _lenisRef }: HomePageProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mainRef} style={{ position: 'relative', zIndex: 1 }}>
      <section id="hero" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
      </section>

      <section id="introduction" style={{ position: 'relative', zIndex: 2, background: '#050302' }}>
        <IntroductionSection />
      </section>

      <section id="jurisdictions" style={{ position: 'relative', zIndex: 2, background: 'rgba(241, 235, 228, 0.02)' }}>
        <JurisdictionsSection />
      </section>

      <section id="success-stories" style={{ position: 'relative', zIndex: 2, background: '#050302' }}>
        <SuccessStoriesSection />
      </section>

      <section id="partners" style={{ position: 'relative', zIndex: 2, background: '#050302' }}>
        <PartnersSection />
      </section>

      <section id="contact" style={{ position: 'relative', zIndex: 2, background: '#050302' }}>
        <ContactSection />
      </section>

      <div style={{ position: 'relative', zIndex: 2, background: '#050302' }}>
        <Footer />
      </div>
    </div>
  );
}
