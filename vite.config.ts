import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Point to client directory where index.html is located
  root: './client',
  
  // Build configuration
  build: {
    outDir: '../dist', // Build to parent directory's dist folder
    emptyOutDir: true,
    minify: 'terser'
  },
  
  // Base URL
  base: '/',

  // Development server
  server: {
    port: 3000,
    host: true
  }
})