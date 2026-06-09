import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FluidBackground from './components/FluidBackground';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const isHome = location.pathname === '/';

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div style={{ position: 'relative' }}>
      <FluidBackground isActive={isHome} />
      <Navigation lenisRef={lenisRef} />

      <Routes>
        <Route path="/" element={<HomePage lenisRef={lenisRef} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
