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
  return (
    <main className="home-page">
      <HeroSection />
      <section id="services" className="page-section page-section-light">
        <IntroductionSection />
      </section>
      <section id="jurisdictions" className="page-section page-section-peach">
        <JurisdictionsSection />
      </section>
      <section id="process" className="page-section page-section-light">
        <PartnersSection />
      </section>
      <section id="insights" className="page-section page-section-navy">
        <SuccessStoriesSection />
      </section>
      <section id="contact" className="page-section page-section-contact">
        <ContactSection />
      </section>
      <Footer />
    </main>
  );
}
