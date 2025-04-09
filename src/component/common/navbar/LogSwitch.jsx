import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import searchIcon from "../../../assets/Images/search.svg";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterData, setRegisterStep } from "../../../store/FindJobs/findJobSlice";
import { Popover } from "antd";
import {
  setCurrentUser,
  setUserToken,
  switchUser,
  userLogout,
} from "../../../store/Auth/authSlice";
import { showToast } from "../../../utils";

const LogSwitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { serviceTitle } = useParams();
  const [dataSave,setDataSave] = useState()
const [registerdata,setRegisterDatas] = useState()
  const { userToken, currentUser } = useSelector((state) => state.auth);
  // const { registerData } = useSelector((state)=> state.findJobs)
  const { selectedServiceId, registerToken, registerData } = useSelector(
    (state) => state.findJobs
  );
  
useEffect(()=>{
setDataSave(userToken?.active_status)
},[userToken])
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on navigation
  };
  

  const handleSwitchUser = () => {
    const newUserType = userToken?.active_status == 1 ? 2 : 1;
  
    const formData = new FormData();
    formData.append("user_id", userToken?.remember_tokens);
    formData.append("user_type", newUserType);
  
    dispatch(switchUser(formData)).then((result) => {
      if (result?.success) {
        // Remove old localStorage user data
        localStorage.removeItem("barkUserToken");
  localStorage.removeItem("registerDataToken")
        // Set new user data to localStorage
        const updatedUser = {
          ...userToken,
          active_status: newUserType,
        };
        const updateRegiater = {
          ...registerData,
          active_status:newUserType,
          name:userToken?.name || registerData?.name || ""
        }

        localStorage.setItem("barkUserToken", JSON.stringify(updatedUser));
        localStorage.setItem("registerDataToken", JSON.stringify(updateRegiater));
        dispatch( setUserToken(updatedUser))
        dispatch(setRegisterData(updateRegiater))
        setDataSave(updatedUser?.active_status)
        setRegisterDatas(updateRegiater?.active_status)
        console.log(updatedUser,"updatedUser")
  
        // Update redux state if needed
        dispatch(setCurrentUser(dataSave));
  
        // Navigate based on previous user type
        if (updatedUser?.active_status === 1) {
          navigate("/settings");
        } else {
          navigate("/buyers/create");
        }
  
        showToast("success", result?.message || "Switch successful!");
      } else {
        showToast(
          "error",
          result?.message || "Switch failed. Please try again."
        );
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
  const isAccountPage = location.pathname === "/account/setting";
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
      {/* <div className={`${styles.navMenu} ${menuOpen ? styles.activeMenu : ""}`}>
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
      </div> */}
      <div className={`${styles.navMenu} ${menuOpen ? styles.activeMenu : ""}`}>
  {(userToken?.active_status === 1 || registerData?.active_status === 1) && (
    <>
      <div
        className={`${styles.navItem} ${location.pathname === "/settings" ? styles.active : ""}`}
        onClick={() => handleNavigation("/settings")}
      >
        Dashboard
      </div>
      <div
        className={`${styles.navItem} ${location.pathname === "/leads" ? styles.active : ""}`}
        onClick={() => handleNavigation("/leads")}
      >
        Leads
      </div>
      <div
        className={`${styles.navItem} ${location.pathname === "#" ? styles.active : ""}`}
        onClick={() => handleNavigation("#")}
      >
        My Responses
      </div>
      <div
        className={`${styles.navItem} ${location.pathname === "/settings" ? styles.active : ""}`}
        onClick={() => handleNavigation("/settings")}
      >
        Settings
      </div>
      <div
        className={`${styles.navItem} ${location.pathname === "/help" ? styles.active : ""}`}
        onClick={() => handleNavigation("#")}
      >
        Help
      </div>
      <div className={styles.nameCircle}>{userInitial}</div>
    </>
  )}

  {(userToken?.active_status === 2 || registerData?.active_status === 2) && (
    <>
      <div className={styles.requestBox}>
        <div className={styles.myrequestText}>My Request</div>
      </div>
      <div className={styles.nameCircle}>{userInitial}</div>
    </>
  )}
</div>

      {/* User Options Popover */}
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
                onClick={handleSwitchUser}
              >
                Switch to {dataSave && registerdata === 1 ? "Buyer" : "Seller "}
              </div>
              <div
                className={styles.logoutBtn}
                onClick={() => handleNavigation("/account/setting")}
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
          {(!userToken && !selectedServiceId && !serviceTitle) && (
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
