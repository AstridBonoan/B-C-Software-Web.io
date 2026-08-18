export interface PricingTier {
  name: string;
  price: string;
  pricePrefix?: string;
  priceSuffix?: string;
  description?: string;
  examples?: string;
  note?: string;
  features: string[];
  ctaLabel?: string;
}

export interface PricingCategory {
  id: string;
  title: string;
  description: string;
  layout: 'grid' | 'single';
  featuredTier?: string;
  footerNote?: string;
  tiers: PricingTier[];
}

const HOSTING_NOTE = 'Hosting is available through B&C after launch';

export const PRICING_INTRO = {
  eyebrow: 'Pricing',
  title: 'You have the idea. We build it for you.',
  description:
    'We work directly with you to design and build a custom digital solution around what you actually need—professional work for small businesses, entrepreneurs, and individuals, without forcing your business into a template.',
} as const;

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'website-creation',
    title: 'Website Creation',
    description: 'Custom, responsive websites built around your business, brand, or personal goals.',
    layout: 'grid',
    featuredTier: 'Standard',
    footerNote:
      'These packages are starting points—not unlimited functionality. Anything substantially beyond the listed scope is additional development and quoted separately.',
    tiers: [
      {
        name: 'Basic',
        price: '$750',
        description: 'For individuals and small businesses that need a professional online presence.',
        features: [
          '1–3 Pages',
          'Custom UI',
          'Responsive/mobile-friendly design',
          'Contact form',
          'Basic deployment setup',
          HOSTING_NOTE,
        ],
      },
      {
        name: 'Standard',
        price: '$1,250',
        description: 'For businesses that need a larger website and stronger lead generation.',
        features: [
          '3–5 Pages',
          'Custom UI',
          'Responsive/mobile-friendly design',
          'Contact form',
          'Lead and application forms',
          'Basic SEO',
          'Basic deployment setup',
          HOSTING_NOTE,
        ],
      },
      {
        name: 'Advanced',
        price: '$2,000',
        description: 'For businesses that need a more sophisticated website with additional functionality.',
        features: [
          '6–8 Pages',
          'Custom UI',
          'Responsive/mobile-friendly design',
          'Contact form',
          'Advanced forms',
          'Quote/intake/service request forms',
          'Light integrations',
          'Email automation',
          'Basic Stripe Checkout',
          'Basic SEO',
          'Deployment setup',
          HOSTING_NOTE,
        ],
      },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Websites',
    description: 'Custom online stores built for businesses that want to sell products online.',
    layout: 'single',
    footerNote:
      '$2,500 is a starting price for a straightforward store. Complex inventory, shipping, subscriptions, marketplaces, ERP/CRM/accounting integrations, and specialized business logic are quoted separately.',
    tiers: [
      {
        name: 'E-Commerce Website',
        price: '$2,500',
        pricePrefix: 'Starting at',
        description: 'A custom store with catalog, cart, checkout, and the basics needed to start selling.',
        features: [
          'Custom UI/UX',
          'Responsive design',
          'Product catalog',
          'Product categories',
          'Product variations',
          'Shopping cart',
          'Checkout',
          'Stripe/payment integration',
          'Basic inventory management',
          'Basic order management',
          'Order confirmation emails',
          'Basic shipping configuration',
          'Basic SEO',
          'Domain/deployment setup',
          HOSTING_NOTE,
        ],
      },
    ],
  },
  {
    id: 'custom-web-tools',
    title: 'Custom Web Tools',
    description: 'Purpose-built web applications designed to simplify a specific business process or idea.',
    layout: 'grid',
    featuredTier: 'Standard',
    footerNote: 'Complex projects receive a custom quote.',
    tiers: [
      {
        name: 'Basic',
        price: '$1,500',
        description: 'For simple, focused tools.',
        examples: 'Cost estimators, calculators, quote generators, intake systems, and simple business tools.',
        features: [
          'Single-purpose functionality',
          'Data collection',
          'Basic automation',
          'Streamlined workflows',
          'Basic integration',
          'Custom UI',
          HOSTING_NOTE,
        ],
      },
      {
        name: 'Standard',
        price: '$2,500',
        description: 'For businesses that need a more involved workflow.',
        examples:
          'Booking systems, payment-enabled applications, customer intake systems, automated business workflows, and estimator/quote applications.',
        features: [
          'Business process automation',
          'Payment processing',
          'Calendar integration',
          'Email integration',
          'Confirmations',
          'Reminders',
          'Custom UI',
          HOSTING_NOTE,
        ],
      },
      {
        name: 'Advanced',
        price: '$4,000',
        pricePrefix: 'Starting at',
        description: 'For more complex applications. Starts at $4,000; more complex work is quoted separately.',
        features: [
          'User authentication',
          'Multi-user dashboards',
          'Complex workflows',
          'Advanced integrations',
          'Custom business logic',
          'Custom UI',
          HOSTING_NOTE,
        ],
      },
    ],
  },
];

export const ONLINE_PRESENCE_CATEGORY: PricingCategory = {
  id: 'online-presence',
  title: 'Online Presence Setup',
  description:
    'Get listed where local customers search and make sure your business information is accurate and consistent.',
  layout: 'single',
  footerNote:
    'One-time setup. Does not include ongoing social media management, review management, ongoing SEO, or content creation.',
  tiers: [
    {
      name: 'Listing Bundle',
      price: '$300',
      description: 'A one-time setup so your business shows up with consistent details.',
      features: [
        'Google Business Profile setup',
        'Yelp business listing',
        'Apple Maps listing',
        'LinkedIn company page',
        'Nextdoor business page',
        'Consistent business name, address, phone number, and hours',
      ],
    },
  ],
};

export const CUSTOM_APPLICATION_PRICING = {
  title: 'Custom Web Applications',
  description:
    'Need something more complex? We can build a custom web application around the way your business operates.',
  name: 'Custom Web Application',
  pricePrefix: 'Starting at',
  price: '$5,000',
  intro: 'Quoted based on the actual project—not a fixed feature bundle. Scope typically includes:',
  quotedOn: [
    'Project requirements',
    'Number of users',
    'Authentication and permissions',
    'Dashboards',
    'Database requirements',
    'Integrations',
    'Automation',
    'Business logic',
    'Administrative functionality',
    'Third-party APIs',
    'Overall development complexity',
  ],
  ctaLabel: "Let's Discuss Your Project",
} as const;

export const SUPPORT_PRICING = {
  title: 'Edits & Support',
  description:
    'Project packages cover design and launch. Additional updates and development after delivery are billed separately.',
  label: 'Additional development',
  price: '$60',
  priceSuffix: '/hour',
  features: [
    'Content updates',
    'New sections',
    'Layout adjustments',
    'Bug fixes',
    'Small feature changes',
    'Additional functionality',
    'Technical support',
    'Billed in 30-minute increments',
    'Work is quoted and approved before beginning',
    'Revision rounds during the original project are included',
    'New functionality after project completion is additional development',
  ],
} as const;

export const HOSTING_PRICING: {
  title: string;
  description: string;
  plans: PricingTier[];
} = {
  title: 'Hosting & Maintenance',
  description:
    'Hosting is a recurring B&C service. Development packages include initial launch setup; ongoing hosting is billed monthly.',
  plans: [
    {
      name: 'Website Hosting',
      price: '$25',
      priceSuffix: '/month',
      description: 'For websites launched with B&C.',
      features: [
        'Hosting',
        'Deployment',
        'SSL',
        'Basic monitoring',
        'Basic technical maintenance',
      ],
    },
    {
      name: 'Application Hosting',
      price: '$50',
      pricePrefix: 'Starting at',
      priceSuffix: '/month',
      description:
        'For custom web tools and applications. Exact price depends on infrastructure, traffic, database usage, storage, and application requirements.',
      features: [
        'Hosting',
        'Deployment',
        'SSL',
        'Basic monitoring',
        'Basic technical maintenance',
      ],
    },
  ],
};
