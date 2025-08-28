import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import searchIcon from "../../../assets/Icons/MyResponse/searchIcon.svg";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  searchService,
  setRegisterData,
  setRegisterStep,
} from "../../../store/FindJobs/findJobSlice";
import { Avatar, Popover } from "antd";
import {
  getNotificationList,
  markNotificationsAsRead,
} from "../../../store/Seller/notificationService";
import moment from "moment";
import bellIcon from "../../../assets/Icons/bell.svg";
import {
  setCurrentUser,
  setUserToken,
  switchUser,
  userLogout,
} from "../../../store/Auth/authSlice";
import { BASE_COMPLETE, BASE_IMAGE, showToast } from "../../../utils";
import downarrowIcon from "../../../assets/Icons/downArrowIcon.svg";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import MobileSlideInSearch from "./MobileSlideInSearch";
import { style } from "framer-motion/client";

const LogSwitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const wrapperRef = useRef(null);
  const { serviceTitle } = useParams();
  const [dataSave, setDataSave] = useState();
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [registerdata, setRegisterDatas] = useState();
  const { userToken, currentUser } = useSelector((state) => state.auth);
  const { createRequestToken } = useSelector((state) => state.buyer);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileSearchText, setMobileSearchText] = useState("");

  const { selectedServiceId, registerToken, registerData } = useSelector(
    (state) => state.findJobs
  );
  const { service, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const [selectedServiceIds, setSelectedServiceIds] = useState(null);
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const profileId = useParams();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setDataSave(userToken?.active_status);
  }, [userToken]);
  useEffect(() => {
    const payload = {
      user_id: userToken?.id || registerData?.id || "",
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

  // Close menus when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search dropdown
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      // Close hamburger menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      // Close all menus on scroll
      setMenuOpen(false);
      setShowDropdown(false);
      setUserDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMenuOpen(false);
    setShowDropdown(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on navigation
  };
  const handleNavigate = () => {
    navigate("/sellers/leads/save-for-later");
  };
  const content = (
    <div className={styles.saveForLater}>
      <p onClick={handleNavigate}>Save For Later</p>
    </div>
  );
  const userData = userToken?.profile_image
    ? userToken?.profile_image
    : registerData?.profile_image;
  const getUserType = () => {
    if (userToken?.remember_tokens) {
      return userToken?.active_status;
    } else {
      return registerData?.active_status;
    }
  };
  const handleSwitchUser = () => {
    const newUserType = getUserType() == 1 ? 2 : 1;

    const formData = new FormData();

    if (userToken?.remember_tokens) {
      formData.append("user_id", userToken?.remember_tokens);
    } else {
      formData.append("user_id", registerData?.remember_tokens);
    }

    formData.append("user_type", newUserType);

    dispatch(switchUser(formData)).then((result) => {
      if (result?.success) {
        // Remove old localStorage user data
        localStorage.removeItem("barkUserToken");
        // localStorage.removeItem("registerDataToken")
        // Set new user data to localStorage
        let updatedUser = {};
        if (userToken?.remember_tokens) {
          updatedUser = {
            ...userToken,
            active_status: newUserType,
          };
        } else {
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
        dispatch(setUserToken(updatedUser));

        dispatch(setRegisterData(updatedUser));
        setDataSave(updatedUser?.active_status);
        // setRegisterDatas(updateRegiater?.active_status)

        // Update redux state if needed
        dispatch(setCurrentUser(dataSave));

        // Navigate based on previous user type
        if (updatedUser?.active_status === 1) {
          navigate("/sellers/leads");
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
    navigate("/buyers/create");
  };
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       setShowDropdown(false);

  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value); // Store current text
    setShowDropdown(true);
  };
  const handleServiceSelect = (item) => {
    setSelectedServiceIds(item); // store selected service (has id & name)
    setShow(true); // show the modal
    setSearchText(item.name); // optionally update the input value
    // setShowDropdown(false);
    setSearchText(""); // hide dropdown
  };

  // 2. Debounce input value
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  // 3. Dispatch search API
  //   useEffect(() => {
  //     if(!userToken?.remember_tokens && !registerData?.remember_tokens){
  //  if (debouncedText.trim() !== "") {
  //       dispatch(searchService({ search: debouncedText }));
  //     } else {
  //       // Optionally: clear search results if input is empty
  //       dispatch(searchService({ search: "" }));
  //     }
  //     }

  //   }, [debouncedText, dispatch]);
  useEffect(() => {
    const isUserLoggedIn =
      userToken?.remember_tokens || registerData?.remember_tokens;

    if (!userToken?.remember_tokens && !registerData?.remember_tokens) {
      if (debouncedText.trim() !== "") {
        dispatch(searchService({ search: debouncedText }));
      } else {
        dispatch(searchService({ search: "" }));
      }
    }
  }, [debouncedText, dispatch, userToken, registerData]);

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

  const notifications = useSelector(
    (state) => state.notification.notificationList
  );
  const unreadCount = notifications?.filter(
    (n) => n.status === "unread"
  ).length;
  const lastId = useSelector((state) => state.notification.lastId);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const isBuyerPage = location.pathname === "/buyers/create";
  const isAccountPage = location.pathname === "/user/settings";
  const isNotification = location.pathname === "/user/notification";
  const viewProfile = location.pathname === `/review/${profileId?.profileId}`;
  // path: "admin/review/:profileId",

  const userName = userToken?.name || registerData?.name || "";

  const userInitial = userName.charAt(0).toUpperCase();
  const showHamburgerIcon =
    userToken?.remember_tokens || registerData?.remember_tokens;
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

        {showHamburgerIcon ? (
          <div
            ref={menuRef}
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div style={{ marginTop: "4px" }} className={styles.inputWrapper}>
            <div
              className={`${styles.mobileOnly}`}
              style={{ cursor: "pointer !important !important" }}
            >
              <img
                src={searchIcon}
                onClick={() => setShowMobileSearch((prev) => !prev)}
                alt="Search"
                className={styles.icon}
                width={18}
                height={18}
              />
            </div>
            <div
              className={`${styles.inputWrapper} ${styles.desktopOnly}`}
              style={{ position: "relative" }}
              // ref={wrapperRef}
            >
              <img
                src={searchIcon}
                alt="Search"
                width={18}
                height={18}
                className={`${styles.icon} ${
                  inputFocused ? styles.iconFocused : styles.iconFocusedNo
                }`}
              />
              <input
                type="text"
                placeholder="Search for a service"
                onChange={handleSearch}
                className={styles.input}
                style={
                  showDropdown && service?.length > 0
                    ? {
                        borderTopLeftRadius: "0.5rem",
                        borderTopRightRadius: "0.5rem",
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                      }
                    : {
                        borderRadius: "0.5rem",
                      }
                }
                onFocus={() => setInputFocused(true)}
                onBlur={() => {
                  setInputFocused(false);
                  setTimeout(() => {
                    setShowDropdown(false);
                  }, 500);
                }}
                value={searchText}
              />
            </div>

            {showDropdown && service?.length > 0 && (
              <div
                style={{ position: "absolute", top: "18px" }}
                className={styles.dropdown}
              >
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
          </div>
        )}

        <div
          className={`${styles.navMenu} ${menuOpen ? styles.activeMenu : ""}`}
          ref={menuRef}
        >
          {getUserType() == 1 && !viewProfile && (
            <>
              <a
                href="/sellers/dashboard"
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.navItem} ${
                  location.pathname === "/sellers/dashboard"
                    ? styles.active
                    : ""
                }`}
                onClick={(e) => {
                  // only handle normal left-clicks
                  if (
                    e.button === 0 && // left click
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey
                  ) {
                    e.preventDefault();
                    handleNavigation("/sellers/dashboard");
                  }
                }}
              >
                Dashboard
              </a>
              <a
                href="/sellers/leads"
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.navItem} ${
                  location.pathname === "/sellers/leads" ? styles.active : ""
                }`}
                onClick={(e) => {
                  if (
                    e.button === 0 &&
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey
                  ) {
                    e.preventDefault();
                    handleNavigation("/sellers/leads");
                  }
                }}
              >
                New Leads
              </a>

              <a
                href="/sellers/leads/save-for-later"
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.navItem} ${
                  location.pathname === "/sellers/leads/save-for-later"
                    ? styles.active
                    : ""
                }`}
                onClick={(e) => {
                  if (
                    e.button === 0 &&
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey
                  ) {
                    e.preventDefault();
                    handleNavigation("/sellers/leads/save-for-later");
                  }
                }}
              >
                Saved Leads
              </a>

              <a
                href="/sellers/leads/my-responses"
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.navItem} ${
                  location.pathname === "/sellers/leads/my-responses"
                    ? styles.active
                    : ""
                }`}
                onClick={(e) => {
                  if (
                    e.button === 0 &&
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey
                  ) {
                    e.preventDefault();
                    handleNavigation("/sellers/leads/my-responses");
                  }
                }}
              >
                My Responses
              </a>

              <a
                href="/settings"
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.navItem} ${
                  location.pathname === "/settings" ? styles.active : ""
                }`}
                onClick={(e) => {
                  if (
                    e.button === 0 &&
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey
                  ) {
                    e.preventDefault();
                    handleNavigation("/settings");
                  }
                }}
              >
                Settings
              </a>

              <a
                href="/contact-us"
                style={{ textDecoration: "none", color: "black" }}
                className={`${styles.navItem} ${
                  location.pathname === "/contact-us" ? styles.active : ""
                }`}
                onClick={(e) => {
                  if (
                    e.button === 0 &&
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey
                  ) {
                    e.preventDefault();
                    handleNavigation("/contact-us");
                  }
                }}
              >
                Help
              </a>

              {/* <div
                className={`${styles.navItem} ${
                  location.pathname === "login/sellers/leads" ? styles.active : ""
                }`}
                onClick={() => handleNavigation("/sellers/leads")}
              >
                New Leads
              </div>
              <div
                className={`${styles.navItem} ${
                  location.pathname === "login/sellers/leads/save-for-later"
                    ? styles.active
                    : ""
                }`}
                onClick={() => handleNavigation("/sellers/leads/save-for-later")}
              >
                Saved Leads
              </div>
              <div
                className={`${styles.navItem} ${
                  location.pathname === "login/sellers/leads/my-responses"
                    ? styles.active
                    : ""
                }`}
                onClick={() => handleNavigation("/sellers/leads/my-responses")}
              >
                My Responses
              </div>
              <div
                className={`${styles.navItem} ${
                  location.pathname === "settings" ? styles.active : ""
                }`}
                onClick={() => handleNavigation("/settings")}
              >
                Settings
              </div>
              <div
                className={`${styles.navItem} ${
                  location.pathname === "help" ? styles.active : ""
                }`}
                onClick={() => handleNavigation("/help-center")}
              >
                Help
              </div> */}
              {/* <div className={`${styles.nameCircle} ${styles.nameCircleHide}`}>{userInitial}</div> */}

              {/* {userData ? (
              <Avatar
                src={`${BASE_IMAGE}/users/${userData}`}
                alt="Profile"
                size={40}
                style={{ backgroundColor: "#f0f0f0" }}
              />
            ) : (
              <div className={styles.nameCircle}>{userInitial}</div>
            )} */}
            </>
          )}

          {(getUserType() == 2 || viewProfile) && (
            <>
              <div className={styles.requestBox}>
                <div className={styles.myrequestText} onClick={handleMyRequest}>
                  My Request
                </div>
              </div>
              {/* <div className={`${styles.nameCircle} ${styles.nameCircleHide}`}>{userInitial}</div> */}

              {/* {userData ? (
                <Avatar
                  src={`${BASE_COMPLETE}/${userData}`}
                  alt="Profile"
                  size={40}
                  style={{ backgroundColor: "#f0f0f0" }}
                />
              ) : (
                <div className={styles.nameCircle}>{userInitial}</div>
              )} */}
            </>
          )}
        </div>
        {
          getUserType() == 1 && !viewProfile && (
            <Popover
              trigger="click"
              placement={
                typeof window !== "undefined" && window.innerWidth > 540
                  ? "bottomRight"
                  : "top"
              }
              visible={popoverVisible}
              onVisibleChange={handleVisibleChange}
              overlayStyle={{
                maxHeight: "60vh",
                overflowY: "auto",
                width: "360px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
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
                            <div style={{ fontWeight: "600", fontSize: "14px" }}>
                              {noti.title}
                            </div>
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
                            <hr
                              style={{
                                borderTop: "1px solid #eee",
                                margin: "8px 0",
                              }}
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: "12px", color: "#999" }}>
                        No new notifications
                      </div>
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
                              last_id: lastId,
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
              <div
                style={{
                  position: "relative",
                  cursor: "pointer !important",
                  marginRight: "8px",
                }}
              >
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
          )
        }


        {/* User Options Popover */}
        {registerToken || userToken ? (
          <Popover
            content={
              <>
                {getUserType() == 2 && (
                  <div className={styles.logoutBtn}>
                    <a
                      href="/user/notification"
                      style={{ textDecoration: "none", color: "black" }}
                      className={`${
                        location.pathname === "/user/notification"
                          ? styles.active
                          : ""
                      }`}
                      onClick={(e) => {
                        if (
                          e.button === 0 &&
                          !e.metaKey &&
                          !e.ctrlKey &&
                          !e.shiftKey &&
                          !e.altKey
                        ) {
                          e.preventDefault();
                          handleNavigation("/user/notification");
                        }
                      }}
                    >
                      Notification
                    </a>
                  </div>
                )}
                <div className={styles.logoutBtn}>
                  <a
                    href={
                      getUserType() == 1 ? "/buyers/create" : "/sellers/leads"
                    }
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={(e) => {
                      if (
                        e.button === 0 &&
                        !e.metaKey &&
                        !e.ctrlKey &&
                        !e.shiftKey &&
                        !e.altKey
                      ) {
                        e.preventDefault();
                        handleSwitchUser();
                      }
                    }}
                  >
                    Switch to {getUserType() == 1 ? "Buyer" : "Seller"}
                  </a>
                </div>
                {getUserType() == 2 && (
                  <div className={styles.logoutBtn}>
                    <a
                      href="/user/settings"
                      style={{ textDecoration: "none", color: "black" }}
                      className={`${
                        location.pathname === "/user/settings"
                          ? styles.active
                          : ""
                      }`}
                      onClick={(e) => {
                        if (
                          e.button === 0 &&
                          !e.metaKey &&
                          !e.ctrlKey &&
                          !e.shiftKey &&
                          !e.altKey
                        ) {
                          e.preventDefault();
                          handleNavigation("/user/settings");
                        }
                      }}
                    >
                      Account Settings
                    </a>
                  </div>
                )}

                <div className={styles.logoutBtn} onClick={handleLogout}>
                  Logout
                </div>
              </>
            }
            // trigger="hover"
            trigger="click"
            open={userDropdownOpen}
            onVisibleChange={setUserDropdownOpen}
          >
            <div>
              <div
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={styles.loginBtn}
              >
                {userName} <img src={downarrowIcon} alt="icon" />
              </div>
            </div>
          </Popover>
        ) : (
          <>
            <div className={styles.logsBtns}>
              <Link
                to="/login"
                className={`${styles.loginBtn} ${styles.link}`}
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                Login
              </Link>
              {!selectedServiceId && !serviceTitle && (
                <Link
                  to={"/sellers/create"}
                  className={styles.professionalBtn}
                  onClick={() => {
                    // dispatch(setRegisterStep(1));
                    // handleNavigation("/sellers/create/");
                    setMenuOpen(false);
                  }}
                >
                  Join as a Professional
                </Link>
              )}
            </div>
          </>
        )}
      </div>
      {show &&
        (userToken?.active_status == 2 || !userToken) &&
        selectedServiceIds && (
          <BuyerRegistration
            closeModal={() => setShow(false)}
            serviceId={selectedServiceIds?.id}
            serviceName={selectedServiceIds?.name}
            // postcode={pincode}
            // postalCodeValidate={postalCodeValidate}
          />
        )}
      <MobileSlideInSearch
        isOpen={showMobileSearch}
        setIsOpen={setShowMobileSearch}
        services={service}
        handleServiceSelect={handleServiceSelect}
        dispatch={dispatch}
        searchService={searchService}
        mobileSearchText={mobileSearchText}
        setMobileSearchText={setMobileSearchText}
      />
    </>
  );
};

export default LogSwitch;
