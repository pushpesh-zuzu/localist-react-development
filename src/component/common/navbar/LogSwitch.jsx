import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
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

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on navigation
  };

  const handleLogout = async () => {
    try {
      const result = await dispatch(userLogout());
      if (result) {
        showToast("success", "Logout successful!");
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
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`${styles.navMenu} ${menuOpen ? styles.activeMenu : ""}`}>
        {!isBuyerPage && !isAccountPage && !isNotification && userToken && (
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

        {registerToken || userToken ? (
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
                  onClick={() =>
                    handleNavigation(
                      isBuyerPage ? "/sellers/create/" : "/buyers/create"
                    )
                  }
                >
                  Switch to {isBuyerPage ? "Seller" : "Buyer"}
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
    </div>
  );
};

export default LogSwitch;
