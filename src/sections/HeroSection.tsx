import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Globe2, ShieldCheck } from 'lucide-react';
import Img, { ph } from '../components/Img';

gsap.registerPlugin(ScrollTrigger);

/** Seconds during which the headline is hidden for close-up shots of the hero video.
 *  Set once the generated video (V1) is delivered, e.g. { from: 2.6, to: 20.3 }. Null keeps the headline always visible. */
const HEADLINE_AWAY: { from: number; to: number } | null = null;

export default function HeroSection() {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches;
  const stageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const intro = gsap.fromTo(
      stage.querySelectorAll('[data-animate]'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 },
    );

    // headline hides during close-ups of the generated video
    const video = videoRef.current;
    const onTime = () => {
      if (!video || !HEADLINE_AWAY) return;
      const t = video.currentTime;
      stage.classList.toggle('copy-away', t > HEADLINE_AWAY.from && t < HEADLINE_AWAY.to);
    };
    video?.addEventListener('timeupdate', onTime);

    // pause the video when the hero is off-screen
    const io = new IntersectionObserver(([e]) => {
      if (!video) return;
      if (e.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.05 });
    io.observe(stage);

    if (reduce) {
      return () => { intro.kill(); io.disconnect(); video?.removeEventListener('timeupdate', onTime); };
    }

    const mm = gsap.matchMedia();
    let ctx: gsap.Context | undefined;
    mm.add('(min-width: 0px)', () => {
      const scroller = stage.parentElement as HTMLElement;
      const media = stage.querySelector<HTMLElement>('.hero-media')!;
      const slot = stage.querySelector<HTMLElement>('.hero-slot')!;
      const sides = stage.querySelectorAll('.hero-side');
      const sizeScroller = () => { scroller.style.height = `${Math.round(stage.offsetHeight * 2.5)}px`; };
      sizeScroller();
      // bounding rects account for the row's centring transform
      const target = () => {
        const s = stage.getBoundingClientRect();
        const r = slot.getBoundingClientRect();
        return { top: r.top - s.top, left: r.left - s.left, width: r.width, height: r.height };
      };

      ctx = gsap.context(() => {
        gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: scroller,
            start: 'top top',
            end: () => `bottom top+=${stage.offsetHeight}`,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onRefreshInit: sizeScroller,
          },
        })
          .to('.hero-content', { y: -50, opacity: 0, duration: 0.3 }, 0)
          .to('.hero-overlay, .hero-pattern', { opacity: 0, duration: 0.35 }, 0)
          .to(media, {
            top: () => target().top,
            left: () => target().left,
            width: () => target().width,
            height: () => target().height,
            borderRadius: 22,
            duration: 0.8,
            ease: 'power2.inOut',
          }, 0.05)
          .fromTo(sides, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: 'power2.out' }, 0.5);
      }, stage);
    });

    return () => {
      intro.kill();
      io.disconnect();
      video?.removeEventListener('timeupdate', onTime);
      ctx?.revert();
      mm.revert();
      (stage.parentElement as HTMLElement).style.height = '';
    };
  }, []);

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="hero-scroll">
      <section id="hero" ref={stageRef} className="hero-stage">
        <div className="hero-row3">
          <figure className="hero-side hero-side-l">
            <Img src="/images/hero-side-left.jpg" fallback={ph('hero-side-left')} alt="Dubai business district at blue hour" />
          </figure>
          <div className="hero-slot" aria-hidden="true" />
          <figure className="hero-side hero-side-r">
            <Img src="/images/hero-side-right.jpg" fallback={ph('hero-side-right')} alt="Signing company documents" />
          </figure>
        </div>

        <div className="hero-media">
          <Img className="hero-poster" src="/images/hero-main.jpg" fallback={ph('hero-main')} alt="" />
          <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            {/* generated hero film first, existing background video until it arrives */}
            <source src={isMobile ? '/videos/hero-mobile.mp4' : '/videos/hero-desktop.mp4'} type="video/mp4" />
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-pattern" />
        </div>

        <div className="hero-content container">
          <p data-animate className="eyebrow hero-eyebrow">Business setup and corporate services in the UAE</p>
          <h1 data-animate>Your gateway to business <span>in the UAE.</span></h1>
          <p data-animate className="hero-copy">From company formation and residency to ongoing corporate support, Business Lab guides you through every stage of your UAE journey.</p>
          <div data-animate className="hero-actions">
            <button className="button button-primary" onClick={() => goTo('contact')}>Book a free consultation <ArrowRight size={17} /></button>
            <button className="button button-outline-light" onClick={() => goTo('services')}>Explore our services</button>
          </div>
          <div data-animate className="hero-trust-row">
            <div><Building2 size={18} /><span>Mainland and free zones</span></div>
            <div><Globe2 size={18} /><span>International entrepreneurs</span></div>
            <div><ShieldCheck size={18} /><span>End-to-end support</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}
