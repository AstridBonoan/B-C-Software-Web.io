import { useLayoutEffect, useMemo, useState } from 'react';
import { Button } from './ui/Button';

const FILTERS = [
  { id: 'websites', label: 'Websites' },
  { id: 'saas', label: 'SaaS Tools' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];
type DemoCategory = FilterId;

const WEBSITE_INDUSTRIES = [
  { id: 'all', label: 'All industries' },
  { id: 'restaurant', label: 'Restaurants & dining' },
  { id: 'cafe', label: 'Cafés & coffee' },
  { id: 'auto', label: 'Auto shop' },
  { id: 'construction', label: 'Construction & trades' },
  { id: 'real-estate', label: 'Real estate' },
  { id: 'legal', label: 'Legal & professional' },
  { id: 'photography', label: 'Photography & creative' },
  { id: 'fitness', label: 'Fitness & wellness' },
  { id: 'fashion-retail', label: 'Fashion & retail' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'barbershop', label: 'Barbershop & grooming' },
] as const;

const SAAS_INDUSTRIES = [
  { id: 'all', label: 'All industries' },
  { id: 'restaurant', label: 'Restaurants & hospitality' },
  { id: 'auto', label: 'Auto shops' },
  { id: 'field-services', label: 'Field services & contractors' },
  { id: 'fitness', label: 'Fitness & gyms' },
  { id: 'retail', label: 'Retail & ecommerce' },
] as const;

type WebsiteIndustryId = (typeof WEBSITE_INDUSTRIES)[number]['id'];
type SaasIndustryId = (typeof SAAS_INDUSTRIES)[number]['id'];
type IndustryId = WebsiteIndustryId | SaasIndustryId;

interface Demo {
  image: string;
  alt: string;
  title: string;
  description: string;
  href: string;
  category: DemoCategory;
  industry: Exclude<IndustryId, 'all'>;
}

function industryOptionsFor(filter: FilterId) {
  return filter === 'websites' ? WEBSITE_INDUSTRIES : SAAS_INDUSTRIES;
}

const demos: readonly Demo[] = [
  {
    image: 'evergreen-residential.png',
    alt: 'Evergreen Residential Construction homepage with Building Homes Creating Memories headline and project CTAs',
    title: 'Evergreen Residential Construction',
    description:
      'Residential construction marketing site—project showcase, services, testimonials, and a clear path from browse to quote.',
    href: 'https://astridbonoan.github.io/Residential-Construction/',
    category: 'websites',
    industry: 'construction',
  },
  {
    image: 'bc-merch-store.png',
    alt: 'B&C Merch Store homepage with Fall Collection hero and Shop the Collection CTA',
    title: 'B&C Merch Store',
    description:
      'Brand merch ecommerce storefront—collection drops, featured products, and a clean path from browse to cart.',
    href: 'https://astridbonoan.github.io/b-c-merchstore.io-/',
    category: 'websites',
    industry: 'ecommerce',
  },
  {
    image: 'as-department.png',
    alt: 'AS Department homepage with spring event hero, fashion flat-lay imagery, and Shop New Arrivals CTA',
    title: 'AS Department',
    description:
      'Full-scale clothing ecommerce experience—department navigation, seasonal campaigns, and a clear path from browse to sale.',
    href: 'https://astridbonoan.github.io/AS-ClothingEcommerce.io/',
    category: 'websites',
    industry: 'ecommerce',
  },
  {
    image: 'as-luxury-homes.png',
    alt: 'AS Luxury homepage with dusk estate photography, bespoke residential construction headline, and consultation CTAs',
    title: 'AS Luxury Homes',
    description:
      'Luxury real estate and custom estate builder site—portfolio-driven design with private consultation as the primary call to action.',
    href: 'https://astridbonoan.github.io/AS_Luxery_Homes.io/',
    category: 'websites',
    industry: 'real-estate',
  },
  {
    image: 'as-cafe.png',
    alt: 'AS Café homepage with coffee pour hero image, slow mornings tagline, and Explore the menu CTA',
    title: 'AS Café',
    description:
      'Warm café website—menu, locations, and a calm browse path designed for local coffee shops and lingering visits.',
    href: 'https://astridbonoan.github.io/AS_Cafe.io/',
    category: 'websites',
    industry: 'cafe',
  },
  {
    image: 'as-bistro.png',
    alt: 'B&C Luxery Urban Kitchen homepage with plated dinner hero, golden hour headline, and Reserve a table CTA',
    title: 'B&C Luxery',
    description:
      'Urban kitchen restaurant site—reservations, menu, and atmosphere-first design built to convert diners on mobile and desktop.',
    href: 'https://astridbonoan.github.io/AS-BistroDemo.io/',
    category: 'websites',
    industry: 'restaurant',
  },
  {
    image: 'lens-and-light.png',
    alt: 'Lens & Light About page with moments worth keeping headline, landscape photo, and photographer bio',
    title: 'Lens & Light',
    description:
      'Photography portfolio site—gallery-first layout with clear paths to view work and inquire about bookings.',
    href: 'https://astridbonoan.github.io/image_gallery.io/',
    category: 'websites',
    industry: 'photography',
  },
  {
    image: 'ashline-barbershop.png',
    alt: 'Ashline Barbershop homepage with sharp cuts headline and Book Appointment CTA',
    title: 'Ashline Barbershop',
    description:
      'Modern barbershop site—services, barbers, booking, and gallery designed to turn walk-ins into reserved chairs.',
    href: 'https://astridbonoan.github.io/AshlineBarbershop.io/',
    category: 'websites',
    industry: 'barbershop',
  },
];

function countFor(filter: FilterId): number {
  return demos.filter((d) => d.category === filter).length;
}

interface DemosPageProps {
  onNavigate: (path: string) => void;
}

export function DemosPage({ onNavigate }: DemosPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('websites');
  const [industryFilter, setIndustryFilter] = useState<IndustryId>('all');

  const demoImageBase = `${import.meta.env.BASE_URL}demo-images/`;
  const categoryDemos = demos.filter((d) => d.category === activeFilter);

  const industryOptions = useMemo(() => industryOptionsFor(activeFilter), [activeFilter]);

  const visibleDemos =
    industryFilter === 'all'
      ? categoryDemos
      : categoryDemos.filter((d) => d.industry === industryFilter);

  const handleCategoryChange = (filter: FilterId) => {
    setActiveFilter(filter);
    setIndustryFilter('all');
  };

  useLayoutEffect(() => {
    if (industryFilter !== 'all' && !industryOptions.some((o) => o.id === industryFilter)) {
      setIndustryFilter('all');
    }
  }, [industryFilter, industryOptions]);

  return (
    <section className="min-h-screen bg-surface px-4 pb-20 pt-28 transition-colors duration-300 dark:bg-surface-dark sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
          Demos
        </p>
        <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl">
          Sample websites & SaaS demos
        </h1>
        <p className="mb-3 max-w-3xl text-lg text-ink-muted dark:text-slate-400">
          Portfolio samples and concept builds by industry—not live client contracts. Pick a category,
          then narrow by industry if you like.
        </p>
        <p className="mb-10 max-w-3xl text-sm text-ink-muted dark:text-slate-500">
          Looking for shipped client projects?{' '}
          <button
            type="button"
            onClick={() => onNavigate('/my-work')}
            className="font-semibold text-ink underline-offset-2 hover:underline dark:text-white"
          >
            View Our Work
          </button>
          .
        </p>

        <div
          role="group"
          aria-label="Filter demos by category"
          className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-6 dark:border-white/10"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            const count = countFor(filter.id);
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => handleCategoryChange(filter.id)}
                aria-pressed={isActive}
                className={
                  'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ' +
                  (isActive
                    ? 'bg-ink text-white dark:bg-white dark:text-ink'
                    : 'border border-slate-300 bg-white text-ink-muted hover:border-slate-400 hover:text-ink dark:border-white/15 dark:bg-transparent dark:text-slate-300 dark:hover:border-white/30')
                }
              >
                {filter.label}
                <span
                  className={
                    'text-xs font-medium ' +
                    (isActive ? 'text-white/70 dark:text-ink/60' : 'text-ink-muted dark:text-slate-500')
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-10">
          <label
            htmlFor="demo-industry-filter"
            className="mb-2 block text-sm font-medium text-ink dark:text-slate-300"
          >
            {activeFilter === 'saas' ? 'Filter by business type' : 'Filter by industry'}
          </label>
          <select
            id="demo-industry-filter"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value as IndustryId)}
            className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-ink focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15 dark:border-white/15 dark:bg-ink/50 dark:text-white dark:focus:border-brand-400"
          >
            {industryOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {categoryDemos.length === 0 ? (
          <div className="border border-slate-200 bg-white px-6 py-12 dark:border-white/10 dark:bg-white/5">
            <h2 className="font-display text-xl font-semibold text-ink dark:text-white">
              No samples in this category yet
            </h2>
            <p className="mt-2 max-w-xl text-ink-muted dark:text-slate-400">
              Switch to Websites to browse available demos, or{' '}
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="font-semibold text-ink underline-offset-2 hover:underline dark:text-white"
              >
                get in touch
              </button>{' '}
              to discuss a custom build.
            </p>
          </div>
        ) : visibleDemos.length === 0 ? (
          <div className="border border-slate-200 bg-white px-6 py-12 dark:border-white/10 dark:bg-white/5">
            <h2 className="font-display text-xl font-semibold text-ink dark:text-white">
              No demos match this filter
            </h2>
            <p className="mt-2 max-w-xl text-ink-muted dark:text-slate-400">
              Try another industry, or switch back to <span className="font-medium">All industries</span>.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {visibleDemos.map((demo) => (
              <article
                key={demo.href + demo.title}
                className="grid items-center gap-8 border-b border-slate-200 pb-12 last:border-0 dark:border-white/10 lg:grid-cols-2 lg:gap-12"
              >
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <img
                    src={`${demoImageBase}${demo.image}`}
                    alt={demo.alt}
                    className="aspect-[16/10] w-full object-contain object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">
                    {demo.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted dark:text-slate-400">
                    {demo.description}
                  </p>
                  <a
                    href={demo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline dark:text-white"
                  >
                    Open demo
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Button variant="secondary" onClick={() => onNavigate('/contact')}>
            Discuss a custom project
          </Button>
        </div>
      </div>
    </section>
  );
}
