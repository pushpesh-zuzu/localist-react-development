import ReactDom from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore } from "./store/index.js";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";
import "./index.css";
// Rehydrate with server state to avoid extra client work and mismatches
const preloadedState =
  (typeof window !== "undefined" && window.__PRELOADED_STATE__) || {};
if (typeof window !== "undefined") {
  try {
    delete window.__PRELOADED_STATE__;
  } catch {
    window.__PRELOADED_STATE__ = undefined;
  }
}
const store = createStore(preloadedState);

// Defer hydration slightly to improve Total Blocking Time (TBT) without affecting initial paint.
// This keeps SSR HTML intact and interactive shortly after first paint.
const rootEl = document.getElementById("root");

const app = (
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>
);

function hydrate() {
  ReactDom.hydrateRoot(rootEl, app, {
    onRecoverableError(error) {
      if (import.meta.env.MODE !== "production") {
        // eslint-disable-next-line no-console
        console.warn("Recoverable hydration error:", error);
      }
    },
  });
}

if (typeof window !== "undefined" && "requestIdleCallback" in window) {
  window.requestIdleCallback(hydrate, { timeout: 2000 });
} else {
  setTimeout(hydrate, 1);
}
