import { defineConfig, loadEnv } from 'vite'
import TanStackRouterVite from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  // env 
  const backendUrl = env.VITE_BACKEND_URL;
  const socketUrl = env.VITE_SOCKET_URL;
  const Environment = env.VITE_ENVIRONMENT;

  if(!backendUrl) throw new Error('Backend API URL is not defined')

  const isProduction = Environment === 'production'

  let proxy = {}

  if(isProduction) {
    proxy = {
      proxy: {
        // for the rest API endpoints
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
        // for the websockets
        '/socket.io': {
          target: socketUrl,
          ws: true,
          rewriteWsOrigin: true,
        }
      }
    } 
  }

  return {
    plugins: [
      TanStackRouterVite(),
      react()
    ],
    server: {
      ...proxy
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      }
    }
  }
})
