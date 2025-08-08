const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Log function with timestamp
function log(message, data) {
  const timestamp = new Date().toISOString();
  const logData = data ? ` - ${JSON.stringify(data, null, 2)}` : '';
  console.log(`[${timestamp}] ${message}${logData}`);
}

async function runBuild() {
  try {
    log('Starting Vercel build process');
    
    // Log environment information
    log('Environment Information', {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      cwd: process.cwd(),
      vercel: !!process.env.VERCEL,
      vercelEnv: process.env.VERCEL_ENV,
      nodeEnv: process.env.NODE_ENV,
    });

    // Install dependencies
    log('Installing dependencies...');
    execSync('npm ci', { stdio: 'inherit' });

    // Run build script
    log('Running build...');
    execSync('npm run build', { stdio: 'inherit' });

    // Verify build output
    const distDir = path.join(process.cwd(), 'dist');
    const publicDir = path.join(distDir, 'public');
    
    if (!fs.existsSync(distDir)) {
      throw new Error('Build failed: dist directory not found');
    }

    log('Build output:', {
      distDir: fs.readdirSync(distDir),
      hasPublic: fs.existsSync(publicDir),
      publicContents: fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : []
    });

    log('Vercel build completed successfully');
    process.exit(0);
  } catch (error) {
    log('Build failed:', error.message);
    process.exit(1);
  }
}

runBuild();
