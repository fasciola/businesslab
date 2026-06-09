import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const whyChooseItems = [
  {
    title: 'Holistic Ecosystem',
    description: 'We integrate legal, financial, and operational support into one seamless platform.',
  },
  {
    title: 'Speed & Efficiency',
    description: 'Our direct relationships with government bodies ensure the fastest turnaround times.',
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees. We provide clear, upfront costs for all our services.',
  },
];

export default function IntroductionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column
      gsap.fromTo(leftRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Right column items
      gsap.fromTo(rightRef.current?.querySelectorAll('.intro-item') || [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 45%) minmax(0, 55%)',
          gap: '4rem',
          alignItems: 'start',
        }}
        className="intro-grid"
      >
        {/* Left column */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#F1EBE4',
              textWrap: 'balance',
            }}
          >
            More Than Just Setup—We Are Your Strategic Partners.
          </h2>
        </div>

        {/* Right column */}
        <div ref={rightRef}>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              fontWeight: 300,
              lineHeight: 1.65,
              letterSpacing: '0.01em',
              color: '#F1EBE4',
            }}
          >
            Entering a new market is a significant milestone. At Business Lab, we don't just process paperwork; we build the foundation for your success. From selecting the right jurisdiction to securing your family's residency and opening corporate bank accounts, we are with you every step of the way.
          </p>

          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {whyChooseItems.map((item) => (
              <div key={item.title} className="intro-item" style={{ opacity: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      background: '#E87029',
                      borderRadius: '1px',
                      flexShrink: 0,
                      marginTop: '0.5em',
                    }}
                  />
                  <div>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        lineHeight: 1.15,
                        letterSpacing: '-0.01em',
                        color: '#F1EBE4',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-body"
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'rgba(241, 235, 228, 0.5)',
                        marginTop: '0.5rem',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .intro-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
