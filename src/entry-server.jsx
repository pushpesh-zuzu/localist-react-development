import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "./store/index.js";

export function render(url,hostname) {
  const helmetContext = {};
  const store = createStore(); // fresh store per request

  const appHtml = renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <App initialUrl={url} hostname={hostname} />
      </HelmetProvider>
    </Provider>
  );
  const state = store.getState();

  return {
    html: appHtml,
    head: helmetContext.helmet
      ? `${helmetContext.helmet.title.toString()}
           ${helmetContext.helmet.meta.toString()}
           ${helmetContext.helmet.link.toString()}
           ${helmetContext.helmet.script.toString()}`
      : "",
    state,
  };
}
