// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//  const { userToken } = useSelector((state) => state.auth);
//  const { registerToken } = useSelector((state) => state.findJobs);


//   if ((!userToken  && !registerToken )) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { showToast } from "../utils";
// Adjust the path if needed

const ProtectedRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth);
  const { registerToken } = useSelector((state) => state.findJobs);
  const toastShown = useRef(false); // 🛑 Prevent double toast

  const isAuthenticated = userToken || registerToken;

  useEffect(() => {
    if (!isAuthenticated && !toastShown.current) {
      showToast("error", "Please log in to continue.");
      toastShown.current = true; // ✅ Mark toast as shown
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
