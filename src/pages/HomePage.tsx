import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../sections/HeroSection';
import IntroductionSection from '../sections/IntroductionSection';
import JurisdictionsSection from '../sections/JurisdictionsSection';
import SuccessStoriesSection from '../sections/SuccessStoriesSection';
import PartnersSection from '../sections/PartnersSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  lenisRef: MutableRefObject<Lenis | null>;
}

export default function HomePage({ lenisRef: _lenisRef }: HomePageProps) {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section-heading').forEach((heading) => {
        gsap.fromTo(
          heading.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 82%', once: true },
          },
        );
      });

      const groups = [
        '.service-card',
        '.jurisdiction-card',
        '.process-card',
        '.testimonial-card',
        '.insight-card',
        '.faq-item',
      ];

      groups.forEach((selector) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 42, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.72,
              delay: (index % 4) * 0.06,
              ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 88%', once: true },
            },
          );
        });
      });

      gsap.to('.hero-video', {
        scale: 1.08,
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-content', {
        yPercent: 18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.fromTo(
        '.contact-grid',
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-grid', start: 'top 84%', once: true },
        },
      );
    }, root);

    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      gsap.to('.hero-pattern', { x, y, duration: 1.2, ease: 'power2.out' });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="home-page">
      <HeroSection />
      <section id="services" className="page-section page-section-light animated-section">
        <IntroductionSection />
      </section>
      <section id="jurisdictions" className="page-section page-section-peach animated-section">
        <JurisdictionsSection />
      </section>
      <section id="process" className="page-section page-section-light animated-section">
        <PartnersSection />
      </section>
      <section id="insights" className="page-section page-section-navy animated-section">
        <SuccessStoriesSection />
      </section>
      <section id="contact" className="page-section page-section-contact animated-section">
        <ContactSection />
      </section>
      <Footer />
    </main>
  );
}
