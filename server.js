const express = require('express');
const { join, resolve } = require('path');
const { parse } = require('url');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the Vite output directory
const staticPath = resolve(__dirname, 'dist/public');
app.use(express.static(staticPath, {
  etag: true,
  maxAge: '1y',
  immutable: true
}));

// Handle client-side routing - return index.html for all non-asset routes
app.get('*', (req, res) => {
  // If the request is for an asset that doesn't exist, return 404
  if (req.path.match(/\.(js|css|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    return res.status(404).send('Not found');
  }
  
  // Otherwise serve the index.html for client-side routing
  res.sendFile(join(staticPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Serving static files from: ${staticPath}`);
});
