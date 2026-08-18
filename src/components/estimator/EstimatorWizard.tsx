import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
  APP_ADMIN_OPTIONS,
  APP_AUTH_OPTIONS,
  APP_AUTOMATION_OPTIONS,
  APP_DASHBOARD_OPTIONS,
  APP_INTEGRATION_OPTIONS,
  APP_USER_TYPE_OPTIONS,
  APP_WORKFLOW_OPTIONS,
  ECOM_CATALOG_OPTIONS,
  ECOM_INVENTORY_OPTIONS,
  ECOM_INTEGRATION_OPTIONS,
  ECOM_SHIPPING_OPTIONS,
  ECOM_VARIATION_OPTIONS,
  PROJECT_TYPES,
  TOOL_FEATURES,
  WEBSITE_FEATURES,
  WEBSITE_PAGE_OPTIONS,
  createInitialAnswers,
  getIncludedWebsiteFeatures,
  type EstimatorAnswers,
  type ProjectTypeId,
  type ToolFeatureId,
  type WebsiteFeatureId,
} from '../../data/estimator';
import {
  buildInquiryPayload,
  calculateEstimate,
  toggleExclusiveNoneSelection,
} from '../../lib/calculateEstimate';
import { Button } from '../ui/Button';
import { contactInputClass } from '../ui/ContactFormFields';
import { CheckOption, ChoiceCard } from './ChoiceCard';
import { EstimateResults } from './EstimateResults';
import { EstimatorProgress } from './EstimatorProgress';

type StepId =
  | 'type'
  | 'website-pages'
  | 'website-features'
  | 'ecom-catalog'
  | 'ecom-ops'
  | 'ecom-extras'
  | 'tool-features'
  | 'app-users'
  | 'app-systems'
  | 'results';

const STEP_LABELS: Record<StepId, string> = {
  type: 'What are you looking to build?',
  'website-pages': 'How many pages do you need?',
  'website-features': 'Which functionality should the site include?',
  'ecom-catalog': 'Tell us about your catalog',
  'ecom-ops': 'Store operations',
  'ecom-extras': 'Integrations and extras',
  'tool-features': 'What should this tool do?',
  'app-users': 'Users, access, and data',
  'app-systems': 'Workflows, integrations, and admin',
  results: 'Your estimate',
};

function stepsFor(projectType: ProjectTypeId | null): StepId[] {
  switch (projectType) {
    case 'website':
      return ['type', 'website-pages', 'website-features', 'results'];
    case 'ecommerce':
      return ['type', 'ecom-catalog', 'ecom-ops', 'ecom-extras', 'results'];
    case 'web-tool':
      return ['type', 'tool-features', 'results'];
    case 'web-app':
      return ['type', 'app-users', 'app-systems', 'results'];
    default:
      return ['type'];
  }
}

function QuestionHeading({ title }: { title: string }) {
  return <h3 className="mb-3 font-display text-lg font-semibold text-ink dark:text-white">{title}</h3>;
}

interface EstimatorWizardProps {
  onQuote: (payload: { subject: string; message: string }) => void;
}

export function EstimatorWizard({ onQuote }: EstimatorWizardProps) {
  const reduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<EstimatorAnswers>(createInitialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState('');

  const steps = stepsFor(answers.projectType);
  const stepId = steps[Math.min(stepIndex, steps.length - 1)] ?? 'type';
  const estimate = useMemo(
    () => (stepId === 'results' ? calculateEstimate(answers) : null),
    [answers, stepId],
  );

  const update = (patch: (current: EstimatorAnswers) => EstimatorAnswers) => {
    setAnswers((current) => patch(current));
    setError('');
  };

  const canContinue = (): boolean => {
    const ecom = answers.ecommerce;
    const app = answers.webApp;
    switch (stepId) {
      case 'type':
        return answers.projectType !== null;
      case 'website-pages':
        return answers.website.pageCount !== null;
      case 'website-features':
        return true;
      case 'ecom-catalog':
        return ecom.catalogSize !== null && ecom.variations !== null;
      case 'ecom-ops':
        return (
          ecom.customerAccounts !== null &&
          ecom.coupons !== null &&
          ecom.shipping !== null &&
          ecom.inventory !== null
        );
      case 'ecom-extras':
        return ecom.integrations.length > 0;
      case 'tool-features':
        return answers.webTool.features.length > 0;
      case 'app-users':
        return (
          app.userTypes !== null &&
          app.authentication !== null &&
          app.storesData !== null &&
          app.dashboards !== null
        );
      case 'app-systems':
        return (
          app.workflows !== null &&
          app.integrations.length > 0 &&
          app.automation !== null &&
          app.admin !== null
        );
      default:
        return true;
    }
  };

  const goNext = () => {
    if (!canContinue()) {
      setError('Please complete this step before continuing.');
      return;
    }
    setError('');
    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  };

  const goBack = () => {
    setError('');
    setStepIndex((index) => Math.max(index - 1, 0));
  };

  const restart = () => {
    setAnswers(createInitialAnswers());
    setStepIndex(0);
    setError('');
  };

  const selectProjectType = (id: ProjectTypeId) => {
    update(() => ({ ...createInitialAnswers(), projectType: id }));
  };

  const toggleWebsiteFeature = (id: WebsiteFeatureId) => {
    const included = getIncludedWebsiteFeatures(answers.website.pageCount);
    if (included.includes(id)) return;
    update((current) => {
      const has = current.website.features.includes(id);
      const features = has
        ? current.website.features.filter((item) => item !== id)
        : [...current.website.features, id];
      return {
        ...current,
        website: {
          ...current.website,
          features,
          otherDescription: id === 'other' && has ? '' : current.website.otherDescription,
        },
      };
    });
  };

  const toggleToolFeature = (id: ToolFeatureId) => {
    update((current) => {
      const has = current.webTool.features.includes(id);
      const features = has
        ? current.webTool.features.filter((item) => item !== id)
        : [...current.webTool.features, id];
      return {
        ...current,
        webTool: {
          ...current.webTool,
          features,
          otherDescription: id === 'other' && has ? '' : current.webTool.otherDescription,
        },
      };
    });
  };

  const includedWebsite = getIncludedWebsiteFeatures(answers.website.pageCount);

  const stepBody = (() => {
    switch (stepId) {
      case 'type':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {PROJECT_TYPES.map((type) => (
              <ChoiceCard
                key={type.id}
                title={type.title}
                description={type.description}
                selected={answers.projectType === type.id}
                onSelect={() => selectProjectType(type.id)}
              />
            ))}
          </div>
        );
      case 'website-pages':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {WEBSITE_PAGE_OPTIONS.map((option) => (
              <ChoiceCard
                key={option.id}
                title={option.label}
                description={
                  option.packageId === 'custom'
                    ? 'Custom quote required'
                    : `${option.packageId.charAt(0).toUpperCase()}${option.packageId.slice(1)} package`
                }
                selected={answers.website.pageCount === option.id}
                onSelect={() =>
                  update((current) => ({
                    ...current,
                    website: { ...current.website, pageCount: option.id, features: [] },
                  }))
                }
              />
            ))}
          </div>
        );
      case 'website-features':
        return (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-ink-muted dark:text-slate-400">
              Features already covered by your selected package are marked included and will not add another charge.
            </p>
            {WEBSITE_FEATURES.map((feature) => (
              <CheckOption
                key={feature.id}
                title={feature.label}
                included={includedWebsite.includes(feature.id)}
                checked={answers.website.features.includes(feature.id)}
                onToggle={() => toggleWebsiteFeature(feature.id)}
              />
            ))}
            {answers.website.features.includes('other') ? (
              <label className="block pt-2">
                <span className="mb-2 block text-sm font-medium text-ink dark:text-white">
                  Tell us what else you need
                </span>
                <textarea
                  className={`${contactInputClass} resize-none`}
                  rows={4}
                  value={answers.website.otherDescription}
                  onChange={(event) =>
                    update((current) => ({
                      ...current,
                      website: { ...current.website, otherDescription: event.target.value },
                    }))
                  }
                />
              </label>
            ) : null}
          </div>
        );
      case 'ecom-catalog':
        return (
          <div className="space-y-8">
            <div>
              <QuestionHeading title="Product catalog size" />
              <div className="grid gap-3 sm:grid-cols-2">
                {ECOM_CATALOG_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.ecommerce.catalogSize === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        ecommerce: { ...current.ecommerce, catalogSize: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Product variations" />
              <div className="grid gap-3 sm:grid-cols-2">
                {ECOM_VARIATION_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.ecommerce.variations === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        ecommerce: { ...current.ecommerce, variations: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'ecom-ops':
        return (
          <div className="space-y-8">
            <div>
              <QuestionHeading title="Customer accounts" />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: false, label: 'No' },
                  { id: true, label: 'Yes' },
                ].map((option) => (
                  <ChoiceCard
                    key={String(option.id)}
                    title={option.label}
                    selected={answers.ecommerce.customerAccounts === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        ecommerce: { ...current.ecommerce, customerAccounts: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Coupons / discounts" />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: false, label: 'No' },
                  { id: true, label: 'Yes' },
                ].map((option) => (
                  <ChoiceCard
                    key={String(option.id)}
                    title={option.label}
                    selected={answers.ecommerce.coupons === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        ecommerce: { ...current.ecommerce, coupons: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Shipping" />
              <div className="grid gap-3 sm:grid-cols-2">
                {ECOM_SHIPPING_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.ecommerce.shipping === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        ecommerce: { ...current.ecommerce, shipping: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Inventory" />
              <div className="grid gap-3 sm:grid-cols-2">
                {ECOM_INVENTORY_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.ecommerce.inventory === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        ecommerce: { ...current.ecommerce, inventory: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'ecom-extras':
        return (
          <div className="space-y-8">
            <div>
              <QuestionHeading title="Additional integrations" />
              <div className="space-y-3">
                {ECOM_INTEGRATION_OPTIONS.map((option) => (
                  <CheckOption
                    key={option.id}
                    title={option.label}
                    checked={answers.ecommerce.integrations.includes(option.id)}
                    onToggle={() =>
                      update((current) => ({
                        ...current,
                        ecommerce: {
                          ...current.ecommerce,
                          integrations: toggleExclusiveNoneSelection(
                            current.ecommerce.integrations,
                            option.id,
                            'none',
                          ),
                        },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Custom functionality" />
              <CheckOption
                title="I need something else"
                checked={answers.ecommerce.needsCustom}
                onToggle={() =>
                  update((current) => ({
                    ...current,
                    ecommerce: {
                      ...current.ecommerce,
                      needsCustom: !current.ecommerce.needsCustom,
                      customDescription: current.ecommerce.needsCustom
                        ? ''
                        : current.ecommerce.customDescription,
                    },
                  }))
                }
              />
              {answers.ecommerce.needsCustom ? (
                <label className="mt-3 block">
                  <span className="mb-2 block text-sm font-medium text-ink dark:text-white">
                    Describe what you need
                  </span>
                  <textarea
                    className={`${contactInputClass} resize-none`}
                    rows={4}
                    value={answers.ecommerce.customDescription}
                    onChange={(event) =>
                      update((current) => ({
                        ...current,
                        ecommerce: { ...current.ecommerce, customDescription: event.target.value },
                      }))
                    }
                  />
                </label>
              ) : null}
            </div>
          </div>
        );
      case 'tool-features':
        return (
          <div className="space-y-3">
            {TOOL_FEATURES.map((feature) => (
              <CheckOption
                key={feature.id}
                title={feature.label}
                checked={answers.webTool.features.includes(feature.id)}
                onToggle={() => toggleToolFeature(feature.id)}
              />
            ))}
            {answers.webTool.features.includes('other') ? (
              <label className="block pt-2">
                <span className="mb-2 block text-sm font-medium text-ink dark:text-white">
                  Tell us what else you need
                </span>
                <textarea
                  className={`${contactInputClass} resize-none`}
                  rows={4}
                  value={answers.webTool.otherDescription}
                  onChange={(event) =>
                    update((current) => ({
                      ...current,
                      webTool: { ...current.webTool, otherDescription: event.target.value },
                    }))
                  }
                />
              </label>
            ) : null}
          </div>
        );
      case 'app-users':
        return (
          <div className="space-y-8">
            <div>
              <QuestionHeading title="How many types of users will the system have?" />
              <div className="grid gap-3 sm:grid-cols-3">
                {APP_USER_TYPE_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.webApp.userTypes === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        webApp: { ...current.webApp, userTypes: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Authentication" />
              <div className="grid gap-3 sm:grid-cols-2">
                {APP_AUTH_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.webApp.authentication === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        webApp: { ...current.webApp, authentication: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Will the application store business or customer data?" />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: false, label: 'No' },
                  { id: true, label: 'Yes' },
                ].map((option) => (
                  <ChoiceCard
                    key={String(option.id)}
                    title={option.label}
                    selected={answers.webApp.storesData === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        webApp: { ...current.webApp, storesData: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Dashboards" />
              <div className="grid gap-3 sm:grid-cols-2">
                {APP_DASHBOARD_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.webApp.dashboards === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        webApp: { ...current.webApp, dashboards: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'app-systems':
        return (
          <div className="space-y-8">
            <div>
              <QuestionHeading title="Workflows" />
              <div className="grid gap-3 sm:grid-cols-2">
                {APP_WORKFLOW_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.webApp.workflows === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        webApp: { ...current.webApp, workflows: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Integrations" />
              <div className="space-y-3">
                {APP_INTEGRATION_OPTIONS.map((option) => (
                  <CheckOption
                    key={option.id}
                    title={option.label}
                    checked={answers.webApp.integrations.includes(option.id)}
                    onToggle={() =>
                      update((current) => ({
                        ...current,
                        webApp: {
                          ...current.webApp,
                          integrations: toggleExclusiveNoneSelection(
                            current.webApp.integrations,
                            option.id,
                            'none',
                          ),
                        },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Automation" />
              <div className="grid gap-3 sm:grid-cols-2">
                {APP_AUTOMATION_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.webApp.automation === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        webApp: { ...current.webApp, automation: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <QuestionHeading title="Administrative features" />
              <div className="grid gap-3 sm:grid-cols-2">
                {APP_ADMIN_OPTIONS.map((option) => (
                  <ChoiceCard
                    key={option.id}
                    title={option.label}
                    selected={answers.webApp.admin === option.id}
                    onSelect={() =>
                      update((current) => ({
                        ...current,
                        webApp: { ...current.webApp, admin: option.id },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <label className="block">
              <span className="mb-2 block font-display text-lg font-semibold text-ink dark:text-white">
                Tell us anything else you need the application to do.
              </span>
              <textarea
                className={`${contactInputClass} resize-none`}
                rows={4}
                value={answers.webApp.customRequirements}
                onChange={(event) =>
                  update((current) => ({
                    ...current,
                    webApp: { ...current.webApp, customRequirements: event.target.value },
                  }))
                }
              />
            </label>
          </div>
        );
      case 'results':
        return estimate ? (
          <EstimateResults
            result={estimate}
            onBack={goBack}
            onRestart={restart}
            onQuote={() => onQuote(buildInquiryPayload(estimate))}
          />
        ) : (
          <p className="text-sm text-ink-muted">Complete the previous steps to see your estimate.</p>
        );
      default:
        return null;
    }
  })();

  return (
    <div className="border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
      <EstimatorProgress
        current={stepIndex + 1}
        total={steps.length}
        label={STEP_LABELS[stepId]}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stepId}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {stepBody}
        </motion.div>
      </AnimatePresence>

      {stepId !== 'results' ? (
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {stepIndex > 0 ? (
            <Button variant="ghost" onClick={goBack}>
              Back
            </Button>
          ) : (
            <span className="hidden sm:block" />
          )}
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            {error ? (
              <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <Button onClick={goNext} className="sm:min-w-[8rem]">
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
