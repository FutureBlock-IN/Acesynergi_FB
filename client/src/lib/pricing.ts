/**
 * Pricing utilities for fetching course prices from Excel-based API
 */

import { getHardcodedCoursePricing } from "@/lib/hardcodedCoursePricing";

// Map course IDs to course names (as stored in Excel)
// Note: Excel has ® symbol for some courses, but matching handles this automatically
export const courseNameMap: Record<string, string> = {
  "pmp": "PMP Certification Training",
  "pmi-acp": "PMI-ACP® Certification Training", // Excel has ® symbol
  "capm": "CAPM® Certification Training", // Excel has ® symbol
  "pmipba": "PMI PBA Certification Training",
  "cbap": "CBAP Certification Training",
  "ccba": "CCBA Certification Training",
  "ecba": "ECBA Certification Training",
};

export interface CoursePricing {
  courseName: string;
  country: string;
  amount: number;
  countryCurrency: string;
  // Country-specific tax fields
  sgst?: number;
  cgst?: number;
  salesTax?: number;
  vat?: number;
  tax?: number;
  serviceTax?: number;
  countryTax?: number; // Legacy field
  total: number;
  // Tax percentages
  sgstPercent?: number;
  cgstPercent?: number;
  salesTaxPercent?: number;
  vatPercent?: number;
  taxPercent?: number;
  serviceTaxPercent?: number;
}

export interface TaxBreakdown {
  label: string;
  amount: number;
  percent?: number;
}

/**
 * Get tax breakdown for a pricing record based on country
 */
export function getTaxBreakdown(pricing: CoursePricing | null): TaxBreakdown[] {
  if (!pricing) return [];

  const taxes: TaxBreakdown[] = [];

  switch (pricing.country) {
    case "India":
      if (pricing.sgst !== undefined && pricing.sgst > 0) {
        taxes.push({
          label: `SGST${pricing.sgstPercent ? ` (${pricing.sgstPercent}%)` : ""}`,
          amount: pricing.sgst,
          percent: pricing.sgstPercent,
        });
      }
      if (pricing.cgst !== undefined && pricing.cgst > 0) {
        taxes.push({
          label: `CGST${pricing.cgstPercent ? ` (${pricing.cgstPercent}%)` : ""}`,
          amount: pricing.cgst,
          percent: pricing.cgstPercent,
        });
      }
      break;

    case "USA":
      if (pricing.salesTax !== undefined && pricing.salesTax > 0) {
        taxes.push({
          label: `Sales Tax${pricing.salesTaxPercent ? ` (${pricing.salesTaxPercent}%)` : ""}`,
          amount: pricing.salesTax,
          percent: pricing.salesTaxPercent,
        });
      }
      break;

    case "UK":
      if (pricing.vat !== undefined && pricing.vat > 0) {
        taxes.push({
          label: `VAT${pricing.vatPercent ? ` (${pricing.vatPercent}%)` : ""}`,
          amount: pricing.vat,
          percent: pricing.vatPercent,
        });
      }
      break;

    case "Canada":
    case "Singapore":
    case "UAE":
      if (pricing.tax !== undefined && pricing.tax > 0) {
        taxes.push({
          label: `Tax${pricing.taxPercent ? ` (${pricing.taxPercent}%)` : ""}`,
          amount: pricing.tax,
          percent: pricing.taxPercent,
        });
      }
      if (pricing.serviceTax !== undefined && pricing.serviceTax > 0) {
        taxes.push({
          label: `Service Tax${pricing.serviceTaxPercent ? ` (${pricing.serviceTaxPercent}%)` : ""}`,
          amount: pricing.serviceTax,
          percent: pricing.serviceTaxPercent,
        });
      }
      break;

    default:
      // Fallback to countryTax if available
      if (pricing.countryTax !== undefined && pricing.countryTax > 0) {
        taxes.push({
          label: "Tax",
          amount: pricing.countryTax,
        });
      }
  }

  return taxes;
}

/**
 * Get course name from course ID
 */
export function getCourseName(courseId: string): string {
  return courseNameMap[courseId] || courseId;
}

/**
 * Fetch pricing for a specific course and country
 */
export async function fetchCoursePricing(
  courseId: string,
  country: string
): Promise<CoursePricing | null> {
  // IMPORTANT: Pricing is fully hardcoded on the client (no API fetch).
  // We keep this async signature to avoid touching all call sites.
  const hardcoded = getHardcodedCoursePricing(courseId, country);
  if (!hardcoded) return null;

  // For backward compatibility with existing UI (courses list, schedule cards, cart tax breakdown),
  // we map the new pricing to the old shape and treat "amount/total" as the Virtual Learning price.
  return {
    courseName: hardcoded.courseName,
    country: hardcoded.country,
    amount: hardcoded.virtualLearningPrice,
    countryCurrency: hardcoded.currency,
    total: hardcoded.virtualLearningPrice,
    // Taxes not modeled for this hardcoded table
    sgst: 0,
    cgst: 0,
    salesTax: 0,
    vat: 0,
    tax: 0,
    serviceTax: 0,
    countryTax: 0,
  };
}

/**
 * Fetch all pricing for a specific course (all countries)
 */
export async function fetchCoursePricingAllCountries(
  courseId: string
): Promise<CoursePricing[]> {
  const countries = ["India", "USA", "UK"];
  const results: CoursePricing[] = [];
  for (const c of countries) {
    const p = await fetchCoursePricing(courseId, c);
    if (p) results.push(p);
  }
  return results;
}

/**
 * Get formatted price for display
 * Returns the total price formatted with currency symbol
 */
export function getFormattedPrice(pricing: CoursePricing | null): string {
  if (!pricing) {
    return "Price not available";
  }

  // Use Intl.NumberFormat for proper currency formatting
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: pricing.countryCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: pricing.countryCurrency === "JPY" ? 0 : 2,
    }).format(pricing.total);
  } catch {
    // Fallback formatting
    return `${pricing.countryCurrency} ${pricing.total.toLocaleString()}`;
  }
}

/**
 * Get base price (without tax) for display
 */
export function getFormattedBasePrice(pricing: CoursePricing | null): string {
  if (!pricing) {
    return "Price not available";
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: pricing.countryCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: pricing.countryCurrency === "JPY" ? 0 : 2,
    }).format(pricing.amount);
  } catch {
    return `${pricing.countryCurrency} ${pricing.amount.toLocaleString()}`;
  }
}

