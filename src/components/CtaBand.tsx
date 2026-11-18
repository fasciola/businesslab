import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CtaBandProps {
  title: string;
  description?: string;
  buttonText: string;
}

export default function CtaBand({ title, description, buttonText }: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="cta-band-inner rv">
        <div>
          <h2>{title}</h2>
          <p>{description ?? 'Tell us about your plans and we will recommend the most suitable route.'}</p>
        </div>
        <Link className="button button-primary" to="/#contact">{buttonText} <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}
