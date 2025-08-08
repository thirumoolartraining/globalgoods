const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build in client directory...');
console.log('Current directory:', process.cwd());

// Ensure we're in the client directory
process.chdir(path.join(__dirname, 'client'));
console.log('Changed to client directory:', process.cwd());

// Install dependencies
console.log('Installing dependencies...');
execSync('npm ci', { stdio: 'inherit' });

// Run build
console.log('Running build...');
execSync('npm run build', { stdio: 'inherit' });

// Verify build output
const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  console.error('Build failed: dist directory not found');
  process.exit(1);
}

console.log('Build output:', fs.readdirSync(distDir));
console.log('Vercel build completed successfully');
