/** Centralized cost-estimator configuration. Update prices here, not in UI components. */

export const ESTIMATOR_COPY = {
  eyebrow: 'Cost Estimator',
  title: 'Estimate Your Project',
  description:
    "Tell us what you're looking to build and get a rough estimate of your project's investment.",
  positioning: 'You have the idea. We build it for you.',
  customBuilt:
    'Every B&C project is custom-built around your needs. This estimator provides a starting estimate based on the features and functionality you select.',
  resultsHeading: 'Your Estimated Investment',
  disclaimerTitle: 'This is an estimate, not a final quote.',
  disclaimerBody:
    'Your final project price will be determined after we review your requirements and confirm the project scope.',
  estimateNote:
    'This estimate is based on the options you selected. Your final project price will be determined after we discuss your requirements and define the project scope.',
  customQuoteShort: 'Your project may require a custom quote.',
  customQuoteApplication:
    "Your project appears to require a custom development quote. We'll review your requirements with you before providing a final proposal.",
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

export type PriceAdjustment = {
  min: number;
  max: number;
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
    featureAdjustments: {
      'contact-form': { min: 150, max: 250 },
      'lead-forms': { min: 200, max: 350 },
      'application-forms': { min: 200, max: 350 },
      'advanced-intake': { min: 300, max: 500 },
      'quote-forms': { min: 250, max: 400 },
      'email-automation': { min: 250, max: 450 },
      stripe: { min: 300, max: 500 },
      booking: { min: 450, max: 850 },
      integrations: { min: 300, max: 700 },
      cms: { min: 400, max: 800 },
      other: { min: 500, max: 1200, customQuote: true },
    } satisfies Record<WebsiteFeatureId, PriceAdjustment>,
    cleanPackagePadding: { min: 0, max: 200 },
    customQuotePaidAddonCount: 3,
  },
  ecommerce: {
    base: 2500,
    catalog: {
      '1-25': { min: 0, max: 0 },
      '26-100': { min: 0, max: 300 },
      '101-500': { min: 200, max: 700 },
      '500+': { min: 400, max: 1200, customQuote: true },
    } satisfies Record<(typeof ECOM_CATALOG_OPTIONS)[number]['id'], PriceAdjustment>,
    variations: {
      simple: { min: 0, max: 0 },
      multiple: { min: 150, max: 400 },
      complex: { min: 500, max: 1200, customQuote: true },
    } satisfies Record<(typeof ECOM_VARIATION_OPTIONS)[number]['id'], PriceAdjustment>,
    customerAccounts: { min: 200, max: 400 },
    coupons: { min: 150, max: 300 },
    shipping: {
      basic: { min: 0, max: 0 },
      advanced: { min: 300, max: 650 },
      custom: { min: 700, max: 1500, customQuote: true },
    } satisfies Record<(typeof ECOM_SHIPPING_OPTIONS)[number]['id'], PriceAdjustment>,
    inventory: {
      basic: { min: 0, max: 0 },
      advanced: { min: 250, max: 550 },
      complex: { min: 800, max: 1800, customQuote: true },
    } satisfies Record<(typeof ECOM_INVENTORY_OPTIONS)[number]['id'], PriceAdjustment>,
    integrations: {
      none: { min: 0, max: 0 },
      crm: { min: 350, max: 800 },
      accounting: { min: 350, max: 800 },
      api: { min: 400, max: 1000 },
      other: { min: 300, max: 900 },
    } satisfies Record<(typeof ECOM_INTEGRATION_OPTIONS)[number]['id'], PriceAdjustment>,
    customFunctionality: { min: 500, max: 1500, customQuote: true },
    cleanPadding: { min: 0, max: 400 },
    multiIntegrationCustomCount: 2,
  },
  webTool: {
    basic: { price: 1500, rangeMax: 2000 },
    standard: { price: 2500, rangeMax: 3500 },
    advanced: { price: 4000, rangeMax: 6500 },
    custom: { price: 6000, rangeMax: 14000 },
  },
  webApp: {
    base: 5000,
    scores: {
      userTypes: { one: 0, two: 1, 'three-plus': 2 },
      authentication: { none: 0, basic: 1, role: 2, advanced: 3 },
      storesData: { no: 0, yes: 1 },
      dashboards: { none: 0, user: 1, admin: 1, multiple: 2 },
      workflows: { simple: 0, multiple: 1, complex: 3 },
      automation: { none: 0, basic: 1, multiple: 2, advanced: 3 },
      admin: { none: 0, basic: 1, advanced: 2 },
    },
    integrationScore: {
      none: 0,
      payment: 1,
      calendar: 1,
      crm: 1,
      accounting: 1,
      api: 1,
      multiple: 2,
    },
    bands: [
      { maxScore: 4, low: 5000, high: 8000, customQuote: false },
      { maxScore: 8, low: 8000, high: 14000, customQuote: true },
      { maxScore: 12, low: 12000, high: 22000, customQuote: true },
      { maxScore: Infinity, low: 18000, high: null, customQuote: true },
    ],
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
