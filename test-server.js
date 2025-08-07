import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Set up static file serving
const publicPath = path.join(__dirname, 'public');
console.log(`Serving static files from: ${publicPath}`);

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files
app.use(express.static(publicPath));

// Serve images with a specific route
app.use('/images', express.static(path.join(publicPath, 'images'), {
  maxAge: '1y',
  immutable: true
}));

// Simple test endpoint
app.get('/test', (req, res) => {
  const imagePath = path.join(publicPath, 'images', 'products', 'cashew-butter', '1.jpg');
  const exists = require('fs').existsSync(imagePath);
  
  res.json({
    success: exists,
    message: exists ? 'Image found' : 'Image not found',
    path: imagePath,
    url: '/images/products/cashew-butter/1.jpg',
    files: require('fs').readdirSync(path.join(publicPath, 'images', 'products', 'cashew-butter'))
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
  console.log(`Test endpoint: http://localhost:${port}/test`);
  console.log(`Direct image URL: http://localhost:${port}/images/products/cashew-butter/1.jpg`);
});
