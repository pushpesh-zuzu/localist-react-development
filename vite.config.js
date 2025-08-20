import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  build: {
    manifest: true,
    ssrManifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          router: ['react-router-dom']
        }
      }
    }
  },
  ssr: {
    // Ant Design को completely external रखते हैं SSR के लिए
    external: [
      'antd',
      /^antd\//,
      /^rc-/,
      /^@ant-design/
    ],
    noExternal: [
      "react-router-dom",
      "react-redux", 
      "@reduxjs/toolkit",
      "react-helmet-async",
      "framer-motion"
    ],
    format: "esm",
  },
  define: {
    global: 'globalThis'
  },
    server: {
    host: true,
    allowedHosts: ['dev.localists.com']
  }

  
});