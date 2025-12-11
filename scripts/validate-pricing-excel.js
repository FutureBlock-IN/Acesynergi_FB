#!/usr/bin/env node

/**
 * Script to validate the course_pricing.xlsx file structure
 * Run with: node scripts/validate-pricing-excel.js
 */

import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Expected column names (with and without country suffixes)
const EXPECTED_COLUMNS = {
  required: [
    'Course Name',
    'Country',
    'Amount',
    'Country Currency',
    'Total'
  ],
  optional: [
    // India
    'SGST (IND)',
    'CGST (IND)',
    'SGST Percent (IND)',
    'CGST Percent (IND)',
    // USA
    'Sales Tax (US)',
    'Sales Tax Percent (US)',
    // UK
    'VAT (UK)',
    'VAT Percent (UK)',
    // Canada, Singapore, UAE
    'Tax (Canada, Singapore, UAE)',
    'Tax Percent (Canada, Singapore, UAE)',
    'Service Tax (Canada, Singapore, UAE)',
    'Service Tax Percent (Canada, Singapore, UAE)',
    // Alternative names (without suffixes)
    'SGST',
    'CGST',
    'SGST Percent',
    'CGST Percent',
    'Sales Tax',
    'Sales Tax Percent',
    'VAT',
    'VAT Percent',
    'Tax',
    'Tax Percent',
    'Service Tax',
    'Service Tax Percent',
    // Legacy
    'Country Tax'
  ]
};

// Normalize column name for comparison
function normalizeColumnName(name) {
  return name
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, '') // Remove text in parentheses
    .replace(/\s+/g, ''); // Remove all spaces
}

// Get file path
function getPricingFilePath() {
  const possiblePaths = [
    path.resolve(process.cwd(), 'data', 'course_pricing.xlsx'),
    path.resolve(process.cwd(), 'server', 'data', 'course_pricing.xlsx'),
    path.resolve(process.cwd(), 'course_pricing.xlsx'),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

// Validate Excel file
function validateExcelFile() {
  const filePath = getPricingFilePath();

  if (!filePath) {
    console.error('❌ Error: course_pricing.xlsx file not found!');
    console.log('\nExpected locations:');
    console.log('  - data/course_pricing.xlsx');
    console.log('  - server/data/course_pricing.xlsx');
    console.log('  - course_pricing.xlsx (root)');
    return false;
  }

  console.log(`📁 Found Excel file: ${filePath}\n`);

  try {
    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    if (!sheetName) {
      console.error('❌ Error: Excel file has no sheets!');
      return false;
    }

    console.log(`📊 Sheet name: ${sheetName}\n`);

    // Convert to JSON to get headers
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: null });
    
    if (data.length === 0) {
      console.error('❌ Error: Excel file has no data rows!');
      return false;
    }

    // Get column names from first row
    const actualColumns = Object.keys(data[0]);
    console.log(`📋 Found ${actualColumns.length} columns:\n`);

    // Check required columns
    const normalizedActual = actualColumns.map(normalizeColumnName);
    const normalizedExpected = EXPECTED_COLUMNS.required.map(normalizeColumnName);
    
    let hasErrors = false;
    const missingColumns = [];
    const foundColumns = [];

    // Check required columns
    console.log('🔍 Validating Required Columns:');
    console.log('─'.repeat(60));
    for (const expected of EXPECTED_COLUMNS.required) {
      const normalized = normalizeColumnName(expected);
      const found = normalizedActual.some(actual => actual === normalized);
      
      if (found) {
        const actualName = actualColumns.find(col => normalizeColumnName(col) === normalized);
        console.log(`  ✅ ${expected.padEnd(30)} → Found as: "${actualName}"`);
        foundColumns.push(expected);
      } else {
        console.log(`  ❌ ${expected.padEnd(30)} → MISSING`);
        missingColumns.push(expected);
        hasErrors = true;
      }
    }

    // Check optional columns
    console.log('\n🔍 Validating Optional Tax Columns:');
    console.log('─'.repeat(60));
    const allOptional = EXPECTED_COLUMNS.optional.map(normalizeColumnName);
    const foundOptional = [];

    for (const optional of EXPECTED_COLUMNS.optional) {
      const normalized = normalizeColumnName(optional);
      const found = normalizedActual.some(actual => actual === normalized);
      
      if (found) {
        const actualName = actualColumns.find(col => normalizeColumnName(col) === normalized);
        console.log(`  ✅ ${optional.padEnd(40)} → Found as: "${actualName}"`);
        foundOptional.push(optional);
      }
    }

    // Check for unexpected columns
    const unexpectedColumns = actualColumns.filter(col => {
      const normalized = normalizeColumnName(col);
      return !normalizedExpected.includes(normalized) && 
             !allOptional.some(opt => opt === normalized);
    });

    if (unexpectedColumns.length > 0) {
      console.log('\n⚠️  Unexpected Columns (will be ignored):');
      console.log('─'.repeat(60));
      unexpectedColumns.forEach(col => {
        console.log(`  ⚠️  "${col}"`);
      });
    }

    // Validate data rows
    console.log('\n🔍 Validating Data Rows:');
    console.log('─'.repeat(60));
    console.log(`  Total rows: ${data.length}`);
    
    let validRows = 0;
    let invalidRows = 0;
    const errors = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNum = i + 2; // +2 because Excel rows are 1-indexed and we skip header
      const rowErrors = [];

      // Check required fields
      if (!row['Course Name'] && !row['courseName']) {
        rowErrors.push('Missing Course Name');
      }
      if (!row['Country'] && !row['country']) {
        rowErrors.push('Missing Country');
      }
      
      const amount = parseFloat(row['Amount'] || row['amount'] || 0);
      if (isNaN(amount) || amount <= 0) {
        rowErrors.push(`Invalid Amount: ${row['Amount'] || row['amount']}`);
      }

      const total = parseFloat(row['Total'] || row['total'] || 0);
      if (isNaN(total) || total <= 0) {
        rowErrors.push(`Invalid Total: ${row['Total'] || row['total']}`);
      }

      // Check country-specific taxes
      const country = String(row['Country'] || row['country'] || '').trim();
      if (country) {
        if (country === 'India') {
          const sgst = parseFloat(row['SGST (IND)'] || row['SGST'] || 0);
          const cgst = parseFloat(row['CGST (IND)'] || row['CGST'] || 0);
          if (sgst === 0 && cgst === 0) {
            rowErrors.push('India row missing SGST and/or CGST');
          }
        } else if (country === 'USA') {
          const salesTax = parseFloat(row['Sales Tax (US)'] || row['Sales Tax'] || 0);
          if (salesTax === 0) {
            rowErrors.push('USA row missing Sales Tax');
          }
        } else if (country === 'UK') {
          const vat = parseFloat(row['VAT (UK)'] || row['VAT'] || 0);
          if (vat === 0) {
            rowErrors.push('UK row missing VAT');
          }
        } else if (['Canada', 'Singapore', 'UAE'].includes(country)) {
          const tax = parseFloat(row['Tax (Canada, Singapore, UAE)'] || row['Tax'] || 0);
          const serviceTax = parseFloat(row['Service Tax (Canada, Singapore, UAE)'] || row['Service Tax'] || 0);
          if (tax === 0 && serviceTax === 0) {
            rowErrors.push(`${country} row missing Tax and/or Service Tax`);
          }
        }
      }

      if (rowErrors.length > 0) {
        invalidRows++;
        errors.push({ row: rowNum, errors: rowErrors });
      } else {
        validRows++;
      }
    }

    console.log(`  ✅ Valid rows: ${validRows}`);
    if (invalidRows > 0) {
      console.log(`  ❌ Invalid rows: ${invalidRows}`);
      console.log('\n❌ Row Errors:');
      console.log('─'.repeat(60));
      errors.forEach(({ row, errors: rowErrors }) => {
        console.log(`  Row ${row}:`);
        rowErrors.forEach(err => console.log(`    - ${err}`));
      });
      hasErrors = true;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    if (hasErrors || invalidRows > 0) {
      console.log('❌ VALIDATION FAILED');
      if (missingColumns.length > 0) {
        console.log(`\nMissing required columns: ${missingColumns.join(', ')}`);
      }
      return false;
    } else {
      console.log('✅ VALIDATION PASSED');
      console.log(`\n✓ All required columns present`);
      console.log(`✓ ${foundOptional.length} optional tax columns found`);
      console.log(`✓ ${validRows} valid data rows`);
      return true;
    }

  } catch (error) {
    console.error('❌ Error reading Excel file:', error.message);
    return false;
  }
}

// Run validation
const isValid = validateExcelFile();
process.exit(isValid ? 0 : 1);

