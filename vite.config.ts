import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  root: "client",
  plugins: [react(), tsconfigPaths()],
  publicDir: "client/public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      input: "client/index.html",
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1] || '';
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // Don't process favicon.ico - it will be copied directly from public dir
          if (ext === 'ico' && assetInfo.name === 'favicon.ico') {
            return '[name][extname]';
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