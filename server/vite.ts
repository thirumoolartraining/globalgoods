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
  // Path to the public directory in the project root
  const publicPath = path.resolve(import.meta.dirname, '..', 'public');
  
  // Log the public path for debugging
  console.log(`Serving static files from: ${publicPath}`);
  
  // Check if the public directory exists
  if (!fs.existsSync(publicPath)) {
    console.warn(`Warning: Public directory not found at: ${publicPath}`);
  }

  // Simple static file serving - match the working test server
  app.use(express.static(publicPath));
  
  // Serve images from the public directory with a specific route
  app.use('/images', express.static(path.join(publicPath, 'images'), {
    maxAge: '1y',
    immutable: true
  }));
  
  // Log all requests for debugging
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
  
  // Simple test endpoint to verify file paths
  app.get('/api/test-path', (req, res) => {
    const imagePath = path.join(publicPath, 'images', 'products', 'cashew-butter', '1.jpg');
    const exists = fs.existsSync(imagePath);
    
    res.json({
      success: exists,
      message: exists ? 'Image found' : 'Image not found',
      path: imagePath,
      url: '/images/products/cashew-butter/1.jpg',
      files: fs.existsSync(path.dirname(imagePath)) 
        ? fs.readdirSync(path.dirname(imagePath))
        : []
    });
  });

  // Fall through to index.html for client-side routing
  app.get('*', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
    res.status(404).send('Not Found');
  });
}
