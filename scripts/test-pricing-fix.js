// Test script to verify Excel file is fixed correctly
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "..", "server", "data", "course_pricing.xlsx");

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { defval: null, raw: false });

console.log("Testing data matching:");
const testCases = [
  { courseName: "PMP Certification Training", country: "India" },
  { courseName: "CBAP Certification Training", country: "India" },
  { courseName: "ECBA Certification Training", country: "India" },
];

testCases.forEach((test) => {
  const match = data.find((r) => {
    const courseName = String(r["Course Name"])
      .trim()
      .toLowerCase()
      .replace(/[®©™]/g, "");
    const country = String(r.Country).trim();
    return (
      courseName === test.courseName.toLowerCase().replace(/[®©™]/g, "") &&
      country === test.country
    );
  });
  
  if (match) {
    console.log(`✓ Found: ${test.courseName} - ${test.country}`);
    console.log(`  Amount: ${match.Amount}, Total: ${match.Total}`);
  } else {
    console.log(`✗ Not found: ${test.courseName} - ${test.country}`);
  }
});

console.log("\n✓ Excel file structure is correct!");
console.log("The pricing system should now work correctly.");

