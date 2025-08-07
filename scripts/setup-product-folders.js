import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Product IDs from your storage.ts
const productIds = [
  'raw-w320',
  'roasted-w240',
  'organic-w320',
  'cashew-pieces',
  'honey-roasted',
  'chocolate-covered',
  'premium-w240',
  'cashew-butter'
];

const baseDir = join(__dirname, '..', 'public', 'images', 'products');

// Create base directory if it doesn't exist
if (!existsSync(baseDir)) {
  mkdirSync(baseDir, { recursive: true });
  console.log(`✅ Created directory: ${baseDir}`);
}

// Create a folder for each product
productIds.forEach(productId => {
  const productDir = join(baseDir, productId);
  
  if (!existsSync(productDir)) {
    mkdirSync(productDir);
    console.log(`📁 Created directory for product: ${productId}`);
    
    // Create a README.md in each folder with instructions
    const readmeContent = `# ${productId} Product Images

Place your product images in this folder with the following naming convention:
- 1.jpg (main product image)
- 2.jpg (alternative view)
- 3.jpg (detail shot)
- 4.jpg (packaging/other)

Recommended image size: 800x600px, JPG format`;
    
    writeFileSync(join(productDir, 'README.md'), readmeContent);
    console.log(`  📝 Added README.md to ${productId}`);
  } else {
    console.log(`Directory already exists: ${productId}`);
  }
});

console.log('\nFolder structure setup complete!');
console.log('Place your product images in their respective folders.');
