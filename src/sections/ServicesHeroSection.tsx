import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ServicesHeroSection() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(labelRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo(headlineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '60vh',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="https://cdn.pixabay.com/video/2024/12/01/245716_large.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,3,2,0.5) 0%, rgba(5,3,2,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 1.5rem',
        }}
      >
        <span
          ref={labelRef}
          className="font-mono"
          style={{
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#E87029',
            opacity: 0,
          }}
        >
          Our Services
        </span>

        <h1
          ref={headlineRef}
          className="font-display"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#F1EBE4',
            maxWidth: '800px',
            marginTop: '1rem',
            opacity: 0,
            textWrap: 'balance',
          }}
        >
          Comprehensive Business Solutions for Every Stage of Your Journey
        </h1>
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, #050302)',
          zIndex: 1,
        }}
      />
    </div>
  );
}
