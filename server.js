import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import compression from "compression";
import NodeCache from "node-cache";
import { createServer as createViteServer } from "vite";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { google } from "googleapis";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(express.json()); // to parse JSON request body
app.use(express.urlencoded({ extended: true })); // to parse form data if needed

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const oAuth2Client = new OAuth2Client(
  process.env.VITE_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const cache = new NodeCache({ stdTTL: 60 }); // cache valid for 60 seconds

async function fetchWithCache(key, url, headers) {
  if (cache.has(key)) {
    console.log(`Cache hit for ${key}`);
    return cache.get(key);
  }
  console.log(`Fetching fresh data for ${key}`);
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} - ${await res.text()}`);
  }
  const data = await res.json();
  cache.set(key, data);
  return data;
}

// 1. Google auth token route
app.post("/google/get-auth-token", async (req, res) => {
  try {
    const { code } = req.body;

    console.log("Received auth code:", code);

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "http://localhost:3000",
        grant_type: "authorization_code",
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    res.json({
      success: true,
      message: "Google authentication successful",
      data: {
        access_token,
        refresh_token,
        expires_in,
      },
    });
  } catch (error) {
    console.error(
      "Token exchange error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: "Failed to get access token",
      details: error.response?.data,
    });
  }
});

// 2. Get Business Reviews route - YAHAN SAB KUCH HANDLE HOGA
app.post("/google/get-reviews", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({
        success: false,
        error: "Access token required",
      });
    }

    console.log("Fetching reviews with access token...");

    // OAuth2 client setup
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: access_token,
    });

    // Google My Business API
    const mybusiness = google.mybusiness({
      version: "v4",
      auth: oauth2Client,
    });

    // Step 1: Get accounts list
    console.log("Fetching accounts...");
    const accountsResponse = await mybusiness.accounts.list();

    if (
      !accountsResponse.data.accounts ||
      accountsResponse.data.accounts.length === 0
    ) {
      return res.status(404).json({
        success: false,
        error: "No Google Business accounts found",
      });
    }

    console.log("Accounts found:", accountsResponse.data.accounts.length);
    const accountName = accountsResponse.data.accounts[0].name;
    console.log("Using account:", accountName);

    // Step 2: Get locations for this account
    console.log("Fetching locations...");
    const locationsResponse = await mybusiness.accounts.locations.list({
      parent: accountName,
      readMask: "name,title,locationName,metadata",
    });

    if (
      !locationsResponse.data.locations ||
      locationsResponse.data.locations.length === 0
    ) {
      return res.status(404).json({
        success: false,
        error: "No business locations found",
      });
    }

    console.log("Locations found:", locationsResponse.data.locations.length);

    // Step 3: Get reviews for each location
    const allReviews = [];

    for (const location of locationsResponse.data.locations) {
      try {
        console.log(
          `Fetching reviews for location: ${location.title || location.name}`
        );

        const reviewsResponse =
          await mybusiness.accounts.locations.reviews.list({
            parent: location.name,
          });

        if (
          reviewsResponse.data.reviews &&
          reviewsResponse.data.reviews.length > 0
        ) {
          const locationReviews = reviewsResponse.data.reviews.map(
            (review) => ({
              ...review,
              locationName: location.title || location.locationName,
              locationId: location.name,
            })
          );

          allReviews.push(...locationReviews);
          console.log(
            `Found ${reviewsResponse.data.reviews.length} reviews for ${location.title}`
          );
        }
      } catch (error) {
        console.error(
          `Error fetching reviews for ${location.title}:`,
          error.message
        );
        // Continue with next location
      }
    }

    console.log(`Total reviews fetched: ${allReviews.length}`);

    res.json({
      success: true,
      message: "Reviews fetched successfully",
      data: {
        reviews: allReviews,
        totalReviews: allReviews.length,
        totalLocations: locationsResponse.data.locations.length,
      },
    });
  } catch (error) {
    console.error("Error in get-reviews route:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch reviews",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

// 3. Refresh token route (optional)
app.post("/google/refresh-token", async (req, res) => {
  try {
    const { refresh_token } = req.body;

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refresh_token,
        grant_type: "refresh_token",
      }
    );

    res.json({
      success: true,
      data: tokenResponse.data,
    });
  } catch (error) {
    console.error(
      "Token refresh error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: "Failed to refresh token",
    });
  }
});

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Google Business Reviews API Server is running!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for all origins`);
});

// Step 1: Redirect user to Google OAuth consent screen
// app.get("/auth/google", (req, res) => {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline", // to get refresh_token
//     scope: [
//       "openid",
//       "email",
//       "profile",
//       "https://www.googleapis.com/auth/business.manage",
//     ],
//     prompt: "consent", // force consent to get refresh_token
//   });
//   res.redirect(authUrl); // user goes to Google login page
// });

// // Step 2: Handle callback from Google
// app.post("/auth/callback", async (req, res) => {
//   try {
//     console.log("Callback received with body:", req.body);
//     const code = req.body.code;
//     if (!code) return res.status(400).json({ error: "Missing code" });

//     // Exchange code for access_token + refresh_token
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);
//     const accessToken = tokens.access_token;
//     if (!accessToken)
//       return res.status(500).json({
//         success: false,
//         error: "No access_token returned from Google",
//       });

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//       Accept: "application/json",
//     };

//     // Step 3: Fetch accountId(s) (cached)
//     const accountsData = await fetchWithCache(
//       "accounts",
//       "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
//       headers
//     );
//     const accounts = accountsData.accounts || [];
//     if (!accounts.length)
//       return res.json({ message: "No Google Business accounts found" });
//     const accountId = accounts[0].name;

//     // Step 4: Fetch locations (cached)
//     const locationsData = await fetchWithCache(
//       `locations:${accountId}`,
//       `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations`,
//       headers
//     );
//     const locations = locationsData.locations || [];
//     if (!locations.length) return res.json({ message: "No locations found" });
//     const locationId = locations[0].name;

//     // Step 5: Fetch reviews (cached)
//     const reviewsData = await fetchWithCache(
//       `reviews:${locationId}`,
//       `https://mybusiness.googleapis.com/v4/${locationId}/reviews`,
//       headers
//     );
//     const reviews = reviewsData.reviews || [];
//     console.log();

//     // Step 6: Return all data to frontend
//     res.json({
//       success: true,
//       tokens,
//       accountId,
//       locationId,
//       reviews,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // Step 1: Redirect user to Google OAuth consent screen
// app.get("/auth/google", (req, res) => {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline", // to get refresh_token
//     scope: [
//       "openid",
//       "email",
//       "profile",
//       "https://www.googleapis.com/auth/business.manage",
//     ],
//     prompt: "consent", // force consent to get refresh_token
//   });
//   res.redirect(authUrl); // user goes to Google login page
// });

// // Step 2: Handle callback from Google
// app.get("/auth/callback", async (req, res) => {
//   try {
//     const code = req.query.code;
//     if (!code) return res.status(400).json({ error: "Missing code" });

//     // Exchange code for access_token + refresh_token
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);
//     const accessToken = tokens.access_token;

//     // Step 3: Fetch accountId(s) the user manages
//     const accountsRes = await axios.get(
//       "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
//       { headers: { Authorization: `Bearer ${accessToken}` } }
//     );
//     const accounts = accountsRes.data.accounts || [];
//     if (!accounts.length)
//       return res.json({ message: "No Google Business accounts found" });
//     const accountId = accounts[0].name; // e.g., "accounts/1234567890"

//     // Step 4: Fetch locations
//     const locationsRes = await axios.get(
//       `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations`,
//       { headers: { Authorization: `Bearer ${accessToken}` } }
//     );
//     const locations = locationsRes.data.locations || [];
//     if (!locations.length) return res.json({ message: "No locations found" });
//     const locationId = locations[0].name; // e.g., "accounts/1234567890/locations/9876543210"

//     // Step 5: Fetch reviews
//     const reviewsRes = await axios.get(
//       `https://mybusiness.googleapis.com/v4/${locationId}/reviews`,
//       { headers: { Authorization: `Bearer ${accessToken}` } }
//     );
//     const reviews = reviewsRes.data.reviews || [];

//     // Step 6: Return all data to frontend
//     res.json({
//       success: true,
//       tokens,
//       accountId,
//       locationId,
//       reviews,
//     });
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     console.error(err.response?.data || err.message);
//     res.status(500).json({ success: false, error: err.message, data: "error" });
//   }
// });

// const PORT = process.env.PORT || 5100;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Step 1: Route to exchange ID token from frontend login
// app.get("/auth/callback", async (req, res) => {
//   try {
//     console.log("Received token:", req.query);
//     const { token } = req.query; // token from GoogleLogin in React
//     const ticket = await oAuth2Client.verifyIdToken({
//       idToken: token,
//       audience: process.env.VITE_GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload(); // contains email, name, sub (user id)

//     // You can generate a server session or just return payload
//     res.json({ success: true, user: payload });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ success: false, message: "Invalid token" });
//   }
// });

// // Step 2: Route to fetch Google My Business reviews
// app.get("/reviews", async (req, res) => {
//   try {
//     res.json({ message: "Fetching reviews..." });
//     const accessToken = req.query.access_token; // send access token from frontend or server-side
//     const accountId = "accounts/YOUR_ACCOUNT_ID"; // replace with real Google Business account id
//     const locationId = "locations/YOUR_LOCATION_ID"; // replace with location id

//     const response = await axios.get(
//       `https://mybusiness.googleapis.com/v4/${accountId}/${locationId}/reviews`,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );
//     res.json(response.data);
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

async function createServer() {
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
        const ssrManifest = JSON.parse(
          fs.readFileSync(ssrManifestPath, "utf-8")
        );
        const entryKey =
          Object.keys(ssrManifest).find(
            (k) =>
              k.endsWith("src/entry-server.jsx") ||
              k.endsWith("src/entry-server.js")
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
      const appHtml =
        typeof rendered === "string" ? rendered : rendered.html || "";
      const headContent = (rendered && rendered.head) || "";

      let cssInline = "";
      if (isProd && manifest) {
        Object.values(manifest).forEach((entry) => {
          if (entry?.css) {
            entry.css.forEach((href) => {
              const cssPath = resolve(path.join("dist/client", href));
              if (fs.existsSync(cssPath)) {
                cssInline += `<style>${fs.readFileSync(
                  cssPath,
                  "utf-8"
                )}</style>\n`;
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
          .replace(
            /<noscript>\s*<link[^>]+href="\/src\/index\.css"[^>]*>\s*<\/noscript>\s*/g,
            ""
          )
          .replace(
            /<noscript>\s*<link[^>]+href="\/src\/App\.css"[^>]*>\s*<\/noscript>\s*/g,
            ""
          )
          .replace(
            /<link[^>]+rel="modulepreload"[^>]+href="\/src\/entry-client\.jsx"[^>]*>\s*/g,
            ""
          )
          .replace(
            /<script[^>]+type="module"[^>]+src="\/src\/entry-client\.jsx"[^>]*>\s*<\/script>\s*/g,
            ""
          );

        // Add built client entry tags based on manifest
        const entries = Object.values(manifest).filter(
          (e) =>
            e &&
            e.isEntry &&
            typeof e.file === "string" &&
            e.file.endsWith(".js")
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
  const host = isProd
    ? process.env.SSR_HOST || "127.0.0.1"
    : process.env.HOST || "127.0.0.1";
  const serverType = isProd ? "SSR server" : "Server";

  app.listen(port, host, () => {
    console.log(
      `${serverType} running at http://${host}:${port} (mode: ${
        isProd ? "production" : "development"
      })`
    );
  });
}

createServer();
