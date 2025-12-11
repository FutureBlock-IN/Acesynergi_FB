// Check Excel file structure
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

console.log("All unique countries in Excel:");
const countries = [...new Set(data.map((r) => r.Country).filter(Boolean))];
console.log(countries);

console.log("\nSample rows by country:");
const indiaRows = data.filter((r) => String(r.Country).toUpperCase() === "INDIA").slice(0, 2);
const usaRows = data.filter((r) => String(r.Country).toUpperCase() === "USA").slice(0, 2);
const ukRows = data.filter((r) => String(r.Country).toUpperCase() === "UK").slice(0, 2);

console.log("\nIndia rows:");
indiaRows.forEach((r) => {
  console.log(`  Country: "${r.Country}", Course: "${r["Course Name"]}", Amount: ${r.Amount}`);
});

console.log("\nUSA rows:");
usaRows.forEach((r) => {
  console.log(`  Country: "${r.Country}", Course: "${r["Course Name"]}", Amount: ${r.Amount}`);
});

console.log("\nUK rows:");
ukRows.forEach((r) => {
  console.log(`  Country: "${r.Country}", Course: "${r["Course Name"]}", Amount: ${r.Amount}`);
});

