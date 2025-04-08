import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import searchIcon from "../../../assets/Images/search.svg";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterStep } from "../../../store/FindJobs/findJobSlice";
import { Popover } from "antd";
import {
  setCurrentUser,
  switchUser,
  userLogout,
} from "../../../store/Auth/authSlice";
import { showToast } from "../../../utils";

const LogSwitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { serviceTitle } = useParams();

  const { userToken, currentUser } = useSelector((state) => state.auth);
  const { selectedServiceId, registerToken, registerData } = useSelector(
    (state) => state.findJobs
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on navigation
  };

  const handleSwitchUser = () => {
    const newUserType = currentUser == 1 ? 2 : 1;

    const formData = new FormData();
    formData.append("user_id", userToken?.remember_tokens);
    formData.append("user_type", newUserType);

    dispatch(switchUser(formData)).then((result) => {
      if (result?.success) {
        dispatch(setCurrentUser(newUserType));
        navigate(newUserType == 1 ?  "/buyers/create": "/sellers/create");
        showToast("success", result?.message || "Switch successful!");
      } else {
        showToast("error", result?.message || "Switch failed. Please try again.");
      }
    });
  };

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
  const isNotification = location.pathname === "/user/notification";
  const userName = userToken?.name || registerData?.name || "";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className={styles.logSwitchContainer}>
      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Items */}
      <div className={`${styles.navMenu} ${menuOpen ? styles.activeMenu : ""}`}>
        {!isBuyerPage && !isAccountPage && !isNotification && (userToken || registerToken) && (
          <>
            <div
              className={`${styles.navItem} ${
                location.pathname === "/dashboard" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/dashboard")}
            >
              Dashboard
            </div>
            <div
              className={`${styles.navItem} ${
                location.pathname === "/leads" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/leads")}
            >
              Leads
            </div>
            <div
              className={`${styles.navItem} ${
                location.pathname === "/responses" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/responses")}
            >
              My Responses
            </div>
            <div
              className={`${styles.navItem} ${
                location.pathname === "/settings" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/settings")}
            >
              Settings
            </div>
            <div
              className={`${styles.navItem} ${
                location.pathname === "/help" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/help")}
            >
              Help
            </div>
            <div className={styles.nameCircle}>{userInitial}</div>
          </>
        )}

        {(isBuyerPage || isAccountPage || isNotification) && (
          <div className={styles.requestBox}>
            <div className={styles.myrequestText}>My Request</div>
          </div>
        )}

        {userToken && (isBuyerPage || isAccountPage || isNotification) && (
          <div className={styles.nameCircle}>{userInitial}</div>
        )}
      </div>

      {/* User Options Popover */}
      {(registerToken || userToken) ? (
        <Popover
          content={
            <>
              <div
                className={styles.logoutBtn}
                onClick={() => handleNavigation("/user/notification")}
              >
                Notification
              </div>
              <div
                className={styles.logoutBtn}
                onClick={handleSwitchUser}
              >
                Switch to {currentUser === 1 ? "Buyer" : "Seller "}
              </div>
              <div
                className={styles.logoutBtn}
                onClick={() => handleNavigation("/buyer-account")}
              >
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
          <div
            className={styles.loginBtn}
            onClick={() => handleNavigation("/login")}
          >
            Login
          </div>
          {!selectedServiceId && !serviceTitle && (
            <div
              className={styles.professionalBtn}
              onClick={() => {
                dispatch(setRegisterStep(1));
                handleNavigation("/sellers/create/");
              }}
            >
              Join as a Professional
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogSwitch;
