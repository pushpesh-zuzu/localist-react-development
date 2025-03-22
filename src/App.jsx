import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const {  selectedServiceFormData,registerStep } = useSelector((state) => state.findJobs);
// useEffect(() => {
//   const handleBeforeUnload = (event) => {
//     navigator.sendBeacon(
//       "https://localists.zuzucodes.com/admin/api/users/registration", 
//       JSON.stringify({
//         form_status: 0, 
//         formData: selectedServiceFormData 
//       })
//     );
//   };
  
//   window.addEventListener("beforeunload", handleBeforeUnload);
  
//   return () => {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, [selectedServiceFormData]);
  
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />;
    </>
  );
}

export default App;
