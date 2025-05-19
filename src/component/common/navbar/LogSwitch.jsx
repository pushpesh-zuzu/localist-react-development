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
import downarrowIcon from "../../../assets/Icons/downArrowIcon.svg"

const LogSwitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { serviceTitle } = useParams();
  const [dataSave, setDataSave] = useState()
  const [visible, setVisible] = useState(false)
  const [registerdata, setRegisterDatas] = useState()
  const { userToken, currentUser } = useSelector((state) => state.auth);
  const { createRequestToken } = useSelector((state) => state.buyer)
  const { selectedServiceId, registerToken, registerData } = useSelector(
    (state) => state.findJobs
  );

  useEffect(() => {
    setDataSave(userToken?.active_status)
  }, [userToken])
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on navigation
  };
  const handleNavigate = () => {
    navigate("/lead/save-for-later")
  }
  const content = (
    <div className={styles.saveForLater}>
      <p onClick={handleNavigate}>Save For Later</p>

    </div>
  );

  const getUserType = () => {

    if (userToken?.remember_tokens) {
      return userToken?.active_status

    }
    else {
      return registerData?.active_status;
    }
  }
  const handleSwitchUser = () => {
    const newUserType = getUserType() == 1 ? 2 : 1;;

    const formData = new FormData();

    if (userToken?.remember_tokens) {
      formData.append("user_id", userToken?.remember_tokens);
    }
    else {
      formData.append("user_id", registerData?.remember_tokens);
    }

    formData.append("user_type", newUserType);

    dispatch(switchUser(formData)).then((result) => {
      if (result?.success) {

        // Remove old localStorage user data
        localStorage.removeItem("barkUserToken");
        // localStorage.removeItem("registerDataToken")
        // Set new user data to localStorage
        let updatedUser = {}
        if (userToken?.remember_tokens) {
          updatedUser = {
            ...userToken,
            active_status: newUserType,
          };
        }
        else {

          updatedUser = {
            ...registerData,
            active_status: newUserType,
          };
        }
        // const updateRegiater = {
        //   ...registerData,
        //   active_status:newUserType,
        //   name:userToken?.name || registerData?.name || ""
        // }


        localStorage.setItem("barkUserToken", JSON.stringify(updatedUser));
        // localStorage.setItem("registerDataToken", JSON.stringify(updateRegiater));
        dispatch(setUserToken(updatedUser))

        dispatch(setRegisterData(updatedUser))
        setDataSave(updatedUser?.active_status)
        // setRegisterDatas(updateRegiater?.active_status)
        console.log(updatedUser, "updatedUser")

        // Update redux state if needed
        dispatch(setCurrentUser(dataSave));

        // Navigate based on previous user type
        if (updatedUser?.active_status === 1) {
          navigate("/leads");
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
  const handleMyRequest = () => {
    navigate("/buyers/create")
  }


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
  const showHamburgerIcon = userToken?.remember_tokens || registerData?.remember_tokens
  return (
    <div className={styles.logSwitchContainer}>
      {/* Hamburger Icon */}


      {
        showHamburgerIcon ? <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div> : <div style={{ marginTop: "4px" }}><img src={searchIcon} alt="" width={18} height={18} /></div>
      }
      <div className={`${styles.navMenu} ${menuOpen ? styles.activeMenu : ""}`}>
        {getUserType() == 1 && (
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
              New Leads
            </div>
            <div
              className={`${styles.navItem} ${location.pathname === "/lead/save-for-later" ? styles.active : ""}`}
              onClick={() => handleNavigation("/lead/save-for-later")}
            >
              Saved Leads
            </div>
            <div
              className={`${styles.navItem} ${location.pathname === "/lead/save-later" ? styles.active : ""}`}
              onClick={() => handleNavigation("/lead/save-later")}
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
              onClick={() => handleNavigation("/help-center")}
            >
              Help
            </div>
            <div className={styles.nameCircle}>{userInitial}</div>
          </>

        )}

        {getUserType() == 2 && (
          <>
            <div className={styles.requestBox}>
              <div className={styles.myrequestText} onClick={handleMyRequest}>My Request</div>
            </div>

            <div className={styles.nameCircle}>{userInitial}</div>
          </>
        )}
      </div>

      {/* User Options Popover */}
      {(registerToken || userToken) ? (
        <Popover
          content={
            <>
              {getUserType() == 2 && <div
                className={styles.logoutBtn}
                onClick={() => handleNavigation("/user/notification")}
              >
                Notification
              </div>}
              <div
                className={styles.logoutBtn}
                onClick={handleSwitchUser}
              >
                Switch to {getUserType() == 1 ? "Buyer" : "Seller "}
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
          <div >
            <div className={styles.loginBtn}>{userName}  <img src={downarrowIcon} alt="icon" /></div>

          </div>
        </Popover>
      ) : (
        <div className={styles.logsBtns}>
          <div
            className={styles.loginBtn}
            onClick={() => handleNavigation("/login")}
          >
            Login
          </div>
          {(!selectedServiceId && !serviceTitle) && (
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
