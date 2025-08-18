import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "./store/index.js";

export function render(url) {
  const helmetContext = {};
  const store = createStore(); // fresh store per request

  const appHtml = renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </Provider>
  );

  // Always return object (safe for server.js)
  return {
    html: appHtml,
    head: helmetContext.helmet
      ? `${helmetContext.helmet.title.toString()}
           ${helmetContext.helmet.meta.toString()}
           ${helmetContext.helmet.link.toString()}`
      : "",
  };
}
