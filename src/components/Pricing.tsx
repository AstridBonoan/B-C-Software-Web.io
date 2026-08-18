import { useState } from 'react';
import { Button } from './ui/Button';

const STRIPE_DEPOSIT_PAYMENT_LINK = 'https://buy.stripe.com/test_placeholder';
const COST_ESTIMATOR_URL =
  'https://astridbonoan.github.io/bonoan_enterprises_cost_estimator.io/';
/** Set to true when Stripe Payment Links are live. */
const SHOW_STRIPE_DEPOSIT_BUTTON = false;

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Pricing({ onSelect }: { onSelect?: (subject: string) => void }) {
  const [estimatorOpen, setEstimatorOpen] = useState(false);

  const websiteCreation = [
    {
      name: 'Basic',
      price: '$500',
      features: ['1-3 Pages', 'Custom UI', 'Mobile Friendly', 'Contact Form'],
    },
    {
      name: 'Standard',
      price: '$800',
      features: [
        '3-5 Pages',
        'Custom UI',
        'Mobile Friendly',
        'Contact Form',
        'Lead & application forms',
      ],
    },
    {
      name: 'Advanced',
      price: '$1200',
      features: [
        '6-8 Pages',
        'Custom UI',
        'Mobile Friendly',
        'Contact Form',
        'Advanced forms (quotes, intake, service requests)',
        'Light Integrations',
        'Email Automation',
        'Basic Stripe Checkout',
      ],
    },
  ];

  const ecommerceSites = [
    {
      name: 'Starter',
      price: '$1500',
      features: [
        'Product catalog (up to 15 products)',
        'Shopping cart',
        'Stripe checkout',
        'Custom UI',
        'Mobile Friendly',
        'Order confirmation emails',
      ],
    },
    {
      name: 'Professional',
      price: '$2500',
      features: [
        'Product catalog (up to 40 products)',
        'Collections & categories',
        'Product variants (size, color)',
        'Shopping cart',
        'Stripe checkout',
        'Shipping options',
        'Inventory tracking',
        'Order confirmation emails',
      ],
    },
    {
      name: 'Advanced',
      price: '$4000',
      features: [
        'Unlimited products',
        'Customer accounts',
        'Discount codes & promotions',
        'Admin product dashboard',
        'Advanced inventory',
        'Stripe checkout',
        'Email automation',
        'Custom UI',
        'Mobile Friendly',
      ],
    },
  ];

  const saasTools = [
    {
      name: 'Basic',
      price: '$1000',
      features: [
        'Single Purpose Feature',
        'Data Collection & Automation',
        'Streamlined Workflows',
        'Basic Integration',
      ],
    },
    {
      name: 'Standard',
      price: '$1600',
      features: [
        'Business Process Automation',
        'Payment Processing',
        'Calendar & Email Integration',
        'Confirmations & Reminders',
      ],
    },
    {
      name: 'Advanced',
      price: '$3200',
      features: [
        'User Authentication',
        'Multi-user Dashboards',
        'Complex Workflows',
        'Advanced Integrations',
      ],
    },
  ];

  const PricingCard = ({
    category,
    tier,
    featured = false,
  }: {
    category: string;
    tier: { name: string; price: string; features: string[] };
    featured?: boolean;
  }) => (
    <div
      className={
        'flex h-full flex-col border bg-white p-6 dark:bg-white/[0.03] sm:p-7 ' +
        (featured
          ? 'border-ink dark:border-white'
          : 'border-slate-200 dark:border-white/10')
      }
    >
      <h4 className="font-display text-lg font-semibold text-ink dark:text-white">{tier.name}</h4>
      <p className="mt-2 font-display text-3xl font-semibold text-ink dark:text-white">{tier.price}</p>
      <ul className="mt-6 flex-grow space-y-2.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <CheckIcon />
            <span className="text-sm text-ink-muted dark:text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>
      <div className={SHOW_STRIPE_DEPOSIT_BUTTON ? 'mt-6 flex flex-col gap-2' : 'mt-6'}>
        <Button onClick={() => onSelect?.(`${category}: ${tier.name}`)} className="w-full">
          Get in touch
        </Button>
        {SHOW_STRIPE_DEPOSIT_BUTTON && (
          <a
            href={STRIPE_DEPOSIT_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-lg border border-slate-300 px-3 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
          >
            Start Project (Pay 50% Deposit)
          </a>
        )}
      </div>
    </div>
  );

  return (
    <section
      id="pricing"
      className="min-h-screen bg-surface px-4 pb-20 pt-28 transition-colors duration-300 dark:bg-surface-dark sm:px-6 sm:pt-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
            Pricing
          </p>
          <h2 className="mb-3 font-display text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl">
            Clear packages for every stage
          </h2>
          <p className="text-lg text-ink-muted dark:text-slate-400">
            Flat-rate packages for builds—plus hourly pricing for post-launch edits and support.
          </p>
        </div>

        <div className="mb-12 border border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5 sm:px-6 sm:py-5">
          <p className="text-sm leading-relaxed text-ink-muted dark:text-slate-300 sm:text-base">
            A <strong className="font-semibold text-ink dark:text-white">50%</strong> upfront
            deposit is required to begin all projects. The remaining balance is due upon completion,
            before final delivery. If a project is cancelled mid-way, we keep{' '}
            <strong className="font-semibold text-ink dark:text-white">25%</strong> of the
            upfront deposit and refund the rest.
          </p>
        </div>

        <div className="mb-14">
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
              Website Creation
            </h3>
            <p className="mt-1 text-ink-muted dark:text-slate-400">
              Custom, responsive websites built with modern technologies
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {websiteCreation.map((tier) => (
              <PricingCard
                key={tier.name}
                category="Website Creation"
                tier={tier}
                featured={tier.name === 'Standard'}
              />
            ))}
          </div>
        </div>

        <div className="mb-14">
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
              E-Commerce Site
            </h3>
            <p className="mt-1 text-ink-muted dark:text-slate-400">
              Online stores built to sell products, take payments, and manage orders
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ecommerceSites.map((tier) => (
              <PricingCard
                key={tier.name}
                category="E-Commerce Site"
                tier={tier}
                featured={tier.name === 'Professional'}
              />
            ))}
          </div>
        </div>

        <div className="mb-14">
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
              SaaS Tools
            </h3>
            <p className="mt-1 text-ink-muted dark:text-slate-400">
              Build scalable Software-as-a-Service solutions tailored to your business
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {saasTools.map((tier) => (
              <PricingCard
                key={tier.name}
                category="SaaS Tools"
                tier={tier}
                featured={tier.name === 'Standard'}
              />
            ))}
          </div>
        </div>

        <div className="mb-14">
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
              Online Presence
            </h3>
            <p className="mt-1 text-ink-muted dark:text-slate-400">
              Get listed where local customers search so your business shows up with accurate info
            </p>
          </div>
          <div className="max-w-md">
            <PricingCard
              category="Online Presence"
              tier={{
                name: 'Listing Bundle',
                price: '$300',
                features: [
                  'Google Business Profile setup',
                  'Yelp business listing',
                  'Apple Maps listing',
                  'LinkedIn company page',
                  'Nextdoor business page',
                  'Consistent name, address, phone & hours',
                ],
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
              Edits &amp; Support
            </h3>
            <p className="mt-1 text-ink-muted dark:text-slate-400">
              Project packages cover design and launch. After delivery, updates and support are
              billed hourly.
            </p>
          </div>
          <div className="max-w-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
              Hourly rate
            </p>
            <p className="mt-1 font-display text-4xl font-semibold text-ink dark:text-white">
              $80
              <span className="text-xl font-medium text-ink-muted dark:text-slate-400">/hr</span>
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                'Content updates, new sections, and layout tweaks',
                'Bug fixes and small feature changes',
                'Billed in 30-minute increments',
                'Quoted and approved before work begins',
                'Revision rounds during the project are included in your package',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-ink-muted dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => onSelect?.('Edits & Support: Hourly')}
              className="mt-6 w-full sm:w-auto"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>

      {estimatorOpen ? (
        <aside
          aria-label="Project cost estimator"
          className="fixed bottom-4 left-4 right-4 z-40 border border-slate-200 bg-white p-5 shadow-card dark:border-white/15 dark:bg-ink sm:bottom-6 sm:left-auto sm:right-6 sm:w-80"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
              Custom estimate
            </p>
            <button
              type="button"
              onClick={() => setEstimatorOpen(false)}
              aria-label="Close cost estimator popup"
              className="rounded-lg p-1 text-ink-muted transition-colors hover:bg-slate-100 hover:text-ink focus:outline-none focus:ring-2 focus:ring-brand-600 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink dark:text-white">
            Need a custom fit? Estimate what your unique project could cost.
          </h3>
          <a
            href={COST_ESTIMATOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-ink dark:hover:bg-slate-100"
          >
            Open cost estimator
          </a>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setEstimatorOpen(true)}
          aria-label="Open cost estimator"
          className="fixed bottom-4 right-4 z-40 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink shadow-card transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-600 dark:border-white/15 dark:bg-ink dark:text-white dark:hover:bg-white/5 sm:bottom-6 sm:right-6"
        >
          Cost Estimator
        </button>
      )}
    </section>
  );
}
