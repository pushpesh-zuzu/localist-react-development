import ReactDom from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index.js";

ReactDom.hydrateRoot(
  document.getElementById("root"),
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>
);
