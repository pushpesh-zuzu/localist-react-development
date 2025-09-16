import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";
import compression from "compression";
import NodeCache from "node-cache";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

// Initialize cache with 10 minute TTL
const htmlCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
const dataCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

async function createServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === "production";

  // Enable compression for all responses
  app.use(compression({ level: 6 }));

  let vite, template, render;
  let manifest = {};

  if (isProd) {
    template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");

    const manifestPath = resolve("dist/client/.vite/manifest.json");
    if (fs.existsSync(manifestPath)) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    }

    const serverEntry = resolve("dist/server/entry-server.js");
    const mod = await import(pathToFileURL(serverEntry).href);
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
        immutable: true,
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
    // Skip caching for non-GET requests
    if (req.method !== "GET") {
      return next();
    }

    try {
      const url = req.originalUrl;
      const hostname = req.hostname;

      // Generate cache key
      const cacheKey = `${hostname}:${url}`;

      // Check cache in production mode
      if (isProd) {
        const cachedHtml = htmlCache.get(cacheKey);
        if (cachedHtml) {
          console.log("Cache hit for:", cacheKey);
          return res
            .status(200)
            .set({ "Content-Type": "text/html" })
            .end(cachedHtml);
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
      const html = tpl
        .replace("<!--ssr-outlet-->", appHtml)
        .replace("<!--css-outlet-->", `${headContent}\n${cssInline}`)
        .replace("</body>", `${stateScript}</body>`);

      // Cache the response in production mode
      if (isProd) {
        htmlCache.set(cacheKey, html);
        console.log("Cached response for:", cacheKey);
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
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
    console.log("HTML caching enabled:", isProd);
  });
}

createServer().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
