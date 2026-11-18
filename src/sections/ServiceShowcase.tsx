import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Img, { ph } from '../components/Img';

const slides = [
  { id: 'c1', file: 'showcase-mainland', title: 'Mainland licence', points: ['Trade across the UAE', 'Broad activity options', 'Flexible growth potential'], to: '/services/mainland' },
  { id: 'c2', file: 'showcase-free-zone', title: 'Free zone setup', points: ['100% foreign ownership', 'Multiple package options', 'Industry-focused zones'], to: '/services/free-zone' },
  { id: 'c3', file: 'showcase-offshore', title: 'Offshore company', points: ['International orientation', 'Simple ownership structure', 'Holding and asset planning'], to: '/services/offshore' },
  { id: 'c4', file: 'showcase-banking', title: 'Banking support', points: ['Pre-approval assessment', 'Document preparation', 'Banker introductions'], to: '/services/banking' },
  { id: 'c5', file: 'showcase-residency-visa', title: 'Residency and visas', points: ['Investor and partner visas', 'Employee applications', 'Dependent support'], to: '/services/visa' },
  { id: 'c6', file: 'showcase-accounting-tax', title: 'Tax and accounting', points: ['Bookkeeping', 'Corporate tax support', 'VAT registration and filing'], to: '#contact' },
];

export default function ServiceShowcase() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const len = slides.length;

  const go = useCallback((i: number) => setIndex(((i % len) + len) % len), [len]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [index, go]);

  const onDown = (e: React.PointerEvent) => { start.current = { x: e.clientX, y: e.clientY }; };
  const onMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    if (Math.abs(dx) > 6) setDrag(dx);
  };
  const onUp = () => {
    if (!start.current) return;
    if (Math.abs(drag) > 70) go(index + (drag < 0 ? 1 : -1));
    start.current = null;
    setDrag(0);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="showcase" className="showcase" aria-label="Our services">
      <div className="showcase-wrap">
        <div className="showcase-head">
          <div>
            <span className="eyebrow">The range</span>
            <h2>One service at a <em>time</em>.</h2>
          </div>
          <div className="sc-controls">
            <span className="sc-count" aria-live="polite">{pad(index + 1)} / {pad(len)}</span>
            <button className="sc-btn" type="button" aria-label="Previous service" onClick={() => go(index - 1)}><ChevronLeft size={20} /></button>
            <button className="sc-btn" type="button" aria-label="Next service" onClick={() => go(index + 1)}><ChevronRight size={20} /></button>
          </div>
        </div>

        <div
          ref={stageRef}
          className={`sc-stage${drag ? ' is-dragging' : ''}`}
          tabIndex={0}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
        >
          <Img className="sc-bg" src="/images/showcase-bg.png" fallback={ph('showcase-bg')} alt="" />
          <ul className="sc-track" style={{ transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)` }}>
            {slides.map((s, i) => (
              <li key={s.id} className={`sc-slide${i === index ? ' is-active' : ''}`} aria-roledescription="slide" aria-label={`${i + 1} of ${len}`}>
                <article className="sc-card">
                  <h3>{s.title}</h3>
                  <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  <div className="sc-card-foot">
                    <span>Tailored to your activity</span>
                    {s.to.startsWith('#') ? <a href={s.to}>Learn more <ArrowRight size={15} /></a> : <Link to={s.to}>Learn more <ArrowRight size={15} /></Link>}
                  </div>
                  <i className="sc-card-dot" />
                </article>
                <Img className="dish" src={`/images/${s.file}.png`} fallback={ph(s.id)} alt={s.title} draggable={false} />
              </li>
            ))}
          </ul>
          <div className="sc-dots" role="tablist" aria-label="Choose a service">
            {slides.map((s, i) => (
              <button key={s.id} type="button" role="tab" aria-selected={i === index} aria-label={s.title} className="sc-dot" onClick={() => go(i)} />
            ))}
          </div>
        </div>
        <p className="showcase-note">Concept imagery is illustrative.</p>
      </div>
    </section>
  );
}
