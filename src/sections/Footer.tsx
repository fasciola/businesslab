import { Link } from 'react-router-dom';
import { MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="Business Lab" />
            <p>Your business companions for company formation, residency and corporate support in the UAE.</p>
          </div>

          <div className="footer-column">
            <h3>Services</h3>
            <Link to="/services">Company formation</Link>
            <Link to="/services/mainland">Mainland setup</Link>
            <Link to="/services/free-zone">Free-zone setup</Link>
            <Link to="/services/visa">Residency and visas</Link>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <Link to="/#services">Our services</Link>
            <Link to="/#jurisdictions">Jurisdictions</Link>
            <Link to="/#process">Our process</Link>
            <Link to="/#insights">Insights</Link>
          </div>

          <div className="footer-column footer-contact">
            <h3>Contact</h3>
            <a href="mailto:contact@businesslab.ae">contact@businesslab.ae</a>
            <a href="tel:+971545894176">+971 54 589 4176</a>
            <a href="https://wa.me/971545894176" target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a>
            <span><MapPin size={15} /> Dubai and Ajman, UAE</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Business Lab. All rights reserved.</span>
          <div><a href="#">Privacy policy</a><a href="#">Terms and conditions</a></div>
        </div>
      </div>
    </footer>
  );
}
