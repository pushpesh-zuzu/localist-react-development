import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import searchIcon from "../../../assets/Icons/MyResponse/searchIcon.svg";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchService, setRegisterData, setRegisterStep } from "../../../store/FindJobs/findJobSlice";
import { Avatar, Popover } from "antd";
import { getNotificationList, markNotificationsAsRead } from "../../../store/Seller/notificationService";
import moment from "moment";
import bellIcon from "../../../assets/Icons/bell.svg"
import {
  setCurrentUser,
  setUserToken,
  switchUser,
  userLogout,
} from "../../../store/Auth/authSlice";
import { BASE_COMPLETE, BASE_IMAGE, showToast } from "../../../utils";
import downarrowIcon from "../../../assets/Icons/downArrowIcon.svg"
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";

const LogSwitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { serviceTitle } = useParams();
  const [dataSave, setDataSave] = useState()
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [visible, setVisible] = useState(false)
  const [registerdata, setRegisterDatas] = useState()
  const { userToken, currentUser } = useSelector((state) => state.auth);
  const { createRequestToken } = useSelector((state) => state.buyer)
  const { selectedServiceId, registerToken, registerData } = useSelector(
    (state) => state.findJobs
  );
  const { service, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const [selectedServiceIds, setSelectedServiceIds] = useState(null);
const [show, setShow] = useState(false); 
   const [showDropdown, setShowDropdown] = useState(false);
  const profileId = useParams()
  useEffect(() => {
    setDataSave(userToken?.active_status)
  }, [userToken])
  useEffect(() => {
    const payload = {
      user_id: userToken?.id || registerData?.id || ""
    };
    if (payload.user_id) {
      dispatch(getNotificationList(payload));

      const intervalId = setInterval(() => {
        dispatch(getNotificationList(payload));
      }, 30000);


      return () => clearInterval(intervalId);
    }
  }, [dispatch, userToken, registerData]);
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
  const userData = userToken?.profile_image ? userToken?.profile_image : registerData?.profile_image
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value); // Store current text
    setShowDropdown(true);
  };
  const handleServiceSelect = (item) => {
  setSelectedServiceIds(item);     // store selected service (has id & name)
  setShow(true);                  // show the modal
  setSearchText(item.name);       // optionally update the input value
  setShowDropdown(false);         // hide dropdown
};

  // 2. Debounce input value
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  // 3. Dispatch search API
  useEffect(() => {
    if (debouncedText.trim() !== "") {
      dispatch(searchService({ search: debouncedText }));
    } else {
      // Optionally: clear search results if input is empty
      dispatch(searchService({ search: "" }));
    }
  }, [debouncedText, dispatch]);

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
  
  const notifications = useSelector((state) => state.notification.notificationList);
  const unreadCount = notifications?.filter(n => n.status === "unread").length;
  const lastId = useSelector((state) => state.notification.lastId);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const isBuyerPage = location.pathname === "/buyers/create";
  const isAccountPage = location.pathname === "/account/setting";
  const isNotification = location.pathname === "/user/notification";
  const viewProfile = location.pathname === `/review/${profileId?.profileId}`;
  console.log(viewProfile, getUserType(), profileId?.profileId, "profileId")
  // path: "admin/review/:profileId",

  const userName = userToken?.name || registerData?.name || "";

  const userInitial = userName.charAt(0).toUpperCase();
  const showHamburgerIcon = userToken?.remember_tokens || registerData?.remember_tokens
  const formatDate = (dateString) => {
    return moment(dateString).format("Do MMM, YYYY h:mm A");
  };
  const handleVisibleChange = (visible) => {
    setPopoverVisible(visible);
  };
  return (
    <>
    <div className={styles.logSwitchContainer}>
      {/* Hamburger Icon */}


      {
        showHamburgerIcon ? <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div> :

          <div style={{ marginTop: "4px" }} className={styles.inputWrapper}>
            <div className={`${styles.mobileOnly}`}>
              <img src={searchIcon} alt="Search" className={styles.icon} width={18} height={18} />
            </div>
            <div className={`${styles.inputWrapper} ${styles.desktopOnly}`}>
              <img src={searchIcon} alt="Search" className={styles.icon} width={18} height={18} />
              <input
                type="text"
                placeholder="Search for a service"
                onChange={handleSearch}
                className={styles.input}
              />
            </div>


          </div>
      }
      {showDropdown && service?.length > 0 && (
  <div className={styles.dropdown}>
    {service?.map((item, index) => (
      <div
        key={index}
        className={styles.dropdownItem}
        onClick={() => handleServiceSelect(item)}
      >
        {item.name}
      </div>
    ))}
  </div>
)}

      <div className={`${styles.navMenu} ${menuOpen ? styles.activeMenu : ""}`}>
        {getUserType() == 1 && !viewProfile && (
          <>
            <div
              className={`${styles.navItem} ${location.pathname === "/dashboard" ? styles.active : ""}`}
              onClick={() => handleNavigation("/dashboard")}
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
            <Popover
              trigger="click"
              placement="bottomRight"
              visible={popoverVisible}
              onVisibleChange={handleVisibleChange}
              overlayStyle={{ maxHeight: "60vh", overflowY: "auto", width: "360px" }}
              content={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "50vh",
                    overflow: "hidden",
                    width: "320px",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      overflowY: "auto",
                      padding: "10px",
                    }}
                  >
                    {notifications.length > 0 ? (
                      notifications.map((noti, index) => (
                        <div key={noti.id}>
                          <div style={{ marginBottom: "8px" }}>
                            <div style={{ fontWeight: "600", fontSize: "14px" }}>{noti.title}</div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "12px",
                                marginTop: "4px",
                                fontSize: "11px",
                              }}
                            >
                              <span>{noti.message}</span>
                              <span>{formatDate(noti.created_at)}</span>
                            </div>
                          </div>
                          {index !== notifications.length - 1 && (
                            <hr style={{ borderTop: "1px solid #eee", margin: "8px 0" }} />
                          )}
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: "12px", color: "#999" }}>No new notifications</div>
                    )}
                  </div>

                  {/* Fixed bottom link */}
                  {notifications.length > 0 && (
                    <div
                      style={{
                        padding: "10px",
                        borderTop: "1px solid #eee",
                        textAlign: "right",
                        backgroundColor: "#fff",
                        position: "sticky",
                        bottom: "0",
                      }}
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (unreadCount > 0) {
                            const payload = {
                              user_id: userToken?.id || registerData?.id,
                              last_id: lastId
                            };
                            dispatch(markNotificationsAsRead(payload));
                          }

                          setPopoverVisible(false);
                        }}
                        style={{ fontSize: "12px", color: "#1890ff" }}
                      >
                        Mark all as read
                      </a>

                    </div>
                  )}
                </div>
              }
            >
              <div style={{ position: "relative", cursor: "pointer" }}>
                <img src={bellIcon} alt="Notifications" width={20} height={20} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      width: "16px",
                      height: "16px",
                      fontSize: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
            </Popover>
            {/* <div className={styles.nameCircle}>{userInitial}</div> */}
            {userData ? (
              <Avatar
                src={`${BASE_IMAGE}/users/${userData}`}
                alt="Profile"
                size={40}
                style={{ backgroundColor: "#f0f0f0" }}
              />
            ) : (
              <div className={styles.nameCircle}>{userInitial}</div>
            )}
          </>

        )}

        {

          (getUserType() == 2 || viewProfile) && (
            <>
              <div className={styles.requestBox}>
                <div className={styles.myrequestText} onClick={handleMyRequest}>My Request</div>
              </div>

              {userData ? (
                <Avatar
                  src={`${BASE_COMPLETE}/${userData}`}
                  alt="Profile"
                  size={40}
                  style={{ backgroundColor: "#f0f0f0" }}
                />
              ) : (
                <div className={styles.nameCircle}>{userInitial}</div>
              )}
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
        <>
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
        </>
      )}
    </div>
    {show && (userToken?.active_status == 2 || !userToken) && selectedServiceIds && (
  <BuyerRegistration
    closeModal={() => setShow(false)}
    serviceId={selectedServiceIds?.id}
    serviceName={selectedServiceIds?.name}
    // postcode={pincode}
    // postalCodeValidate={postalCodeValidate}
  />
)}
</>
  );
};

export default LogSwitch;
