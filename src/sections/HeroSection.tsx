import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Building2, Globe2, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const nodes = contentRef.current.querySelectorAll('[data-animate]');
    const tween = gsap.fromTo(
      nodes,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
    );

    return () => {
      tween.kill();
    };
  }, []);

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero-section">
      <video className="hero-video" autoPlay muted loop playsInline preload="metadata">
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-pattern" />
      <div ref={contentRef} className="hero-content container">
        <p data-animate className="eyebrow hero-eyebrow">Business setup and corporate services in the UAE</p>
        <h1 data-animate>Your gateway to business <span>in the UAE.</span></h1>
        <p data-animate className="hero-copy">From company formation and residency to ongoing corporate support, Business Lab guides you through every stage of your UAE journey.</p>
        <div data-animate className="hero-actions">
          <button className="button button-primary" onClick={() => goTo('contact')}>Book a free consultation <ArrowRight size={17} /></button>
          <button className="button button-outline-light" onClick={() => goTo('services')}>Explore our services</button>
        </div>
        <div data-animate className="hero-trust-row">
          <div><Building2 size={18} /><span>Mainland and free zones</span></div>
          <div><Globe2 size={18} /><span>International entrepreneurs</span></div>
          <div><ShieldCheck size={18} /><span>End-to-end support</span></div>
        </div>
      </div>
    </section>
  );
}
