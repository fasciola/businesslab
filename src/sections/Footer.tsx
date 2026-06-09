import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(footerRef.current,
              { y: '8vh', opacity: 0.5 },
              { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const linkStyle: React.CSSProperties = {
    color: '#F1EBE4',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
    textDecoration: 'none',
    fontFamily: "'Inter', sans-serif",
    transition: 'color 0.3s ease',
    display: 'block',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    fontWeight: 400,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(241, 235, 228, 0.5)',
    fontFamily: "'IBM Plex Mono', monospace",
    marginBottom: '1.5rem',
  };

  return (
    <footer
      ref={footerRef}
      style={{
        padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem) 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        opacity: 0.5,
      }}
    >
      {/* Main footer grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '3rem',
        }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div>
          <Link
            to="/"
            className="font-display"
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#F1EBE4',
              textDecoration: 'none',
            }}
          >
            Business Lab
          </Link>
          <p
            className="font-body"
            style={{
              fontSize: '0.875rem',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'rgba(241, 235, 228, 0.5)',
              marginTop: '0.75rem',
            }}
          >
            Your Business Companions.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            {['LinkedIn', 'Twitter', 'Facebook'].map((social) => (
              <a
                key={social}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={social}
                style={{
                  color: 'rgba(241, 235, 228, 0.5)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#E87029'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(241, 235, 228, 0.5)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  {social === 'LinkedIn' && (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  )}
                  {social === 'Twitter' && (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  )}
                  {social === 'Facebook' && (
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={headingStyle}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/" style={linkStyle} className="link-underline">Home</Link>
            <Link to="/services" style={linkStyle} className="link-underline">Services</Link>
            <Link to="/" style={linkStyle} className="link-underline">About Us</Link>
            <Link to="/" style={linkStyle} className="link-underline">Contact</Link>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={headingStyle}>Services</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/services" style={linkStyle} className="link-underline">Mainland Setup</Link>
            <Link to="/services" style={linkStyle} className="link-underline">Free Zone Setup</Link>
            <Link to="/services" style={linkStyle} className="link-underline">Visa Services</Link>
            <Link to="/services" style={linkStyle} className="link-underline">Corporate Banking</Link>
          </div>
        </div>

        {/* Connect */}
        <div>
          <h4 style={headingStyle}>Connect With Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="mailto:contact@businesslab.ae"
              className="font-body link-underline"
              style={{
                ...linkStyle,
                display: 'inline-block',
              }}
            >
              contact@businesslab.ae
            </a>
            <span className="font-body" style={{ ...linkStyle, cursor: 'default' }}>+971 54 589 4176</span>
            <span className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(241, 235, 228, 0.5)', lineHeight: 1.5, marginTop: '0.5rem' }}>
              <strong style={{ color: 'rgba(241, 235, 228, 0.7)', fontWeight: 500 }}>DUBAI OFFICE:</strong><br />
              Blue Bay Tower, Office 1619, Business Bay, Dubai, UAE
            </span>
            <span className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(241, 235, 228, 0.5)', lineHeight: 1.5 }}>
              <strong style={{ color: 'rgba(241, 235, 228, 0.7)', fontWeight: 500 }}>AJMAN OFFICE:</strong><br />
              Amber Gem Tower – Mezzanine Floor, Sheikh Khalifa Bin Zayed St, Ajman, UAE
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(241, 235, 228, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(241, 235, 228, 0.5)',
          }}
        >
          © 2026 Business Lab. All Rights Reserved.
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" onClick={(e) => e.preventDefault()} className="font-mono link-underline" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(241, 235, 228, 0.5)', textDecoration: 'none', transition: 'color 0.3s ease' }}>Privacy Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="font-mono link-underline" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(241, 235, 228, 0.5)', textDecoration: 'none', transition: 'color 0.3s ease' }}>Terms & Conditions</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
