import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Business Lab made my move to Dubai incredibly smooth. They handled everything from my company license to my family\'s visas.',
    name: 'Sarah J.',
    location: 'Dubai',
  },
  {
    quote: 'The team\'s knowledge of the banking sector was invaluable. I got my corporate account opened in record time.',
    name: 'Ahmed K.',
    location: 'Abu Dhabi',
  },
  {
    quote: 'Professional, transparent, and always available. Highly recommended for anyone looking to set up in the UAE.',
    name: 'Elena R.',
    location: 'Sharjah',
  },
];

export default function SuccessStoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
        What Our Clients Say
      </h2>

      <p
        className="font-body"
        style={{
          fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
          fontWeight: 300,
          lineHeight: 1.65,
          color: 'rgba(241, 235, 228, 0.5)',
          textAlign: 'center',
          marginTop: '0.5rem',
        }}
      >
        Real stories from entrepreneurs who trusted Business Lab.
      </p>

      {/* Testimonials */}
      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginTop: '4rem',
        }}
        className="testimonial-grid"
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            style={{
              padding: '2rem 2rem 2rem 2.5rem',
              borderLeft: '2px solid #E87029',
              opacity: 0,
            }}
          >
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.65,
                color: '#F1EBE4',
              }}
            >
              "{t.quote}"
            </p>

            <div style={{ marginTop: '1.5rem' }}>
              <span
                className="font-body"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#F1EBE4',
                }}
              >
                {t.name}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(241, 235, 228, 0.5)',
                  marginLeft: '0.5rem',
                }}
              >
                {t.location}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
