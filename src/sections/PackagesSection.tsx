import { useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { waLink } from '../lib/site';

const baseInclusions = [
  'Business licence',
  'Unlimited shareholders',
  'Up to 10 mix-and-match activities',
  'Lease agreement',
  'MOA/AOA (if applicable)',
  'Commercial registry',
  'Share certificate',
  'Certificate of incorporation',
  'Certificate of incumbency',
  'Bank letter to open an account',
  'Branch registration certificate (if applicable)',
];

const visaInclusions = [
  'Emirates ID (new/renewal)',
  'Investor security approval (new registration)',
  'E-Channel registration and guarantee',
  'Establishment card (new/renewal)',
  'Entry permit',
  'Visa status change (if applicable)',
  'Visa medical (new/renewal)',
  'Residency visa (new/renewal)',
];

const packages = [
  {
    id: 'zero-visa',
    name: 'Zero Visa',
    tag: 'Licence only',
    price: 'AED 4,888',
    blurb: 'A cost-effective licence covering up to 10 business activities. Ideal if you do not need residency visas yet.',
    items: baseInclusions,
  },
  {
    id: 'all-inclusive',
    name: 'All-Inclusive',
    tag: '1 to 10 visas',
    price: 'AED 10,800',
    featured: true,
    blurb: 'Your licence plus the full visa process: security approval, establishment card, medical and residency visa.',
    items: [...baseInclusions, ...visaInclusions],
  },
  {
    id: 'pay-as-you-go',
    name: 'Pay As You Go',
    tag: 'Flexible start',
    price: 'Low upfront cost',
    blurb: 'Launch with a minimal initial investment and pay for visa processing and other business services only when you need them.',
    items: ['Start with a low initial cost', 'Add visas and services later', 'Scale as your business grows'],
  },
];

export default function PackagesSection() {
  const [active, setActive] = useState('all-inclusive');
  const current = packages.find((p) => p.id === active) ?? packages[1];

  const ask = (name: string) =>
    waLink(`Hello Business Lab, I'm interested in the ${name} package${name === 'Pay As You Go' ? '' : ' (from ' + packages.find((p) => p.name === name)?.price + ')'}. Please send me the details.`);

  return (
    <div className="packages">
      <div className="section-heading">
        <span className="eyebrow">Packages and offers</span>
        <h2>Free zone packages from AED 4,888</h2>
        <p>Choose the package that fits your stage. Every package is processed through Ajman NuVentures Centre Free Zone (ANCFZ) with Business Lab guiding you end to end.</p>
      </div>

      <div className="pkg-grid">
        {packages.map((p) => (
          <article
            key={p.id}
            className={`pkg-card${p.featured ? ' is-featured' : ''}${p.id === active ? ' is-active' : ''}`}
          >
            {p.featured && <span className="pkg-flag">Most complete</span>}
            <span className="pkg-tag">{p.tag}</span>
            <h3>{p.name}</h3>
            <div className="pkg-price">{p.id === 'pay-as-you-go' ? p.price : <><small>from</small> {p.price}</>}</div>
            <p>{p.blurb}</p>
            <button type="button" className="pkg-view" onClick={() => setActive(p.id)}>
              See what is included <ArrowRight size={15} />
            </button>
            <a className="button button-primary" href={ask(p.name)} target="_blank" rel="noopener noreferrer">
              Ask on WhatsApp <MessageCircle size={16} />
            </a>
          </article>
        ))}
      </div>

      <div className="pkg-detail" aria-live="polite">
        <h3>{current.name}: what is included</h3>
        <ul>
          {current.items.map((i) => <li key={i}><Check size={16} /> {i}</li>)}
        </ul>
      </div>

      <p className="pkg-note">
        Instalment plans through Tabby and Tamara are available for UAE customers. Prices are starting prices in AED and may vary with
        your activity and visa requirements; we confirm the final quotation before you pay.
      </p>
    </div>
  );
}
