/**
 * VITE CONFIGURATION - EXTREME PERFORMANCE OPTIMIZATION
 * 
 * Optimizations implemented:
 * - Manual chunks for optimal code splitting (react-vendor, ui-vendor, utils-vendor)
 * - Tree-shaking enabled with modern ES2020+ target
 * - Gzip + Brotli compression via vite-plugin-compression
 * - CSS code splitting for better caching
 * - SSR compatibility maintained
 * - Build minification with terser
 */

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProd = mode === "production";

  let appUrl;
  try {
    appUrl = new URL(env.VITE_REACT_HOME_URL);
  } catch {
    appUrl = new URL(`http://${env.HOST}:${env.PORT}/`);
  }

  // Manual chunks configuration for optimal code splitting (client build only)
  // SSR builds externalize dependencies by default, so no manualChunks needed
  const getManualChunks = (id) => {
    // Only apply to client builds
    if (isSsrBuild) return undefined;
    
    // React core
    if (id.includes('node_modules/react/') ||
        id.includes('node_modules/react-dom/') ||
        id.includes('node_modules/scheduler/')) {
      return 'react-vendor';
    }
    // React Router
    if (id.includes('node_modules/react-router')) {
      return 'router-vendor';
    }
    // Redux
    if (id.includes('node_modules/@reduxjs/toolkit') ||
        id.includes('node_modules/react-redux') ||
        id.includes('node_modules/redux')) {
      return 'redux-vendor';
    }
    // Ant Design
    if (id.includes('node_modules/antd') ||
        id.includes('node_modules/@ant-design') ||
        id.includes('node_modules/rc-')) {
      return 'ui-vendor';
    }
    // Framer Motion
    if (id.includes('node_modules/framer-motion')) {
      return 'motion-vendor';
    }
    // Utilities
    if (id.includes('node_modules/axios') ||
        id.includes('node_modules/dayjs')) {
      return 'utils-vendor';
    }
    // Slider
    if (id.includes('node_modules/keen-slider')) {
      return 'slider-vendor';
    }
  };

  const plugins = [
    react({
      // Optimize React refresh in development
      fastRefresh: !isSsrBuild,
    }),
  ];

  // Add compression plugins for production builds (client only)
  if (isProd && !isSsrBuild) {
    // Gzip compression
    plugins.push(
      compression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 1024,
        deleteOriginFile: false,
      })
    );
    // Brotli compression (better compression ratio)
    plugins.push(
      compression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 1024,
        deleteOriginFile: false,
      })
    );
  }

  return {
    base: env.VITE_CDN_BASE || '/',
    plugins,
    resolve: {
      alias: {
        "react-helmet-async": "react-helmet-async/lib/index.esm.js",
      },
    },
    ssr: {
      noExternal: ["react-helmet-async", "react-easy-crop"],
    },
    build: {
      outDir: isSsrBuild ? "dist/server" : "dist/client",
      manifest: !isSsrBuild,
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // Disable sourcemaps in production for smaller builds
      sourcemap: !isProd,
      // Modern browser target for smaller bundles
      target: "es2020",
      // CSS code splitting
      cssCodeSplit: true,
      // Minification options
      minify: isProd ? "terser" : false,
      terserOptions: isProd
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log", "console.info", "console.debug"],
            },
            mangle: true,
            format: {
              comments: false,
            },
          }
        : undefined,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: isSsrBuild
            ? "entry-server.js"
            : "assets/[name]-[hash].js",
          // Only apply manualChunks for client builds
          ...(isSsrBuild ? {} : { manualChunks: getManualChunks }),
        },
        // Tree-shaking optimization
        treeshake: {
          moduleSideEffects: "no-external",
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@reduxjs/toolkit",
        "react-redux",
        "axios",
        "dayjs",
      ]
    },
    server: {
      host: env.HOST,
      port: parseInt(env.PORT),
      strictPort: true,
      hmr: {
        port: env.HMR_PORT ? parseInt(env.HMR_PORT) : 24680,
      },
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    },
    preview: {
      host: env.PREVIEW_HOST,
      port: parseInt(env.PREVIEW_PORT),
    },
  };
});
