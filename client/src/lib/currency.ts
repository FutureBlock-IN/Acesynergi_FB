// Currency utility with exchange rates and formatPrice helper
// Fallback static rates used when live API is unavailable - realistic sample rates for demo

// Country to currency code mapping
export const countryCurrencyMap: Record<string, string> = {
  India: "INR",
  USA: "USD",
  UK: "GBP",
  Germany: "EUR",
  France: "EUR",
  Australia: "AUD",
  Canada: "CAD",
  Japan: "JPY",
  Singapore: "SGD",
  UAE: "AED",
};

// Static exchange rates from USD (fallback when live API unavailable)
// These are realistic sample rates for demo purposes
// TO INTEGRATE LIVE RATES: Replace with fetch call to exchangerate-api.com or similar
export const exchangeRates: Record<string, number> = {
  USD: 1,
  INR: 83.12,    // 1 USD = 83.12 INR
  GBP: 0.79,     // 1 USD = 0.79 GBP
  EUR: 0.92,     // 1 USD = 0.92 EUR
  AUD: 1.53,     // 1 USD = 1.53 AUD
  CAD: 1.36,     // 1 USD = 1.36 CAD
  JPY: 149.50,   // 1 USD = 149.50 JPY
  SGD: 1.34,     // 1 USD = 1.34 SGD
  AED: 3.67,     // 1 USD = 3.67 AED
};

// Currency symbol and locale mapping for proper formatting
const currencyLocales: Record<string, string> = {
  USD: "en-US",
  INR: "en-IN",
  GBP: "en-GB",
  EUR: "de-DE",
  AUD: "en-AU",
  CAD: "en-CA",
  JPY: "ja-JP",
  SGD: "en-SG",
  AED: "ar-AE",
};

// Built-in country/city mapping (required fallback)
export const countryData: Record<string, string[]> = {
  India: ["Hyderabad", "Bangalore", "Mumbai"],
  USA: ["New York", "Dallas", "Chicago"],
  UK: ["London", "Manchester", "Birmingham"],
};

// Extended country data (can be expanded or replaced with API data)
export const extendedCountryData: Record<string, string[]> = {
  ...countryData,
  Germany: ["Berlin", "Munich", "Frankfurt"],
  France: ["Paris", "Lyon", "Marseille"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  Japan: ["Tokyo", "Osaka", "Kyoto"],
  Singapore: ["Singapore"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
};

/**
 * Get currency code for a given country
 * Falls back to USD if country not found
 */
export function getCurrencyCode(country: string): string {
  return countryCurrencyMap[country] || "USD";
}

/**
 * Get cities for a given country
 * Falls back to empty array if country not found
 */
export function getCitiesForCountry(country: string): string[] {
  return extendedCountryData[country] || countryData[country] || [];
}

/**
 * Get all available countries
 * Returns only the countries that are available for selection
 */
export function getAvailableCountries(): string[] {
  // Only show these 6 countries in the dropdown
  const allowedCountries = ["India", "USA", "UK", "Canada", "Singapore", "UAE"];
  return allowedCountries.filter(country => extendedCountryData[country] || countryData[country]);
}

/**
 * Format price in the target currency with proper symbol and locale
 * 
 * @param amountInUSD - Base price in USD
 * @param countryOrCurrency - Country name or currency code
 * @returns Formatted price string with currency symbol
 * 
 * TO INTEGRATE LIVE EXCHANGE RATES:
 * 1. Create an async version that fetches from exchangerate-api.com
 * 2. Cache rates for a period (e.g., 1 hour)
 * 3. Fall back to static rates on API failure
 */
export function formatPrice(amountInUSD: number, countryOrCurrency: string): string {
  // Determine currency code
  let currencyCode = countryOrCurrency;
  
  // If it's a country name, get the currency code
  if (countryCurrencyMap[countryOrCurrency]) {
    currencyCode = countryCurrencyMap[countryOrCurrency];
  }
  
  // Get exchange rate (fallback to 1 for USD)
  const rate = exchangeRates[currencyCode] || 1;
  
  // Convert amount
  const convertedAmount = amountInUSD * rate;
  
  // Get locale for formatting
  const locale = currencyLocales[currencyCode] || "en-US";
  
  // Format using Intl.NumberFormat
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: currencyCode === "JPY" ? 0 : 2,
    }).format(convertedAmount);
  } catch {
    // Fallback to USD formatting if currency code is invalid
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amountInUSD);
  }
}

/**
 * Convert price from one currency to another
 * Useful for internal calculations
 */
export function convertPrice(amount: number, fromCurrency: string, toCurrency: string): number {
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  
  // Convert to USD first, then to target currency
  const amountInUSD = amount / fromRate;
  return amountInUSD * toRate;
}
