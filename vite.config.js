import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  let url;
  try {
    url = new URL(env.VITE_REACT_HOME_URL);
  } catch {
    url = new URL("http://localhost:3000/"); // fallback
  }

  return {
    plugins: [react()],
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
    server: {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    },
    preview: {
      host: url.hostname, // take host from env
      port: 3001,         // always force port 3001
    },
  };
});
