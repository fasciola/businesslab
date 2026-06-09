import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  lenisRef: React.MutableRefObject<Lenis | null>;
}

const navLinks = [
  { label: 'Home', path: '/', targetId: '' },
  { label: 'Services', path: '/services', targetId: '' },
  { label: 'Coaching', path: '/', targetId: 'introduction' },
  { label: 'About Us', path: '/', targetId: 'introduction' },
  { label: 'Contact', path: '/', targetId: 'contact' },
];

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Entrance animation on load
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 });
    }
  }, []);

  // Scroll behavior: hide/show nav
  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);
      setVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const handleNavClick = (path: string, targetId: string) => {
    setMobileOpen(false);
    setLangOpen(false);

    if (path === '/' && targetId) {
      if (isHome) {
        const el = document.getElementById(targetId);
        if (el && lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -80 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="nav-container"
        style={{
          position: 'fixed',
          top: scrolled || !isHome ? '12px' : '20px',
          left: '50%',
          transform: `translateX(-50%) translateY(${visible || !isHome ? '0' : '-150%'})`,
          width: 'calc(100% - 32px)',
          maxWidth: '1400px',
          zIndex: 50,
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), top 0.3s ease',
          background: 'rgba(5, 3, 2, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(241, 235, 228, 0.06)',
          borderRadius: '9999px',
          opacity: 0,
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-display"
          style={{
            fontSize: 'clamp(0.85rem, 2.5vw, 1.125rem)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#F1EBE4',
            textDecoration: 'none',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Business Lab
        </Link>

        {/* Desktop center links — hidden on mobile */}
        <div
          className="nav-desktop-links font-body"
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 2vw, 2rem)',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.label + item.path + item.targetId}
              to={item.path}
              onClick={(e) => {
                if (item.targetId && isHome) {
                  e.preventDefault();
                  handleNavClick(item.path, item.targetId);
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#F1EBE4',
                opacity: 0.7,
                fontSize: '0.8rem',
                fontWeight: 400,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                padding: 0,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.7'; }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          {/* Language toggle — desktop only */}
          <div className="nav-lang" style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="font-body"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(241, 235, 228, 0.5)',
                fontSize: '0.8rem',
                fontWeight: 400,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                padding: '0.25rem 0.5rem',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#F1EBE4'; }}
              onMouseLeave={(e) => { if (!langOpen) (e.target as HTMLElement).style.color = 'rgba(241, 235, 228, 0.5)'; }}
            >
              EN
            </button>
            {langOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  background: 'rgba(20, 16, 14, 0.98)',
                  border: '1px solid rgba(241, 235, 228, 0.08)',
                  borderRadius: '4px',
                  padding: '0.5rem 0',
                  minWidth: '60px',
                  backdropFilter: 'blur(12px)',
                  zIndex: 100,
                }}
              >
                {['EN', 'AR', 'RU'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLangOpen(false)}
                    className="font-body"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.4rem 1rem',
                      background: 'none',
                      border: 'none',
                      color: lang === 'EN' ? '#E87029' : 'rgba(241, 235, 228, 0.7)',
                      fontSize: '0.8rem',
                      fontWeight: 400,
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button — desktop full text, mobile short */}
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el && lenisRef.current) {
                  lenisRef.current.scrollTo(el, { offset: -80 });
                } else if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className="font-body nav-cta-full"
            style={{
              background: '#E87029',
              color: '#050302',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'filter 0.3s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1.15)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1)'; }}
          >
            Book
          </Link>

          {/* Mobile hamburger — inside nav pill */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-hamburger"
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.35rem',
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            <span style={{
              width: '18px',
              height: '2px',
              background: '#F1EBE4',
              borderRadius: '1px',
              transition: 'transform 0.3s ease',
              transform: mobileOpen ? 'rotate(45deg) translateY(3px)' : 'none',
            }} />
            <span style={{
              width: '18px',
              height: '2px',
              background: '#F1EBE4',
              borderRadius: '1px',
              transition: 'opacity 0.3s ease',
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              width: '18px',
              height: '2px',
              background: '#F1EBE4',
              borderRadius: '1px',
              transition: 'transform 0.3s ease',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-3px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile hamburger overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: 'rgba(5, 3, 2, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            paddingTop: '5rem',
          }}
        >
          {navLinks.map((item, i) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={(e) => {
                setMobileOpen(false);
                if (item.targetId && isHome) {
                  e.preventDefault();
                  handleNavClick(item.path, item.targetId);
                }
              }}
              className="font-display"
              style={{
                color: '#F1EBE4',
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                opacity: 0,
                transform: 'translateY(20px)',
                animation: `fadeInUp 0.5s ease ${i * 0.06}s forwards`,
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/#contact"
            onClick={() => setMobileOpen(false)}
            className="font-body"
            style={{
              marginTop: '1rem',
              background: '#E87029',
              color: '#050302',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '0.85rem 2.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              opacity: 0,
              animation: 'fadeInUp 0.5s ease 0.4s forwards',
            }}
          >
            Book Consultation
          </Link>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Desktop: show links, show full CTA, hide hamburger */
        @media (min-width: 768px) {
          .nav-hamburger { display: none !important; }
          .nav-cta-full { font-size: 0.8rem !important; padding: 0.55rem 1.5rem !important; }
        }

        /* Mobile: hide links, show hamburger, short CTA */
        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-lang { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-cta-full { font-size: 0.7rem !important; padding: 0.45rem 0.9rem !important; }
          .nav-container { padding: 0.5rem 0.75rem !important; width: calc(100% - 24px) !important; }
        }
      `}</style>
    </>
  );
}
