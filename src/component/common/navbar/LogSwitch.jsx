import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const { selectedServiceId, registerToken, registerData } = useSelector(
    (state) => state.findJobs
  );
  const { service, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const [selectedServiceIds, setSelectedServiceIds] = useState(null);
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const profileId = useParams();
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

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on navigation
  };
  const handleNavigate = () => {
    navigate("/lead/save-for-later");
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
        console.log(updatedUser, "updatedUser");

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
    setShowMobileSearch(false);
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

  const notifications = useSelector(
    (state) => state.notification.notificationList
  );
  const unreadCount = notifications?.filter(
    (n) => n.status === "unread"
  ).length;
  const lastId = useSelector((state) => state.notification.lastId);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const isBuyerPage = location.pathname === "/buyers/create";
  const isAccountPage = location.pathname === "/account/setting";
  const isNotification = location.pathname === "/user/notification";
  const viewProfile = location.pathname === `/review/${profileId?.profileId}`;
  console.log(viewProfile, getUserType(), profileId?.profileId, "profileId");
  // path: "admin/review/:profileId",
  const [mobileSearchText, setMobileSearchText] = useState("");

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
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="mt-1 relative w-full max-w-[300px]">
            {/* Mobile Only - Search Icon */}
            <div
              className="block md:hidden"
              style={{ cursor: "pointer" }} 
              onClick={() => setShowMobileSearch((prev) => !prev)}
            >
              <img
                src={searchIcon}
                alt="Search"
                className="text-gray-500 text-lg transition-all duration-200"
                width={18}
                height={18}
              />
            </div>

            {/* Desktop Only - Full Search Input */}
            <div
              className="hidden md:flex items-center relative w-full max-w-[300px]"
              style={{ position: "relative" }}
            >
              <img
                src={searchIcon}
                alt="Search"
                width={18}
                height={18}
                className={`absolute right-2`}
              />
              {inputFocused && (
                <div className="h-[2px] bg-[#007bff] right-2 absolute bottom-1 w-6" />
              )}
              <input
                type="text"
                placeholder="Search for a service"
                onChange={handleSearch}
                style={{
                  outline: "none",
                  border:
                    showDropdown && service?.length > 0
                      ? "1px solid #ccc"
                      : "1px solid #ccc",
                  borderBottom:
                    showDropdown && service?.length > 0
                      ? "none"
                      : "1px solid #ccc",
                  boxShadow: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
                className={`w-[93%] sm:w-[70%] md:w-full py-[10px] px-[10px] pl-[15px] text-sm text-black font-semibold placeholder:text-black focus:border-[1px] focus:border-gray-50 focus:ring-0 ${
                  showDropdown && service?.length > 0
                    ? "rounded-t-lg"
                    : "rounded-lg"
                }`}
                onFocus={() => setInputFocused(true)}
                onBlur={() => {
                  setInputFocused(false);
                  setTimeout(() => {
                    setShowDropdown(false);
                  }, 500);
                }}
                value={searchText}
              />
              {/* Dropdown */}
              {showDropdown && service?.length > 0 && (
                <div
                  style={{ position: "absolute", top: "18px" }}
                  className="absolute top-full left-0 right-0 rounded-b-md bg-white border border-[#ccc] border-t-0 z-[1000] mt-6 h-fit max-w-[215px] text-sm text-[#848484]"
                >
                  {service?.map((item, index) => (
                    <div
                      key={index}
                      className="py-[10px] px-[10px] cursor-pointer hover:bg-[#f2f2f2] last:rounded-b-md"
                      onClick={() => handleServiceSelect(item)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className={`${styles.navMenu} ${menuOpen ? styles.activeMenu : ""}`}
        >
          {getUserType() == 1 && !viewProfile && (
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
                New Leads
              </div>
              <div
                className={`${styles.navItem} ${
                  location.pathname === "/lead/save-for-later"
                    ? styles.active
                    : ""
                }`}
                onClick={() => handleNavigation("/lead/save-for-later")}
              >
                Saved Leads
              </div>
              <div
                className={`${styles.navItem} ${
                  location.pathname === "/lead/save-later" ? styles.active : ""
                }`}
                onClick={() => handleNavigation("/lead/save-later")}
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
                onClick={() => handleNavigation("/help-center")}
              >
                Help
              </div>
              <Popover
                trigger="click"
                placement="bottomRight"
                visible={popoverVisible}
                onVisibleChange={handleVisibleChange}
                overlayStyle={{
                  maxHeight: "60vh",
                  overflowY: "auto",
                  width: "360px",
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
                              <div
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
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
                <div style={{ position: "relative", cursor: "pointer" }}>
                  <img
                    src={bellIcon}
                    alt="Notifications"
                    width={20}
                    height={20}
                  />
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

          {(getUserType() == 2 || viewProfile) && (
            <>
              <div className={styles.requestBox}>
                <div className={styles.myrequestText} onClick={handleMyRequest}>
                  My Request
                </div>
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
        {registerToken || userToken ? (
          <Popover
            content={
              <>
                {getUserType() == 2 && (
                  <div
                    className={styles.logoutBtn}
                    onClick={() => handleNavigation("/user/notification")}
                  >
                    Notification
                  </div>
                )}
                <div className={styles.logoutBtn} onClick={handleSwitchUser}>
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
            <div>
              <div className={styles.loginBtn}>
                {userName} <img src={downarrowIcon} alt="icon" />
              </div>
            </div>
          </Popover>
        ) : (
          <>
            <div className="flex gap-[14px] items-center h-11">
              <div
                className='className="w-max font-medium text-[#1e2a2e] cursor-pointer text-base leading-6 4
                md:text-base sm:text-sm xs:font-semibold xs:text-sm"'
                onClick={() => handleNavigation("/login")}
              >
                Login
              </div>
              {!selectedServiceId && !serviceTitle && (
                <div
                  className="cursor-pointer rounded-full px-[15px] py-[12px] 
                  bg-[var(--primary-color)] font-bold text-base leading-[20px] 
                  whitespace-nowrap text-white hover:bg-[#0096c4] max-xl:max-w-[174px] 
                  max-xl:px-[10px] max-xl:py-[8px] max-xl:leading-[18px] 
                  max-lg:max-w-[154px] max-lg:px-[10px] max-lg:py-[8px] 
                  max-lg:text-xs max-lg:leading-[13px] max-sm:hidden"
                  onClick={() => {
                    // dispatch(setRegisterStep(1));
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
