import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";

const app = express();

// 1. First, set up static file serving before any other middleware
const isProduction = process.env.NODE_ENV === 'production';
const rootDir = path.resolve(import.meta.dirname, '..');
const publicPath = isProduction 
  ? path.join(rootDir, 'dist', 'public')
  : path.join(rootDir, 'public');

console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`[Server] Serving static files from: ${publicPath}`);
console.log(`[Server] Directory exists: ${fs.existsSync(publicPath)}`);

// Serve static files from the public directory
app.use(express.static(publicPath, {
  maxAge: '1y',
  immutable: true,
  fallthrough: true
}));

// Serve images with a specific route
app.use('/images', express.static(path.join(publicPath, 'images'), {
  maxAge: '1y',
  immutable: true,
  fallthrough: true
}));

// For Vercel, also try serving from root dist directory
if (isProduction) {
  const distPath = path.join(rootDir, 'dist');
  console.log(`[Server] Also serving from dist directory: ${distPath}`);
  
  app.use(express.static(distPath, {
    maxAge: '1y',
    immutable: true,
    fallthrough: true
  }));
}

// 2. Then add body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 3. Log all requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Add a test endpoint to verify file paths
  app.get('/api/test-path', (req, res) => {
    const publicPath = path.resolve(import.meta.dirname, '..', 'public');
    const imagePath = path.join(publicPath, 'images', 'products', 'cashew-butter', '1.jpg');
  
    res.json({
      exists: fs.existsSync(imagePath),
      publicPath,
      imagePath,
      cwd: process.cwd(),
      __dirname: import.meta.dirname,
      files: fs.readdirSync(path.join(publicPath, 'images', 'products', 'cashew-butter'))
    });
  });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "127.0.0.1",
    reusePort: false,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
