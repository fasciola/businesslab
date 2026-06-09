import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'ANC', width: 60 },
  { name: 'DMCC', width: 100 },
  { name: 'Dubai Economy and Tourism', width: 140 },
  { name: 'IFZA', width: 80 },
  { name: 'Jafza', width: 80 },
  { name: 'RAKEZ', width: 80 },
  { name: 'SPC', width: 60 },
];

export default function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logosRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6, ease: 'power2.out',
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
        padding: '4rem clamp(1.5rem, 5vw, 4rem) 6rem',
        maxWidth: '1400px',
        margin: '0 auto',
        borderTop: '1px solid rgba(241, 235, 228, 0.08)',
      }}
    >
      {/* Heading */}
      <p
        className="font-mono"
        style={{
          fontSize: '0.7rem',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(241, 235, 228, 0.5)',
          textAlign: 'center',
        }}
      >
        Our Strategic Partners
      </p>

      {/* Logos */}
      <div
        ref={logosRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '3rem',
          gap: '2rem',
          flexWrap: 'wrap',
          opacity: 0,
        }}
      >
        {partners.map((p) => (
          <span
            key={p.name}
            className="font-display"
            style={{
              fontSize: p.name.length > 10 ? '0.85rem' : '1rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'rgba(241, 235, 228, 0.5)',
              opacity: 0.5,
              filter: 'grayscale(100%)',
              transition: 'opacity 0.4s ease, filter 0.4s ease',
              cursor: 'default',
              whiteSpace: 'nowrap',
              flex: '1 1 auto',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = '1';
              (e.target as HTMLElement).style.filter = 'grayscale(0%)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = '0.5';
              (e.target as HTMLElement).style.filter = 'grayscale(100%)';
            }}
          >
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}
