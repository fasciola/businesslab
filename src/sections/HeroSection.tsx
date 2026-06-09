import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(headlineRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(subRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(chevronRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Video background — Dubai cityscape */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
              <source src="videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,3,2,0.35) 0%, rgba(5,3,2,0.65) 60%, rgba(5,3,2,0.9) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Radial vignette for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(5,3,2,0.3) 0%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 1.5rem',
        }}
      >
        <h1
          ref={headlineRef}
          className="font-display"
          style={{
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#F1EBE4',
            maxWidth: '900px',
            opacity: 0,
            textWrap: 'balance',
            textShadow: '0 4px 32px rgba(0,0,0,0.4)',
          }}
        >
          Your Business Companions in the{' '}
          <span style={{ color: '#E87029' }}>UAE.</span>
        </h1>

        <p
          ref={subRef}
          className="font-body"
          style={{
            fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
            fontWeight: 300,
            lineHeight: 1.65,
            letterSpacing: '0.01em',
            color: 'rgba(241, 235, 228, 0.7)',
            maxWidth: '600px',
            marginTop: '1.5rem',
            opacity: 0,
            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
          }}
        >
          Seamless Company Formation, Residency, and Corporate Services for Global Entrepreneurs.
        </p>

        <div
          ref={buttonsRef}
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: 0,
          }}
        >
          <Link
            to="/services"
            className="font-body"
            style={{
              background: '#E87029',
              color: '#050302',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'filter 0.3s ease, transform 0.3s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.filter = 'brightness(1.15)';
              (e.target as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.filter = 'brightness(1)';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Start Your Journey
          </Link>

          <Link
            to="/services"
            className="font-body"
            style={{
              background: 'transparent',
              color: '#F1EBE4',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              border: '1px solid rgba(241, 235, 228, 0.4)',
              textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = '#F1EBE4';
              (e.target as HTMLElement).style.color = '#050302';
              (e.target as HTMLElement).style.borderColor = '#F1EBE4';
              (e.target as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.color = '#F1EBE4';
              (e.target as HTMLElement).style.borderColor = 'rgba(241, 235, 228, 0.4)';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          opacity: 0,
          transition: 'opacity 0.5s ease',
          ...(scrolled ? { opacity: 0, pointerEvents: 'none' } : {}),
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(241, 235, 228, 0.4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animation: 'chevronBounce 2s ease-in-out infinite',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Bottom gradient fade to next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, #050302)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <style>{`
        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}
