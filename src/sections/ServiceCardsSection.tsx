import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Company Formation & Licensing',
    slug: 'mainland',
    description: 'Expert guidance on choosing the right jurisdiction (Mainland, Free Zone, Offshore) and obtaining your trade license. We handle all documentation, approvals, and registration processes to get your business up and running swiftly.',
    features: ['Mainland Company Setup', 'Offshore Incorporation', 'Free Zone License', 'Trade License Issuance'],
    imagePrompt: 'Abstract aerial view of Dubai business district at dusk, warm golden lights, dark blue sky, architectural geometry. Dark moody premium feel.',
  },
  {
    number: '02',
    title: 'Visa & Residency Solutions',
    slug: 'visa',
    description: 'End-to-end processing for all visa types. Whether you need a Golden Visa for long-term stability, Investor Visas for shareholders, or Employment Visas for your growing team, we manage the entire lifecycle.',
    features: ['UAE Golden Visa', 'Employment Visas', 'Investor/Partner Visas', 'Family Sponsorship'],
    imagePrompt: 'Close-up of a premium UAE residency visa stamp on a dark leather passport, warm side-lighting, shallow depth of field, rich textures.',
  },
  {
    number: '03',
    title: 'Corporate Banking Assistance',
    slug: 'banking',
    description: 'Navigating the banking landscape can be challenging. We provide strategic advice and personal introductions to leading UAE banks, assisting with documentation and compliance to ensure a smooth account opening experience.',
    features: ['Account Opening Support', 'Documentation Preparation', 'Bank Selection Advisory', 'Compliance Assistance'],
    imagePrompt: 'Abstract architectural interior of a modern premium bank lobby, warm marble and brass surfaces, dramatic lighting, dark tones with golden accents.',
  },
  {
    number: '04',
    title: 'Corporate Services & Compliance',
    slug: 'offshore',
    description: 'Stay compliant and focused on your core business. We offer ongoing support for license renewals, amendments, VAT registration, and ensuring your business adheres to all local regulations.',
    features: ['License Renewals', 'Regulatory Compliance', 'VAT Registration', 'Government Liaison'],
    imagePrompt: 'Abstract close-up of official UAE government documents and stamps on a dark wooden desk, warm directional light, premium editorial feel.',
  },
  {
    number: '05',
    title: 'Relocation & Concierge',
    slug: 'free-zone',
    description: "Making your move to the UAE effortless. From finding the perfect office space or home to setting up utilities and finding schools for your children, our concierge team is here to help you settle in.",
    features: ['Home & Office Search', 'Utility Setup', 'School Search Support', 'Settling-in Services'],
    imagePrompt: 'Aerial twilight view of a premium Dubai residential neighborhood with illuminated villas and palm-lined streets, warm golden glow against deep blue sky.',
  },
];

export default function ServiceCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isOdd = i % 2 === 0;
        gsap.fromTo(card,
          { x: isOdd ? -40 : 40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        padding: 'clamp(6rem, 10vh, 10rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      {services.map((service, i) => {
        const isOdd = i % 2 === 0;
        return (
          <div
            key={service.number}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="glass-card"
            style={{
              display: 'grid',
              gridTemplateColumns: isOdd ? '45% 55%' : '55% 45%',
              overflow: 'hidden',
              opacity: 0,
              cursor: 'default',
            }}
          >
            {/* Image side */}
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                order: isOdd ? 0 : 1,
                aspectRatio: '16/10',
              }}
              className="service-image-container"
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, #1a0e08 0%, #2a1810 50%, #1a0e08 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.6s ease',
                }}
                className="service-image"
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: 800,
                    color: 'rgba(232, 112, 41, 0.15)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {service.number}
                </span>
              </div>
            </div>

            {/* Text side */}
            <div
              style={{
                padding: '2.5rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                order: isOdd ? 1 : 0,
              }}
              className="service-text"
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
                {service.number}
              </span>

              <h4
                className="font-display"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: '#F1EBE4',
                  marginTop: '0.75rem',
                }}
              >
                {service.title}
              </h4>

              <p
                className="font-body"
                style={{
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(241, 235, 228, 0.5)',
                  marginTop: '1rem',
                  maxWidth: '90%',
                }}
              >
                {service.description}
              </p>

              {/* Feature grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginTop: '1.5rem',
                }}
                className="service-features"
              >
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="#E87029" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span
                      className="font-body"
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: '#F1EBE4',
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to={`/services/${service.slug}`}
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
                  alignSelf: 'flex-start',
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        );
      })}

      <style>{`
        @media (max-width: 768px) {
          .glass-card {
            grid-template-columns: 1fr !important;
          }
          .service-image-container {
            order: 0 !important;
            aspect-ratio: 16/9 !important;
          }
          .service-text {
            order: 1 !important;
            padding: 2rem !important;
          }
          .service-features {
            grid-template-columns: 1fr !important;
          }
        }
        .glass-card:hover .service-image {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
}
