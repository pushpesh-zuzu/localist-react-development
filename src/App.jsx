import axios from "axios";
import React, { useEffect, useRef, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import createAppRouter from "./routes/Router";
import "react-toastify/dist/ReactToastify.css";
const LazyToastContainer = React.lazy(() =>
  import("react-toastify").then((m) => ({ default: m.ToastContainer }))
);
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import FullScreenSpinner from "./component/common/fullScreenSpinner/FullScreenSpinner";

function App({ initialUrl, hostname, createRouterFactory }) {
  const { selectedServiceFormData, registerStep } = useSelector(
    (state) => state.findJobs
  );

  console.log("version 1.2");

  const payloadRef = useRef(null);

  useEffect(() => {
    if ([1, 2, 3, 4].includes(registerStep)) {
      // Prepare data BEFORE unload
      const formData = new FormData();
      const fields = [
        "name",
        "email",
        "password",
        "postcode",
        "miles1",
        "phone",
        "company_name",
        "company_size",
        "company_sales_team",
        "company_website",
        "is_company_website",
        "new_jobs",
        "social_media",
        "address",
        "coordinates",
        "city",
        "zipcode",
        "service_id",
        "auto_bid",
        "active_status",
        "miles2",
        "user_type",
        "loggedUser",
        "nation_wide",
        "form_status",
        "is_online",
        "company_reg_number",
        "apartment",
        "city_old",
        "country_old",
        "zipcode_old",
      ];

      fields.forEach((field) => {
        formData.append(field, selectedServiceFormData?.[field] ?? "");
      });

      formData.set("auto_bid", selectedServiceFormData?.auto_bid ? 1 : 0);
      formData.set("nation_wide", selectedServiceFormData?.nation_wide ? 1 : 0);
      formData.set("is_online", selectedServiceFormData?.is_online ? 1 : 0);
      formData.set("active_status", 1);
      formData.set("user_type", 1);
      formData.set("loggedUser", 1);
      formData.set("cities", selectedServiceFormData?.city);
      formData.set("form_status", 0);

      // Convert FormData to URLSearchParams (for sendBeacon)
      const params = new URLSearchParams();
      for (let [key, value] of formData.entries()) {
        params.append(key, value);
      }

      payloadRef.current = params;

      const handleBeforeUnload = (event) => {
        const confirmationMessage = "Are you sure you want to leave?";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      };

      const handleUnload = () => {
        if (params) {
          navigator.sendBeacon(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}users/registration`,
            params
          );
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("unload", handleUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("unload", handleUnload);
      };
    }
  }, [registerStep, selectedServiceFormData]);

  // Create the router once to avoid re-instantiation on every render (which can blank the Outlet on navigation in SSR/CSR)
  const routerFactory = createRouterFactory || createAppRouter;
  const router = useMemo(() => routerFactory(initialUrl), [routerFactory, initialUrl]);
  const isDevEnvironment =
    typeof window !== "undefined"
      ? window.location.hostname === "dev.localists.com"
      : hostname === "dev.localists.com";
  // console.log(isDevEnvironment,'isDevEnvironment')
  // console.log( typeof window !== 'undefined' && window.location.hostname,'window.location.hostname')
  // console.log(hostname,'hostname')
  const isPs1Environment =
    typeof window !== "undefined"
      ? window.location.hostname === "ps1.localists.com"
      : hostname === "ps1.localists.com";
  console.log(
    typeof window !== "undefined" && window.location.hostname,
    "window.location.hostname"
  );
  console.log(hostname, "hostname");

  return (
    <>
      {(isDevEnvironment || isPs1Environment) && (
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
      )}
      <React.Suspense fallback={<FullScreenSpinner />}>
        <RouterProvider router={router} />
      </React.Suspense>
      <React.Suspense fallback={null}>
        <LazyToastContainer />
      </React.Suspense>
    </>
  );
}

export default App;
