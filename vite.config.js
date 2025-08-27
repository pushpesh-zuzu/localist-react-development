import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  let appUrl;
  try {
    appUrl = new URL(env.VITE_REACT_HOME_URL);
  } catch {
    appUrl = new URL(`http://${env.HOST}:${env.PORT}/`);
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "react-helmet-async": "react-helmet-async/lib/index.esm.js",
      },
    },
    ssr: {
      noExternal: ["react-helmet-async"],
    },
    build: {
      outDir: "dist/client",
      manifest: true,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
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
