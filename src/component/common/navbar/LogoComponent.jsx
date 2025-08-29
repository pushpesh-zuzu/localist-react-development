import styles from "./navbar.module.css";
import logo from "../../../assets/Images/logo.svg";
import downArrow from "../../../assets/Images/downarrow.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Popover } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import arrowLeft from "../../../assets/Icons/megamenu/arrow-left.svg";
import arrowIcon from "../../../assets/Icons/megamenu/arrow-right.svg";
import { useEffect, useState } from "react";
import {
  allSubMenuData,
  locationData,
  otherMenuData,
  serviceesData,
  subMenuData,
} from "../../../constant/Megamenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServiceList,
  getCategoriesList,
  getPopularServiceList,
} from "../../../store/FindJobs/findJobSlice";
import hiring from "../../../assets/Images/ServicePanel/hiring.svg";
import { BASE_IMAGE_URL, BASE_URL_IMAGE } from "../../../utils";
import { megaMenu } from "../../../constant/Megamenu";

const LogoComponent = () => {
  const navigate = useNavigate();
  const [filterItems, setFilterItems] = useState("");
  const [filterRoute, setFilteRoute] = useState("");
  const [selectedThirdLevelRoute, setSlectedThirdLevelRoute] = useState("");
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showMenu, setShowbMenu] = useState(false);
  const [showThirdLevel, setShowThirdLevel] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [mouseHover, setMouseHover] = useState("");

  const { userToken } = useSelector((state) => state.auth);
  const { registerData, popularList, CategoriesList, allServiceList } =
    useSelector((state) => state.findJobs);
  const location = useLocation();
  const dispatch = useDispatch();
  const isAccountPage = location.pathname === "/user/settings";
  const isNotification = location.pathname === "/user/notification";

  const [visibleCount, setVisibleCount] = useState(5); // Start with 1
  const totalItems = megaMenu?.length || 0;

  const [isMobile, setIsMobile] = useState(false);

  function getRouteForCategory(categoryName) {
    const routesMap = {
      "House & Home": "/home",
      // Business: "/business",
      // "General Builders": "/builders/",
      // "Lessons & Training": "/lessons-training",
    };

    return routesMap[categoryName] || "#";
  }
  // Sample location data
  // const locationData = [
  //   "Cheshire",
  //   "Cumbria",
  //   "Manchester",
  //   "Lancashire",
  //   "Merseyside",
  // ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggle = () => {
    if (visibleCount >= totalItems) {
      setVisibleCount((prev) => Math.max(5, prev - 5));
    } else {
      setVisibleCount((prev) => Math.min(prev + 5, totalItems));
    }
  };

  const isAllVisible = visibleCount >= totalItems;
  //   const handleRedirectUrl = () => {
  //     if (userToken?.active_status  == 1 ) {
  //       navigate("/settings");
  //     }
  //     else if(userToken?.active_status  == 2){
  // navigate("/buyers/create")
  //     }
  //     else {
  //       navigate("/")

  //     }
  //   };
  useEffect(() => {
    if (!userToken?.remember_tokens && !registerData?.remember_tokens) {
      dispatch(getPopularServiceList());
      dispatch(getCategoriesList());
      dispatch(getAllServiceList());
    }
  }, []);
  // const handleRedirectUrl = () => {
  //   const status = registerData?.active_status || userToken?.active_status;

  //   if (status == 1) {
  //     navigate("/sellers/leads");
  //   } else if (status == 2) {
  //     navigate("/buyers/create");
  //   } else {
  //     navigate("/");
  //   }
  // };

  const getRedirectPath = () => {
    const status = registerData?.active_status || userToken?.active_status;

  if (status == 1) {
    return "/sellers/leads";
  } else if (status == 2) {
    return "/buyers/create";
  } else {
    return "/";
  }
};
  const [placement, setPlacement] = useState("bottomLeft");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1020) {
        setPlacement("bottomLeft");
      } else {
        setPlacement("bottom");
      }
    };

    handleResize(); // Initial call to set the placement
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleClose = () => {
  setShowSubMenu(false);
  setMouseHover(false);
  setShowbMenu(false);
  setShowThirdLevel(false);
  setSelectedSubcategory(null);
  setFilterItems("");
  setFilteRoute("");
  setSlectedThirdLevelRoute("");
};
useEffect(() => {
  let lastScrollY = window.scrollY;
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 200 || Math.abs(currentScrollY - lastScrollY) > 50) {
      handleClose();
    }
    
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

useEffect(() => {
  handleClose();
}, [location.pathname]);
  
  const content = () => {
    return (
      <div
        className={styles.popover_container}
        onMouseLeave={() => {
          setShowSubMenu(false);
          setShowThirdLevel(false);
          setShowbMenu(false);
        }}
      >
        <div className={styles.popover_wrap}>
          <AnimatePresence mode="wait">
            {!showSubMenu && !showThirdLevel ? (
              <motion.div
                key="mainMenu"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {isMobile && (
                  <div
                    className={styles.crossBtn}
                    onClick={() => handleClose()}
                  >
                    ×
                  </div>
                )}

                <div className={styles.popover_header}>
                  <span>Services</span>
                  {/* <Link to="#">See All</Link> */}
                </div>

                {megaMenu?.map((item, index) => (
                  <div
                    key={index}
                    className={styles.popover_content}
                    onMouseEnter={() => setMouseHover(index)}
                    onMouseLeave={() => setMouseHover("")}
                  >
                    <span className={styles.text_wrap}>
                      <img src={item?.icon} width={16} height={16} alt="icon" />
                      {item.name === "Other Services" ? (
                        <h4 className={styles.othertext}>{item.name}</h4>
                      ) : (
                        <Link
                          onClick={() => {
                            handleClose();
                          }}
                          to={item.path ? `/${item.path}` : "#"}
                        >
                          {item.name}
                        </Link>
                      )}
                    </span>
                    <img
                      onClick={() => {
                        setShowSubMenu(true);
                        setFilterItems(item.name);
                        setFilteRoute(item.path);
                      }}
                      src={arrowIcon}
                      width={8}
                      alt="arrow"
                    />
                  </div>
                ))}

                {totalItems > 5 && (
                  <div
                    className={`${styles.popover_content} ${styles.toggleButton}`}
                    onClick={handleToggle}
                  >
                    <span className={styles.text_wrap}>
                      {isAllVisible ? "Show Less ▲" : "See More ▼"}
                    </span>
                  </div>
                )}
              </motion.div>
            ) : showSubMenu && !showThirdLevel ? (
              <motion.div
                key="subMenu"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={styles.popover_back_explore}
                  onClick={() => setShowSubMenu(false)}
                >
                  <img src={arrowLeft} width={24} alt="back" />
                  Back to Explore
                </div>
                <hr />

                <div className={styles.popover_header}>
                  <Link
                    onClick={() => handleClose()}
                    className={styles.clickableLink}
                    to={`/${filterRoute}`}
                  >
                    <span>{filterItems}</span>
                  </Link>
                  {/* <Link to="#">See All</Link> */}
                </div>
                {megaMenu
                  ?.filter((item) => item?.name == filterItems)
                  .map((item, index) => (
                    <div key={index}>
                      <div
                        className={styles.popover_content}
                        onMouseEnter={() => setMouseHover(index)}
                        onMouseLeave={() => setMouseHover("")}
                      >
                        {/* <span className={styles.text_wrap}>
                          {item.icon && (
                            <img
                              src={
                                item?.iconhover && mouseHover === index
                                  ? item?.iconhover
                                  : item.icon
                              }
                              width={18}
                              height={18}
                              alt="icon"
                            />
                          )}
                        </span> */}
                      </div>

                      {item.subcategory?.map((sub, subIndex) => {
                        const slug = sub.name
                          .toLowerCase()
                          .replace(/\s+/g, "-");
                        return (
                          <div
                            key={subIndex}
                            className={styles.popover_content}
                            onMouseEnter={() => setMouseHover(subIndex)}
                            onMouseLeave={() => setMouseHover("")}
                          >
                            <span className={styles.text_wrap}>
                              <Link
                                onClick={() => {
                                  handleClose();
                                }}
                                to={`/${sub.path}`}
                              >
                                {sub.name}
                              </Link>
                            </span>
                            <img
                              onClick={() => {
                                setSelectedSubcategory(sub.name);
                                setShowThirdLevel(true);
                                setSlectedThirdLevelRoute(sub.path);
                              }}
                              src={arrowIcon}
                              width={8}
                              alt="arrow"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
              </motion.div>
            ) : (
              <motion.div
                key="thirdLevel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={styles.popover_back_explore}
                  onClick={() => setShowThirdLevel(false)}
                >
                  <img src={arrowLeft} width={24} alt="back" />
                  {filterItems}
                </div>
                <hr />

                <div className={styles.popover_header}>
                  <Link
                    className={styles.clickableLink}
                    to={`/${selectedThirdLevelRoute}`}
                  >
                    <span>{selectedSubcategory}</span>
                  </Link>
                </div>

                {megaMenu
                  .find((item) => item.name === filterItems)
                  ?.subcategory?.find((sub) => sub.name === selectedSubcategory)
                  ?.children?.map((child, index) => (
                    <div key={index} className={styles.popover_content}>
                      <span className={styles.text_wrap}>
                        <Link
                          onClick={() => {
                            handleClose();
                          }}
                          to={
                            child === "Fence Installers in Warrington"
                              ? "/fence-installers/cheshire/warrington"
                              : "#"
                          }
                        >
                          {child}
                        </Link>
                      </span>
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };
const redirectPath = getRedirectPath();
  return (
    <div className={styles.logoContainer}>
     <Link to={redirectPath}>
      <img
        src={logo}
        alt="logo"
        className={styles.mainLogo}
      />
</Link>
      {/* {location.pathname !== "/buyers/create" &&  userToken?.active_status !== 1 &&  userToken?.active_status !== 2 &&
        !isAccountPage &&
        !isNotification && (
          <Popover
            placement={placement}
            content={content}
            arrow={false}
            trigger="hover"
            className="popover_wrap"
          >
            <div className={styles.serviceContainer}>
              <h2 className={styles.serviceText}>Explore Our Services</h2>
              <h2 className={styles.serviceTextMobile}>Our Services</h2>
              <img src={downArrow} alt="down-arrow" />
            </div>
          </Popover>
        )} */}
      {!userToken?.remember_tokens && !registerData?.remember_tokens && (
        <Popover
          onMouseEnter={() => setShowbMenu(true)}
          placement={placement}
          // open={isMobile ? showMenu : null}
          open={showMenu}
          content={content}
          arrow={false}
          trigger="hover"
          className="popover_wrap"
          onClick={() => setShowbMenu(true)}
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <div className={styles.serviceContainer}>
             <span className={styles.serviceText}>Explore Our Services</span>
            <span className={styles.serviceTextMobile}>Our Services</span>
            <img src={downArrow} alt="down-arrow" />
          </div>
        </Popover>
      )}
    </div>
  );
};

export default LogoComponent;
