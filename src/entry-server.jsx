import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "./store/index.js";
import { getPopularServiceList } from "./store/FindJobs/findJobSlice";
import { getAllServiceList } from "./store/FindJobs/findJobSlice";

export async function render(url, hostname) {
  const helmetContext = {};
  const store = createStore(); // fresh store per request

  try {
    await store.dispatch(getPopularServiceList());
    await store.dispatch(getAllServiceList());
  } catch (err) {
    console.error("SSR prefetch error:", err);
  }

  const appHtml = renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <App initialUrl={url} hostname={hostname} />
      </HelmetProvider>
    </Provider>
  );

  const preloadedState = store.getState();
  return {
    html: appHtml,
    head: helmetContext.helmet
      ? `
        ${helmetContext.helmet.title.toString()}
        ${helmetContext.helmet.meta.toString()}
        ${helmetContext.helmet.link.toString()}
        ${helmetContext.helmet.script.toString()}
      `
      : "",
    state: preloadedState, // ye client me pass karenge window.__PRELOADED_STATE__ se
  };
}
