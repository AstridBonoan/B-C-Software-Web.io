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
  ESTIMATOR_COPY,
  ESTIMATOR_PRICING,
  PROJECT_TYPES,
  TOOL_FEATURES,
  WEBSITE_FEATURES,
  WEBSITE_PAGE_OPTIONS,
  getIncludedWebsiteFeatures,
  getWebsitePackageId,
  type EstimatorAnswers,
  type PriceAdjustment,
  type ProjectTypeId,
} from '../data/estimator';

export interface EstimateResult {
  projectType: ProjectTypeId;
  projectTypeLabel: string;
  packageLabel: string;
  selectedFeatures: string[];
  customNotes: string[];
  priceKind: 'range' | 'starting' | 'custom';
  low: number | null;
  high: number | null;
  displayPrice: string;
  customQuote: boolean;
  customQuoteNote: string | null;
  supportingPrice: string | null;
  hostingLabel: string;
  hostingDisplay: string;
}

function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatEstimatePrice(low: number | null, high: number | null, starting = false): string {
  if (low == null) return 'Custom quote required';
  if (high == null || high <= low) {
    return starting ? `Starting at ${formatUsd(low)}` : formatUsd(low);
  }
  return `${formatUsd(low)}–${formatUsd(high)}`;
}

function applyAdjustment(
  totals: { min: number; max: number; customQuote: boolean },
  adjustment: PriceAdjustment | undefined,
) {
  if (!adjustment) return;
  totals.min += adjustment.min;
  totals.max += adjustment.max;
  if (adjustment.customQuote) totals.customQuote = true;
}

function labelOf<T extends { id: string; label: string }>(options: readonly T[], id: string | null): string | null {
  if (!id) return null;
  return options.find((option) => option.id === id)?.label ?? null;
}

function toggleExclusiveNone<T extends string>(current: T[], id: T, noneId: T): T[] {
  if (id === noneId) return [noneId];
  const withoutNone = current.filter((item) => item !== noneId);
  if (withoutNone.includes(id)) {
    const next = withoutNone.filter((item) => item !== id);
    return next.length === 0 ? [noneId] : next;
  }
  return [...withoutNone, id];
}

export function toggleExclusiveNoneSelection<T extends string>(current: T[], id: T, noneId: T): T[] {
  return toggleExclusiveNone(current, id, noneId);
}

function estimateWebsite(answers: EstimatorAnswers): EstimateResult {
  const pageCount = answers.website.pageCount ?? '1-3';
  const packageId = getWebsitePackageId(pageCount);
  const included = getIncludedWebsiteFeatures(pageCount);
  const extras = answers.website.features.filter((id) => !included.includes(id));
  const selectedFeatures: string[] = [];

  const pageLabel = labelOf(WEBSITE_PAGE_OPTIONS, pageCount);
  if (pageLabel) selectedFeatures.push(pageLabel);

  for (const feature of WEBSITE_FEATURES) {
    if (included.includes(feature.id)) {
      selectedFeatures.push(`${feature.label} (included)`);
    } else if (extras.includes(feature.id)) {
      selectedFeatures.push(feature.label);
    }
  }

  const customNotes: string[] = [];
  if (answers.website.otherDescription.trim()) {
    customNotes.push(answers.website.otherDescription.trim());
  }

  const totals = { min: 0, max: 0, customQuote: packageId === 'custom' };

  if (packageId === 'custom') {
    totals.min = ESTIMATOR_PRICING.website.packages.advanced.price;
    totals.max = ESTIMATOR_PRICING.website.packages.advanced.price;
  } else {
    const pkg = ESTIMATOR_PRICING.website.packages[packageId];
    totals.min = pkg.price;
    totals.max = pkg.price;
  }

  for (const featureId of extras) {
    applyAdjustment(totals, ESTIMATOR_PRICING.website.featureAdjustments[featureId]);
  }

  if (extras.length >= ESTIMATOR_PRICING.website.customQuotePaidAddonCount) {
    totals.customQuote = true;
  }

  if (extras.length === 0 && packageId !== 'custom') {
    totals.min += ESTIMATOR_PRICING.website.cleanPackagePadding.min;
    totals.max += ESTIMATOR_PRICING.website.cleanPackagePadding.max;
  }

  const packageLabel =
    packageId === 'custom'
      ? 'Custom Website'
      : `${ESTIMATOR_PRICING.website.packages[packageId].name} Website`;

  return {
    projectType: 'website',
    projectTypeLabel: 'Website',
    packageLabel,
    selectedFeatures,
    customNotes,
    priceKind: totals.customQuote ? 'custom' : 'range',
    low: totals.min,
    high: totals.max,
    displayPrice: totals.customQuote && packageId === 'custom'
      ? 'Custom quote required'
      : formatEstimatePrice(totals.min, totals.max),
    customQuote: totals.customQuote,
    customQuoteNote: totals.customQuote ? ESTIMATOR_COPY.customQuoteShort : null,
    supportingPrice: packageId === 'custom' ? `Starting at ${formatUsd(totals.min)}` : null,
    hostingLabel: ESTIMATOR_PRICING.hosting.website.label,
    hostingDisplay: ESTIMATOR_PRICING.hosting.website.display,
  };
}

function estimateEcommerce(answers: EstimatorAnswers): EstimateResult {
  const ecom = answers.ecommerce;
  const totals = {
    min: ESTIMATOR_PRICING.ecommerce.base,
    max: ESTIMATOR_PRICING.ecommerce.base,
    customQuote: false,
  };

  const selectedFeatures: string[] = ['Custom store baseline'];
  const catalogLabel = labelOf(ECOM_CATALOG_OPTIONS, ecom.catalogSize);
  const variationLabel = labelOf(ECOM_VARIATION_OPTIONS, ecom.variations);
  const shippingLabel = labelOf(ECOM_SHIPPING_OPTIONS, ecom.shipping);
  const inventoryLabel = labelOf(ECOM_INVENTORY_OPTIONS, ecom.inventory);

  if (catalogLabel) selectedFeatures.push(catalogLabel);
  if (variationLabel) selectedFeatures.push(variationLabel);
  if (ecom.customerAccounts) selectedFeatures.push('Customer accounts');
  if (ecom.coupons) selectedFeatures.push('Coupons/discounts');
  if (shippingLabel) selectedFeatures.push(shippingLabel);
  if (inventoryLabel) selectedFeatures.push(inventoryLabel);

  if (ecom.catalogSize) applyAdjustment(totals, ESTIMATOR_PRICING.ecommerce.catalog[ecom.catalogSize]);
  if (ecom.variations) applyAdjustment(totals, ESTIMATOR_PRICING.ecommerce.variations[ecom.variations]);
  if (ecom.customerAccounts) applyAdjustment(totals, ESTIMATOR_PRICING.ecommerce.customerAccounts);
  if (ecom.coupons) applyAdjustment(totals, ESTIMATOR_PRICING.ecommerce.coupons);
  if (ecom.shipping) applyAdjustment(totals, ESTIMATOR_PRICING.ecommerce.shipping[ecom.shipping]);
  if (ecom.inventory) applyAdjustment(totals, ESTIMATOR_PRICING.ecommerce.inventory[ecom.inventory]);

  const extraIntegrations = ecom.integrations.filter((id) => id !== 'none');
  if (extraIntegrations.length === 0) {
    selectedFeatures.push('No additional integrations');
  } else {
    for (const id of extraIntegrations) {
      const option = ECOM_INTEGRATION_OPTIONS.find((item) => item.id === id);
      if (option) selectedFeatures.push(`${option.label} integration`);
      applyAdjustment(totals, ESTIMATOR_PRICING.ecommerce.integrations[id]);
    }
    if (extraIntegrations.length >= ESTIMATOR_PRICING.ecommerce.multiIntegrationCustomCount) {
      totals.customQuote = true;
    }
  }

  if (ecom.needsCustom) {
    selectedFeatures.push('Additional custom functionality');
    applyAdjustment(totals, ESTIMATOR_PRICING.ecommerce.customFunctionality);
  }

  const customNotes: string[] = [];
  if (ecom.customDescription.trim()) customNotes.push(ecom.customDescription.trim());

  const hasComplexity =
    totals.min > ESTIMATOR_PRICING.ecommerce.base || totals.max > ESTIMATOR_PRICING.ecommerce.base;
  if (!hasComplexity) {
    totals.max += ESTIMATOR_PRICING.ecommerce.cleanPadding.max;
  }

  return {
    projectType: 'ecommerce',
    projectTypeLabel: 'E-Commerce Website',
    packageLabel: 'E-Commerce Website',
    selectedFeatures,
    customNotes,
    priceKind: totals.customQuote ? 'custom' : 'starting',
    low: totals.min,
    high: totals.max,
    displayPrice: formatEstimatePrice(totals.min, totals.max, true),
    customQuote: totals.customQuote,
    customQuoteNote: totals.customQuote ? ESTIMATOR_COPY.customQuoteShort : null,
    supportingPrice: null,
    hostingLabel: ESTIMATOR_PRICING.hosting.website.label,
    hostingDisplay: ESTIMATOR_PRICING.hosting.website.display,
  };
}

function estimateWebTool(answers: EstimatorAnswers): EstimateResult {
  const selected = TOOL_FEATURES.filter((feature) => answers.webTool.features.includes(feature.id));
  const points = selected.reduce((sum, feature) => sum + feature.points, 0);
  const advancedCount = selected.filter(
    (feature) => feature.tier === 'advanced' || feature.tier === 'custom',
  ).length;
  const hasCustomFeature = selected.some((feature) => feature.tier === 'custom');
  const hasAdvanced = selected.some((feature) => feature.tier === 'advanced');
  const hasStandard = selected.some((feature) => feature.tier === 'standard');

  let tier: 'basic' | 'standard' | 'advanced' | 'custom' = 'basic';
  if (hasCustomFeature || advancedCount >= 3 || points > 12) {
    tier = 'custom';
  } else if (hasAdvanced || points > 7) {
    tier = 'advanced';
  } else if (hasStandard || points > 3) {
    tier = 'standard';
  }

  const pricing = ESTIMATOR_PRICING.webTool[tier];
  const selectedFeatures = selected.map((feature) => feature.label);
  const customNotes: string[] = [];
  if (answers.webTool.otherDescription.trim()) {
    customNotes.push(answers.webTool.otherDescription.trim());
  }

  const packageNames = {
    basic: 'Basic Custom Web Tool',
    standard: 'Standard Custom Web Tool',
    advanced: 'Advanced Custom Web Tool',
    custom: 'Custom Web Tool',
  } as const;

  const starting = tier === 'advanced' || tier === 'custom';

  return {
    projectType: 'web-tool',
    projectTypeLabel: 'Custom Web Tool',
    packageLabel: packageNames[tier],
    selectedFeatures: selectedFeatures.length ? selectedFeatures : ['Focused tool functionality'],
    customNotes,
    priceKind: tier === 'custom' ? 'custom' : starting ? 'starting' : 'range',
    low: pricing.price,
    high: pricing.rangeMax,
    displayPrice: formatEstimatePrice(pricing.price, pricing.rangeMax, starting),
    customQuote: tier === 'custom',
    customQuoteNote: tier === 'custom' ? ESTIMATOR_COPY.customQuoteShort : null,
    supportingPrice: null,
    hostingLabel: ESTIMATOR_PRICING.hosting.application.label,
    hostingDisplay: ESTIMATOR_PRICING.hosting.application.display,
  };
}

function estimateWebApp(answers: EstimatorAnswers): EstimateResult {
  const app = answers.webApp;
  const scores = ESTIMATOR_PRICING.webApp.scores;
  let score = 0;

  if (app.userTypes) score += scores.userTypes[app.userTypes];
  if (app.authentication) score += scores.authentication[app.authentication];
  if (app.storesData === true) score += scores.storesData.yes;
  if (app.dashboards) score += scores.dashboards[app.dashboards];
  if (app.workflows) score += scores.workflows[app.workflows];
  if (app.automation) score += scores.automation[app.automation];
  if (app.admin) score += scores.admin[app.admin];
  if (app.customRequirements.trim().length > 20) score += 1;

  const integrations = app.integrations.filter(Boolean);
  if (integrations.includes('multiple') || integrations.filter((id) => id !== 'none').length >= 2) {
    score += 2;
  } else {
    for (const id of integrations) {
      score += ESTIMATOR_PRICING.webApp.integrationScore[id];
    }
  }

  const band =
    ESTIMATOR_PRICING.webApp.bands.find((item) => score <= item.maxScore) ??
    ESTIMATOR_PRICING.webApp.bands[ESTIMATOR_PRICING.webApp.bands.length - 1];

  const selectedFeatures: string[] = [];
  const pushLabel = (label: string | null) => {
    if (label) selectedFeatures.push(label);
  };

  pushLabel(labelOf(APP_USER_TYPE_OPTIONS, app.userTypes));
  pushLabel(labelOf(APP_AUTH_OPTIONS, app.authentication));
  if (app.storesData === true) selectedFeatures.push('Stores business/customer data');
  if (app.storesData === false) selectedFeatures.push('No persistent business data');
  const dashboardLabel = labelOf(APP_DASHBOARD_OPTIONS, app.dashboards);
  if (dashboardLabel) selectedFeatures.push(`Dashboards: ${dashboardLabel}`);
  pushLabel(labelOf(APP_WORKFLOW_OPTIONS, app.workflows));

  const extraIntegrations = integrations.filter((id) => id !== 'none');
  if (extraIntegrations.length === 0) {
    selectedFeatures.push('No additional integrations');
  } else {
    for (const id of extraIntegrations) {
      const option = APP_INTEGRATION_OPTIONS.find((item) => item.id === id);
      if (option) selectedFeatures.push(option.label);
    }
  }

  const automationLabel = labelOf(APP_AUTOMATION_OPTIONS, app.automation);
  if (automationLabel) {
    selectedFeatures.push(automationLabel === 'None' ? 'No automation' : automationLabel);
  }
  const adminLabel = labelOf(APP_ADMIN_OPTIONS, app.admin);
  if (adminLabel && adminLabel !== 'None') selectedFeatures.push(adminLabel);

  const customNotes: string[] = [];
  if (app.customRequirements.trim()) customNotes.push(app.customRequirements.trim());

  const customQuote = true;
  const displayPrice = formatEstimatePrice(band.low, band.high, band.high == null);

  return {
    projectType: 'web-app',
    projectTypeLabel: 'Custom Web Application',
    packageLabel: 'Custom Web Application',
    selectedFeatures,
    customNotes,
    priceKind: band.high == null ? 'custom' : 'range',
    low: band.low,
    high: band.high,
    displayPrice,
    customQuote,
    customQuoteNote: ESTIMATOR_COPY.customQuoteApplication,
    supportingPrice: null,
    hostingLabel: ESTIMATOR_PRICING.hosting.application.label,
    hostingDisplay: ESTIMATOR_PRICING.hosting.application.display,
  };
}

export function calculateEstimate(answers: EstimatorAnswers): EstimateResult | null {
  if (!answers.projectType) return null;

  switch (answers.projectType) {
    case 'website':
      return estimateWebsite(answers);
    case 'ecommerce':
      return estimateEcommerce(answers);
    case 'web-tool':
      return estimateWebTool(answers);
    case 'web-app':
      return estimateWebApp(answers);
    default:
      return null;
  }
}

export function buildInquiryPayload(result: EstimateResult): { subject: string; message: string } {
  const project = PROJECT_TYPES.find((item) => item.id === result.projectType);
  const subject = `Cost estimator: ${result.packageLabel}`;
  const lines = [
    `I'd like an official quote for a ${result.packageLabel}.`,
    '',
    `Estimated investment: ${result.displayPrice}`,
    '',
    'Selected details:',
    ...result.selectedFeatures.map((item) => `• ${item}`),
  ];

  if (result.customNotes.length) {
    lines.push('', 'Additional notes:', ...result.customNotes.map((note) => `• ${note}`));
  }

  lines.push(
    '',
    `Hosting: ${result.hostingDisplay}`,
    '',
    'This came from the B&C Cost Estimator. It is an estimate, not a final quote.',
  );

  if (project) {
    lines.splice(1, 0, `Project type: ${project.title}`);
  }

  return { subject, message: lines.join('\n') };
}
