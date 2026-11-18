import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TEXT = 'We guide entrepreneurs, investors and companies through every stage of their UAE journey, from choosing the right structure to running a compliant business after launch.';
const EM = ['right', 'structure', 'compliant'];

export default function StatementSection() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>('.w'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => w.classList.add('on'));
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      end: 'bottom 45%',
      scrub: true,
      onUpdate: (self) => {
        const n = Math.round(self.progress * words.length);
        words.forEach((w, i) => w.classList.toggle('on', i < n));
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section id="statement" className="statement">
      <div className="statement-wrap">
        <span className="eyebrow">Our approach</span>
        <p ref={ref} className="statement-text">
          {TEXT.split(' ').map((w, i) => (
            <span key={i} className={`w${EM.includes(w.replace(/[^a-z]/gi, '').toLowerCase()) ? ' em' : ''}`}>{w} </span>
          ))}
        </p>
      </div>
    </section>
  );
}
