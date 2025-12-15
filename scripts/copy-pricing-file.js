// Script to copy pricing Excel file during build
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Possible source locations (in order of preference)
const possibleSources = [
  path.join(projectRoot, 'server', 'data', 'course_pricing.xlsx'),
  path.join(projectRoot, 'data', 'course_pricing.xlsx'),
  path.join(projectRoot, 'course_pricing.xlsx'),
];

// Destination
const destDir = path.join(projectRoot, 'dist', 'server', 'data');
const destFile = path.join(destDir, 'course_pricing.xlsx');

// Find the source file
let sourceFile = null;
for (const src of possibleSources) {
  if (fs.existsSync(src)) {
    sourceFile = src;
    console.log(`✓ Found pricing file at: ${src}`);
    break;
  }
}

if (!sourceFile) {
  console.warn('⚠ Warning: course_pricing.xlsx not found in any of these locations:');
  possibleSources.forEach(src => console.warn(`   - ${src}`));
  console.warn('   The pricing file will need to be manually deployed to dist/server/data/');
  process.exit(0); // Don't fail the build, just warn
}

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`✓ Created directory: ${destDir}`);
}

// Copy the file
try {
  fs.copyFileSync(sourceFile, destFile);
  console.log(`✓ Copied course_pricing.xlsx to: ${destFile}`);
  
  // Verify the copy
  if (fs.existsSync(destFile)) {
    const stats = fs.statSync(destFile);
    console.log(`✓ Verified: File size ${stats.size} bytes`);
  } else {
    console.error('❌ Error: File copy verification failed');
    process.exit(1);
  }
} catch (error) {
  console.error(`❌ Error copying pricing file: ${error.message}`);
  process.exit(1);
}


