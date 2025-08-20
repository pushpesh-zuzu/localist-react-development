import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index.js";
import "./index.css";
import { StaticRouter } from "react-router-dom/server.js";
ReactDom.hydrateRoot(
  document.getElementById("root"),
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);
