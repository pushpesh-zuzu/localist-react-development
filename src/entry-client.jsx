import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { createStore } from "./store";
// Server se aaya hua state lo
const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;
// Store ko preload ke sath banao
const store = createStore(preloadedState);
const helmetContext = {};

hydrateRoot(
  document.getElementById("root"),
  <Provider store={store}>
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  </Provider>
);
