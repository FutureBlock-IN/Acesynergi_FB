// Test pricing matching logic
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

// Simulate the normalization logic from pricing.ts
function normalizeCountry(country) {
  const countryStr = String(country).trim();
  if (countryStr.toUpperCase() === "INDIA") {
    return "India";
  }
  return countryStr;
}

// Simulate the matching logic
function findMatch(courseName, country) {
  return data.find((r) => {
    const excelCourseName = String(r["Course Name"]).trim().toLowerCase();
    const excelCountry = normalizeCountry(r.Country);
    return (
      excelCourseName === courseName.toLowerCase().trim() &&
      excelCountry.toLowerCase().trim() === country.toLowerCase().trim()
    );
  });
}

// Test cases
const testCases = [
  { courseName: "PMP Certification Training", country: "India" },
  { courseName: "PMP Certification Training", country: "UK" },
  { courseName: "PMI-ACP® Certification Training", country: "India" },
  { courseName: "PMI-ACP® Certification Training", country: "UK" },
  { courseName: "CBAP Certification Training", country: "India" },
  { courseName: "CBAP Certification Training", country: "UK" },
];

console.log("Testing pricing matching:\n");
testCases.forEach((test) => {
  const match = findMatch(test.courseName, test.country);
  if (match) {
    console.log(
      `✓ Found: "${test.courseName}" - ${test.country}`
    );
    console.log(`  Amount: ${match.Amount}, Total: ${match.Total}`);
    console.log(`  Excel Country: "${match.Country}" -> Normalized: "${normalizeCountry(match.Country)}"`);
  } else {
    console.log(`✗ NOT FOUND: "${test.courseName}" - ${test.country}`);
    // Show what's in Excel for debugging
    const similar = data.filter(
      (r) =>
        String(r["Course Name"]).toLowerCase().includes(test.courseName.toLowerCase().split(" ")[0]) &&
        normalizeCountry(r.Country).toLowerCase() === test.country.toLowerCase()
    );
    if (similar.length > 0) {
      console.log(`  Similar entries found:`);
      similar.forEach((r) => {
        console.log(`    Course: "${r["Course Name"]}", Country: "${r.Country}"`);
      });
    }
  }
  console.log("");
});

