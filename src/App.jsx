import axios from "axios";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const { selectedServiceFormData, registerStep } = useSelector(
    (state) => state.findJobs
  );

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
        "zipcode_old"
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
            "https://dev.localists.com/admin/api/users/registration",
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

  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </HelmetProvider>
    </>
  );
}

export default App;
