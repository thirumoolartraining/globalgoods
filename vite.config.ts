import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  root: "client",
  plugins: [react(), tsconfigPaths()],
  // publicDir is relative to root ("client")
  publicDir: "public",
  css: { postcss: "./postcss.config.cjs" },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js"
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client'],
  },
  base: env.VITE_APP_BASE_URL || '/',
  define: {
    'process.env': {}
  }
}});