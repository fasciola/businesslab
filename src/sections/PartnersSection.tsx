const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We understand your business activity, ownership needs, target market and available budget.',
  },
  {
    number: '02',
    title: 'Structure selection',
    description: 'We compare suitable mainland, free-zone and offshore options before recommending a route.',
  },
  {
    number: '03',
    title: 'Documents and approvals',
    description: 'Our team coordinates the application, documentation and required authority approvals.',
  },
  {
    number: '04',
    title: 'Launch and support',
    description: 'Receive your licence and continue with residency, banking and operational support.',
  },
];

export default function PartnersSection() {
  return (
    <div className="process-overview">
      <div className="section-heading">
        <span className="eyebrow">How it works</span>
        <h2>Start your company in four clear steps</h2>
        <p>A straightforward process managed with you from the first consultation through company launch.</p>
      </div>

      <div className="process-grid">
        {steps.map((step) => (
          <article className="process-card" key={step.number}>
            <span className="process-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
