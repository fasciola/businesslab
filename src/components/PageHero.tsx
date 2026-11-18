import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import Img, { ph } from './Img';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** Background scene (full-bleed) */
  background?: { src: string; fallback: string };
  /** Transparent object image shown on the right (e.g. showcase plinth objects) */
  object?: { src: string; fallback?: string; alt: string };
  children?: ReactNode;
}

/** Full-bleed dark hero for inner pages: reads well under the transparent header. */
export default function PageHero({ eyebrow, title, description, background, object, children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const tween = gsap.fromTo(
      root.querySelectorAll('[data-hero-in]'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 },
    );
    const obj = root.querySelector('.page-hero-object');
    const float = obj ? gsap.fromTo(obj, { y: 50, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }) : null;
    return () => { tween.kill(); float?.kill(); };
  }, []);

  const bg = background ?? { src: '/images/showcase-bg.png', fallback: ph('showcase-bg') };

  return (
    <section ref={ref} className="page-hero">
      <Img className="page-hero-bg" src={bg.src} fallback={bg.fallback} alt="" />
      <div className="page-hero-shade" />
      <div className={`page-hero-inner${object ? ' has-object' : ''}`}>
        <div className="page-hero-copy">
          <span data-hero-in className="eyebrow">{eyebrow}</span>
          <h1 data-hero-in>{title}</h1>
          {description && <p data-hero-in className="page-hero-desc">{description}</p>}
          {children && <div data-hero-in className="page-hero-actions">{children}</div>}
        </div>
        {object && <Img className="page-hero-object" src={object.src} fallback={object.fallback} alt={object.alt} />}
      </div>
    </section>
  );
}
