// Script to copy blogs JSON file during build
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Possible source locations (in order of preference)
const possibleSources = [
  path.join(projectRoot, 'client', 'src', 'data', 'blogs.json'),
  path.join(projectRoot, 'dist', 'server', 'data', 'blogs.json'), // Already in dist
];

// Destination
const destDir = path.join(projectRoot, 'dist', 'server', 'data');
const destFile = path.join(destDir, 'blogs.json');

// Find the source file
let sourceFile = null;
for (const src of possibleSources) {
  if (fs.existsSync(src)) {
    sourceFile = src;
    console.log(`✓ Found blogs.json at: ${src}`);
    break;
  }
}

if (!sourceFile) {
  // If no source file exists, create an empty array
  console.log('⚠ blogs.json not found. Creating empty blogs.json file...');
  
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`✓ Created directory: ${destDir}`);
  }
  
  // Create empty blogs array
  fs.writeFileSync(destFile, JSON.stringify([], null, 2), 'utf-8');
  console.log(`✓ Created empty blogs.json at: ${destFile}`);
  process.exit(0);
}

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`✓ Created directory: ${destDir}`);
}

// Copy the file
try {
  fs.copyFileSync(sourceFile, destFile);
  console.log(`✓ Copied blogs.json to: ${destFile}`);
  
  // Verify the copy
  if (fs.existsSync(destFile)) {
    const stats = fs.statSync(destFile);
    const content = JSON.parse(fs.readFileSync(destFile, 'utf-8'));
    console.log(`✓ Verified: File size ${stats.size} bytes, ${Array.isArray(content) ? content.length : 0} blog(s)`);
  } else {
    console.error('❌ Error: File copy verification failed');
    process.exit(1);
  }
} catch (error) {
  console.error(`❌ Error copying blogs file: ${error.message}`);
  process.exit(1);
}

