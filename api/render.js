import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  const url = req.url || "/";

  try {
    // Read the built HTML template
    const templatePath = path.resolve(__dirname, "../dist/client/index.html");
    let template = fs.readFileSync(templatePath, "utf-8");

    // Import the server build
    const { render } = await import("../dist/server/entry-server.js");

    // Render the app with proper URL
    const rendered = await render(url);
    const appHtml = typeof rendered === "string" ? rendered : rendered.html;
    const headContent = rendered.head || "";

    // Replace template content
    const html = template
      .replace("<!--ssr-outlet-->", appHtml || "")
      .replace("<!--css-outlet-->", headContent || "");

    // Set proper headers
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=86400");

    return res.status(200).send(html);
  } catch (error) {
    console.error("SSR Error:", error);

    try {
      // Fallback to client-side rendering
      const templatePath = path.resolve(__dirname, "../dist/client/index.html");
      let template = fs.readFileSync(templatePath, "utf-8");

      res.setHeader("Content-Type", "text/html");
      return res.status(200).send(template);
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError);
      return res.status(500).send("Server Error");
    }
  }
}
