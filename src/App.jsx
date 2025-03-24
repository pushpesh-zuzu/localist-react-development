import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";


function App() {
  const { selectedServiceFormData, registerStep } = useSelector((state) => state.findJobs);
  useEffect(() => {
    if ([1, 2, 3, 4].includes(registerStep)) {
      // Show confirmation dialog when user tries to leave
      const handleBeforeUnload = (event) => {
        const confirmationMessage = 'Are you sure you want to leave?';
        event.returnValue = confirmationMessage; // For most browsers
        return confirmationMessage; // For some older browsers
      };

      // Call API when user actually leaves
      const handleUnload = () => {
        // Create FormData with your user details
        const formData = new FormData();
        //   formData.append('name', selectedServiceFormData.name);
        //   formData.append('email', selectedServiceFormData.email);
        //   formData.append('password', selectedServiceFormData.password);
        //   formData.append('postcode', selectedServiceFormData.postcode);
        //   formData.append('miles1', selectedServiceFormData.miles1);

        //   formData.append('phone', selectedServiceFormData.phone);
        //   formData.append('company_name', selectedServiceFormData.company_name);
        //   formData.append('company_size', selectedServiceFormData.company_size);
        //   formData.append('company_sales_team', selectedServiceFormData.company_sales_team);
        //   formData.append('company_website', selectedServiceFormData.company_website);
        //   formData.append('is_company_website', selectedServiceFormData.is_company_website);
        //   formData.append('new_jobs', selectedServiceFormData.new_jobs);
        //   formData.append('social_media', selectedServiceFormData.social_media);
        //   formData.append('address', selectedServiceFormData.address);
        //   formData.append('state', selectedServiceFormData.state);
        //   formData.append('city', selectedServiceFormData.city);
        //   formData.append('zipcode', selectedServiceFormData.zipcode);
        //   formData.append('is_zipcode', selectedServiceFormData.is_zipcode);
        //   formData.append('suite', selectedServiceFormData.suite);
        //   formData.append('service_id', selectedServiceFormData.service_id);
        //   formData.append('auto_bid', selectedServiceFormData?.auto_bid ? 1 : 0);
        //   formData.append('active_status', 1);
        //   formData.append('miles2', selectedServiceFormData.miles2);
        //   formData.append('user_type', 1);
        //   formData.append('user_type', 1);
        //   formData.append('loggedUser', 1);
        // formData.append('nation_wide', selectedServiceFormData?.nation_wide ? 1 : 0);
        //   formData.append('form_status', 0);
        const fields = [
          "name", "email", "password", "postcode", "miles1", "phone",
          "company_name", "company_size", "company_sales_team", "company_website",
          "is_company_website", "new_jobs", "social_media", "address", "state",
          "city", "zipcode", "is_zipcode", "suite", "service_id", "auto_bid",
          "active_status", "miles2", "user_type", "loggedUser", "nation_wide",
          "form_status",
        ];

        // Loop through fields and append values (or empty string if undefined)
        fields.forEach(field => {
          formData.append(field, selectedServiceFormData?.[field] ?? "");
        });

        // Boolean values should be converted properly
        formData.set("auto_bid", selectedServiceFormData?.auto_bid ? 1 : 0);
        formData.set("nation_wide", selectedServiceFormData?.nation_wide ? 1 : 0);
        formData.set("active_status", 1);
        formData.set("user_type", 1);
        formData.set("loggedUser", 1);
        formData.set("form_status", 0);

        // FormData needs to be sent as-is for multipart/form-data
        navigator.sendBeacon('https://localists.zuzucodes.com/admin/api/users/registration', formData);
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('unload', handleUnload);

      // Clean up event listeners when component unmounts
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('unload', handleUnload);
      };
    }
  }, [registerStep, selectedServiceFormData]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />;
    </>
  );
}

export default App;


