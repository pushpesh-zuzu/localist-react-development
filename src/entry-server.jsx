import { URL } from "url";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "./store/index.js";

export function render(url) {
  const helmetContext = {};
  const store = createStore();

  // Compose base URL dynamically from environment variables
  const baseHost = process.env.SSR_HOST || '127.0.0.1';
  const basePort = process.env.SSR_PORT || '5102';
  const baseUrl = `http://${baseHost}:${basePort}`;

  const parsedUrl = new URL(url, baseUrl);
  const hostname = parsedUrl.hostname;

  const noindexSubdomains = ['dev'];
  const subdomain = hostname?.split('.')[0];
  const isNoIndex = noindexSubdomains.includes(subdomain);

  const appHtml = renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <App initialUrl={url} isNoIndex={isNoIndex} />
      </HelmetProvider>
    </Provider>
  );

  return {
    html: appHtml,
    head: helmetContext.helmet
      ? `${helmetContext.helmet.title.toString()}
         ${helmetContext.helmet.meta.toString()}
         ${helmetContext.helmet.link.toString()}`
      : "",
  };
}
