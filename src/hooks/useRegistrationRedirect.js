import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRegistrationRedirect = () => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.auth);
  const { registerToken } = useSelector((state) => state.findJobs);

  useEffect(() => {
    const isRegistrationComplete = localStorage.getItem(
      "isRegistrationComplete"
    );
    if (isRegistrationComplete === "true" && (userToken || registerToken)) {
      navigate("/buyers/create", { replace: true });
    }
  }, [userToken, registerToken, navigate]);
};

export default useRegistrationRedirect;
