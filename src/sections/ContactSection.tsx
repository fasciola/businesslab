import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  // extensible
}

const serviceOptions = [
  'Company Formation',
  'Visa & Residency',
  'Corporate Banking',
  'Corporate Services',
  'Relocation & Concierge',
  'Other',
];

export default function ContactSection(_props: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectOpen, setSelectOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(formRef.current?.querySelectorAll('.form-field') || [],
        { y: 15, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateField = (name: string, value: string) => {
    if (!value.trim()) return 'This field is required';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
    return '';
  };

  const handleBlur = (field: string) => {
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    (Object.keys(formData) as Array<keyof typeof formData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormState('submitting');
    // Simulate submission
    setTimeout(() => {
      setFormState('success');
    }, 1000);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(241, 235, 228, 0.04)',
    border: `1px solid ${errors[field] ? '#E0523C' : 'rgba(241, 235, 228, 0.08)'}`,
    borderRadius: '9999px',
    padding: '0.875rem 1.25rem',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 300,
    color: '#F1EBE4',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    WebkitAppearance: 'none',
    appearance: 'none',
  });

  if (formState === 'success') {
    return (
      <div
        ref={sectionRef}
        style={{
          padding: 'clamp(6rem, 10vh, 10rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
          }}
        >
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)',
              fontWeight: 300,
              lineHeight: 1.65,
              color: '#F1EBE4',
            }}
          >
            Thank you! Our team will contact you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      style={{
        padding: 'clamp(6rem, 10vh, 10rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 40%) minmax(0, 60%)',
          gap: '4rem',
          alignItems: 'start',
        }}
        className="contact-grid"
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
            Start Your Journey Today
          </h2>

          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'rgba(241, 235, 228, 0.5)',
              marginTop: '0.75rem',
            }}
          >
            Get expert advice tailored to your business needs.
          </p>

          <button
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
              border: 'none',
              cursor: 'pointer',
              marginTop: '2rem',
              transition: 'filter 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1.15)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1)'; }}
          >
            Book a Free Consultation
          </button>
        </div>

        {/* Right column - Form */}
        <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-field" style={{ opacity: 0 }}>
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              onBlur={() => handleBlur('fullName')}
              style={inputStyle('fullName')}
              onFocus={(e) => { e.target.style.borderColor = '#E87029'; e.target.style.boxShadow = '0 0 0 2px rgba(232, 112, 41, 0.15)'; }}
              onBlurCapture={(e) => { e.target.style.borderColor = errors.fullName ? '#E0523C' : 'rgba(241, 235, 228, 0.08)'; e.target.style.boxShadow = 'none'; }}
            />
            {errors.fullName && (
              <span className="font-body" style={{ fontSize: '0.8rem', color: '#E0523C', marginTop: '0.25rem', display: 'block' }}>{errors.fullName}</span>
            )}
          </div>

          <div className="form-field" style={{ opacity: 0 }}>
            <input
              type="tel"
              placeholder="Phone Number with country code *"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              onBlur={() => handleBlur('phone')}
              style={inputStyle('phone')}
              onFocus={(e) => { e.target.style.borderColor = '#E87029'; e.target.style.boxShadow = '0 0 0 2px rgba(232, 112, 41, 0.15)'; }}
              onBlurCapture={(e) => { e.target.style.borderColor = errors.phone ? '#E0523C' : 'rgba(241, 235, 228, 0.08)'; e.target.style.boxShadow = 'none'; }}
            />
            {errors.phone && (
              <span className="font-body" style={{ fontSize: '0.8rem', color: '#E0523C', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>
            )}
          </div>

          <div className="form-field" style={{ opacity: 0 }}>
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              onBlur={() => handleBlur('email')}
              style={inputStyle('email')}
              onFocus={(e) => { e.target.style.borderColor = '#E87029'; e.target.style.boxShadow = '0 0 0 2px rgba(232, 112, 41, 0.15)'; }}
              onBlurCapture={(e) => { e.target.style.borderColor = errors.email ? '#E0523C' : 'rgba(241, 235, 228, 0.08)'; e.target.style.boxShadow = 'none'; }}
            />
            {errors.email && (
              <span className="font-body" style={{ fontSize: '0.8rem', color: '#E0523C', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>
            )}
          </div>

          {/* Custom select dropdown */}
          <div className="form-field" style={{ opacity: 0, position: 'relative' }}>
            <button
              type="button"
              onClick={() => setSelectOpen(!selectOpen)}
              style={{
                ...inputStyle('service'),
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ color: formData.service ? '#F1EBE4' : 'rgba(241, 235, 228, 0.5)' }}>
                {formData.service || 'Service Interest *'}
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: selectOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="rgba(241, 235, 228, 0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {errors.service && (
              <span className="font-body" style={{ fontSize: '0.8rem', color: '#E0523C', marginTop: '0.25rem', display: 'block' }}>{errors.service}</span>
            )}
            {selectOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  background: 'rgba(20, 16, 14, 0.98)',
                  border: '1px solid rgba(241, 235, 228, 0.08)',
                  borderRadius: '12px',
                  padding: '0.5rem',
                  zIndex: 10,
                  backdropFilter: 'blur(12px)',
                }}
              >
                {serviceOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, service: option }));
                      setSelectOpen(false);
                      setErrors(prev => ({ ...prev, service: '' }));
                    }}
                    className="font-body"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.625rem 1rem',
                      background: 'none',
                      border: 'none',
                      color: '#F1EBE4',
                      fontSize: '0.9rem',
                      fontWeight: 300,
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: '8px',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'rgba(241, 235, 228, 0.06)'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'none'; }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="form-field" style={{ opacity: 0 }}>
            <button
              type="submit"
              disabled={formState === 'submitting'}
              className="font-body"
              style={{
                width: '100%',
                background: '#E87029',
                color: '#050302',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '1rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: formState === 'submitting' ? 'wait' : 'pointer',
                transition: 'filter 0.3s ease, transform 0.1s ease',
                marginTop: '0.5rem',
              }}
              onMouseEnter={(e) => { if (formState !== 'submitting') (e.target as HTMLElement).style.filter = 'brightness(1.15)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'brightness(1)'; }}
              onMouseDown={(e) => { (e.target as HTMLElement).style.transform = 'scale(0.98)'; }}
              onMouseUp={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
            >
              {formState === 'submitting' ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
