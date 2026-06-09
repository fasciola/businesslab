import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../sections/Footer';
import { serviceDataMap, type ServiceData, type CardItem, type TimelineItem } from '../data/serviceData';

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG icon map ─── */
function ServiceIcon({ name }: { name: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E87029" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {name === 'users' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
      {name === 'globe' && <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>}
      {name === 'check' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>}
      {name === 'briefcase' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>}
      {name === 'percent' && <><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></>}
      {name === 'truck' && <><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>}
      {name === 'zap' && <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>}
      {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>}
      {name === 'eye' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
      {name === 'dollar' && <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>}
      {name === 'building' && <><line x1="3" y1="21" x2="21" y2="21" /><line x1="5" y1="21" x2="5" y2="7" /><line x1="19" y1="21" x2="19" y2="7" /><rect x="5" y="3" width="14" height="4" rx="1" /><line x1="9" y1="10" x2="9" y2="10.01" /><line x1="15" y1="10" x2="15" y2="10.01" /><line x1="9" y1="14" x2="9" y2="14.01" /><line x1="15" y1="14" x2="15" y2="14.01" /></>}
      {name === 'smartphone' && <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>}
      {name === 'anchor' && <><circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></>}
      {name === 'file' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>}
      {name === 'user-check' && <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></>}
      {name === 'shield' && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>}
      {name === 'map-pin' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>}
      {name === 'cpu' && <><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></>}
      {name === 'clipboard' && <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></>}
      {name === 'search' && <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>}
      {name === 'heart' && <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></>}
      {name === 'credit-card' && <><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></>}
      {name === 'trending' && <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>}
      {name === 'refresh' && <><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></>}
      {name === 'file-text' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>}
      {name === 'activity' && <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>}
      {name === 'check-circle' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>}
    </svg>
  );
}

/* ─── Hero ─── */
function ServiceHero({ service }: { service: ServiceData }) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(labelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      .fromTo(headlineRef.current, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.2')
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
      .fromTo(ctaRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    return () => { tl.kill(); };
  }, []);

  return (
    <div style={{
      position: 'relative', width: '100%', minHeight: '55vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '8rem 1.5rem 5rem',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(232, 112, 41, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(58, 21, 0, 0.15) 0%, transparent 50%), #050302',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '850px' }}>
        <span ref={labelRef} className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E87029', opacity: 0 }}>
          {service.label}
        </span>
        <h1 ref={headlineRef} className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F1EBE4', marginTop: '0.75rem', opacity: 0, textWrap: 'balance' }}>
          {service.heroTitle}
        </h1>
        <p ref={descRef} className="font-body" style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', fontWeight: 300, lineHeight: 1.65, color: 'rgba(241, 235, 228, 0.5)', maxWidth: '560px', margin: '1.25rem auto 0', opacity: 0 }}>
          {service.heroDescription}
        </p>
        <Link ref={ctaRef} to="/#contact" className="font-body" style={{ display: 'inline-block', marginTop: '2rem', background: '#E87029', color: '#050302', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.85rem 2.25rem', borderRadius: '9999px', textDecoration: 'none', transition: 'filter 0.3s ease, transform 0.3s ease', opacity: 0 }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1.15)'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1)'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
        >
          {service.ctaText} →
        </Link>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to bottom, transparent, #050302)', zIndex: 1 }} />
    </div>
  );
}

/* ─── Benefits ─── */
function BenefitsSection({ benefits }: { benefits: ServiceData['benefits'] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current?.querySelectorAll('.benefit-card') || [],
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F1EBE4', textAlign: 'center' }}>
        {benefits.title}
      </h2>
      <div style={{ width: '48px', height: '3px', background: '#E87029', margin: '1rem auto 0', borderRadius: '2px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(benefits.items.length, 4)}, 1fr)`, gap: '1.5rem', marginTop: '3.5rem' }} className="benefits-grid">
        {benefits.items.map((item) => (
          <div key={item.title} className="benefit-card glass-card" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', opacity: 0, transform: 'none' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(232, 112, 41, 0.1)', border: '1px solid rgba(232, 112, 41, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ServiceIcon name={item.icon} />
            </div>
            <h4 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.2, color: '#F1EBE4', margin: 0 }}>
              {item.title}
            </h4>
            <p className="font-body" style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(241, 235, 228, 0.5)', margin: 0 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 1024px) { .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .benefits-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

/* ─── Checklist Middle Section ─── */
function ChecklistMiddle({ content }: { content: { type: 'checklist'; title: string; subtitle?: string; items: string[]; ctaText?: string } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current?.querySelectorAll('.mid-animate') || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ padding: 'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="mid-animate glass-card" style={{ padding: 'clamp(2.5rem, 4vw, 4rem)', textAlign: 'center', maxWidth: '900px', margin: '0 auto', opacity: 0, transform: 'none' }}>
        <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F1EBE4' }}>
          {content.title}
        </h3>
        {content.subtitle && (
          <p className="font-body" style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.65, color: 'rgba(241, 235, 228, 0.5)', marginTop: '0.5rem' }}>
            {content.subtitle}
          </p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem', marginTop: '2.5rem', textAlign: 'left' }} className="checklist-grid">
          {content.items.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E87029" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="font-body" style={{ fontSize: '0.9rem', fontWeight: 300, color: '#F1EBE4' }}>{item}</span>
            </div>
          ))}
        </div>
        {content.ctaText && (
          <Link to="/#contact" className="font-body" style={{ display: 'inline-block', marginTop: '2.5rem', background: '#E87029', color: '#050302', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.85rem 2.25rem', borderRadius: '9999px', textDecoration: 'none', transition: 'filter 0.3s ease, transform 0.3s ease' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1.15)'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1)'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            {content.ctaText}
          </Link>
        )}
        <style>{`@media (max-width: 640px) { .checklist-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </div>
  );
}

/* ─── Cards Middle Section ─── */
function CardsMiddle({ content }: { content: { type: 'cards'; title: string; subtitle?: string; items: CardItem[] } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current?.querySelectorAll('.mid-animate') || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ padding: 'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <h3 className="font-display mid-animate" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F1EBE4', textAlign: 'center', opacity: 0 }}>
        {content.title}
      </h3>
      {content.subtitle && (
        <p className="font-body mid-animate" style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.65, color: 'rgba(241, 235, 228, 0.5)', textAlign: 'center', marginTop: '0.5rem', opacity: 0 }}>
          {content.subtitle}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(content.items.length, 4)}, 1fr)`, gap: '1.5rem', marginTop: '3rem' }} className="mid-cards-grid">
        {content.items.map((item) => (
          <div key={item.title} className="mid-animate glass-card" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0, transform: 'none' }}>
            {item.badge && (
              <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E87029', background: 'rgba(232, 112, 41, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '9999px', display: 'inline-block', alignSelf: 'flex-start' }}>
                {item.badge}
              </span>
            )}
            <h4 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.2, color: '#F1EBE4', margin: 0 }}>
              {item.title}
            </h4>
            <p className="font-body" style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(241, 235, 228, 0.5)', margin: 0 }}>
              {item.description}
            </p>
            {item.features && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {item.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E87029" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-body" style={{ fontSize: '0.8rem', fontWeight: 400, color: 'rgba(241, 235, 228, 0.6)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            )}
            {item.divider && <div style={{ width: '32px', height: '3px', background: '#E87029', borderRadius: '2px', marginTop: '0.5rem' }} />}
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 1024px) { .mid-cards-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .mid-cards-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

/* ─── Timeline Middle Section ─── */
function TimelineMiddle({ content }: { content: { type: 'timeline'; title: string; subtitle?: string; items: TimelineItem[] } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current?.querySelectorAll('.mid-animate') || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ padding: 'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <h3 className="font-display mid-animate" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F1EBE4', textAlign: 'center', opacity: 0 }}>
        {content.title}
      </h3>
      {content.subtitle && (
        <p className="font-body mid-animate" style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.65, color: 'rgba(241, 235, 228, 0.5)', textAlign: 'center', marginTop: '0.5rem', opacity: 0 }}>
          {content.subtitle}
        </p>
      )}
      <div style={{ maxWidth: '700px', margin: '3rem auto 0', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '24px', top: '24px', bottom: '24px', width: '2px', background: 'linear-gradient(to bottom, #E87029, rgba(232, 112, 41, 0.2))' }} />
        {content.items.map((item, i) => (
          <div key={i} className="mid-animate" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: i < content.items.length - 1 ? '2.5rem' : 0, opacity: 0 }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(232, 112, 41, 0.1)', border: '2px solid #E87029', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
              <ServiceIcon name={item.icon} />
            </div>
            <div>
              <h5 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.2, color: '#F1EBE4', margin: '0.35rem 0 0.4rem' }}>
                {item.title}
              </h5>
              <p className="font-body" style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(241, 235, 228, 0.5)', margin: 0 }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CTA Section ─── */
function CTASection({ service }: { service: ServiceData }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current?.querySelectorAll('.cta-animate') || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232, 112, 41, 0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
        <h3 className="font-display cta-animate" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F1EBE4', opacity: 0, textWrap: 'balance' }}>
          {service.ctaSection.title}
        </h3>
        {service.ctaSection.description && (
          <p className="font-body cta-animate" style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.65, color: 'rgba(241, 235, 228, 0.5)', marginTop: '0.75rem', opacity: 0 }}>
            {service.ctaSection.description}
          </p>
        )}
        <div className="cta-animate" style={{ marginTop: '2rem', opacity: 0 }}>
          <Link to="/#contact" className="font-body" style={{ display: 'inline-block', background: '#F1EBE4', color: '#050302', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.85rem 2.25rem', borderRadius: '9999px', textDecoration: 'none', transition: 'filter 0.3s ease, transform 0.3s ease' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = 'brightness(0.95)'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1)'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            {service.ctaSection.buttonText} →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceDataMap[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [slug]);

  if (!service) {
    return (
      <div style={{ position: 'relative', zIndex: 1, background: '#050302', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h1 className="font-display" style={{ fontSize: '2rem', color: '#F1EBE4' }}>Page Not Found</h1>
        <Link to="/services" className="font-body" style={{ color: '#E87029', textDecoration: 'none' }}>← Back to Services</Link>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1, background: '#050302', minHeight: '100vh' }}>
      <ServiceHero service={service} />
      <BenefitsSection benefits={service.benefits} />

      {/* Render the correct middle section based on type */}
      {service.middleSection.type === 'checklist' && <ChecklistMiddle content={service.middleSection} />}
      {service.middleSection.type === 'cards' && <CardsMiddle content={service.middleSection} />}
      {service.middleSection.type === 'timeline' && <TimelineMiddle content={service.middleSection} />}

      <CTASection service={service} />
      <Footer />
    </div>
  );
}
