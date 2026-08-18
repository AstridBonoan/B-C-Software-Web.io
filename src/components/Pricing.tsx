import { useState } from 'react';
import {
  CUSTOM_APPLICATION_PRICING,
  HOSTING_PRICING,
  ONLINE_PRESENCE_CATEGORY,
  PRICING_CATEGORIES,
  PRICING_INTRO,
  SUPPORT_PRICING,
  type PricingTier,
} from '../data/pricing';
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

function PricingCard({
  category,
  tier,
  featured = false,
  compactPrice = false,
  onSelect,
}: {
  category: string;
  tier: PricingTier;
  featured?: boolean;
  compactPrice?: boolean;
  onSelect?: (subject: string) => void;
}) {
  return (
    <div
      className={
        'flex h-full flex-col border bg-white p-6 dark:bg-white/[0.03] sm:p-7 ' +
        (featured
          ? 'border-ink dark:border-white'
          : 'border-slate-200 dark:border-white/10')
      }
    >
      <h4 className="font-display text-lg font-semibold text-ink dark:text-white">{tier.name}</h4>
      <p
        className={
          'mt-2 font-display font-semibold text-ink dark:text-white ' +
          (compactPrice ? 'text-2xl' : 'text-3xl')
        }
      >
        {tier.pricePrefix ? (
          <span className="mr-2 text-sm font-medium text-ink-muted dark:text-slate-400">
            {tier.pricePrefix}
          </span>
        ) : null}
        {tier.price}
        {tier.priceSuffix ? (
          <span className="text-base font-medium text-ink-muted dark:text-slate-400">
            {tier.priceSuffix}
          </span>
        ) : null}
      </p>
      {tier.description ? (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-slate-400">
          {tier.description}
        </p>
      ) : null}
      <ul className="mt-6 flex-grow space-y-2.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <CheckIcon />
            <span className="text-sm text-ink-muted dark:text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>
      {tier.examples ? (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted dark:text-slate-400">
          <span className="font-medium text-ink dark:text-slate-200">Examples: </span>
          {tier.examples}
        </p>
      ) : null}
      {tier.note ? (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-slate-400">{tier.note}</p>
      ) : null}
      <div className={SHOW_STRIPE_DEPOSIT_BUTTON ? 'mt-6 flex flex-col gap-2' : 'mt-6'}>
        <Button onClick={() => onSelect?.(`${category}: ${tier.name}`)} className="w-full">
          {tier.ctaLabel ?? 'Get in touch'}
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
}

export function Pricing({ onSelect }: { onSelect?: (subject: string) => void }) {
  const [estimatorOpen, setEstimatorOpen] = useState(false);

  return (
    <section
      id="pricing"
      className="min-h-screen bg-surface px-4 pb-20 pt-28 transition-colors duration-300 dark:bg-surface-dark sm:px-6 sm:pt-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
            {PRICING_INTRO.eyebrow}
          </p>
          <h2 className="mb-3 font-display text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl">
            {PRICING_INTRO.title}
          </h2>
          <p className="text-lg text-ink-muted dark:text-slate-400">{PRICING_INTRO.description}</p>
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

        {PRICING_CATEGORIES.map((category) => (
          <div key={category.id} className="mb-14">
            <div className="mb-6">
              <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
                {category.title}
              </h3>
              <p className="mt-1 max-w-3xl text-ink-muted dark:text-slate-400">
                {category.description}
              </p>
            </div>
            <div
              className={
                category.layout === 'single'
                  ? 'max-w-lg'
                  : 'grid grid-cols-1 gap-4 md:grid-cols-3'
              }
            >
              {category.tiers.map((tier) => (
                <PricingCard
                  key={tier.name}
                  category={category.title}
                  tier={tier}
                  featured={category.featuredTier === tier.name}
                  onSelect={onSelect}
                />
              ))}
            </div>
            {category.footerNote ? (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted dark:text-slate-400">
                {category.footerNote}
              </p>
            ) : null}
          </div>
        ))}

        <div className="mb-14">
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
              {CUSTOM_APPLICATION_PRICING.title}
            </h3>
            <p className="mt-1 max-w-3xl text-ink-muted dark:text-slate-400">
              {CUSTOM_APPLICATION_PRICING.description}
            </p>
          </div>
          <div className="max-w-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
            <h4 className="font-display text-lg font-semibold text-ink dark:text-white">
              {CUSTOM_APPLICATION_PRICING.name}
            </h4>
            <p className="mt-2 font-display text-3xl font-semibold text-ink dark:text-white">
              <span className="mr-2 text-sm font-medium text-ink-muted dark:text-slate-400">
                {CUSTOM_APPLICATION_PRICING.pricePrefix}
              </span>
              {CUSTOM_APPLICATION_PRICING.price}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-slate-400">
              {CUSTOM_APPLICATION_PRICING.intro}
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {CUSTOM_APPLICATION_PRICING.quotedOn.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-ink-muted dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => onSelect?.('Custom Web Applications: Discuss Project')}
              className="mt-6 w-full sm:w-auto"
            >
              {CUSTOM_APPLICATION_PRICING.ctaLabel}
            </Button>
          </div>
        </div>

        <div className="mb-14">
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
              {ONLINE_PRESENCE_CATEGORY.title}
            </h3>
            <p className="mt-1 max-w-3xl text-ink-muted dark:text-slate-400">
              {ONLINE_PRESENCE_CATEGORY.description}
            </p>
          </div>
          <div className="max-w-lg">
            {ONLINE_PRESENCE_CATEGORY.tiers.map((tier) => (
              <PricingCard
                key={tier.name}
                category={ONLINE_PRESENCE_CATEGORY.title}
                tier={tier}
                onSelect={onSelect}
              />
            ))}
          </div>
          {ONLINE_PRESENCE_CATEGORY.footerNote ? (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted dark:text-slate-400">
              {ONLINE_PRESENCE_CATEGORY.footerNote}
            </p>
          ) : null}
        </div>

        <div className="mb-14">
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
              {SUPPORT_PRICING.title}
            </h3>
            <p className="mt-1 max-w-3xl text-ink-muted dark:text-slate-400">
              {SUPPORT_PRICING.description}
            </p>
          </div>
          <div className="max-w-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
              {SUPPORT_PRICING.label}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-ink dark:text-white">
              {SUPPORT_PRICING.price}
              <span className="text-base font-medium text-ink-muted dark:text-slate-400">
                {SUPPORT_PRICING.priceSuffix}
              </span>
            </p>
            <ul className="mt-5 space-y-2.5">
              {SUPPORT_PRICING.features.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-ink-muted dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => onSelect?.('Edits & Support: Additional Development')}
              className="mt-6 w-full sm:w-auto"
            >
              Get in touch
            </Button>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">
              {HOSTING_PRICING.title}
            </h3>
            <p className="mt-1 max-w-3xl text-ink-muted dark:text-slate-400">
              {HOSTING_PRICING.description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:max-w-3xl md:grid-cols-2">
            {HOSTING_PRICING.plans.map((plan) => (
              <PricingCard
                key={plan.name}
                category="Hosting & Maintenance"
                tier={plan}
                compactPrice
                onSelect={onSelect}
              />
            ))}
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
