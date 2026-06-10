import { Building2, Landmark, Users, Banknote, Calculator, ShieldCheck } from 'lucide-react';

const services = [
  { icon: Building2, title: 'Company Formation', text: 'Support choosing the right activity, structure and licensing route.' },
  { icon: Landmark, title: 'Free Zone Setup', text: 'Compare UAE free zones and select a suitable setup package.' },
  { icon: Building2, title: 'Mainland Setup', text: 'Guidance through mainland licensing and required approvals.' },
  { icon: Users, title: 'Residency and Visas', text: 'Support for eligible investor, employee and dependent applications.' },
  { icon: Banknote, title: 'Banking Support', text: 'Prepare your business profile and supporting documents.' },
  { icon: Calculator, title: 'Tax and Accounting', text: 'Bookkeeping, corporate tax and VAT support for your business.' },
  { icon: ShieldCheck, title: 'Government Services', text: 'Assistance with amendments, renewals and ongoing transactions.' },
  { icon: ShieldCheck, title: 'Ongoing Support', text: 'Corporate support after your company has been launched.' },
];

export default function IntroductionSection() {
  return (
    <div className="services-overview">
      <div className="section-heading">
        <span className="eyebrow">What we offer</span>
        <h2>Everything you need to start and grow in the UAE</h2>
        <p>Practical services for entrepreneurs, investors and companies entering the UAE market.</p>
      </div>

      <div className="services-grid">
        {services.map(({ icon: Icon, title, text }) => (
          <article className="service-card" key={title}>
            <div className="service-icon"><Icon size={20} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
