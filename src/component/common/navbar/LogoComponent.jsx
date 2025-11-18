import styles from "./navbar.module.css";
import logo from "../../../assets/Images/logo.png";
import downArrow from "../../../assets/Images/downarrow.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import { Popover } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import arrowLeft from "../../../assets/Icons/megamenu/arrow-left.svg";
import arrowIcon from "../../../assets/Icons/megamenu/arrow-right.svg";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { megaMenu } from "../../../constant/Megamenu";

const LogoComponent = () => {
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

  const [visibleCount, setVisibleCount] = useState(5);
  const totalItems = megaMenu?.length || 0;
  const { lang, country } = useParams();
  const currentLang = lang || "en";
  const currentCountry = country || "gb";
  const [isMobile, setIsMobile] = useState(false);

  function getRouteForCategory(categoryName) {
    const routesMap = {
      "Home & Garden": "/home",
    };

    return routesMap[categoryName] || "#";
  }

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

  const getRedirectPath = () => {
    const status = registerData?.active_status || userToken?.active_status;

    if (status == 1) {
      return "";
    } else if (status == 2) {
      return "/";
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

    handleResize();
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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleClose();
  }, [location.pathname]);

  const content = () => {
    const handleMouseEnter = useCallback((index) => setMouseHover(index), []);
    const handleMouseLeave = useCallback(() => {
      setMouseHover("");
      setShowSubMenu(false);
      setFilterItems("");
      setFilteRoute("");
    }, []);

    const handleMouseEnterParent = (item) => {
      const time = setTimeout(() => {
        if (item?.subcategory?.length > 0) {
          setShowSubMenu(true);
          setFilterItems(item.name);
          setFilteRoute(item.path);
        }
      }, 1500);
      return () => clearTimeout(time);
    };
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
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
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
                          onMouseEnter={() => {
                            handleMouseEnterParent(item);
                          }}
                          to={
                            item.path
                              ? `/${currentLang}/${currentCountry}/${item.path}`
                              : "#"
                          }
                        >
                          {item.name}
                        </Link>
                      )}
                    </span>
                    <img
                      onClick={() => {
                        if (item?.subcategory?.length > 0) {
                          setShowSubMenu(true);
                          setFilterItems(item.name);
                          setFilteRoute(item.path);
                        }
                      }}
                      onMouseEnter={() => {
                        if (item?.subcategory?.length > 0) {
                          setShowSubMenu(true);
                          setFilterItems(item.name);
                          setFilteRoute(item.path);
                        }
                      }}
                      src={arrowIcon}
                      width={8}
                      alt="arrow"
                      style={{
                        opacity: item?.subcategory?.length > 0 ? 1 : 0.5,
                      }}
                    />
                  </div>
                ))}
                {/* later if need then uncomment */}
                {/* {totalItems > 5 && (
                  <div
                    className={`${styles.popover_content} ${styles.toggleButton}`}
                    onClick={handleToggle}
                  >
                    <span className={styles.text_wrap}>
                      {isAllVisible ? "Show Less ▲" : "See More ▼"}
                    </span>
                  </div>
                )} */}
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
                    to={`/${currentLang}/${currentCountry}/${filterRoute}`}
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
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      ></div>

                      {item?.subcategory?.map((sub, subIndex) => {
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
                                to={`/${currentLang}/${currentCountry}/${sub.path}`}
                              >
                                {sub.name}
                              </Link>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };
  const redirectPath = getRedirectPath();
  return (
    <div className={styles.logoContainer}>
      <img
        src={logo}
        alt="logo"
        className={styles.mainLogo}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/en/gb/"; // reload + homepage redirect ek sath
        }}
      />

      {!userToken?.remember_tokens && !registerData?.remember_tokens && (
        <>
          <Popover
            onMouseEnter={() => {
              setShowbMenu(true);
              setShowSubMenu(false);
              setFilterItems("");
              setFilteRoute("");
            }}
            placement={placement}
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
          <div style={{ display: "none" }}>
            {megaMenu
              .filter((item) => item.name === "Home & Garden")
              .map((item, i) => (
                <div key={i}>
                  <a href={`/${currentLang}/${currentCountry}/${item.path}`}>
                    {item.name}
                  </a>

                  {item.subcategory?.map((sub, j) => (
                    <div key={j}>
                      <a href={`/${currentLang}/${currentCountry}/${sub.path}`}>
                        {sub.name}
                      </a>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LogoComponent;
