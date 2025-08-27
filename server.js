import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

async function createServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === "production";

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
        maxAge: "1h",
        index: false,
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

      let tpl = template;
      if (!isProd) {
        tpl = fs.readFileSync(resolve("index.html"), "utf-8");
        tpl = await vite.transformIndexHtml(url, tpl);
        const { render: devRender } = await vite.ssrLoadModule(
          "/src/entry-server.jsx"
        );
        render = devRender;
      }

      const rendered = await render(url);
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

      const html = tpl
        .replace("<!--ssr-outlet-->", appHtml)
        .replace("<!--css-outlet-->", `${headContent}\n${cssInline}`);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  const port = process.env.SSR_PORT || 3000;
  const host = process.env.SSR_HOST || "127.0.0.1";

  app.listen(port, host, () => {
    console.log(
      `SSR server running at http://${host}:${port} (mode: ${isProd ? "production" : "development"})`
    );
  });
}

createServer();
