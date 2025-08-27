import { renderToString } from "react-dom/server";
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
        <App initialUrl={url} />
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
