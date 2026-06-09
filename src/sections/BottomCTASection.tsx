import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BottomCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.querySelectorAll('.cta-animate') || [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        padding: '6rem clamp(1.5rem, 5vw, 4rem) 8rem',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(232, 112, 41, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2
          className="font-display cta-animate"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#F1EBE4',
            opacity: 0,
            textWrap: 'balance',
          }}
        >
          Ready to scale your business in the UAE?
        </h2>

        <div className="cta-animate" style={{ opacity: 0, marginTop: '2rem' }}>
          <Link
            to="/"
            className="font-body"
            style={{
              background: '#E87029',
              color: '#050302',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '1rem 3rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'filter 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.filter = 'brightness(1.15)';
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(232, 112, 41, 0.25)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.filter = 'brightness(1)';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Book Consultation
          </Link>
        </div>

        <p
          className="font-body cta-animate"
          style={{
            fontSize: '0.875rem',
            fontWeight: 400,
            color: 'rgba(241, 235, 228, 0.5)',
            marginTop: '1.5rem',
            opacity: 0,
          }}
        >
          Or call us at{' '}
          <a
            href="tel:+971545894176"
            style={{ color: '#E87029', textDecoration: 'none', transition: 'opacity 0.3s ease' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.8'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
          >
            +971 54 589 4176
          </a>
        </p>
      </div>
    </div>
  );
}
