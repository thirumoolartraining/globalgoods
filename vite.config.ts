import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  root: "client",
  plugins: [react(), tsconfigPaths()],
  publicDir: "public",
  css: { postcss: "./postcss.config.cjs" },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: true,
    manifest: true
  },
  base: "/",
  define: {
    'process.env': {}
  }
});