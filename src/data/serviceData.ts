export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface CardItem {
  badge?: string;
  title: string;
  description: string;
  features?: string[];
  divider?: boolean;
}

export interface TimelineItem {
  icon: string;
  title: string;
  description: string;
}

export interface ChecklistSection {
  type: 'checklist';
  title: string;
  subtitle?: string;
  items: string[];
  ctaText?: string;
}

export interface CardsSection {
  type: 'cards';
  title: string;
  subtitle?: string;
  items: CardItem[];
}

export interface TimelineSection {
  type: 'timeline';
  title: string;
  subtitle?: string;
  items: TimelineItem[];
}

export type MiddleSection = ChecklistSection | CardsSection | TimelineSection;

export interface ServiceData {
  slug: string;
  label: string;
  heroTitle: string;
  heroDescription: string;
  ctaText: string;
  benefits: {
    title: string;
    items: BenefitItem[];
  };
  middleSection: MiddleSection;
  ctaSection: {
    title: string;
    description?: string;
    buttonText: string;
  };
}

export const serviceDataMap: Record<string, ServiceData> = {
  mainland: {
    slug: 'mainland',
    label: 'MAINLAND LICENSE',
    heroTitle: 'Unlimited Growth with a UAE Mainland License',
    heroDescription: 'Trade freely within the UAE and across the globe with 100% foreign ownership. Position your business at the heart of the region\'s economy.',
    ctaText: 'Get Started',
    benefits: {
      title: 'Key Benefits',
      items: [
        { icon: 'users', title: '100% Foreign Ownership', description: 'Full control of your business without the need for a local sponsor in most activities.' },
        { icon: 'globe', title: 'Trade Anywhere', description: 'Freedom to trade directly with UAE mainland markets and internationally.' },
        { icon: 'check', title: 'Unlimited Visas', description: 'No cap on visa allocations, allowing your team to grow without restrictions.' },
        { icon: 'briefcase', title: 'Broad Scope', description: 'Access to a wide range of business activities including government contracts.' },
      ],
    },
    middleSection: {
      type: 'checklist',
      title: 'Our Package Includes',
      subtitle: 'Everything you need to launch your mainland business smoothly.',
      items: [
        'Initial Approval & Trade Name Reservation',
        'MoA Drafting & Notarization',
        'Office Space Solutions (Ejari)',
        'DED License Issuance',
        'Establishment Card & Labour File Opening',
      ],
      ctaText: 'Inquire Now',
    },
    ctaSection: {
      title: 'Ready to launch your mainland business?',
      buttonText: 'Get Started',
    },
  },

  'free-zone': {
    slug: 'free-zone',
    label: 'FREE ZONE SETUP',
    heroTitle: 'Global Business, Zero Tax, Maximum Efficiency',
    heroDescription: 'The perfect launchpad for international trade, consultancy, and digital businesses. Enjoy world-class infrastructure and business-friendly regulations.',
    ctaText: 'Start Free Zone Setup',
    benefits: {
      title: 'Key Benefits',
      items: [
        { icon: 'users', title: '100% Foreign Ownership', description: 'Complete ownership of your business with full capital repatriation.' },
        { icon: 'percent', title: 'Tax Efficiency', description: '0% Corporate Tax benefits and 0% Personal Income Tax.' },
        { icon: 'truck', title: 'Customs Benefits', description: 'Exemption from import/export duties within the Free Zone.' },
        { icon: 'zap', title: 'Simplified Setup', description: 'Quick and streamlined incorporation process with minimal paperwork.' },
      ],
    },
    middleSection: {
      type: 'cards',
      title: 'Popular Free Zones',
      subtitle: 'We partner with the UAE\'s leading economic zones.',
      items: [
        { badge: 'DUBAI', title: 'DMCC', description: 'Global hub for commodities trade and enterprise.' },
        { badge: 'DUBAI', title: 'IFZA', description: 'Flexible solutions for international free zone authorities.' },
        { badge: 'RAS AL KHAIMAH', title: 'RAKEZ', description: 'Cost-effective industrial and business zone.' },
        { badge: 'SHARJAH', title: 'SHAMS', description: 'Creative and media-focused free zone ecosystem.' },
      ],
    },
    ctaSection: {
      title: 'Not sure which zone fits best?',
      buttonText: 'Compare all Free Zones',
    },
  },

  offshore: {
    slug: 'offshore',
    label: 'OFFSHORE COMPANY',
    heroTitle: 'Secure Assets & Manage Global Wealth',
    heroDescription: 'A strategic vehicle for international trade, holding companies, and property ownership. Protect your future with UAE Offshore solutions.',
    ctaText: 'Get Started',
    benefits: {
      title: 'Key Benefits',
      items: [
        { icon: 'shield', title: 'Asset Protection', description: 'Safeguard your global assets with robust legal frameworks.' },
        { icon: 'lock', title: '100% Confidentiality', description: 'High privacy standards with no public registry of shareholders.' },
        { icon: 'map-pin', title: 'No Physical Presence', description: 'Operate remotely without the requirement of a physical office.' },
        { icon: 'dollar', title: 'Cost-Effective', description: 'Minimal setup and maintenance costs compared to other jurisdictions.' },
      ],
    },
    middleSection: {
      type: 'cards',
      title: 'Ideal Use Cases',
      subtitle: 'Discover the strategic advantages of offshore incorporation.',
      items: [
        { title: 'Holding Company', description: 'Ideal for holding shares in other companies locally or internationally.', divider: true },
        { title: 'Property Ownership', description: 'Secure vehicle for real estate investments in Dubai and beyond.', divider: true },
        { title: 'International Trading', description: 'Facilitate global trade operations efficiently.', divider: true },
      ],
    },
    ctaSection: {
      title: 'Ready to incorporate offshore?',
      buttonText: 'Speak with an Advisor',
    },
  },

  banking: {
    slug: 'banking',
    label: 'CORPORATE BANKING',
    heroTitle: 'Banking Made Simple for Global Businesses',
    heroDescription: 'Overcome compliance hurdles and open your corporate account. We leverage our relationships with top UAE banks to ensure your success.',
    ctaText: 'Open Bank Account',
    benefits: {
      title: 'Our Banking Ecosystem',
      items: [
        { icon: 'building', title: 'Tier-1 Local Banks', description: 'Emirates NBD, FAB, Mashreq. Best for established businesses with higher minimum balance and full trade finance.' },
        { icon: 'smartphone', title: 'Digital Banks', description: 'Wio, Mashreq NeoBiz. Best for startups and tech companies. Fast digital onboarding with lower minimum balance.' },
        { icon: 'anchor', title: 'International Banks', description: 'Standard Chartered, HSBC. Best for multinational corporations requiring global connectivity and treasury management.' },
        { icon: 'credit-card', title: 'Account Types', description: 'Current accounts, savings accounts, multi-currency accounts, and trade finance facilities tailored to your needs.' },
      ],
    },
    middleSection: {
      type: 'timeline',
      title: 'Our Proven Process',
      items: [
        { icon: 'search', title: 'Pre-Approval Assessment', description: 'We review your business profile and suggest the best banks for your specific activity.' },
        { icon: 'file-text', title: 'Document Preparation', description: 'We compile your company profile, CVs, and bank forms to meet strict compliance standards.' },
        { icon: 'user-check', title: 'Banker Introduction', description: 'We arrange direct meetings with relationship managers from our trusted network.' },
        { icon: 'check-circle', title: 'Follow-Up & Issuance', description: 'We track your application daily until the account is approved and IBAN is issued.' },
      ],
    },
    ctaSection: {
      title: 'Ready to secure your corporate account?',
      buttonText: 'Contact Banking Team',
    },
  },

  visa: {
    slug: 'visa',
    label: 'VISA & RESIDENCY',
    heroTitle: 'Your Gateway to Living in the UAE',
    heroDescription: 'Seamless residency solutions for investors, entrepreneurs, and their families. We navigate the complexities so you can focus on your new life.',
    ctaText: 'Get Your Visa',
    benefits: {
      title: 'Simple 4-Step Process',
      items: [
        { icon: 'search', title: 'Eligibility Check', description: 'We analyze your profile to determine the best visa category for you and your family.' },
        { icon: 'file-text', title: 'Application Submission', description: 'We prepare and file all necessary documentation with government authorities.' },
        { icon: 'activity', title: 'Medical & ID', description: 'We guide you through the mandatory medical screening and Emirates ID biometrics.' },
        { icon: 'check-circle', title: 'Visa Stamping', description: 'Final residency visa stamping on your passport and issuance of Emirates ID.' },
      ],
    },
    middleSection: {
      type: 'cards',
      title: 'Visa Categories',
      subtitle: 'Choose the residency path that fits your goals.',
      items: [
        { badge: '10 Years', title: 'UAE Golden Visa', description: 'Long-term residency for investors, entrepreneurs, exceptional talents, and scientists.', features: ['10-year renewable residency', 'No sponsor required', '100% business ownership', 'Sponsor family & domestic staff'] },
        { badge: '2-3 Years', title: 'Investor & Partner', description: 'For shareholders in Mainland or Free Zone companies. The most common route for business owners.', features: ['Linked to your company license', 'Valid for 2 or 3 years', 'Renewable indefinitely', 'Easy travel in/out of UAE'] },
        { badge: 'Dependents', title: 'Family Sponsorship', description: 'Bring your family to the UAE. We handle the sponsorship process for your spouse, children, and parents.', features: ['Sponsor spouse and children', 'Sponsor parents (conditions apply)', 'Medical insurance coordination', 'Emirates ID processing'] },
      ],
    },
    ctaSection: {
      title: 'Ready to move to the UAE?',
      description: 'Let our experts handle the paperwork while you plan your new life. Fast, reliable, and hassle-free visa processing.',
      buttonText: 'Start Application',
    },
  },
};

export const serviceSlugs = Object.keys(serviceDataMap);
