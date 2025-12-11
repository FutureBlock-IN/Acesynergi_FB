#!/usr/bin/env node

/**
 * Script to create a sample Excel pricing file
 * Run with: node scripts/create-pricing-excel.js
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Sample pricing data with country-specific tax columns
// Column names match the actual Excel file structure with country suffixes
const sampleData = [
  // PMP - India (SGST + CGST)
  {
    "Course Name": "PMP Certification Training",
    "Country": "India",
    "Amount": 13000,
    "Country Currency": "INR",
    "SGST (IND)": 1170,
    "CGST (IND)": 1170,
    "SGST Percent (IND)": 9,
    "CGST Percent (IND)": 9,
    "Total": 15340,
  },
  // PMP - USA (Sales Tax)
  {
    "Course Name": "PMP Certification Training",
    "Country": "USA",
    "Amount": 999,
    "Country Currency": "USD",
    "Sales Tax (US)": 90,
    "Sales Tax Percent (US)": 9,
    "Total": 1089,
  },
  // PMP - UK (VAT)
  {
    "Course Name": "PMP Certification Training",
    "Country": "UK",
    "Amount": 789,
    "Country Currency": "GBP",
    "VAT (UK)": 158,
    "VAT Percent (UK)": 20,
    "Total": 947,
  },
  // PMP - Canada (Tax + Service Tax)
  {
    "Course Name": "PMP Certification Training",
    "Country": "Canada",
    "Amount": 1349,
    "Country Currency": "CAD",
    "Tax (Canada, Singapore, UAE)": 67,
    "Service Tax (Canada, Singapore, UAE)": 54,
    "Tax Percent (Canada, Singapore, UAE)": 5,
    "Service Tax Percent (Canada, Singapore, UAE)": 4,
    "Total": 1470,
  },
  // PMP - Singapore (Tax + Service Tax)
  {
    "Course Name": "PMP Certification Training",
    "Country": "Singapore",
    "Amount": 1349,
    "Country Currency": "SGD",
    "Tax (Canada, Singapore, UAE)": 67,
    "Service Tax (Canada, Singapore, UAE)": 54,
    "Tax Percent (Canada, Singapore, UAE)": 5,
    "Service Tax Percent (Canada, Singapore, UAE)": 4,
    "Total": 1470,
  },
  // PMP - UAE (Tax + Service Tax)
  {
    "Course Name": "PMP Certification Training",
    "Country": "UAE",
    "Amount": 3670,
    "Country Currency": "AED",
    "Tax (Canada, Singapore, UAE)": 184,
    "Service Tax (Canada, Singapore, UAE)": 147,
    "Tax Percent (Canada, Singapore, UAE)": 5,
    "Service Tax Percent (Canada, Singapore, UAE)": 4,
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
  // CBAP - UK
  {
    "Course Name": "CBAP Certification Training",
    "Country": "UK",
    "Amount": 789,
    "Country Currency": "GBP",
    "VAT": 158,
    "VAT Percent": 20,
    "Total": 947,
  },
  // CBAP - Canada
  {
    "Course Name": "CBAP Certification Training",
    "Country": "Canada",
    "Amount": 1349,
    "Country Currency": "CAD",
    "Tax": 67,
    "Service Tax": 54,
    "Tax Percent": 5,
    "Service Tax Percent": 4,
    "Total": 1470,
  },
  // CBAP - Singapore
  {
    "Course Name": "CBAP Certification Training",
    "Country": "Singapore",
    "Amount": 1349,
    "Country Currency": "SGD",
    "Tax": 67,
    "Service Tax": 54,
    "Tax Percent": 5,
    "Service Tax Percent": 4,
    "Total": 1470,
  },
  // CBAP - UAE
  {
    "Course Name": "CBAP Certification Training",
    "Country": "UAE",
    "Amount": 3670,
    "Country Currency": "AED",
    "Tax": 184,
    "Service Tax": 147,
    "Tax Percent": 5,
    "Service Tax Percent": 4,
    "Total": 4001,
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
  // PMI-ACP - UK
  {
    "Course Name": "PMI-ACP Certification Training",
    "Country": "UK",
    "Amount": 711,
    "Country Currency": "GBP",
    "VAT": 142,
    "VAT Percent": 20,
    "Total": 853,
  },
  // PMI-ACP - Canada
  {
    "Course Name": "PMI-ACP Certification Training",
    "Country": "Canada",
    "Amount": 1214,
    "Country Currency": "CAD",
    "Tax": 61,
    "Service Tax": 49,
    "Tax Percent": 5,
    "Service Tax Percent": 4,
    "Total": 1324,
  },
  // PMI-ACP - Singapore
  {
    "Course Name": "PMI-ACP Certification Training",
    "Country": "Singapore",
    "Amount": 1214,
    "Country Currency": "SGD",
    "Tax": 61,
    "Service Tax": 49,
    "Tax Percent": 5,
    "Service Tax Percent": 4,
    "Total": 1324,
  },
  // PMI-ACP - UAE
  {
    "Course Name": "PMI-ACP Certification Training",
    "Country": "UAE",
    "Amount": 3303,
    "Country Currency": "AED",
    "Tax": 165,
    "Service Tax": 132,
    "Tax Percent": 5,
    "Service Tax Percent": 4,
    "Total": 3600,
  },
];

// Create data directory if it doesn't exist
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// File path
const filePath = path.resolve(dataDir, 'course_pricing.xlsx');

// Create workbook
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(sampleData);

// Set column widths for all columns
worksheet['!cols'] = [
  { wch: 35 }, // Course Name
  { wch: 15 }, // Country
  { wch: 12 }, // Amount
  { wch: 18 }, // Country Currency
  { wch: 12 }, // SGST
  { wch: 12 }, // CGST
  { wch: 12 }, // Sales Tax
  { wch: 12 }, // VAT
  { wch: 12 }, // Tax
  { wch: 12 }, // Service Tax
  { wch: 12 }, // SGST Percent
  { wch: 12 }, // CGST Percent
  { wch: 12 }, // Sales Tax Percent
  { wch: 12 }, // VAT Percent
  { wch: 12 }, // Tax Percent
  { wch: 12 }, // Service Tax Percent
  { wch: 12 }, // Total
];

// Add worksheet to workbook
XLSX.utils.book_append_sheet(workbook, worksheet, 'Course Pricing');

// Write file
XLSX.writeFile(workbook, filePath);

console.log('✅ Sample Excel pricing file created successfully!');
console.log(`📁 Location: ${filePath}`);
console.log(`📊 Total rows: ${sampleData.length}`);
console.log('\nYou can now edit this file to update course prices.');

