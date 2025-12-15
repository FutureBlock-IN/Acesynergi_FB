import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { log } from "./vite";

// Create require function for CommonJS modules in ES module context
const require = createRequire(import.meta.url);

// Interface for course pricing data from Excel
export interface CoursePricing {
  courseName: string;
  country: string;
  amount: number;
  countryCurrency: string;
  // Country-specific tax fields
  sgst?: number;           // India: SGST amount
  cgst?: number;           // India: CGST amount
  salesTax?: number;       // USA: Sales Tax amount
  vat?: number;            // UK: VAT amount
  tax?: number;            // Canada, Singapore, UAE: Tax amount
  serviceTax?: number;     // Canada, Singapore, UAE: Service Tax amount
  // Legacy field for backward compatibility
  countryTax?: number;
  total: number;
  // Tax percentages (for display)
  sgstPercent?: number;    // India: SGST percentage
  cgstPercent?: number;    // India: CGST percentage
  salesTaxPercent?: number; // USA: Sales Tax percentage
  vatPercent?: number;      // UK: VAT percentage
  taxPercent?: number;      // Canada, Singapore, UAE: Tax percentage
  serviceTaxPercent?: number; // Canada, Singapore, UAE: Service Tax percentage
}

// Cache for pricing data (refreshed on file change)
let pricingCache: CoursePricing[] | null = null;
let lastModified: number = 0;

/**
 * Get the path to the Excel pricing file
 */
function getPricingFilePath(): string {
  // Allow environment variable to override the path (useful for cPanel deployments)
  if (process.env.PRICING_FILE_PATH) {
    const envPath = path.resolve(process.env.PRICING_FILE_PATH);
    if (fs.existsSync(envPath)) {
      log(`✓ Found pricing file at (from env): ${envPath}`, "pricing");
      return envPath;
    } else {
      log(`⚠ Environment variable PRICING_FILE_PATH set but file not found: ${envPath}`, "pricing");
    }
  }

  // Get the server directory (where pricing.ts is located)
  const serverDir = import.meta.dirname;
  const projectRoot = path.resolve(serverDir, "..");
  
  // Try multiple possible locations (prioritize server/data where user placed it)
  const possiblePaths = [
    path.resolve(serverDir, "data", "course_pricing.xlsx"), // Relative to pricing.ts (lowercase) - MOST RELIABLE
    path.resolve(serverDir, "Data", "course_pricing.xlsx"), // Relative to pricing.ts (capitalized)
    path.resolve(projectRoot, "server", "data", "course_pricing.xlsx"), // From project root
    path.resolve(projectRoot, "Server", "Data", "course_pricing.xlsx"), // Capitalized variant
    path.resolve(process.cwd(), "server", "data", "course_pricing.xlsx"), // From current working directory
    path.resolve(process.cwd(), "Server", "Data", "course_pricing.xlsx"), // Capitalized variant
    path.resolve(process.cwd(), "data", "course_pricing.xlsx"), // Root data folder
    path.resolve(process.cwd(), "course_pricing.xlsx"), // Root directory
  ];

  log(`[Pricing] Current working directory: ${process.cwd()}`, "pricing");
  log(`[Pricing] Server directory (import.meta.dirname): ${serverDir}`, "pricing");
  log(`[Pricing] Project root: ${projectRoot}`, "pricing");
  log(`[Pricing] Searching for pricing file in ${possiblePaths.length} locations...`, "pricing");

  for (const filePath of possiblePaths) {
    log(`[Pricing] Checking: ${filePath}`, "pricing");
    if (fs.existsSync(filePath)) {
      log(`✓ Found pricing file at: ${filePath}`, "pricing");
      return filePath;
    }
  }

  // Return default path relative to server directory (most reliable)
  const defaultPath = path.resolve(serverDir, "data", "course_pricing.xlsx");
  log(`⚠ Pricing file not found in any location. Using default: ${defaultPath}`, "pricing");
  
  // Create data directory if it doesn't exist
  const dataDir = path.dirname(defaultPath);
  if (!fs.existsSync(dataDir)) {
    log(`[Pricing] Creating data directory: ${dataDir}`, "pricing");
    fs.mkdirSync(dataDir, { recursive: true });
  }

  return defaultPath;
}

/**
 * Read pricing data from Excel file
 */
export function readPricingFromExcel(): CoursePricing[] {
  const filePath = getPricingFilePath();

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    log(`❌ Pricing file not found at ${filePath}. Returning empty array.`, "pricing");
    log(`[Pricing] This means pricing will fall back to default/hardcoded values.`, "pricing");
    log(`[Pricing] Please ensure course_pricing.xlsx is deployed to: ${filePath}`, "pricing");
    return [];
  }

  // Check file permissions
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
  } catch (error: any) {
    log(`❌ Pricing file exists but cannot be read: ${filePath}`, "pricing");
    log(`[Pricing] Error: ${error.message}`, "pricing");
    log(`[Pricing] Please check file permissions.`, "pricing");
    return [];
  }

  // Check if file was modified
  let stats;
  try {
    stats = fs.statSync(filePath);
  } catch (error: any) {
    log(`❌ Error reading file stats: ${error.message}`, "pricing");
    return [];
  }

  if (stats.mtimeMs === lastModified && pricingCache !== null) {
    log(`[Pricing] Using cached pricing data (${pricingCache.length} records)`, "pricing");
    return pricingCache;
  }

  try {
    // Use require for xlsx (CommonJS module)
    const XLSX = require("xlsx");
    
    log(`[Pricing] Reading Excel file: ${filePath}`, "pricing");
    
    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];

    log(`[Pricing] Excel file loaded. Sheet: ${sheetName}`, "pricing");

    // Convert to JSON - use first row as headers
    const data = XLSX.utils.sheet_to_json(worksheet, {
      defval: null,
      raw: false, // Convert numbers to strings for parsing
    });

    log(`[Pricing] Parsed ${data.length} rows from Excel`, "pricing");

    // Parse and validate data
    const pricing: CoursePricing[] = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i] as any;

      // Get values using Excel column names (case-insensitive matching)
      // Handles column names with country suffixes like "SGST (IND)", "Sales Tax (US)", etc.
      const getValue = (key: string, ...aliases: string[]): any => {
        const normalize = (str: string): string => {
          // Remove country suffixes in parentheses, spaces, and convert to lowercase
          return str
            .toLowerCase()
            .replace(/\s*\([^)]*\)\s*/g, '') // Remove text in parentheses like "(IND)", "(US)", etc.
            .replace(/\s+/g, ''); // Remove all spaces
        };
        
        const lowerKey = normalize(key);
        const allKeys = [key, ...aliases];
        
        for (const [excelKey, value] of Object.entries(row)) {
          const normalizedExcelKey = normalize(excelKey);
          // Match exact key or any alias
          if (normalizedExcelKey === lowerKey || allKeys.some(alias => normalize(alias) === normalizedExcelKey)) {
            return value;
          }
        }
        return undefined;
      };

      const courseName = getValue("Course Name", "courseName");
      const country = getValue("Country", "country");
      
      // Skip empty rows
      if (!courseName || !country) {
        continue;
      }

      // Parse numeric values
      const amount = parseFloat(getValue("Amount", "amount") || "0") || 0;
      
      // Normalize country name: only normalize "INDIA" to "India"
      // Keep "USA" and "UK" as-is since they're already correct
      const countryStr = String(country).trim();
      let normalizedCountry: string;
      
      // Only normalize if it's "INDIA" (uppercase), otherwise keep as-is
      if (countryStr.toUpperCase() === "INDIA") {
        normalizedCountry = "India";
      } else {
        // Keep USA, UK, and other countries as-is
        normalizedCountry = countryStr;
      }
      
      // Parse country-specific tax fields
      // Handles formats like "SGST (IND)", "SGST", "sgst", etc.
      // Also handles typos like "Sales Tax ((US)" with double parentheses
      const sgst = getValue("SGST (IND)", "SGST", "sgst");
      const cgst = getValue("CGST (IND)", "CGST", "cgst");
      const salesTax = getValue("Sales Tax (US)", "Sales Tax ((US)", "Sales Tax", "salesTax");
      const vat = getValue("VAT (UK)", "VAT", "vat");
      const tax = getValue("Tax (Canada, Singapore, UAE)", "Tax (Canada, Singapore,UAE)", "Tax", "tax");
      const serviceTax = getValue("Service Tax (Canada, Singapore, UAE)", "Service Tax (Canada, Singapore,UAE)", "Service Tax", "serviceTax");
      
      // Parse tax percentages
      // Handles formats like "SGST Percent (IND)", "SGST Percent", etc.
      // Also handles typos like "Sales Tax Percent (US)" with double parentheses
      const sgstPercent = getValue("SGST Percent (IND)", "SGST Percent", "sgstPercent");
      const cgstPercent = getValue("CGST Percent (IND)", "CGST Percent", "cgstPercent");
      const salesTaxPercent = getValue("Sales Tax Percent (US)", "Sales Tax Percent ((US)", "Sales Tax Percent", "salesTaxPercent");
      const vatPercent = getValue("VAT Percent (UK)", "VAT Percent", "vatPercent");
      const taxPercent = getValue("Tax Percent (Canada, Singapore, UAE)", "Tax Percent (Canada, Singapore,UAE)", "Tax Percent", "taxPercent");
      const serviceTaxPercent = getValue("Service Tax Percent (Canada, Singapore, UAE)", "Service Tax Percent (Canada, Singapore,UAE)", "Service Tax Percent", "serviceTaxPercent");
      
      // Legacy countryTax field
      const countryTax = getValue("Country Tax", "countryTax");
      
      // Parse numeric values
      const parsedSgst = sgst !== undefined && sgst !== null ? parseFloat(String(sgst)) : undefined;
      const parsedCgst = cgst !== undefined && cgst !== null ? parseFloat(String(cgst)) : undefined;
      const parsedSalesTax = salesTax !== undefined && salesTax !== null ? parseFloat(String(salesTax)) : undefined;
      const parsedVat = vat !== undefined && vat !== null ? parseFloat(String(vat)) : undefined;
      const parsedTax = tax !== undefined && tax !== null ? parseFloat(String(tax)) : undefined;
      const parsedServiceTax = serviceTax !== undefined && serviceTax !== null ? parseFloat(String(serviceTax)) : undefined;
      const parsedSgstPercent = sgstPercent !== undefined && sgstPercent !== null ? parseFloat(String(sgstPercent)) : undefined;
      const parsedCgstPercent = cgstPercent !== undefined && cgstPercent !== null ? parseFloat(String(cgstPercent)) : undefined;
      const parsedSalesTaxPercent = salesTaxPercent !== undefined && salesTaxPercent !== null ? parseFloat(String(salesTaxPercent)) : undefined;
      const parsedVatPercent = vatPercent !== undefined && vatPercent !== null ? parseFloat(String(vatPercent)) : undefined;
      const parsedTaxPercent = taxPercent !== undefined && taxPercent !== null ? parseFloat(String(taxPercent)) : undefined;
      const parsedServiceTaxPercent = serviceTaxPercent !== undefined && serviceTaxPercent !== null ? parseFloat(String(serviceTaxPercent)) : undefined;
      const parsedCountryTax = countryTax !== undefined && countryTax !== null ? parseFloat(String(countryTax)) : undefined;
      
      // Calculate total if not provided
      const totalValue = getValue("Total") || getValue("total");
      let total = totalValue ? parseFloat(String(totalValue)) : 0;
      if (!total) {
        // Calculate total from amount + taxes
        const taxSum = (parsedSgst || 0) + (parsedCgst || 0) + (parsedSalesTax || 0) + (parsedVat || 0) + (parsedTax || 0) + (parsedServiceTax || 0) + (parsedCountryTax || 0);
        total = amount + taxSum;
      }

      const countryCurrency = getValue("Country Currency") || getValue("countryCurrency") || "USD";

      pricing.push({
        courseName: String(courseName).trim(),
        country: normalizedCountry,
        amount: amount,
        countryCurrency: String(countryCurrency).trim(),
        sgst: parsedSgst,
        cgst: parsedCgst,
        salesTax: parsedSalesTax,
        vat: parsedVat,
        tax: parsedTax,
        serviceTax: parsedServiceTax,
        countryTax: parsedCountryTax,
        total,
        sgstPercent: parsedSgstPercent,
        cgstPercent: parsedCgstPercent,
        salesTaxPercent: parsedSalesTaxPercent,
        vatPercent: parsedVatPercent,
        taxPercent: parsedTaxPercent,
        serviceTaxPercent: parsedServiceTaxPercent,
      });
    }

    // Update cache
    pricingCache = pricing;
    lastModified = stats.mtimeMs;

    log(`✅ Successfully loaded ${pricing.length} pricing records from Excel file`, "pricing");
    if (pricing.length === 0) {
      log(`⚠ Warning: Excel file loaded but contains no valid pricing records.`, "pricing");
      log(`[Pricing] Please check the Excel file format and ensure it has the required columns.`, "pricing");
    }
    return pricing;
  } catch (error: any) {
    log(`❌ Error reading pricing file: ${error.message}`, "pricing");
    log(`[Pricing] File path: ${filePath}`, "pricing");
    log(`[Pricing] Error stack: ${error.stack}`, "pricing");
    log(`[Pricing] This error will cause the application to use default/hardcoded pricing.`, "pricing");
    return [];
  }
}

/**
 * Get pricing for a specific course and country
 */
export function getCoursePricing(courseName: string, country: string): CoursePricing | null {
  const pricing = readPricingFromExcel();

  // Log for debugging
  log(`Looking for pricing: courseName="${courseName}", country="${country}"`, "pricing");
  log(`Total pricing records loaded: ${pricing.length}`, "pricing");
  if (pricing.length > 0) {
    log(`Sample course names in Excel: ${pricing.slice(0, 3).map(p => p.courseName).join(", ")}`, "pricing");
    const uniqueCountries = Array.from(new Set(pricing.slice(0, 10).map(p => p.country)));
    log(`Sample countries in Excel: ${uniqueCountries.join(", ")}`, "pricing");
  }

  // Find matching pricing (case-insensitive)
  const match = pricing.find(
    (p) =>
      p.courseName.toLowerCase().trim() === courseName.toLowerCase().trim() &&
      p.country.toLowerCase().trim() === country.toLowerCase().trim()
  );

  if (match) {
    log(`✓ Found pricing match: ${match.courseName} - ${match.country} - Amount: ${match.amount}, Total: ${match.total}`, "pricing");
  } else {
    log(`✗ No pricing match found for "${courseName}" in "${country}"`, "pricing");
  }

  return match || null;
}

/**
 * Get all pricing for a specific course (all countries)
 */
export function getCoursePricingAllCountries(courseName: string): CoursePricing[] {
  const pricing = readPricingFromExcel();

  return pricing.filter(
    (p) => p.courseName.toLowerCase().trim() === courseName.toLowerCase().trim()
  );
}

/**
 * Get all pricing for a specific country (all courses)
 */
export function getCountryPricingAllCourses(country: string): CoursePricing[] {
  const pricing = readPricingFromExcel();

  return pricing.filter(
    (p) => p.country.toLowerCase().trim() === country.toLowerCase().trim()
  );
}

/**
 * Get all available courses from pricing data
 */
export function getAvailableCourses(): string[] {
  const pricing = readPricingFromExcel();
  const courses = new Set<string>();

  pricing.forEach((p) => {
    courses.add(p.courseName);
  });

  return Array.from(courses).sort();
}

/**
 * Get all available countries from pricing data
 */
export function getAvailableCountries(): string[] {
  const pricing = readPricingFromExcel();
  const countries = new Set<string>();

  pricing.forEach((p) => {
    countries.add(p.country);
  });

  return Array.from(countries).sort();
}

/**
 * Get tax breakdown for a pricing record based on country
 */
export function getTaxBreakdown(pricing: CoursePricing): {
  taxes: Array<{ label: string; amount: number; percent?: number }>;
  totalTax: number;
} {
  const taxes: Array<{ label: string; amount: number; percent?: number }> = [];
  let totalTax = 0;

  switch (pricing.country) {
    case "India":
      if (pricing.sgst !== undefined && pricing.sgst > 0) {
        taxes.push({
          label: "SGST",
          amount: pricing.sgst,
          percent: pricing.sgstPercent,
        });
        totalTax += pricing.sgst;
      }
      if (pricing.cgst !== undefined && pricing.cgst > 0) {
        taxes.push({
          label: "CGST",
          amount: pricing.cgst,
          percent: pricing.cgstPercent,
        });
        totalTax += pricing.cgst;
      }
      break;

    case "USA":
      if (pricing.salesTax !== undefined && pricing.salesTax > 0) {
        taxes.push({
          label: "Sales Tax",
          amount: pricing.salesTax,
          percent: pricing.salesTaxPercent,
        });
        totalTax += pricing.salesTax;
      }
      break;

    case "UK":
      if (pricing.vat !== undefined && pricing.vat > 0) {
        taxes.push({
          label: "VAT",
          amount: pricing.vat,
          percent: pricing.vatPercent,
        });
        totalTax += pricing.vat;
      }
      break;

    case "Canada":
    case "Singapore":
    case "UAE":
      if (pricing.tax !== undefined && pricing.tax > 0) {
        taxes.push({
          label: "Tax",
          amount: pricing.tax,
          percent: pricing.taxPercent,
        });
        totalTax += pricing.tax;
      }
      if (pricing.serviceTax !== undefined && pricing.serviceTax > 0) {
        taxes.push({
          label: "Service Tax",
          amount: pricing.serviceTax,
          percent: pricing.serviceTaxPercent,
        });
        totalTax += pricing.serviceTax;
      }
      break;

    default:
      // Fallback to countryTax if available
      if (pricing.countryTax !== undefined && pricing.countryTax > 0) {
        taxes.push({
          label: "Tax",
          amount: pricing.countryTax,
        });
        totalTax += pricing.countryTax;
      }
  }

  return { taxes, totalTax };
}

/**
 * Create a sample Excel file with template structure
 */
export function createSampleExcelFile(): void {
  const filePath = getPricingFilePath();

  // Sample data with country-specific tax columns
  const sampleData = [
    // India - SGST and CGST
    {
      "Course Name": "PMP Certification Training",
      "Country": "India",
      "Amount": 13000,
      "Country Currency": "INR",
      "SGST": 1170,
      "CGST": 1170,
      "SGST Percent": 9,
      "CGST Percent": 9,
      "Total": 15340,
    },
    // USA - Sales Tax
    {
      "Course Name": "PMP Certification Training",
      "Country": "USA",
      "Amount": 999,
      "Country Currency": "USD",
      "Sales Tax": 90,
      "Sales Tax Percent": 9,
      "Total": 1089,
    },
    // UK - VAT
    {
      "Course Name": "PMP Certification Training",
      "Country": "UK",
      "Amount": 789,
      "Country Currency": "GBP",
      "VAT": 158,
      "VAT Percent": 20,
      "Total": 947,
    },
    // Canada - Tax and Service Tax
    {
      "Course Name": "PMP Certification Training",
      "Country": "Canada",
      "Amount": 1349,
      "Country Currency": "CAD",
      "Tax": 67,
      "Service Tax": 54,
      "Tax Percent": 5,
      "Service Tax Percent": 4,
      "Total": 1470,
    },
    // Singapore - Tax and Service Tax
    {
      "Course Name": "PMP Certification Training",
      "Country": "Singapore",
      "Amount": 1349,
      "Country Currency": "SGD",
      "Tax": 67,
      "Service Tax": 54,
      "Tax Percent": 5,
      "Service Tax Percent": 4,
      "Total": 1470,
    },
    // UAE - Tax and Service Tax
    {
      "Course Name": "PMP Certification Training",
      "Country": "UAE",
      "Amount": 3670,
      "Country Currency": "AED",
      "Tax": 184,
      "Service Tax": 147,
      "Tax Percent": 5,
      "Service Tax Percent": 4,
      "Total": 4001,
    },
    // CBAP - India
    {
      "Course Name": "CBAP Certification Training",
      "Country": "India",
      "Amount": 83000,
      "Country Currency": "INR",
      "SGST": 7470,
      "CGST": 7470,
      "SGST Percent": 9,
      "CGST Percent": 9,
      "Total": 97940,
    },
    // CBAP - USA
    {
      "Course Name": "CBAP Certification Training",
      "Country": "USA",
      "Amount": 999,
      "Country Currency": "USD",
      "Sales Tax": 90,
      "Sales Tax Percent": 9,
      "Total": 1089,
    },
    // PMI-ACP - India
    {
      "Course Name": "PMI-ACP Certification Training",
      "Country": "India",
      "Amount": 74700,
      "Country Currency": "INR",
      "SGST": 6723,
      "CGST": 6723,
      "SGST Percent": 9,
      "CGST Percent": 9,
      "Total": 88146,
    },
    // PMI-ACP - USA
    {
      "Course Name": "PMI-ACP Certification Training",
      "Country": "USA",
      "Amount": 899,
      "Country Currency": "USD",
      "Sales Tax": 81,
      "Sales Tax Percent": 9,
      "Total": 980,
    },
  ];

  // Use require for xlsx (CommonJS module)
  const XLSX = require("xlsx");
  
  // Create workbook
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(sampleData);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Course Pricing");

  // Write file
  XLSX.writeFile(workbook, filePath);

  log(`Sample Excel file created at ${filePath}`, "pricing");
}

