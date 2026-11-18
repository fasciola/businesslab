import { MessageCircle } from 'lucide-react';
import { waLink } from '../lib/site';

/** Floating WhatsApp shortcut shown on every page. */
export default function WhatsAppButton() {
  return (
    <a
      className="wa-float"
      href={waLink('Hello Business Lab, I would like to know more about setting up a company in the UAE.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Business Lab on WhatsApp"
    >
      <MessageCircle size={26} />
      <span>WhatsApp us</span>
    </a>
  );
}
