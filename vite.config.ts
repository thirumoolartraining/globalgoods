import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  // Set root to client directory where index.html is located
  root: path.resolve(__dirname, 'client'),
  base: '/',
  // Explicitly set the public directory
  publicDir: path.resolve(__dirname, 'client/public'),
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
      // These aliases are now handled by vite-tsconfig-paths
      // but we keep them for backward compatibility
      {
        find: /^@\/(.*)/,
        replacement: path.join(__dirname, 'client/src/$1').replace(/\\/g, '/'),
      },
      // Additional aliases that might not be in tsconfig.json
      {
        find: /^@components\/(.*)/,
        replacement: path.join(__dirname, 'client/src/components/$1').replace(/\\/g, '/'),
      },
    ],
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'client/index.html'),
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1] || '';
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'].includes(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client'],
  },
});