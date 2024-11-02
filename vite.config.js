import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: "/login",
  },

  plugins: [
    react(),
  ],

  optimizeDeps: {
    esbuildOptions: {
      // define global to globalThis for browser compatibility
      define: {
        global: "globalThis",
      },
    },
  },
  
});
