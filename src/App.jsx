import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserData } from "./store/FindJobs/findJobSlice";

function App() {

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

// const { selectedServiceFormData } = useSelector((state) => state.findJobs);
// const dispatch = useDispatch();
// console.log(selectedServiceFormData,"selectedServiceFormData")

// useEffect(() => {
//   const handleBeforeUnload = (event) => {
//     const confirmationMessage = "Are you sure you want to leave?";
//     event.returnValue = confirmationMessage; // Modern browsers ke liye
//     return confirmationMessage; // Purane browsers ke liye
//   };


//   const handleUnload = () => {
//     if (selectedServiceFormData) {
//       const data = JSON.stringify({ data: selectedServiceFormData,form_status: 0 });  
// console.log(data,"data123")
//       // Use `navigator.sendBeacon` to send data before unloading
//       navigator.sendBeacon(
//         dispatch(registerUserData(data))
//       );
//     }
//   };

//   // Attach event listeners
//   window.addEventListener("beforeunload", handleBeforeUnload);
//   window.addEventListener("unload", handleUnload);

//   // Cleanup event listeners
//   return () => {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//     window.removeEventListener("unload", handleUnload);
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
