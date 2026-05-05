import MillionLint from "@million/lint";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    MillionLint.vite({
      // enabled: process.env.NODE_ENV !== "production",
      enabled: false,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["motion/react", "framer-motion"],
          "three-core": ["three", "@react-three/fiber"],
          physics: ["matter-js"],
        },
      },
    },
  },
});
