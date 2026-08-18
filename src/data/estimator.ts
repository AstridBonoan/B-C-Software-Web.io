/** Centralized cost-estimator configuration. Update prices here, not in UI components. */

export const ESTIMATOR_COPY = {
  eyebrow: 'Cost Estimator',
  title: 'Estimate Your Project',
  description:
    "Tell us what you're looking to build and get a rough estimate of your project's investment.",
  positioning: 'You have the idea. We build it for you.',
  customBuilt:
    'Every B&C project is custom-built around your needs. This estimator provides a starting estimate based on the features and functionality you select.',
  resultsHeading: 'Your Estimated Project Cost',
  customQuoteHeading: 'Custom Quote Required',
  estimateNote:
    'Your estimate is based on the features selected. Final pricing may change if project requirements change or additional functionality is requested.',
  customQuoteBody:
    "Your project requires functionality beyond our standard packages. We'd like to learn more about what you're building so we can provide an accurate custom quote.",
  customQuoteWebsite:
    "Your project includes functionality beyond our standard website packages. We'll review your requirements and provide a custom quote.",
  pricedCta: 'Get Your Official Quote',
  customQuoteCta: "Let's Discuss Your Project",
} as const;

export const PROJECT_TYPES = [
  {
    id: 'website',
    title: 'Website',
    description:
      'A professional website for your business, personal brand, portfolio, services, or organization.',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Website',
    description: 'An online store for selling products and accepting payments.',
  },
  {
    id: 'web-tool',
    title: 'Custom Web Tool',
    description:
      'A focused application designed to solve a specific business problem or automate a particular process.',
  },
  {
    id: 'web-app',
    title: 'Custom Web Application',
    description:
      'A larger custom software system with multiple features, users, workflows, or business processes.',
  },
] as const;

export type ProjectTypeId = (typeof PROJECT_TYPES)[number]['id'];

export const WEBSITE_PAGE_OPTIONS = [
  { id: '1-3', label: '1–3 pages', packageId: 'basic' },
  { id: '3-5', label: '3–5 pages', packageId: 'standard' },
  { id: '6-8', label: '6–8 pages', packageId: 'advanced' },
  { id: '9+', label: '9+ pages', packageId: 'custom' },
] as const;

export type WebsitePageId = (typeof WEBSITE_PAGE_OPTIONS)[number]['id'];
export type WebsitePackageId = 'basic' | 'standard' | 'advanced' | 'custom';

export const WEBSITE_FEATURES = [
  { id: 'contact-form', label: 'Contact form' },
  { id: 'lead-forms', label: 'Lead generation forms' },
  { id: 'application-forms', label: 'Application forms' },
  { id: 'advanced-intake', label: 'Advanced intake forms' },
  { id: 'quote-forms', label: 'Quote/estimate forms' },
  { id: 'email-automation', label: 'Email automation' },
  { id: 'stripe', label: 'Stripe/payment functionality' },
  { id: 'booking', label: 'Appointment/booking functionality' },
  { id: 'integrations', label: 'Third-party integrations' },
  { id: 'cms', label: 'CMS/content management' },
  { id: 'other', label: 'Other custom functionality' },
] as const;

export type WebsiteFeatureId = (typeof WEBSITE_FEATURES)[number]['id'];

export const ECOM_CATALOG_OPTIONS = [
  { id: '1-25', label: '1–25 products' },
  { id: '26-100', label: '26–100 products' },
  { id: '101-500', label: '101–500 products' },
  { id: '500+', label: '500+ products' },
] as const;

export const ECOM_VARIATION_OPTIONS = [
  { id: 'simple', label: 'None / simple variations' },
  { id: 'multiple', label: 'Multiple variations' },
  { id: 'complex', label: 'Complex product configuration' },
] as const;

export const ECOM_SHIPPING_OPTIONS = [
  { id: 'basic', label: 'Basic shipping' },
  { id: 'advanced', label: 'Advanced shipping rules' },
  { id: 'custom', label: 'Custom shipping logic' },
] as const;

export const ECOM_INVENTORY_OPTIONS = [
  { id: 'basic', label: 'Basic inventory' },
  { id: 'advanced', label: 'Advanced inventory' },
  { id: 'complex', label: 'Complex inventory requirements' },
] as const;

export const ECOM_INTEGRATION_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'crm', label: 'CRM' },
  { id: 'accounting', label: 'Accounting' },
  { id: 'api', label: 'External API' },
  { id: 'other', label: 'Other' },
] as const;

export const TOOL_FEATURES = [
  { id: 'data-collection', label: 'Data collection', tier: 'basic', points: 1 },
  { id: 'calculations', label: 'Calculations', tier: 'basic', points: 1 },
  { id: 'automated-calculations', label: 'Automated calculations', tier: 'standard', points: 2 },
  { id: 'payment', label: 'Payment processing', tier: 'standard', points: 2 },
  { id: 'booking', label: 'Booking/calendar', tier: 'standard', points: 2 },
  { id: 'email', label: 'Email notifications', tier: 'basic', points: 1 },
  { id: 'sms', label: 'SMS notifications', tier: 'advanced', points: 2 },
  { id: 'user-accounts', label: 'User accounts', tier: 'advanced', points: 3 },
  { id: 'customer-dashboard', label: 'Customer dashboard', tier: 'advanced', points: 2 },
  { id: 'admin-dashboard', label: 'Admin dashboard', tier: 'advanced', points: 2 },
  { id: 'database', label: 'Database/data storage', tier: 'standard', points: 2 },
  { id: 'api', label: 'External API integrations', tier: 'advanced', points: 3 },
  { id: 'process-automation', label: 'Business process automation', tier: 'standard', points: 2 },
  { id: 'multiple-workflows', label: 'Multiple workflows', tier: 'advanced', points: 3 },
  { id: 'other', label: 'Other custom functionality', tier: 'custom', points: 3 },
] as const;

export type ToolFeatureId = (typeof TOOL_FEATURES)[number]['id'];

export const APP_USER_TYPE_OPTIONS = [
  { id: 'one', label: 'One user type' },
  { id: 'two', label: '2 user types' },
  { id: 'three-plus', label: '3+ user types' },
] as const;

export const APP_AUTH_OPTIONS = [
  { id: 'none', label: 'No login' },
  { id: 'basic', label: 'Basic login' },
  { id: 'role', label: 'Role-based authentication' },
  { id: 'advanced', label: 'Advanced permissions' },
] as const;

export const APP_DASHBOARD_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'user', label: 'User dashboard' },
  { id: 'admin', label: 'Admin dashboard' },
  { id: 'multiple', label: 'Multiple dashboards' },
] as const;

export const APP_WORKFLOW_OPTIONS = [
  { id: 'simple', label: 'Simple workflow' },
  { id: 'multiple', label: 'Multiple workflows' },
  { id: 'complex', label: 'Complex business processes' },
] as const;

export const APP_INTEGRATION_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'payment', label: 'Payment provider' },
  { id: 'calendar', label: 'Calendar/email' },
  { id: 'crm', label: 'CRM' },
  { id: 'accounting', label: 'Accounting' },
  { id: 'api', label: 'External APIs' },
  { id: 'multiple', label: 'Multiple integrations' },
] as const;

export const APP_AUTOMATION_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'basic', label: 'Basic automation' },
  { id: 'multiple', label: 'Multiple automated workflows' },
  { id: 'advanced', label: 'Advanced automation' },
] as const;

export const APP_ADMIN_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'basic', label: 'Basic admin panel' },
  { id: 'advanced', label: 'Advanced administration' },
] as const;

export type AddonPrice = {
  amount: number;
  customQuote?: boolean;
};

export const ESTIMATOR_PRICING = {
  website: {
    packages: {
      basic: { name: 'Basic', price: 750, includedFeatures: ['contact-form'] as WebsiteFeatureId[] },
      standard: {
        name: 'Standard',
        price: 1250,
        includedFeatures: ['contact-form', 'lead-forms', 'application-forms'] as WebsiteFeatureId[],
      },
      advanced: {
        name: 'Advanced',
        price: 2000,
        includedFeatures: [
          'contact-form',
          'lead-forms',
          'application-forms',
          'advanced-intake',
          'quote-forms',
          'email-automation',
          'stripe',
          'integrations',
        ] as WebsiteFeatureId[],
      },
    },
    addons: {
      'contact-form': { amount: 0 },
      'lead-forms': { amount: 250 },
      'application-forms': { amount: 250 },
      'advanced-intake': { amount: 300 },
      'quote-forms': { amount: 300 },
      'email-automation': { amount: 300 },
      stripe: { amount: 300 },
      booking: { amount: 400 },
      integrations: { amount: 400 },
      cms: { amount: 400 },
      other: { amount: 0, customQuote: true },
    } satisfies Record<WebsiteFeatureId, AddonPrice>,
  },
  ecommerce: {
    base: 2500,
    packageName: 'Custom E-Commerce Website',
    addons: {
      customerAccounts: { amount: 400 },
      coupons: { amount: 250 },
      shipping: {
        basic: { amount: 0 },
        advanced: { amount: 400 },
        custom: { amount: 0, customQuote: true },
      } satisfies Record<(typeof ECOM_SHIPPING_OPTIONS)[number]['id'], AddonPrice>,
      inventory: {
        basic: { amount: 0 },
        advanced: { amount: 400 },
        complex: { amount: 0, customQuote: true },
      } satisfies Record<(typeof ECOM_INVENTORY_OPTIONS)[number]['id'], AddonPrice>,
      variations: {
        simple: { amount: 0 },
        multiple: { amount: 0 },
        complex: { amount: 0, customQuote: true },
      } satisfies Record<(typeof ECOM_VARIATION_OPTIONS)[number]['id'], AddonPrice>,
      integrations: {
        none: { amount: 0 },
        crm: { amount: 400 },
        accounting: { amount: 400 },
        api: { amount: 400 },
        other: { amount: 400 },
      } satisfies Record<(typeof ECOM_INTEGRATION_OPTIONS)[number]['id'], AddonPrice>,
    },
    multiIntegrationCustomCount: 2,
    customFunctionality: { amount: 0, customQuote: true } satisfies AddonPrice,
  },
  webTool: {
    basic: { name: 'Basic Custom Web Tool', price: 1500 },
    standard: { name: 'Standard Custom Web Tool', price: 2500 },
    advanced: { name: 'Advanced Custom Web Tool', price: 4000 },
  },
  webApp: {
    startingPrice: 5000,
    packageName: 'Custom Web Application',
    customQuoteIf: {
      userTypes: ['three-plus'],
      authentication: ['role', 'advanced'],
      dashboards: ['multiple'],
      workflows: ['multiple', 'complex'],
      automation: ['multiple', 'advanced'],
      admin: ['advanced'],
      integrationIds: ['multiple'],
      minExtraIntegrations: 2,
    },
  },
  hosting: {
    website: { amount: 25, label: 'Website Hosting', display: '$25/month' },
    application: {
      amount: 50,
      label: 'Application Hosting',
      display: 'Starting at $50/month',
    },
  },
} as const;

export interface EstimatorAnswers {
  projectType: ProjectTypeId | null;
  website: {
    pageCount: WebsitePageId | null;
    features: WebsiteFeatureId[];
    otherDescription: string;
  };
  ecommerce: {
    catalogSize: (typeof ECOM_CATALOG_OPTIONS)[number]['id'] | null;
    variations: (typeof ECOM_VARIATION_OPTIONS)[number]['id'] | null;
    customerAccounts: boolean | null;
    coupons: boolean | null;
    shipping: (typeof ECOM_SHIPPING_OPTIONS)[number]['id'] | null;
    inventory: (typeof ECOM_INVENTORY_OPTIONS)[number]['id'] | null;
    integrations: Array<(typeof ECOM_INTEGRATION_OPTIONS)[number]['id']>;
    needsCustom: boolean;
    customDescription: string;
  };
  webTool: {
    features: ToolFeatureId[];
    otherDescription: string;
  };
  webApp: {
    userTypes: (typeof APP_USER_TYPE_OPTIONS)[number]['id'] | null;
    authentication: (typeof APP_AUTH_OPTIONS)[number]['id'] | null;
    storesData: boolean | null;
    dashboards: (typeof APP_DASHBOARD_OPTIONS)[number]['id'] | null;
    workflows: (typeof APP_WORKFLOW_OPTIONS)[number]['id'] | null;
    integrations: Array<(typeof APP_INTEGRATION_OPTIONS)[number]['id']>;
    automation: (typeof APP_AUTOMATION_OPTIONS)[number]['id'] | null;
    admin: (typeof APP_ADMIN_OPTIONS)[number]['id'] | null;
    customRequirements: string;
  };
}

export function createInitialAnswers(): EstimatorAnswers {
  return {
    projectType: null,
    website: { pageCount: null, features: [], otherDescription: '' },
    ecommerce: {
      catalogSize: null,
      variations: null,
      customerAccounts: null,
      coupons: null,
      shipping: null,
      inventory: null,
      integrations: [],
      needsCustom: false,
      customDescription: '',
    },
    webTool: { features: [], otherDescription: '' },
    webApp: {
      userTypes: null,
      authentication: null,
      storesData: null,
      dashboards: null,
      workflows: null,
      integrations: [],
      automation: null,
      admin: null,
      customRequirements: '',
    },
  };
}

export function getWebsitePackageId(pageCount: WebsitePageId): WebsitePackageId {
  const option = WEBSITE_PAGE_OPTIONS.find((item) => item.id === pageCount);
  return option?.packageId ?? 'custom';
}

export function getIncludedWebsiteFeatures(pageCount: WebsitePageId | null): WebsiteFeatureId[] {
  if (!pageCount) return [];
  const packageId = getWebsitePackageId(pageCount);
  if (packageId === 'custom') {
    return [...ESTIMATOR_PRICING.website.packages.advanced.includedFeatures];
  }
  return [...ESTIMATOR_PRICING.website.packages[packageId].includedFeatures];
}
