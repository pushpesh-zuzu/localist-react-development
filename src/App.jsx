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
    if ([1, 2, 3,4].includes(registerStep) ) {
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
        formData.append('name', selectedServiceFormData.name);
        formData.append('email', selectedServiceFormData.email);
        formData.append('password', selectedServiceFormData.password);
        formData.append('postcode', selectedServiceFormData.postcode);
        formData.append('miles1', selectedServiceFormData.miles1);
        formData.append('form_status', 0);

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
  }, [registerStep,selectedServiceFormData]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />;
    </>
  );
}

export default App;


