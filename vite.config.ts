import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  // Set the root to the client directory
  root: './client',
  
  // Base URL - important for production
  base: '/',
  
  // Build configuration
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'client/index.html')
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    minify: 'terser',
    cssMinify: true
  },
  
  // Development server
  server: {
    port: 3000,
    host: true,
    open: true
  },
  
  // Preview server (for testing production build locally)
  preview: {
    port: 3001,
    host: true
  }
})