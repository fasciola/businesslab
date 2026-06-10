import { Link } from 'react-router-dom';
import { ArrowRight, CircleCheck } from 'lucide-react';

const jurisdictions = [
  {
    title: 'Mainland',
    slug: 'mainland',
    label: 'Local market access',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80',
    description: 'A flexible option for businesses that want to trade across the UAE and serve local clients.',
    points: ['Trade throughout the UAE', 'Broad activity options', 'Flexible growth potential'],
  },
  {
    title: 'Free Zone',
    slug: 'free-zone',
    label: 'Streamlined setup',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    description: 'An efficient route for international entrepreneurs, startups and specialised activities.',
    points: ['100% foreign ownership', 'Multiple package options', 'Industry-focused jurisdictions'],
  },
  {
    title: 'Offshore',
    slug: 'offshore',
    label: 'International structuring',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1000&q=80',
    description: 'A structure designed for eligible international activities, holding and asset planning.',
    points: ['International orientation', 'Simple ownership structure', 'Specialised use cases'],
  },
];

export default function JurisdictionsSection() {
  return (
    <div className="jurisdictions-overview">
      <div className="section-heading">
        <span className="eyebrow">Choose the right structure</span>
        <h2>UAE business jurisdictions explained</h2>
        <p>Compare the main routes for establishing your company and choose the option aligned with your market, ownership and operational needs.</p>
      </div>

      <div className="jurisdiction-cards">
        {jurisdictions.map((item) => (
          <article className="jurisdiction-card" key={item.title}>
            <div className="jurisdiction-image">
              <img src={item.image} alt={`${item.title} business setup in the UAE`} loading="lazy" />
            </div>
            <div className="jurisdiction-body">
              <span className="jurisdiction-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}><CircleCheck size={15} /> {point}</li>
                ))}
              </ul>
              <Link to={`/services/${item.slug}`}>Explore {item.title} <ArrowRight size={15} /></Link>
            </div>
          </article>
        ))}
      </div>

      <div className="jurisdiction-cta">
        <div>
          <h3>Mainland, free zone or offshore?</h3>
          <p>We assess your activity, budget and long-term plans before recommending the most suitable route.</p>
        </div>
        <a className="button button-primary" href="#contact">Compare options</a>
      </div>
    </div>
  );
}
