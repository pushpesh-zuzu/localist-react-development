import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Vite in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Load manifest
  let manifest = {};
  const manifestPath = path.resolve(
    __dirname,
    "dist/client/.vite/manifest.json"
  );
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  }

  // ✅ SSR handler should come BEFORE static serving
  app.use(/(.*)/, async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

      const rendered = await render(url);
      const appHtml = typeof rendered === "string" ? rendered : rendered.html;
      const headContent = rendered.head || "";

      console.log("SSR rendering:", url, "length:", appHtml.length);

      // Inline CSS
      let cssInline = "";
      Object.values(manifest).forEach((entry) => {
        if (entry.css) {
          entry.css.forEach((href) => {
            const cssPath = path.resolve(__dirname, "dist/client", href);
            if (fs.existsSync(cssPath)) {
              cssInline += `<style>${fs.readFileSync(
                cssPath,
                "utf-8"
              )}</style>\n`;
            }
          });
        }
      });

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml || "")
        .replace(`<!--css-outlet-->`, `${headContent}\n${cssInline}`);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  // ✅ static after SSR handler
  app.use(
    "/assets",
    express.static(path.resolve(__dirname, "dist/client/assets"))
  );
  app.use(express.static(path.resolve(__dirname, "dist/client")));

  const port = process.env.PORT || 5173;
  const host = process.env.HOST || "localhost";

  app.listen(port, host, () => {
    console.log(`SSR server running at http://${host}:${port}`);
  });
}

createServer();
