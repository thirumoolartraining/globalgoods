import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products API
  app.get("/api/products", async (req, res) => {
    const requestId = Math.random().toString(36).substring(2, 9);
    const startTime = Date.now();
    
    const log = (message: string, data?: any) => {
      const timestamp = new Date().toISOString();
      const logData = data ? ` - ${JSON.stringify(data)}` : '';
      console.log(`[${timestamp}] [${requestId}] ${message}${logData}`);
    };

    log('API Request', {
      method: 'GET',
      path: '/api/products',
      query: req.query,
      headers: {
        'x-forwarded-for': req.headers['x-forwarded-for'],
        'user-agent': req.headers['user-agent']
      }
    });

    try {
      log('Fetching products from storage');
      const products = await storage.getProducts();
      
      // Log basic product info (without sensitive data)
      log('Products retrieved', {
        count: products.length,
        productIds: products.map(p => p.id)
      });
      
      // Set cache headers
      res.setHeader('Cache-Control', 'public, max-age=60');
      res.setHeader('X-Request-ID', requestId);
      
      res.json(products);
      
      log('Response sent', {
        status: 200,
        duration: Date.now() - startTime,
        productCount: products.length
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      
      log('Error fetching products', {
        error: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? stack : undefined,
        duration: Date.now() - startTime
      });
      
      res.status(500).json({ 
        error: "Failed to fetch products",
        requestId,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && {
          details: errorMessage,
          stack
        })
      });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });

  // Orders API
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid order data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Inquiries API
  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid inquiry data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create inquiry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
