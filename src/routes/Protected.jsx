import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
 const { userToken } = useSelector((state) => state.auth);
 const { registerToken } = useSelector((state) => state.findJobs);


  if ((!userToken  && !registerToken )) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
