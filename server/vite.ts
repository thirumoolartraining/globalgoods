import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Try multiple possible locations for static files in production
  const possibleStaticDirs = [
    path.join(process.cwd(), 'dist', 'public'),  // Vite build output
    path.join(process.cwd(), 'public'),          // Fallback to public directory
    path.join(import.meta.dirname, '..', 'public'), // Relative to server
    '/var/task/dist/public',                     // Vercel serverless
    '/var/task/public'                           // Vercel serverless fallback
  ];

  // Find the first existing static directory
  let staticDir = possibleStaticDirs.find(dir => fs.existsSync(dir));
  
  if (!staticDir) {
    console.error('No static directory found. Tried:', possibleStaticDirs);
    throw new Error('No static directory found');
  }

  console.log(`[Static] Serving static files from: ${staticDir}`);
  console.log(`[Static] Directory contents:`, fs.readdirSync(staticDir));

  // Serve static files with proper caching
  app.use(express.static(staticDir, {
    maxAge: '1y',
    immutable: true,
    fallthrough: true,
    index: false,
    redirect: false
  }));
  
  // Serve images with a specific route and caching
  const imagesPath = path.join(staticDir, 'images');
  if (fs.existsSync(imagesPath)) {
    console.log(`[Static] Serving images from: ${imagesPath}`);
    app.use('/images', express.static(imagesPath, {
      maxAge: '1y',
      immutable: true
    }));
  } else {
    console.warn(`[Static] Images directory not found at: ${imagesPath}`);
  }
  
  // Log all requests for debugging
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
  
  // Simple test endpoint to verify file paths
  app.get('/api/test-path', (req, res) => {
    const imagePath = path.join(staticDir, 'images', 'products', 'cashew-butter', '1.jpg');
    const exists = fs.existsSync(imagePath);
    
    res.json({
      success: exists,
      message: exists ? 'Image found' : 'Image not found',
      path: imagePath,
      staticDir,
      url: '/images/products/cashew-butter/1.jpg',
      files: fs.existsSync(path.dirname(imagePath)) 
        ? fs.readdirSync(path.dirname(imagePath))
        : [],
      staticDirs: possibleStaticDirs.map(dir => ({
        path: dir,
        exists: fs.existsSync(dir)
      }))
    });
  });

  // Fall through to index.html for client-side routing
  app.get('*', (req, res) => {
    const indexPath = path.join(staticDir, 'index.html');
    console.log(`[Static] Attempting to serve: ${indexPath}`);
    
    if (fs.existsSync(indexPath)) {
      console.log(`[Static] Found index.html at: ${indexPath}`);
      return res.sendFile(indexPath);
    }
    
    console.error(`[Static] index.html not found at: ${indexPath}`);
    console.error(`[Static] Current working directory: ${process.cwd()}`);
    console.error(`[Static] Directory contents:`, fs.readdirSync(staticDir));
    
    res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource was not found',
      path: req.path,
      staticDir,
      staticDirExists: fs.existsSync(staticDir),
      staticDirContents: fs.existsSync(staticDir) ? fs.readdirSync(staticDir) : []
    });
  });
}
