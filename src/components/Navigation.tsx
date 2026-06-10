import { useEffect, useState } from 'react';
import type { CSSProperties, MutableRefObject } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Lenis from 'lenis';

interface NavigationProps {
  lenisRef: MutableRefObject<Lenis | null>;
}

const links = [
  { label: 'Home', section: 'hero' },
  { label: 'Services', section: 'services' },
  { label: 'Jurisdictions', section: 'jurisdictions' },
  { label: 'Process', section: 'process' },
  { label: 'Insights', section: 'insights' },
  { label: 'Contact', section: 'contact' },
];

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollToSection = (section: string) => {
    const performScroll = () => {
      const element = document.getElementById(section);
      if (!element) return;
      if (lenisRef.current) lenisRef.current.scrollTo(element, { offset: -84 });
      else element.scrollIntoView({ behavior: 'smooth' });
    };

    setMobileOpen(false);
    setLangOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(performScroll, 160);
    } else {
      performScroll();
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="brand-button" onClick={() => scrollToSection('hero')} aria-label="Business Lab home">
            <img src="/logo.png" alt="Business Lab" className="brand-logo" />
          </button>

          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <button key={link.label} onClick={() => scrollToSection(link.section)} className="nav-link">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="language-picker">
              <button className="language-button" onClick={() => setLangOpen((value) => !value)} aria-expanded={langOpen}>
                EN <ChevronDown size={14} />
              </button>
              {langOpen && (
                <div className="language-menu">
                  <button className="active">EN</button>
                  <button>AR</button>
                  <button>RU</button>
                </div>
              )}
            </div>

            <button className="button button-primary nav-consultation" onClick={() => scrollToSection('contact')}>
              Book consultation
            </button>

            <button className="mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
              <Menu size={25} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu-top">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="Business Lab" className="brand-logo" />
          </Link>
          <button className="mobile-menu-button" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
            <X size={28} />
          </button>
        </div>

        <nav className="mobile-links" aria-label="Mobile navigation">
          {links.map((link, index) => (
            <button key={link.label} onClick={() => scrollToSection(link.section)} style={{ '--delay': `${index * 55}ms` } as CSSProperties}>
              <span>0{index + 1}</span>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <button className="button button-primary" onClick={() => scrollToSection('contact')}>
            Book a free consultation
          </button>
          <p>Company formation, residency and corporate services across the UAE.</p>
        </div>
      </div>
    </>
  );
}
