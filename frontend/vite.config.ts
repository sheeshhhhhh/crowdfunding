import { defineConfig } from 'vite'
import TanStackRouterVite from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  }
})
