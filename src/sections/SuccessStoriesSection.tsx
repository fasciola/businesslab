import { useState } from 'react';
import { ArrowRight, ChevronDown, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Business Lab made my move to Dubai incredibly smooth. They handled everything from my company licence to my family visas.',
    name: 'Sarah J.',
    location: 'Dubai',
  },
  {
    quote: 'The team knowledge of the banking process was invaluable. The guidance was clear and organised from the beginning.',
    name: 'Ahmed K.',
    location: 'Abu Dhabi',
  },
  {
    quote: 'Professional, transparent and always available. Highly recommended for anyone looking to set up in the UAE.',
    name: 'Elena R.',
    location: 'Sharjah',
  },
];

const insights = [
  {
    category: 'Company formation',
    title: 'Mainland or free zone: how to choose the right route',
    image: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=1000&q=80',
  },
  {
    category: 'Business guide',
    title: 'Documents to prepare before starting your UAE company',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80',
  },
  {
    category: 'UAE market',
    title: 'Planning your first year of operations in the UAE',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
  },
];

const faqs = [
  ['How long does it take to establish a company in the UAE?', 'The timeline depends on the jurisdiction, activity and approvals. Straightforward applications can often be completed within several working days once all documents are ready.'],
  ['Should I choose a mainland or free-zone licence?', 'The right option depends on where you plan to trade, your activity, office requirements, visa needs and budget. We compare the suitable routes during your consultation.'],
  ['Can a foreign investor own 100% of a UAE company?', 'Full foreign ownership is available for many mainland and free-zone activities. Certain regulated activities may have additional requirements.'],
  ['What documents are normally required?', 'Requirements vary, but commonly include passport copies, photographs, contact details and supporting documents related to the proposed activity.'],
  ['Can Business Lab support residency applications?', 'Yes. We support eligible investor, partner, employee and dependent residency processes after company formation.'],
];

export default function SuccessStoriesSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="trust-content">
      <section className="testimonials-block">
        <div className="section-heading is-light">
          <span className="eyebrow">Client experiences</span>
          <h2>What our clients say</h2>
          <p>Feedback from entrepreneurs who trusted Business Lab with their UAE journey.</p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <Quote size={27} />
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}
              </div>
              <blockquote>{item.quote}</blockquote>
              <footer><strong>{item.name}</strong><span>{item.location}</span></footer>
            </article>
          ))}
        </div>
      </section>

      <section className="insights-block">
        <div className="section-heading is-light">
          <span className="eyebrow">Business insights</span>
          <h2>Latest UAE business guides</h2>
          <p>Practical guidance on licensing, jurisdictions, documentation and operating in the UAE.</p>
        </div>

        <div className="insights-grid">
          {insights.map((item) => (
            <article className="insight-card" key={item.title}>
              <img src={item.image} alt="" loading="lazy" />
              <div className="insight-body">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <a href="#contact">Read the guide <ArrowRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-block">
        <div className="section-heading is-light">
          <span className="eyebrow">Frequently asked questions</span>
          <h2>Clear answers before you get started</h2>
        </div>

        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={question}>
              <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{question}</span>
                <ChevronDown size={20} />
              </button>
              <div className="faq-answer"><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
