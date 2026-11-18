import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

const STEP_VH = 0.7; // scroll distance (in viewport heights) per service

export default function ServiceShowcase() {
  const [index, setIndex] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const len = slides.length;

  // scroll drives the active service; reduced-motion users keep button/arrow control
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setScrollMode(true);
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setIndex(Math.min(len - 1, Math.floor(self.progress * len))),
    });
    return () => { st.kill(); setScrollMode(false); };
  }, [len]);

  // the section only becomes tall after scrollMode renders, so re-measure every trigger
  useEffect(() => {
    if (scrollMode) ScrollTrigger.refresh();
  }, [scrollMode]);

  const go = useCallback((i: number) => {
    const next = Math.min(len - 1, Math.max(0, i));
    const el = sectionRef.current;
    if (scrollMode && el) {
      // jump to the scroll position that shows service `next`
      const range = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY + ((next + 0.5) / len) * range;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      setIndex(next);
    }
  }, [len, scrollMode]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className={`showcase${scrollMode ? ' is-scroll' : ''}`}
      aria-label="Our services"
      style={scrollMode ? { height: `${Math.round((len * STEP_VH + 1) * 100)}svh` } : undefined}
    >
      <div className="showcase-pin">
      <div className="showcase-wrap">
        <div className="showcase-head">
          <div>
            <span className="eyebrow">The range</span>
            <h2>One service at a <em>time</em>.</h2>
          </div>
          <div className="sc-controls">
            <span className="sc-count" aria-live="polite">{pad(index + 1)} / {pad(len)}</span>
            <button className="sc-btn" type="button" aria-label="Previous service" onClick={() => go(index - 1)} disabled={index === 0}><ChevronLeft size={20} /></button>
            <button className="sc-btn" type="button" aria-label="Next service" onClick={() => go(index + 1)} disabled={index === len - 1}><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="sc-stage">
          <Img className="sc-bg" src="/images/showcase-bg.png" fallback={ph('showcase-bg')} alt="" />
          <ul className="sc-track" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
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
        <p className="showcase-note">{scrollMode ? 'Scroll to explore each service. ' : ''}Concept imagery is illustrative.</p>
      </div>
      </div>
    </section>
  );
}
