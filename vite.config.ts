import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(import.meta.dirname, "client", "src"),
      },
      {
        find: "@shared",
        replacement: path.resolve(import.meta.dirname, "shared"),
      },
      {
        find: "@assets",
        replacement: path.resolve(import.meta.dirname, "attached_assets"),
      },
      {
        find: "shared",
        replacement: path.resolve(import.meta.dirname, "shared"),
      },
    ],
  },
  // Root points to the client directory
  root: path.resolve(import.meta.dirname, "client"),
  // Base URL for production and development
  base: '/',
  // Public directory for static assets
  publicDir: path.resolve(import.meta.dirname, 'public'),
  // Build configuration
  build: {
    // Output directory for the built files
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    // Clean the output directory before building
    emptyOutDir: true,
    // Directory for assets relative to outDir
    assetsDir: 'assets',
    // Generate source maps for better debugging
    sourcemap: true,
    // Ensure assets are properly hashed for cache busting
    manifest: true,
    // Enable minification with ESBuild (faster and included with Vite)
    minify: 'esbuild',
    // Ensure proper chunk splitting
    chunkSizeWarningLimit: 1000,
    // Rollup options
    rollupOptions: {
      // Output configuration
      output: {
        // Naming pattern for assets
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Naming pattern for chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        // Naming pattern for entry chunks
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
