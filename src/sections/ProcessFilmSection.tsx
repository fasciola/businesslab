import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img, { ph } from '../components/Img';

gsap.registerPlugin(ScrollTrigger);

/** Scroll-scrubbed "Idea to licence" film.
 *  VIDEO_LENGTH / CUTS (seconds) describe the generated film V2; until it arrives, the four keyframes crossfade instead. */
const VIDEO_LENGTH = 10;
const CUTS = [1.83, 3.58, 6.5];

const shots = [
  { n: '01', tag: 'Consultation', title: 'Start with a', em: 'conversation.', text: 'We understand your business activity, ownership needs, target market and budget.', img: 'b1' },
  { n: '02', tag: 'Structure selection', title: 'Choose the right', em: 'structure.', text: 'We compare suitable mainland, free-zone and offshore options before recommending a route.', img: 'b2' },
  { n: '03', tag: 'Documents and approvals', title: 'We handle the', em: 'paperwork.', text: 'Our team coordinates the application, documentation and required authority approvals.', img: 'b3' },
  { n: '04', tag: 'Launch and support', title: 'Open for', em: 'business.', text: 'Receive your licence and continue with residency, banking and operational support.', img: 'b4' },
];

export default function ProcessFilmSection() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('is-static');
      return;
    }
    root.classList.add('is-scrub');

    const video = videoRef.current;
    const texts = Array.from(root.querySelectorAll<HTMLElement>('.scrub-text'));
    const frames = Array.from(root.querySelectorAll<HTMLElement>('.scrub-shot'));
    const steps = Array.from(root.querySelectorAll<HTMLElement>('.scrub-steps i'));
    const bar = root.querySelector<HTMLElement>('.scrub-bar span');
    const cutP = CUTS.map((c) => c / VIDEO_LENGTH);
    // without a video, use equal quarters so every keyframe gets its moment
    const quarters = [0.25, 0.5, 0.75];

    let dur = 0;
    let target = 0;
    let current = 0;
    const onMeta = () => { dur = video!.duration; video!.currentTime = 0.001; };
    const onLoaded = () => setHasVideo(true);
    video?.addEventListener('loadedmetadata', onMeta);
    video?.addEventListener('loadeddata', onLoaded);

    const tick = () => {
      if (!video || !dur) return;
      current += (target - current) * 0.2;
      if (Math.abs(target - current) < 0.0005) current = target;
      const t = current * Math.max(0, dur - 0.04);
      if (!video.seeking && Math.abs(video.currentTime - t) > 0.012) video.currentTime = t;
    };
    gsap.ticker.add(tick);

    const setShot = (progress: number) => {
      const cuts = video && dur ? cutP : quarters;
      const idx = cuts.filter((p) => p <= progress).length;
      steps.forEach((s, k) => s.classList.toggle('is-on', k === idx));
      frames.forEach((f, k) => f.classList.toggle('is-on', k === idx));
    };

    const ctx = gsap.context(() => {
      texts.forEach((t, i) => gsap.set(t, i === 0 ? { autoAlpha: 1, y: 0 } : { autoAlpha: 0, y: 40 }));
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => { target = self.progress; setShot(self.progress); },
        },
      });
      tl.to(bar, { scaleX: 1, duration: 1 }, 0);
      // text swaps follow the cuts of the generated film, or quarters while placeholders are shown
      const points = video && dur ? cutP : quarters;
      texts.forEach((t, i) => {
        if (i > 0) tl.fromTo(t, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.05 }, points[i - 1] + 0.004);
        if (i < texts.length - 1) tl.to(t, { autoAlpha: 0, y: -40, duration: 0.04 }, Math.max(0, points[i] - 0.03));
      });
    }, root);

    return () => {
      gsap.ticker.remove(tick);
      video?.removeEventListener('loadedmetadata', onMeta);
      video?.removeEventListener('loadeddata', onLoaded);
      ctx.revert();
      root.classList.remove('is-scrub');
    };
  }, []);

  return (
    <section id="process-film" ref={rootRef} className="scrub" aria-label="From idea to licence">
      <div className="scrub-stage">
        <div className="scrub-frame">
          {shots.map((s, i) => (
            <Img key={s.img} className={`scrub-shot${i === 0 ? ' is-on' : ''}`} src={`/images/${s.img}.jpg`} fallback={ph(s.img)} alt="" />
          ))}
          <video
            ref={videoRef}
            className={`scrub-video${hasVideo ? ' is-ready' : ''}`}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            src={isMobile ? '/videos/idea-to-licence-mobile.mp4' : '/videos/idea-to-licence-desktop.mp4'}
          />
          <div className="scrub-shade" />
        </div>
        <div className="scrub-copy">
          {shots.map((s, i) => (
            <div className="scrub-text" key={s.n}>
              <span className="eyebrow">{s.n} · {s.tag}</span>
              <h2>{s.title} <em>{s.em}</em></h2>
              <p>{s.text}</p>
              {i === shots.length - 1 && <a className="button button-primary" href="#contact">Book a free consultation</a>}
            </div>
          ))}
        </div>
        <div className="scrub-meta" aria-hidden="true">
          <small>Concept footage · imagery is illustrative</small>
          <span className="scrub-steps"><i className="is-on" /><i /><i /><i /></span>
          <div className="scrub-bar"><span /></div>
        </div>
      </div>
    </section>
  );
}
