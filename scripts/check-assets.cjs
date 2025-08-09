// scripts/check-assets.cjs
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build output...');

const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  console.error('❌ dist directory not found.');
  process.exit(1);
}

console.log('✅ dist directory exists.');

const indexHtml = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtml)) {
  console.error('❌ index.html missing in dist.');
  process.exit(1);
}

console.log('✅ index.html found.');
console.log('🎯 Build output check complete.');
