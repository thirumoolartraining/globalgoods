import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyAssets() {
  try {
    const sourceDir = path.join(__dirname, '..', 'public');
    const destDir = path.join(__dirname, '..', 'dist', 'public');
    
    console.log(`Copying assets from ${sourceDir} to ${destDir}`);
    
    // Ensure destination directory exists
    await fs.ensureDir(destDir);
    
    // Copy all files from public to dist/public
    await fs.copy(sourceDir, destDir, {
      overwrite: true,
      preserveTimestamps: true
    });
    
    console.log('Assets copied successfully!');
  } catch (error) {
    console.error('Error copying assets:', error);
    process.exit(1);
  }
}

copyAssets();
