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
  type AddonPrice,
  type EstimatorAnswers,
  type ProjectTypeId,
} from '../data/estimator';

export interface PriceLine {
  label: string;
  amount: number;
}

export interface EstimateResult {
  projectType: ProjectTypeId;
  projectTypeLabel: string;
  packageLabel: string;
  selectedFeatures: string[];
  customNotes: string[];
  priceKind: 'exact' | 'starting' | 'custom';
  total: number | null;
  displayPrice: string;
  breakdown: PriceLine[];
  customQuote: boolean;
  customQuoteNote: string | null;
  ctaLabel: string;
  hostingLabel: string;
  hostingDisplay: string;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
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

function addAddon(
  breakdown: PriceLine[],
  customQuote: { value: boolean },
  label: string,
  addon: AddonPrice | undefined,
) {
  if (!addon) return;
  if (addon.customQuote) {
    customQuote.value = true;
    return;
  }
  if (addon.amount > 0) {
    breakdown.push({ label, amount: addon.amount });
  }
}

function pricedResult(base: Omit<EstimateResult, 'displayPrice' | 'ctaLabel' | 'total' | 'customQuote'> & {
  customQuote: boolean;
  breakdown: PriceLine[];
}): EstimateResult {
  const total = base.breakdown.reduce((sum, line) => sum + line.amount, 0);

  if (base.customQuote) {
    return {
      ...base,
      priceKind: 'custom',
      total: null,
      displayPrice: ESTIMATOR_COPY.customQuoteHeading,
      breakdown: [],
      ctaLabel: ESTIMATOR_COPY.customQuoteCta,
    };
  }

  if (base.priceKind === 'starting') {
    return {
      ...base,
      total: base.breakdown[0]?.amount ?? null,
      displayPrice: `Starting at ${formatUsd(base.breakdown[0]?.amount ?? 0)}`,
      ctaLabel: ESTIMATOR_COPY.customQuoteCta,
    };
  }

  return {
    ...base,
    total,
    displayPrice: formatUsd(total),
    ctaLabel: ESTIMATOR_COPY.pricedCta,
  };
}

function estimateWebsite(answers: EstimatorAnswers): EstimateResult {
  const pageCount = answers.website.pageCount ?? '1-3';
  const packageId = getWebsitePackageId(pageCount);
  const included = getIncludedWebsiteFeatures(pageCount);
  const extras = answers.website.features.filter((id) => !included.includes(id));
  const selectedFeatures: string[] = [];
  const customQuote = { value: packageId === 'custom' };

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

  const packageLabel =
    packageId === 'custom'
      ? 'Custom Website'
      : `${ESTIMATOR_PRICING.website.packages[packageId].name} Website`;

  const breakdown: PriceLine[] = [];
  if (packageId !== 'custom') {
    breakdown.push({
      label: packageLabel,
      amount: ESTIMATOR_PRICING.website.packages[packageId].price,
    });
  }

  for (const featureId of extras) {
    const feature = WEBSITE_FEATURES.find((item) => item.id === featureId);
    addAddon(breakdown, customQuote, feature?.label ?? featureId, ESTIMATOR_PRICING.website.addons[featureId]);
  }

  return pricedResult({
    projectType: 'website',
    projectTypeLabel: 'Website',
    packageLabel,
    selectedFeatures,
    customNotes,
    priceKind: 'exact',
    breakdown,
    customQuote: customQuote.value,
    customQuoteNote: customQuote.value ? ESTIMATOR_COPY.customQuoteWebsite : null,
    hostingLabel: ESTIMATOR_PRICING.hosting.website.label,
    hostingDisplay: ESTIMATOR_PRICING.hosting.website.display,
  });
}

function estimateEcommerce(answers: EstimatorAnswers): EstimateResult {
  const ecom = answers.ecommerce;
  const customQuote = { value: false };
  const breakdown: PriceLine[] = [
    { label: ESTIMATOR_PRICING.ecommerce.packageName, amount: ESTIMATOR_PRICING.ecommerce.base },
  ];
  const selectedFeatures: string[] = [ESTIMATOR_PRICING.ecommerce.packageName];
  const addons = ESTIMATOR_PRICING.ecommerce.addons;

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

  if (ecom.variations) addAddon(breakdown, customQuote, variationLabel ?? 'Product variations', addons.variations[ecom.variations]);
  if (ecom.customerAccounts) addAddon(breakdown, customQuote, 'Customer accounts', addons.customerAccounts);
  if (ecom.coupons) addAddon(breakdown, customQuote, 'Coupons/discounts', addons.coupons);
  if (ecom.shipping) addAddon(breakdown, customQuote, shippingLabel ?? 'Shipping', addons.shipping[ecom.shipping]);
  if (ecom.inventory) addAddon(breakdown, customQuote, inventoryLabel ?? 'Inventory', addons.inventory[ecom.inventory]);

  const extraIntegrations = ecom.integrations.filter((id) => id !== 'none');
  if (extraIntegrations.length === 0) {
    selectedFeatures.push('No additional integrations');
  } else {
    for (const id of extraIntegrations) {
      const option = ECOM_INTEGRATION_OPTIONS.find((item) => item.id === id);
      const label = option ? `${option.label} integration` : id;
      selectedFeatures.push(label);
      addAddon(breakdown, customQuote, label, addons.integrations[id]);
    }
    if (extraIntegrations.length >= ESTIMATOR_PRICING.ecommerce.multiIntegrationCustomCount) {
      customQuote.value = true;
    }
  }

  if (ecom.needsCustom) {
    selectedFeatures.push('Additional custom functionality');
    addAddon(
      breakdown,
      customQuote,
      'Additional custom functionality',
      ESTIMATOR_PRICING.ecommerce.customFunctionality,
    );
  }

  const customNotes: string[] = [];
  if (ecom.customDescription.trim()) customNotes.push(ecom.customDescription.trim());

  return pricedResult({
    projectType: 'ecommerce',
    projectTypeLabel: 'E-Commerce Website',
    packageLabel: ESTIMATOR_PRICING.ecommerce.packageName,
    selectedFeatures,
    customNotes,
    priceKind: 'exact',
    breakdown,
    customQuote: customQuote.value,
    customQuoteNote: customQuote.value ? ESTIMATOR_COPY.customQuoteBody : null,
    hostingLabel: ESTIMATOR_PRICING.hosting.website.label,
    hostingDisplay: ESTIMATOR_PRICING.hosting.website.display,
  });
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

  const selectedFeatures = selected.map((feature) => feature.label);
  const customNotes: string[] = [];
  if (answers.webTool.otherDescription.trim()) {
    customNotes.push(answers.webTool.otherDescription.trim());
  }

  if (tier === 'custom') {
    return pricedResult({
      projectType: 'web-tool',
      projectTypeLabel: 'Custom Web Tool',
      packageLabel: 'Custom Web Tool',
      selectedFeatures: selectedFeatures.length ? selectedFeatures : ['Focused tool functionality'],
      customNotes,
      priceKind: 'custom',
      breakdown: [],
      customQuote: true,
      customQuoteNote: ESTIMATOR_COPY.customQuoteBody,
      hostingLabel: ESTIMATOR_PRICING.hosting.application.label,
      hostingDisplay: ESTIMATOR_PRICING.hosting.application.display,
    });
  }

  const pkg = ESTIMATOR_PRICING.webTool[tier];
  return pricedResult({
    projectType: 'web-tool',
    projectTypeLabel: 'Custom Web Tool',
    packageLabel: pkg.name,
    selectedFeatures: selectedFeatures.length ? selectedFeatures : ['Focused tool functionality'],
    customNotes,
    priceKind: 'exact',
    breakdown: [{ label: pkg.name, amount: pkg.price }],
    customQuote: false,
    customQuoteNote: null,
    hostingLabel: ESTIMATOR_PRICING.hosting.application.label,
    hostingDisplay: ESTIMATOR_PRICING.hosting.application.display,
  });
}

function estimateWebApp(answers: EstimatorAnswers): EstimateResult {
  const app = answers.webApp;
  const rules = ESTIMATOR_PRICING.webApp.customQuoteIf;
  const integrations = app.integrations.filter(Boolean);
  const extraIntegrations = integrations.filter((id) => id !== 'none');

  const exceedsScope =
    (app.userTypes !== null && (rules.userTypes as readonly string[]).includes(app.userTypes)) ||
    (app.authentication !== null && (rules.authentication as readonly string[]).includes(app.authentication)) ||
    (app.dashboards !== null && (rules.dashboards as readonly string[]).includes(app.dashboards)) ||
    (app.workflows !== null && (rules.workflows as readonly string[]).includes(app.workflows)) ||
    (app.automation !== null && (rules.automation as readonly string[]).includes(app.automation)) ||
    (app.admin !== null && (rules.admin as readonly string[]).includes(app.admin)) ||
    extraIntegrations.some((id) => (rules.integrationIds as readonly string[]).includes(id)) ||
    extraIntegrations.length >= rules.minExtraIntegrations;

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

  if (exceedsScope) {
    return pricedResult({
      projectType: 'web-app',
      projectTypeLabel: 'Custom Web Application',
      packageLabel: ESTIMATOR_PRICING.webApp.packageName,
      selectedFeatures,
      customNotes,
      priceKind: 'custom',
      breakdown: [],
      customQuote: true,
      customQuoteNote: ESTIMATOR_COPY.customQuoteBody,
      hostingLabel: ESTIMATOR_PRICING.hosting.application.label,
      hostingDisplay: ESTIMATOR_PRICING.hosting.application.display,
    });
  }

  return pricedResult({
    projectType: 'web-app',
    projectTypeLabel: 'Custom Web Application',
    packageLabel: ESTIMATOR_PRICING.webApp.packageName,
    selectedFeatures,
    customNotes,
    priceKind: 'starting',
    breakdown: [{ label: ESTIMATOR_PRICING.webApp.packageName, amount: ESTIMATOR_PRICING.webApp.startingPrice }],
    customQuote: false,
    customQuoteNote: null,
    hostingLabel: ESTIMATOR_PRICING.hosting.application.label,
    hostingDisplay: ESTIMATOR_PRICING.hosting.application.display,
  });
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
    `Estimated project cost: ${result.displayPrice}`,
  ];

  if (project) {
    lines.splice(1, 0, `Project type: ${project.title}`);
  }

  if (result.breakdown.length > 0) {
    lines.push('', 'Breakdown:');
    for (const line of result.breakdown) {
      lines.push(`• ${line.label}: ${formatUsd(line.amount)}`);
    }
    if (result.total != null) {
      lines.push(`Total: ${formatUsd(result.total)}`);
    }
  }

  lines.push('', 'Selected details:', ...result.selectedFeatures.map((item) => `• ${item}`));

  if (result.customNotes.length) {
    lines.push('', 'Additional notes:', ...result.customNotes.map((note) => `• ${note}`));
  }

  lines.push('', `Hosting: ${result.hostingDisplay}`);

  if (result.customQuote) {
    lines.push('', result.customQuoteNote ?? ESTIMATOR_COPY.customQuoteBody);
  } else {
    lines.push('', ESTIMATOR_COPY.estimateNote);
  }

  return { subject, message: lines.join('\n') };
}
