import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  base: '/',
  server: {
    port: 3000,
    host: '127.0.0.1',
    strictPort: true,
    open: true,
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: [
      // Update the @/ alias to point to the correct src directory
      {
        find: /^@\/(.*)/,
        replacement: path.join(__dirname, 'client/src/$1').replace(/\\/g, '/'),
      },
      // Explicit alias for @/components
      {
        find: /^@components\/(.*)/,
        replacement: path.join(__dirname, 'client/src/components/$1').replace(/\\/g, '/'),
      },
      {
        find: /^@shared\/(.*)/,
        replacement: path.join(__dirname, 'shared/$1').replace(/\\/g, '/'),
      },
      {
        find: /^@server\/(.*)/,
        replacement: path.join(__dirname, 'server/$1').replace(/\\/g, '/'),
      },
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client'],
  },
});