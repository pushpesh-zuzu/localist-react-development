import { useLocation, useNavigate, useParams } from "react-router-dom";
import searchIcon from "../../../assets/Images/search.svg";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterStep } from "../../../store/FindJobs/findJobSlice";
import { Popover } from "antd";
import { userLogout } from "../../../store/Auth/authSlice";
import { showToast } from "../../../utils";

const LogSwitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { serviceTitle } = useParams();

  const { userToken } = useSelector((state) => state.auth);
  const { selectedServiceId, registerToken, registerData } = useSelector(
    (state) => state.findJobs
  );

  const handleNavigation = (path) => navigate(path);

  const handleLogout = async () => {
    try {
      const result = await dispatch(userLogout());
      if (result) {
        showToast("info", "Logout successful!");
        handleNavigation("/login");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const isBuyerPage = location.pathname === "/buyers/create";
  const isAccountPage = location.pathname === "/buyer-account";
  const userName = userToken?.name || registerData?.name || "";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className={styles.logSwitchContainer}>
      {!isBuyerPage  && !isAccountPage && (
        <div className={styles.searchContainer}>
          <input placeholder="Search for a service" />
          <img src={searchIcon} alt="search-icon" />
        </div>
      )}

      {(isBuyerPage || isAccountPage) && (
        <div className={styles.myrequestText}>My Request</div>
      )}

      {userToken && (isBuyerPage || isAccountPage ) && (
        <div className={styles.nameCircle}>{userInitial}</div>
      )}

      {(registerToken || userToken) ? (
        <Popover
          content={
            <>
              <div className={styles.logoutBtn} onClick={() => handleNavigation(isBuyerPage ? "/sellers/create/" : "/buyers/create")}>
                Switch to {isBuyerPage ? "Seller" : "Buyer"}
              </div>
              <div className={styles.logoutBtn} onClick={() => handleNavigation("/buyer-account")}>
                Account Settings
              </div>
              <div className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </div>
            
            </>
          }
          trigger="hover"
        >
          <div className={styles.loginBtn}>{userName}</div>
        </Popover>
      ) : (
        <div className={styles.logsBtns}>
          <div className={styles.loginBtn} onClick={() => handleNavigation("/login")}>
            Login
          </div>
          {!selectedServiceId && !serviceTitle && (
            <div className={styles.professionalBtn} onClick={() => {
              dispatch(setRegisterStep(1));
              handleNavigation("/sellers/create/");
            }}>
              Join as a Professional
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogSwitch;
