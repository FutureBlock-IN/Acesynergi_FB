// Test script to debug India and UK pricing issues
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "..", "server", "data", "course_pricing.xlsx");

console.log("Reading Excel file...");
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { defval: null, raw: false });

console.log(`\nTotal rows: ${data.length}`);

// Test the getValue function logic
const getValue = (row, key, ...aliases) => {
  const normalize = (str) => {
    return str
      .toLowerCase()
      .replace(/\s*\([^)]*\)\s*/g, '') // Remove text in parentheses
      .replace(/\s+/g, ''); // Remove all spaces
  };
  
  const lowerKey = normalize(key);
  const allKeys = [key, ...aliases];
  
  for (const [excelKey, value] of Object.entries(row)) {
    const normalizedExcelKey = normalize(excelKey);
    if (normalizedExcelKey === lowerKey || allKeys.some(alias => normalize(alias) === normalizedExcelKey)) {
      return value;
    }
  }
  return undefined;
};

// Test India row
console.log("\n=== Testing India Row ===");
const indiaRow = data.find(r => String(r.Country).trim() === "India");
if (indiaRow) {
  console.log("Course Name:", indiaRow["Course Name"]);
  console.log("Country:", indiaRow.Country);
  
  const sgst = getValue(indiaRow, "SGST (IND)", "SGST", "sgst");
  const cgst = getValue(indiaRow, "CGST (IND)", "CGST", "cgst");
  const sgstPercent = getValue(indiaRow, "SGST Percent (IND)", "SGST Percent", "sgstPercent");
  const cgstPercent = getValue(indiaRow, "CGST Percent (IND)", "CGST Percent", "cgstPercent");
  
  console.log("SGST (IND):", sgst, "->", sgst !== undefined && sgst !== null ? parseFloat(String(sgst)) : undefined);
  console.log("CGST (IND):", cgst, "->", cgst !== undefined && cgst !== null ? parseFloat(String(cgst)) : undefined);
  console.log("SGST Percent:", sgstPercent);
  console.log("CGST Percent:", cgstPercent);
  console.log("Amount:", indiaRow.Amount);
  console.log("Total:", indiaRow.Total);
  
  // Check all column names
  console.log("\nAll columns in row:");
  Object.keys(indiaRow).forEach(key => {
    console.log(`  "${key}": ${indiaRow[key]}`);
  });
}

// Test UK row
console.log("\n=== Testing UK Row ===");
const ukRow = data.find(r => String(r.Country).trim() === "UK");
if (ukRow) {
  console.log("Course Name:", ukRow["Course Name"]);
  console.log("Country:", ukRow.Country);
  
  const vat = getValue(ukRow, "VAT (UK)", "VAT", "vat");
  const vatPercent = getValue(ukRow, "VAT Percent (UK)", "VAT Percent", "vatPercent");
  
  console.log("VAT (UK):", vat, "->", vat !== undefined && vat !== null ? parseFloat(String(vat)) : undefined);
  console.log("VAT Percent:", vatPercent);
  console.log("Amount:", ukRow.Amount);
  console.log("Total:", ukRow.Total);
  
  // Check all column names
  console.log("\nAll columns in row:");
  Object.keys(ukRow).forEach(key => {
    console.log(`  "${key}": ${ukRow[key]}`);
  });
}

// Test USA row for comparison
console.log("\n=== Testing USA Row (for comparison) ===");
const usaRow = data.find(r => String(r.Country).trim() === "USA");
if (usaRow) {
  console.log("Course Name:", usaRow["Course Name"]);
  console.log("Country:", usaRow.Country);
  
  const salesTax = getValue(usaRow, "Sales Tax (US)", "Sales Tax", "salesTax");
  const salesTaxPercent = getValue(usaRow, "Sales Tax Percent (US)", "Sales Tax Percent", "salesTaxPercent");
  
  console.log("Sales Tax (US):", salesTax, "->", salesTax !== undefined && salesTax !== null ? parseFloat(String(salesTax)) : undefined);
  console.log("Sales Tax Percent:", salesTaxPercent);
  console.log("Amount:", usaRow.Amount);
  console.log("Total:", usaRow.Total);
}

