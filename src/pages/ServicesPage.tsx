import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import Img, { ph } from '../components/Img';
import Footer from '../sections/Footer';
import { useReveal } from '../hooks/useReveal';
import { useSeo } from '../hooks/useSeo';

const services = [
  {
    number: '01',
    title: 'Company Formation & Licensing',
    slug: 'mainland',
    image: 'showcase-mainland',
    description: 'Expert guidance on choosing the right jurisdiction (Mainland, Free Zone, Offshore) and obtaining your trade license. We handle all documentation, approvals, and registration processes to get your business up and running swiftly.',
    features: ['Mainland Company Setup', 'Offshore Incorporation', 'Free Zone License', 'Trade License Issuance'],
  },
  {
    number: '02',
    title: 'Visa & Residency Solutions',
    slug: 'visa',
    image: 'showcase-residency-visa',
    description: 'End-to-end processing for all visa types. Whether you need a Golden Visa for long-term stability, Investor Visas for shareholders, or Employment Visas for your growing team, we manage the entire lifecycle.',
    features: ['UAE Golden Visa', 'Employment Visas', 'Investor/Partner Visas', 'Family Sponsorship'],
  },
  {
    number: '03',
    title: 'Corporate Banking Assistance',
    slug: 'banking',
    image: 'showcase-banking',
    description: 'Navigating the banking landscape can be challenging. We provide strategic advice and personal introductions to leading UAE banks, assisting with documentation and compliance to ensure a smooth account opening experience.',
    features: ['Account Opening Support', 'Documentation Preparation', 'Bank Selection Advisory', 'Compliance Assistance'],
  },
  {
    number: '04',
    title: 'Corporate Services & Compliance',
    slug: 'offshore',
    image: 'showcase-accounting-tax',
    description: 'Stay compliant and focused on your core business. We offer ongoing support for license renewals, amendments, VAT registration, and ensuring your business adheres to all local regulations.',
    features: ['License Renewals', 'Regulatory Compliance', 'VAT Registration', 'Government Liaison'],
  },
  {
    number: '05',
    title: 'Relocation & Concierge',
    slug: 'free-zone',
    image: 'showcase-free-zone',
    description: 'Making your move to the UAE effortless. From finding the perfect office space or home to setting up utilities and finding schools for your children, our concierge team is here to help you settle in.',
    features: ['Home & Office Search', 'Utility Setup', 'School Search Support', 'Settling-in Services'],
  },
];

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  useSeo('UAE Business Setup Services: Licensing, Visas, Banking | Business Lab','Company formation, residency visas, corporate banking, compliance and relocation support in the UAE, handled end to end by Business Lab.','/services');

  return (
    <div ref={ref} className="inner-page">
      <PageHero
        eyebrow="Our services"
        title={<>Business solutions for every <span>stage</span> of your journey.</>}
        description="From choosing a structure to running a compliant company, Business Lab supports you at every step of your UAE journey."
      >
        <Link className="button button-primary" to="/#contact">Book a free consultation <ArrowRight size={17} /></Link>
      </PageHero>

      <section className="svc-list">
        {services.map((s, i) => (
          <article className={`svc-row rv${i % 2 ? ' is-flip' : ''}`} key={s.number}>
            <div className="svc-visual">
              <span className="svc-num">{s.number}</span>
              <Img src={`/images/${s.image}.png`} fallback={ph('c1')} alt={s.title} />
            </div>
            <div className="svc-body">
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <ul>
                {s.features.map((f) => <li key={f}><Check size={16} /> {f}</li>)}
              </ul>
              <Link className="svc-link" to={`/services/${s.slug}`}>Learn more <ArrowRight size={16} /></Link>
            </div>
          </article>
        ))}
      </section>

      <CtaBand title="Not sure which service you need?" description="Tell us about your business and we will outline the right setup, step by step." buttonText="Talk to our team" />
      <Footer />
    </div>
  );
}
