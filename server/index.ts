import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import { exec } from "child_process";

const app = express();

// 1. First, set up static file serving before any other middleware
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = !!process.env.VERCEL;

// Log environment information
console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`[Server] Vercel Environment: ${isVercel ? 'Yes' : 'No'}`);
console.log(`[Server] Process CWD: ${process.cwd()}`);
console.log(`[Server] __dirname: ${import.meta.dirname}`);
console.log(`[Server] Vercel Environment Variables:`, {
  VERCEL: process.env.VERCEL,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  VERCEL_REGION: process.env.VERCEL_REGION
});

// Handle different environments (local vs Vercel)
const getRootDir = () => {
  // For Vercel production
  if (isVercel) {
    console.log('[Server] Running in Vercel environment');
    // In Vercel serverless, the working directory is '/var/task'
    return '/var/task';
  }
  // For local development
  return path.resolve(import.meta.dirname, '..');
};

const rootDir = getRootDir();
console.log(`[Server] Using root directory: ${rootDir}`);

// Try multiple possible locations for static files
const possibleStaticDirs = [
  path.join(rootDir, 'dist', 'public'),  // Vite build output
  path.join(rootDir, 'public'),          // Local development
  path.join(process.cwd(), 'public'),    // Fallback
  '/var/task/public',                    // Vercel serverless
  '/var/task/dist/public'                // Vercel serverless with dist
];

// Debug: List all files in root directory
try {
  console.log('[Server] Root directory contents:', fs.readdirSync(rootDir));
  
  // Debug: Check if dist directory exists
  const distPath = path.join(rootDir, 'dist');
  if (fs.existsSync(distPath)) {
    console.log('[Server] Dist directory contents:', fs.readdirSync(distPath));
    
    // Check public directory in dist
    const publicPath = path.join(distPath, 'public');
    if (fs.existsSync(publicPath)) {
      console.log('[Server] Public directory contents:', fs.readdirSync(publicPath));
    }
  }
} catch (e) {
  console.error('[Server] Error reading directory:', e);
}

// Find and serve from the first existing directory
let staticDirFound = false;
for (const dir of possibleStaticDirs) {
  try {
    if (fs.existsSync(dir)) {
      console.log(`[Server] Found static files directory: ${dir}`);
      console.log(`[Server] Directory contents:`, fs.readdirSync(dir));
      
      app.use(express.static(dir, {
        maxAge: '1y',
        immutable: true,
        fallthrough: true,
        index: false,
        redirect: false
      }));
      
      // Also serve images from the found directory
      const imagesDir = path.join(dir, 'images');
      if (fs.existsSync(imagesDir)) {
        console.log(`[Server] Serving images from: ${imagesDir}`);
        app.use('/images', express.static(imagesDir, {
          maxAge: '1y',
          immutable: true,
          fallthrough: true
        }));
      }
      
      staticDirFound = true;
      // Don't break, let all matching directories be checked
    }
  } catch (e) {
    console.error(`[Server] Error setting up static directory ${dir}:`, e);
  }
}

if (!staticDirFound) {
  console.error('[Server] Error: No static files directory found in any expected location');
  console.error(`[Server] Tried: ${possibleStaticDirs.join('\n  - ')}`);
  
  // Debug: List all files in the root directory
  try {
    console.log('[Server] Current directory contents:', fs.readdirSync(rootDir));
  } catch (e) {
    console.error('[Server] Error listing directory:', e);
  }
}

// 2. Then add body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 3. Log all requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Function to get an available port (not currently used, using findAvailablePort instead)
const getPort = async (defaultPort: number): Promise<number> => {
  const { createServer } = await import('http');
  return new Promise((resolve) => {
    const server = createServer();
    server.unref();
    server.on('error', () => {
      // Port is in use, try the next one
      resolve(getPort(defaultPort + 1));
    });
    server.listen(defaultPort, '0.0.0.0', () => {
      const address = server.address();
      const port = typeof address === 'string' ? defaultPort : address?.port || defaultPort;
      server.close(() => resolve(port));
    });
  });
};

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

  // Function to check if a port is available
  const isPortAvailable = (port: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const testServer = createServer();
      testServer.once('error', () => {
        testServer.close();
        resolve(false);
      });
      testServer.once('listening', () => {
        testServer.close(() => resolve(true));
      });
      testServer.listen(port, '0.0.0.0');
    });
  };

  // Find an available port starting from the specified port
  const findAvailablePort = async (startPort: number, maxPort = 65535): Promise<number> => {
    let port = startPort;
    while (port <= maxPort) {
      if (await isPortAvailable(port)) {
        return port;
      }
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      port++;
    }
    throw new Error(`No available ports found between ${startPort} and ${maxPort}`);
  };

  // Get the port from environment or use default 5000
  const startPort = parseInt(process.env.PORT || '5000', 10);
  
  try {
    const port = await findAvailablePort(startPort);
    
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: false,
    }, () => {
      log(`Server running on http://localhost:${port}`);
      log(`API available at http://localhost:${port}/api`);
      
      // Auto-open browser in development
      if (app.get("env") === "development") {
        const startCommand = process.platform === 'darwin' ? 'open' : 
                           process.platform === 'win32' ? 'start' : 'xdg-open';
        exec(`${startCommand} http://localhost:${port}`, (error) => {
          if (error) {
            console.error('Failed to open browser:', error);
          }
        });
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
