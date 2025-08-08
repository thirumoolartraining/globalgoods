import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  // Build configuration
  build: {
    outDir: 'dist/public', // Match your current build output
    emptyOutDir: true,
    sourcemap: false, // Disable for production
    minify: 'terser', // Explicit minification
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['wouter'],
          forms: ['react-hook-form', 'zod'],
          query: ['@tanstack/react-query']
        }
      }
    }
  },

  // Base URL configuration for Vercel
  base: '/',

  // Development server
  server: {
    port: 3000,
    host: true
  },

  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },

  // Preview configuration (matches production)
  preview: {
    port: 3000,
    host: true
  }
})