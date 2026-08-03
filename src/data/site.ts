export const BRAND = {
  name: 'B&C Software & Web',
  headline: 'Modern Digital Solutions for Growing Businesses',
  tagline:
    'Custom websites, software, and automation designed to help businesses operate smarter and look more professional online.',
  email: 'bcsoftwareweb@gmail.com',
  instagram: 'https://www.instagram.com/bcsoftware_web/?hl=en',
  instagramHandle: '@bcsoftware_web',
  calendlyPlaceholder: '#schedule-intro-call',
} as const;

export const INDUSTRIES = [
  { name: 'Restaurants', icon: 'utensils' },
  { name: 'Auto Shops', icon: 'wrench' },
  { name: 'Barbershops', icon: 'scissors' },
  { name: 'Construction', icon: 'hammer' },
  { name: 'Local Businesses', icon: 'store' },
  { name: 'Fitness', icon: 'dumbbell' },
  { name: 'Service Businesses', icon: 'briefcase' },
] as const;

export const SERVICES = [
  {
    title: 'Website Design & Development',
    description:
      'Professional sites that load fast, look credible, and guide customers to call, book, or buy.',
    icon: 'globe',
  },
  {
    title: 'Business Automation',
    description:
      'Forms, email, and workflows connected so leads and requests reach the right place—without manual chasing.',
    icon: 'zap',
  },
  {
    title: 'Custom Software Solutions',
    description:
      'Dashboards, portals, and tools built around how your team actually runs day to day.',
    icon: 'layers',
  },
  {
    title: 'Mobile Optimization',
    description:
      'Layouts and performance tuned for phones—where most of your customers will find you first.',
    icon: 'smartphone',
  },
  {
    title: 'Booking & Ordering Systems',
    description:
      'Scheduling, reservations, and order flows that reduce phone tag and missed opportunities.',
    icon: 'calendar',
  },
  {
    title: 'Online Presence',
    description:
      'Get found where customers search—Google Business Profile, Yelp, Apple Maps, LinkedIn, Nextdoor, and more, set up and ready to attract local leads.',
    icon: 'map-pin',
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Consultation',
    description:
      'I learn your goals, customers, and timeline—in plain language, with no pressure.',
  },
  {
    step: '02',
    title: 'Design & Development',
    description:
      'You review progress as I build. I refine design, content, and tools until it feels right.',
  },
  {
    step: '03',
    title: 'Launch & Support',
    description:
      'Go live with confidence. I help with launch, updates, and ongoing support when you need it.',
  },
] as const;

export const WHY_CHOOSE = [
  'Mobile-first development',
  'Modern design standards',
  'Fast turnaround',
  'Personalized support',
  'Modern technologies',
  'Focus on business growth',
  'Professional user experience',
] as const;

/** Live client projects. */
export const CLIENT_WORK = [
  {
    title: 'Company Website',
    client: 'Tamay Enterprises',
    industry: 'Construction',
    problem: 'One clear online home for construction, real estate, and logistics',
    description:
      'Multi-division marketing site for a West Haven, CT company—services, financing, project estimator CTA, and contact flows in one place.',
    image: 'tamay-enterprises.png',
    imageAlt:
      'Tamay Enterprises homepage hero with finished renovation photo, company tagline, and phone CTA',
    href: 'https://www.tamayenterprises.com/',
  },
  {
    title: 'Project Cost Estimator',
    client: 'Tamay Enterprises',
    industry: 'Construction',
    problem: 'Streamline estimates, deposits, and scheduling for renovation clients',
    description:
      'Multi-step estimator with Stripe deposits, Google Calendar scheduling, and a refreshed interface aligned to their brand.',
    image: 'tamay-estimator.png',
    imageAlt:
      'Tamay Enterprises project cost estimator showing the project type selection step and multi-step progress bar',
    href: 'https://estimator.tamayenterprises.com/',
  },
] as const;
