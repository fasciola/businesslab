import ServicesHeroSection from '../sections/ServicesHeroSection';
import ServiceCardsSection from '../sections/ServiceCardsSection';
import BottomCTASection from '../sections/BottomCTASection';
import Footer from '../sections/Footer';

export default function ServicesPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1, background: '#050302', minHeight: '100vh' }}>
      <section id="services-hero" style={{ position: 'relative', zIndex: 1 }}>
        <ServicesHeroSection />
      </section>

      <section id="service-details" style={{ position: 'relative', zIndex: 2 }}>
        <ServiceCardsSection />
      </section>

      <section id="cta-bottom" style={{ position: 'relative', zIndex: 2 }}>
        <BottomCTASection />
      </section>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Footer />
      </div>
    </div>
  );
}
