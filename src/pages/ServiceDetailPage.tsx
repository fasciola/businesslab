import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import ServiceIcon from '../components/ServiceIcon';
import Footer from '../sections/Footer';
import { useReveal } from '../hooks/useReveal';
import { useSeo } from '../hooks/useSeo';
import { serviceDataMap, type ServiceData } from '../data/serviceData';

const objectFor: Record<string, string> = {
  mainland: 'showcase-mainland',
  'free-zone': 'showcase-free-zone',
  offshore: 'showcase-offshore',
  banking: 'showcase-banking',
  visa: 'showcase-residency-visa',
};

function Middle({ content }: { content: ServiceData['middleSection'] }) {
  return (
    <section className="detail-mid">
      <div className="detail-wrap">
        <div className="section-heading is-light rv">
          <span className="eyebrow">{content.type === 'checklist' ? 'What is included' : content.type === 'timeline' ? 'How it works' : 'Options'}</span>
          <h2>{content.title}</h2>
          {content.subtitle && <p>{content.subtitle}</p>}
        </div>

        {content.type === 'checklist' && (
          <>
            <ul className="mid-checks">
              {content.items.map((item) => <li className="rv" key={item}><Check size={18} /> {item}</li>)}
            </ul>
            {content.ctaText && <div className="mid-cta rv"><Link className="button button-primary" to="/#contact">{content.ctaText} <ArrowRight size={17} /></Link></div>}
          </>
        )}

        {content.type === 'cards' && (
          <div className="mid-cards">
            {content.items.map((item) => (
              <article className="mid-card rv" key={item.title}>
                {item.badge && <span className="mid-badge">{item.badge}</span>}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.features && <ul>{item.features.map((f) => <li key={f}><Check size={14} /> {f}</li>)}</ul>}
              </article>
            ))}
          </div>
        )}

        {content.type === 'timeline' && (
          <ol className="mid-timeline">
            {content.items.map((item, i) => (
              <li className="rv" key={item.title}>
                <span className="tl-icon"><ServiceIcon name={item.icon} /></span>
                <div><small>Step {String(i + 1).padStart(2, '0')}</small><h3>{item.title}</h3><p>{item.description}</p></div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceDataMap[slug] : null;
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, [slug]);
  useSeo(
    service ? `${service.heroTitle} | Business Lab` : 'Service not found | Business Lab',
    service ? service.heroDescription : 'This service page could not be found.',
    `/services/${slug ?? ''}`,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [slug]);

  if (!service) {
    return (
      <div className="inner-page not-found">
        <h1>Page not found</h1>
        <Link className="button button-primary" to="/services">Back to services</Link>
      </div>
    );
  }

  const object = objectFor[service.slug];

  return (
    <div ref={ref} className="inner-page">
      <PageHero
        eyebrow={service.label}
        title={service.heroTitle}
        description={service.heroDescription}
        object={object ? { src: `/images/${object}.png`, alt: service.label } : undefined}
      >
        <Link className="button button-primary" to="/#contact">{service.ctaText} <ArrowRight size={17} /></Link>
        <Link className="button button-outline-light" to="/services">All services</Link>
      </PageHero>

      <section className="detail-benefits">
        <div className="detail-wrap">
          <div className="section-heading rv">
            <span className="eyebrow">Why it works</span>
            <h2>{service.benefits.title}</h2>
          </div>
          <div className="benefit-grid">
            {service.benefits.items.map((b) => (
              <article className="benefit-card rv" key={b.title}>
                <span className="benefit-icon"><ServiceIcon name={b.icon} /></span>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Middle content={service.middleSection} />

      <CtaBand title={service.ctaSection.title} description={service.ctaSection.description} buttonText={service.ctaSection.buttonText} />
      <Footer />
    </div>
  );
}
