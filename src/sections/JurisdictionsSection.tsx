import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const jurisdictions = [
  {
    label: 'UNRESTRICTED TRADE',
    title: 'Mainland',
    slug: 'mainland',
    description: 'Operate anywhere in the UAE and internationally. 100% foreign ownership available for most activities.',
    cta: 'Explore Mainland',
  },
  {
    label: 'TAX EFFICIENT',
    title: 'Free Zone',
    slug: 'free-zone',
    description: '0% Corporate Tax benefits, 100% foreign ownership, and simplified setup processes.',
    cta: 'Explore Free Zone',
  },
  {
    label: 'ASSET PROTECTION',
    title: 'Offshore',
    slug: 'offshore',
    description: 'Secure your global assets and manage wealth with complete privacy and confidentiality.',
    cta: 'Explore Offshore',
  },
];

interface JurisdictionsSectionProps {
  // no props needed
}

export default function JurisdictionsSection(_props: JurisdictionsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
        padding: 'clamp(6rem, 10vh, 10rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Heading */}
      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#F1EBE4',
          textAlign: 'center',
        }}
      >
        Choose Your Jurisdiction
      </h2>

      <p
        className="font-body"
        style={{
          fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
          fontWeight: 300,
          lineHeight: 1.65,
          color: 'rgba(241, 235, 228, 0.5)',
          textAlign: 'center',
          maxWidth: '500px',
          margin: '0.75rem auto 0',
        }}
      >
        Select the perfect setup for your business goals and operational needs.
      </p>

      {/* Cards */}
      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginTop: '4rem',
        }}
        className="jurisdiction-cards"
      >
        {jurisdictions.map((j) => (
          <div
            key={j.title}
            className="glass-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'default',
              opacity: 0,
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.7rem',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#E87029',
              }}
            >
              {j.label}
            </span>

            <h4
              className="font-display"
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#F1EBE4',
                marginTop: '1rem',
              }}
            >
              {j.title}
            </h4>

            <p
              className="font-body"
              style={{
                fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'rgba(241, 235, 228, 0.5)',
                marginTop: '0.75rem',
                flex: 1,
              }}
            >
              {j.description}
            </p>

            <Link
              to={`/services/${j.slug}`}
              className="font-body link-underline"
              style={{
                color: '#E87029',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                marginTop: '1.5rem',
                display: 'inline-block',
              }}
            >
              {j.cta}
            </Link>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .jurisdiction-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
