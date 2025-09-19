import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import compression from "compression";
import NodeCache from "node-cache";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

async function createServer() {
  const app = express();
  // Enable HTTP compression and ETags to reduce payload size and improve TTFB/LCP
  app.set("etag", "strong");
  app.use(compression({ threshold: 1024 }));
  const isProd = process.env.NODE_ENV === "production";

  let vite, template, render;
  let manifest = {};
  // Micro-cache SSR HTML per URL+hostname to reduce TTFB during PSI runs (60s TTL)
  const ssrCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

  if (isProd) {
    template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");

    const manifestPath = resolve("dist/client/.vite/manifest.json");
    if (fs.existsSync(manifestPath)) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    }

    // Resolve SSR entry built by Vite (hashed path under dist/server/assets via SSR manifest)
    let serverEntryFile = resolve("dist/server/entry-server.js");
    const ssrManifestPath = resolve("dist/server/.vite/manifest.json");
    try {
      if (fs.existsSync(ssrManifestPath)) {
        const ssrManifest = JSON.parse(fs.readFileSync(ssrManifestPath, "utf-8"));
        const entryKey =
          Object.keys(ssrManifest).find(
            (k) =>
              k.endsWith("src/entry-server.jsx") || k.endsWith("src/entry-server.js")
          ) || "src/entry-server.jsx";
        const mapped = ssrManifest[entryKey];
        if (mapped && mapped.file) {
          serverEntryFile = resolve(path.join("dist/server", mapped.file));
        }
      } else {
        // Fallback: find hashed entry-server*.js in dist/server/assets
        const assetsDir = resolve("dist/server/assets");
        if (fs.existsSync(assetsDir)) {
          const files = fs.readdirSync(assetsDir);
          const match = files.find((f) => /^entry-server.*\.js$/.test(f));
          if (match) {
            serverEntryFile = resolve(path.join("dist/server/assets", match));
          }
        }
      }
    } catch (_) {
      // keep default serverEntryFile if lookup fails
    }

    const mod = await import(pathToFileURL(serverEntryFile).href);
    render = mod.render;

    app.use(
      "/assets",
      express.static(resolve("dist/client/assets"), {
        maxAge: "1y",
        immutable: true,
      })
    );
    // Serve static assets but do NOT serve index.html so SSR can inject HTML
    app.use(
      express.static(resolve("dist/client"), {
        maxAge: "1y",
        index: false,
        immutable:true
      })
    );
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  }

  app.use(async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const hostname = req.hostname; // Extract hostname from request

      // Serve cached SSR HTML for GET HTML requests in production
      const accept = req.headers.accept || "";
      if (isProd && req.method === "GET" && accept.includes("text/html")) {
        const cacheKey = `${hostname}|${url}`;
        const cached = ssrCache.get(cacheKey);
        if (cached) {
          return res
            .status(200)
            .set({ "Content-Type": "text/html", "X-Cache": "HIT" })
            .end(cached);
        }
      }

      let tpl = template;
      if (!isProd) {
        tpl = fs.readFileSync(resolve("index.html"), "utf-8");
        tpl = await vite.transformIndexHtml(url, tpl);
        const { render: devRender } = await vite.ssrLoadModule(
          "/src/entry-server.jsx"
        );
        render = devRender;
      }

      // Pass hostname to the render function
      const rendered = await render(url, hostname);
      const appHtml = typeof rendered === "string" ? rendered : rendered.html || "";
      const headContent = (rendered && rendered.head) || "";

      let cssInline = "";
      if (isProd && manifest) {
        Object.values(manifest).forEach((entry) => {
          if (entry?.css) {
            entry.css.forEach((href) => {
              const cssPath = resolve(path.join("dist/client", href));
              if (fs.existsSync(cssPath)) {
                cssInline += `<style>${fs.readFileSync(cssPath, "utf-8")}</style>\n`;
              }
            });
          }
        });
      }
      // Get state from render()
      const preloadedState = rendered.state || {};
      const stateScript = `<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    "\\u003c"
  )};
</script>`;

      // In production, strip dev-only tags and inject built client entry from manifest
      let processedTpl = tpl;
      let clientScripts = "";
      if (isProd) {
        // Remove dev-only css and module scripts in built template if present
        processedTpl = processedTpl
          .replace(/<link[^>]+href="\/src\/index\.css"[^>]*>\s*/g, "")
          .replace(/<link[^>]+href="\/src\/App\.css"[^>]*>\s*/g, "")
          .replace(/<noscript>\s*<link[^>]+href="\/src\/index\.css"[^>]*>\s*<\/noscript>\s*/g, "")
          .replace(/<noscript>\s*<link[^>]+href="\/src\/App\.css"[^>]*>\s*<\/noscript>\s*/g, "")
          .replace(/<link[^>]+rel="modulepreload"[^>]+href="\/src\/entry-client\.jsx"[^>]*>\s*/g, "")
          .replace(/<script[^>]+type="module"[^>]+src="\/src\/entry-client\.jsx"[^>]*>\s*<\/script>\s*/g, "");

        // Add built client entry tags based on manifest
        const entries = Object.values(manifest).filter(
          (e) => e && e.isEntry && typeof e.file === "string" && e.file.endsWith(".js")
        );
        entries.forEach((entry) => {
          clientScripts += `<script type="module" src="/${entry.file}" crossorigin></script>\n`;
        });
      }

      const html = (isProd ? processedTpl : tpl)
        .replace("<!--ssr-outlet-->", appHtml)
        .replace("<!--css-outlet-->", `${headContent}\n${cssInline}`)
        .replace("</body>", `${stateScript}\n${clientScripts}</body>`);

      // Store SSR HTML in cache (production only)
      if (isProd) {
        const cacheKey = `${hostname}|${url}`;
        ssrCache.set(cacheKey, html);
      }

      res
        .status(200)
        .set({ "Content-Type": "text/html", "X-Cache": "MISS" })
        .end(html);
    } catch (e) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  const port = isProd ? process.env.SSR_PORT || 5102 : process.env.PORT || 5100;
  const host = isProd ? process.env.SSR_HOST || '127.0.0.1' : process.env.HOST || '127.0.0.1';
  const serverType = isProd ? "SSR server" : "Server";

  app.listen(port, host, () => {
    console.log(
      `${serverType} running at http://${host}:${port} (mode: ${isProd ? "production" : "development"})`
    );
  });
}

createServer();