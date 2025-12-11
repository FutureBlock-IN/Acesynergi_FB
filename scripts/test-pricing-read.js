#!/usr/bin/env node

/**
 * Quick test script to verify the pricing file can be read
 */

import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(process.cwd(), 'server', 'data', 'course_pricing.xlsx');

console.log('Testing pricing file read...\n');
console.log(`File path: ${filePath}`);
console.log(`Exists: ${fs.existsSync(filePath)}\n`);

if (!fs.existsSync(filePath)) {
  console.error('❌ File not found!');
  process.exit(1);
}

try {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  console.log(`✓ Sheet name: ${sheetName}`);
  
  const data = XLSX.utils.sheet_to_json(worksheet, { defval: null });
  console.log(`✓ Total rows: ${data.length}`);
  
  if (data.length > 0) {
    console.log('\n✓ Column names:');
    const columns = Object.keys(data[0]);
    columns.forEach(col => console.log(`  - ${col}`));
    
    console.log('\n✓ First row sample:');
    const firstRow = data[0];
    console.log(`  Course: ${firstRow['Course Name'] || firstRow['courseName'] || 'N/A'}`);
    console.log(`  Country: ${firstRow['Country'] || firstRow['country'] || 'N/A'}`);
    console.log(`  Amount: ${firstRow['Amount'] || firstRow['amount'] || 'N/A'}`);
    console.log(`  Total: ${firstRow['Total'] || firstRow['total'] || 'N/A'}`);
  }
  
  console.log('\n✅ File read successfully!');
} catch (error) {
  console.error('❌ Error reading file:', error.message);
  process.exit(1);
}

