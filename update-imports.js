import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Files that need updating
const filesToUpdate = [
  'client/src/pages/thank-you.tsx',
  'client/src/pages/shop.tsx',
  'client/src/pages/product.tsx',
  'client/src/pages/home.tsx',
  'client/src/pages/contact.tsx',
  'client/src/lib/products.ts',
  'client/src/lib/api.ts',
  'client/src/hooks/use-cart.tsx',
  'client/src/components/product-card.tsx'
];

filesToUpdate.forEach(filePath => {
  const fullPath = join(__dirname, filePath);
  try {
    let content = readFileSync(fullPath, 'utf8');
    const updatedContent = content.replace(
      /from ["']@shared\/types["']/g, 
      'from "@/lib/types"'
    );
    
    if (content !== updatedContent) {
      writeFileSync(fullPath, updatedContent, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    } else {
      console.log(`No changes needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});
