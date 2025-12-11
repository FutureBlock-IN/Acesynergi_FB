// Script to fix Excel file column names and data
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "..", "server", "data", "course_pricing.xlsx");
const backupPath = path.resolve(__dirname, "..", "server", "data", "course_pricing.backup.xlsx");

console.log("Reading Excel file from:", filePath);

if (!fs.existsSync(filePath)) {
  console.error("Excel file not found at:", filePath);
  process.exit(1);
}

// Create backup
console.log("Creating backup...");
fs.copyFileSync(filePath, backupPath);
console.log("✓ Backup created at:", backupPath);

// Read the Excel file
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet, { defval: null, raw: false });

console.log(`\nFound ${data.length} rows in Excel file`);

// Fix the data
const fixedData = data.map((row, index) => {
  const fixedRow = { ...row };
  
  // Fix column names by renaming properties
  // Fix "Sales Tax ((US)" -> "Sales Tax (US)"
  if (fixedRow["Sales Tax ((US)"] !== undefined) {
    fixedRow["Sales Tax (US)"] = fixedRow["Sales Tax ((US)"];
    delete fixedRow["Sales Tax ((US)"];
  }
  
  // Normalize country names: INDIA -> India, USA -> USA, UK -> UK
  if (fixedRow.Country) {
    const country = String(fixedRow.Country).trim().toUpperCase();
    switch (country) {
      case "INDIA":
        fixedRow.Country = "India";
        break;
      case "USA":
      case "US":
      case "UNITED STATES":
        fixedRow.Country = "USA";
        break;
      case "UK":
      case "UNITED KINGDOM":
        fixedRow.Country = "UK";
        break;
      case "CANADA":
        fixedRow.Country = "Canada";
        break;
      case "SINGAPORE":
        fixedRow.Country = "Singapore";
        break;
      case "UAE":
      case "UNITED ARAB EMIRATES":
        fixedRow.Country = "UAE";
        break;
      default:
        // Keep as is if already correct
        break;
    }
  }
  
  // Remove empty columns
  if (fixedRow.__EMPTY !== undefined) {
    delete fixedRow.__EMPTY;
  }
  
  if (index < 3) {
    console.log(`Row ${index + 1}: Country "${row.Country}" -> "${fixedRow.Country}"`);
  }
  
  return fixedRow;
});

// Create a new workbook with fixed data
const newWorkbook = XLSX.utils.book_new();
const newWorksheet = XLSX.utils.json_to_sheet(fixedData);

// Add worksheet to workbook
XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);

// Write the fixed file
console.log("\nWriting fixed Excel file...");
XLSX.writeFile(newWorkbook, filePath);

console.log("✓ Excel file fixed successfully!");
console.log("\nChanges made:");
console.log("  1. Fixed column name: 'Sales Tax ((US)' -> 'Sales Tax (US)'");
console.log("  2. Normalized country names: INDIA -> India, etc.");
console.log("  3. Removed empty columns");
console.log(`\nBackup saved at: ${backupPath}`);

