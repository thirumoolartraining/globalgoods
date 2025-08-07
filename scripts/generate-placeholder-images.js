const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Define the product folders
const productDirs = [
  'cashew-butter',
  'cashew-pieces',
  'chocolate-covered',
  'honey-roasted',
  'organic-w320',
  'premium-w240',
  'raw-w320',
  'roasted-w240',
  'spiced' // Add any other product folders here
];

// Define the base directory
const baseDir = path.join(__dirname, '..', 'public', 'images', 'products');

// Create a simple placeholder image
function createPlaceholderImage(productName, imageNumber) {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = '#666666';
  ctx.font = 'bold 30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(productName, width / 2, height / 2 - 20);
  ctx.font = '20px Arial';
  ctx.fillText(`Image ${imageNumber}`, width / 2, height / 2 + 20);

  return canvas.toBuffer('image/jpeg');
}

// Process each product directory
productDirs.forEach(productDir => {
  const productPath = path.join(baseDir, productDir);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(productPath)) {
    fs.mkdirSync(productPath, { recursive: true });
    console.log(`Created directory: ${productPath}`);
  }

  // Create README if it doesn't exist
  const readmePath = path.join(productPath, 'README.md');
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# ${productDir.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Images\n\n` +
      'Place product images in this directory. Naming convention:\n' +
      '- 1.jpg (main product image, 800x600 recommended)\n' +
      '- 2.jpg (secondary image, 800x600 recommended)\n' +
      '- 3.jpg (additional image, 800x600 recommended)\n' +
      '- 4.jpg (additional image, 800x600 recommended)\n\n' +
      'All images should be in JPG format for best compatibility.';
    
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`Created README for ${productDir}`);
  }

  // Create placeholder images if they don't exist
  for (let i = 1; i <= 4; i++) {
    const imagePath = path.join(productPath, `${i}.jpg`);
    if (!fs.existsSync(imagePath)) {
      const imageBuffer = createPlaceholderImage(
        productDir.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        i
      );
      fs.writeFileSync(imagePath, imageBuffer);
      console.log(`Created placeholder image: ${productDir}/${i}.jpg`);
    }
  }
});

console.log('Finished generating placeholder images.');
