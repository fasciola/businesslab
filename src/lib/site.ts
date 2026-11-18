/** Public site settings used for contact links and SEO. */
export const SITE_URL = 'https://businesslab.ae'; // assumed from contact@businesslab.ae; change if the live domain differs
export const SITE_NAME = 'Business Lab';
export const WHATSAPP_NUMBER = '971545894176';
export const PHONE_DISPLAY = '+971 54 589 4176';

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
