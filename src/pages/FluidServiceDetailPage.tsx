import { useParams } from 'react-router-dom';
import FluidBackground from '../components/FluidBackground';
import ServiceDetailPage from './ServiceDetailPage';

const fluidSlugs = new Set(['mainland', 'free-zone', 'offshore']);

export default function FluidServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const useFluidBackground = Boolean(slug && fluidSlugs.has(slug));

  if (!useFluidBackground) {
    return <ServiceDetailPage />;
  }

  return (
    <div className="fluid-service-shell">
      <FluidBackground isActive />
      <div className="fluid-service-overlay" aria-hidden="true" />
      <div className="fluid-service-content">
        <ServiceDetailPage />
      </div>
    </div>
  );
}
