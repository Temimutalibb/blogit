import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    historyApiFallback: true,
  },
});
