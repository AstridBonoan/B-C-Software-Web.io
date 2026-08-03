import { useLayoutEffect, useMemo, useState } from 'react';

const FILTERS = [
  { id: 'websites', label: 'Websites' },
  { id: 'saas', label: 'SaaS Tools' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

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

function industryOptionsFor(filter: FilterId) {
  return filter === 'websites' ? WEBSITE_INDUSTRIES : SAAS_INDUSTRIES;
}

interface DemosPageProps {
  onNavigate: (path: string) => void;
}

export function DemosPage({ onNavigate }: DemosPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('websites');
  const [industryFilter, setIndustryFilter] = useState<IndustryId>('all');

  const industryOptions = useMemo(() => industryOptionsFor(activeFilter), [activeFilter]);

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
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
          Demos
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Sample websites & SaaS demos
        </h1>
        <p className="mb-4 max-w-3xl text-lg text-slate-600 dark:text-slate-400 sm:mb-2">
          Portfolio samples and concept builds by industry—not live client contracts. Pick a tab
          below, then narrow by industry if you like.
        </p>
        <p className="mb-8 max-w-3xl text-sm text-slate-500 dark:text-slate-500">
          Looking for shipped client projects?{' '}
          <button
            type="button"
            onClick={() => onNavigate('/my-work')}
            className="font-semibold text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
          >
            View My Work
          </button>
          .
        </p>

        <div
          role="group"
          aria-label="Filter demos by category"
          className="mb-4 grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => handleCategoryChange(filter.id)}
                aria-pressed={isActive}
                className={
                  'flex w-full min-w-0 flex-col items-center justify-center gap-1 rounded-full px-2 py-2.5 text-center text-xs font-semibold leading-tight transition-colors sm:inline-flex sm:w-auto sm:flex-row sm:items-center sm:gap-2 sm:px-4 sm:py-2 sm:text-sm sm:leading-normal ' +
                  (isActive
                    ? 'bg-brand-600 text-white shadow-sm dark:bg-brand-500'
                    : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-white/10 dark:hover:bg-slate-800')
                }
              >
                <span className="break-words">{filter.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mb-6 sm:mb-10">
          <label
            htmlFor="demo-industry-filter"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            {activeFilter === 'saas' ? 'Filter by business type' : 'Filter by industry'}
          </label>
          <select
            id="demo-industry-filter"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value as IndustryId)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition-colors focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-white dark:focus:ring-white/20 sm:max-w-md"
          >
            {industryOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
            Demos coming soon
          </h2>
          <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-300">
            Sample builds for this category are being prepared. Check back soon, or{' '}
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="font-semibold text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
            >
              get in touch
            </button>{' '}
            if you&rsquo;d like a preview of what&rsquo;s in the pipeline.
          </p>
        </div>
      </div>
    </section>
  );
}
